# ADR 0010: Save-report command family (`/records`, `/cloud`)

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355715)
- **Recorded:** 2026-10-30.
- **Source:** Command-unification grill-me session on 2026-10-30; owner decisions in the round-2 planning session on 2026-11-22.
- **Depends on:** [ADR 0009](0009-SubcommandAndEphemeralHandling.md).

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Five Core commands read the user's save and return text or file reports. All derive from `CommandBase` and have no components or `generate_for` option:

| Command | Visibility | Options | Output | Save source |
|---|---|---|---|---|
| `/get-scores` | public | `index`, `count` | `Scores.txt` | cloud or local |
| `/more-rks` | ephemeral | `index`, `get-at-least`, `count` | `Report.txt` | cloud or local |
| `/export-scores` | ephemeral | `index` | `Export.csv` | cloud or local |
| `/get-money` | public | `index` | text | cloud or local |
| `/get-time-index` | ephemeral | none | text table | cloud only |

Merging them under one top-level command needs one visibility per subcommand. ADR 0009 provides that, so the merge no longer has to force a single visibility.

The score formatter owned by `/get-scores` is shared with `/get-scores-by-token`, `/photo song` ([ADR 0007](0007-PhotoCommand.md)) and the settings commands ([ADR 0006](0006-SettingsCommand.md)); any restructuring must keep it reachable.

## Decision

- Two new top-level commands, both ordinary Core commands:

  | Current command | New subcommand | Visibility |
  |---|---|---|
  | `/get-scores` | `/records list` | public |
  | `/more-rks` | `/records improve` | ephemeral |
  | `/export-scores` | `/records export` | ephemeral |
  | `/get-money` | `/records money` | public |
  | `/get-time-index` | `/cloud time-index` | ephemeral |

- Rationale for the split: `/records` covers what both cloud and local saves support; `/cloud` is a shared root for future cloud-save commands (`/get-time-index` is cloud-only). The `/records` root description names its contents, money included, so users looking for money find it. `time-index` keeps the term the `index` option already uses.
- Each subcommand keeps its old command's options, output, visibility and behavior. Only the names change.
- The score formatter moves to a neutral shared utility with no behavior change, so the other callers do not depend on a command that no longer exists.
- Hard cut: the five old commands are removed in the same release that adds the new ones, with an owner announcement. Old and new names never ship together.
- One release for this ADR and [ADR 0011](0011-SongCommand.md), with one announcement. That release is also the one that ships command-unification round 1 ([ADR 0006](0006-SettingsCommand.md), [ADR 0007](0007-PhotoCommand.md), [ADR 0008](0008-AliasCommandSplit.md)), announced together.
- Localization: every key owned by a single merged command is re-keyed, messages included, into a new key class per new command (`/records`, `/cloud`); keys shared with other commands keep their names. Translations are carried over by the owner.

## Rejected alternatives

- Command name `/scores` (the owner preferred `/records`, since the group is wider than scores).
- `/save` (reads like a verb), `/save-data`, `/game-data`.
- All five commands under one root (cloud-only time-index does not belong with reports every save mode supports; `/cloud` stays open for future cloud commands).
- Folding the text reports into `/photo` (mixes image and text outputs).
- Leaving `/get-money` and `/get-time-index` as separate top-level commands (a lone leftover and no home for future cloud-save commands).

## Consequences

- Hard cut: users and any saved shortcuts or guides using the old names stop working at release.
- Integrations (Discord command permissions) set on the old command names must be redone by server admins for the new names.
- `/command-statistics` rows start fresh under the new command names; history for the old names is not migrated.
- Existing translations of the moved keys must be carried over by the owner in the translations repository ([ADR 0017](0017-TranslationPlatform.md)).
- `/cloud time-index` still depends on international cloud saves; whether it stays useful after the shutdown ([ADR 0001](0001-InternationalCloudSaveResponse.md)) is tracked there, not decided here.

## Open questions

- English help in the translations repository (an owner task, as with ADR 0007).
- Whether `/cloud time-index` is removed later under the international cloud-save removal work; this ADR keeps it for now.
