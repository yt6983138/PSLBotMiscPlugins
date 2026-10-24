# ADR 0002: Local user-submitted score system

- **Status:** Accepted behavior and architecture from the planning interview. Concrete C# signatures and binary layout are proposed for implementation review.
- **Recorded:** 2026-10-23.
- **Updated:** 2026-10-24, during C#/Discord interface design.
- **Source:** Owner decisions in the local-score planning discussions on 2026-10-23 and 2026-10-24.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md). Shutdown-response priorities remain as recorded in [ADR 0001](0001-InternationalCloudSaveResponse.md).

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
- **2026-10-24 switching decision:** switching from local to cloud through `/login` or `/link-token` retains the local collection as dormant data. Cloud becomes the active source; returning to local resumes that collection. Local-collection deletion is a separate explicit operation.
- Switching from cloud to local retains the inactive cloud token and region, allowing a later switch back if the binding still works. Existing ordinary score commands use the active mode. The later loader/edit decision supersedes initial permission to edit dormant collections: edit commands use the explicit local loader, which requires local mode.
- Local onboarding uses a start-then-import flow: a provisional `/local start` command creates an empty collection or resumes an existing one and activates local mode. Import is a separate operation; final command names remain to be specified.
- Mode switches preserve existing bot preferences, including visibility, numeric formatting, and default image count, and preserve the recorded consent level subject to normal current-TOS checks.
- Switching to a retained cloud binding is immediate, without a verification fetch. Missing bindings must still be reported rather than creating a cloud account implicitly.
- `/logout` also deletes the stored local collection, including dormant data, alongside existing registration/preferences/leaderboard removal. The deletion consequence must be clear before execution. Retention across mode switches does not imply retention across logout.
- Bulk imports require an explicit mode: upsert, fill missing, replace all, or keep better. The detailed rules are recorded below.
- **Discord commands are the initial interface.**
- **2026-10-24 design scope:** complete the C# data/service contracts and Discord workflows together, including existing-command integration. Public HTTP API design is outside this session's selected scope.
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
- Exact signatures are proposed in the interface-design notes; the accepted behavior and persistence boundary are recorded here.
- Cover all existing model sections, including GameKey and Summary. Read methods return independent models; callers must explicitly save edited models back to update native entries. Subsequent changes to the returned model require another save.
- For local data, creation/modification timestamps describe the local collection: initial creation and last successful persisted content change. Imported source dates may remain in retained source metadata.
- The initial three-loader proposal used `TryGetCloudSaveAsync`, `TryGetLocalSaveAsync`, and a generic `TryGetSaveAsync`. The subsequent refinement below supersedes the generic name and its failure behavior. Bot modifications use the explicit local path.
- **Subsequent loader refinement:** use a new dedicated save service. The generic method is renamed `GetSaveAsync` and throws on failure. The explicit `TryGetCloudSaveAsync` and `TryGetLocalSaveAsync` always require both the corresponding source and its active mode, returning `(Save, Exception)` tuples on failure/success as appropriate. Only generic `GetSaveAsync` takes `requireCurrent` (default true). With false, the current source wins if present, otherwise the other source may be used; loading errors do not trigger fallback.
- The same service supplies Discord reply adapters for all three routes, sharing error handling. Adapters return null for handled failures and optionally rethrow unexpected exceptions under an `autoThrow` flag, following the existing save-handler pattern. Cancellation-token design is deferred by the owner.
- Local mode ignores the existing save-index option.

### Local write-back contract

- Callers modify the loaded concrete local object through model read/write methods, then commit the whole save. The local object exposes a database-save method; its exact signature and binding to the persistence service remain to be specified.
- Persistence may create or replace a local collection (upsert). **Last write wins**; concurrent edits can overwrite each other's complete payloads. Revision-checked rejection and operation-wide locking were not selected.
- Authoritative input validation belongs to commands and importers. The database commit path accepts caller-supplied data without an additional shared validation gate.
- The owner will implement library changes. The agent may propose the contract but must not access or modify the library checkout during this phase; the owner notes that it has no AI policy yet.

### Score and profile editing

