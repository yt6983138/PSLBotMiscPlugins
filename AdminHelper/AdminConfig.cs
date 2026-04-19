using PSLDiscordBot.Framework.Localization;

namespace AdminHelper;
public class AdminConfig
{
	public LocalizedString BlackListedDefaultMessage { get; set; } = LocalizedString.CreateDefault("Oops, something is wrong!");

	public long MvcSuperSecretNumber { get; set; }
#if DEBUG
		= Secret.MyExtremelyImportantSecretThatCannotBeTrackedSoIMadeItInAnotherClassAndIDKWhyIAmMakingTheNameSoLong;
#else
		= Random.Shared.NextInt64();
#endif

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
