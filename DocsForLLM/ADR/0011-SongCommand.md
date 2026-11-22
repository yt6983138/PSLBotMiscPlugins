# ADR 0011: `/song` command for song lookup

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355721)
- **Recorded:** 2026-10-30.
- **Source:** Command-unification grill-me session on 2026-10-30; owner decisions in the round-2 planning session on 2026-11-22.
- **Depends on:** [ADR 0009](0009-SubcommandAndEphemeralHandling.md).

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Two guest commands look up a song with the same required song-search option. They derive from `CommandBase` with empty master constraints (so no registration or TOS acceptance is needed):

| Command | Base | Visibility | Output |
|---|---|---|---|
| `/song-info` | `CommandBase` (guest) | public | text, `preview.png`, `Query.txt` |
| `/download-asset` | `CommandBase` (guest) | ephemeral | text, `preview.png`, `Query.txt`, `<id>.zip`, optional `<id>.pez` (PEZ difficulty option; large-file guard) |

`/download-asset` reuses the `Query.txt` builder of `/song-info`. Their visibility differs; ADR 0009 allows one visibility per subcommand.

## Decision

- One new top-level `/song` command, still a guest command (no registration or TOS acceptance), with two subcommands:

  | Current command | New subcommand | Visibility |
  |---|---|---|
  | `/song-info` | `/song info` | public |
  | `/download-asset` | `/song assets` | ephemeral |

- Each subcommand keeps its old command's options, output, visibility and behavior. Song-search autocomplete keeps working on both.
- The `Query.txt` builder moves onto the new `/song` command, where both subcommands share it.
- Hard cut: `/song-info` and `/download-asset` are removed in the same release that adds `/song`, with an owner announcement. Old and new names never ship together.
- One release for this ADR and [ADR 0010](0010-ScoresCommand.md), with one announcement, combined with command-unification round 1.
- Localization: every key owned by a single merged command is re-keyed, messages included, into a new key class for `/song`; shared keys keep their names. Translations are carried over by the owner.
- The hard-coded English reply messages of both commands become localized in this round: the match-count line of `info`, the match-count line of `assets`, and the too-large-files message of `assets`.
- The `Query.txt` labels (`Id`, `Name`, `Alias`, `Chart Constant`, `Composer`, `Illustrator`, `Charters`, `Other matches`) stay English and are not localized. Reason (owner): localizing them would add several trivial keys that are painful to maintain in the translations repository, which is not worth the effort.

## Rejected alternatives

- Leaving `/song-info` and `/download-asset` unmerged. The survey rated the merge low value on its own; the owner chose it because it ships cheaply alongside the other renames in this release and makes lookup commands consistent.
- Localizing the `Query.txt` labels (not worth the key churn, see above).
- Making `/song` require registration like save commands (both are guest commands today; no reason to change).

## Consequences

- Hard cut: users and any saved shortcuts or guides using the old names stop working at release.
- Integrations (Discord command permissions) set on the old command names must be redone by server admins for the new names.
- `/command-statistics` rows start fresh under the new command name; history for the old names is not migrated.
- Existing translations of the moved keys must be carried over by the owner ([ADR 0017](0017-TranslationPlatform.md)); the three newly localized messages need new translations.

## Open questions

- English help in the translations repository (an owner task, as with ADR 0007).
