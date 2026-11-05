# ADR 0013: Command callback parameters and requester persistence

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=289102268)
- **Recorded:** 2026-10-31.
- **Source:** Owner decisions in the planning session and the "Refactor #2" draft on 2026-10-31.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Command `Callback`/`Execute`/`HandleInteraction` overrides receive an `executer` that is never read, and a database `requester` that about 15 of roughly 75 overrides use. The base creates the requester per call and disposes it, which saves implicitly (also after an exception). `EnsureCreated()` runs in each requester's constructor. Changes to the `UserData` passed to `Callback` are saved when the base's requester is disposed.

## Decision

- Remove `executer` and `requester` from `Callback`, `Execute`, and `HandleInteraction` in all command families (Framework and Core bases, templates, all plugins). Other parameters are unchanged. No `CommandContext` record for now.
- Commands that need the database create their own requester: `using var requester = this._dataBaseService.NewRequester();`.
- `EnsureCreated()` runs once when the database service starts, not per requester, so requesters are cheap.
- No save-on-dispose. Every write path calls `SaveChangesAsync` explicitly.
- The `UserData` passed to `Callback` is loaded `AsNoTracking`. `UserData` changes go through a named update API, so a command never edits an entity that another requester saves.
- This is done before ADRs 0005-0011 are implemented.
- Breaking changes are allowed. No obsolete bridges, because the owner is the only framework user.
- This record supersedes the fixed `HandleInteraction(SocketInteraction, object executer)` signature in [ADR 0004](0004-CommandComponentRouting.md), on that point only. The rest of ADR 0004 stands.

## Open questions

- Shape of the named `UserData` update API. Resolved: see the [`UserData` update addendum](#addendum-userdata-updates-owner-decision-2026-11-05).
- Every override that mutates `data` must be checked so no write is lost: it saves explicitly, or the base keeps saving after `Callback`.
- Docs to update: `ComponentRouting.md` and the signature references in the repository guides.

## Consequences

- Commands that ignore the database no longer open one.
- A forgotten `SaveChangesAsync` loses data silently, so review of each write path is required.
- Component handlers lose the `executer` argument documented in [ComponentRouting.md](../ComponentRouting.md).

## Addendum (owner decisions, 2026-11-05)

These changes come from [ADR 0009](0009-SubcommandAndEphemeralHandling.md) and apply together with it. The rest of this record stands, including "No `CommandContext` record for now".

- The `UserData` callback parameter becomes `UserData?` for all commands, rather than staying unchanged. Commands use `data!` where a registered constraint guarantees a value.
- This record and ADR 0009 are implemented concurrently, rather than this record being done first, because both change the same callback overrides. This record is still done before ADRs 0005-0008 and 0010-0011 are implemented, where those are not already complete.

## Addendum: `UserData` updates (owner decision, 2026-11-05)

- The named `UserData` update API is the existing `AddOrReplaceUserDataAsync`, followed by an explicit `SaveChangesAsync`. No new API is added.
- It writes the whole row through `Update`, so overlapping writes for one user are last-write-wins. This is accepted because a row belongs to one user and these writes are rare. `ExecuteUpdateAsync` is the targeted fix if that changes.
- Correction to the Context section: `DbDataRequester` already uses `NoTracking` for the whole context, and write paths already call `AddOrReplaceUserDataAsync`. Changes to `data` are saved on dispose only after that call, so the risk after this record is a missing `SaveChangesAsync`.
