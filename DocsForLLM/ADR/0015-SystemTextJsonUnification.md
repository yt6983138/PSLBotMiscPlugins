# ADR 0015: Unify JSON on System.Text.Json

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=289102281)
- **Recorded:** 2026-10-31.
- **Source:** Owner decision in the "Refactor #2" planning on 2026-10-31.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Newtonsoft.Json is used in roughly 21 files across the root AdminHelper plugin, Framework, and Core (controllers, localization serializers, file-management and options services, `UserData`, and others). User data, configuration, and localization files are persisted with it today.

## Decision

- Standardize on System.Text.Json and migrate away from Newtonsoft.Json.
- Persisted formats (user data, config, localization) must stay read/write compatible: same property names, converters, null handling, and enum handling.
- Migrate by subsystem, with the persisted formats last.

## Open questions

- How to verify that migrated serialization reads existing files and writes equivalent output.
- Whether any remaining dependency still requires Newtonsoft transitively once migration is done.

## Consequences

- `ExistingUtilities.md` and `CodingStandards.md` JSON guidance are updated when this is implemented.
- Persisted-format changes carry data-loss risk and are done only after the non-persisted code is migrated.
