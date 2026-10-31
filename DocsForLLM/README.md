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
- [ADR 0005: `/account` command and `LocalCommand` restructure](ADR/0005-AccountCommand.md): account lifecycle consolidation (register, switch, delete, status), removal of `/login`, `/link-token`, `/logout`, `/get-token`, `/local start`, `/local use-cloud`, `LocalCommand` moving to `CommandBase`, and local-collection creation on first import.
- [ADR 0006: `/settings` command](ADR/0006-SettingsCommand.md): cosmetic per-user preferences split from `/account`.
- [ADR 0007: `/photo` command](ADR/0007-PhotoCommand.md): `/get-photo`, `/about-me`, `/song-scores` merged into `/photo best|profile|song`, with `generate_for` on all three.
- [ADR 0008: Alias commands split by audience](ADR/0008-AliasCommandSplit.md): `/alias-global`, `/alias-server`, `/alias-server-admin` replace the five alias commands.
- [ADR 0009: Subcommand and ephemeral handling](ADR/0009-SubcommandAndEphemeralHandling.md) (Proposed): subcommand routing rework and per-subcommand properties such as ephemerality.
- [ADR 0010: Text-report command family](ADR/0010-ScoresCommand.md) (Proposed, depends on 0009): grouping `/get-scores`, `/more-rks`, `/export-scores`, `/get-money`, `/get-time-index`.
- [ADR 0011: Song lookup command family](ADR/0011-SongCommand.md) (Proposed, depends on 0009): grouping `/song-info` and `/download-asset`.
- [ADR 0012: Plugin lifecycle and hosting](ADR/0012-PluginLifecycleAndHosting.md): `IPlugin<TSelf>` static async factory, lifetime service replacing `Program` dependencies, async events via a source generator, and removal of `IPlugin.Version` and `ICoFramework`.
- [ADR 0013: Command callback parameters and requester persistence](ADR/0013-CommandCallbackAndPersistence.md): `executer` and `requester` removed from command callbacks, explicit saves, no-tracking `UserData`; supersedes ADR 0004's `HandleInteraction` signature.
- [ADR 0014: Build and deploy pipeline](ADR/0014-BuildAndDeployPipeline.md): central package versions and shared build props, owner-run deploy script with per-plugin splitting, authenticated shutdown endpoint, and build-only CI.
- [ADR 0015: Unify JSON on System.Text.Json](ADR/0015-SystemTextJsonUnification.md): migration away from Newtonsoft with persisted formats kept compatible and migrated last.

Use a numbered filename (`0001-Topic.md`) and record status, source/date, context, decision, consequences, and open questions. Keep proposals distinct from accepted decisions and explicitly record when a later decision supersedes an earlier one. Acceptance of an ADR is not implementation or operational authorization.

ADRs record decisions; the owner's GitHub project board ([Project #2](https://github.com/users/yt6983138/projects/2)) tracks work. Neither replaces the other. Allowed `Status:` values are `Proposed`, `Accepted`, `Superseded by ADR NNNN`, and `Rejected`. An accepted ADR's decision text is not rewritten; a change of mind gets a new superseding ADR. Addenda recording how an accepted decision was concretely realized (owner decisions) remain allowed. ADRs and the index do not record implementation progress (no "Implemented", "NOT TESTED", or "deferred until..." in `Status:` lines or the index); unresolved questions stay in each ADR's open-questions section. Each ADR has a `Tracking:` line directly under `Status:` linking to its board item (Project #2, not the bare issue URL), or `none`; usually one tracking issue per ADR, in the code-owning repository, even if the ADR spans several repositories. Implementation status, priority, and dates are owner-maintained on the board; agents do not read or write the board, and Notes plans may cite issue numbers but must not mirror board state.

## Local notes

The original planning documents are preserved locally as `Notes/PlanningContext.md` and `Notes/InternationalCloudSaveResponse.md`. They retain the full announcement, interview context, unapproved designs, and static source findings, but are not required reading in a fresh clone.

The root `.gitignore` ignores all contents of `Notes/` except [its README](Notes/README.md). Do not force-add notes. Ignoring files does not remove previously committed content from Git history and is not a substitute for protecting credentials.
