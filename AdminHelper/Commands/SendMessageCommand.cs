namespace AdminHelper.Commands;

[AddToGlobal]
public class SendMessageCommand : AvailableEveryWhereAdminCommand
{
	private readonly HttpClient _httpClient = new();

	public SendMessageCommand(IServiceProvider provider) : base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "mm-send-message";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Try send message.";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption(
			"reply",
			ApplicationCommandOptionType.String,
			"Reply message ID",
			isRequired: false)
		.AddOption(
			"content",
			ApplicationCommandOptionType.String,
			"Content of the message you want",
			isRequired: true)
		.AddOption(
			"channel",
			ApplicationCommandOptionType.Channel,
			"Channel you wish to send",
			isRequired: true)
		.AddOption(
			"attachment",
			ApplicationCommandOptionType.Attachment,
			"The attachment you wish to send",
			isRequired: false);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		string content = arg.GetOption<string>("content");
		string? reply = arg.GetOptionOrDefault<string>("reply");
		IMessageChannel channel = arg.GetOption<IMessageChannel>("channel");
		IAttachment? attachment = arg.GetOptionOrDefault<IAttachment>("attachment");

		if (attachment is null)
		{
			await channel.SendMessageAsync(
				content,
				messageReference: reply is null ? null! : new(ulong.Parse(reply), channel.Id));
		}
		else
		{
			Stream stream = await this._httpClient.GetStreamAsync(attachment.Url);

			await channel.SendFileAsync(
				new FileAttachment(
					stream,
					attachment.Filename,
					attachment.Description,
					attachment.IsSpoiler()),
				content,
				messageReference: reply is null ? null! : new(ulong.Parse(reply), channel.Id));
		}
		await arg.QuickReply("Sent!");
	}
}

