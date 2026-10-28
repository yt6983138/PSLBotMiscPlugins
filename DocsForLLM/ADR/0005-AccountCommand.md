# ADR 0005: `/account` command and `LocalCommand` restructure

- **Status:** Implemented (NOT TESTED) until the owner's Discord smoke test passes. Implementation steps were in the working plan `DocsForLLM/Notes/AccountCommandRefactorPlan.md` (local, gitignored).
- **Recorded:** 2026-10-27.
- **Source:** Owner decisions in the `/account` planning session on 2026-10-27.
- **Related:** [ADR 0002](0002-LocalScoreSystem.md) (account modes, local collection), [ADR 0003](0003-ChinaSaveTransfer.md) (QR login reuse), [ADR 0006](0006-SettingsCommand.md) (the sibling `/settings` command).

This record does not authorize deployment, live data changes, or running the bot. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md): build only, never run any project.

## Context

Account lifecycle behavior was spread over separate top-level commands and one subcommand family:

- `/login` (TapTap QR login) and `/link-token` (token login) both register or re-bind a cloud account and always switch it to cloud mode through `SaveService.ActivateCloudAsync`. They differed in validation, error handling, and reply order (`/login` validated with a player-info fetch whose errors went to the global handler and replied after activation; `/link-token` fetched a full save with inline error replies and replied before activating).
- `/local start` and `/local use-cloud` switched modes inside `/local`. `LocalCommand` used `GuestCommandBase` only so that `start` could run for unregistered users.
- `/logout` deleted the account; it asked for confirmation only when a local collection existed.
- `/get-token` showed the cloud token.
- A cloud-mode user who never activated local mode had no local collection row, so every import replied "local save missing" (known limitation in ADR 0002).

The owner wanted clearer command names, one place for account lifecycle, and `LocalCommand` to inherit the normal `CommandBase` (registration and TOS checks) like other registered-only commands.

## Decision

### Command split

- `/account` handles the account lifecycle: register, switch mode, delete, status.
- `/settings` (ADR 0006, deferred) handles cosmetic preferences. Those commands are not touched by this decision.
- `/local` keeps score editing, profile editing, and imports, and no longer has `start` or `use-cloud`.
- `/tos` stays a separate command (it must run before registration and TOS acceptance). Admin commands (for example `/get-token-for`) are unchanged.

### Command surface

`AccountCommand` is a Core `[AddToGlobal]` command deriving from `GuestCommandBase`, with `RequireTOSAcceptance => true` for every subcommand (including `delete`) and `RunOnDifferentThread => true` for the whole command (QR polling takes minutes). Replies stay ephemeral. Default English names are exactly `account`, `register`, `qrcode`, `token`, `local`, `switch`, `cloud`, `delete`, `status`.

| Slash path | Replaces | Who can run it |
|---|---|---|
| `/account register qrcode` | `/login` | anyone who agreed to the TOS |
| `/account register token` | `/link-token` | anyone who agreed to the TOS |
| `/account register local` | `/local start` (new users) | unregistered only |
| `/account switch cloud` | `/local use-cloud` | registered |
| `/account switch local` | `/local start` (existing users) | registered |
| `/account delete` | `/logout` | registered |
| `/account status` | `/get-token` (and more) | registered |

The old commands are **removed outright**, with no aliases: `/login`, `/link-token`, `/logout`, `/get-token`, `/local start`, `/local use-cloud`. Discord's global command list is replaced at bot startup (`CommandResolveService` bulk overwrite), so removed commands disappear without a manual step.

### Subcommand behavior

"Registered" means a `UserData` row exists (the guest base passes `UserData? data`).

- **register qrcode** (required `is_international` option):
  1. Request a TapTap QR code for the chosen endpoint; poll until 15 seconds before it expires.
  2. Reply with the QR login message.
  3. On timeout, reply with the timed-out message and stop.
  4. Build `UserData` with the token and the current TOS level, validate it by fetching player info (errors go to the global handler, as before).
  5. `SaveService.ActivateCloudAsync`.
  6. Reply "overwritten" if the caller was already registered, otherwise "success".
- **register token** (`token` string of exactly 25 characters, required `is_international`):
  1. Reject a semantically invalid token with an inline reply.
  2. Validate by fetching the cloud save through `SaveService.TryHandleCloudAsync` (which replies on error; the temporary binding does not raise the cloud-fetched hook).
  3. `SaveService.ActivateCloudAsync`.
  4. Reply "overwritten" if already registered, otherwise "success". The reply now comes **after** activation (previously before).
