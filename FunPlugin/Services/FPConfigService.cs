using PSLDiscordBot.Framework.ServiceBase;

namespace FunPlugin.Services;
public class FPConfigService : FileManagementServiceBase<FPConfig>
{
	public FPConfigService()
		: base("./MiscPlugins/FPConfig.json")
	{
		this.AutoSaveIntervalMs = 0;
	}

	public override FPConfig Generate()
	{
		return new();
	}
	protected override bool Load(out FPConfig data)
	{
		return this.TryLoadJsonAs(this.InfoOfFile, out data);
	}

	protected override void Save(FPConfig data)
	{
		this.WriteJsonToFile(this.InfoOfFile, data);
	}
}
