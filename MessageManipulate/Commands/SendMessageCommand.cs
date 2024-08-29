using Discord;
using Discord.WebSocket;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;

namespace MessageManipulate.Commands;

[AddToGlobal]
public class SendMessageCommand : AdminCommandBase
{
	private readonly HttpClient _httpClient = new();

	public override string Name => "mm-send-message";
	public override string Description => "Try send message. [Admin command]";

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
		try
		{
			string content = arg.Data.Options.First(x => x.Name == "content").Value.Unbox<string>();
			string? reply = arg.Data.Options.FirstOrDefault(x => x.Name == "reply")?.Value.Unbox<string>();
			IMessageChannel channel = arg.Data.Options.First(x => x.Name == "channel").Value.Unbox<IMessageChannel>();
			IAttachment? attachment = arg.Data.Options.FirstOrDefault(x => x.Name == "attachment")?.Value.Unbox<IAttachment>();

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
			await arg.ModifyOriginalResponseAsync(
				x => x.Content = $"Sent!");
		}
		catch (Exception ex)
		{
			await arg.ModifyOriginalResponseAsync(
				x => x.Content = ex.Message);
		}
	}
}
