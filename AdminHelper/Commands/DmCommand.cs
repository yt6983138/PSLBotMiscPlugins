namespace AdminHelper.Commands;

[AddToGlobal]
public class DmCommand : AvailableEveryWhereAdminCommand
{
	private readonly HttpClient _httpClient = new();

	public DmCommand(IServiceProvider provider) : base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "mm-dm";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Try dm someone.";

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
			"user",
			ApplicationCommandOptionType.User,
			"User you wish to dm",
			isRequired: true)
		.AddOption(
			"attachment",
			ApplicationCommandOptionType.Attachment,
			"The attachment you wish to send",
			isRequired: false);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		string content = arg.GetOption<string>("content")!
				.Replace(@"\n", "\n")
				.Replace("\\\n", @"\n");
		content = $"{content}\n\n*Note: We cannot see your message sent in dm. Please use `/report-problem` to reply.*";
		string? reply = arg.GetOptionOrDefault<string>("reply");
		IUser user = arg.GetOption<IUser>("user");
		IAttachment? attachment = arg.GetOptionOrDefault<IAttachment>("attachment");
		IDMChannel channel = await user.CreateDMChannelAsync();

		IUserMessage message;
		if (attachment is null)
		{
			message = await channel.SendMessageAsync(
				content,
				messageReference: reply is null ? null! : new(ulong.Parse(reply), channel.Id));
		}
		else
		{
			Stream stream = await this._httpClient.GetStreamAsync(attachment.Url);

			message = await channel.SendFileAsync(
				new FileAttachment(
					stream,
					attachment.Filename,
					attachment.Description,
					attachment.IsSpoiler()),
				content,
				messageReference: reply is null ? null! : new(ulong.Parse(reply), channel.Id));
		}
		await arg.QuickReply($"Sent! Sent message ID: `{message.Id}`");
	}
}

