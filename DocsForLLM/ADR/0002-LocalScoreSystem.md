# ADR 0002: Local user-submitted score system

- **Status:** Accepted
- **Tracking:** none
- **Frozen:** 2026-11-15
- **Recorded:** 2026-10-23.
- **Source:** Owner decisions in the local-score planning discussions on 2026-10-23 and 2026-10-24, including the C#/Discord interface design.

This record does not authorize deployment or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md). Shutdown-response priorities remain as recorded in [ADR 0001](0001-InternationalCloudSaveResponse.md). Current behaviour and limits are in [LocalScores.md](../LocalScores.md).

## Context

The announced roadmap includes user-submittable local-save storage for non-cloud-save users. Expected inputs include archived saves, cloud-save files, spreadsheets/Excel/CSV, and device-local save files. These expectations do not establish feature delivery dates.

The owner expects almost every access to deserialize the complete collection; SQL filtering inside packed scores is not needed for the current workflow.

After comparing combined and sectioned SQLite payloads, the owner chose a single combined BLOB because sectioned storage requires too much implementation effort for this workflow.

## Decision

### Collection and account requirements

- Keep one current score record per **`(song ID, difficulty)`**. Users can add, replace, and remove records. Store all current chart records; derive best lists and RKS from them.
- Keep current records only. Previous versions of edited/deleted records and individual-play history are not required.
- Include scores and a display profile. Reuse existing cloud-save models for compatibility; unavailable fields may have suitable null/default values.
- Editable profile fields are nickname, intro, avatar ID, background ID, challenge rank, and currency. Missing data uses ordinary displayed defaults; separate availability tracking is not selected. Supported imported native entries are retained even when their fields are not manually editable; GameKey and GameSettings are explicitly excluded below.
- Each user has **one active account type: cloud or local**. Keeping both sources selectable is not the requested model.
- Switching from local to cloud through `/account register qrcode` or `/account register token` (formerly `/login` / `/link-token`, see [ADR 0005](0005-AccountCommand.md)) retains the local collection as dormant data. Cloud becomes the active source; returning to local resumes that collection. Local-collection deletion is a separate explicit operation.
- Switching from cloud to local retains the inactive cloud token and region, allowing a later switch back if the binding still works. Existing ordinary score commands use the active mode. Edit commands use the explicit local loader, which requires local mode, so dormant collections are not edited directly.
- Local onboarding uses a start-then-import flow: `/account register local` (new users) or `/account switch local` (existing users) creates an empty collection or resumes an existing one and activates local mode (formerly `/local start`, see [ADR 0005](0005-AccountCommand.md)). Import is a separate operation.
- Mode switches preserve existing bot preferences, including visibility, numeric formatting, and default image count, and preserve the recorded consent level subject to normal current-TOS checks.
- Switching to a retained cloud binding is immediate, without a verification fetch. Missing bindings must still be reported rather than creating a cloud account implicitly.
- `/account delete` (formerly `/logout`, see [ADR 0005](0005-AccountCommand.md)) also deletes the stored local collection, including dormant data, alongside existing registration/preferences/leaderboard removal. The deletion consequence must be clear before execution; it always asks for confirmation with a generic warning. Retention across mode switches does not imply retention across logout.
- Bulk imports require an explicit mode: upsert, fill missing, replace all, or keep better. The detailed rules are recorded below.
- **Discord commands are the initial interface.** The design covers the C# data/service contracts and Discord workflows together, including existing-command integration. Public HTTP API design is outside the selected scope.
- Leaderboard participation remains undecided while the owner's user poll is running.

### Storage direction

- Use **SQLite with a native binary wrapper** for persistent local collections. On 2026-10-24 the owner explicitly superseded the earlier MemoryPack payload requirement: store the output of a wrapper implementing `IPhigrosCustomSerialization<T>` directly in the BLOB.
- Store editable local-collection payloads in **SQLite**, not the filesystem.
- Design for complete-payload reads; SQL filtering within packed scores is not required.
- Store each local user's complete serialized save payload in **one combined BLOB**, with database metadata outside the payload. The single-versus-sectioned layout decision remains accepted after the serializer change.
- The wrapper preserves named/versioned native entry bytes and uses the library's model serializers to replace edited entries. Unedited imported entries remain intact; each database save still writes the combined payload.
- Local storage excludes `gameKey` and the native `settings` entry (GameSettings). Their shared-interface read methods return default models and their write methods intentionally do nothing. Imports discard these entries. This narrows the earlier general entry-preservation decision.
- Load and deserialize local data per operation; do not introduce a shared mutable local-save cache. Short-lived interaction drafts are separate from read caching.
- Track the collection as local, without per-chart provenance or last-import provenance metadata.

### Shared library abstraction

