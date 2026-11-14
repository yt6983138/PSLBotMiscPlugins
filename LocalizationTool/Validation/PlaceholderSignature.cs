using SmartFormat.Core.Parsing;
using System.Diagnostics.CodeAnalysis;
using System.Text.RegularExpressions;
using Format = SmartFormat.Core.Parsing.Format; // Discord.Format (global using) would otherwise be ambiguous

namespace LocalizationTool.Validation;

/// <summary>
/// The parts of a SmartFormat template that a translation must keep: which placeholders it has and how they are
/// formatted. Literal text is discarded, including text inside formatter branches.
/// </summary>
/// <remarks>
/// One descriptor per placeholder: <c>{selector.path:formatter(options)}</c>, plus <c>#branchCount</c> for cond/choose
/// and <c>[prefix,...]</c> (each branch's condition such as <c>&gt;0?</c>, or empty) for cond.
/// Placeholders nested in branches get their own descriptors.
/// <code>
/// "{0:cond:123|456}" and "{0:cond:456|123}"  -> {0:cond()#2[,]}            (same: literal text is discarded)
/// "{0:cond:456:123}"                         -> {0:cond()#1[]}             (one branch; ':' is literal text)
/// "{0:cond:&gt;0?{1} items|none}"               -> {0:cond()#2[&gt;0?,]}, {1:()}
/// "{0:plural:{1} item|{1} items}"            -> {0:plural()}, {1:()}       (plural: branch count free, nested once)
/// "Level {0:calc(+1)}"                       -> {0:calc(+1)}
/// </code>
/// </remarks>
public sealed partial class PlaceholderSignature
{
	// https://github.com/axuno/SmartFormat/blob/71d598088ad9a442bbc000e9ab2460f1bec8736a/src/SmartFormat/Extensions/ConditionalFormatter.cs#L20
	[GeneratedRegex(@"^(?:[&/]?[<>=!]=?[0-9.-]+)+\?")]
	private static partial Regex ConditionPrefixRegex { get; }

	/// <summary>The descriptors (see remarks), ordinally sorted; duplicates are kept.</summary>
	public IReadOnlyList<string> Placeholders { get; }

	private PlaceholderSignature(List<string> placeholders)
	{
		this.Placeholders = placeholders;
	}

	/// <summary>
	/// Parses with SmartFormat 3.6.1's parser. <c>list</c> compares only its item template; separators are free.
	/// </summary>
	/// <param name="error">The parser's error message when the template does not parse.</param>
	public static bool TryParse(string template, [NotNullWhen(true)] out PlaceholderSignature? signature, [NotNullWhen(false)] out string? error)
	{
		List<string> placeholders = [];
		try
		{
			// default settings, like Smart.Format's default formatter; Smart.Default only adds formatters, and the parser
			// does not know formatter names, so user/calc parse like built-ins
			Parser parser = new();
			Format format = parser.ParseFormat(template);
			Walk(format, placeholders);
		}
		catch (Exception ex)
		{
			signature = null;
			error = ex.Message;
			return false;
		}
		placeholders.Sort(StringComparer.Ordinal);
		signature = new(placeholders);
		error = null;
		return true;
	}

	/// <summary>
	/// Describes how this (actual) signature differs from <paramref name="expected"/> as
	/// "missing ...; unexpected ..." in ordinal order, or returns null when they are equal.
	/// </summary>
	public string? DescribeDifference(PlaceholderSignature expected)
	{
		// 1. create a multiset of counts: +1 for each expected placeholder, -1 for each actual placeholder
		// which means that a positive count is missing and a negative count is unexpected
		Dictionary<string, int> counts = [with(StringComparer.Ordinal)];
		foreach (string item in expected.Placeholders)
		{
			counts[item] = counts.GetValueOrDefault(item) + 1;
		}
		foreach (string item in this.Placeholders)
		{
			counts[item] = counts.GetValueOrDefault(item) - 1;
		}

		// 2. find the missing and unexpected placeholders in ordinal order
		List<string> missing = [];
		List<string> unexpected = [];
		foreach (KeyValuePair<string, int> item in counts.OrderBy(x => x.Key, StringComparer.Ordinal))
		{
			for (int i = 0; i < item.Value; i++)
				missing.Add(item.Key);

			for (int i = 0; i > item.Value; i--)
				unexpected.Add(item.Key);
		}
		// no difference since all balanced out
		if (missing.Count == 0 && unexpected.Count == 0) return null;

		List<string> parts = [];
		if (missing.Count > 0) parts.Add($"missing {string.Join(" ", missing)}");
		if (unexpected.Count > 0) parts.Add($"unexpected {string.Join(" ", unexpected)}");
		return string.Join("; ", parts);
	}

	private static void Walk(Format format, List<string> sink)
	{
		foreach (FormatItem item in format.Items)
		{
			if (item is Placeholder placeholder)
			{
				Describe(placeholder, sink);
			}
		}
	}

	private static void Describe(Placeholder placeholder, List<string> sink)
	{
		string selector = string.Join('.', placeholder.GetSelectors().Select(x => x.RawText));
		string name = placeholder.FormatterName;
		string head = $"{{{selector}:{name}({placeholder.FormatterOptions})";
		Format? inner = placeholder.Format;
		if (inner is null)
		{
			sink.Add(head + "}");
			return;
		}

		IList<Format> branches = inner.Split('|');
		switch (name.ToLowerInvariant())
		{
			case "cond":
			case "conditional":
				string prefixes = string.Join(",", branches.Select(ConditionPrefix));
				sink.Add($"{head}#{branches.Count}[{prefixes}]}}");
				foreach (Format branch in branches)
				{
					Walk(branch, sink);
				}
				break;
			case "choose":
			case "c":
				sink.Add($"{head}#{branches.Count}}}");
				foreach (Format branch in branches)
				{
					Walk(branch, sink);
				}
				break;
			case "list":
			case "l":
				sink.Add(head + "}");
				Walk(branches[0], sink);
				break;
			case "plural":
			case "p":
				sink.Add(head + "}");
				List<string> nested = [];
				foreach (Format branch in branches)
				{
					Walk(branch, nested);
				}
				sink.AddRange(nested.Distinct(StringComparer.Ordinal));
				break;
			default:
				sink.Add(head + "}");
				Walk(inner, sink);
				break;
		}
	}

	private static string ConditionPrefix(Format branch)
	{
		Match match = ConditionPrefixRegex.Match(branch.GetLiteralText());
		return match.Success ? match.Value : "";
	}
}
