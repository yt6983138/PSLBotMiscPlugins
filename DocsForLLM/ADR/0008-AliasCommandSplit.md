# ADR 0008: Alias commands split by audience

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355708)
- **Recorded:** 2026-10-30.
- **Source:** Owner decisions in the command-unification grill-me session on 2026-10-30.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Five Core alias commands exist:

| Command | Base / context | In-bot check |
|---|---|---|
| `alias-modify-global` (localized) | `CommandBase`, any context | registered user |
| `alias-modify-server` (localized) | `CommandBase`, guild-only | registered user |
| `alias-table-info` (English) | `AliasServerAdminCommandBase`, guild-only | alias admin role, Discord `Administrator`, or bot admin (pre-dispatch in `Execute`) |
| `alias-audit` (English) | `AliasServerAdminCommandBase`, guild-only | same |
| `alias-change-admin` (English) | `CommandBase`, guild-only | Discord `Administrator` or bot admin (in callback) |

Discord server permission overrides (Server Settings → Integrations), `default_member_permissions`, and interaction context/integration types apply per top-level command, not per subcommand. Merging all alias operations into one command would stop servers from hiding admin operations from members while allowing edits. The owner therefore wants global and server operations, and member and admin operations, to stay separate top-level commands.

All five commands use the default (ephemeral) visibility, so merging within each audience does not depend on per-subcommand ephemerality ([ADR 0009](0009-SubcommandAndEphemeralHandling.md)).

## Decision

- Replace the five commands with three top-level commands, one per audience:

  | New command | Replaces | Shape |
  |---|---|---|
  | `/alias-global add\|remove` | `alias-modify-global` | `operation` option becomes subcommands |
  | `/alias-server add\|remove` | `alias-modify-server` | `operation` option becomes subcommands; guild-only |
  | `/alias-server-admin info\|audit\|admin-role` | `alias-table-info`, `alias-audit`, `alias-change-admin` | guild-only; `admin-role` keeps its `operation` (add/remove) and `target` role options |

- `/alias-server-admin` derives from `AliasServerAdminCommandBase` and keeps its pre-dispatch check. `admin-role` keeps its stricter in-callback check (Discord `Administrator` or bot admin), which is a subset of the base check, so no user's access changes. In-bot checks stay even though servers may also restrict commands through Discord.
- The server-admin commands stay hard-coded English; localizing them is out of scope.
- Hard cut: old commands are removed in the same release that adds the new ones, together with the `/photo` change ([ADR 0007](0007-PhotoCommand.md)) under one owner announcement.

## Open questions (resolve when planning the refactor)

- Localization re-keying for the global/server member commands (`AliasModifyGlobal*`, `AliasModifyServer*` or equivalent keys).
- Docs to update: `PSLDiscordBotBase/Documentation/usage.md` / `help.md` (English).

## Consequences

- Server administrators who customized Integrations permissions for the old commands must reconfigure them for the new names; the announcement should mention this.
- `/command-statistics` rows start fresh under the new names.
- Until this ADR is implemented, the existing alias commands stay as they are.