- Propose a public read/write method abstraction in PhigrosLibraryCSharp so cloud and local representations support the same model read/write route. Player metadata and timestamps also belong in this abstraction.
- The accepted behavior and persistence boundary are recorded here; exact signatures live in code.
- Cover all existing model sections, including GameKey and Summary. Read methods return independent models; callers must explicitly save edited models back to update native entries. Subsequent changes to the returned model require another save.
- For local data, creation/modification timestamps describe the local collection: initial creation and last successful persisted content change. Imported source dates may remain in retained source metadata.
- Saves are loaded through a new dedicated save service with three routes: explicit cloud, explicit local, and a generic route that follows the active mode. The initial proposal's generic method was superseded by this refinement. The explicit routes always require both the corresponding source and its active mode and report failure to the caller; the generic route throws on failure. Only the generic route can relax the current-source requirement: the current source wins if present, otherwise the other source may be used, and loading errors never trigger fallback. Bot modifications use the explicit local route.
- The same service supplies Discord reply adapters for all three routes, sharing error handling. Adapters return null for handled failures and optionally rethrow unexpected exceptions, following the existing save-handler pattern. Cancellation-token design is deferred by the owner.
- Local mode ignores the existing save-index option.

### Local write-back contract

- Callers modify the loaded concrete local object through model read/write methods, then commit the whole save. The local object exposes a database-save method; its exact signature and binding to the persistence service remain to be specified.
- Persistence may create or replace a local collection (upsert). **Last write wins**; concurrent edits can overwrite each other's complete payloads. Revision-checked rejection and operation-wide locking were not selected.
- Authoritative input validation belongs to commands and importers. The database commit path accepts caller-supplied data without an additional shared validation gate.
- The owner will implement library changes. The agent may propose the contract but must not access or modify the library checkout during this phase; the owner notes that it has no AI policy yet.

### Score and profile editing

- Set a complete chart record: require song, difficulty, score, accuracy, and FC (the FC option is required in the slash command, not optional). The record replaces existing values, including lower-value corrections.
- Enforce score 0–1,000,000 and accuracy 0–100 via the slash option bounds. A score of 1,000,000 requires accuracy 100 and FC; phi-status mismatches are rejected in both the manual and import paths (owner decision).
- Use the existing alias search. Zero matches reply with no-match; more than 25 candidate charts reply asking for a narrower search (no pagination); one match applies directly; 2–25 matches open an owner-bound select menu.
- Profile avatar/background selection may use any known available asset, independent of unlock progress. The values are free text validated by lookup; autocomplete or alias-like search is future work.
- Challenge input uses the native color enum and a level option bounded 0–99, without additional game-achievability restrictions.
- Currency has independent optional KiB/MiB/GiB/TiB/PiB inputs. Every unit, including PiB, is bounded 0–1023 in the slash options, although the native limit is higher. Omitted units retain their values.

### Import application

- **Upsert:** replace matching whole chart records and add missing charts; retain charts absent from the source.
- **Fill missing:** add only absent charts.
- **Replace all:** use the accepted imported chart collection as the chart collection, removing other charts. An import with zero valid rows therefore empties the score collection; this is accepted behavior.
- **Keep better:** choose a whole record by accuracy, then score, then FC. Keep the existing record when all comparison values tie; do not independently combine maxima from different records.
- Unknown charts, out-of-range scores/accuracy, and phi-status mismatches are rejected and reported as issues. Malformed rows are skipped by the parser.
- Duplicated chart keys: all occurrences are rejected and reported; other valid unique records are still imported. Duplicates do not abort the import, and a chart already in the collection is not changed by a duplicated row.
- Rejected keys are kept: a local chart whose key appears in the source but whose row is rejected is retained, because missing-in-import is computed from all parsed keys.
- Warnings do not reject a row: a warned row is accepted. The import report shows an issue count (rejected rows plus warnings), not a skipped count. CSV rows with an unknown status are tolerated: kept as not full combo with a warning.
- Always overwrite supported non-score models supplied by the source, independent of score mode; retain models absent from the source. Discard GameKey/GameSettings as specified above.
- **Summary is intentionally not recalculated.** Stored summary values act as an expiring, untrusted cache; imports and score edits leave the stored entry unchanged, and reads return the stored entry or the default. Nothing meaningful depends on it.
- CSV initially uses the existing export headers: `ID`, `Name`, `Difficulty`, `Chart Constant`, `Score`, `Acc`, `Rks Given`, `Stat`. Require stable IDs; name/derived columns do not determine imported records. Native XLSX support is later work.
- Attachment imports (CSV, Android) have a 5 MiB size limit and a 30 s download timeout.
- Accepted failure handling: a player-info fetch failure during cloud import, and a missing user or local row at Proceed, throw and are handled by the global exception handler.

### Import sources and Discord workflows

