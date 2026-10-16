<div align="center">

# Scrcpy WiFi Manager

**A simple Windows dashboard for managing USB and Wi-Fi connections to [scrcpy](https://github.com/Genymobile/scrcpy).**

[![Build Windows](https://github.com/Bort14/scrcpy-wifi-manager/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Bort14/scrcpy-wifi-manager/actions/workflows/build.yml)
[![Latest release](https://img.shields.io/github/v/release/Bort14/scrcpy-wifi-manager?display_name=tag)](https://github.com/Bort14/scrcpy-wifi-manager/releases/latest)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-orange.svg)](https://github.com/Bort14/scrcpy-wifi-manager/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Download for Windows](https://github.com/Bort14/scrcpy-wifi-manager/releases/latest) · [Features](#features) · [Getting-started-guide](#getting-started) · [Build-from-source](#build-from-source)

</div>

Scrcpy WiFi Manager is an open-source desktop companion for [scrcpy](https://github.com/Genymobile/scrcpy). It provides a local web dashboard for launching Android screen mirroring over USB or setting up a classic ADB-over-TCP Wi-Fi connection.

> **Unofficial project:** This application is not affiliated with, endorsed by, or maintained by the scrcpy or Android teams. It does not include or redistribute scrcpy or Android Platform Tools.

The dashboard also includes a setup guide for mirroring an iPhone or iPad to Windows through a separately installed AirPlay receiver. iOS mirroring is view-only and is not handled by this application.

## Features

- Discover authorized Android devices connected over USB.
- Launch scrcpy for a selected USB or Wi-Fi device.
- Set up classic ADB-over-TCP on port 5555 over USB and save a device for reconnection.
- Reconnect to saved devices in one click from the home screen.
- Configure video bitrate, frame rate, maximum size, window title, and executable paths.
- Preserve the Android device's native resolution by default.
- Provide setup guidance for iPhone/iPad screen mirroring through a third-party Windows AirPlay receiver.
- Keep device preferences locally on your Windows account.
- Run a responsive dashboard served only on `127.0.0.1`; no account or cloud service is required.

## Getting started

### Requirements

- Windows 10 or 11, 64-bit (the downloadable release targets `win-x64`).
- [scrcpy](https://github.com/Genymobile/scrcpy) and [Android Platform Tools (ADB)](https://developer.android.com/tools/releases/platform-tools) installed and available on `PATH`, or their executable paths configured in the dashboard.
- An Android device with USB debugging enabled. Approve the computer's authorization prompt on the device.

The downloadable application is published as a self-contained .NET executable, so installing the .NET runtime or SDK is not required. **scrcpy and ADB are separate prerequisites** and must be installed independently.

### Install and launch

1. Download [`ScrcpyWifiManager.exe`](https://github.com/Bort14/scrcpy-wifi-manager/releases/latest/download/ScrcpyWifiManager.exe) from [GitHub Releases](https://github.com/Bort14/scrcpy-wifi-manager/releases/latest).
2. Save the executable anywhere on your PC and run it. No extraction or additional application files are required.
3. The dashboard opens at <http://127.0.0.1:5088>.
4. Connect your Android device over USB, enable USB debugging, and approve the authorization prompt.
5. Open **Configure devices** and complete the one-time Wi-Fi setup.
6. On the home screen, select your saved device in **Quick connect** to start mirroring with one click.

To mirror right away without setting up Wi-Fi, select your connected device in the **USB** quick-connect area on the home screen.

The release is a single, self-contained Windows executable. The dashboard assets and .NET runtime are bundled into the `.exe`; no console window or separate app files are needed. Keep the application running while using the dashboard. To open it without automatically launching a browser, run `ScrcpyWifiManager.exe --no-browser` and open the local URL yourself. Running the app again opens the existing dashboard instead of starting a second server. If startup fails, the app shows an error dialog and saves diagnostic details to `%LOCALAPPDATA%\ScrcpyWifiManager\startup-errors.log`.

## Connect over Wi-Fi

### First-time setup (USB required)

1. Connect the device over USB, authorize the computer, and connect both the device and PC to a trusted private Wi-Fi network.
2. Open **Configure devices**, choose the authorized USB device, and optionally give it a name.
3. Select **Set up Wi-Fi**. The application reads the IPv4 address from the device's `wlan0` interface, enables ADB TCP/IP on port `5555`, connects, and saves the device.
4. Disconnect USB and select the saved device under **Quick connect** on the home screen.

### Reconnect

Select a saved device on the home screen and choose **Connect**. If the device reboots or its address changes, repeat the setup under **Configure devices**.

> **Compatibility:** Wi-Fi setup currently expects the Android Wi-Fi interface to be named `wlan0`. Some devices use another interface or restrict legacy TCP/IP debugging. Android 11 and later wireless pairing with a pairing code is not implemented.

## Mirror an iPhone or iPad

Open **iPhone / iPad** in the dashboard for the setup steps. Windows does not natively act as an AirPlay receiver, so install and launch a trusted third-party Windows receiver that supports AirPlay screen mirroring. The iPhone and PC must be on the same Wi-Fi network; then start **Screen Mirroring** from Control Center on the iPhone and select the receiver.

This is a viewing guide only: it does not control the iPhone, include or detect a receiver, or handle the AirPlay stream. Receiver availability, pricing, privacy, and firewall requirements depend on the third-party software. Review its terms and privacy information before installing it.

## Security and privacy

- The dashboard binds to `127.0.0.1` and is intended for local use on your PC.
- Device settings are stored in `%LOCALAPPDATA%\ScrcpyWifiManager\settings.json`.
- Commands are started directly without passing through a shell.
- Wi-Fi setup enables legacy ADB-over-TCP on your device. Use it only on a trusted network and turn off wireless debugging or TCP/IP mode when it is no longer needed.
- The application does not upload device information or screen content to a project server.

## Build from source

Install the [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0), then run:

```powershell
dotnet restore src/ScrcpyWifiManager/ScrcpyWifiManager.csproj
dotnet run --project src/ScrcpyWifiManager/ScrcpyWifiManager.csproj
```

To publish a self-contained Windows x64 build:

```powershell
dotnet publish src/ScrcpyWifiManager/ScrcpyWifiManager.csproj `
  --configuration Release `
  --runtime win-x64 `
  --self-contained true `
  -p:EnableCompressionInSingleFile=true `
  -p:DebugType=None `
  -p:DebugSymbols=false `
  --output dist
```

The `Build Windows` GitHub Actions workflow builds the standalone executable on pushes and pull requests. Pushing a version tag such as `v0.1.3` also creates a GitHub Release with `ScrcpyWifiManager.exe` attached.

## Contributing

Bug reports and pull requests are welcome. When reporting an issue, include your Windows version, the application version, steps to reproduce, and relevant sanitized output. Do not publish device serial numbers, private IP addresses, or other personal information.

## License and third-party projects

The original code in this repository is licensed under the [MIT License](LICENSE). scrcpy and Android Platform Tools are independent projects; obtain them from their official sources and follow their respective licenses.
