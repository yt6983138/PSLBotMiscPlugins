# ADR 0013: Command callback parameters and requester persistence

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=289102268)
- **Frozen:** 2026-11-07
- **Recorded:** 2026-10-31.
- **Source:** Owner decisions in the planning session and the "Refactor #2" draft on 2026-10-31.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Command `Callback`/`Execute`/`HandleInteraction` overrides receive an `executer` that is never read, and a database `requester` that about 15 of roughly 75 overrides use. The base creates the requester per call and disposes it, which saves implicitly (also after an exception). `EnsureCreated()` runs in each requester's constructor. `DbDataRequester` already uses no-tracking for the whole context, and write paths already call `AddOrReplaceUserDataAsync`; changes to the `UserData` passed to `Callback` are saved on dispose only after that call.

## Decision

- Remove `executer` and `requester` from `Callback`, `Execute`, and `HandleInteraction` in all command families (Framework and Core bases, templates, all plugins). Other parameters are unchanged, except that the `UserData` callback parameter becomes `UserData?` for all commands (from [ADR 0009](0009-SubcommandAndEphemeralHandling.md)); commands use `data!` where a registered constraint guarantees a value. No `CommandContext` record for now.
- Commands that need the database create their own requester with `this._dataBaseService.NewRequester()`.
- `EnsureCreated()` runs once when the database service starts, not per requester, so requesters are cheap.
- No save-on-dispose. Every write path calls `SaveChangesAsync` explicitly.
- `UserData` changes go through the existing `AddOrReplaceUserDataAsync`, followed by an explicit `SaveChangesAsync`, so a command never edits an entity that another requester saves. The `UserData` passed to `Callback` is read without tracking.
- `AddOrReplaceUserDataAsync` writes the whole row through `Update`, so overlapping writes for one user are last-write-wins. This is accepted because a row belongs to one user and these writes are rare. `ExecuteUpdateAsync` is the targeted fix if that changes.
- This record is implemented concurrently with ADR 0009, because both change the same callback overrides. It is still done before ADRs 0005-0008 and 0010-0011 are implemented, where those are not already complete.
- Breaking changes are allowed. No obsolete bridges, because the owner is the only framework user.
- This record supersedes the fixed `HandleInteraction(SocketInteraction, object executer)` signature in [ADR 0004](0004-CommandComponentRouting.md), on that point only. The rest of ADR 0004 stands.

## Rejected alternatives

- Keeping `UserData` unchanged in the callback signature (replaced 2026-11-05 by `UserData?`).
- Doing this record before ADR 0009 (replaced 2026-11-05 by implementing both concurrently).
- A new named `UserData` update API (replaced 2026-11-05 by the existing `AddOrReplaceUserDataAsync` plus explicit save).
- A `CommandContext` record (not now).
- Obsolete bridges for the old signatures.

## Consequences

- Commands that ignore the database no longer open one.
- A forgotten `SaveChangesAsync` loses data silently, so review of each write path is required.
- Component handlers lose the `executer` argument documented in [ComponentRouting.md](../Topics/ComponentRouting.md).

## Open questions

- Every override that mutates `data` must be checked so no write is lost: it saves explicitly, or the base keeps saving after `Callback`.
- Docs to update: `ComponentRouting.md` and the signature references in the repository guides.

## Revisions

- 2026-11-15: addenda of 2026-11-05 (two: callback and `UserData?` / concurrent implementation with ADR 0009; `UserData` updates) folded into the body; pre-fold text at `4d4a205`.