- Use one `/local` command family for activation, score/profile edits, and imports. Mode switching (`start`, `use-cloud`) moved to `/account` ([ADR 0005](0005-AccountCommand.md)). Subcommands are `profile`, `challenge`, `currency`, score `set`/`remove`, and imports `csv`, `cloud`, `android`. Existing score/image/export commands consume the shared read abstraction. Command names are final.
- The cloud import has no save-index option; users cannot choose the save index for local cloud import.
- First import entry points are CSV, server archive, Android PlayerPrefs XML, and live cloud using the retained logged-in token. A standalone uploaded cloud ZIP is not part of this selected first set.
- **Import access requirements:** imports do not depend on the user's main account mode. CSV, Android, cloud, and server-archive imports require only registration. Cloud import additionally requires a cloud binding. Other local edits (manual score set, profile edits) still require local mode.
- Cloud import reads through a dedicated source-read path that uses the retained cloud binding without changing active mode or weakening the public explicit-loader checks. It does not raise the cloud-fetched hook.
- The empty local collection is created on first import, at import start; a cancelled or expired preview leaves an empty collection. This resolved an earlier limitation, where only local activation created the collection row, per [ADR 0005](0005-AccountCommand.md).
- Server archive import is a separate top-level command, `/local-import-archive`, in the root `SaveArchiveProgram` plugin (not a `/local` subcommand). It takes a required import mode and is ephemeral, so no requester-ID check is needed. The bot checks that the user is registered and has an archived save, asks for Proceed/Cancel, then reads the newest readable archive and uses its first save. Core's existing import flow then applies the import or shows its own preview/Proceed. Archive imports use the same validation and commit rules as live-cloud import.
- Local service/storage/commands live in Core. The archive reader is a static helper in the plugin; no Core provider interface, archive select menu, or draft store was added. Import-mode choices reuse the Core enum, while plugin text uses plain strings rather than Core localization keys.
- Apply an import directly only when there is no conflict or rejection. Prompt on **any chart overlap**, including identical or intentionally kept records, rejected/skipped input, removed charts, or changed existing non-score data.
- Proceed commits exactly the prepared complete result, consistent with last-write-wins. It does not reload/reapply the merge against newer contents.
- Hold prepared imports in process-local memory with a fixed 15-minute lifetime. Buttons reference an ID; restart/expiry requires rerunning the import. Proceed takes the entry atomically and owner-bound, then commits the prepared snapshot. Proceed rechecks registration only (the user record must exist). Score-select menus use the same owner-bound store and lifetime, and re-read the current local collection at selection time, also without an explicit local-mode check.

## Consequences

- Best-list/RKS views are derived from the current collection, not a retained play history.
- The account model has one active read source with retained inactive data. Ordinary mode changes preserve the local collection, cloud binding, and preferences; logout removes local data. Explicit local score and profile edits require local mode. Imports require only registration (cloud import also requires a cloud binding).
- Cloud-only commands such as `/get-time-index` reply with the wrong-account-mode message in local mode.
- Viewing another user's local collection through `generate_for` (AboutMe, GetPhoto, SongScores) is accepted behavior.
- The selected native-wrapper strategy does not approve the proposed exact table schema or binary framing/version-evolution contract. Last-write-wins and per-operation local loading are accepted.
- The combined layout keeps collection loading and updates simple. Ordinary edits replace the packed payload as a whole; separate per-section database updates are not part of the selected layout.
- Leaderboard eligibility is exclusion: users in local mode and users without a token are omitted. Local activation and account deletion also remove the stale leaderboard entry after commit. Imported cloud records are still part of an editable local collection.
- **Migration (manual, owner-run):** the code does not alter existing tables, so existing databases need manual schema changes (an account-mode column, a nullable token, a local-saves table) and an account-mode backfill for existing international users. No migration code is provided.
- The local-score feature does not alter the owner's archive-download/China-transfer priorities or introduce a delivery deadline.

## Open questions

- Owner review of the shared-library contract, exact native model defaults/bounds, and the table schema, binary layout, and operational defaults.
- Leaderboard policy: current behavior excludes local and unbound users; owner confirmation after the poll is still required.
- Owner-run migration of existing databases (see Consequences).
- Lookup-based profile avatar/background input: autocomplete or alias-like search is future work.

Exact proposed symbols/defaults are not additional approved decisions; this ADR is self-contained for accepted behavior.

## Addendum (owner decisions, 2026-11-20): avatar/background autocomplete

Autocomplete and alias-like search for the profile avatar and background options are no longer future work: [ADR 0018](0018-SlashCommandAutocomplete.md) records them. The avatar option suggests avatar keys (with aliases from a hidden avatar alias table); submit still accepts only the raw key. The background option accepts an exact song name or a song id and still stores the song name. This narrows the "free text validated by lookup" statement in the Decision and answers the corresponding open question above (the original text is not rewritten after freeze).

## Revisions

- 2026-11-15: `Updated:` header (2026-10-24) and inline updates folded into the body; pre-fold text at `3b72782`. Stale lines about `ArchiveSaveCommand` blocking local mode and the `TransferToChinaCommand` access rule were dropped (command removed / rule changed in `c8cb3c8`); implementation detail moved to [LocalScores.md](../LocalScores.md).
