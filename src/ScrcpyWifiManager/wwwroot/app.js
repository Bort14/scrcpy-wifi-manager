let settings = { devices: [] };
let language = localStorage.getItem('scrcpy-wifi-manager-language') === 'es' ? 'es' : 'en';

const $ = id => document.getElementById(id);
const translations = {
  es: {
    'Choose language': 'Elegir idioma',
    'WIRELESS CONTROL CENTER': 'CENTRO DE CONTROL INALÁMBRICO',
    'WORKSPACE': 'ESPACIO DE TRABAJO',
    'Overview': 'Inicio',
    'Configure devices': 'Configurar dispositivos',
    'iPhone / iPad': 'iPhone / iPad',
    'Settings': 'Ajustes',
    'Local & private': 'Local y privado',
    'Open source · Made for scrcpy': 'Código abierto · Para scrcpy',
    'scrcpy project ↗': 'Proyecto scrcpy ↗',
    'Workspace': 'Espacio de trabajo',
    'LOCAL CONTROL': 'CONTROL LOCAL',
    'DEVICE CONTROL': 'CONTROL DE DISPOSITIVOS',
    'Your Android,': 'Tu Android,',
    'untethered.': 'sin límites.',
    'Connect and mirror your Android device without typing ADB commands.': 'Conecta y duplica tu dispositivo Android sin escribir comandos ADB.',
    'Refresh devices': 'Buscar dispositivos',
    'Ready to connect': 'Listo para conectar',
    'Connect your Android device by USB or choose a saved Wi-Fi device.': 'Conecta tu Android por USB o elige un dispositivo Wi-Fi guardado.',
    'CHECKING': 'BUSCANDO',
    'Quick connect': 'Conexión rápida',
    'YOUR SAVED DEVICES': 'TUS DISPOSITIVOS GUARDADOS',
    'Connected by USB?': '¿Conectado por USB?',
    'Choose your device and start mirroring right away.': 'Elige tu dispositivo y empieza a duplicar la pantalla.',
    'Connected USB device': 'Dispositivo USB conectado',
    'Checking connected devices…': 'Buscando dispositivos conectados…',
    'Mirror by USB': 'Duplicar por USB',
    'No Wi-Fi devices yet': 'Aún no hay dispositivos Wi-Fi',
    'Set up your Android once over USB. After that, connect over Wi-Fi with one click.': 'Configura tu Android una vez por USB. Después, conéctalo por Wi-Fi con un clic.',
    'Configure a device': 'Configurar dispositivo',
    'Get started in three steps': 'Empieza en tres pasos',
    'QUICK GUIDE': 'GUÍA RÁPIDA',
    'Prepare your Android device': 'Prepara tu Android',
    'Enable USB debugging in Developer options, then approve your computer when prompted.': 'Activa la depuración USB en las Opciones de desarrollador y autoriza este ordenador cuando te lo pida.',
    'Connect in one click': 'Conecta con un clic',
    'Your saved Android devices appear under Quick connect on this page.': 'Tus dispositivos Android guardados aparecerán en Conexión rápida.',
    'Not configured yet?': '¿Aún no lo has configurado?',
    'Open Configure devices and connect your Android device once by USB.': 'Ve a Configurar dispositivos y conecta tu Android una vez por USB.',
    'Connection check': 'Estado de conexión',
    'DEVICE STATUS': 'ESTADO DEL DISPOSITIVO',
    'Checking for Android devices…': 'Buscando dispositivos Android…',
    'For USB connections, unlock your Android device and accept the USB debugging authorization prompt.': 'Para conectar por USB, desbloquea tu Android y acepta el aviso de autorización de depuración USB.',
    'Need the tools? Install': '¿Necesitas las herramientas? Instala',
    'Android Platform Tools (ADB)': 'Android Platform Tools (ADB)',
    'and': 'y',
    'scrcpy': 'scrcpy',
    ', then add them to PATH or set their locations under Settings.': ', y añádelas a PATH o indica sus ubicaciones en Ajustes.',
    'DEVICE SETUP': 'CONFIGURACIÓN DEL DISPOSITIVO',
    'Configure': 'Configura',
    'devices.': 'tus dispositivos.',
    'Connect your Android device over USB once to enable quick Wi-Fi reconnection.': 'Conecta tu Android una vez por USB para poder reconectarlo rápidamente por Wi-Fi.',
    'Refresh USB devices': 'Buscar dispositivos USB',
    'Set up a saved Wi-Fi device': 'Configura un dispositivo Wi-Fi',
    'You need a USB cable for this one-time setup. Both devices must be on the same trusted Wi-Fi network.': 'Necesitas un cable USB para esta configuración inicial. Ambos dispositivos deben estar en la misma red Wi-Fi de confianza.',
    '1. Choose an authorized USB device': '1. Elige un dispositivo USB autorizado',
    '2. Give it a name': '2. Ponle un nombre',
    '(optional)': '(opcional)',
    'e.g. My tablet': 'p. ej., Mi tableta',
    'We’ll find the device’s Wi-Fi address and set up the connection automatically. You can unplug the cable afterwards.': 'Buscaremos la dirección Wi-Fi del dispositivo y configuraremos la conexión automáticamente. Después podrás desconectar el cable.',
    'Set up Wi-Fi and save device': 'Configurar Wi-Fi y guardar dispositivo',
    'Saved devices': 'Dispositivos guardados',
    'READY FOR QUICK CONNECT': 'LISTO PARA CONEXIÓN RÁPIDA',
    'No devices configured yet': 'Aún no hay dispositivos configurados',
    'Connect your Android device by USB and complete the one-time Wi-Fi setup above.': 'Conecta tu Android por USB y completa la configuración Wi-Fi de arriba.',
    'Once configured, a device appears on the Overview page so you can connect in one click.': 'Una vez configurado, el dispositivo aparecerá en Inicio para que puedas conectarlo con un clic.',
    'IPHONE & IPAD': 'IPHONE Y IPAD',
    'Mirror your': 'Duplica tu',
    'iPhone.': 'iPhone.',
    'View your iPhone screen on this PC using an AirPlay receiver for Windows.': 'Muestra la pantalla del iPhone en este PC con un receptor AirPlay para Windows.',
    'WHAT YOU NEED': 'QUÉ NECESITAS',
    'An AirPlay receiver on Windows': 'Un receptor AirPlay en Windows',
    'Windows does not receive iPhone screen mirroring by itself. Install and open a trusted Windows app that explicitly supports receiving AirPlay screen mirroring, then follow the steps below. The receiver is separate from Scrcpy WiFi Manager and may have its own price or trial.': 'Windows no recibe por sí solo la duplicación de pantalla del iPhone. Instala y abre una aplicación de confianza para Windows que admita expresamente recibir pantalla por AirPlay y sigue los pasos. El receptor es independiente de Scrcpy WiFi Manager y puede ser de pago o tener una versión de prueba.',
    'Start screen mirroring': 'Inicia la duplicación de pantalla',
    'NO CABLE REQUIRED': 'NO NECESITAS CABLE',
    'Open the receiver': 'Abre el receptor',
    'Install and launch an AirPlay receiver on this PC. Allow it through Windows Firewall on your private network if prompted.': 'Instala e inicia un receptor AirPlay en este PC. Si Windows lo solicita, permite el acceso en tu red privada.',
    'Join the same Wi-Fi': 'Conéctalos a la misma Wi-Fi',
    'Connect the iPhone and PC to the same trusted Wi-Fi network. Guest networks or client isolation can prevent discovery.': 'Conecta el iPhone y el PC a la misma red Wi-Fi de confianza. Las redes de invitados o el aislamiento de dispositivos pueden impedir que se encuentren.',
    'Select your PC on iPhone': 'Selecciona el PC en el iPhone',
    'Open Control Center, tap Screen Mirroring, then choose the receiver shown for your PC. Stop mirroring from the same menu.': 'Abre el Centro de control, pulsa Duplicar pantalla y selecciona el receptor de tu PC. Puedes detener la duplicación desde el mismo menú.',
    'What to expect': 'Qué puedes esperar',
    'This mirrors the iPhone display only. You cannot control or tap the iPhone from this PC.': 'Solo se muestra la pantalla del iPhone. No podrás controlarlo ni tocarlo desde este PC.',
    'Scrcpy WiFi Manager does not include, launch, or verify a third-party AirPlay receiver.': 'Scrcpy WiFi Manager no incluye, inicia ni verifica receptores AirPlay de terceros.',
    'The AirPlay stream goes to the receiver app; this dashboard does not handle or upload it.': 'La señal AirPlay llega a la aplicación receptora; este panel no la procesa ni la sube a Internet.',
    'PREFERENCES': 'PREFERENCIAS',
    'Make it': 'Personaliza',
    'yours.': 'la app.',
    'Adjust video quality and choose where ADB and scrcpy are installed.': 'Ajusta la calidad de vídeo y las ubicaciones de ADB y scrcpy.',
    'Streaming preferences': 'Preferencias de transmisión',
    'Video bitrate (Mbps)': 'Tasa de bits de vídeo (Mbps)',
    'Maximum frame rate (FPS)': 'Frecuencia máxima (FPS)',
    'Maximum size (pixels)': 'Tamaño máximo (píxeles)',
    '0 keeps your device’s original resolution (recommended).': '0 mantiene la resolución original del dispositivo (recomendado).',
    'Mirroring window title': 'Título de la ventana de duplicación',
    'Android tools': 'Herramientas de Android',
    'Use the command name if the tool is on PATH, or enter the full path to its executable.': 'Usa el nombre del comando si está en PATH o escribe la ruta completa al ejecutable.',
    'ADB executable': 'Ejecutable de ADB',
    'scrcpy executable': 'Ejecutable de scrcpy',
    'Save preferences': 'Guardar preferencias',
    'Your preferences stay on this computer. The dashboard is only available locally at 127.0.0.1.': 'Tus preferencias se guardan en este ordenador. El panel solo está disponible localmente en 127.0.0.1.',
    'SCRCPY WIFI MANAGER': 'SCRCPY WIFI MANAGER',
    'UNOFFICIAL COMMUNITY PROJECT · WINDOWS': 'PROYECTO COMUNITARIO NO OFICIAL · WINDOWS'
  },
  esDynamic: {
    'READY': 'LISTO',
    'CONNECTED': 'CONECTADO',
    'CHECK DEVICE': 'REVISAR DISPOSITIVO',
    'ACTION NEEDED': 'ACCIÓN NECESARIA',
    'Checking for connected devices': 'Buscando dispositivos conectados',
    'Choose a connected device': 'Elige un dispositivo conectado',
    'No authorized USB devices found': 'No se encontraron dispositivos USB autorizados',
    'Authorization needed': 'Se necesita autorización',
    'Connect your Android device': 'Conecta tu Android',
    'No devices configured yet': 'Aún no hay dispositivos configurados',
    'Connect your Android device by USB and complete the one-time Wi-Fi setup above.': 'Conecta tu Android por USB y completa la configuración Wi-Fi inicial de arriba.',
    'Remove': 'Eliminar',
    'Remove {name} from saved devices?': '¿Eliminar {name} de los dispositivos guardados?',
    '{name} was removed from your saved devices.': '{name} se eliminó de tus dispositivos guardados.',
    'Device removed': 'Dispositivo eliminado',
    'Connect': 'Conectar',
    'Connect to {name}': 'Conectar con {name}',
    'Connecting to {name} over Wi-Fi…': 'Conectando con {name} por Wi-Fi…',
    'Connecting to saved device': 'Conectando al dispositivo guardado',
    'scrcpy is starting for {endpoint}.': 'scrcpy se está iniciando para {endpoint}.',
    'Connection started': 'Conexión iniciada',
    'authorizedDevices': 'Hay {count} dispositivo(s) autorizado(s) listo(s) ({types}).',
    'by USB': 'por USB',
    'over Wi-Fi': 'por Wi-Fi',
    'noUsbSaved': 'No hay dispositivos USB conectados. Hay {count} dispositivo(s) Wi-Fi guardado(s) listo(s) para conexión rápida.',
    'unauthorized': 'Se ha encontrado un dispositivo, pero no ha autorizado este ordenador. Desbloquéalo y acepta el aviso de depuración USB.',
    'noAndroid': 'No se encontró ningún dispositivo Android autorizado. Conéctalo por USB, activa la depuración USB y acepta el aviso.',
    'chooseSavedOrUsb': '{message} Elige un dispositivo guardado o duplica la pantalla por USB.',
    'savedReady': 'Tus dispositivos guardados están listos',
    'Checking for Android devices connected by USB…': 'Buscando dispositivos Android conectados por USB…',
    'errorPrefix': 'No se pudieron comprobar los dispositivos conectados: {error}',
    'Could not complete that action': 'No se pudo completar la acción',
    'The request failed.': 'La solicitud no se pudo completar.',
    'Connect your Android device by USB and select it from the device list first.': 'Conecta tu Android por USB y selecciónalo en la lista de dispositivos.',
    'Starting USB mirroring for {serial}…': 'Iniciando la duplicación por USB de {serial}…',
    'Starting USB mirroring': 'Iniciando duplicación por USB',
    'scrcpy is starting for device {serial}.': 'scrcpy se está iniciando para el dispositivo {serial}.',
    'USB connection started': 'Conexión USB iniciada',
    'Reading your device’s Wi-Fi address and setting up wireless debugging…': 'Leyendo la dirección Wi-Fi del dispositivo y configurando la depuración inalámbrica…',
    'Setting up Wi-Fi': 'Configurando Wi-Fi',
    'Android device': 'Dispositivo Android',
    '{endpoint} has been saved. You can now connect from Quick connect on the home page.': 'Se ha guardado {endpoint}. Ya puedes conectarte desde Conexión rápida en Inicio.',
    'Device configured': 'Dispositivo configurado',
    'Your streaming and tool preferences have been saved on this computer.': 'Tus preferencias de transmisión y herramientas se han guardado en este ordenador.',
    'Settings saved': 'Ajustes guardados',
    ready: 'LISTO',
    connected: 'CONECTADO',
    checkDevice: 'REVISAR DISPOSITIVO',
    actionNeeded: 'ACCIÓN NECESARIA',
    checkingDevices: 'Buscando dispositivos Android conectados por USB…',
    checkingTitle: 'Buscando dispositivos conectados',
    chooseDevice: 'Elige un dispositivo conectado',
    noUsb: 'No se encontraron dispositivos USB autorizados',
    noSavedTitle: 'Aún no hay dispositivos configurados',
    noSavedText: 'Conecta tu Android por USB y completa la configuración Wi-Fi inicial de arriba.',
    remove: 'Eliminar',
    removeConfirm: '¿Eliminar {name} de los dispositivos guardados?',
    removed: '{name} se eliminó de tus dispositivos guardados.',
    deviceRemoved: 'Dispositivo eliminado',
    connect: 'Conectar',
    connectTo: 'Conectar con {name}',
    connecting: 'Conectando con {name} por Wi-Fi…',
    connectingTitle: 'Conectando al dispositivo guardado',
    scrcpyStarting: 'scrcpy se está iniciando para {endpoint}.',
    connectionStarted: 'Conexión iniciada',
    readyConnect: 'Listo para conectar',
    authorizedDevices: '{count} dispositivo(s) autorizado(s) listo(s) ({types}).',
    byUsb: 'por USB',
    overWifi: 'por Wi-Fi',
    noUsbSaved: 'No hay ningún dispositivo USB conectado. {count} dispositivo(s) Wi-Fi guardado(s) listo(s) para conexión rápida.',
    unauthorized: 'Se ha encontrado un dispositivo, pero no ha autorizado este ordenador. Desbloquéalo y acepta el aviso de depuración USB.',
    noAndroid: 'No se encontró ningún dispositivo Android autorizado. Conéctalo por USB, activa la depuración USB y acepta el aviso.',
    chooseSavedOrUsb: '{message} Elige un dispositivo guardado o duplica la pantalla por USB.',
    savedReady: 'Tus dispositivos guardados están listos',
    authorizationNeeded: 'Se necesita autorización',
    connectAndroid: 'Conecta tu Android',
    startUsb: 'Iniciando la duplicación por USB de {serial}…',
    startUsbTitle: 'Iniciando duplicación por USB',
    scrcpyUsbStarted: 'scrcpy se está iniciando para el dispositivo {serial}.',
    usbStartedTitle: 'Conexión USB iniciada',
    connectAndSelectUsb: 'Conecta tu Android por USB y selecciónalo en la lista de dispositivos.',
    readingWifi: 'Leyendo la dirección Wi-Fi del dispositivo y configurando la depuración inalámbrica…',
    settingWifi: 'Configurando Wi-Fi',
    defaultAndroid: 'Dispositivo Android',
    savedEndpoint: '{endpoint} se ha guardado. Ya puedes conectarte desde Conexión rápida en Inicio.',
    configuredTitle: 'Dispositivo configurado',
    preferencesSaved: 'Tus preferencias de transmisión y herramientas se han guardado en este ordenador.',
    settingsSaved: 'Ajustes guardados',
    couldNotComplete: 'No se pudo completar la acción',
    requestFailed: 'La solicitud no se pudo completar.',
    errorPrefix: 'No se pudieron comprobar los dispositivos conectados: {error}',
    connectAction: 'Connect',
    noDeviceSelected: 'Select a connected device',
    errorStatus: 'Could not complete that action'
  }
};

