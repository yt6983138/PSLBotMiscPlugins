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
public class CommandStatisticsCommand : GuestCommandBase
{
	private readonly CommandStatisticsService _commandStatisticsService;

	public CommandStatisticsCommand(IOptions<Config> config, DataBaseService database, LocalizationService localization, PhigrosService phigrosData, ILoggerFactory loggerFactory, CommandStatisticsService commandStatisticsService)
		: base(config, database, localization, phigrosData, loggerFactory)
	{
		this._commandStatisticsService = commandStatisticsService;
	}

	public override OneOf<string, LocalizedString> PSLName => "command-statistics";
	public override OneOf<string, LocalizedString> PSLDescription => "Show all command statistics, including all global/guild/user/message commands.";
	public override bool IsEphemeral => false;

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		using CommandStatisticsService.Requester commandStatRequester = this._commandStatisticsService.NewRequester();

		List<CommandStatisticInfo> filtered = await commandStatRequester.GetAllExistingReadonly();
		filtered.Sort((x, y) => y.UseCount.CompareTo(x.UseCount));

		ColumnTextBuilder builder = new("Use count", "Command name");
		foreach (CommandStatisticInfo item in filtered)
		{
			builder.WithRow(item.UseCount.ToString(), item.CommandName);
		}

		await arg.QuickReplyWithAttachments(
			$"There are {filtered.Count} statistics:",
			PSLUtils.ToAttachment(builder.Build().ToString(), "Return.txt"));
	}
}
