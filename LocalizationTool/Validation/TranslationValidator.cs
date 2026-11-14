using System.Text;

namespace LocalizationTool.Validation;

public enum Severity
{
	Error,
	Warning
}

public sealed record Problem(Severity Severity, string Language, string Key, string Message);

/// <summary>
/// Validates flat language files against the English file and the code defaults.
/// </summary>
public sealed class TranslationValidator
{
	/// <summary>Messages longer than this share of <see cref="DiscordConfig.MaxMessageSize"/> get a warning.</summary>
	public const double MessageWarnRatio = 0.9;

	private readonly KeyRoles _roles;

	public TranslationValidator(KeyRoles roles)
	{
		this._roles = roles;
	}

	/// <param name="files">Language code to flat file content; must contain <paramref name="englishCode"/>.</param>
	/// <param name="codeEnglish">Every key in the code defaults, mapped to its English text (null when the default has none).</param>
	public List<Problem> Validate(
		IReadOnlyDictionary<string, FlatLanguageFile> files,
		IReadOnlyDictionary<string, string?> codeEnglish,
		string englishCode)
	{
		List<Problem> problems = [];
		FlatLanguageFile english = files[englishCode];

		// 1. check if every code-defined key is present in en-US.json
		foreach (KeyValuePair<string, string?> item in codeEnglish)
		{
			if (item.Value is not null && !english.ContainsKey(item.Key))
			{
				problems.Add(new(Severity.Warning, englishCode, item.Key, "key is in code but missing from en-US.json (export not run yet)"));
			}
		}

		// Blank English texts are absent; an unparseable English text is reported here once and cached as null.
		Dictionary<string, PlaceholderSignature?> englishSignatures = [with(StringComparer.Ordinal)];
		foreach (KeyValuePair<string, string> item in english)
		{
			if (string.IsNullOrWhiteSpace(item.Value)) continue;

			if (PlaceholderSignature.TryParse(item.Value, out PlaceholderSignature? parsed, out string? error))
			{
				englishSignatures[item.Key] = parsed;
			}
			else
			{
				englishSignatures[item.Key] = null;
				problems.Add(new(Severity.Error, englishCode, item.Key, "does not parse as SmartFormat: " + error));
			}
		}

		foreach (KeyValuePair<string, string> item in english)
		{
			if (codeEnglish.TryGetValue(item.Key, out string? codeText)
				&& codeText is not null
				&& englishSignatures.TryGetValue(item.Key, out PlaceholderSignature? fileSignature)
				&& fileSignature is not null)
			{
				string? diff = PlaceholderSignature.TryParse(codeText, out PlaceholderSignature? codeSignature, out string? codeError)
					? fileSignature.DescribeDifference(codeSignature)
					: "code default does not parse: " + codeError;
				if (diff is not null)
				{
					problems.Add(new(Severity.Warning, englishCode, item.Key, $"en-US.json placeholders differ from the code default ({diff}); code change not applied by hand?"));
				}
			}
		}

		foreach (KeyValuePair<string, FlatLanguageFile> file in files)
		{
			string language = file.Key;
			bool isEnglish = language == englishCode;
			foreach (KeyValuePair<string, string> item in file.Value)
			{
				string key = item.Key;
				string text = item.Value;
				if (string.IsNullOrWhiteSpace(text)) continue;

				if (!codeEnglish.ContainsKey(key))
				{
					problems.Add(new(Severity.Warning, language, key, "key is not in the code defaults (orphaned)"));
				}
				if (!isEnglish && !english.ContainsKey(key))
				{
					problems.Add(new(Severity.Warning, language, key, "key has no en-US text; excluded from the CSV"));
					continue;
				}

				KeyRole role = this._roles.GetRole(key);
				string? limit = KeyRoles.Validate(role, text);
				if (limit is not null)
				{
					problems.Add(new(Severity.Error, language, key, $"{limit} ({role})"));
				}
				else if (role == KeyRole.Message && text.EnumerateRunes().Count() > DiscordConfig.MaxMessageSize * MessageWarnRatio)
				{
					problems.Add(new(Severity.Warning, language, key, $"message is above {MessageWarnRatio:P0} of {DiscordConfig.MaxMessageSize} characters; substituted values may push it over"));
				}

				if (isEnglish) continue; // English parse errors were reported with the cache

				if (!PlaceholderSignature.TryParse(text, out PlaceholderSignature? signature, out string? parseError))
				{
					problems.Add(new(Severity.Error, language, key, "does not parse as SmartFormat: " + parseError));
					continue;
				}

				if (!englishSignatures.TryGetValue(key, out PlaceholderSignature? englishSignature)
					|| englishSignature is null)
				{
					continue; // blank English, or reported on the English entry
				}

				string? diff = signature.DescribeDifference(englishSignature);
				if (diff is not null)
				{
					problems.Add(new(Severity.Error, language, key, $"placeholders differ from en-US: {diff}"));
				}
			}
		}

		return problems;
	}

	/// <summary>
	/// Deterministic report: errors first, then warnings; within a severity by language, key, message.
	/// </summary>
	public static string FormatReport(IEnumerable<Problem> problems)
	{
		StringBuilder sb = new();
		foreach (IGrouping<Severity, Problem> group in problems.GroupBy(x => x.Severity).OrderBy(x => x.Key))
		{
			sb.Append($"{(group.Key == Severity.Error ? "Errors" : "Warnings")} ({group.Count()}):\n");
			foreach (Problem problem in group
				.OrderBy(x => x.Language, StringComparer.Ordinal)
				.ThenBy(x => x.Key, StringComparer.Ordinal)
				.ThenBy(x => x.Message, StringComparer.Ordinal))
			{
				sb.Append($"  {(problem.Severity == Severity.Error ? "ERROR" : "WARN")} [{problem.Language}] {problem.Key}: {problem.Message}\n");
			}
		}
		return sb.ToString();
	}
}
