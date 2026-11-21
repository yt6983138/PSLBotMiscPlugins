using PSLDiscordBot.Core.Command.Global.Aliases;
using PSLDiscordBot.Core.Models.SongAlias;

namespace AdminHelper.Commands;

[AddToGlobal]
public class AliasAdminCommand : AdminCommandBase
{
	private const string TableOptionName = "table";
	private const string OperationOptionName = "operation";
	private const string KeyOptionName = "key";
	private const string AliasOptionName = "alias";

	private readonly AvatarHashMapService _avatarHashMapService;

	public AliasAdminCommand(IServiceProvider provider, AvatarHashMapService avatarHashMapService)
		: base(provider)
	{
		this._avatarHashMapService = avatarHashMapService;
	}

	public override OneOf<string, LocalizedString> PSLName => "alias-admin";
	public override OneOf<string, LocalizedString> PSLDescription => "[Admin command] add or remove an alias in a raw alias table";

	public override SlashCommandBuilder CompleteBuilder => this.BasicBuilder
		.AddOption(
			TableOptionName,
			ApplicationCommandOptionType.String,
			"Table id, e.g. Avatar_0, Global_0, Server_<guild id>",
			isRequired: true)
		.AddOption(
			OperationOptionName,
			ApplicationCommandOptionType.Integer,
			"Add or remove the alias",
			isRequired: true,
			choices: BuilderUtility.CreateChoicesFromEnum<AliasModifyOperation>())
		.AddOption(
			KeyOptionName,
			ApplicationCommandOptionType.String,
			"Song id (Global/Server tables) or avatar key (Avatar table)",
			isRequired: true,
			isAutocomplete: true)
		.AddOption(
			AliasOptionName,
			ApplicationCommandOptionType.String,
			"The alias to add or remove",
			isRequired: true);

	public override async Task RootCallback(SocketSlashCommand arg, UserData? data)
	{
		string tableText = arg.GetOption<string>(TableOptionName);
		AliasModifyOperation operation = arg.GetOptionOrDefault(OperationOptionName, AliasModifyOperation.Add);
		string key = arg.GetOption<string>(KeyOptionName);
		string alias = arg.GetOption<string>(AliasOptionName);

		// the id is validated before any requester exists, so a bad id can never create a table
		if (!AliasTableId.TryParse(tableText, out AliasTableId table))
		{
			await arg.QuickReply("Invalid table id. Expected `Type_number` with type Server, Global or Avatar, e.g. `Avatar_0`, `Global_0`, `Server_<guild id>`.");
			return;
		}
		string tableId = table.ToString();

		// the avatar table is the only one that may be created by this command
		if (!table.IsAvatar && !this._aliasService.TableExists(table))
		{
			await arg.QuickReply($"Table `{tableId}` does not exist.");
			return;
		}

		bool keyValid = table.KeysAreSongIds
			? this._phigrosService.NonMultiLanguageInfos.Songs.Any(x => x.Id == key)
			: this._avatarHashMapService.Data.ContainsKey(key);
		if (!keyValid)
		{
			await arg.QuickReply(table.KeysAreSongIds
				? $"`{key}` is not a known song id."
				: $"`{key}` is not a known avatar key.");
			return;
		}

		using AliasService.DynamicTableRequester dynamicRequester = this._aliasService.GetDynamicTableRequester(table);
		using AliasService.StaticTableRequester staticRequester = this._aliasService.GetStaticTableRequester();

		SongAliasData newAlias;
		if (operation == AliasModifyOperation.Add)
		{
			SongAliasData? existing = dynamicRequester.FindAliasOrNull(key);
			if (existing is not null && existing.Aliases.Contains(alias))
			{
				await arg.QuickReply($"`{alias}` is already on `{key}` in `{tableId}`: {string.Join(", ", existing.Aliases)}");
				return;
			}

			dynamicRequester.MutateAliases(key, x => x.Add(alias), out List<Guid> guids, out newAlias);
			await staticRequester.MutateMetadataExisting(guids[0], x => x.OperatorId = arg.User.Id);
		}
		else
		{
			dynamicRequester.MutateAliases(key, x => x.Remove(alias), out List<Guid> guids, out newAlias);

			if (guids.Count < 1) // removed nothing, so the alias must not exist
			{
				await arg.QuickReply($"`{alias}` is not on `{key}` in `{tableId}`.");
				return;
			}

			await staticRequester.MutateMetadataExisting(guids[0], x => x.OperatorId = arg.User.Id);
		}

		await arg.QuickReply($"Done. `{key}` in `{tableId}` now has: {string.Join(", ", newAlias.Aliases)}");
	}

	public override ValueTask<IEnumerable<AutocompleteSuggestion>> Autocomplete(AutocompleteContext context)
	{
		if (context.Focused.Name != KeyOptionName)
			return base.Autocomplete(context);

		AutocompleteOption? tableOption = context.OtherOptions.FirstOrDefault(x => x.Name == TableOptionName);
		if (!AliasTableId.TryParse(tableOption?.Value?.ToString(), out AliasTableId table))
			return base.Autocomplete(context);

		return ValueTask.FromResult(table.KeysAreSongIds
			? this._autocompleteSuggestionService.GetSongSuggestions(context.FocusedText)
			: this._autocompleteSuggestionService.GetAvatarSuggestions(context.FocusedText));
	}
}