- Set a complete chart record: require song, difficulty, score, and accuracy; optional FC defaults false. The record replaces existing values, including lower-value corrections.
- Enforce score 0–1,000,000 and finite accuracy 0–100. Do not reject otherwise in-range values merely because score and accuracy imply inconsistent phi status.
- Use the existing alias search and a select menu for ambiguous manual song matches.
- Profile avatar/background selection may use any known available asset, independent of unlock progress.
- Challenge input uses color and level options, accepting native enum members and native numeric bounds without additional game-achievability restrictions.
- Currency has independent optional KiB/MiB/GiB/TiB/PiB inputs. Lower units must be 0–1023; PiB uses the native nonnegative bound. Omitted units retain their values.

### Import application

- **Upsert:** replace matching whole chart records and add missing charts; retain charts absent from the source.
- **Fill missing:** add only absent charts.
- **Replace all:** use the accepted imported chart collection, removing other charts.
- **Keep better:** choose a whole record by accuracy, then score, then FC. Keep the existing record when all comparison values tie; do not independently combine maxima from different records.
- Unknown charts are skipped and reported. Malformed/invalid records are skipped and reported. If no records are valid, make no score changes.
- Reject all occurrences of duplicated chart keys, importing other valid unique records. Duplicate charts do not abort the entire import.
- Always overwrite supported non-score models supplied by the source, independent of score mode; retain models absent from the source. Recalculate score-derived summary values. Discard GameKey/GameSettings as specified above.
- CSV initially uses the existing export headers: `ID`, `Name`, `Difficulty`, `Chart Constant`, `Score`, `Acc`, `Rks Given`, `Stat`. Require stable IDs; name/derived columns do not determine imported records. Native XLSX support is later work.

### Import sources and Discord workflows

- Use one `/local` command family for activation, score/profile edits, and imports. Existing score/image/export commands consume the shared read abstraction.
- First import entry points are CSV, server archive, Android PlayerPrefs XML, and live cloud using the retained logged-in token. A standalone uploaded cloud ZIP is not part of this selected first set.
- The Android parser is an owner-filled scaffold. The owner confirms that the library already has local decryption code; agents must not inspect or implement library changes to fill the parser.
- Require local mode for live-cloud import. Its dedicated source-read path can use the retained cloud binding without changing active mode or weakening the public explicit-loader checks.
- Server archive import uses interactive archive/save selection.
- Local service/storage/commands live in Core. SaveArchiveProgram supplies archive access through a small Core-defined provider interface.
- Apply an import directly only when there is no conflict or rejection. Prompt on **any chart overlap**, including identical or intentionally kept records, rejected/skipped input, removed charts, or changed existing non-score data.
- Proceed commits exactly the prepared complete result, consistent with last-write-wins. It does not reload/reapply the merge against newer contents.
- Hold prepared imports in process-local memory with a configurable ten-minute lifetime. Buttons reference an ID; restart/expiry requires rerunning the import. Proceed consumes the pending result and rechecks registration/local mode before applying it.

## Consequences

- Best-list/RKS views are derived from the current collection, not a retained play history.
- The account model has one active read source with retained inactive data. Ordinary mode changes preserve the local collection, cloud binding, and preferences; logout removes local data. Explicit local edits require local mode.
- The selected native-wrapper strategy does not approve the proposed exact table schema or binary framing/version-evolution contract. Last-write-wins and per-operation local loading are accepted.
- The combined layout keeps collection loading and updates simple. Ordinary edits replace the packed payload as a whole; separate per-section database updates are not part of the selected layout.
- Leaderboard eligibility remains unresolved; imported cloud records are still part of an editable local collection.
- The local-score feature does not alter the owner's archive-download/China-transfer priorities or introduce a delivery deadline.

## Open questions

- Owner review/implementation of the shared-library contract, exact native model defaults/bounds, and Android parser scaffold.
- Review of concrete C# signatures, table schema, binary layout, and proposed operational defaults in the interface-design notes.
- Leaderboard policy after the poll; source information is not an already approved eligibility rule.

The current complete contract proposal is in gitignored `DocsForLLM/Notes/LocalScoreInterfaceDesign.md` (repository-root path). Earlier investigation and superseded proposals remain in `Notes/LocalScoreSystemPlan.md`. Exact proposed symbols/defaults are not additional approved decisions; this ADR is self-contained for accepted behavior.
