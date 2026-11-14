using System.CommandLine;
using System.Text;
using System.Text.Json;

namespace LocalizationTool;

public static class Program
{
	public static async Task<int> Main(string[] args)
	{
		#region Export
		// add missing default keys to en-US.json
		Option<DirectoryInfo> exportOutOption = new("--out")
		{
			Description = "Directory containing the language files.",
			Required = true
		};
		Option<FileInfo?> exportSummaryOption = new("--summary")
		{
			Description = "Markdown file to append the export summary to."
		};
		Command exportCommand = new("export", "Add missing en-US keys from code to the language file.")
		{
			exportOutOption,
			exportSummaryOption
		};
		exportCommand.SetAction(parseResult => Export(
			parseResult.GetRequiredValue(exportOutOption),
			parseResult.GetValue(exportSummaryOption)));
		#endregion

		#region Import CSV
		// one-time migration of the upload CSV into flat <lang>.json files
		Option<FileInfo> importCsvOption = new("--csv")
		{
			Description = "Upload CSV (Key,<lang>,... layout of /csv-to-localization).",
			Required = true
		};
		Option<DirectoryInfo> importOutOption = new("--out")
		{
			Description = "Directory to write the language files to.",
			Required = true
		};
		Command importCommand = new("import-csv",
			"One-time migration: write one flat <lang>.json per CSV language column. Existing files in --out are replaced. Keys not in the code defaults are imported too and reported as a warning.")
		{
			importCsvOption,
			importOutOption
		};
		importCommand.SetAction(parseResult => ImportCsv(
			parseResult.GetRequiredValue(importCsvOption),
			parseResult.GetRequiredValue(importOutOption)));
		#endregion

		#region Build CSV
		// validate the flat language files and build the upload CSV
		Option<DirectoryInfo> buildInOption = new("--in")
		{
			Description = "Directory containing the flat <lang>.json files (en-US.json is required).",
			Required = true
		};
		Option<FileInfo> buildOutOption = new("--out")
		{
			Description = "Upload CSV to write (Key,<lang>,... layout of /csv-to-localization). Not written when validation fails.",
			Required = true
		};
		Command buildCommand = new("build-csv", "Validate the flat language files and build the upload CSV.")
		{
			buildInOption,
			buildOutOption
		};
		buildCommand.SetAction((parseResult, _) => BuildCsvAsync(
			parseResult.GetRequiredValue(buildInOption),
			parseResult.GetRequiredValue(buildOutOption)));
		#endregion

		RootCommand root = new("Weblate localization tooling")
		{
			Subcommands = { exportCommand, importCommand, buildCommand }
		};

		return await root.Parse(args).InvokeAsync();
	}

