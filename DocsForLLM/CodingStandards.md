# Agent coding standards

These standards codify patterns in the checked-out Framework, Core, and sibling plugins, reviewed on 2026-10-23. Apply them to new and changed code; they are not a request to reformat the repository or reproduce every legacy workaround.

Read [RepositoryGuide.md](RepositoryGuide.md) for architecture, safety boundaries, and build commands. Consult [ExistingUtilities.md](ExistingUtilities.md) before introducing helpers, services, or dependencies.

## Before editing

1. Read the target file and nearby implementations of the same responsibility, not just a template.
2. Respect applicable agent instructions and `.editorconfig`. Source/project files determine available APIs; this guide supplies defaults where local conventions are not more specific.
3. Search existing utilities **and their callers**. Check visibility, project references, lifetime, nullability, error handling, and disposal before reusing an API.
4. Keep the patch focused. Do not rename established symbols, change wire/configuration contracts, modernize unrelated syntax, upgrade packages, or run whole-repository formatting for consistency.

## C# formatting and naming

| Area | Convention |
| --- | --- |
| Indentation | Tabs, displayed at width 4, for new handwritten C# application/plugin code. Preserve an existing file's indentation rather than causing formatting churn. |
| Line endings | Preserve existing endings and final-newline behavior. `PSLDiscordBotBase/.editorconfig` specifies CRLF and no inserted final newline for C#; it does **not** apply to sibling plugin directories. |
| Namespaces | File-scoped namespaces matching the project/folder, with `using` directives outside the namespace. |
| Imports | Follow the file's existing ordering. Do not impose System-first groups or a new sorting policy. Framework (a single `PSLDiscordBot.Analyzer.AsyncEventHelper` import), Core, and AdminHelper have project-local `GlobalUsings.cs`; their global imports are not inherited by referencing projects. |
| Braces | Allman braces for declarations and multiline blocks. Short single-line guards such as `if (context is null) return;` are established style; use braces for multiline bodies. |
| Types | Explicit local/iteration types, including when the RHS makes the type apparent. Use `var` where an anonymous type requires it or a documented generator convention depends on it. |
| Creation | Target-typed `new(...)` / `new()` and collection expressions such as `[]` and `[.. source]` when the target type is clear. Do not rewrite existing equivalent expressions just for style. |
| Qualification | Use `this.` for instance fields, properties, methods, and events, including `this._service`. Do not add `this.` to static members. |
| Naming | PascalCase types, methods, properties, and constants; `I`-prefixed interfaces; camelCase parameters/locals; `_camelCase` private fields. Preserve established static-field/event-handler naming in the edited type. |
| Members | Explicit accessibility where appropriate; `readonly` for fields not reassigned. Simple properties/accessors commonly use expression bodies; ordinary methods/constructors generally use blocks. Match the surrounding member layout. |
| Wrapping | Wrap fluent chains, long signatures, initializers, and arguments at meaningful boundaries. Put continuation operators at the start of wrapped lines; use named arguments for ambiguous flags/limits as nearby code does. |

Application projects already use .NET 10 and often preview C#. Primary constructors, `field`-backed properties, `params IEnumerable<T>`, and extension blocks occur in source. Preserve supported syntax; do not downgrade language settings or convert whole types to a newer form unnecessarily. The Analyzer project has its own target/settings.

Useful style references:

- [Framework/Utilities/ScopedSemaphoreSlim.cs](../PSLDiscordBotBase/PSLDiscordBot.Framework/Utilities/ScopedSemaphoreSlim.cs): fields, constructors, guards, and disposable scopes.
- [Core/Command/Global/RecordsCommand.List.cs](../PSLDiscordBotBase/PSLDiscordBot.Core/Command/Global/RecordsCommand.List.cs): localized builders, explicit types, fluent formatting, and utility reuse.
- [FunPlugin/Commands/PokeCommand.cs](../FunPlugin/Commands/PokeCommand.cs): additional constructor injection in a sibling plugin command.
- [PhigrosApi/Controllers/CustomControllerBase.cs](../PhigrosApi/Controllers/CustomControllerBase.cs): controller contracts, records, and structured logging.

These are references for relevant patterns, not blanket endorsements of every implementation detail.

