# Repository guidance

All code paths and build commands below are relative to the plugin collection repository root, not this documentation directory. Keep agent-facing documentation and notes in `DocsForLLM/`.

## Non-negotiable validation policy

- **Agents are supervised coding and decision-support assistants, not autonomous operators.** Do not respond to users or send/publish announcements on the owner's behalf; provide drafts for the owner. Actions outside requested coding and decision support must go through the owner first. See `PlanningContext.md` for the full supervision boundary.
- **Build only. Never run any project.** Do not start the Discord bot, web hosts, run helpers, migrations, or client applications, even for a smoke test or to obtain an OpenAPI document.
- Do not use `dotnet run`, `dotnet watch`, `dotnet test`, compiled executables/DLLs, test runners, development servers, browser automation, or live API/Discord requests for validation. Do not invoke application entry points indirectly through scripts.
- After code changes, build the affected projects and report whether the build succeeded. Use a solution build for cross-cutting changes. Do not claim runtime behavior was tested.
- Build-tool execution (MSBuild, TypeScript compilation, bundling, and declaration generation) is allowed. If a build requires starting an application, stop and report the blocker instead.
- Keep changes focused on the request. Report unrelated warnings or problems rather than silently fixing them, upgrading dependencies, or suppressing diagnostics.

## Start here

For team-level, operational, or product planning, also read `PlanningContext.md`. It records owner-confirmed context and unresolved questions; proposals are not authorization to implement them.

This repository collects plugins for PSLDiscordBot, a Phigros Score Lookup Discord bot. The core bot is itself a plugin; the executable host lives in the framework. The root solution is `PSLBotMiscPlugins.sln`.

Read the relevant source alongside:

- `PSLDiscordBotBase/README.md`: bot overview and documentation links.
- `PSLDiscordBotBase/Documentation/Developing.md`: build/runtime prerequisites, architecture, plugin lifecycle, and command development. Its project/build paths are relative to the submodule root.
- `PSLDiscordBotBase/Documentation/help.md`: user-facing behavior.
- `PhigrosApi/doc/`: handwritten API documentation.

Prefer the checked-out source and project files over outdated documentation or external summaries.

For coding tasks, also read:

- [CodingStandards.md](CodingStandards.md): source-based style, naming, DI/lifetime, async/resource, localization, and compatibility conventions for agents.
- [ExistingUtilities.md](ExistingUtilities.md): reuse-first catalogue of Framework/Core utilities, services, and patterns, with source links and important contracts/limits. Inspect current implementations and callers before adding a parallel helper.

## Codebase map

| Directory | Responsibility |
| --- | --- |
| `PSLDiscordBotBase/PSLDiscordBot.Framework/` | ASP.NET Core host, Discord clients, DI, plugin discovery, command dispatch, localization primitives, and shared utilities. |
| `PSLDiscordBotBase/PSLDiscordBot.Core/` | `PSLPlugin`, Phigros business logic, account/TOS checks, commands, SQLite persistence, song data, localization defaults, and image generation. |
| `PSLDiscordBotBase/PSLDiscordBot.Analyzer/` | Roslyn analyzer and localization-key source generator. Other interface generation uses Antelcat.AutoGen. |
| `PSLDiscordBotBase/CoreRunHelper/` | Debug launcher that prepares assets/data and plugin files before calling the framework. Reference only; never run it. |
| `AdminHelper/` | Admin commands, blacklist rules, command statistics, maintenance/shutdown notifications, backups, and bug-report storage/web UI. Depends on Core. |
| `FunPlugin/` | `/poke` and `/bonk`, with weighted configurable messages and attachments. Depends on Core. |
| `PhigrosApi/` | HTTP wrapper around PhigrosLibraryCSharp for cloud/local saves and QR-code login; OpenAPI and custom request/response formatters. Depends on Core and the client build. |
| `PhigrosApi.Client.Javascript/` | Checked-in OpenAPI-generated TypeScript fetch client, documentation, and browser bundle/declaration build. |
| `PersonalWebsite/` | MVC website, blog service, static frontend, and Phigros tools consuming the client. References the API project in Debug. |
| `PhigrosLoginHost/` | TapTap China login proxy and associated web assets. Has a standalone debug entry point; never run it. |
| `MinimalDependency/` | Minimal token/configuration and Discord logging plugin for framework-only use, without Core business services. |
| `VerifierAndBanner/` | Server verification, role assignment, and anti-raid bans; requests the MessageContent gateway intent. Depends on Framework only. |
| `MigratorPlugin/` | Alias-data migration attached to initialization. Its copied plugin metadata does not describe its actual behavior. Never execute it. |
| `SaveArchiveProgram/` | `/archive-save` enrollment/consent, background archive queue, and hashed cloud-save archive files. Depends on Core. |
| `AdminHelperRunHelper/`, `PhigrosApiRunHelper/`, `PersonalWebsiteRunHelper/` | Launchers that stage plugin DLLs and chain into CoreRunHelper. Never run them. |

