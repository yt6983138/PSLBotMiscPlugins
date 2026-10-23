# ADR 0002: Local user-submitted score system

- **Status:** Accepted for confirmed requirements and storage layout; the remaining implementation design is not approved.
- **Recorded:** 2026-10-23.
- **Source:** Owner decisions in the local-score planning discussion on 2026-10-23.

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
- Each user has **one active account type: cloud or local**. Keeping both sources selectable is not the requested model.
- Bulk imports have user-selectable modes; the exact modes and default are not yet approved.
- **Discord commands are the initial interface.**
- Leaderboard participation remains undecided while the owner's user poll is running.

### Storage direction

- Use **SQL with MemoryPack** for persistent local collections.
- Store editable local-collection payloads in **SQLite**, not the filesystem.
- Design for complete-payload reads; SQL filtering within packed scores is not required.
- Store each local user's complete packed save payload in **one combined MemoryPack BLOB**, with database metadata outside the payload. This resolves the previously open combined-versus-sectioned choice.

## Consequences

- Best-list/RKS views are derived from the current collection, not a retained play history.
- The account model must respect the single active cloud/local choice; this decision does not define conversion, seeding, or retention behavior.
- The storage direction does not approve a particular table schema, MemoryPack envelope, serializer strategy, concurrency mechanism, or cache design.
- The combined layout keeps collection loading and updates simple. Ordinary edits replace the packed payload as a whole; separate per-section database updates are not part of the selected layout.
- Import modes and leaderboard eligibility must not be inferred from implementation recommendations or record provenance alone.
- The local-score feature does not alter the owner's archive-download/China-transfer priorities or introduce a delivery deadline.

## Open questions

- Final import modes/default and invalid-batch behavior.
- Account conversion/seeding and retention when switching account types.
- Editable display-profile fields and presentation of unavailable metadata.
- Detailed table schema, payload serialization/versioning, concurrency, caching, and integration design.
- Leaderboard policy after the poll; source information is not an already approved eligibility rule.

The full implementation proposal, suggested sequencing, library/model investigation, and static source findings are preserved locally in gitignored `DocsForLLM/Notes/LocalScoreSystemPlan.md` (repository-root path). They remain proposals and findings, not additional approved decisions.
