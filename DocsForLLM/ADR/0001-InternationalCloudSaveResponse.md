# ADR 0001: International cloud-save shutdown response

- **Status:** Accepted for response scope and priorities; remaining policies and implementation choices are unresolved.
- **Recorded:** 2026-10-23.
- **Source:** Owner-supplied public announcement dated 2026-10-22 and subsequent owner clarifications. Announcement URL/channel and publication time were not supplied.

This record does not authorize implementation, deployment, public communication, or live operations. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

- The owner confirms shutdown on **2026-10-31** for Phigros builds downloaded from **Google Play** or **taptap.io**. The time and time zone are not established.
- All affected international cloud-save functions, including login, reading, and uploading saves, will be disabled. This does not establish an effect on local gameplay or local saves.
- The owner identifies **taptap.cn** and **Apple App Store** builds as unaffected China-side builds.
- `/archive-save` is already implemented, as reported by the owner. This is not agent runtime validation.
- The owner is the only programmer and cannot work full time on the codebase. The announcement promises gradual delivery, not feature delivery dates.

## Decision

### Archive response and public expectations

- Use the existing `/archive-save` response to give users time to preserve their current saves on the team's server.
- The public announcement discloses that the current TOS does not cover this command and requires users to read and consent to command-specific terms before continuing. This records the disclosure, not an assessment of legal sufficiency.
- Archived saves are intended as input to the planned local-save workflow and can be retrieved for users' purposes or deleted upon request. Retention periods and request procedures remain unresolved.
- The announced roadmap is user-submittable local-save storage, imports from cloud-save files, spreadsheets/Excel/CSV, and device-local save files, plus **one-way international-to-China** cloud-save transfer. The announcement discloses that device-local file import requires root/jailbreak.
- Publicly planned features are intended work that can change, not unconditional delivery guarantees. Local-score decisions are recorded separately in [ADR 0002](0002-LocalScoreSystem.md).

### Transfer boundary and delivery priorities

- International-to-China transfer can use an **archived save** after shutdown; it does not require live international access for that workflow.
- The owner already has save-upload code intentionally excluded from this codebase to prevent cheating. Do not import or publish it without explicit authorization, or assume an integrated transfer utility is complete.
- Pre-shutdown delivery is desirable, not a hard transfer-delivery deadline. International cloud retrieval is still constrained by the external shutdown cutoff.
- Using archived scores in the bot is **not required before shutdown**; its later priority has not been established.
- User self-service archive download and international-to-China transfer are **nice-to-have before shutdown and required afterward**, with **no strict delivery deadlines**. Do not treat an undated requirement as optional.
- **Plan China transfer before self-service archive download.** The owner explains that users generally lack the technical background to make practical use of downloaded archives. This establishes the next planning focus; it does not establish a delivery deadline or remove the archive-download requirement.
- Transfer-source scope, replacement behavior, optional bot-account switching, and the public-flow/private-upload-package boundary are recorded in [ADR 0003](0003-ChinaSaveTransfer.md).
- Gradual delivery without fixed dates is acceptable. These are the owner's current priorities, not unconditional or dated public guarantees; the owner will announce actual release details and differences from earlier plans.

### Preservation scope

- The owner currently checks archives manually. The archive program is a temporary response chosen to communicate quickly and let users act.
- Archive implementation improvements and the intended near-term follow-up remain **undecided and deferred to a separate session**. No improvement checklist or fixed release commitment has been approved.
- Archives are **not currently backed up**, according to the owner. **Server-failure mitigation is explicitly out of scope for this response.** Do not silently add backups, redundancy, or recovery work without a new owner decision.

## Consequences

- The server-failure scope choice accepts possible archive loss if the sole copy is lost. It does not establish durability or guarantee recoverability.
- The announced device/Google Play backup advice is not independent verification of backup availability or restoration guarantees.
- User-submitted scores create a leaderboard-integrity concern, not an approved eligibility rule. Participation remains unresolved pending the owner's user poll.
- The external retrieval cutoff must remain distinct from the undated archive-download, transfer, and local-score delivery priorities.

## Open questions

- Archive acceptance checks, failure handling, and scope of any implementation follow-up.
- Consent terms, retention, retrieval/deletion procedures, and responsibility for user requests.
- Remaining feature priorities and post-shutdown service behavior.
- Remaining transfer destination/integration requirements tracked in ADR 0003, and leaderboard policy.

The original announcement, interview detail, and static archive-source findings are preserved locally in gitignored `DocsForLLM/Notes/InternationalCloudSaveResponse.md` and `DocsForLLM/Notes/PlanningContext.md` (repository-root paths). They are supporting notes, not additional approved requirements.
