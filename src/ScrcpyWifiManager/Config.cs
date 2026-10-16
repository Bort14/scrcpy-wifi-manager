using System.Text.Json;

namespace ScrcpyWifiManager;

public sealed class AppConfig
{
    public List<SavedDevice> Devices { get; set; } = [];
    public int BitRateMbps { get; set; } = 16;
    public int MaxFps { get; set; } = 60;
    public int MaxSize { get; set; } = 1920;
    public string WindowTitle { get; set; } = "Tablet";
    public string AdbPath { get; set; } = "adb";
    public string ScrcpyPath { get; set; } = "scrcpy";
}
public sealed class SavedDevice
{
    public string Name { get; set; } = "Android";
    public string Ip { get; set; } = "";
    public int Port { get; set; } = 5555;
    public override string ToString() => $"{Name}  ·  {Ip}:{Port}";
}
public static class ConfigStore
{
    private static readonly string Dir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ScrcpyWifiManager");
    private static readonly string FilePath = Path.Combine(Dir, "settings.json");
    public static AppConfig Load()
    {
        try
        {
            if (File.Exists(FilePath))
                return JsonSerializer.Deserialize<AppConfig>(File.ReadAllText(FilePath)) ?? new();
        }
        catch (Exception) { /* Invalid preferences are ignored; no privileged file writes. */ }
        return new();
    }
    public static void Save(AppConfig config)
    {
        Directory.CreateDirectory(Dir);
        var temp = FilePath + ".tmp";
        File.WriteAllText(temp, JsonSerializer.Serialize(config, new JsonSerializerOptions { WriteIndented = true }));
        File.Move(temp, FilePath, true);
    }
}
