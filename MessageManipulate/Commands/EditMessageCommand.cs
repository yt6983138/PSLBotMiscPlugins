using Discord;
using Discord.Rest;
using Discord.WebSocket;
using PSLDiscordBot.Core.Command.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;

namespace MessageManipulate.Commands;

[AddToGlobal]
public class EditMessageCommand : AdminCommandBase
{
	public override string Name => "mm-edit-message";
	public override string Description => "Try edit message. [Admin command]";

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
			isRequired: true)
		.AddOption(
			"content",
			ApplicationCommandOptionType.String,
			"Content of the message you want",
			isRequired: false);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		try
		{
			ITextChannel channel = (ITextChannel)arg.Data.Options.First(x => x.Name == "channel")
				.Value.Unbox<IGuildChannel>();

			string id = arg.Data.Options.First(x => x.Name == "message_id").Value.Unbox<string>();

			IMessage message = await channel.GetMessageAsync(ulong.Parse(id));
			RestUserMessage editibleMessage = (RestUserMessage)message;
			await editibleMessage.ModifyAsync(
				x =>
				{
					x.Content = arg.Data.Options.FirstOrDefault(a => a.Name == "content")?
						.Value.Unbox<string>() ?? "";
				});
			await arg.ModifyOriginalResponseAsync(
				x => x.Content = $"Edited {message.Id}");
		}
		catch (Exception ex)
		{
			await arg.ModifyOriginalResponseAsync(
				x => x.Content = ex.Message);
		}
	}
}
