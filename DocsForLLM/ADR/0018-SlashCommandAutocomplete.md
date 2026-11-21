# ADR 0018: Slash-command autocomplete, search core and avatar aliases

- **Status:** Accepted
- **Tracking:** none
- **Recorded:** 2026-11-20
- **Source:** Owner decisions and code review, 2026-11-15 to 2026-11-21.

## Context

No command had autocomplete. Free-text options that resolve against a known set (song search, profile background, profile avatar, the alias commands, collection `read item`) had to be typed exactly or fuzzily matched on submit. Facts that shaped the design:

- Discord.Net 3.20.1 allows exactly one reply to an autocomplete interaction, the suggestion list. Deferring, text replies and follow-ups throw, so the existing status and blacklist text replies and `QuickReply` cannot be used.
- The Core slash pipeline (`CommandBase.Execute`) defers, reads `UserData` from the database and runs constraints. It is unusable per keystroke.
- The gateway receive loop in Discord.Net 3.20.1 is sequential, one per connection, and the bot uses a single `DiscordSocketClient`. A handler's synchronous part delays every later gateway event, including heartbeat acks; blocking past the heartbeat interval triggers a reconnect. REST calls use their own queue.
- `AliasService.SearchSong` was costly per call (table request, dictionary rebuilds) and strict (exact, half-length gate, Levenshtein ratio).
- Avatars are only an internal name mapped to a PNG hash; they have no display name, localization or alias mechanism.
- Discord limits: 25 suggestions, name and string value at most 100 characters, autocomplete only on String/Integer/Number options and never together with `choices`.

## Decision

### Framework routing

