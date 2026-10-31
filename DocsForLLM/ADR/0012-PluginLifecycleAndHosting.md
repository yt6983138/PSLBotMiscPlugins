# ADR 0012: Plugin lifecycle and hosting

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=289102272)
- **Recorded:** 2026-10-31.
- **Source:** Owner planning session and the owner's "Refactor #2" draft on 2026-10-31.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

`IPlugin` has void `Load`/`Setup`/`ConfigureDiscordClient`/`Unload`. The plugin resolver builds plugins with `Activator.CreateInstance` (parameterless constructor), so fields set in `Load` need null suppressions. Plugins and services depend directly on `Program` (`Program.Instance`, its void lifecycle hooks, its cancellation source, `RunningTasks`, program arguments). `IHostApplicationLifetime`/`IHostedService` are unused, `ICoFramework` has no users, and `RunWithTaskOnEnd` takes an `Action<Exception>`, which turns async error callbacks into `async void`. Every plugin carries a hand-maintained `Version` that only appears in load/unload log lines.

## Decision

- **Static factory.** Plugins implement `IPlugin<TSelf> : IPlugin` with `static abstract Task<TSelf> LoadAsync(...)`. It takes the same inputs as today's `Load`, with no `CancellationToken`, and builds the instance itself, so fields are set at construction and null suppressions go away.
- **Static descriptive members.** `Name`, `Priority`, and the other descriptive members become `static abstract` properties, so the compiler enforces them and the resolver can read them before any instance exists.
- **Async lifecycle.** `Setup` and `Unload` return `Task`. `ConfigureDiscordClient` stops being an interface member and becomes an optional hook.
- **No hand-maintained versions.** Remove `IPlugin.Version`. The resolver logs the plugin assembly's informational version, which includes the commit hash. No `<Version>` is added to project files.
- **Each assembly holds one plugin.** How to enforce it is an open question.
- **Lifetime service.** A lifetime service replaces direct `Program` dependencies. It keeps the soft shutdown (wait for running tasks, then cancel) and signals `IHostApplicationLifetime.ApplicationStopping` at the end. It owns `RunningTasks` and the `RunWithTaskOnEnd` async-callback fix, and hosts the `ConfigureDiscordClient` hook.
- **Async hooks and events.** Lifecycle hooks and event handlers become async (Discord.Net handlers return `Task`). A new source generator in `PSLDiscordBot.Analyzer` generates async events and removes the add/remove boilerplate. Each event is backed by a copy-on-write `ImmutableArray`, with subscribe/unsubscribe through `ImmutableInterlocked` or a compare-exchange loop and invocation over the current snapshot. `ConcurrentBag` is not used, because it cannot remove a specific handler.
- **Remove `ICoFramework`.**

## Open questions

- How the resolver calls the static members of a type known only at runtime (generic helper or reflection).
- Exception boundary for handlers that cannot return `Task` (`Console.CancelKeyPress`, PuppeteerSharp console events).
- Behavior when an assembly contains more than one plugin (enforce or warn).
- Verify that the commit hash appears in the informational version in this repository's builds.

## Consequences

- Replaces the parameterless-constructor rule in [RepositoryGuide.md](../RepositoryGuide.md) and [CodingStandards.md](../CodingStandards.md); those documents are updated when this is implemented.
- Takes up the lifecycle work that [ADR 0004](0004-CommandComponentRouting.md) deferred. ADR 0004 is not changed by this record.
- Breaking changes to the plugin API are accepted; the owner is the only framework user.
- All plugins, including `PSLPlugin` and the root plugins, change together.
