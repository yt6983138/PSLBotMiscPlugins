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
	public override string Name => "command-statistics";
	public override string Description => "Show all command statistics, including all global/guild/user/message commands.";
	public override bool IsEphemeral => false;

	public override SlashCommandBuilder CompleteBuilder
		=> this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		CommandStatisticsService? service = InjectableBase.GetSingleton<CommandStatisticsService>();
		if (service is null)
		{
			await arg.QuickReply("Something went wrong.");
			return;
		}

		List<KeyValuePair<string, CommandStatisticInfo>> filtered = service.Data
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
