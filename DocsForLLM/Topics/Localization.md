# Localization

Current localization rules for agents: how new text reaches translators and the deployed bot, how to declare keys, and how lookup, fallback and mutation behave. This is the single home of these rules; other documents summarize in one line and link here.

## Purpose

Core text is declared in code, exported to a separate translations repository, translated in Weblate, and deployed as a localization file. Agents change code defaults and key declarations only. English wording and help content belong to the owner through the translations repository. Decision records: [ADR 0016](../ADR/0016-LocalizationFallbackSimplification.md) (fallback and mutation model) and [ADR 0017](../ADR/0017-TranslationPlatform.md) (translation platform and pipeline).

## How to use

### Localization pipeline

Code defaults (`LocalizationService.Generate()`) supply the initial text of new keys. CI (`.github/workflows/export-localization.yml`) runs `LocalizationTool export`, which adds missing keys to `UX/en-US.json` in `yt6983138/PSLDiscordBot.Localizations` (it never changes or deletes existing keys). Translators work in Weblate on that repository. Before deploy the owner runs `build-csv` (validated upload CSV) and uploads it with `/csv-to-localization`. Build the tool with `dotnet build "LocalizationTool/LocalizationTool.csproj" --configuration Debug --nologo --verbosity minimal`; run it only as the [AGENTS.md](../../AGENTS.md#required-policy) allowlist permits. The tool's helpers are catalogued in [ExistingUtilities.md](../ExistingUtilities.md#localizationtool-helpers).

### Adding or changing a localized Core string

- Keep `OneOf<string, LocalizedString>` and the existing localization/SmartFormat flow.
- Localized Core additions require the appropriate partial key declaration under `Core/Localization/` **and** defaults in `LocalizationService.Generate()`. Update those, not emitted generated keys or local runtime JSON.
- `LocalizationService.CreateDefaults()` returns the code defaults without loading or creating the localization file; see [ExistingUtilities.md](../ExistingUtilities.md#core-services).
- Plans: English text lives in the translations repository, and the CI export only adds new keys. Plans that change existing text or help content list owner tasks (see [Rules](#rules)).

### Lookup and mutation

- **Lookup:** requested language, then its per-language chain (`LocalizationManager.LanguageSpecificFallback`) or the default chain (`CommonLanguageFallback`) if it has none, then the key name. Chains are explicit (no implicit continuation to the default chain; a chain without `en-US` falls to the key name) and configured globally on the manager in `Localization.json`; strings have no fallbacks of their own. A string with no manager resolves against an en-US-only chain. `LocalizedString.Default` (base command/option name and option-lookup identifier) is en-US first, then the default chain, then the key name, independent of per-language chains. The "then the key name" step applies only when a key name is set: a detached string with none (from `CreateDefault`, `CloneDetached`, `LocalizedString.Create`) throws `KeyNotFoundException` when no language in its chain has text.
- **Missing keys:** the manager indexer never throws; it returns a new detached string holding only the key name. `TryGet(key, out str)` is the non-defaulting lookup. Core `LocalizationService` logs a warning on every missing-key access and adds nothing to `Data`; it does not fall back to the `Generate()` defaults.
- **Manager API:** `Strings` (read-only dictionary; the manager is not an `IDictionary`), `Add`/`Replace` (throw if the string already has a key or manager reference; `Replace` detaches the old one), `Remove` (detaches and returns it, `null` if absent), `DeepClone` (same chains, detached copy of each string re-added).
- **Clone helpers on `LocalizedString`:** `CloneDetached()` copies texts into a new dictionary with no key or manager reference, so it can be added to a manager. `MakePreFormatted(...)` builds formatted texts but keeps the key and manager reference (chain still applies), so the add guard rejects it; the copy keeps pointing at the manager it came from, so after a clone-edit-swap it still uses the old manager's chains. `LocalizedString.DeepClone` and `CloneAsNew` no longer exist.
- **Discord:** Discord localizations contain only a string's own translations; Discord shows the base text elsewhere and the chain does not apply.
- **Runtime changes:** the manager is shared by all commands. Clone `LocalizationService.Data` (`DeepClone`), edit the clone, then swap it in (as `LocalizationTool`'s `CsvToLocalization` does); never edit in place while commands run.

## Rules

- **English is owned by `UX/en-US.json`, not by code.** Agents cannot edit English wording or help text. A plan that changes the text, placeholders, or meaning of an existing key, or changes help content, must list each affected key/document (the manual `UX/en-US.json` edit, `help.md`, `help_*.md`) as an owner task (prefer a new key when placeholders change). Help updates are always owner tasks.
- **Help files are not in the submodule.** They live in the translations repository as `Documentations/{locale}.json` (one `"help"` key per file, a single string with `\r\n` breaks), are edited via Weblate, and are copied to `./PSL/` (`help.md`, `help_{Discord locale}.md`) on deploy.
- Never reintroduce per-string fallbacks; chains live on the manager.
- Never edit emitted keys/interfaces under `obj/Generated`, reset live localization files, or execute localization-update arguments as validation. Report any owner-applied localization update needed for deployment.
- The checkout `../PSLDiscordBot.Localizations` is outside this repository; read it only when a task says so and never commit to it.
- `PSLDiscordBotBase/Documentation/README.md` carries its own short localization notes because the submodule must stand alone; this guide is the home for the rules above.

## Pitfalls

- **"Orphaned" export keys are not necessarily unused** (keys in `UX/en-US.json` but not in code defaults; see [ADR 0017](../ADR/0017-TranslationPlatform.md)). Plugins may read keys at runtime (e.g. the blacklist service), so check before deleting one; deleting it also drops its translations in Weblate.
- Generated key values depend on member names/prefixes/suffixes: renaming a key can change persisted localization identifiers.
- Loading an existing localization file does not automatically merge new defaults, and a missing key resolves to its key name. Keep the deployed file complete (`--addNonExistentLocalizations`) and report the deployment-update requirement without resetting or executing live localization operations.
- A string kept after `MakePreFormatted` or a clone still points at its original manager's chains; do not assume a swapped manager changes it.

## Related ADRs

- [ADR 0016](../ADR/0016-LocalizationFallbackSimplification.md): single per-language fallback map, non-throwing missing keys, mutability and clone rules, `Localization.json` format.
- [ADR 0017](../ADR/0017-TranslationPlatform.md): hosted Weblate, translations repository ownership of English and help files, CI export, validation, `/csv-to-localization` deployment.
