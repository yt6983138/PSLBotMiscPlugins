# ADR 0009: Framework handling of subcommands and ephemeral responses

- **Status:** Proposed
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355673)
- **Recorded:** 2026-10-30.
- **Source:** Owner direction in the command-unification grill-me session on 2026-10-30.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

**Placeholder.** The decision is to be specified in a separate session. Only the motivation is recorded here.

## Context

`IsEphemeral` (which drives the initial deferral) and other execution properties are declared once per top-level command class. Some command-unification candidates merge commands with different visibility:

- Text-report family ([ADR 0010](0010-ScoresCommand.md)): `/get-scores` and `/get-money` are public; `/more-rks`, `/export-scores`, and `/get-time-index` are ephemeral.
- Song lookup ([ADR 0011](0011-SongCommand.md)): `/song-info` is public; `/download-asset` is ephemeral.

The owner wants the framework's subcommand and ephemeral-response handling refactored before deciding these merges, instead of forcing one visibility per merged command.

## Decision

To be decided.

## Open questions

- Scope: how the framework models subcommands and per-subcommand (or per-invocation) properties such as ephemerality.
- Interaction with existing grouped commands (`/account`, `/local`, `/leaderboard`, `/collection`) and with component routing ([ADR 0004](0004-CommandComponentRouting.md)).

## Consequences

- ADR 0010 and ADR 0011 depend on this ADR and stay Proposed until it is decided.
