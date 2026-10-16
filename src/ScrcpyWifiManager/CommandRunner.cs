using System.Diagnostics;
using System.Text;

namespace ScrcpyWifiManager;

public sealed record CommandResult(int ExitCode, string Output)
{
    public bool Success => ExitCode == 0;
}

public static class CommandRunner
{
    public static async Task<CommandResult> RunAsync(string exe, IEnumerable<string> arguments, CancellationToken ct = default)
    {
        using var process = NewProcess(exe, arguments, redirect: true);
        try
        {
            if (!process.Start()) throw new InvalidOperationException($"No se pudo ejecutar {exe}.");
        }
        catch (System.ComponentModel.Win32Exception ex)
        {
            throw new InvalidOperationException($"No se encuentra '{exe}'. Instala scrcpy (incluye ADB) o configura la ruta en Ajustes.", ex);
        }
        var std = process.StandardOutput.ReadToEndAsync(ct);
        var err = process.StandardError.ReadToEndAsync(ct);
        try { await process.WaitForExitAsync(ct); }
        catch (OperationCanceledException)
        {
            if (!process.HasExited) process.Kill(entireProcessTree: true);
            throw;
        }
        return new CommandResult(process.ExitCode, (await std + Environment.NewLine + await err).Trim());
    }

    public static Process StartDetached(string exe, IEnumerable<string> arguments)
    {
        var process = NewProcess(exe, arguments, redirect: false);
        try
        {
            if (!process.Start()) throw new InvalidOperationException($"No se pudo iniciar {exe}.");
            return process;
        }
        catch (System.ComponentModel.Win32Exception ex)
        {
            process.Dispose();
            throw new InvalidOperationException($"No se encuentra '{exe}'. Configura su ruta en Ajustes.", ex);
        }
    }

    private static Process NewProcess(string exe, IEnumerable<string> args, bool redirect)
    {
        var psi = new ProcessStartInfo(exe)
        {
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardOutput = redirect,
            RedirectStandardError = redirect
        };
        if (redirect)
        {
            psi.StandardOutputEncoding = Encoding.UTF8;
            psi.StandardErrorEncoding = Encoding.UTF8;
        }
        foreach (var arg in args) psi.ArgumentList.Add(arg); // Never invoke cmd.exe or concatenate untrusted args.
        return new Process { StartInfo = psi };
    }
}
