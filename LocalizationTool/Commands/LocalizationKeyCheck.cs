using System.Text;

namespace LocalizationTool.Commands;

[AddToGlobal]
public class LocalizationKeyCheckCommand : AdminCommandBase
{
	public LocalizationKeyCheckCommand(IServiceProvider provider) : base(provider)
	{
	}

	public override OneOf<string, LocalizedString> PSLName => "localization-key-check";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] Compare localization csv keys with generated defaults";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption("csv",
			ApplicationCommandOptionType.Attachment,
			"File to compare",
			isRequired: true);

	public override async Task RootCallback(SocketSlashCommand arg, UserData? data)
	{
		using HttpClient httpClient = new();
		IAttachment attachment = arg.GetOption<IAttachment>("csv");
		HttpResponseMessage response = await httpClient.GetAsync(attachment.Url);
		string csv = await response.Content.ReadAsStringAsync();

		LocalizationCsv parsed = LocalizationCsv.Parse(csv);

		string english = Language.EnglishUS.Code;
		int englishIndex = -1;
		for (int i = 0; i < parsed.LanguageCodes.Count; i++)
		{
			if (parsed.LanguageCodes[i] == english)
			{
				englishIndex = i;
				break;
			}
		}
		if (englishIndex < 0)
		{
			await arg.QuickReply($"Column '{english}' not found in csv.");
			return;
		}

		Dictionary<string, string> csvValues = [];
		foreach (LocalizationCsv.Row row in parsed.Rows)
		{
			csvValues[row.Key] = row.Texts[englishIndex];
		}

		Dictionary<string, string> generatedValues = [];
		foreach (KeyValuePair<string, LocalizedString> pair in this._localization.Generate().Strings)
		{
			generatedValues[pair.Key] = pair.Value.TryGetValue(english, out string? value) ? value ?? "" : "";
		}

		List<string> missingInCsv = generatedValues.Keys
			.Where(x => !csvValues.ContainsKey(x))
			.OrderBy(x => x, StringComparer.Ordinal)
			.ToList();
		List<string> missingInGenerated = csvValues.Keys
			.Where(x => !generatedValues.ContainsKey(x))
			.OrderBy(x => x, StringComparer.Ordinal)
			.ToList();
		List<string> differing = generatedValues.Keys
			.Where(x => csvValues.TryGetValue(x, out string? csvValue)
				&& !string.Equals(Normalize(csvValue), Normalize(generatedValues[x]), StringComparison.Ordinal))
			.OrderBy(x => x, StringComparer.Ordinal)
			.ToList();

		StringBuilder report = new();
		report.AppendLine($"Keys in generated defaults but missing in csv ({missingInCsv.Count}):");
		foreach (string key in missingInCsv)
			report.AppendLine($"  {key}");
		report.AppendLine();

		report.AppendLine($"Keys in csv but missing in generated defaults ({missingInGenerated.Count}):");
		foreach (string key in missingInGenerated)
			report.AppendLine($"  {key}");
		report.AppendLine();

		report.AppendLine($"Keys with differing {english} values ({differing.Count}):");
		foreach (string key in differing)
		{
			report.AppendLine($"  {key}");
			report.AppendLine($"    csv: {Display(csvValues[key])}");
			report.AppendLine($"    generated: {Display(generatedValues[key])}");
		}

		await arg.QuickReplyWithAttachments(
			$"Missing in csv: {missingInCsv.Count}, missing in generated: {missingInGenerated.Count}, differing {english}: {differing.Count}",
			PSLUtils.ToAttachment(report.ToString(), "localization-key-check.txt"));
	}

	private static string Normalize(string value) => value.Replace("\r\n", "\n");

	private static string Display(string value) => Normalize(value).Replace("\n", "\\n");
}