	private static async Task<int> BuildCsvAsync(DirectoryInfo inDir, FileInfo outFile)
	{
		string englishCode = Language.EnglishUS.GetCode();
		Dictionary<string, FlatLanguageFile> files = [with(StringComparer.Ordinal)];
		List<Problem> problems = [];
		foreach (string path in Directory.GetFiles(inDir.FullName, "*.json").Order(StringComparer.Ordinal))
		{
			string name = Path.GetFileNameWithoutExtension(path);
			// Same policy as import-csv: unknown language codes are skipped and reported, not fatal.
			if (!LocalizationHelper.TryFromCode(name, out _))
			{
				problems.Add(new(Severity.Warning, name, "(file)", "unknown language code; file skipped"));
				continue;
			}
			try
			{
				files[name] = FlatLanguageFile.ReadFrom(path);
			}
			catch (Exception ex) when (ex is JsonException or InvalidDataException)
			{
				problems.Add(new(Severity.Error, name, "(file)", "cannot read flat language file: " + ex.Message));
			}
		}
		if (files.ContainsKey(englishCode))
		{
			Dictionary<string, string?> codeEnglish = [with(StringComparer.Ordinal)];
			foreach (KeyValuePair<string, LocalizedString> item in LocalizationService.CreateDefaults().Strings)
			{
				codeEnglish[item.Key] = item.Value.TryGetValue(Language.EnglishUS, out string? text) ? text : null;
			}
			KeyRoles roles = KeyRoles.Load();
			foreach (string key in roles.GetUnusedOverrides(codeEnglish.Keys.ToHashSet(StringComparer.Ordinal)))
			{
				problems.Add(new(Severity.Warning, "(config)", key, $"{KeyRoles.OverrideFileName} overrides a key that is not in the code defaults"));
			}
			problems.AddRange(new TranslationValidator(roles).Validate(files, codeEnglish, englishCode));
		}
		else
		{
			problems.Add(new(Severity.Error, englishCode, "(file)", $"{englishCode}.json is required but was not loaded"));
		}

		int errors = problems.Count(x => x.Severity == Severity.Error);
		Console.Write(TranslationValidator.FormatReport(problems));
		if (errors > 0)
		{
			Console.Write($"{errors} error(s); CSV not written.\n");
			return 1;
		}

		// Keys: everything in en-US.json (orphaned keys not in code included, they are harmless); translation keys
		// without English text were already excluded and reported. Columns: all Language values, like /localization-to-csv.
		List<string> codes = Enum.GetValues<Language>().Select(x => x.GetCode()).ToList();
		LocalizationCsv table = new(
			codes,
			files[englishCode].Keys.Select(key => new LocalizationCsv.Row(key,
				codes.Select(code =>
					files.TryGetValue(code, out FlatLanguageFile? file)
					&& file.TryGetValue(key, out string? value)
					&& value is not null ? value : "").ToList())));
		string csv = await table.SerializeAsCsvAsync();

		string? directory = Path.GetDirectoryName(Path.GetFullPath(outFile.FullName));
		if (directory is not null) Directory.CreateDirectory(directory);
		File.WriteAllText(outFile.FullName, csv, new UTF8Encoding(false));
		Console.Write($"{outFile.FullName}: {files[englishCode].Count} keys, {codes.Count} language columns\n");
		return 0;
	}

	private static int ImportCsv(FileInfo csv, DirectoryInfo outDir)
	{
		LocalizationCsv parsed = LocalizationCsv.ReadFrom(csv.FullName);
		LocalizationManager defaults = LocalizationService.CreateDefaults();

		List<string> unknownKeys = [];
		List<string> invalidHeaders = [];
		List<string> duplicateHeaders = [];
		HashSet<string> seenCodes = [with(StringComparer.Ordinal)];
		Dictionary<int, FlatLanguageFile> columns = [];
		for (int i = 0; i < parsed.LanguageCodes.Count; i++)
		{
			// /csv-to-localization resolves the header via LocalizationHelper.FromCode, which throws on unknown codes;
			// here such columns are skipped and reported instead.
			if (!LocalizationHelper.TryFromCode(parsed.LanguageCodes[i], out _))
			{
				invalidHeaders.Add(parsed.LanguageCodes[i]);
				continue;
			}
			// Only the first column of a duplicated code is processed.
			if (!seenCodes.Add(parsed.LanguageCodes[i]))
			{
				duplicateHeaders.Add(parsed.LanguageCodes[i]);
				continue;
			}
			columns[i] = [];
		}

		foreach (LocalizationCsv.Row row in parsed.Rows)
		{
			// Keys missing from the code defaults are still imported; they are only reported as a warning.
			if (!defaults.TryGet(row.Key, out _)) unknownKeys.Add(row.Key);
			foreach (KeyValuePair<int, FlatLanguageFile> column in columns)
			{
				string value = row.Texts[column.Key];
				if (LocalizationCsv.IsBlank(value)) continue;

				column.Value[row.Key] = value;
			}
		}

		StringBuilder sb = new();
		foreach (KeyValuePair<int, FlatLanguageFile> column in columns)
		{
			string path = Path.Combine(outDir.FullName, $"{parsed.LanguageCodes[column.Key]}.json");
			column.Value.WriteTo(path);
			sb.Append($"{path}: {column.Value.Count} keys\n");
		}
		sb.Append($"Skipped columns, unknown language code ({invalidHeaders.Count}):\n");
		foreach (string header in invalidHeaders)
		{
			sb.Append($"  '{header}'\n");
		}
		sb.Append($"Skipped columns, duplicate language code ({duplicateHeaders.Count}):\n");
		foreach (string header in duplicateHeaders)
		{
			sb.Append($"  '{header}'\n");
		}
		unknownKeys = unknownKeys.Distinct(StringComparer.Ordinal).Order(StringComparer.Ordinal).ToList();
		sb.Append($"Warning: {unknownKeys.Count} keys are not in code defaults (imported anyway; may be read at runtime by plugins, e.g. blacklist service):\n");
		foreach (string key in unknownKeys)
		{
			sb.Append($"  {key}\n");
		}
		Console.Write(sb.ToString());
		return 0;
	}

