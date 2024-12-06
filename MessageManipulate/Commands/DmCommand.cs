using Discord;
using Discord.WebSocket;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;

namespace MessageManipulate.Commands;

[AddToGlobal]
public class DmCommand : AvailableEveryWhereAdminCommand
{
	private readonly HttpClient _httpClient = new();

	public override string Name => "mm-dm";
	public override string Description => "Try dm someone. [Admin command]";

	public override SlashCommandBuilder CompleteBuilder =>
		this.BasicBuilder
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
		try
		{
			string content = arg.Data.Options.First(x => x.Name == "content").Value
				.Unbox<string>()
				.Replace(@"\n", "\n")
				.Replace("\\\n", @"\n");
			content = $"{content}\n\n*Note: We cannot see your message sent in dm. Please use `/report-problem` to reply.*";
			string? reply = arg.Data.Options.FirstOrDefault(x => x.Name == "reply")?.Value.Unbox<string>();
			IUser user = arg.Data.Options.First(x => x.Name == "user").Value.Unbox<IUser>();
			IAttachment? attachment = arg.Data.Options.FirstOrDefault(x => x.Name == "attachment")?.Value.Unbox<IAttachment>();
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
			await arg.ModifyOriginalResponseAsync(
				x => x.Content = $"Sent! Sent message ID: `{message.Id}`");
		}
		catch (Exception ex)
		{
			await arg.ModifyOriginalResponseAsync(
				x => x.Content = ex.ToString());
		}
	}
}
