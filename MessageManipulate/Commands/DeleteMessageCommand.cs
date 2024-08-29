using Discord;
using Discord.WebSocket;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;

namespace MessageManipulate.Commands;

[AddToGlobal]
public class DeleteMessageCommand : AdminCommandBase
{
	public override string Name => "mm-delete-message";
	public override string Description => "Try delete message. [Admin command]";

	public override SlashCommandBuilder CompleteBuilder =>
		this.BasicBuilder
		.AddOption(
			"channel",
			ApplicationCommandOptionType.Channel,
			"Channel that the message is in",
			isRequired: true)
		.AddOption(
			"message_id",
			ApplicationCommandOptionType.String,
			"Message ID",
			isRequired: true);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		try
		{
			IMessageChannel channel = arg.Data.Options.First(x => x.Name == "channel")
				.Value.Unbox<IMessageChannel>();

			string id = arg.Data.Options.First(x => x.Name == "message_id").Value.Unbox<string>();

			IMessage message = await channel.GetMessageAsync(ulong.Parse(id));
			await message.DeleteAsync();
			await arg.ModifyOriginalResponseAsync(
				x => x.Content = $"Deleted {message.Id}");
		}
		catch (Exception ex)
		{
			await arg.ModifyOriginalResponseAsync(
				x => x.Content = ex.Message);
		}
	}
}
