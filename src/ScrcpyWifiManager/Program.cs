using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Text.Json;
using ScrcpyWifiManager;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://127.0.0.1:5088");
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

// Strictly local control surface. No LAN listening or remote control.
app.Use(async (context, next) =>
{
    if (!IPAddress.IsLoopback(context.Connection.RemoteIpAddress ?? IPAddress.None))
    { context.Response.StatusCode = 403; return; }
    if (context.Request.Method is "POST" or "PUT" or "DELETE")
    {
        var origin = context.Request.Headers.Origin.ToString();
        if (origin != "http://127.0.0.1:5088")
        { context.Response.StatusCode = 403; return; }
    }
    await next();
});

var config = ConfigStore.Load();
var gate = new SemaphoreSlim(1, 1);
var logs = new List<string>();
void Log(string message)
{
    lock(logs) { logs.Insert(0, $"{DateTime.Now:HH:mm:ss}  {message}"); if (logs.Count > 70) logs.RemoveAt(logs.Count-1); }
    Console.WriteLine(message);
}
async Task<IResult> Run(Func<AndroidService,CancellationToken,Task<object?>> action, CancellationToken ct)
{
    if (!await gate.WaitAsync(0, ct)) return Results.Conflict(new {error="Otra operación sigue en curso."});
    try { var value=await action(new AndroidService(config),ct); return Results.Ok(new {ok=true, data=value}); }
    catch(Exception ex) { Log("ERROR: " + ex.Message); return Results.BadRequest(new {error=ex.Message}); }
    finally { gate.Release(); }
}

app.MapGet("/api/status", () =>
{
    lock(logs) return Results.Ok(new {settings=config, logs=logs.ToArray()});
});
app.MapGet("/api/devices", async (CancellationToken ct) => await Run(async (s,t)=>
{
    var items=await s.DevicesAsync(t); Log($"Detectados {items.Count} dispositivo(s) ADB."); return items;
},ct));
app.MapPost("/api/usb", async (DeviceRequest request, CancellationToken ct) => await Run((s,t)=>
{
    if (string.IsNullOrWhiteSpace(request.Serial)) throw new InvalidOperationException("Selecciona un dispositivo USB autorizado.");
    var p=s.Launch(request.Serial); Log("scrcpy USB iniciado para " + request.Serial); return Task.FromResult<object?>(new {pid=p.Id});
},ct));
app.MapPost("/api/setup", async (DeviceRequest request, CancellationToken ct) => await Run(async (s,t)=>
{
    if (string.IsNullOrWhiteSpace(request.Serial) || request.Serial.Contains(':')) throw new InvalidOperationException("Selecciona un dispositivo USB autorizado.");
    var devices=await s.DevicesAsync(t);
    if (!devices.Any(x=>x.Serial==request.Serial && x.State=="device")) throw new InvalidOperationException("El dispositivo USB no está autorizado o conectado.");
    var ip=await s.GetWifiIpAsync(request.Serial,t);
    await s.EnableTcpipAsync(request.Serial,5555,t);
    await Task.Delay(1800,t);
    var endpoint=await s.ConnectAsync(ip,5555,t);
    var saved=config.Devices.FirstOrDefault(x=>x.Ip==ip && x.Port==5555);
    if(saved==null) config.Devices.Add(new SavedDevice{Name=string.IsNullOrWhiteSpace(request.Name)?"Android device":request.Name.Trim()[..Math.Min(request.Name.Trim().Length,50)],Ip=ip,Port=5555});
    ConfigStore.Save(config);
    Log("Wi-Fi configurado: " + endpoint);
    var p=s.Launch(endpoint);
    return new {ip,endpoint,pid=p.Id};
},ct));
app.MapPost("/api/connect", async (ConnectRequest request, CancellationToken ct) => await Run(async (s,t)=>
{
    var endpoint=await s.ConnectAsync(request.Ip,request.Port,t);
    if (request.Save && !config.Devices.Any(x=>x.Ip==request.Ip && x.Port==request.Port))
    { config.Devices.Add(new SavedDevice{Name=string.IsNullOrWhiteSpace(request.Name)?"Android device":request.Name.Trim()[..Math.Min(request.Name.Trim().Length,50)],Ip=request.Ip,Port=request.Port}); ConfigStore.Save(config); }
    var p=s.Launch(endpoint); Log("scrcpy Wi-Fi iniciado: " + endpoint); return new {endpoint,pid=p.Id};
},ct));
app.MapPost("/api/settings", async (AppConfig settings, CancellationToken ct) => await Run((s,t)=>
{
    if (settings.Devices.Count>100) throw new InvalidOperationException("Demasiados dispositivos.");
    config.BitRateMbps=Math.Clamp(settings.BitRateMbps,1,80);
    config.MaxFps=Math.Clamp(settings.MaxFps,1,240);
    config.MaxSize=Math.Clamp(settings.MaxSize,240,3840);
    config.WindowTitle=(settings.WindowTitle ?? "Android")[..Math.Min((settings.WindowTitle ?? "Android").Length,70)];
    config.AdbPath=string.IsNullOrWhiteSpace(settings.AdbPath)?"adb":settings.AdbPath;
    config.ScrcpyPath=string.IsNullOrWhiteSpace(settings.ScrcpyPath)?"scrcpy":settings.ScrcpyPath;
    ConfigStore.Save(config); Log("Configuración guardada."); return Task.FromResult<object?>(config);
},ct));
app.MapPost("/api/remove", async (RemoveRequest request, CancellationToken ct) => await Run((s,t)=>
{
    config.Devices.RemoveAll(x=>x.Ip==request.Ip && x.Port==request.Port);
    ConfigStore.Save(config); Log("Dispositivo eliminado."); return Task.FromResult<object?>(null);
},ct));

Log("Panel iniciado en http://127.0.0.1:5088");
app.Lifetime.ApplicationStarted.Register(() =>
{
    if (args.Contains("--no-browser")) return;
    try { Process.Start(new ProcessStartInfo("http://127.0.0.1:5088") {UseShellExecute=true}); }
    catch { /* URL is printed for manual opening */ }
});
await app.RunAsync();

record DeviceRequest(string Serial,string? Name);
record ConnectRequest(string Ip,int Port,bool Save,string? Name);
record RemoveRequest(string Ip,int Port);
