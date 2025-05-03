using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Framework;

namespace AutoBackup;

public class AutoBackupPlugin : IPlugin
{
	private static readonly EventId EventId = new(114514_110, nameof(AutoBackupPlugin));

	string IPlugin.Name => "Auto Backup";
	string IPlugin.Description => "Auto backup operation";
	Version IPlugin.Version => new(1, 0, 0, 0);
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_1145;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	public Timer? BackupTimer { get; set; }
	public ILogger<AutoBackupPlugin> Logger { get; set; } = null!;
	public IOptions<Config> Config { get; set; } = null!;

	public string FormattedTimedDestination =>
		string.Format(this.Config.Value.TimedBackupDestination, DateTime.Now.ToString("s")).Replace(':', '_');
	public string FormattedStartupDestination =>
		string.Format(this.Config.Value.StartupBackupDestination, DateTime.Now.ToString("s")).Replace(':', '_');

	public void Load(WebApplicationBuilder hostBuilder, bool isDynamicLoading)
	{
		hostBuilder.Services.Configure<Config>(
			hostBuilder.Configuration.GetSection("AutoBackupConfig"));
	}
	public void Setup(IHost host)
	{
		this.Logger = host.Services.GetRequiredService<ILogger<AutoBackupPlugin>>();
		this.Config = host.Services.GetRequiredService<IOptions<Config>>();

		if (this.Config.Value.TimedBackupInterval != TimeSpan.Zero)
		{
			this.BackupTimer = new(
				this.TimedSave,
				null,
				this.Config.Value.TimedBackupInterval, // prevent being started immediately
				this.Config.Value.TimedBackupInterval);
		}
		if (this.Config.Value.DoStartupBackup)
		{
			this.Logger.LogInformation(EventId, "Startup backup begin.");
			this.SaveThings(this.FormattedStartupDestination, this.Config.Value.StartupBackupSources);
			this.Logger.LogInformation(EventId, "Startup backup ended.");
		}
	}
	public void Unload(IHost host, bool isDynamicUnloading)
	{
	}

	private void TimedSave(object? state)
	{
		this.Logger.LogInformation(EventId, "Timed backup begin.");
		this.SaveThings(this.FormattedTimedDestination, this.Config.Value.TimedBackupSources);
		this.Logger.LogInformation(EventId, "Timed backup ended.");
	}
	private void SaveThings(string dest, List<string> things)
	{
		List<FileSystemInfo> files = [];
		foreach (string item in things)
		{
			if (File.Exists(item))
			{
				files.Add(new FileInfo(item));
			}
			else if (Directory.Exists(item))
			{
				files.Add(new DirectoryInfo(item));
			}
			else
			{
				this.Logger.LogWarning(EventId, "Source backup file/folder '{item}' do not exist. Skipping.", item);
			}
		}

		foreach (FileSystemInfo file in files)
		{
			try
			{
				if (file is DirectoryInfo di)
				{
					CopyFolder(Path.Combine(dest, di.Name), di, true);
				}
				else if (file is FileInfo fi)
				{
					string folder = Path.Combine(dest, fi.Directory!.Name);
					Directory.CreateDirectory(folder);
					fi.CopyTo(folder, true);
				}
				else
				{
					throw new ApplicationException("This should not happen");
				}
			}
			catch (Exception ex)
			{
				this.Logger.LogError(EventId, ex, "Failed to backup file/folder '{path}'.", file.FullName);
			}
		}

		static void CopyFolder(string dest, DirectoryInfo src, bool overwrite)
		{
			Directory.CreateDirectory(dest);
			foreach (FileInfo item in src.GetFiles())
			{
				item.CopyTo(Path.Combine(dest, item.Name), overwrite);
			}
			foreach (DirectoryInfo item in src.GetDirectories())
			{
				CopyFolder(Path.Combine(dest, item.Name), item, overwrite);
			}
		}
	}
}
