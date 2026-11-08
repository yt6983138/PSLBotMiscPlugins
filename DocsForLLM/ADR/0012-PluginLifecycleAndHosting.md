# ADR 0012: Plugin lifecycle and hosting

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=289102272)
- **Recorded:** 2026-10-31.
- **Source:** Owner planning session and the owner's "Refactor #2" draft on 2026-10-31.

See the addendum: parts of this decision were realized differently.

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

## Addendum (2026-11-07)

This addendum amends the decision above. Where it disagrees with the original text, the addendum applies. `Status` stays `Accepted`.

### Changes to the decision

- **`Load`/`Setup` split replaces the `LoadAsync` factory.** Services do not exist before the host is built, so a `Load` that runs before `Build` cannot create a plugin whose fields are resolved from DI. The plugin shape is:
  - `IPlugin` keeps the instance member `Task Unload(WebApplication host, bool isSafeUnload)`.
  - `IPlugin<TSelf> : IPlugin where TSelf : IPlugin<TSelf>` declares `static abstract` `Name`, `Description`, `Author`, and `Priority`.
  - `static abstract Task Load(WebApplicationBuilder builder)` runs before `Build`, has no instance, and only registers services. `AddAssemblyToMvc(this)` becomes `AddAssemblyToMvc<T>()`, and plugins no longer register themselves with `AddSingleton(this)`.
  - `static abstract Task<TSelf> Setup(WebApplication host)` runs after `Build` and creates the plugin, so DI-resolved fields are set at construction and their null suppressions go away. Fields assigned later by Discord events (for example on `Ready`) keep `null!` or nullable, because they are set on Discord's `Ready` rather than at startup.
  - The original decision's other points (static descriptive members, async lifecycle, removal of `IPlugin.Version`) stand.
- **`ConfigureDiscordClient` is removed instead of becoming an optional hook.** Plugins call `builder.Services.Configure<DiscordClientServiceConfig>(...)` in `Load`. `DiscordClientService` takes `IOptions<DiscordClientServiceConfig>` and is a normal singleton. `Load` still runs in priority order, so the last token written wins. The lifetime service no longer hosts any such hook.
- **Soft-shutdown policy stays in AdminHelper; the mechanism is in the Framework.** The original decision gave the soft shutdown to the lifetime service. Instead, `ShutdownService` in AdminHelper keeps the policy: status gating, cancellation, progress, and notifications. The Framework `ILifetimeService` provides only the mechanism: `Track`, a read-only running-task count, `StopAsync` (ending in `IHostApplicationLifetime.StopApplication()`), `ProgramArguments`, `AddArgReceiver`, `ShutdownRequested`, `AfterMainInitialize`, and `BeforeMainExiting`. A deployment without AdminHelper has no drain.

### Additions

- **Custom `IHostLifetime` replaces `ConsoleLifetime`.**

  | Signal | Behaviour |
  |---|---|
  | SIGINT, SIGTERM | Set `context.Cancel = true`, then raise `ShutdownRequested` without blocking. AdminHelper handles it by running its soft shutdown. With no subscriber, call `StopApplication()` directly. |
  | SIGQUIT | Log critical, then `Environment.FailFast`. |
  | Repeat signal during a drain | Ignored. |
  | SIGTERM on Windows | The handler must block, or the process dies when it returns (`ConsoleLifetime` does the same). Local development only. |

  Without this, a Ctrl-C drain works only because AdminHelper's blocking `CancelKeyPress` handler runs before ASP.NET's, so ASP.NET waits for it; SIGTERM does not drain at all. The blocking `CancelKeyPress` handler must remain until the replacement exists.
- **Plugin state services; plugins leave DI.** State that other components read from plugin instances (`AdminUser` and `AdminDM` in Core, `NotificationChannel` in AdminHelper) moves into small services. Nothing resolves or injects a plugin type.
- **`Track`.** `ILifetimeService.Track(Task task, Func<Exception, Task>? onError)` replaces `RunWithTaskOnEnd`. `onError` is awaited before cleanup, and the tracked entry is the whole wrapper, so a drain also waits for error handlers. No `async void` error lambdas remain at dispatch.
- **Synchronous-throw defect in command dispatch.** When `RunOnDifferentThread` is false, `command.Execute` is invoked directly at the four dispatch sites in `CommandResolveService`. A synchronous throw from it escapes before the task wrapper exists, so the error hooks never run and the task is never tracked. `Execute` is started inside an async wrapper instead, so synchronous throws reach the error hooks like asynchronous ones.
- **`UnloadAll` catches per plugin.** It logs the exception and continues, so one throwing `Unload` does not skip later plugins. This is the only failure handling the plugin resolver adds: failures in discovery, `Load`, and `Setup` are not caught, because they usually mean bad configuration and a crash with a stack trace is the intended result.
- **Event handlers.** Handlers run sequentially in subscription order, and an exception is reported without stopping later handlers. Events whose raiser cannot await (the `StatusChanged` setter) are not converted.

### Answers to the open questions

1. **Calling static members of a runtime-only type.** The resolver calls `MakeGenericMethod` once per plugin to build a typed descriptor (`Name`, `Description`, `Author`, `Priority`, assembly, `Load`, `Setup`). Everything after that is typed.
2. **Exception boundary for handlers that cannot return `Task`.** This covers events whose signature we do not control, such as those of third-party libraries, and any other event that cannot be awaited. A synchronous handler stays as it is, with no added boundary. An `async void` handler wraps its entire body in a try/catch, so no exception escapes it. Shutdown signals no longer need this rule: the custom `IHostLifetime` handles them, `ShutdownRequested` is raised without blocking, and there is no drain timeout. Signals are sent by hand, and SIGQUIT is the escalation when a drain hangs.
3. **More than one plugin per assembly.** One plugin per assembly remains a convention. There is no check, neither enforcement nor a warning.
4. **Commit hash in the informational version.** Existing builds already include the commit hash in the informational version, including Release `linux-x64`. The resolver logs it; nothing else is needed.
