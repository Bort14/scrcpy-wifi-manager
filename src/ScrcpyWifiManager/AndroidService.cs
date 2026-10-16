using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;

namespace ScrcpyWifiManager;

public sealed record AdbDevice(string Serial, string State)
{
    public override string ToString() => $"{Serial}  ·  {State}";
}

public sealed class AndroidService(AppConfig config)
{
    public Task<CommandResult> AdbAsync(CancellationToken ct, params string[] args) => CommandRunner.RunAsync(config.AdbPath, args, ct);

    public async Task<List<AdbDevice>> DevicesAsync(CancellationToken ct)
    {
        var r = await AdbAsync(ct, "devices", "-l");
        if (!r.Success) throw new InvalidOperationException(r.Output);
        return r.Output.Split('\n', StringSplitOptions.RemoveEmptyEntries)
            .Skip(1).Select(x => x.Trim()).Where(x => x.Length > 0 && !x.StartsWith('*'))
            .Select(x => Regex.Split(x, @"\s+")).Where(parts => parts.Length >= 2)
            .Select(parts => new AdbDevice(parts[0], parts[1])).ToList();
    }

    public async Task<string> GetWifiIpAsync(string serial, CancellationToken ct)
    {
        var result = await AdbAsync(ct, "-s", serial, "shell", "ip", "-f", "inet", "addr", "show", "wlan0");
        if (!result.Success) throw new InvalidOperationException("No se pudo obtener la IP Wi-Fi: " + result.Output);
        var matches = Regex.Matches(result.Output, @"\binet\s+(\d{1,3}(?:\.\d{1,3}){3})/");
        foreach (Match m in matches)
        {
            if (IPAddress.TryParse(m.Groups[1].Value, out var ip) && ip.AddressFamily == AddressFamily.InterNetwork && !IPAddress.IsLoopback(ip))
                return ip.ToString();
        }
        throw new InvalidOperationException("No se detectó dirección IPv4 en wlan0. Conecta el dispositivo al Wi-Fi e inténtalo de nuevo.");
    }

    public async Task<string> EnableTcpipAsync(string serial, int port, CancellationToken ct)
    {
        var r = await AdbAsync(ct, "-s", serial, "tcpip", port.ToString());
        if (!r.Success || !r.Output.Contains("restarting in TCP mode", StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException("ADB no pudo activar TCP/IP: " + r.Output);
        return r.Output;
    }

    public async Task<string> ConnectAsync(string ip, int port, CancellationToken ct)
    {
        if (!IPAddress.TryParse(ip, out var addr) || addr.AddressFamily != AddressFamily.InterNetwork)
            throw new InvalidOperationException("Introduce una dirección IPv4 válida.");
        if (port is < 1 or > 65535) throw new InvalidOperationException("Puerto fuera de rango.");
        var endpoint = $"{ip}:{port}";
        var r = await AdbAsync(ct, "connect", endpoint);
        if (!r.Success || !(r.Output.Contains("connected to", StringComparison.OrdinalIgnoreCase) || r.Output.Contains("already connected", StringComparison.OrdinalIgnoreCase)))
            throw new InvalidOperationException("No se pudo conectar por Wi-Fi: " + r.Output);
        return endpoint;
    }

    public System.Diagnostics.Process Launch(string serial)
    {
        var args = new List<string> { "-s", serial, $"--video-bit-rate={Math.Clamp(config.BitRateMbps, 1, 80)}M", $"--max-fps={Math.Clamp(config.MaxFps, 1, 240)}", $"--max-size={Math.Clamp(config.MaxSize, 240, 3840)}", "--window-title", config.WindowTitle };
        return CommandRunner.StartDetached(config.ScrcpyPath, args);
    }
}
