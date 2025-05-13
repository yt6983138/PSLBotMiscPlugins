using CsvHelper;
using Discord;
using Discord.WebSocket;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PSLDiscordBot.Core;
using PSLDiscordBot.Core.Command.Global.Base;
using PSLDiscordBot.Core.Services;
using PSLDiscordBot.Core.Services.Phigros;
using PSLDiscordBot.Core.UserDatas;
using PSLDiscordBot.Core.Utility;
using PSLDiscordBot.Framework;
using PSLDiscordBot.Framework.CommandBase;
using PSLDiscordBot.Framework.Localization;
using System.Globalization;
using System.Text;

namespace LocalizationTranslatorHelper.Commands;

[AddToGlobal]
public class CsvToJson : AdminCommandBase
{
	public CsvToJson(
		IOptions<Config> config,
		DataBaseService database,
		LocalizationService localization,
		PhigrosDataService phigrosData,
		ILoggerFactory loggerFactory) : base(config, database, localization, phigrosData, loggerFactory)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "localization-to-csv";
	public override OneOf<string, LocalizedString> PSLDescription => "Convert localization to csv";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder;

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		List<string> headers = ["Key"];
		headers.AddRange(Enum.GetValues<Language>().Select(x => x.GetCode()));

		StringBuilder sb = new();
		TextWriter writer = new StringWriter(sb);
		CsvWriter csvBuilder = new(writer, CultureInfo.InvariantCulture);

		foreach (string item in headers)
		{
			csvBuilder.WriteField(item);
		}
		await csvBuilder.NextRecordAsync();

		foreach (KeyValuePair<string, LocalizedString> strings in this._localization.Data.LocalizedStrings)
		{
			csvBuilder.WriteField(strings.Key);
			foreach (string? lang in headers.Skip(1))
			{
				if (strings.Value.TryGetValue(lang, out string? value))
				{
					csvBuilder.WriteField(value);
				}
				else
				{
					csvBuilder.WriteField("");
				}
			}
			await csvBuilder.NextRecordAsync();
		}

		await csvBuilder.DisposeAsync();

		await arg.QuickReplyWithAttachments("e done", PSLUtils.ToAttachment(sb.ToString(), "localization.csv"));
	}
}
