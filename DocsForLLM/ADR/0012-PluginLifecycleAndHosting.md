# ADR 0012: Plugin lifecycle and hosting

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=289102272)
- **Frozen:** 2026-11-08
- **Recorded:** 2026-10-31.
- **Source:** Owner planning session and the owner's "Refactor #2" draft on 2026-10-31.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

`IPlugin` has void `Load`/`Setup`/`ConfigureDiscordClient`/`Unload`. The plugin resolver builds plugins with `Activator.CreateInstance` (parameterless constructor), so fields set in `Load` need null suppressions. Plugins and services depend directly on `Program` (`Program.Instance`, its void lifecycle hooks, its cancellation source, `RunningTasks`, program arguments). `IHostApplicationLifetime`/`IHostedService` are unused, `ICoFramework` has no users, and `RunWithTaskOnEnd` takes an `Action<Exception>`, which turns async error callbacks into `async void`. Every plugin carries a hand-maintained `Version` that only appears in load/unload log lines.

## Decision

- **`Load`/`Setup` split.** Services do not exist before the host is built, so a `Load` that runs before `Build` cannot create a plugin whose fields are resolved from DI. Plugins therefore implement `IPlugin<TSelf> : IPlugin`:
  - Static `Load(WebApplicationBuilder)` runs before `Build`, has no instance, and only registers services. Plugins no longer register themselves in DI.
  - Static `Setup(WebApplication)` runs after `Build` and creates the plugin, so DI-resolved fields are set at construction and their null suppressions go away. Fields assigned later by Discord events (for example on `Ready`) stay nullable or `null!`.
  - Instance `Unload` stays.
- **Static descriptive members.** `Name`, `Description`, `Author`, and `Priority` are `static abstract` properties, so the compiler enforces them and the resolver can read them before any instance exists. The resolver builds a typed descriptor once per plugin, so everything after discovery is typed.
- **Async lifecycle.** `Setup`, `Load`, and `Unload` return `Task`.
- **`ConfigureDiscordClient` is removed.** Plugins configure the Discord client through options in `Load`. `Load` still runs in priority order, so the last token written wins.
- **No hand-maintained versions.** Remove `IPlugin.Version`. The resolver logs the plugin assembly's informational version, which includes the commit hash (existing builds, including Release `linux-x64`, already include it). No `<Version>` is added to project files.
- **Each assembly holds one plugin.** This is a convention only; there is no check, neither enforcement nor a warning.
- **Lifetime service.** A lifetime service replaces direct `Program` dependencies. The Framework provides only the mechanism: tracking of running work, a read-only running-task count, stopping the application (ending in `IHostApplicationLifetime.StopApplication()`), program arguments and argument receivers, and the `ShutdownRequested`, `AfterMainInitialize`, and `BeforeMainExiting` events.
- **Soft-shutdown policy stays in AdminHelper.** `ShutdownService` in AdminHelper keeps the policy: status gating, cancellation, progress, and notifications. A deployment without AdminHelper has no drain.
- **Tracking.** `ILifetimeService.Track(Task, Func<Exception, Task>? onError)` replaces `RunWithTaskOnEnd`. `onError` is awaited before cleanup and the tracked entry is the whole wrapper, so a drain also waits for error handlers. No `async void` error lambdas remain at dispatch.
- **Synchronous throws in command dispatch.** When `RunOnDifferentThread` is false, command execution is started inside an async wrapper, so a synchronous throw reaches the error hooks and the task is tracked like any asynchronous failure. Before this, such a throw escaped before the task wrapper existed.
- **Custom `IHostLifetime` replaces `ConsoleLifetime`.**

  | Signal | Behaviour |
  |---|---|
  | SIGINT, SIGTERM | Cancel the default handling, then raise `ShutdownRequested` without blocking. AdminHelper handles it by running its soft shutdown. With no subscriber, stop the application directly. |
  | SIGQUIT | Log critical, then fail fast. |
  | Repeat signal during a drain | Ignored. |
  | SIGTERM on Windows | The handler must block, or the process dies when it returns (`ConsoleLifetime` does the same). Local development only. |

  Without this, a Ctrl-C drain works only because AdminHelper's blocking `CancelKeyPress` handler runs before ASP.NET's; SIGTERM does not drain at all. The blocking `CancelKeyPress` handler remains until the replacement exists. There is no drain timeout. Signals are sent by hand, and SIGQUIT is the escalation when a drain hangs.
- **Plugin state services; plugins leave DI.** State that other components read from plugin instances (`AdminUser` and `AdminDM` in Core, `NotificationChannel` in AdminHelper) moves into small services. Nothing resolves or injects a plugin type.
- **Async hooks and events.** Lifecycle hooks and event handlers become async (Discord.Net handlers return `Task`). A source generator in `PSLDiscordBot.Analyzer` generates async events and removes the add/remove boilerplate. Handlers run sequentially in subscription order, and an exception is reported without stopping later handlers. Events whose raiser cannot await (the `StatusChanged` setter) are not converted.
- **Exception boundary for handlers that cannot return `Task`.** This covers events whose signature we do not control, such as third-party library events (`Console.CancelKeyPress`, PuppeteerSharp console events). A synchronous handler stays as it is, with no added boundary. An `async void` handler wraps its entire body in a try/catch, so no exception escapes it. Shutdown signals no longer need this rule, because the custom `IHostLifetime` handles them.
- **`UnloadAll` catches per plugin.** It logs the exception and continues, so one throwing `Unload` does not skip later plugins. This is the only failure handling the plugin resolver adds: failures in discovery, `Load`, and `Setup` are not caught, because they usually mean bad configuration and a crash with a stack trace is the intended result.
- **Remove `ICoFramework`.**

## Rejected alternatives

- **Static factory `LoadAsync`.** Plugins would implement `IPlugin<TSelf>` with `static abstract Task<TSelf> LoadAsync(...)`, taking the same inputs as the old `Load` and building the instance itself. Replaced by the `Load`/`Setup` split, because a factory that runs before `Build` cannot resolve DI-provided fields.
- **`ConfigureDiscordClient` as an optional hook** (hosted by the lifetime service). Replaced by configuring the client through options in `Load`.
- **Soft shutdown in the lifetime service.** Replaced by keeping the policy in AdminHelper and only the mechanism in the Framework.
- **`ConcurrentBag` for event handlers.** It cannot remove a specific handler (handlers use copy-on-write snapshots instead).

## Consequences

- Replaces the parameterless-constructor rule in [RepositoryGuide.md](../RepositoryGuide.md) and [CodingStandards.md](../CodingStandards.md); those documents are updated when this is implemented.
- Takes up the lifecycle work that [ADR 0004](0004-CommandComponentRouting.md) deferred. ADR 0004 is not changed by this record.
- Breaking changes to the plugin API are accepted; the owner is the only framework user.
- All plugins, including `PSLPlugin` and the root plugins, change together.

## Open questions

None.

## Revisions

- 2026-11-15: addenda of 2026-11-07 folded into the body; pre-fold text at `bed70fd`.