## Build checks

- Use the .NET 10 SDK. Application/plugin projects target `net10.0`; the analyzer targets `netstandard2.0`. Several projects enable preview C# features. Do not downgrade their target framework or language version.
- The full solution and API/website projects also require Node.js/npm and the Visual Studio JavaScript SDK used by the `.esproj`.
- Windows is the established development environment: the framework has a Windows-command prebuild step. Do not assume builds are platform-independent.

Run commands from the repository root:

```powershell
# Example targeted plugin build; choose the project actually affected.
dotnet build "FunPlugin/FunPlugin.csproj" --configuration Debug --nologo --verbosity minimal

# Framework/core changes can affect every plugin.
dotnet build "PSLBotMiscPlugins.sln" --configuration Debug --nologo --verbosity minimal

# Client-only build, without starting a server or executing the bundle.
dotnet build "PhigrosApi.Client.Javascript/PhigrosApi.Client.Javascript.esproj" --configuration Debug --nologo --verbosity minimal
```

- Debug is the default check. Build Release too when the change affects conditional compilation, packaging, or configuration-specific references.
- Builds restore dependencies automatically. Use `--no-restore` only when the required restore is already available.
- The client `.esproj` runs TypeScript compilation, Browserify, and dts-bundle-generator. It does **not** regenerate the API client. There is no `npm run build` script, and `npm test` is a failing placeholder, not a test suite.
- Debug Core code references an ignored `Secret.cs`. If local secret definitions are missing, report the build prerequisite; do not invent credentials or modify tracked code to bypass it. Release reads the bot token from configuration.
- Build targets can modify output folders: CoreRunHelper's compile target removes its output directory, and API/website builds copy client output into `wwwroot/swagger/PhigrosApi/`. Inspect Git status afterward; do not commit incidental generated changes.
- A Debug solution build succeeded on 2026-10-22 with existing warnings, including ImageSharp vulnerability advisories, nullability diagnostics, and `.esproj` reference-resolution warnings. Warnings are not build failures, but security advisories should not be hidden.

## Plugin and host conventions

Primary references under `PSLDiscordBotBase/PSLDiscordBot.Framework/`: `IPlugin.cs`, `Program.cs`, and `BuiltInServices/PluginResolveService.cs`.

- Plugins implement `IPlugin` and must be constructible by reflection without constructor arguments. Use the existing metadata and priority conventions; **lower `Priority` runs earlier**.
- Discovery loads DLLs in `./Plugins/` and its immediate subdirectories, not arbitrary recursive descendants. Files/directories beginning with `__` are ignored.
- Lifecycle: register services in `Load(WebApplicationBuilder)`; configure token/intents in `ConfigureDiscordClient`; the framework builds the host; `AfterPluginsLoaded` fires; resolve services/hook events in `Setup(WebApplication)`; `Unload` handles cleanup.
- Register web plugin assemblies with `AddAssemblyToMvc`. Contribute middleware through `IMvcConfigurationService` at the appropriate stage rather than adding a separate production host.
- Preserve the dependency direction: plugins may depend on Framework/Core; Framework must remain independent of concrete bot/plugin implementations. Its analyzer reference is build-time infrastructure.
- Configuration uses existing options sections: `Config` (Core), `AdminConfig`, `FPConfig`, `LoginHostConfig`, `PersonalWebsiteConfig`, `MinimalPlugin`, and `VABConfig`. Preserve section/property names unless a configuration migration is explicitly part of the task.

## Discord command conventions

