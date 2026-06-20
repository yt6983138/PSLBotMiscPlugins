namespace AdminHelper.Commands;

[AddToGlobal]
public class DeleteMessageCommand : AvailableEveryWhereAdminCommand
{
	public DeleteMessageCommand(IServiceProvider provider) : base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "mm-delete-message";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Try delete message.";

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
			isRequired: true);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		IMessageChannel channel = arg.GetOption<IMessageChannel>("channel");

		string id = arg.GetOption<string>("message_id");

		IMessage message = await channel.GetMessageAsync(ulong.Parse(id));
		await message.DeleteAsync();
		await arg.QuickReply($"Deleted {message.Id}");
	}
}

