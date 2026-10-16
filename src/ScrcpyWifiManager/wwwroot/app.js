let settings = { devices: [] };

const $ = id => document.getElementById(id);
const statusLabels = {
  info: 'READY',
  success: 'CONNECTED',
  warning: 'CHECK DEVICE',
  error: 'ACTION NEEDED'
};

function showStatus(message, state = 'info', title = 'Ready to connect') {
  const panel = $('connectionStatus');
  panel.dataset.state = state;
  $('statusTitle').textContent = title;
  $('statusText').textContent = message;
  $('stateBadge').textContent = statusLabels[state] || statusLabels.info;
}

function showError(error) {
  const message = error instanceof Error ? error.message : String(error);
  showStatus(message, 'error', 'Could not complete that action');
}

async function api(path, data) {
  const options = data === undefined
    ? {}
    : {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
  const response = await fetch(`/api/${path}`, options);
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'The request failed.');
  return result.data ?? result;
}

async function execute(action) {
  document.querySelectorAll('button').forEach(button => { button.disabled = true; });
  try {
    await action();
    await load();
  } catch (error) {
    showError(error);
  } finally {
    document.querySelectorAll('button').forEach(button => { button.disabled = false; });
  }
}

function addOption(select, value, label) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;
  select.appendChild(option);
}

function renderDeviceSummary(devices) {
  const ready = devices.filter(device => device.state === 'device');
  const unauthorized = devices.filter(device => device.state === 'unauthorized');
  const wired = ready.filter(device => !device.serial.includes(':'));
  const wireless = ready.filter(device => device.serial.includes(':'));
  const summary = $('deviceSummary');
  summary.dataset.state = ready.length ? 'success' : 'warning';

  let message;
  if (ready.length) {
    const connectionTypes = [];
    if (wired.length) connectionTypes.push(`${wired.length} by USB`);
    if (wireless.length) connectionTypes.push(`${wireless.length} over Wi-Fi`);
    message = `${ready.length} authorized device${ready.length === 1 ? '' : 's'} ready (${connectionTypes.join(', ')}).`;
  } else if (unauthorized.length) {
    message = 'A device was found, but it has not authorized this computer. Unlock it and accept the USB debugging prompt.';
  } else {
    message = 'No authorized Android device found. Connect it by USB, enable USB debugging, and approve the prompt.';
  }
  summary.lastElementChild.textContent = message;

  if (ready.length) {
    showStatus(`${message} Choose USB to mirror now, or set up Wi-Fi for wireless reconnection.`, 'info');
  } else {
    showStatus(message, 'warning', unauthorized.length ? 'Authorization needed' : 'Connect your Android device');
  }
}

async function refresh() {
  showStatus('Looking for Android devices connected by USB…', 'info', 'Checking connected devices');
  try {
    const devices = await api('devices');
    const usbDevices = devices.filter(device => device.state === 'device' && !device.serial.includes(':'));
    for (const id of ['usbDevice', 'setupDevice']) {
      const select = $(id);
      const previous = select.value;
      select.replaceChildren();
      addOption(select, '', usbDevices.length ? 'Choose a connected device' : 'No authorized USB devices found');
      usbDevices.forEach(device => addOption(select, device.serial, device.serial));
      select.value = usbDevices.some(device => device.serial === previous) ? previous : '';
    }
    renderDeviceSummary(devices);
  } catch (error) {
    showError(error);
    $('deviceSummary').dataset.state = 'warning';
    $('deviceSummary').lastElementChild.textContent = `Could not check connected devices: ${error.message}`;
  }
}

function createIcon(symbol) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#${symbol}`);
  svg.appendChild(use);
  return svg;
}