References: `PSLDiscordBotBase/PSLDiscordBot.Framework/CommandBase/`, `PSLDiscordBotBase/PSLDiscordBot.Framework/BuiltInServices/CommandResolveService.cs`, and `PSLDiscordBotBase/PSLDiscordBot.Core/Command/Global/Base/`.

- Discoverable commands inherit the appropriate command base and have `[AddToGlobal]`. The framework registers them as keyed singletons; do not retain per-interaction mutable state on command instances.
- Follow `PSLDiscordBotBase/PSLDiscordBot.Core/Command/Global/Template/` or a nearby plugin command. Implement `PSLName`, `PSLDescription`, `CompleteBuilder`, and `Callback` for Core-based slash commands.
- `CommandBase` requires a registered user and, by default, TOS acceptance. `GuestCommandBase` permits unregistered users. `AdminCommandBase` checks the configured admin ID and skips registration/TOS requirements. Guest/admin callbacks receive nullable user data.
- These bases defer interactions before `Callback`; use existing `QuickReply`/attachment helpers rather than acknowledging the same interaction again.
- Admin commands default to BotDm context, but derived commands can broaden it. Preserve both runtime admin checks and the intended command context/integration settings.
- Preserve existing localization helpers, `OneOf<string, LocalizedString>`, and Discord name/description constraints. For localized Core additions, update key declarations and `LocalizationService.Generate()` defaults, not emitted generated keys or local runtime JSON.

## Web/client and persistence conventions

- Preserve API routes, content types, OpenAPI attributes, camelCase response envelopes (`success`/`data`), and error-code/status mappings. `PhigrosApi/Controllers/CustomControllerBase.cs` defines the shared API contract.
- `PhigrosLoginHost` uses snake_case for TapTap compatibility; do not impose the API's camelCase rules on the proxy.
- Existing admin/website endpoints perform their own credential checks. Framework endpoint mapping permits anonymous access; do not assume ASP.NET authorization replaces those checks.
- Client APIs/models/runtime and their docs carry generator headers. Do not hand-edit generated artifacts for an unrelated change or blindly overwrite them during regeneration. Preserve the checked-in `...RequestOpts` helpers exposed by client APIs.
- `PhigrosApi.Client.Javascript/generate.cmd` consumes a live localhost OpenAPI endpoint. Never start the API to run it. If regeneration is needed, ask for a saved schema and preserve existing client customizations; ordinary builds only compile the checked-in client.
- Blog Markdown in `PersonalWebsite/Blogs/` has matching `.summary.json` metadata. Keep these paired when changing blog content.
- Database services use disposable requester/DbContext instances per operation. Do not keep a DbContext on a singleton command or share one across concurrent operations. Respect each requester's tracking and save/dispose behavior.
- Preserve consent, TOS, visibility, and admin safeguards around user tokens, reports, saves, and archives. Do not modify runtime databases, archives, or backup files as part of build validation.

## Editing style and boundaries

- Match the surrounding file: file-scoped namespaces, Allman braces, usually tab indentation, explicit types, target-typed `new`, `_camelCase` private fields, and `this.` qualification. Keep existing line endings and avoid whole-file formatting churn.
- `PSLDiscordBotBase/.editorconfig` applies inside the submodule; it is not inherited by sibling plugin directories. Respect it when editing Core/Framework code.
- Keep nullable annotations and service lifetimes consistent. Prefer existing utilities and logging patterns over new parallel abstractions.
- Do not edit `bin/`, `obj/`, `out/`, `node_modules/`, generated bundles/declarations, or copied swagger client assets directly. Treat minified/vendor assets under `wwwroot` as third-party content unless the task explicitly concerns them.
- `Secret.cs`, launch profiles, and local runtime settings can contain credentials or machine-specific paths. Do not print, copy, overwrite, or commit their values; use tracked configuration definitions to understand the shape.
- `PSLDiscordBotBase/` is a separate Git submodule. Task-related Core/Framework changes are allowed when needed, but inspect and report its changes separately (`git -C PSLDiscordBotBase status --short`). Do not automatically commit either repository, update the parent gitlink, or advance the submodule with `git submodule update --remote`.
- Do not update submodule documentation opportunistically. Report new source/documentation conflicts; when their correction is in scope, fix the source guide rather than maintaining a separate conflicting corrections list.
