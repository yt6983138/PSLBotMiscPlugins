using Discord.Rest;

namespace AdminHelper.Commands;

[AddToGlobal]
public class EditMessageCommand : AvailableEveryWhereAdminCommand
{
	public EditMessageCommand(IServiceProvider provider) : base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "mm-edit-message";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Try edit message.";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
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
		IMessageChannel channel = arg.GetOption<IMessageChannel>("channel");

		string id = arg.GetOption<string>("message_id");

		IMessage message = await channel.GetMessageAsync(ulong.Parse(id));
		RestUserMessage editibleMessage = (RestUserMessage)message;
		await editibleMessage.ModifyAsync(
			x =>
			{
				x.Content = arg.GetOption<string>("content");
			});
		await arg.QuickReply($"Edited {message.Id}");
	}
}