- Both register-cloud paths always switch the account to cloud mode (ADR 0002 switching decision). An existing local collection is kept as dormant data. Already-registered users may re-run them (to replace an expired token, or to add a binding to a local-only account) and get the "overwritten" reply.
- **register local:** if the caller is already registered, reply "already registered" and point to `/account switch local`; nothing changes. Otherwise `SaveService.StartLocalAsync` (registers the user, activates local mode, creates the empty collection) and reply that local mode is active.
- **switch local:** unregistered → the standard not-registered reply. Already local → "already local" reply, nothing changes. Otherwise `StartLocalAsync` (creates an empty collection if none exists) and reply that local mode is active.
- **switch cloud:** unregistered → not-registered reply. Already cloud → "already cloud". No retained cloud binding → "no binding" reply pointing to the register subcommands. Otherwise `SaveService.UseCloudAsync` and reply success. No verification fetch (ADR 0002).
- **Initial local nickname** (used whenever a collection is created): the guild display name when in a guild, otherwise the global name, otherwise the username.
- **delete:** unregistered → not-registered reply. Otherwise it **always** replies with a generic warning and one danger "Confirm" button; nothing is deleted yet. The confirm handler (`HandleInteraction` on `AccountCommand`) re-checks that the user row still exists and that the TOS is agreed (stored level or temporary agreement), then calls `SaveService.DeleteAccountAsync` and replies success with the button removed. There is no local-row re-check and no "state changed" reply. Default warning text: "Warning: this permanently deletes your account, including your settings, your leaderboard entry, and any local save data (including dormant local data). Press Confirm to continue." This keeps ADR 0002's rule that the deletion consequence is disclosed before execution, and that `/logout` removes dormant local data.
- **status:** unregistered → not-registered reply. Otherwise one reply showing: the active mode (cloud or local), whether a cloud binding exists, its region, the token (always shown when present, first 5 characters visible and the rest in a spoiler), and whether a local collection is stored. Public visibility is not shown (it belongs to `/settings view`, ADR 0006). The template must tolerate a missing token.

### `LocalCommand` after the change

- Inherits `CommandBase`: registration and TOS are checked by the base; unregistered users receive the standard not-registered reply. Handlers receive a non-null `UserData`.
- Edit commands (`score set/remove`, `profile`, `challenge`, `currency`) keep requiring local mode (wrong-account-mode reply otherwise). Imports (`csv`, `android`, `cloud`) require only registration; cloud import additionally requires a cloud binding. This access split from ADR 0002 is unchanged.
- `GetRegisteredUserOrReplyAsync(IDiscordInteraction, UserData?)` and `HandleLocalImportAsync(IDiscordInteraction, UserData?, ParsedLocalImport, LocalImportMode)` stay **public with unchanged signatures**. `/local-import-archive` in `SaveArchiveProgram` obtains the keyed `LocalCommand` singleton and calls them; a mismatch fails only at runtime, so they must not be renamed or removed in this work.
- Components (score select `0x01`, import Proceed `0x02`) stay on `LocalCommand` because component routing is bound to the concrete command type (ADR 0004).

### Local collection created on first import (resolves the ADR 0002 known limitation)

- New `SaveService.EnsureLocalSaveAsync(userId, initialNickname)`: in one transaction, creates the default empty local collection only if none exists. It does not change the account mode, does not create a user row, and does not raise the cloud-ranking invalidation event.
- `LocalCommand.HandleLocalImportAsync` calls it after the registration check and before reading the local save. This covers CSV, Android, cloud, and `/local-import-archive` imports.
- The creation happens at the **start** of the import. Accepted consequence: if the user cancels or lets the preview expire, an empty collection remains. It is harmless: `/account delete` removes it and `/account switch local` would have created it anyway.
- The existing "local save missing" reply remains for the race where the collection is deleted during an import.

### Localization

- New key class `PSLAccountCommandKey` (namespace `PSLDiscordBot.Core.Command.Global.Account.`). Key names start with `Account` because localization defaults are imported into one scope and names must be unique across key classes.
- Moved keys are **re-keyed**, not aliased; keys of removed commands are deleted. The owner accepted the re-translation cost for all languages. The owner deploys the new key set; agents do not edit live localization data.
- The `is_international` option keys (`PSLGuestCommandKey.LoginOptionIsInternationalName/Description`, used by `OptionUtils`) are **not moved**. They are removed with the international-save discontinuation work after this refactor.
- The QR login message template is carried over unchanged, including the known `{BeginUrl}` versus `QRCodeDataModel.Url` mismatch (an owner-deferred item, not part of this decision).

