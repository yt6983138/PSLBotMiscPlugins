using PSLDiscordBot.Framework.Localization;

namespace AdminHelper;
public class AdminConfig
{
	public LocalizedString BlackListedUserMessage { get; set; } = LocalizedString.CreateDefault("Oops, something is wrong!");
	public LocalizedString BlackListedCommandMessage { get; set; } = LocalizedString.CreateDefault("This command is currently disabled.");

	public long MvcSuperSecretNumber { get; set; } = Random.Shared.NextInt64();

	public string TimedBackupDestination { get; set; } = "./Backup/{0}_Timed";
	public string StartupBackupDestination { get; set; } = "./Backup/{0}_Startup/";

	public List<string> TimedBackupSources { get; set; } =
	[
		//"./PSL/",
		//"./MiscPlugins/"
	];
	public List<string> StartupBackupSources { get; set; } =
	[
		//"./PSL/",
		//"./MiscPlugins/",
		//"./Plugins/"
	];

	public TimeSpan TimedBackupInterval { get; set; } = new(6, 0, 0); // set to 0 to disable
	public bool DoStartupBackup { get; set; } = true;
}