	private static int Export(DirectoryInfo outDir, FileInfo? summary)
	{
		string path = Path.Combine(outDir.FullName, $"{Language.EnglishUS.GetCode()}.json");
		FlatLanguageFile existing = FlatLanguageFile.ReadFrom(path);

		LocalizationManager defaults = LocalizationService.CreateDefaults();
		List<string> added = [];
		List<string> skipped = [];
		HashSet<string> codeKeys = [with(StringComparer.Ordinal)];
		foreach (KeyValuePair<string, LocalizedString> item in defaults.Strings)
		{
			codeKeys.Add(item.Key);
			if (existing.ContainsKey(item.Key))
			{
				continue;
			}
			if (!item.Value.TryGetValue(Language.EnglishUS, out string? text))
			{
				skipped.Add(item.Key);
				continue;
			}

			existing.Add(item.Key, text);
			added.Add(item.Key);
		}
		added.Sort(StringComparer.Ordinal);
		skipped.Sort(StringComparer.Ordinal);
		List<string> orphaned = existing.Keys.Where(x => !codeKeys.Contains(x)).ToList(); // already ordinal-sorted

		if (added.Count > 0)
		{
			existing.WriteTo(path);
		}

		string report = BuildReport(path, added, skipped, orphaned);
		Console.Write(report);
		if (summary is not null)
		{
			File.AppendAllText(summary.FullName, BuildMarkdown(path, added, skipped, orphaned), new UTF8Encoding(false));
		}

		return 0;
	}

	private static string BuildReport(string path, List<string> added, List<string> skipped, List<string> orphaned)
	{
		StringBuilder sb = new();
		sb.Append($"{path}: {(added.Count > 0 ? "updated" : "unchanged")}\n");
		sb.Append($"Added keys ({added.Count}):\n");
		foreach (string key in added)
		{
			sb.Append($"  {key}\n");
		}
		sb.Append($"Skipped (no en-US default) ({skipped.Count}):\n");
		foreach (string key in skipped)
		{
			sb.Append($"  {key}\n");
		}
		sb.Append($"Orphaned keys ({orphaned.Count}):\n");
		foreach (string key in orphaned)
		{
			sb.Append($"  {key}\n");
		}
		return sb.ToString();
	}

	private static string BuildMarkdown(string path, List<string> added, List<string> skipped, List<string> orphaned)
	{
		StringBuilder sb = new();
		sb.Append($"## Localization export: `{path}`\n\n");
		sb.Append($"### Added keys ({added.Count})\n\n");
		if (added.Count == 0)
		{
			sb.Append("None.\n");
		}
		foreach (string key in added)
		{
			sb.Append($"- `{key}`\n");
		}
		sb.Append($"\n### Skipped (no en-US default) ({skipped.Count})\n\n");
		if (skipped.Count == 0)
		{
			sb.Append("None.\n");
		}
		foreach (string key in skipped)
		{
			sb.Append($"- `{key}`\n");
		}
		sb.Append($"\n### Orphaned keys ({orphaned.Count})\n\n");
		sb.Append("In the file but no longer in code; not deleted.\n\n");
		if (orphaned.Count == 0)
		{
			sb.Append("None.\n");
		}
		foreach (string key in orphaned)
		{
			sb.Append($"- `{key}`\n");
		}
		sb.Append('\n');
		return sb.ToString();
	}
}
