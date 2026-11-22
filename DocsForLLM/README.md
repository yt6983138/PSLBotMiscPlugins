# Agent documentation

The repository-root [AGENTS.md](../AGENTS.md) is the discovery entry point. Start with [RepositoryGuide.md](RepositoryGuide.md) before making changes.

## Organization

| Location | Purpose | Git policy |
| --- | --- | --- |
| `DocsForLLM/` | General guidelines, instructions, and reusable reference material. | Tracked. |
| `DocsForLLM/ADR/` | Durable, owner-confirmed decisions and their context, consequences, and unresolved boundaries. | Tracked. |
| `DocsForLLM/Notes/` | Working plans, proposals, interview detail, investigation findings, and communication drafts. | Gitignored; only `README.md` is tracked. |

General guidance and ADRs must be self-contained: a fresh clone will not contain local notes, so tracked documents never point to specific notes. The single exception is `Notes/README.md` naming the local notes index `README.gitignored.md`. Promote confirmed decisions or standing instructions out of notes into the appropriate tracked document. Do not promote recommendations merely because they appear in a plan.

## General guidance

- [RepositoryGuide.md](RepositoryGuide.md): codebase map, validation policy, build commands, and repository boundaries.
- [CodingStandards.md](CodingStandards.md): coding conventions and completion checklist.
- [ExistingUtilities.md](ExistingUtilities.md): reuse-first catalogue of existing utilities and patterns.
- [ComponentRouting.md](ComponentRouting.md): implemented command-owned button/select routing APIs, acknowledgement behavior, lifecycle, and integration responsibilities.
- [ChinaSaveTransfer.md](ChinaSaveTransfer.md): current `/transfer-to-china` flow, owner-confirmed archive/auth/cancellation/error boundaries, button-removal and payload semantics, dependencies, and observable limits.
- [LocalScores.md](LocalScores.md): current local-score collection behaviour: storage, edit validation, import rules and limits, staged-import workflow state, archive import, and leaderboard exclusion.
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
- [ADR 0009: Subcommand and ephemeral handling](ADR/0009-SubcommandAndEphemeralHandling.md): subcommand routing rework with node classes, per-subcommand properties such as ephemerality, and access checks as constraints.
- [ADR 0010: Save-report command family](ADR/0010-ScoresCommand.md): `/records list|improve|export|money` and `/cloud time-index` replacing `/get-scores`, `/more-rks`, `/export-scores`, `/get-money`, `/get-time-index`.
- [ADR 0011: `/song` command](ADR/0011-SongCommand.md): `/song info|assets` replacing `/song-info` and `/download-asset`.
- [ADR 0012: Plugin lifecycle and hosting](ADR/0012-PluginLifecycleAndHosting.md): `IPlugin<TSelf>` with static `Load` (before build) and `Setup` (after build, creates the plugin; replaces the original static factory), lifetime service replacing `Program` dependencies with shutdown policy kept in AdminHelper, custom `IHostLifetime`, async events via a source generator, and removal of `IPlugin.Version`, `ConfigureDiscordClient`, and `ICoFramework`.
- [ADR 0013: Command callback parameters and requester persistence](ADR/0013-CommandCallbackAndPersistence.md): `executer` and `requester` removed from command callbacks, explicit saves, no-tracking `UserData`; supersedes ADR 0004's `HandleInteraction` signature.
- [ADR 0014: Build and deploy pipeline](ADR/0014-BuildAndDeployPipeline.md): central package versions and shared build props, owner-run deploy script with per-plugin splitting, authenticated shutdown endpoint, and build-only CI.
- [ADR 0015: Unify JSON on System.Text.Json](ADR/0015-SystemTextJsonUnification.md): migration away from Newtonsoft with persisted formats kept compatible and migrated last.
- [ADR 0016: Localization fallback simplification](ADR/0016-LocalizationFallbackSimplification.md): one per-language fallback map on the manager, removal of per-string fallbacks and the apply flow, non-throwing missing keys, manager/string mutability and clone rules, and a new `Localization.json` format converted by the owner (overrides ADR 0015 compatibility for this file).
- [ADR 0017: Translation platform and localization pipeline](ADR/0017-TranslationPlatform.md): hosted Weblate, a separate translations repository that owns all help files, CI export of English defaults, local validation, and deployment through `/csv-to-localization`.
- [ADR 0018: Slash-command autocomplete, search core and avatar aliases](ADR/0018-SlashCommandAutocomplete.md): framework and Core autocomplete routing (thread pool, no framework replies, status-only hook), server-then-global alias suggestions by context, `CandidateSearch` and `AutocompleteSuggestionService` without caches, `AliasTableId`, the `Avatar_0` alias table with the AdminHelper `alias-admin` command, background song-id input; amends ADR 0002.

Rules for writing, changing, freezing, and tracking ADRs (status values, `Tracking:` and `Frozen:` lines, revisions, addenda, supersession, template) are in [ADR/README.md](ADR/README.md). The owner's GitHub project board ([Project #2](https://github.com/users/yt6983138/projects/2)) tracks work; agent access is described in [GitHub access](../AGENTS.md#github-access).

## Local notes

The root `.gitignore` ignores all contents of `Notes/` except [its README](Notes/README.md). Do not force-add notes. Ignoring files does not remove previously committed content from Git history and is not a substitute for protecting credentials.