## Architecture and dependency injection

- Keep dependency direction intact: Framework is independent of concrete Core/plugin implementations. Framework-only plugins should not acquire a Core dependency merely for a small convenience helper.
- Plugin entry classes implement `IPlugin<TSelf>`; lifecycle, constructor injection and the no-`Program`/no-DI-registration rules are in [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#the-plugin-system).
- For commands/services, use the existing constructor-injection pattern. Core command bases accept `IServiceProvider` for common dependencies; inject additional services through the derived constructor. Do not replace that pattern repository-wide or create a parallel service locator.
- Reuse registered services, `IDiscordClientService`, and existing options sections. Do not construct duplicate Discord clients, database services, browser pools, or DI containers with `BuildServiceProvider()`.
- Choose lifetimes deliberately. Commands are keyed **singletons**; transient dependencies captured by a singleton do not become per-interaction objects. Scoped dependencies require an appropriate scope, not resolution from the root provider.
- Mutable per-command inputs, users, requesters, streams, and results belong in callback locals or an operation-specific context, not command fields. Shared mutable service state needs the existing synchronization/ownership model.

## Discord commands and localization

- Start with the relevant Core [command template](../PSLDiscordBotBase/PSLDiscordBot.Core/Command/Global/Template/) or nearby plugin command. Discoverable concrete commands use `[AddToGlobal]`; the flat and subcommand-node shapes are described in [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#the-command-system).
- Express access requirements with constraints, never by duplicating checks or bypassing registration, TOS, administrator, visibility or command-specific consent checks; see [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#the-inheritance-pattern). There is no `GuestCommandBase` or `RequireTOSAcceptance`.
- Command nodes stay stateless (long-lived singletons). `Autocomplete(context)` overrides follow [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#autocomplete).
- Core bases defer before the callbacks; do not defer/respond a second time ([Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#the-inheritance-pattern)). Framework-only basic command bases do not supply Core's checks or automatic deferral.
- Component callbacks are raw `HandleInteraction` operations: they must enforce workflow ownership/resource authorization, acknowledge or defer promptly, and keep per-interaction state out of singleton command fields. Routing identity is not user authorization, and the Framework does not repeat Core registration/TOS checks or propagate a component cancellation token for every click.
- `QuickReply` is stateless: await and sequence the acknowledgement before later helper calls, and keep any separate-click coordination in the command/workflow. Semantics: the `MessageUtility` row in [ExistingUtilities.md](ExistingUtilities.md#framework-utilities).
- Preserve intended `IsEphemeral`, contexts, integration types, and permissions. `AdminCommandBase` defaults to BotDm, but derived commands can broaden it; runtime administrator checks still matter.
- Reuse Framework option/building helpers and Core's common-option helpers. For nested commands, use subcommand nodes (the `Route*` helpers are removed) instead of searching option trees by hand. For buttons/selects, localize only labels/placeholders/descriptions; custom IDs and option values must remain stable language-independent data and within native Discord limits.
- Keep `OneOf<string, LocalizedString>` and the existing localization/SmartFormat flow. Key declarations, `Generate()` defaults, generated-key and live-file rules: [Localization.md](Topics/Localization.md#adding-or-changing-a-localized-core-string).
- Generator-sensitive declarations and narrow documented suppressions, especially the image-map declarations in `ImageGenerator.cs`, are not routine formatting cleanup. Preserve them unless the task explicitly changes their generation contract.

## Async work, resources, and persistence

- Await asynchronous I/O. Do not introduce `.Wait()`, `.Result`, blocking sleeps, or `async void` into ordinary command/service flows. When an event signature genuinely requires `void`, handle exceptions at that boundary rather than leaving unobserved failures.
- New asynchronous APIs should follow the nearby naming family (normally `Async`); do not rename existing APIs such as `MakePhoto` or `QuickReply` solely to add the suffix. Return `Task.CompletedTask` when a Task-based contract needs no asynchronous work.
- Pass cancellation tokens through APIs that support them, and use existing configured timeouts such as `Config.GetRenderTimeoutCTS()`. Do not invent threads around already asynchronous I/O or bypass the dispatcher's tracked command tasks and shutdown lifecycle.
- Component command tasks use the same `ILifetimeService.Track(task, onError)` pattern as slash, user, and message commands; the async error callback is awaited before the tracked entry ends. Do not add other untracked fire-and-forget work inside `HandleInteraction`; move durable/shared workflow state into an appropriate service rather than the singleton command.
- Use `using` / `await using` according to the resource's actual interface. `ScopedSemaphoreSlim.Scope` uses ordinary `using`, even after `await EnterScopeAsync(...)`; pooled Chromium tabs use `await using`. Keep attachment streams alive until the awaited send completes and account for cleanup on failure.
- Callbacks do not receive a database requester. Open one per operation, never share or retain a `DbContext`, and call `SaveChangesAsync` explicitly; the save contract is in [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#the-inheritance-pattern).

## Logging, errors, and compatibility

- Use the available `ILogger<T>`, or the base logger created through `ILoggerFactory`. Retain relevant `EventId` usage. Console logging is intentional in some host/minimal code, not the default for plugins that already have a logger.
- Prefer structured templates, for example `this._logger.LogWarning("Song {songId} was not found", songId);`, and exception overloads instead of interpolating exceptions into strings.
- Do not introduce logging of tokens, credentials, full command options containing secrets, decrypted saves, or raw request bodies. Some older code does this; it is not a pattern to copy. Flag unrelated sensitive logging separately rather than silently expanding this task.
- Handle expected failures at the appropriate boundary: localized Discord replies for commands; the existing envelope/error mapping for HTTP endpoints. Preserve exception propagation when the global handler must observe an unexpected error. Do not add empty broad catches or global warning suppressions as a fix.
- Preserve routes, content types, status/error codes, serialized property names, database keys, option names, and configuration sections unless their migration is explicitly in scope. Newtonsoft.Json and System.Text.Json both exist; their settings/attributes are not interchangeable.
- `PhigrosApi` uses camelCase response envelopes; `PersonalWebsite`'s controller base and the TapTap proxy use their own snake_case contracts. There is no universal JSON naming policy across plugins.

Source-review note (unchanged): [Core/PSLPlugin.cs](../PSLDiscordBotBase/PSLDiscordBot.Core/PSLPlugin.cs) includes raw command-option values in before-execute/error reporting, and [PhigrosApi/Controllers/LocalSaveController.cs](../PhigrosApi/Controllers/LocalSaveController.cs) logs input and decrypted data in `DecryptNew`. Do not copy these sensitive-data logging patterns; remediation is outside this documentation task.

## Handwritten web code and generated artifacts

- Handwritten website JavaScript uses spaces, same-line braces, PascalCase function names, and camelCase locals, with mixed existing quote styles. Follow the target file; do not apply C# indentation or a new linter/style migration to it.
- Match nearby Razor/HTML/CSS and existing script load order/global APIs. Reuse page helpers or the checked-in TypeScript client where they fit; do not introduce a new frontend framework or duplicate client transport for a small change.
- Client APIs/models/runtime have OpenAPI generator headers. Preserve those boundaries and custom `...RequestOpts` methods. Regeneration requires an owner-supplied saved schema; never start the API to obtain one or execute `generate.cmd` against localhost.
- Do not edit copied bundles/declarations, `bin/`, `obj/`, `out/`, `node_modules/`, or vendor/minified assets directly. Blog Markdown and its `.summary.json` metadata remain paired.

## Completion checklist

- Changes match nearby style without unrelated formatting or renaming.
- Existing utilities/services were checked; any new abstraction has a concrete unmet need and belongs at the narrowest useful layer.
- Lifetimes, nullability, cancellation, disposal, access safeguards, localization keys, and public contracts were considered.
- After **code** changes, build the affected project(s), or the full solution for cross-cutting changes, using [RepositoryGuide.md](RepositoryGuide.md). **Never run anything beyond the offline allowlist in [AGENTS.md](../AGENTS.md) "Required policy".** Documentation-only changes do not require a build.
- Documentation affected by the change was updated, including the removed-symbol search and the durable-docs rules in [PlanningGuidelines.md](PlanningGuidelines.md#documentation-and-open-questions).
- Inspect parent and submodule Git status separately; preserve unrelated work and report build results/warnings without claiming runtime validation.
