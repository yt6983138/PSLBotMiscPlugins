using CommandStatistics.Services;
using Discord;
using Discord.WebSocket;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.DependencyInjection;
using System.Text;

namespace CommandStatistics.Commands;

[AddToGlobal]
public class CommandStatisticsCommand : GuestCommandBase
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	[Inject]
	public CommandStatisticsService CommandStatisticsService { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

	public override string Name => "command-statistics";
	public override string Description => "Show all command statistics, including all global/guild/user/message commands.";
	public override bool IsEphemeral => false;

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		List<KeyValuePair<string, CommandStatisticInfo>> filtered = this.CommandStatisticsService.Data
			.Where(x => x.Value.ExistsAnymore)
			.ToList();
		filtered.Sort((x, y) => y.Value.UseCount.CompareTo(x.Value.UseCount));

		StringBuilder sb = new("Use count | Command name\n");
		foreach (KeyValuePair<string, CommandStatisticInfo> item in filtered)
		{
			string useCount = item.Value.UseCount.ToString();
			sb.Append(useCount);
			sb.Append(' ', 10 - useCount.Length);
			sb.Append("| ");
			sb.AppendLine(item.Key);
		}

		await arg.QuickReplyWithAttachments(
			$"There are {filtered.Count} statistics:",
			new FileAttachment(new MemoryStream(Encoding.UTF8.GetBytes(sb.ToString())), "Return.txt"));
	}
}
