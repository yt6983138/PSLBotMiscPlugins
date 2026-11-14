using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;

namespace LocalizationTool.Formats;

/// <summary>
/// The ordinally sorted full localization key to text content of one <c>{languageCode}.json</c> file.
/// On disk it is a JSON object, tab indented, with relaxed JSON escaping, LF line endings, UTF-8 without BOM and a trailing newline.
/// </summary>
public class FlatLanguageFile : SortedDictionary<string, string>
{
	private static readonly JsonSerializerOptions _options = new()
	{
		WriteIndented = true,
		IndentCharacter = '\t',
		IndentSize = 1,
		NewLine = "\n",
		Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
	};

	public FlatLanguageFile() : base(StringComparer.Ordinal)
	{
	}

	/// <summary>
	/// Reads the file, or returns an empty file if it does not exist.
	/// </summary>
	public static FlatLanguageFile ReadFrom(string path)
	{
		FlatLanguageFile result = [];
		if (!File.Exists(path)) return result;

		Dictionary<string, string> data = JsonSerializer.Deserialize<Dictionary<string, string>>(File.ReadAllText(path, Encoding.UTF8))
			?? throw new InvalidDataException($"'{path}' does not contain a JSON object.");
		foreach (KeyValuePair<string, string> item in data)
		{
			result[item.Key] = item.Value;
		}
		return result;
	}

	/// <summary>
	/// Writes the entries, creating the parent directory if needed.
	/// </summary>
	public void WriteTo(string path)
	{
		string? directory = Path.GetDirectoryName(Path.GetFullPath(path));
		if (directory is not null) Directory.CreateDirectory(directory);

		string json = JsonSerializer.Serialize(this, _options) + "\n";
		File.WriteAllText(path, json, new UTF8Encoding(false));
	}
}