Required key list:

| Key | Origin |
|---|---|
| `AccountName`, `AccountDescription` | new |
| `AccountRegisterGroupName/Description` | new |
| `AccountRegisterQrCodeName/Description` | `LoginName/Description` |
| `AccountRegisterTokenName/Description` | `LinkTokenName/Description` |
| `AccountRegisterTokenOptionTokenName/Description` | `LinkTokenOptionToken*` |
| `AccountRegisterLocalName/Description` | `LocalSubCommandStart*` |
| `AccountSwitchGroupName/Description` | new |
| `AccountSwitchCloudName/Description` | `LocalSubCommandUseCloud*` |
| `AccountSwitchLocalName/Description` | new |
| `AccountDeleteName/Description` | `LogoutName/Description` |
| `AccountStatusName/Description` | `GetTokenName/Description` |
| `AccountRegisterQrCodeBegin` | `LoginBegin` |
| `AccountRegisterQrCodeTimedOut` | `LoginTimedOut` |
| `AccountRegisterTokenInvalid` | `LinkTokenInvalidToken` |
| `AccountRegisterCloudSuccess` | `LoginComplete` + `LinkTokenSuccess` (merged) |
| `AccountRegisterCloudOverwritten` | `LinkTokenSuccessButOverwritten` |
| `AccountRegisterLocalAlreadyRegistered` | new |
| `AccountLocalModeActive` | `LocalStartSuccess` (shared by register local and switch local) |
| `AccountSwitchLocalAlreadyLocal` | new |
| `AccountSwitchCloudSuccess/AlreadyCloud/NoBinding` | `LocalUseCloud*` |
| `AccountDeleteWarning`, `AccountDeleteConfirmButton`, `AccountDeleteSuccess` | `LogoutLocalDataWarning`, `LogoutConfirmButton`, `LogoutSuccessful` |
| `AccountStatusReply` | `GetTokenReply` |
| removed, no replacement | `LogoutStateChanged`, `GetTokenNoCloudBinding` |

Existing default texts that name old commands are reworded to the new names: `CommandBaseNotRegistered`, `TOSAgreed`, `LocalImportCloudNoBinding`, plus the plain-string `/link-token` hint in `TransferToChinaCommand`.

### Shared code that moves

`LoginCommand`'s public `QRCodeDataModel`, `CallbackLoginModel`, and static `ListenQrCodeChange` move to `AccountCommand` unchanged. `/transfer-to-china` (ADR 0003) uses the QR model, the polling helper, and the QR message key, and is updated to the new names. `ListenQrCodeChange` still only returns a token (or null at the deadline) and does not persist a binding.

### Documentation scope

- English `help.md` and `usage.md` in `PSLDiscordBotBase/Documentation/` are updated.
- Non-English help files (`help_fr`, `help_vi`, `help_zh-CN`, `help_zh-TW`) are left to the localizers/owner.

## Consequences

- Users must learn the new command names; the owner announces the rename (agents may draft it, the owner publishes). Deploy only after all code and default-text changes are in place, so users never see text pointing at removed commands.
- Localization data must be redeployed with the new key set; translators for all languages must re-translate moved strings.
- `/command-statistics` (AdminHelper) keeps rows for the old command names; they are not migrated.
- The ADR 0002 text naming `/login`, `/link-token`, `/logout`, `/local start`, and `/local use-cloud` is superseded by this record. The behavior in ADR 0002 that is not named here (mode retention, one active mode, retained dormant data, logout deleting local data) is unchanged.
- ADR 0003's suggestion to re-link manually after a transfer now refers to `/account register token`.
- Leaderboard handling is unchanged. Local-mode users never appear on the leaderboard, so `ActivateCloudAsync` does not need to invalidate a leaderboard entry (owner-confirmed).
- `/local-import-archive` keeps working through the unchanged public `LocalCommand` members.

## Out of scope

- `/settings` and the commands that move there (ADR 0006).
- Moving import orchestration out of `LocalCommand` into a service, which would remove the keyed-singleton cast in `/local-import-archive` (owner: later; may involve the database or save service).
- Removing `is_international` and the international paths after the 2026-10-31 discontinuation.
- Fixing the QR message `{BeginUrl}` mismatch.
- Translating non-English help documents.
- Any deployment, localization-data update, or Discord smoke test (owner-run).

## Open questions

- None blocking. Owner smoke test of every `/account` subcommand, `/local` subcommands, `/local-import-archive`, and the `/transfer-to-china` QR login is pending after implementation.
