using CsvHelper;
using CsvHelper.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Text;

namespace LocalizationTool.Formats;

/// <summary>
/// The content of the localization csv (<c>Key,&lt;lang&gt;,...</c>): the language columns and the keyed rows.
/// Every row has exactly one text per language column.
/// </summary>
public sealed class LocalizationCsv
{
	/// <param name="Key">Non-blank key from the first column; it is not repeated in <paramref name="Texts"/>.</param>
	/// <param name="Texts">Texts aligned with <see cref="LocalizationCsv.LanguageCodes"/> (<c>Texts[i]</c> belongs to <c>LanguageCodes[i]</c>); missing cells are empty strings.</param>
	public sealed record Row(string Key, IReadOnlyList<string> Texts);

	/// <summary>
	/// Header cells after the key column, up to (excluding) the first header starting with <c>__</c>.
	/// Raw values: they may be invalid language codes or contain duplicates, which callers report.
	/// </summary>
	public IReadOnlyList<string> LanguageCodes { get; }

	/// <summary>
	/// Rows with a non-blank key, in file order.
	/// </summary>
	public IReadOnlyList<Row> Rows { get; }

	/// <exception cref="ArgumentException">A row has a blank key, or does not have exactly one text per language code.</exception>
	public LocalizationCsv(IReadOnlyList<string> languageCodes, IEnumerable<Row> rows)
	{
		this.LanguageCodes = [.. languageCodes];
		this.Rows = [.. rows.Select(row => new Row(row.Key, [.. row.Texts]))];

		foreach (Row row in this.Rows)
		{
			if (IsBlank(row.Key))
				throw new ArgumentException("A row has a blank key.", nameof(rows));
			if (row.Texts.Count != this.LanguageCodes.Count)
				throw new ArgumentException($"Row '{row.Key}' has {row.Texts.Count} texts but there are {this.LanguageCodes.Count} language codes.", nameof(rows));
		}
	}

	/// <summary>
	/// Whether a csv cell counts as having no translation.
	/// </summary>
	public static bool IsBlank([NotNullWhen(false)] string? text) => string.IsNullOrWhiteSpace(text);

	/// <summary>
	/// Parses csv text. Language codes are the header cells after the key column, stopping at the first header
	/// starting with <c>__</c> (or at the end of the header). Rows whose key is null, empty or whitespace are skipped; missing cells become empty strings.
	/// </summary>
	public static LocalizationCsv Parse(string csv)
	{
		CsvReader csvReader = new(new StringReader(csv), new CsvConfiguration(CultureInfo.InvariantCulture)
		{
			MissingFieldFound = null
		});
		csvReader.Read();
		csvReader.ReadHeader();

		// Index 0 is the key column.
		List<string> headers = [];
		string? current;
		for (int i = 0; (current = csvReader.GetField(i)) is not null && !current.StartsWith("__"); i++)
			headers.Add(current);

		List<string> languageCodes = [.. headers.Skip(1)];

		List<Row> rows = [];
		while (csvReader.Read())
		{
			string? key = csvReader.GetField(0);

			if (IsBlank(key))
				continue;

			string[] texts = new string[languageCodes.Count];
			for (int i = 0; i < texts.Length; i++)
				texts[i] = csvReader.GetField(i + 1) ?? "";

			rows.Add(new(key, texts));
		}

		return new(languageCodes, rows);
	}

	/// <summary>
	/// Reads and parses a UTF-8 csv file, see <see cref="Parse(string)"/>.
	/// </summary>
	public static LocalizationCsv ReadFrom(string path) => Parse(File.ReadAllText(path, Encoding.UTF8));

	/// <summary>
	/// Builds the csv content from every key of <paramref name="strings"/> with one column per <see cref="Language"/>
	/// (enum order); languages a <see cref="LocalizedString"/> has no entry for are left blank (no fallback is applied).
	/// </summary>
	public static LocalizationCsv FromLocalizedStrings(IReadOnlyDictionary<string, LocalizedString> strings)
	{
		List<string> languageCodes = [.. Enum.GetValues<Language>().Select(x => x.GetCode())];

		return new(
			languageCodes,
			strings.Select(pair => new Row(
				pair.Key,
				[.. languageCodes.Select(code =>
				{
					KeyValuePair<string, string> val = pair.Value.FirstOrDefault(x => x.Key == code);
					return val.Key is not null ? val.Value : "";
				})])));
	}

	/// <summary>
	/// Writes the header (<c>Key</c> and the language codes) and one record per row.
	/// </summary>
	public async Task<string> SerializeAsCsvAsync()
	{
		CsvWriter csvBuilder = CsvWriter.NewEmpty();

		csvBuilder.WriteField("Key");
		foreach (string code in this.LanguageCodes)
		{
			csvBuilder.WriteField(code);
		}
		await csvBuilder.NextRecordAsync();

		foreach (Row row in this.Rows)
		{
			csvBuilder.WriteField(row.Key);
			foreach (string text in row.Texts)
			{
				csvBuilder.WriteField(text);
			}
			await csvBuilder.NextRecordAsync();
		}
		await csvBuilder.DisposeAsync();

		return csvBuilder.GetUnderlyingStringBuilder().ToString();
	}
}
