# ADR 0017: Translation platform and localization pipeline

- **Status:** Accepted
- **Tracking:** https://github.com/users/yt6983138/projects/2/views/2?pane=issue&itemId=302589171&issue=yt6983138%7CPSLBotMiscPlugins%7C20
- **Recorded:** 2026-11-04.
- **Source:** Owner decisions in a localization discussion on 2026-11-02 to 2026-11-04.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Translations are maintained in a Google Spreadsheet (one column per language) and deployed by uploading a CSV export with the AdminHelper `/csv-to-localization` command. Long and multiline strings are hard to edit there, and verification is done with hand-built nested spreadsheet formulas. Localizers do not use GitHub, so non-English `help_*.md` files are sent back and forth by hand and have become stale (they still describe the removed `/login` and `/link-token`). English defaults are defined in code (`LocalizationService.Generate()`); `HelpCommand` reads help files from `./PSL/` on the deployment, not from the repository.

## Decision

- **Platform:** hosted Weblate on the free Libre plan. Both repositories are public and MIT-licensed; the owner accepts that all strings, including unreleased text, are public there. Libre approval is manual ("established project" criteria); Weblate confirmed eligibility to the owner on 2026-11-12, including the separate repository under the same GitHub account. If Libre hosting is ever withdrawn, the fallback is **self-hosted Weblate** (owner-operated), which leaves the rest of this decision unchanged.
- **English text is owned by `UX/en-US.json` in the translations repository** (amended 2026-11-12; originally code-owned). Code defaults (`Generate()`) only supply the initial text of new keys. The export **adds missing keys only**: it never overwrites existing English text, and it does not delete keys that are no longer in code, but lists them in the CI job summary for the owner. English wording is edited in Weblate or the translations repository.
- **Plans that change the text, placeholders, or meaning of an existing localization key** must list, as an owner task, each affected key and the manual edit needed in `UX/en-US.json`, because the export will not propagate it. Prefer a new key when the placeholders change.
- **Separate translations repository** holds `UX/en-US.json`, every per-language flat JSON file, and **all help files, including English `help.md`**. Weblate reads from and commits to this repository only. The repository is `yt6983138/PSLDiscordBot.Localizations` (local checkout next to this repository, `../PSLDiscordBot.Localizations`). Layout: `UX/` holds the bot string files (`UX/en-US.json` plus one flat file per language); `Documentations/` holds localized documents, one subfolder per source document (`Documentations/Help/` for `help.md`). Help files are removed from the `PSLDiscordBotBase/Documentation/` submodule folder. Agents cannot edit help text; plans list help updates as owner tasks.
- **Export runs in the parent repository's CI** on pushes to `master`, from the pinned submodule revision, and commits `UX/en-US.json` to the translations repository when keys were added. Advancing the submodule pointer is therefore what releases new keys to translators.
- **Merge and validation run locally (owner-run only).** No CI for this step.
- **Validation replaces spreadsheet formulas.** The local tool compares each translation's placeholders with English using SmartFormat's parser and enforces Discord length limits. Weblate flags (`max-length`, `regex`, `placeholders`) provide translator-time checks using the same rules.
- **Key roles come from key-name suffixes** (`…Name` → command/option name rules, `…Description` → description limit, other suffixes as added, everything else → message limit), with a small override list. Weblate bulk-edit rules mirror the same suffixes.
- **Deployment reuses `/csv-to-localization`.** The tool writes a validated CSV, including the English column from `UX/en-US.json`, in that command's layout (header row, key in column 0, language columns until the first header starting with `__`, blank cells skipped). Help files are copied to `./PSL/` by hand.
- **Migration:** a one-time import from a CSV export of the spreadsheet, using the same parsing rules, into per-language files. Old help translations are not imported; translators start fresh in Weblate (old files remain in git history).
- **Tooling:** one project in the parent repository, `LocalizationTool`, that is both a console app (verbs `export`, `import-csv`, `build-csv`) and a bot plugin (amended 2026-11-12). The AdminHelper localization commands (`/csv-to-localization`, `/localization-to-csv`, `/localization-key-check`) move into its plugin side, so the CSV layout, flat-file, and validation code exist once. The project uses normal copy-local references so the console runs standalone; ADR 0014 deploy subtraction removes the host's DLLs from its plugin folder.
- **After migration** the spreadsheet is retired as a read-only archive. All three admin commands remain.

## Consequences

- English text reaches translators only after the submodule pointer is advanced and CI runs.
- Weblate commits never touch the code repositories; the translations repository needs a CI push credential owned by the owner.
- Exporting defaults needs a side-effect-free way to obtain `Generate()` output, because the `LocalizationService` constructor loads or creates the localization file.
- The tool builds on the ADR 0016 localization API; implement it after ADR 0016.

## Addendum (owner decisions, 2026-11-14)

- **The migration import keeps keys that are not in the code defaults.** Every non-blank cell in the spreadsheet CSV is imported, including keys that `Generate()` does not define, and those keys are listed as a warning. Plugins can read localization keys at runtime that are not known at compile time (for example the blacklist service), so "not in the code defaults" does not mean "unused". `/csv-to-localization` also keeps such keys.
- **Orphaned keys are not necessarily unused.** The export's list of orphaned keys (in `UX/en-US.json` but not in the code defaults) can include keys that plugins read at runtime. Check whether a plugin reads a key before deleting it from `UX/en-US.json`; deleting it also drops its translations in Weblate.

## Open questions

None.
