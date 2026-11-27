# Local scores

Current behaviour of the local (user-submitted) score collection. Accepted decisions are in [ADR 0002](../ADR/0002-LocalScoreSystem.md); command structure is in [ADR 0005](../ADR/0005-AccountCommand.md). Symbols below are in Core (`PSLDiscordBotBase/PSLDiscordBot.Core`) unless stated otherwise.

## Storage and models

- `LocalSaveData` holds a user's collection as one combined SQLite BLOB; it implements both `ISave` and `ISaveContext` (index 0 is the collection itself; any other index throws) and wraps native named entries. `GameKey` and the native `settings` entry are not stored: their read methods return defaults and their write methods do nothing.
- `ReadSummary()` returns the stored `$summary` entry or `Summary.Default`. `SaveSummary` has no callers: imports and score edits do not recalculate it, and nothing meaningful depends on it.
- `SaveService.GetSaveAsync(userData, index, requireCurrent)` (`requireCurrent` defaults to true) returns the active source as `(ISaveContext, ISave)` and throws on failure; the explicit cloud/local `Try...` loaders require both the source and its active mode. Local mode ignores the save index.
- `IsLocal` on `UserData` is the `AccountMode.Local` bit; `IsInternational` is `[NotMapped]`. The code calls only `EnsureCreated`, so existing databases need manual schema changes (`AccountMode` column with backfill for international users, nullable `Token`, `LocalSaves` table). No migration code exists.

## Score edit validation

- `LocalCommand.Scores.cs` bounds score to 0–1,000,000 and accuracy to 0–100 in the slash options, and rejects a 1,000,000 score with accuracy below 100 or FC unset (and the reverse, per the `LocalScore*` invalid keys).
- `LocalImportService` rejects a 1,000,000 score whose status is not Phi, and out-of-range scores.
- Currency units KiB–PiB are each bounded 0–1023 in the slash options.

## Imports

- `LocalCommand.HandleLocalImportAsync(interaction, userData, ParsedLocalImport, LocalImportMode)` is public; `/local-import-archive` calls it. `LocalImportMode` is the Core enum for the four import modes.
- Imports require registration only (`GetRegisteredUserOrReplyAsync`); cloud import also needs a cloud binding (`LocalImportCloudNoBinding`). Manual score and profile edits require local mode.
- Cloud import uses a dedicated source-read path with the retained binding; it does not raise the cloud-fetched hook and has no save-index option.
- Duplicated chart keys are all rejected and reported. Rejected keys still count as present in the source when computing missing-in-import, so the local chart is retained. Warned rows are accepted; the report shows rejected plus warned as an issue count. CSV rows with an unknown status are kept as not full combo with a warning.
- Native non-score models supplied by the source overwrite regardless of mode; absent models are retained.
- CSV uses the export headers `ID`, `Name`, `Difficulty`, `Chart Constant`, `Score`, `Acc`, `Rks Given`, `Stat`; only the ID-based columns determine records.
- Attachment imports (CSV, Android) are limited to 5 MiB (`ImportFileMaxBytes`) with a 30 s download timeout (`ImportTimeout`). The Android PlayerPrefs XML parser is complete.
- A player-info fetch failure during cloud import, and a missing user or local row at Proceed, throw and reach the global exception handler.
- The empty local collection row is created at import start; a cancelled or expired preview leaves it empty.

## Staged imports and workflow state

- `LocalWorkflowStore<TPayload>` is process-local, with a fixed `LifeTime` of 15 minutes. Staged imports (`StagedLocalImport`) and score-select drafts (`LocalScoreDraft`) use it.
- `LocalCommand` routes its components on the first payload byte (score-select menu, import Proceed); the account delete-confirm button uses `DeleteConfirmComponentKind` in `AccountCommand`, whose `HandleInteraction` re-reads the user record and TOS agreement before calling `DeleteAccountAsync`. See the payload constants in those commands.
- Proceed takes the entry atomically and owner-bound, rechecks only that the user record exists, and commits the staged snapshot without reloading or re-merging. Score-select re-reads the current collection at selection time, without a local-mode check.
- An import applies directly only without conflict or rejection; any chart overlap, rejected/skipped input, removed chart, or changed non-score data prompts.
- Score search: zero matches reply no-match; more than 25 ask for a narrower search; one applies directly; 2–25 open an owner-bound select menu.

