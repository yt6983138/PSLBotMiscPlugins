# ADR 0011: Song lookup command family

- **Status:** Proposed
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355721)
- **Recorded:** 2026-10-30.
- **Source:** Command-unification grill-me session on 2026-10-30.
- **Depends on:** [ADR 0009](0009-SubcommandAndEphemeralHandling.md).

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Two guest commands look up a song with the same required song-search option:

| Command | Base | Visibility | Output |
|---|---|---|---|
| `/song-info` | `GuestCommandBase` | public | text, `preview.png`, `Query.txt` |
| `/download-asset` | `GuestCommandBase` | ephemeral | text, `preview.png`, `Query.txt`, `<id>.zip`, optional `<id>.pez` (PEZ difficulty option; large-file guard) |

`DownloadAssetCommand` reuses `SongInfoCommand.BuildReturnQueryString`. Their visibility differs, so merging depends on the framework refactor in ADR 0009.

## Decision

Not decided. Direction under consideration: `/song info` and `/song assets`. The survey rated this low value on its own and suggested doing it only alongside another rename round.

## Open questions

- Visibility per subcommand, once ADR 0009 is decided.
- Whether to merge at all, and if so whether to bundle it with ADR 0010's release.
- Final subcommand names and localization re-keying.

## Consequences

- Until this ADR is accepted and implemented, the existing commands stay as they are.
