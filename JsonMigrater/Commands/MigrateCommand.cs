using Discord;
using Discord.WebSocket;
using Newtonsoft.Json;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace JsonMigrater.Commands;

file record class OldUserData(string Token, string ShowFormat, List<string> Tags);

[AddToGlobal]
public class MigrateAdminCommand : AdminCommandBase
{
	public override OneOf<string, LocalizedString> PSLName => "migrate";
	public override OneOf<string, LocalizedString> PSLDescription => "Migrate json data to sqlite database. [Admin command]";

	public override SlashCommandBuilder CompleteBuilder =>
		this.BasicBuilder
		.AddOption(
			"json_file",
			ApplicationCommandOptionType.Attachment,
			"The userdata.json.",
			isRequired: true);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		IAttachment attachment = arg.Data.Options.First().Value.Unbox<IAttachment>();
		using HttpClient client = new();

		Discord.Rest.RestInteractionMessage message = await arg.ModifyOriginalResponseAsync(
			x => x.Content = "Migrating...");

		string rawJson = await client.GetStringAsync(attachment.Url);
		Dictionary<ulong, OldUserData> parsed = JsonConvert.DeserializeObject<Dictionary<ulong, OldUserData>>(rawJson)!;

		int i = 0;
		foreach (KeyValuePair<ulong, OldUserData> item in parsed)
		{
			i++;
			Task<int> t1 = requester.AddOrReplaceUserDataAsync(item.Key, new(item.Value.Token) { ShowFormat = item.Value.ShowFormat });
			//Task<int> t2 = requester.AddOrReplaceTagsAsync(item.Key, item.Value.Tags.ToArray());
			// no tags anymore
			Task.WaitAll(t1);
			if (i % 100 == 0)
				await message.ModifyAsync(x => x.Content = $"Migrated {i} records.");
		}

		await message.ModifyAsync(
			x => x.Content = $"Migrate complete, migrated {parsed.Count} records.");
	}
}
