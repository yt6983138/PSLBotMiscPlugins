# ADR 0017: Translation platform and localization pipeline

- **Status:** Accepted
- **Tracking:** none
- **Recorded:** 2026-11-04.
- **Source:** Owner decisions in a localization discussion on 2026-11-02 to 2026-11-04.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Translations are maintained in a Google Spreadsheet (one column per language) and deployed by uploading a CSV export with the AdminHelper `/csv-to-localization` command. Long and multiline strings are hard to edit there, and verification is done with hand-built nested spreadsheet formulas. Localizers do not use GitHub, so non-English `help_*.md` files are sent back and forth by hand and have become stale (they still describe the removed `/login` and `/link-token`). English defaults are defined in code (`LocalizationService.Generate()`); `HelpCommand` reads help files from `./PSL/` on the deployment, not from the repository.

## Decision

- **Platform:** hosted Weblate on the free Libre plan. Both repositories are public and MIT-licensed; the owner accepts that all strings, including unreleased text, are public there. Libre approval is manual ("established project" criteria); if it is refused, the fallback is **self-hosted Weblate** (owner-operated), which leaves the rest of this decision unchanged.
- **English source of truth stays in code** (`Generate()`). A tool exports it as flat `en.json` (key → text).
- **Separate translations repository** holds `en.json`, every per-language flat JSON file, and **all help files, including English `help.md`**. Weblate reads from and commits to this repository only. Help files are removed from the `PSLDiscordBotBase/Documentation/` submodule folder. Agents cannot edit help text; plans list help updates as owner tasks.
- **Export runs in the parent repository's CI** on pushes to `master`, from the pinned submodule revision, and commits `en.json` to the translations repository when it changed. Advancing the submodule pointer is therefore what releases new English text to translators.
- **Merge and validation run locally (owner-run only).** No CI for this step.
- **Validation replaces spreadsheet formulas.** The local tool compares each translation's placeholders with English using SmartFormat's parser and enforces Discord length limits. Weblate flags (`max-length`, `regex`, `placeholders`) provide translator-time checks using the same rules.
- **Key roles come from key-name suffixes** (`…Name` → command/option name rules, `…Description` → description limit, other suffixes as added, everything else → message limit), with a small override list. Weblate bulk-edit rules mirror the same suffixes.
- **Deployment reuses `/csv-to-localization`.** The tool writes a validated CSV in that command's layout (header row, key in column 0, language columns until the first header starting with `__`, blank cells skipped). Help files are copied to `./PSL/` by hand.
- **Migration:** a one-time import from a CSV export of the spreadsheet, using the same parsing rules, into per-language files. Old help translations are not imported; translators start fresh in Weblate (old files remain in git history).
- **Tooling:** one console project in the parent repository with three verbs: `export`, `import-csv`, `build-csv`.
- **After migration** the spreadsheet is retired as a read-only archive. `/csv-to-localization` and `/localization-to-csv` remain.

## Consequences

- English text reaches translators only after the submodule pointer is advanced and CI runs.
- Weblate commits never touch the code repositories; the translations repository needs a CI push credential owned by the owner.
- Exporting defaults needs a side-effect-free way to obtain `Generate()` output, because the `LocalizationService` constructor loads or creates the localization file.
- The tool builds on the ADR 0016 localization API; implement it after ADR 0016.

## Open questions

None.
