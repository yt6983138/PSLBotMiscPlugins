using PSLDiscordBot.Framework.ServiceBase;

namespace AdminHelper.Services;
public class AdminConfigService : FileManagementServiceBase<AdminConfig>
{
	public AdminConfigService() : base("./MiscPlugin/AdminConfig.json") { }

	public override AdminConfig Generate()
	{
		return new();
	}

	protected override bool Load(out AdminConfig data)
	{
		return this.TryLoadJsonAs(this.InfoOfFile, out data);
	}

	protected override void Save(AdminConfig data)
	{
		this.WriteJsonToFile(this.InfoOfFile, data);
	}
}