function renderSavedDevices() {
  const select = $('savedDevice');
  const previous = select.value;
  select.replaceChildren();
  addOption(select, '', settings.devices.length ? 'Choose a saved device' : 'No saved devices yet');
  settings.devices.forEach(device => {
    addOption(select, `${device.ip}:${device.port}`, `${device.name} · ${device.ip}`);
  });
  select.value = previous;

  const cards = $('deviceCards');
  cards.replaceChildren();
  if (!settings.devices.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const icon = document.createElement('div');
    icon.className = 'method-icon wifi';
    icon.appendChild(createIcon('icon-wifi'));
    const title = document.createElement('h2');
    title.textContent = 'No saved devices yet';
    const text = document.createElement('p');
    text.textContent = 'Connect an Android device by USB and choose “Set up Wi-Fi” to save it here.';
    empty.append(icon, title, text);
    cards.appendChild(empty);
    return;
  }

  for (const device of settings.devices) {
    const card = document.createElement('article');
    card.className = 'device-card';
    const icon = document.createElement('div');
    icon.className = 'method-icon wifi';
    icon.appendChild(createIcon('icon-wifi'));
    const name = document.createElement('h3');
    name.textContent = device.name;
    const address = document.createElement('p');
    address.textContent = `${device.ip}:${device.port}`;
    const actions = document.createElement('div');
    actions.className = 'row';
    const connect = document.createElement('button');
    connect.className = 'primary';
    connect.textContent = 'Connect & mirror';
    connect.appendChild(createIcon('icon-arrow'));
    connect.onclick = () => execute(async () => {
      const result = await api('connect', { ip: device.ip, port: device.port, save: false, name: device.name });
      showStatus(`scrcpy is starting for ${result.endpoint}.`, 'success', 'Wi-Fi connection started');
    });
    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.textContent = 'Remove';
    remove.onclick = () => {
      if (confirm(`Remove ${device.name} from saved devices?`)) {
        execute(async () => {
          await api('remove', { ip: device.ip, port: device.port });
          showStatus(`${device.name} was removed from your saved devices.`, 'info', 'Device removed');
        });
      }
    };
    actions.append(connect, remove);
    card.append(icon, name, address, actions);
    cards.appendChild(card);
  }
}

async function load() {
  const state = await api('status');
  settings = state.settings;
  renderSavedDevices();
}

$('savedDevice').addEventListener('change', event => {
  if (!event.target.value) return;
  const device = settings.devices.find(item => `${item.ip}:${item.port}` === event.target.value);
  if (!device) return;
  $('wifiIp').value = device.ip;
  $('wifiPort').value = device.port;
  showStatus(`${device.name} is selected. Choose Connect & mirror to start.`, 'info', 'Saved device selected');
});

async function connectWifi() {
  await execute(async () => {
    showStatus('Connecting to your Android device over Wi-Fi…', 'info', 'Connecting over Wi-Fi');
    const result = await api('connect', {
      ip: $('wifiIp').value.trim(),
      port: Number($('wifiPort').value),
      save: true,
      name: 'Android device'
    });
    showStatus(`scrcpy is starting for ${result.endpoint}.`, 'success', 'Wi-Fi connection started');
  });
}

async function connectUsb() {
  await execute(async () => {
    const serial = $('usbDevice').value;
    if (!serial) throw new Error('Connect your Android device by USB and select it from the device list first.');
    showStatus(`Starting USB mirroring for ${serial}…`, 'info', 'Starting USB mirroring');
    await api('usb', { serial, name: null });
    showStatus(`scrcpy is starting for device ${serial}.`, 'success', 'USB connection started');
  });
}

async function setupWifi() {
  await execute(async () => {
    const serial = $('setupDevice').value;
    if (!serial) throw new Error('Connect your Android device by USB and select it from the device list first.');
    showStatus('Reading your device’s Wi-Fi address and setting up wireless debugging…', 'info', 'Setting up Wi-Fi');
    const result = await api('setup', {
      serial,
      name: $('deviceName').value.trim() || 'Android device'
    });
    $('wifiIp').value = result.ip;
    showStatus(`Wi-Fi is ready for ${result.endpoint}. You can disconnect the USB cable.`, 'success', 'Wireless setup complete');
  });
}

function fillSettings() {
  for (const [id, key] of [
    ['bitrate', 'bitRateMbps'],
    ['fps', 'maxFps'],
    ['size', 'maxSize'],
    ['title', 'windowTitle'],
    ['adb', 'adbPath'],
    ['scrcpy', 'scrcpyPath']
  ]) {
    $(id).value = settings[key] ?? '';
  }
}

async function saveSettings() {
  await execute(async () => {
    const updated = {
      ...settings,
      bitRateMbps: Number($('bitrate').value),
      maxFps: Number($('fps').value),
      maxSize: Number($('size').value),
      windowTitle: $('title').value,
      adbPath: $('adb').value,
      scrcpyPath: $('scrcpy').value
    };
    await api('settings', updated);
    showStatus('Your streaming and tool preferences have been saved on this computer.', 'success', 'Settings saved');
  });
}

for (const button of document.querySelectorAll('[data-tab]')) {
  button.addEventListener('click', () => {
    document.querySelectorAll('.nav').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    $(button.dataset.tab).classList.add('active');
    $('crumb').textContent = button.textContent.trim();
    if (button.dataset.tab === 'settings') fillSettings();
  });
}

(async () => {
  try {
    await load();
    await refresh();
  } catch (error) {
    showError(error);
  }
})();

setInterval(() => {
  load().catch(error => showError(error));
}, 6000);