## Server archive import (root `SaveArchiveProgram` plugin)

- `/local-import-archive` is a separate ephemeral top-level command taking a `LocalImportMode`. It checks registration and an archived save, asks Proceed/Cancel, then `LocalSaveArchiveProvider.ReadLatestAsync` reads the newest readable `ArchivedInfo_*.json` archive (newer unreadable ones are skipped), uses its first save, and calls `HandleLocalImportAsync`. `MaxArchiveBytes` is 16 MiB. `TransferToChinaCommand` instead takes the newest-timestamp archive without a readability check; see [ChinaSaveTransfer.md](ChinaSaveTransfer.md).
- The provider is a static plugin helper; there is no Core provider interface. Import-mode choices reuse the Core enum, while plugin text uses plain strings instead of Core localization keys.

## Leaderboard

- Local users are ranked from their local save under the same visibility and TOS rules as cloud users (ADR 0002 addendum of 2026-11-25). An entry records its `LeaderboardEntry.AccountMode`, and the local marker is derived from its `AccountMode.Local` bit; there is no separate local flag on the analyzed data.
- One eligibility rule, `UserData.CanEnterLeaderboard` (an `[Expressive]` method, so EF Core translates it in queries), is used by `GetEntries` (every read), the save-fetched hook and `RefreshCache`. A user qualifies when they are publicly visible, have agreed to the current TOS level, and are either in local mode or in cloud mode and not international (the international cloud is gone, so those users would only fail every refresh). It tests the `AccountMode` column with `HasFlag` because the convenience properties are not mapped. Users below the current TOS level are therefore hidden at once on reads.
- The write paths are the save-fetched hook and `RefreshCache`; both check the rule in the database.
  - Hook: local reads raise it too. It applies the same eligibility rule (so international cloud users are excluded) and also ranks only from the user's active source: a local user needs a `LocalSaveData` fetch, a cloud user needs a cloud fetch; a mismatch is skipped. It skips non-caller saves and non-zero indexes.
  - `RefreshCache` selects the users who meet the rule. Local users are analyzed from the local store with no `LeaderboardRefreshEachIntervalMilliseconds` delay (no network); cloud users keep the delay and the download.
  - Local edits and imports do not trigger a refresh. The entry updates on the next read of the active source or the next bulk refresh.
- `LeaderboardCommand.PrepareLeaderboardEntries` calls `SaveService.GetSaveAsync(data)` (the active source) and then `LeaderboardService.TryAnalyzeUser(ISave, userId, accountMode, …)` live when the caller is not in the filtered list, and only adds the result to its in-memory list (nothing is written). That `TryAnalyzeUser` overload trusts its caller to pass a save matching `accountMode` (the `(userId, token, account)` overload and `GetSaveAsync` pick the source by mode). It does not check visibility or TOS. If it returns nothing, the command replies with the failed-to-analyze message.
- Mode switches (`StartLocalAsync`, `UseCloudAsync`, `ActivateCloudAsync`) keep the entry, including its old `AccountMode`, until the next refresh; the marker then shows the source the data came from. Only account deletion removes it, through `SaveService.OnLeaderboardEntryInvalidated`, handled by `LeaderboardService` under its lock after commit.
- The leaderboard table is a disposable cache with no migration code: the `LeaderboardEntry` schema changed to store `AccountMode` (replacing `IsInternational`), and the `LeaderboardAnalyzedData` MemoryPack blob has no layout compatibility. After either changes, clear the table at deploy and let the bulk refresh rebuild it; unreadable rows make leaderboard reads fail.
- Cloud-only commands such as `/cloud time-index` reply with the wrong-account-mode message in local mode.
