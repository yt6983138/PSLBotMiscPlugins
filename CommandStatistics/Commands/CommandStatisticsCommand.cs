using CommandStatistics.Services;
using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Services.Phigros;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;
using System.Text;

namespace CommandStatistics.Commands;

[AddToGlobal]
public class CommandStatisticsCommand : GuestCommandBase
{
	private readonly CommandStatisticsService _commandStatisticsService;

	public CommandStatisticsCommand(IOptions<Config> config, DataBaseService database, LocalizationService localization, PhigrosDataService phigrosData, ILoggerFactory loggerFactory, CommandStatisticsService commandStatisticsService)
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
		List<CommandStatisticInfo> filtered = await this._commandStatisticsService.GetAllExistingReadonly();
		filtered.Sort((x, y) => y.UseCount.CompareTo(x.UseCount));

		StringBuilder sb = new("Use count | Command name\n");
		foreach (CommandStatisticInfo item in filtered)
		{
			string useCount = item.UseCount.ToString();
			sb.Append(useCount);
			sb.Append(' ', 10 - useCount.Length);
			sb.Append("| ");
			sb.AppendLine(item.CommandName);
		}

		await arg.QuickReplyWithAttachments(
			$"There are {filtered.Count} statistics:",
			new FileAttachment(new MemoryStream(Encoding.UTF8.GetBytes(sb.ToString())), "Return.txt"));
	}
}
