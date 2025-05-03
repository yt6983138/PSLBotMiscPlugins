namespace AutoBackup;
public class Config
{
	public string TimedBackupDestination { get; set; } = "./Backup/{0}_Timed";
	public string StartupBackupDestination { get; set; } = "./Backup/{0}_Startup/";

	public List<string> TimedBackupSources { get; set; } =
	[
		"./PSL/",
		"./MiscPlugins/"
	];
	public List<string> StartupBackupSources { get; set; } =
	[
		"./PSL/",
		"./MiscPlugins/",
		"./Plugins/"
	];

	public TimeSpan TimedBackupInterval { get; set; } = new(6, 0, 0); // set to 0 to disable
	public bool DoStartupBackup { get; set; } = true;
}
