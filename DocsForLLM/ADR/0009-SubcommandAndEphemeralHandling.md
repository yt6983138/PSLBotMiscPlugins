# ADR 0009: Framework handling of subcommands and ephemeral responses

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=288355673)
- **Recorded:** 2026-10-30.
- **Source:** Owner direction in the command-unification grill-me session on 2026-10-30, and the owner design discussion on 2026-11-04 and 2026-11-05.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

The decision below comes from the owner's 2026-11-04 and 2026-11-05 design discussion and replaces the 2026-10-31 subcommand-tree recommendation.

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

Access checks have a related problem. Registration, TOS, and admin checks are written inline in the `Execute` methods of `CommandBase`, `GuestCommandBase`, and `AdminCommandBase`, so they also apply per class. `AccountCommand` shows the cost: it derives from `GuestCommandBase`, sets `RequireTOSAcceptance => true`, and checks `data is null` in individual handlers.

## Decision

### Command structure

- Each subcommand and subcommand group is a node class, nested directly in its root class and split into partial files such as `AccountCommand.Delete.cs`. Leaves inside a group are also nested in the root, not in the group.
- A root creates its own nodes with `new` in a `CreateChildren` override, which also sets the order Discord shows. The base calls it once on first use and caches the result, because derived fields are not set during the `CommandBase` constructor. No DI registration or reflection is involved.
- Nodes receive their root through the constructor. The node base gets common services through the root, and other dependencies are constructor arguments. A node that needs private root members keeps its own typed `_root` field.
- A leaf creates component IDs through the node base, which binds them to `Root.GetType()`.
- A group's children are typed as leaf subcommands, so the compiler enforces Discord's limit of root, group, subcommand.
- `CommandBase` handles routing. The nodes generate both the `SlashCommandBuilder` and the dispatch, so names exist in one place and cannot drift. `CommandBase.BasicBuilder` appends the children, so roots write `CompleteBuilder => this.BasicBuilder` and cannot leave them out by accident.
- Dispatch walks the single `Options[0]` path to the leaf. An unmatched path, including missing options or a wrong option type from out-of-date registered commands, throws to the slash error handling instead of being skipped silently.
- Resolving happens before the deferral, so the slash error handler changes to reply when nothing was deferred. That reply is ephemeral, because it carries a stack trace.
- `Callback` is renamed to a root callback (`RootCallback`) and becomes virtual. Its default throws `NotSupportedException`, like `HandleInteraction`. Flat commands override it. It is documented as not being called when the command has node children, because Discord does not allow a command with subcommands to be invoked directly.
- A leaf callback receives `(SocketSlashCommand arg, SocketSlashCommandDataOption option, UserData? data)`. It needs `option` because the `SocketSlashCommand` option helpers read only top-level options.
- Per-call state is passed to callbacks explicitly and never stored on a command, node, or constraint, because they are long-lived singletons.

### Execution flow

1. Resolve the leaf node, or the command itself if it is flat.
2. Defer with that target's `IsEphemeral`.
3. Load `UserData` once, which may be null.
4. Run `MasterConstraints`, then the group's `Constraints`, then the leaf's `Constraints`. Stop at the first failure.
5. Call the leaf callback or root callback.

Leaf `IsEphemeral` defaults to `true`, like the framework default, and is overridden explicitly. Groups and roots do not pass it down. A rejection reply follows the visibility of the initial deferral, as it does for flat commands today.

### Constraints

- `IConstraint` has a `Check(SocketSlashCommand arg, UserData? data)` method. A failing constraint sends its own reply and returns `false`; further constraints are not evaluated.
- Every command has `IReadOnlyList<IConstraint> MasterConstraints`, which applies to the command itself and all its subcommands. Nodes have `Constraints`, which apply only to that subcommand or group.
- A node can only add constraints, so a root with mixed audiences keeps only the shared ones in `MasterConstraints`. For example, `/account` keeps TOS there, and nodes that need registration add it.
- Common constraints (registered, TOS, admin) are exposed by a small DI service, such as `CommonConstraints`, so both command and node bases can use them. Custom constraints are created in a constructor or injected during plugin initialization.
- The TOS constraint must accept null `UserData`, because `/account` requires TOS from unregistered users through the temporary agreement.
- A check with alternatives, such as the alias admin role or Discord `Administrator` or bot admin, is one constraint that checks all of them.
- The stricter `admin-role` check (Discord `Administrator` or bot admin) also moves into the alias admin constraint, as a stricter configuration applied to that leaf. No user's access changes.
- No user or message commands exist yet, so those families are out of scope. Components also stay out of scope: [ComponentRouting.md](../ComponentRouting.md) has no automatic account or TOS wrapper.

### Base classes

