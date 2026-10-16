<div align="center">

# Scrcpy WiFi Manager

**Your Android, untethered.**  
A modern, dark-mode control dashboard for **scrcpy** on Windows.

![Platform](https://img.shields.io/badge/Windows-10%20%7C%2011-0078D4?logo=windows) ![.NET](https://img.shields.io/badge/.NET-10-7952B3?logo=dotnet) ![License](https://img.shields.io/badge/license-MIT-green) ![Status](https://img.shields.io/badge/status-beta-orange)

**[Features](#features) · [Quick start](#quick-start) · [How to connect](#how-to-connect) · [Build](#build-from-source)**

</div>

> [!IMPORTANT]
> This project is an **unofficial** companion GUI for [scrcpy](https://github.com/Genymobile/scrcpy). It is not affiliated with Genymobile. You must install scrcpy and ADB separately. The app does not transmit your screen through its own servers.

## Why this exists

`scrcpy` is a fantastic open-source Android mirroring tool, but starting wireless sessions often means typing ADB commands. Scrcpy WiFi Manager wraps that workflow in a polished local dashboard.

## Features

| Feature | Description |
|---|---|
| 🔌 **USB mirroring** | Launch scrcpy on a selected USB-connected device |
| 📶 **Wi-Fi setup** | Enable classic TCP/IP mode over USB, detect the tablet IP, and connect |
| ⚡ **Quick reconnect** | Save multiple Android devices for future connections |
| 🎛️ **Stream settings** | Adjust video bitrate, max FPS, max size and window title |
| 🛠️ **Custom executables** | Use system PATH or point to your own `adb.exe` and `scrcpy.exe` |
| 🔎 **Activity log** | Understand connection failures without a terminal |
| 🌙 **Modern web dashboard** | Dark, responsive interface at `http://127.0.0.1:5088` |
| 🔒 **Local-only** | Backend listens only on loopback; no cloud account required |

## Screenshots

The dashboard includes **Overview**, **My devices**, and **Settings**. Screenshots will be added after the first Windows UI validation. Contributions welcome.

## Quick start

### Requirements

- Windows 10 or 11
- [scrcpy](https://github.com/Genymobile/scrcpy/releases) and Android Platform Tools (ADB) on your PATH, **or** specify their full paths in Settings.
- An Android device with USB debugging enabled.
- The [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) to run from source; the self-contained Release build does not require it.

### Run from source (VS Code)

```powershell
git clone https://github.com/YOUR_USERNAME/scrcpy-wifi-manager.git
cd scrcpy-wifi-manager
dotnet run --project src/ScrcpyWifiManager/ScrcpyWifiManager.csproj
```

The app opens the dashboard automatically in your default browser. If not, navigate to **http://127.0.0.1:5088**. The controller stays running while its process is open. To avoid opening the browser automatically, add `-- --no-browser`.

## How to connect

### USB

1. On your Android device, enable **Developer options → USB debugging**.
2. Plug in your phone/tablet and approve the computer fingerprint prompt.
3. Click **Refresh devices**, select the USB device and then **Launch via USB**.

### Wi-Fi — first-time setup (USB required)

1. Put your Android device and Windows computer on the same Wi-Fi network.
2. Connect the Android device over USB and approve USB debugging.
3. Under **Set up wireless**, select your USB device and optionally set a nickname.
4. Click **Set up Wi-Fi**. The app reads `wlan0`, runs `adb tcpip 5555`, connects and saves your device.
5. Disconnect the USB cable and use **Connect over Wi-Fi** to reconnect later.

> **Note:** Some devices use a different interface name or block legacy TCP/IP debugging. The IP may change when your router assigns a new address. Some devices reset TCP/IP mode after reboot. Android 11+ native wireless pairing using an on-screen code is **not yet implemented**.

### Wi-Fi — reconnect

Pick a saved device or enter its IP and port, then click **Connect & mirror**. If a reconnect fails after an Android reboot, re-enable Wi-Fi debugging using USB setup.

## Settings

| Setting | Default |
|---|---|
| Bitrate | 16 Mbps |
| Max FPS | 60 |
| Max size | 1920 px |
| Window title | Tablet |
| ADB executable | `adb` |
| scrcpy executable | `scrcpy` |

Preferences are saved under `%LOCALAPPDATA%\ScrcpyWifiManager\settings.json`.

## Build from source

```powershell
dotnet restore src/ScrcpyWifiManager/ScrcpyWifiManager.csproj
dotnet publish src/ScrcpyWifiManager/ScrcpyWifiManager.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o publish
```

Run `publish/ScrcpyWifiManager.exe`. GitHub Actions builds a Windows artifact on every push to `main`; Release publication can attach it to the release automatically.

## Security

- Classic `adb tcpip 5555` opens ADB over the local network without a per-session Wi-Fi pairing code. **Only use it on trusted private networks** and disable the mode or USB debugging when you do not need it.
- The management API is bound to `127.0.0.1` and requires same-origin requests for write operations.
- Commands launch directly via `ProcessStartInfo.ArgumentList`, not via a shell.
- The app does not embed, modify or redistribute scrcpy/ADB executables.

## Roadmap

- [ ] Android 11+ wireless pairing (ADB pairing code)
- [ ] Connected device details and visual connection diagnostics
- [ ] Add Windows tray icon and optional autostart
- [ ] Localization (English and Spanish)
- [ ] Automated integration testing on Windows/Android devices

## Contributing

Open an issue with reproduction steps, your Windows version and sanitized ADB output. PRs are welcome. Do not post device serials, private IPs or sensitive logs in public issues.

## License

Original code in this repository: **MIT**, see [LICENSE](LICENSE). `scrcpy` and Android Platform Tools are separate projects under their respective licenses.
