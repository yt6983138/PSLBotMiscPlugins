using AdminHelper.Services;

namespace AdminHelper.Commands;

[AddToGlobal]
public class UpdateDataCommand : AdminCommandBase
{
	private readonly PhigrosDataUpdateService _updateService;

	public UpdateDataCommand(IServiceProvider provider, PhigrosDataUpdateService updateService)
		: base(provider)
	{
		this._updateService = updateService;
	}

	public override OneOf<string, LocalizedString> PSLName => "update-data";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Update Phigros data.";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption(
			"reuse-existing-package",
			ApplicationCommandOptionType.Boolean,
			"reuse the existing package or not",
			isRequired: false)
		.AddOption(
			"tpk",
			ApplicationCommandOptionType.Attachment,
			"tpk file, omit to get one automatically",
			isRequired: false);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		await arg.QuickReply("Updating...");
		bool reuseExistingPackage = arg.GetOptionOrDefault<bool>("reuse-existing-package");
		// seems like the newest tpk file is kinda broken, so providing an option to use a custom one
		IAttachment? tpk = arg.GetOptionOrDefault<IAttachment>("tpk");

		try
		{
			await this._updateService.UpdateData(reuseExistingPackage, tpk?.Url ?? "AUTO");
			await arg.QuickReply("Done.");
		}
		catch (Exception ex)
		{
			this._logger.LogError(ex, "Failed to update data.");
			await arg.QuickReplyWithAttachments("Failed to update.", PSLUtils.ToAttachment(ex.ToString(), "Stacktrace.txt"));
		}
	}
}

