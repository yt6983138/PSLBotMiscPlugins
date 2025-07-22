using Discord;
using Discord.Rest;
using Discord.WebSocket;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Services.Phigros;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;

namespace AdminHelper.Commands;

[AddToGlobal]
public class EditMessageCommand : AvailableEveryWhereAdminCommand
{
	public EditMessageCommand(IOptions<Config> config, DataBaseService database, LocalizationService localization, PhigrosService phigrosData, ILoggerFactory loggerFactory) : base(config, database, localization, phigrosData, loggerFactory)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "mm-edit-message";
	public override OneOf<string, LocalizedString> PSLDescription => "Try edit message. [Admin command]";

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
			IMessageChannel channel = arg.Data.Options.First(x => x.Name == "channel")
				.Value.Unbox<IMessageChannel>();

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
