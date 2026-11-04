# ADR 0016: Localization fallback simplification

- **Status:** Accepted
- **Tracking:** none
- **Recorded:** 2026-11-04.
- **Source:** Owner decisions in a localization discussion on 2026-11-02 to 2026-11-04.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

`PSLDiscordBot.Framework/Localization` gives every `LocalizedString` its own mutable `FallBackLanguages` list. Most strings share one list instance with `LocalizationManager.DefaultFallbackLanguages`, and the loader re-links equal lists to that instance. On top of this sit `FallbackLanguageApplyWay` and `ApplyFallbackLanguagesToStrings`. They have no callers and are broken: `Merge` is skipped, and `OverwriteContentAll` throws. Every entry in `Localization.json` repeats its fallback array. In practice the only behavior used is "requested language → en-US → key name".

`LocalizationService`/`LocalizationManager` indexers throw `KeyNotFoundException` when a key is missing from the deployed `Localization.json`. The clone helpers are undocumented and inconsistent: `LocalizedString.CloneAsNew` shares the source's text dictionary by reference, while `DeepClone` copies it.

## Decision

### Lookup

- **Fallback is per requested language, configured globally.** `LocalizationManager` owns a default chain plus optional per-language chains (for example `zh-CN → zh-TW → en-US`). Resolution: the requested language, then its chain (or the default chain if it has none), then the key name. There are no string-specific fallbacks.
- **Chains are explicit.** A chain does not implicitly continue with the default chain; a chain that omits `en-US` falls through to the key name.
- **Removed:** per-string `FallBackLanguages`, `FallbackLanguageApplyWay`, `ApplyFallbackLanguagesToStrings`, and the shared-list re-linking in the serializers.
- **A missing key never throws.** The result is a new detached string with no texts and no manager reference, only the key name, so every lookup returns the key name. There is no fallback to the in-code defaults from `Generate()`; keeping the deployed file complete (`--addNonExistentLocalizations`) is the operator's responsibility. Core `LocalizationService` logs a warning on every access to a missing key, since that is a real missing string rather than an untranslated one. Strings that exist but resolve to their key name are not logged.

### `LocalizationManager`

- Does not implement `IDictionary`/`IReadOnlyDictionary`. Exposes strings only as an `IReadOnlyDictionary<string, LocalizedString>` property; changes go through dedicated methods.
- Key-level lookup: an indexer (missing key → the detached key-name string) and `TryGet(key, out LocalizedString)`.
- `Add(key, str)` and `Replace(key, str)` throw if `str` already has a key name or a manager reference. `Replace` detaches the old string first. Strings are attached only through these methods.
- `Remove(key)` takes a key only, clears the removed string's key name and manager reference, and returns it (`null` if the key is missing).
- Fallback chains: the default chain is `CommonLanguageFallback`, one property replaced as a whole; per-language chains are `LanguageSpecificFallback`, a `ConcurrentDictionary<Language, …>` whose values are immutable lists, replaced per entry or in bulk, never edited in place.
- `DeepClone()` builds a new manager with the same chains and a detached copy of every string added through `Add`, so every copy points at the new manager.

### `LocalizedString`

- Exposes its texts as a normal mutable `Dictionary<Language, string>`. The key name and manager reference stay internal.
- Keeps the existing string and `Language` indexers and the `IDictionary<string, string>`/`IReadOnlyDictionary<string, string>` interfaces, so a string is passed to Discord directly. The interfaces cover only the string's own texts; the indexer getter is the documented exception that applies fallback. `CopyTo` is implemented.
- The manager reference means "looks up fallback chains in this manager", not ownership.
- Clone helpers, each documented:
  - `CloneDetached()` (replaces `CloneAsNew`): copies the texts into a new dictionary; no key name and no manager reference, so it can be added to a manager.
  - `MakePreFormatted(...)`: new formatted texts; keeps the key name and manager reference so the chain still applies. The add guard therefore rejects it.
  - `LocalizedString.DeepClone()` is removed; `LocalizationManager.DeepClone()` uses `CloneDetached()` plus `Add`.

### Discord, persistence, configuration

- **Discord localizations contain only each string's own translations.** Discord shows the base (default) text for locales without a translation; the fallback chain does not apply there.
- **New `Localization.json` format, no compatibility reader.** The default chain and per-language chains are separate properties (`CommonLanguageFallback`, `LanguageSpecificFallback`). The owner converts deployed files with a one-off script; the code reads and writes only the new format. This overrides ADR 0015's read/write-compatibility requirement **for the localization file only**. The serializer stays on Newtonsoft for now and moves to System.Text.Json with the rest of ADR 0015.
- Which chains to configure (for example whether `zh-TW → zh-CN`) is owner configuration in `Localization.json`, not code.
- **Changes at runtime:** the manager is shared by all commands. Editing strings or the manager in place while commands run is unsafe; the supported way is to clone, edit, and swap `LocalizationService.Data` (as `CsvToLocalization` does). No locking is added.

## Consequences

- Deploying this change requires converting the deployed `Localization.json` first; the old format no longer loads.
- `LocalizedString.Default` keeps returning the base text (first language of the default chain that has text, then the key name). Option lookup and command names depend on it.
- zh-CN users see the base (English) command and option names wherever zh-CN names are missing, even with a `zh-CN → zh-TW` chain.
- Plugins that build or edit localization (AdminHelper `CsvToLocalization`, `LocalizationKeyCheck`) must build against the new API.

## Open questions

None.
