using AdminHelper.Services;
using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Models;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace AdminHelper.Commands;

[AddToGlobal]
public class UpdateDataCommand : AdminCommandBase
{
	private readonly PhigrosDataUpdateService _updateService;

	public UpdateDataCommand(IOptions<Config> config, DataBaseService database, LocalizationService localization, PhigrosService phigrosData, ILoggerFactory loggerFactory, PhigrosDataUpdateService updateService)
		: base(config, database, localization, phigrosData, loggerFactory)
	{
		this._updateService = updateService;
	}

	public override OneOf<string, LocalizedString> PSLName => "update-data";
	public override OneOf<string, LocalizedString> PSLDescription => "Update Phigros data. [Admin command]";

	public override SlashCommandBuilder CompleteBuilder =>
		this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		await arg.QuickReply("Updating...");
		try
		{
			await this._updateService.UpdateData();
			await arg.QuickReply("Done.");
		}
		catch (Exception ex)
		{
			this._logger.LogError(ex, "Failed to update data.");
			await arg.QuickReplyWithAttachments("Failed to update.", PSLUtils.ToAttachment(ex.ToString(), "Stacktrace.txt"));
		}
	}
}