const statusLabels = {
  info: ['READY', 'ready'],
  success: ['CONNECTED', 'connected'],
  warning: ['CHECK DEVICE', 'checkDevice'],
  error: ['ACTION NEEDED', 'actionNeeded']
};

function t(key, values = {}) {
  let text = language === 'es'
    ? translations.es[key] ?? translations.esDynamic[key] ?? key
    : key;
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

function translateStaticContent() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest('.language-switch, script, style')) continue;
    if (!node.hasOwnProperty('sourceText')) node.sourceText = node.nodeValue;
    const source = node.sourceText.trim();
    const leading = node.sourceText.match(/^\s*/)?.[0] ?? '';
    const trailing = node.sourceText.match(/\s*$/)?.[0] ?? '';
    node.nodeValue = `${leading}${t(source)}${trailing}`;
  }

  document.documentElement.lang = language;
  document.querySelectorAll('.language-option').forEach(button => {
    const selected = button.dataset.language === language;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('[aria-label]').forEach(element => {
    if (!element.originalAriaLabel) element.originalAriaLabel = element.getAttribute('aria-label');
    element.setAttribute('aria-label', t(element.originalAriaLabel));
  });
  document.querySelectorAll('[placeholder]').forEach(element => {
    if (!element.originalPlaceholder) element.originalPlaceholder = element.getAttribute('placeholder');
    element.setAttribute('placeholder', t(element.originalPlaceholder));
  });
  $('.language-switch')?.setAttribute('aria-label', t('Choose language'));
  $('deviceSummary')?.setAttribute('aria-label', language === 'es' ? 'Estado del dispositivo' : 'Device status');
}

function showStatus(message, state = 'info', title = t('Ready to connect')) {
  const panel = $('connectionStatus');
  panel.dataset.state = state;
  $('statusTitle').textContent = title;
  $('statusText').textContent = message;
  $('stateBadge').textContent = t(statusLabels[state]?.[language === 'es' ? 1 : 0] ?? 'READY');
}

function showError(error) {
  const message = error instanceof Error ? error.message : String(error);
  showStatus(message, 'error', t('Could not complete that action'));
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
  if (!response.ok) throw new Error(result.error || t('The request failed.'));
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
    if (wired.length) connectionTypes.push(`${wired.length} ${t('by USB')}`);
    if (wireless.length) connectionTypes.push(`${wireless.length} ${t('over Wi-Fi')}`);
    message = language === 'es'
      ? `Hay ${ready.length} ${ready.length === 1 ? 'dispositivo autorizado listo' : 'dispositivos autorizados listos'} (${connectionTypes.join(', ')}).`
      : `${ready.length} authorized device${ready.length === 1 ? '' : 's'} ready (${connectionTypes.join(', ')}).`;
  } else if (settings.devices.length) {
    message = language === 'es'
      ? `No hay dispositivos USB conectados. Hay ${settings.devices.length} dispositivo${settings.devices.length === 1 ? '' : 's'} Wi-Fi guardado${settings.devices.length === 1 ? '' : 's'} listo${settings.devices.length === 1 ? '' : 's'} para conexión rápida.`
      : `No USB device connected. ${settings.devices.length} saved Wi-Fi device${settings.devices.length === 1 ? ' is' : 's are'} ready for quick connect.`;
  } else if (unauthorized.length) {
    message = language === 'es'
      ? t('unauthorized')
      : 'A device was found, but it has not authorized this computer. Unlock it and accept the USB debugging prompt.';
  } else {
    message = language === 'es'
      ? t('noAndroid')
      : 'No authorized Android device found. Connect it by USB, enable USB debugging, and approve the prompt.';
  }
  summary.lastElementChild.textContent = message;

  if (ready.length) {
    showStatus(
      language === 'es'
        ? t('chooseSavedOrUsb', { message })
        : `${message} Choose a saved device below or mirror over USB.`,
      'info'
    );
  } else if (settings.devices.length) {
    showStatus(message, 'info', language === 'es' ? t('savedReady') : 'Your saved devices are ready');
  } else {
    showStatus(message, 'warning', unauthorized.length ? t('Authorization needed') : t('Connect your Android device'));
  }
}

