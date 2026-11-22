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

`/settings` was split off from the `/account` work so that the two commands could be scoped and planned separately.

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
- Subcommand names (owner, 2026-11-22): `visibility`, `precision`, `show-count`, `view`.
- Memorable score (owner, 2026-11-22): a subcommand group, `/settings memorable-score set` and `/settings memorable-score clear`.
- Base class (owner, 2026-11-22): `CommandBase` with its default constraints (registered, TOS); all subcommands ephemeral.
- `/settings view` rendering (owner, 2026-11-22): unset values show the effective value marked as the default (for example `30 (default)`); an unset memorable score shows "not set". The show count and precision cannot be told apart from an explicit default value, so an explicitly stored default also shows `(default)`.
- Localization (owner, 2026-11-22): every key owned by a single merged command is re-keyed, messages included, into a new key class for `/settings`; keys shared with other commands keep their names. Translations are carried over by the owner.

## Open questions (resolve when planning the refactor)

- Docs to update: `PSLDiscordBotBase/Documentation/usage.md`. Help files (`help.md`, `help_*.md`) are no longer in `PSLDiscordBotBase/Documentation/`: [ADR 0017](0017-TranslationPlatform.md) moved them to the translations repository (this ADR's earlier plan to update them under `PSLDiscordBotBase/Documentation/` is superseded in part by ADR 0017), so English help updates are owner tasks there; non-English help is left to localizers, as with ADR 0005.

## Consequences

- After both refactors, users manage accounts through `/account` and preferences through `/settings`. Removing the old commands requires localization re-keying and an owner announcement.
- Until this ADR is implemented, the existing `/set-*` and `/clear-memorable-score` commands stay as they are.

## Revisions

- 2026-11-15: addendum of 2026-11-14 folded into the body; pre-fold text at `ab9d55e`. Owner decision: the schedule-based reason for deferring `/settings` was replaced by the lasting reason (split from `/account` for separate scoping).
- 2026-11-22: resolved open questions recorded in Decision (owner answers from the command-unification planning session). The open questions on names, memorable-score shape, base class, view rendering and key re-keying were resolved by the owner and moved into the Decision.
