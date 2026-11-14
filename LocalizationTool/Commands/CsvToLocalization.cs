namespace LocalizationTool.Commands;

[AddToGlobal]
public class CsvToLocalization : AdminCommandBase
{
	public CsvToLocalization(IServiceProvider provider) : base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "csv-to-localization";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Convert csv to localization";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption("csv",
			ApplicationCommandOptionType.Attachment,
			"File to parse",
			isRequired: true);

	public override async Task RootCallback(SocketSlashCommand arg, UserData? data)
	{
		using HttpClient httpClient = new();
		IAttachment attachment = arg.GetOption<IAttachment>("csv");
		HttpResponseMessage response = await httpClient.GetAsync(attachment.Url);
		string csv = await response.Content.ReadAsStringAsync();

		LocalizationCsv parsed = LocalizationCsv.Parse(csv);

		LocalizationManager localizationManager = this._localization.Data.DeepClone();

		foreach (LocalizationCsv.Row row in parsed.Rows)
		{
			if (!localizationManager.TryGet(row.Key, out LocalizedString? localizedString))
				localizedString = localizationManager.CreateAndAdd(row.Key, []);

			for (int i = 0; i < parsed.LanguageCodes.Count; i++)
			{
				string language = parsed.LanguageCodes[i];
				string value = row.Texts[i];

				if (LocalizationCsv.IsBlank(value))
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
				File.ReadAllText(this._config.Value.LocalizationLocation), "localization.json"));
	}
}
