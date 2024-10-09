using PSLDiscordBot.Framework.ServiceBase;

namespace VerifierAndBanner.Config;
public class VABConfigService : FileManagementServiceBase<VABConfig>
{
	public const string ConfigLocation = "./MiscPlugins/VABConfig.json";

	public VABConfigService()
		: base(ConfigLocation)
	{
		this.AutoSaveIntervalMs = 0;
	}

	public override VABConfig Generate()
	{
		return new();
	}

	protected override bool Load(out VABConfig data)
	{
		bool success = this.TryLoadJsonAs(this.InfoOfFile, out data);

		return success;
	}

	protected override void Save(VABConfig data)
	{
		this.WriteJsonToFile(this.InfoOfFile, data);
	}
}
