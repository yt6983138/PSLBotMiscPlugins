using Microsoft.Extensions.Logging;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.DependencyInjection;
using yt6983138.Common;

namespace AutoBackup;

public class AutoBackupPlugin : IPlugin
{
	private static readonly EventId EventId = new(114514_110, nameof(AutoBackupPlugin));

	string IPlugin.Name => "Auto Backup";
	string IPlugin.Description => "Auto backup operation";
	string IPlugin.Version => "0.0.0.1";
	int IPlugin.VersionId => 0x00_00_00_01;
	string IPlugin.Author => "yt6983138 aka static_void (yt6983138@gmail.com)";
	int IPlugin.Priority => 114514_1145;

	bool IPlugin.CanBeDynamicallyLoaded => false;
	bool IPlugin.CanBeDynamicallyUnloaded => false;

	public Timer? BackupTimer { get; set; }
	public Logger Logger { get; set; } = null!;
	public ConfigService ConfigService { get; set; } = null!;

	public string FormattedTimedDestination =>
		string.Format(this.ConfigService.Data.TimedBackupDestination, DateTime.Now.ToString("s")).Replace(':', '_');
	public string FormattedStartupDestination =>
		string.Format(this.ConfigService.Data.StartupBackupDestination, DateTime.Now.ToString("s")).Replace(':', '_');

	void IPlugin.Load(Program program, bool isDynamicLoading)
	{
		program.AfterMainInitialize += this.Program_AfterMainInitialize;
	}
	void IPlugin.Unload(Program program, bool isDynamicUnloading)
	{
	}

	private void Program_AfterMainInitialize(object? sender, EventArgs e)
	{
		this.Logger = InjectableBase.GetSingleton<Logger>();
		this.ConfigService = new();
		InjectableBase.AddSingleton(this.ConfigService);

		if (this.ConfigService.Data.TimedBackupInterval != TimeSpan.Zero)
		{
			this.BackupTimer = new(
				this.TimedSave,
				null,
				this.ConfigService.Data.TimedBackupInterval, // prevent being started immediately
				this.ConfigService.Data.TimedBackupInterval);
		}
		if (this.ConfigService.Data.DoStartupBackup)
		{
			this.Logger.Log(LogLevel.Information, "Startup backup begin.", EventId, this);
			this.SaveThings(this.FormattedStartupDestination, this.ConfigService.Data.StartupBackupSources);
			this.Logger.Log(LogLevel.Information, "Startup backup ended.", EventId, this);
		}
	}

	private void TimedSave(object? state)
	{
		this.Logger.Log(LogLevel.Information, "Timed backup begin.", EventId, this);
		this.SaveThings(this.FormattedTimedDestination, this.ConfigService.Data.TimedBackupSources);
		this.Logger.Log(LogLevel.Information, "Timed backup ended.", EventId, this);
	}
	private void SaveThings(string dest, List<string> things)
	{
		List<FileSystemInfo> files = new();
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
				this.Logger.Log(LogLevel.Warning, $"Source backup file/folder '{item}' do not exist. Skipping.", EventId, this);
			}
		}

		foreach (FileSystemInfo file in files)
		{
			try
			{
				if (file is DirectoryInfo di)
				{
					CopyFolder(dest, di, true);
				}
				else if (file is FileInfo fi)
				{
					fi.CopyTo(dest, true);
				}
				else throw new ApplicationException("This should not happen");
			}
			catch (Exception ex)
			{
				this.Logger.Log(LogLevel.Error, $"Failed to backup file/folder '{file.FullName}'.", EventId, this, ex);
			}
		}

		static void CopyFolder(string dest, DirectoryInfo src, bool overwrite)
		{
			foreach (FileInfo item in src.GetFiles())
			{
				item.CopyTo(Path.Combine(dest, item.Name), overwrite);
			}
			foreach (DirectoryInfo item in src.GetDirectories())
			{
				string target = Path.Combine(dest, item.Name);
				Directory.CreateDirectory(target);
				CopyFolder(target, item, overwrite);
			}
		}
	}
}
