using System.Text.Json;
using System.Text.RegularExpressions;

namespace LocalizationTool.Validation;

public enum KeyRole
{
	/// <summary>Discord command/option name.</summary>
	Name,
	/// <summary>Discord command/option description.</summary>
	Description,
	/// <summary>Any other text (message content, labels, ...).</summary>
	Message
}

/// <summary>
/// Key-role classification and the per-role limits, in one place. Role is decided by the key suffix
/// (<c>Name</c>, <c>Description</c>, else message) unless <c>key-roles.json</c> overrides it.
/// </summary>
public sealed partial class KeyRoles
{
	public const string OverrideFileName = "key-roles.json";

	// https://github.com/discord-net/Discord.Net/blob/5483f10788e6c31312b2ecc8c59c7f5198312824/src/Discord.Net.Core/Entities/Interactions/SlashCommands/SlashCommandBuilder.cs#L442
	[GeneratedRegex(@"^[-_\p{L}\p{N}\p{IsDevanagari}\p{IsThai}]{1,32}$", RegexOptions.Compiled)]
	public static partial Regex NameValidationRegex { get; }

	private readonly Dictionary<string, KeyRole> _overrides;

	public KeyRoles(Dictionary<string, KeyRole>? overrides = null)
	{
		this._overrides = overrides ?? [];
	}

	/// <summary>
	/// Loads <c>key-roles.json</c> (key to role name) from <see cref="AppContext.BaseDirectory"/>.
	/// A missing file means no overrides; an invalid role name throws <see cref="InvalidDataException"/>.
	/// </summary>
	public static KeyRoles Load()
	{
		string path = Path.Combine(AppContext.BaseDirectory, OverrideFileName);
		if (!File.Exists(path)) return new();

		Dictionary<string, string> raw = JsonSerializer.Deserialize<Dictionary<string, string>>(File.ReadAllText(path))
			?? throw new InvalidDataException($"'{path}' does not contain a JSON object.");
		Dictionary<string, KeyRole> overrides = [];
		foreach (KeyValuePair<string, string> item in raw)
		{
			// Exact enum names only: Enum.TryParse would also accept numbers and comma lists.
			if (!Enum.GetNames<KeyRole>().Contains(item.Value, StringComparer.Ordinal)
				|| !Enum.TryParse(item.Value, false, out KeyRole role))
			{
				throw new InvalidDataException(
					$"'{path}': key '{item.Key}' has invalid role '{item.Value}' (expected {string.Join(", ", Enum.GetNames<KeyRole>())}).");
			}
			overrides[item.Key] = role;
		}
		return new(overrides);
	}

	/// <summary>Override keys that are not in <paramref name="codeKeys"/> (probably stale or misspelled), ordinally sorted.</summary>
	public List<string> GetUnusedOverrides(IReadOnlySet<string> codeKeys)
		=> this._overrides.Keys.Where(x => !codeKeys.Contains(x)).Order(StringComparer.Ordinal).ToList();

	public KeyRole GetRole(string key)
	{
		if (this._overrides.TryGetValue(key, out KeyRole role)) return role;
		if (key.EndsWith("Name", StringComparison.Ordinal)) return KeyRole.Name;
		if (key.EndsWith("Description", StringComparison.Ordinal)) return KeyRole.Description;
		return KeyRole.Message;
	}

	/// <summary>
	/// Checks <paramref name="text"/> against the limits of <paramref name="role"/>.
	/// Returns null when valid, otherwise a short problem description.
	/// </summary>
	public static string? Validate(KeyRole role, string text)
	{
		int length = text.EnumerateRunes().Count();
		switch (role)
		{
			case KeyRole.Name:
				if (length < 1 || length > SlashCommandBuilder.MaxNameLength)
				{
					return $"name length {length} is outside 1-{SlashCommandBuilder.MaxNameLength}";
				}
				if (!NameValidationRegex.IsMatch(text))
				{
					return "name contains characters Discord does not allow";
				}
				if (text != text.ToLowerInvariant())
				{
					return "name must be lowercase where the script has case";
				}
				return null;
			case KeyRole.Description:
				return length is < 1 or > SlashCommandBuilder.MaxDescriptionLength
					? $"description length {length} is outside 1-{SlashCommandBuilder.MaxDescriptionLength}"
					: null;
			default:
				return length > DiscordConfig.MaxMessageSize
					? $"message length {length} exceeds {DiscordConfig.MaxMessageSize}"
					: null;
		}
	}
}
