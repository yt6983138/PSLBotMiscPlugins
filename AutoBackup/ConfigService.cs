using PSLDiscordBot.Framework.ServiceBase;

namespace AutoBackup;
public class ConfigService : FileManagementServiceBase<Config>
{
	public ConfigService()
		: base("./MiscPlugins/ABConfig.json")
	{
	}

	public override Config Generate()
	{
		return new();
	}

	protected override bool Load(out Config data)
	{
		return TryLoadJsonAs(this.InfoOfFile, out data);
	}

	protected override void Save(Config data)
	{
		WriteToFile(this.InfoOfFile, data);
	}
}