async function refresh() {
  showStatus(t('Checking for Android devices connected by USB…'), 'info', t('Checking for connected devices'));
  try {
    const devices = await api('devices');
    const usbDevices = devices.filter(device => device.state === 'device' && !device.serial.includes(':'));
    for (const id of ['usbDevice', 'setupDevice']) {
      const select = $(id);
      const previous = select.value;
      select.replaceChildren();
      addOption(select, '', usbDevices.length ? t('Choose a connected device') : t('No authorized USB devices found'));
      usbDevices.forEach(device => addOption(select, device.serial, device.serial));
      select.value = usbDevices.some(device => device.serial === previous) ? previous : '';
    }
    renderDeviceSummary(devices);
  } catch (error) {
    showError(error);
    $('deviceSummary').dataset.state = 'warning';
    $('deviceSummary').lastElementChild.textContent = language === 'es'
      ? t('errorPrefix', { error: error.message })
      : `Could not check connected devices: ${error.message}`;
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
  const cards = $('deviceCards');
  cards.replaceChildren();
  if (!settings.devices.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const icon = document.createElement('div');
    icon.className = 'method-icon wifi';
    icon.appendChild(createIcon('icon-wifi'));
    const title = document.createElement('h2');
    title.textContent = t('No devices configured yet');
    const text = document.createElement('p');
    text.textContent = t('Connect your Android device by USB and complete the one-time Wi-Fi setup above.');
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
    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.textContent = t('Remove');
    remove.onclick = () => {
      if (confirm(t('Remove {name} from saved devices?', { name: device.name }))) {
        execute(async () => {
          await api('remove', { ip: device.ip, port: device.port });
          showStatus(t('{name} was removed from your saved devices.', { name: device.name }), 'info', t('Device removed'));
        });
      }
    };
    actions.append(remove);
    card.append(icon, name, address, actions);
    cards.appendChild(card);
  }
}

function renderQuickConnect() {
  const container = $('quickConnectDevices');
  const prompt = $('configurePrompt');
  container.replaceChildren();
  prompt.hidden = settings.devices.length > 0;

  for (const device of settings.devices) {
    const card = document.createElement('article');
    card.className = 'quick-device-card';
    const identity = document.createElement('div');
    identity.className = 'quick-device-identity';
    const icon = document.createElement('div');
    icon.className = 'method-icon wifi';
    icon.appendChild(createIcon('icon-wifi'));
    const details = document.createElement('div');
    const name = document.createElement('h3');
    name.textContent = device.name;
    const address = document.createElement('p');
    address.textContent = `${device.ip}:${device.port}`;
    details.append(name, address);
    identity.append(icon, details);
    const connect = document.createElement('button');
    connect.className = 'primary quick-connect-button';
    connect.textContent = t('Connect');
    connect.appendChild(createIcon('icon-arrow'));
    connect.setAttribute('aria-label', t('Connect to {name}', { name: device.name }));
    connect.onclick = () => execute(async () => {
      showStatus(t('Connecting to {name} over Wi-Fi…', { name: device.name }), 'info', t('Connecting to saved device'));
      const result = await api('connect', { ip: device.ip, port: device.port, save: false, name: device.name });
      showStatus(t('scrcpy is starting for {endpoint}.', { endpoint: result.endpoint }), 'success', t('Connection started'));
    });
    card.append(identity, connect);
    container.appendChild(card);
  }
}

async function load() {
  const state = await api('status');
  settings = state.settings;
  renderQuickConnect();
  renderSavedDevices();
}

async function connectUsb() {
  await execute(async () => {
    const serial = $('usbDevice').value;
    if (!serial) throw new Error(t('Connect your Android device by USB and select it from the device list first.'));
    showStatus(t('Starting USB mirroring for {serial}…', { serial }), 'info', t('Starting USB mirroring'));
    await api('usb', { serial, name: null });
    showStatus(t('scrcpy is starting for device {serial}.', { serial }), 'success', t('USB connection started'));
  });
}

async function setupWifi() {
  await execute(async () => {
    const serial = $('setupDevice').value;
    if (!serial) throw new Error(t('Connect your Android device by USB and select it from the device list first.'));
    showStatus(t('Reading your device’s Wi-Fi address and setting up wireless debugging…'), 'info', t('Setting up Wi-Fi'));
    const result = await api('setup', {
      serial,
      name: $('deviceName').value.trim() || t('Android device')
    });
    $('deviceName').value = '';
    showStatus(t('{endpoint} has been saved. You can now connect from Quick connect on the home page.', { endpoint: result.endpoint }), 'success', t('Device configured'));
    showPage('dashboard');
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
    const saved = await api('settings', updated);
    settings = saved;
    showStatus(t('Your streaming and tool preferences have been saved on this computer.'), 'success', t('Settings saved'));
  });
}

function showPage(pageId) {
  const target = $(pageId);
  const button = document.querySelector(`[data-tab="${pageId}"]`);
  if (!target || !button) return;
  document.querySelectorAll('.nav').forEach(item => item.classList.toggle('active', item === button));
  document.querySelectorAll('.page').forEach(page => page.classList.toggle('active', page === target));
  $('crumb').textContent = button.textContent.trim();
  if (pageId === 'settings') fillSettings();
}

for (const button of document.querySelectorAll('[data-tab]')) {
  button.addEventListener('click', () => {
    showPage(button.dataset.tab);
  });
}

for (const button of document.querySelectorAll('[data-language]')) {
  button.addEventListener('click', () => {
    language = button.dataset.language;
    localStorage.setItem('scrcpy-wifi-manager-language', language);
    translateStaticContent();
    renderQuickConnect();
    renderSavedDevices();
    const activePage = document.querySelector('.page.active');
    const activeNav = activePage && document.querySelector(`[data-tab="${activePage.id}"]`);
    if (activeNav) $('crumb').textContent = activeNav.textContent.trim();
    if (activePage?.id === 'settings') fillSettings();
    refresh();
  });
}

translateStaticContent();

(async () => {
  try {
    await load();
    await refresh();
  } catch (error) {
    showError(error);
  }
})();

setInterval(() => {
  load().catch(showError);
}, 10000);
