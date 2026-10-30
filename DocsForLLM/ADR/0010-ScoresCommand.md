# ADR 0010: Text-report / save-query command family

- **Status:** Proposed
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355715)
- **Recorded:** 2026-10-30.
- **Source:** Command-unification grill-me session on 2026-10-30.
- **Depends on:** [ADR 0009](0009-SubcommandAndEphemeralHandling.md).

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Five Core commands read the user's save and return text or file reports. All derive from `CommandBase` and have no components or `generate_for` option:

| Command | Visibility | Options | Output | Save source |
|---|---|---|---|---|
| `/get-scores` | public | `index`, `count` | `Scores.txt` | cloud or local |
| `/more-rks` | ephemeral | `index`, `get-at-least`, `count` | `Report.txt` | cloud or local |
| `/export-scores` | ephemeral | `index` | `Export.csv` | cloud or local |
| `/get-money` | public | `index` | text | cloud or local |
| `/get-time-index` | ephemeral | none | text table | cloud only |

Merging them under one top-level command needs one visibility per command today. The owner chose to first refactor framework subcommand/ephemeral handling (ADR 0009) instead of forcing a single visibility.

`GetScoresCommand.ScoresFormatter` is a shared formatter used by `/get-scores-by-token`, `/song-scores` (`/photo song` after [ADR 0007](0007-PhotoCommand.md)), and `/set-memorable-score`; any restructuring must keep it reachable.

## Decision

Not decided. Direction under consideration: group the score reports (for example `/scores list`, `/scores export`, `/scores improve`), and give `/get-money` and `/get-time-index` a separate home (for example `/save money`, `/save indexes`). Folding text reports into `/photo` is not recommended (it mixes image and text outputs).

## Open questions

- Visibility per subcommand, once ADR 0009 is decided.
- Final command and subcommand names, and whether `/get-money`/`/get-time-index` form their own command.
- Whether `/get-time-index` (cloud-only) still has a place after the 2026-10-31 international cloud-save discontinuation ([ADR 0001](0001-InternationalCloudSaveResponse.md)).
- Transition (hard cut as in ADRs 0005/0007/0008 is the expected default) and localization re-keying.

## Consequences

- Until this ADR is accepted and implemented, the existing commands stay as they are.