- `CommandResolveService` subscribes `AutocompleteExecuted`, raises a cancellable `BeforeAutocompleteExecutes` hook, finds the command by `Data.CommandName` and calls the virtual `BasicCommandBase.HandleAutocomplete(SocketAutocompleteInteraction)`. This mirrors component dispatch ([ADR 0004](0004-CommandComponentRouting.md)).
- Command lookup is the same linear lookup the other dispatch paths use (the slash path's `GetAll*().FirstOrDefault(x => x.Name == ...)`). Consistency and maintainability outweigh the per-keystroke cost, which is negligible next to the Discord round trip.
- The handler always runs inside `Task.Run`, tracked by `ILifetimeService.Track`, regardless of `RunOnDifferentThread` (which describes the slash/component run). Reason: the sequential gateway loop described above; autocomplete fires per keystroke and its search is CPU work.
- The framework never replies itself. When a hook cancels, the command is unknown, or the handler fails, nothing is sent and the interaction expires; the client shows its own failure text and free text can still be submitted. The default `HandleAutocomplete` sends nothing. Handler exceptions (including Discord.Net's `TimeoutException` for a late reply) go through `Track` to `OnAutocompleteError`. Core handles that event like slash and component errors: `OnException` logs at Error and DMs the admin with an interaction description (user, command, focused option, server, channel). There is no throttling and users get no error text, because an autocomplete interaction cannot carry one.
- "Latest keystroke wins" cancellation is not built: each keystroke is its own interaction and Discord drops late answers.

### Core routing

- `CommandBase` seals `HandleAutocomplete`. For commands with children it walks the leading `SubCommandGroup`/`SubCommand` entries of the flattened `Data.Options` against node names using the same name-and-type matching as the slash path. The two paths are not fully merged because their option shapes differ (nested versus flat) and so do their policies (throw versus empty). An unmatched path answers empty instead of throwing and is logged at Warning.
- Handlers are the virtual `Autocomplete(AutocompleteContext)` on `CommandBase` (flat commands) and `SubcommandNode`, like `Callback`. `AutocompleteContext` holds the interaction, the focused option, the leaf's other options and the language from the user's locale. An option is built with autocomplete enabled and its node handles it; the two are kept in step by hand.
- The base applies the limits and sends the single response: at most 25 suggestions (Discord.Net's own limit constants are used); names cut to 100 characters (cuts not logged); a suggestion with an empty name, a null value or a string value over 100 characters is dropped, because a cut value would no longer resolve. Dropped and surplus suggestions are logged at Warning once per response.
- Core logs the elapsed time of each autocomplete at Debug level.
- Handler rules: in-memory only. No `DbContext`, no network, no `UserData` read, no constraints. The return type is `ValueTask` so async is possible later, but handlers are expected to complete synchronously. Nodes stay stateless.

### Access checks

- Only a cancellable before-hook gates autocomplete. AdminHelper's `StatusService` is its only subscriber. The blacklist is not applied, as for components; a blacklisted user is still blocked on submit. There are no Registered/TOS checks. Hooks cannot send text to the user.

### Suggestion behaviour

- Empty input gives no suggestions, with three explicit exceptions: the alias-to-operate option on alias remove and the `alias` option of the `/alias-audit` subcommands list all of the chosen song's aliases when the typed text is empty, and the `/alias-audit` song option lists the first suggestions-limit songs that have a server alias, in song order.
- Song suggestions choose alias tables from the interaction context, the same way in every command: in a server, that server's table and then the global one; in DMs, the global one only. The AdminHelper `alias-admin` key suggestions are the exception and stay global only. The inheritance chain is ignored (the value is the song id, so inheritance only changes the label). Exception: the `/alias-audit` song option uses that server's table only, because audit works only on server aliases, and offers only songs that have an alias in it (matched by id, name or alias).
- With several alias sources, the sources are scored in order and a later one wins only if strictly better, so on a tie the key, then the name, then the server alias labels the hit. A tie only changes the label, never ranking or inclusion.
- The alias-to-operate option on the server alias modify command reads that server table's in-memory snapshot to suggest the song's existing aliases, and resolves the chosen song against the server table and then the global one. The audit `alias` option does the same against the server table only.
- A song suggestion's value is the song id. Strict search gets no exact-id shortcut, so near matches can still come back with it and each command handles that as before.
- Suggestion text is the display name plus the matched alias when the match came from one, cut to 100 characters. Avatar suggestions show the alias and the raw key; the value is the avatar key. Suggestions use the same single-language names and aliases as `SearchSong`; localized song names are out of scope.
- Strict commands are unchanged: partial matching (exact, prefix, substring, fuzzy tiers) is for autocomplete only. `PSLDiscordBot#73` (tie order, exact-match case quirk) is out of scope.

### Shared search

- Autocomplete suggestions come from one injected singleton service with methods for songs, avatars, collection items and aliases-to-operate. Songs, avatars and collection items share one search path (empty-input guard, then the search core; the value is the candidate key) and one name format (`primary` / `primary (detail)`). The alias-to-operate song threshold is a parameter. Autocomplete partial mode has its own owner-tunable fuzzy minimum (currently 0.75).
- The search core is static and pure: no DI, no database, in the Core project. It is generic over the source items: callers supply key and name selectors, an ordered list of alias dictionaries keyed by key, the input, a threshold and whether partial matching is allowed. It has a shared default threshold of 0.75, used by strict command search. Strict mode reproduces the previous `SearchSong` scoring exactly; partial mode ranks exact, then prefix, then substring, then fuzzy, with named constants for the tiers. Hits are kept by stable bounded insertion.
- Search specification and tests (owner, 2026-11-21): the search core is covered by an MSTest project in the submodule next to Core. Strict mode is a parity spec: its results, exact scores included, are identical to the command search before this feature. Partial mode specifies only the tier order (exact, then prefix, then substring, then fuzzy), the threshold as the minimum, and the tie rules: the first-scored string wins on an equal score, the key and the name beat aliases, and an earlier alias source wins label ties. The sub-score formula within a tier and the fuzzy threshold are implementation details the owner may tune; tests do not pin them.
- There are no candidate caches. Caches keyed by source-object reference cannot notice in-place changes to the mutable source lists (data updates replace or edit them), and their only saving, lowercasing a few hundred strings, is negligible next to the Discord round trip. Sources are read directly on each call.
- There is no stack-buffer or pooled lowercasing. FuzzySharp 2.0.2 has no span API (its string ratio copies both strings to arrays, and its array ratio uses the full array length, so an oversized pooled buffer cannot be passed), and the owner's benchmark found manual char-array lowering much slower than `string.ToLowerInvariant` for about 1 KB less allocation out of 200+ KB. Scoring uses `ToLowerInvariant`.
- Aliases are held as one immutable snapshot per table, replaced on table load and on every alias mutation; the cached-aliases read returns it without cloning. `Global_0`, `Avatar_0` and then every server table that already exists in the database are loaded once in a tracked background task when the plugin is ready, so suggestions show aliases before the first strict search. The preload creates no tables and a failure on one table is logged while the rest continue; a table that is not loaded yet is skipped by autocomplete.

### Alias table ids

- The alias table id is a closed value type (kind Global, Server or Avatar, plus id) replacing the previous kind-enum plus `ulong` pairs. It cannot be constructed freely; `default` is `Global_0`. Parsing is strict about the shape (exact case-sensitive kind name, decimal digits only with no sign, whitespace or other characters, Global/Avatar only id 0); leading zeros are accepted and normalized, so `Server_007` parses as `Server_7`, and the canonical text form is what gets stored. The text form is exactly `{Kind}_{Id}`, because those strings are SQLite table names and stored `TableId`/`InheritsFrom` values. Rules on the type (default parent, default inheritability, whether keys are song ids) replace the old string-prefix guess.
- Fix bundled with this: `/alias-table-info` `InheritsFrom` is parsed strictly. Previously a string-prefix check accepted values like `Globalxyz` or `Global_5` as inheritable and loading then created that table. A stored `InheritsFrom` that does not parse ends the inheritance chain with a Warning log and never throws.

### Avatar aliases

- Avatars get aliases in a hidden alias table `Avatar_0`; the avatar key takes the place of the song id. Avatar suggestions come from the avatar hash map's keys plus that table. `Avatar_0` is loaded at ready together with `Global_0` (see Shared search).
- The table is edited by the AdminHelper `alias-admin` command (bot admins only), which takes a raw table id and an operation. It parses the id with the strict table-id parser, refuses tables that do not exist except the avatar table, and validates the key by table type: a song id for Global/Server tables, an avatar key for the Avatar table.
- Profile avatar submit accepts only the raw avatar key; anything else is `LocalProfileAvatarUnknown`. Aliases are for finding the key in autocomplete, not for typing by hand.

### Background and collection

- The profile background option accepts an exact song name (as before) or a song id; the stored `GameUserInfo.BackgroundId` stays the song name. Duplicate song names get no handling.
- Collection `read item` suggests items by key from the shared search. Its callback checks for an exact key first, then falls back to its existing fuzzy match.

## Rejected alternatives

- **Name-to-command map for autocomplete lookup:** a second lookup mechanism for a negligible saving; replaced by the common linear lookup.
- **Framework empty-reply on cancel, unknown command or failure:** hides failures from the logs and invents behaviour; replaced by letting the interaction expire and reporting errors via `OnException`.
- **Honouring `RunOnDifferentThread` for autocomplete:** a synchronous handler would block the gateway loop.
- **Static suggestion providers with process-wide caches:** they only forwarded services and held stale-prone state; replaced by the injected singleton.
- **Candidate caches and stack-buffer lowercasing:** see Shared search.
- **Running the slash pipeline or blacklist for autocomplete:** needs a deferral or database read that autocomplete cannot do.
- **Global aliases only in song suggestions:** hid server aliases from the people who made them. Replaced by server plus global in a server, with a startup preload of existing server tables so no per-keystroke database read is needed.
- **Merging server and global aliases into one dictionary per keystroke:** an allocation per keystroke; replaced by scoring an ordered list of alias sources.

## Consequences

- Handlers must stay in-memory and fast; any database or network need would require a new decision.
- An autocomplete option and its node handler must be kept in step by hand.
- Data updates need no cache invalidation for search, because sources are read directly. Alias snapshots are replaced on load and mutation.
- Suggestions can be stale between keystroke and submit; submit-side validation stays authoritative.
- Changes to the strict search results or the partial-mode tier order and tie rules are caught by the search tests; the partial sub-score formula and fuzzy threshold can be retuned without touching them.
- The avatar alias table adds a new persisted table id (`Avatar_0`) and an admin-only editing command.
- The behaviour changes to existing commands are the three empty-input exceptions (alias-to-operate on alias remove, the audit `alias` option, the audit song option), the strict `InheritsFrom` parse, the profile background option also accepting a song id, and collection `read item` checking for an exact key before its unchanged fuzzy match.

## Open questions

- Help text (`help.md`, `help_*.md` in the translations repository) does not yet mention autocomplete, avatar aliases or the background song-id input; this is an owner task ([ADR 0017](0017-TranslationPlatform.md)).
- `SearchSong` sorts with unstable `List.Sort`, so strict-mode ties may not keep song order; changing it alters behaviour and is left to the owner with `PSLDiscordBot#73`.
- `CollectionCommand.Read` keeps its own `MinimumSimilarity = 0.75` outside `CandidateSearch`; unifying it is not decided.
