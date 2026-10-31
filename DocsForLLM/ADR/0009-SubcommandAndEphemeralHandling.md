# ADR 0009: Framework handling of subcommands and ephemeral responses

- **Status:** Proposed
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355673)
- **Recorded:** 2026-10-30.
- **Source:** Owner direction in the command-unification grill-me session on 2026-10-30.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

**Proposal, not yet decided.** The direction below is a recommendation from the 2026-10-31 refactor planning. The owner has not signed off on it.

## Context

`IsEphemeral` (which drives the initial deferral) and other execution properties are declared once per top-level command class. Some command-unification candidates merge commands with different visibility:

- Text-report family ([ADR 0010](0010-ScoresCommand.md)): `/get-scores` and `/get-money` are public; `/more-rks`, `/export-scores`, and `/get-time-index` are ephemeral.
- Song lookup ([ADR 0011](0011-SongCommand.md)): `/song-info` is public; `/download-asset` is ephemeral.

The owner wants the framework's subcommand and ephemeral-response handling refactored before deciding these merges, instead of forcing one visibility per merged command.

Current subcommand routing in `CommandBase` has these problems:

- Names are declared twice (builder and route table), so they can drift silently.
- Every route is looped over, and an unmatched route is skipped without any report.
- Option parsing is untyped.
- Ephemerality is per class.

## Proposed direction (recommended, not decided)

- Remove the context overloads of the router. Only `CollectionCommand` uses them, and capturing lambdas are equivalent.
- Each command class declares one immutable subcommand tree (name, localized description, options, handler, per-node ephemeral/TOS flags). The tree generates both the `SlashCommandBuilder` and the dispatch, so names cannot drift.
- Dispatch walks the single `Options[0]` path and reports an error when nothing matches, instead of skipping silently.
- `Execute` resolves the node, and with it its ephemeral/TOS flags, before `DeferAsync`.
- Per-call state is passed to handlers explicitly and never captured at construction, because commands are keyed singletons.
- Alias global/server/admin stay separate top-level commands ([ADR 0008](0008-AliasCommandSplit.md)).

## Open questions

- Whether typed option parsing is part of the first pass (the recommendation is no).
- Owner sign-off on the direction above.
- Interaction with existing grouped commands (`/account`, `/local`, `/leaderboard`, `/collection`) and with component routing ([ADR 0004](0004-CommandComponentRouting.md)).
- Whether per-call state needs a context type later; [ADR 0013](0013-CommandCallbackAndPersistence.md) adds none for now.

## Consequences

- ADR 0010 and ADR 0011 depend on this ADR and stay Proposed until it is decided.
