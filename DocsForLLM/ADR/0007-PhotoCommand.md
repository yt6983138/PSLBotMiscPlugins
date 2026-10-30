# ADR 0007: `/photo` command for image-rendering commands

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355699)
- **Recorded:** 2026-10-30.
- **Source:** Owner decisions in the command-unification grill-me session on 2026-10-30.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Three Core commands render score images from the user's save: `/get-photo` (best-scores image), `/about-me` (profile card), and `/song-scores` (per-song scores). Each duplicates the same pipeline: `CommandBase`, `IsEphemeral => false`, the `index` option, `generate_for` resolution with the `PublicVisibility` check and `GenerateForNoPermission` reply, `TryHandleAndFetchAsync` + `GetPlayerInfoAsync`, `CreateMaps` → `RedactSensitiveInfo` → `MakePhoto`, and the `ImageGenerated`/`ImageGeneratedForOther` reply. All three are public (non-ephemeral), so they share every per-top-level-command property Discord and the framework impose.

`/about-me` already contains a complete generate-for-others path (redaction, `GeneratingForOther` template flag) but its `generate_for` option is commented out in the builder. The owner disabled it only because the name "about me" did not make sense for others; the owner previously exercised the path, and rendering does not depend on the redacted map values.

## Decision

- Create one top-level `/photo` command in Core (`CommandBase`, non-ephemeral, `RunOnDifferentThread => true`) with three subcommands:

  | Current command | New subcommand |
  |---|---|
  | `/get-photo` | `/photo best` |
  | `/about-me` | `/photo profile` |
  | `/song-scores` | `/photo song` |

- `index` and `generate_for` are available on all three subcommands, with the existing `PublicVisibility` gate. `/photo profile` for another user is enabled and shows that user's memorable score and thoughts (redaction as today). The rendering path is considered verified by the owner.
- Subcommand-specific behavior is preserved, not shared:
  - `best` only: count, lower-bound, grades, difficulties, and CC filter options; the PNG threshold with the large-upload check; the large-image cooldown.
  - `song` only: the `Query.txt` attachment built with `GetScoresCommand.ScoresFormatter`.
- Hard cut: `/get-photo`, `/about-me`, and `/song-scores` are removed in the same release that adds `/photo`, with an owner announcement. This release is the same one as the alias split ([ADR 0008](0008-AliasCommandSplit.md)).

## Open questions (resolve when planning the refactor)

- Localization key class/namespace and re-keying of the existing `GetPhoto*`, `AboutMe*`, `SongScores*` keys in `PSLNormalCommandKey`.
- Code structure (single class with subcommand dispatch vs. shared helper used by per-subcommand handlers), following existing grouped commands such as `/account`.
- Docs to update: `PSLDiscordBotBase/Documentation/usage.md` / `help.md` (English); non-English help is left to localizers, as with ADR 0005.

## Consequences

- `/command-statistics` rows start fresh under the new command name; history for the old names is not migrated.
- [ADR 0006](0006-SettingsCommand.md)'s show-count setting (`MiscInfo.DefaultGetPhotoShowCount`) now refers to `/photo best`; user-facing text should say so. The stored field name may stay.
- Until this ADR is implemented, the three existing commands stay as they are.