- `CommandBase` stays as the middle layer and defaults `MasterConstraints` to registered and TOS, so a command that needs less must opt out explicitly.
- `GuestCommandBase` is removed, along with `RequireTOSAcceptance`.
- `AdminCommandBase` and `AliasServerAdminCommandBase` stay as thin presets without their own `Execute` or callback signature. They seal `MasterConstraints` so a derived command cannot drop the access check by accident.
- `AdminCommandBase` keeps its default contexts and integration types, which stay overridable because `AvailableEveryWhereAdminCommand` broadens them.
- `AliasServerAdminCommandBase` uses the order alias admin, registered, TOS, which keeps today's rejection order.

### User data

Core's base fetches `UserData` once and passes it to each constraint and to the callback, so no context type is added and [ADR 0013](0013-CommandCallbackAndPersistence.md)'s "No `CommandContext` record for now" stands. Guest and admin commands already load it today, so this adds no database reads.

Callbacks take `UserData?`, and commands use `data!` where a registered constraint guarantees a value. Separate registered and guest bases were rejected because they would bring back the multiplied class hierarchy. If the registered constraint is missing, a dereference fails through the generic error handler.

### Unchanged

- Contexts, integration types, permissions, and `RunOnDifferentThread` stay per root, because Discord or `CommandResolveService` needs them at that level.
- The root keeps `HandleInteraction`, because component IDs bind to the registered top-level type ([ADR 0004](0004-CommandComponentRouting.md)).
- Alias global/server/admin stay separate top-level commands ([ADR 0008](0008-AliasCommandSplit.md)).

### Scope and sequencing

- Routing, node types, and constraints all live in Core.
- Migrate all `Route*` callers (`AccountCommand`, `LocalCommand`, `CollectionCommand`, `AliasAuditCommand`, `AliasTableInfoCommand`) to nodes, then delete `RouteInfo`, the `Route*` helpers, and their context overloads.
- `LeaderboardCommand` has its own routing and is not migrated here. It belongs to a future refactor after this ADR and [ADR 0013](0013-CommandCallbackAndPersistence.md) are both done.
- Typed option parsing is not part of the first pass.
- This ADR and ADR 0013 are implemented concurrently, since both change the same callback overrides.

## Alternatives considered

- **Immutable tree of records with lambdas** (the 2026-10-31 recommendation): rejected by the owner in favor of node classes.
- **Leaves as ordinary command classes merged into a virtual root:** rejected because it loses type safety and does not match inheritance semantics.
- **Typed registered and guest node bases:** rejected because they multiply the base classes (see [User data](#user-data)).
- **`Children` list of types created through DI or `ActivatorUtilities`:** rejected by the owner in favor of roots creating nodes with `new`, which is simpler, more explicit, and type safe.
- **Generic `SubcommandNode<TRoot>` for component IDs:** rejected because the type parameter spreads to every node and family base, and `typeof(TRoot)` is wrong if `TRoot` is an abstract base.
- **Deferring before throwing on an unmatched path:** rejected by the owner in favor of changing the error handler, which covers every failure before the deferral.
- **Constraints returning a result object for the pipeline to reply:** dropped because `AnyOf`-style composition is not needed, and `CheckHasRegisteredAndReply` already replies itself.

## Open questions

None.

## Future notes

These are notes only, not part of this decision.

- The owner is considering moving this common command infrastructure to a common plugin.
- Per the owner, the analyzer's length checks work only on string properties, not `OneOf<>` values, so node names and descriptions will probably not be length-checked.
- `CommandBase.BasicBuilder` appears to discard root name and description localizations, because each `base.BasicBuilder` access creates a new builder. This comes from reading the code and has not been confirmed at runtime. This refactor keeps the current behavior, and the owner tracks it separately.

## Consequences

- ADR 0010 and ADR 0011 depend on this ADR. They stay Proposed until the owner decides them separately.
- This record supersedes [ADR 0005](0005-AccountCommand.md) on `AccountCommand` deriving from `GuestCommandBase` and using `RequireTOSAcceptance`, on those points only.
- This record supersedes ADR 0008 on `/alias-server-admin` keeping a pre-dispatch check and on `admin-role` keeping an in-callback check, on those points only. Both checks become constraints, which run after routing and the deferral but before the callback. Rejections follow the deferral, so they stay ephemeral because all alias commands are ephemeral.
- ADR 0013 is not superseded. Its [2026-11-05 addendum](0013-CommandCallbackAndPersistence.md#addendum-owner-decisions-2026-11-05) records two changes: the `UserData` parameter becomes `UserData?`, and ADR 0013 is implemented concurrently with this ADR instead of before it.
- Small commands such as `AliasTableInfoCommand` gain several small node classes. Simple code shared by sibling nodes stays a private root member or moves to a service or static helper. A shared opening that can stop early or owns disposable requesters, such as in `AliasAuditCommand`, goes in an abstract family node that seals `Callback` and calls an abstract handler.
- Docs to update on implementation: `RepositoryGuide.md`, `CodingStandards.md`, `ExistingUtilities.md`, and the Core command templates.
