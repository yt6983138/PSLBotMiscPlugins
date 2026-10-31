using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.Text;

namespace AdminHelper.Commands;

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

	public override async Task Callback(SocketSlashCommand arg, UserData? data, DataBaseService.DbDataRequester requester, object executer)
	{
		using HttpClient httpClient = new();
		IAttachment attachment = arg.GetOption<IAttachment>("csv");
		HttpResponseMessage response = await httpClient.GetAsync(attachment.Url);
		string csv = await response.Content.ReadAsStringAsync();

		CsvReader csvReader = new(new StringReader(csv), new CsvConfiguration(CultureInfo.InvariantCulture)
		{
			MissingFieldFound = null
		});
		csvReader.Read();
		csvReader.ReadHeader();

		List<string> headers = [];
		string? current;
		for (int i = 0; (current = csvReader.GetField(i)) is not null && !current.StartsWith("__"); i++)
			headers.Add(current);

		string english = Language.EnglishUS.GetCode();
		int englishIndex = headers.IndexOf(english);
		if (englishIndex < 0)
		{
			await arg.QuickReply($"Column '{english}' not found in csv.");
			return;
		}

		Dictionary<string, string> csvValues = [];
		while (csvReader.Read())
		{
			string key = csvReader.GetField(0) ?? "";
			if (string.IsNullOrWhiteSpace(key))
				continue;

			csvValues[key] = csvReader.GetField(englishIndex) ?? "";
		}

		Dictionary<string, string> generatedValues = [];
		foreach (KeyValuePair<string, LocalizedString> pair in this._localization.Generate().LocalizedStrings)
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
