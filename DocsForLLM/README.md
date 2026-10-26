# Agent documentation

The repository-root [AGENTS.md](../AGENTS.md) is the discovery entry point. Start with [RepositoryGuide.md](RepositoryGuide.md) before making changes.

## Organization

| Location | Purpose | Git policy |
| --- | --- | --- |
| `DocsForLLM/` | General guidelines, instructions, and reusable reference material. | Tracked. |
| `DocsForLLM/ADR/` | Durable, owner-confirmed decisions and their context, consequences, and unresolved boundaries. | Tracked. |
| `DocsForLLM/Notes/` | Working plans, proposals, interview detail, investigation findings, and communication drafts. | Gitignored; only `README.md` is tracked. |

General guidance and ADRs must be self-contained: a fresh clone will not contain local notes. Promote confirmed decisions or standing instructions out of notes into the appropriate tracked document. Do not promote recommendations merely because they appear in a plan.

## General guidance

- [RepositoryGuide.md](RepositoryGuide.md): codebase map, validation policy, build commands, and repository boundaries.
- [CodingStandards.md](CodingStandards.md): coding conventions and completion checklist.
- [ExistingUtilities.md](ExistingUtilities.md): reuse-first catalogue of existing utilities and patterns.
- [ComponentRouting.md](ComponentRouting.md): implemented command-owned button/select routing APIs, acknowledgement behavior, lifecycle, and integration responsibilities.
- [ChinaSaveTransfer.md](ChinaSaveTransfer.md): current `/transfer-to-china` flow, owner-confirmed archive/auth/cancellation/error boundaries, button-removal and payload semantics, dependencies, and observable limits.
- [PlanningGuidelines.md](PlanningGuidelines.md): team constraints, decision authority, and supervised planning boundaries.

## Decision records

- [ADR 0001: International cloud-save shutdown response](ADR/0001-InternationalCloudSaveResponse.md): response scope, archive expectations, and delivery priorities.
- [ADR 0002: Local user-submitted score system](ADR/0002-LocalScoreSystem.md): collection/account requirements, single-BLOB SQLite storage with native serialization, and the shared-library abstraction direction.
- [ADR 0003: International-to-China save transfer](ADR/0003-ChinaSaveTransfer.md): transfer sources, replacement behavior, optional account switching, and the public/private integration boundary.
- [ADR 0004: Command-owned Discord component routing](ADR/0004-CommandComponentRouting.md): accepted component-infrastructure plan covering thin dispatch, process-local identity, command-owned state, automatic editing-first replies, Core-owned invalid-route responses, and shared status gating.

Use a numbered filename (`0001-Topic.md`) and record status, source/date, context, decision, consequences, and open questions. Keep proposals distinct from accepted decisions and explicitly record when a later decision supersedes an earlier one. Acceptance of an ADR is not implementation or operational authorization.

## Local notes

The original planning documents are preserved locally as `Notes/PlanningContext.md` and `Notes/InternationalCloudSaveResponse.md`. They retain the full announcement, interview context, unapproved designs, and static source findings, but are not required reading in a fresh clone.

The root `.gitignore` ignores all contents of `Notes/` except [its README](Notes/README.md). Do not force-add notes. Ignoring files does not remove previously committed content from Git history and is not a substitute for protecting credentials.
