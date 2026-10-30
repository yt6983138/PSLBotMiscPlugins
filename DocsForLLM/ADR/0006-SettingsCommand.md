# ADR 0006: `/settings` command for cosmetic per-user preferences

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355685)
- **Recorded:** 2026-10-27.
- **Source:** Owner decisions in the `/account` planning session on 2026-10-27.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Account-related slash commands are being consolidated. [ADR 0005](0005-AccountCommand.md) moves the account lifecycle (register, switch mode, delete, status) into `/account`. During that planning, the owner found several more per-user preference commands. Instead of putting them into `/account`, the owner chose to split responsibilities between two commands so that each command's purpose and code stay clear:

- `/account`: account lifecycle (login/register, mode switching, deletion, status).
- `/settings`: cosmetic per-user preferences.

The `/settings` work is deferred so that too much is not stacked before the 2026-10-31 deadline.

## Decision

- Create one new `/settings` command family in Core.
- These existing commands move into `/settings` and are then removed:

  | Current command | Stored field | Notes |
  |---|---|---|
  | `/set-public-visibility` | `UserData.PublicVisibility` | Setting it to false also removes the user's leaderboard entry; keep that side effect. |
  | `/set-precision` | `UserData.ShowFormat` | Option bounds 1–100 today. |
  | `/set-show-count-default` | `MiscInfo.DefaultGetPhotoShowCount` | |
  | `/set-memorable-score` | `MiscInfo.MemorableScore`, `Thoughts` | |
  | `/clear-memorable-score` | clears the same fields | |

- Shape: **one subcommand per setting**, keeping today's options and bounds.
- Add a **`/settings view`** subcommand that shows the current values of all settings. `/account status` (ADR 0005) does not show settings, including public visibility.
- `/tos` is not moved: it must run before registration and before TOS acceptance.
- Admin commands (`/get-token-for`, etc.) are not moved.

## Open questions (resolve when planning the refactor)

- Subcommand names (e.g. `visibility`, `precision`, `show-count`) and how memorable-score set and clear fit "one subcommand per setting" (separate subcommands, a subcommand group, or an optional clear flag).
- Base class (`CommandBase` is the expected fit: every subcommand needs a registered user) and the TOS requirement.
- Localization key class/namespace and the re-keying of the existing `SetPublicVisibility*`, `SetPrecision*`, `SetShowCountDefault*`, `SetMemorableScore*`, `ClearMemorableScore*` keys in `PSLNormalCommandKey`.
- What `/settings view` shows for unset values (defaults vs "not set").
- Docs to update: `PSLDiscordBotBase/Documentation/usage.md` / `help.md` (English); non-English help is left to localizers, as with ADR 0005.

## Consequences

- After both refactors, users manage accounts through `/account` and preferences through `/settings`. Removing the old commands requires localization re-keying and an owner announcement.
- Until this ADR is implemented, the existing `/set-*` and `/clear-memorable-score` commands stay as they are.
