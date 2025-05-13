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
using yt6983138.Common;
using CsvReader = CsvHelper.CsvReader;

namespace LocalizationTranslatorHelper.Commands;

[AddToGlobal]
public class JsonToCsv : AdminCommandBase
{
	public JsonToCsv(
		IOptions<Config> config,
		DataBaseService database,
		LocalizationService localization,
		PhigrosDataService phigrosData,
		ILoggerFactory loggerFactory) : base(config, database, localization, phigrosData, loggerFactory)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "csv-to-localization";
	public override OneOf<string, LocalizedString> PSLDescription => "Convert csv to localization";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption("csv",
			ApplicationCommandOptionType.Attachment,
			"File to parse",
			isRequired: true);

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		using HttpClient httpClient = new();
		IAttachment attachment = arg.GetOption<IAttachment>("csv");
		HttpResponseMessage response = await httpClient.GetAsync(attachment.Url);
		string csv = await response.Content.ReadAsStringAsync();

		CsvReader csvReader = new(new StringReader(csv), CultureInfo.InvariantCulture);
		csvReader.Read();
		csvReader.ReadHeader();

		List<string> headers = [];
		string? current;
		for (int i = 0; (current = csvReader.GetField(i)) is not null; i++)
			headers.Add(current);

		LocalizationManager localizationManager = this._localization.Data.DeepClone();

		while (csvReader.Read())
		{
			string key = csvReader.GetField(0).EnsureNotNull();

			LocalizedString localizedString = localizationManager.LocalizedStrings.TryGetValue(key, out LocalizedString? localizedStringValue)
				? localizedStringValue
				: LocalizedString.Create([]);

			for (int i = 1; i < headers.Count; i++)
			{
				string language = headers[i];
				string value = csvReader.GetField(i).EnsureNotNull();

				if (string.IsNullOrWhiteSpace(value))
					continue;

				if (localizedString.ContainsKey(language))
				{
					localizedString[language] = value;
				}
				else
				{
					localizedString.Add(language, value);
				}
			}
		}

		this._localization.Data = localizationManager;
		this._localization.Save();

		await arg.QuickReplyWithAttachments("e done",
			PSLUtils.ToAttachment(
				File.ReadAllText(this._config.Value.LocalizationLocation), "localization.csv"));
	}
}
