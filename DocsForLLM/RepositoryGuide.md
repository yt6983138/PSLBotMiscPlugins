# Repository guidance

All code paths and build commands below are relative to the plugin collection repository root, not this documentation directory. The documentation index and placement rules are in [README.md](README.md#organization).

## Non-negotiable validation policy

The run policy (build only, the offline allowlist, secrets and configuration, commits and the submodule boundary) has its canonical home in [AGENTS.md](../AGENTS.md#required-policy) "Required policy", and that section governs. Read it before running anything.

- **Agents are supervised coding and decision-support assistants, not autonomous operators.** See [PlanningGuidelines.md](PlanningGuidelines.md#supervised-agent-role).
- **Test project:** `PSLDiscordBotBase/PSLDiscordBot.Core.Tests/` is the repository's only test project. It uses the `MSTest` metapackage (version in `PSLDiscordBotBase/Directory.Packages.props`) with the default VSTest runner, so it also runs in Visual Studio Test Explorer, and it tests `CandidateSearch` and `AliasConflictCheck` through their public APIs. Run it only as the `AGENTS.md` allowlist permits.

## Start here

The guides, topic guides and decision records (including planning guidance for team-level, operational or product planning) are indexed in [README.md](README.md).

This repository collects plugins for PSLDiscordBot, a Phigros Score Lookup Discord bot. The core bot is itself a plugin; the executable host lives in the framework. The root solution is `PSLBotMiscPlugins.sln`.

Read the relevant source alongside:

- `PSLDiscordBotBase/README.md`: bot overview and documentation links.
- `PSLDiscordBotBase/Documentation/Developing.md`: build/runtime prerequisites, architecture, plugin lifecycle, and command development. Its project/build paths are relative to the submodule root.
- `PSLDiscordBotBase/Documentation/usage.md`: user-facing behavior. Help text is not in this repository: it lives in the translations repository as `Documentations/{locale}.json`, each holding one `"help"` key; see [Localization.md](Topics/Localization.md#rules).
- `PhigrosApi/doc/`: handwritten API documentation.

Prefer the checked-out source and project files over outdated documentation or external summaries.

## Codebase map

| Directory | Responsibility |
| --- | --- |
| `PSLDiscordBotBase/PSLDiscordBot.Framework/` | ASP.NET Core host, Discord clients, DI, plugin discovery, command dispatch, localization primitives, and shared utilities. |
| `PSLDiscordBotBase/PSLDiscordBot.Core/` | `PSLPlugin`, Phigros business logic, account/TOS checks, commands, SQLite persistence, song data, localization defaults, and image generation. |
| `PSLDiscordBotBase/PSLDiscordBot.Analyzer/` | Roslyn analyzer and localization-key source generator. Other interface generation uses Antelcat.AutoGen. |
| `PSLDiscordBotBase/CoreRunHelper/` | Debug launcher that prepares assets/data and plugin files before calling the framework. Reference only; never run it. |
| `AdminHelper/` | Admin commands (including `alias-admin`, which edits a raw alias table by table id: the only way to edit the hidden avatar table), blacklist rules, command statistics, maintenance/shutdown notifications, backups, and bug-report storage/web UI. Depends on Core. |
| `LocalizationTool/` | Console tool (`export`, `import-csv`, `build-csv`; System.CommandLine) and bot plugin hosting `/csv-to-localization`, `/localization-to-csv`, `/localization-key-check` (moved from AdminHelper). Layout: `Formats/` (flat language file, CSV), `Validation/` (key roles, placeholder signatures, validator), `Commands/`, and `key-roles.json` (role overrides) at the project root. Depends on Core. Logging via `Microsoft.Extensions.Logging` console to stderr (global `--verbose` = Debug; default Information); stdout holds only reports. Run it only as the AGENTS.md allowlist permits. |
| `FunPlugin/` | `/poke` and `/bonk`, with weighted configurable messages and attachments. Depends on Core. |
| `PhigrosApi/` | HTTP wrapper around PhigrosLibraryCSharp for cloud/local saves and QR-code login; OpenAPI and custom request/response formatters. Depends on Core and the client build. |
| `PhigrosApi.Client.Javascript/` | Checked-in OpenAPI-generated TypeScript fetch client, documentation, and browser bundle/declaration build. |
| `PersonalWebsite/` | MVC website, blog service, static frontend, and Phigros tools consuming the client. References the API project in Debug. |
| `PhigrosLoginHost/` | TapTap China login proxy and associated web assets. Has a standalone debug entry point; never run it. |
| `MinimalDependency/` | Minimal token/configuration and Discord logging plugin for framework-only use, without Core business services. |
| `VerifierAndBanner/` | Server verification, role assignment, and anti-raid bans; requests the MessageContent gateway intent. Depends on Framework only. |
| `MigratorPlugin/` | Alias-data migration attached to initialization. Its copied plugin metadata does not describe its actual behavior. Never execute it. |
| `SaveArchiveProgram/` | `SaveArchiveService` (the archive storage location and format used by `TransferToChinaCommand` and `LocalSaveArchiveProvider`; its consent and queue members `TryAgreeTerms` and `EnqueueArchive` are unused leftovers since `/archive-save` was removed), `/transfer-to-china` (`TransferToChinaCommand`), and `/local-import-archive` (`LocalImportArchiveCommand`, `LocalSaveArchiveProvider`). Depends on Core and the private upload package; see [ChinaSaveTransfer.md](Topics/ChinaSaveTransfer.md). |
| `AdminHelperRunHelper/`, `PhigrosApiRunHelper/`, `PersonalWebsiteRunHelper/`, `ArchiveProgramRunHelper/` | Launchers that stage plugin DLLs and chain into CoreRunHelper. Never run them. |

## Build checks

- Use the .NET 10 SDK. Application/plugin projects target `net10.0`; the analyzer targets `netstandard2.0`. Several projects enable preview C# features. Do not downgrade their target framework or language version.
- The full solution and API/website projects also require Node.js/npm and the Visual Studio JavaScript SDK used by the `.esproj`.
- Windows is the established development environment: the framework has a Windows-command prebuild step. Do not assume builds are platform-independent.
- NuGet versions use central package management: add or change them in `Directory.Packages.props` (root and submodule), not in `.csproj` files; shared build properties live in `Directory.Build.props`.
- `Tools/Deploy/` is the owner-run build/deploy tooling ([Tools/Deploy/README.md](../Tools/Deploy/README.md)). Agents must never run `Deploy.ps1` or touch a deploy target.

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
- Debug Core code references an ignored `Secret.cs`. If local secret definitions are missing, report the build prerequisite and do not modify tracked code to bypass it (credential rules: [AGENTS.md](../AGENTS.md#required-policy)). Release reads the bot token from configuration.
- Build targets can modify output folders: CoreRunHelper's compile target removes its output directory, and API/website builds copy client output into `wwwroot/swagger/PhigrosApi/`. Inspect Git status afterward; do not commit incidental generated changes.
- A Debug solution build succeeded on 2026-10-22 with existing warnings, including ImageSharp vulnerability advisories, nullability diagnostics, and `.esproj` reference-resolution warnings. Warnings are not build failures, but security advisories should not be hidden.

## Plugin and host conventions

Primary references under `PSLDiscordBotBase/PSLDiscordBot.Framework/`: `IPlugin.cs`, `Program.cs`, and `BuiltInServices/PluginResolveService.cs`.

- Plugin contract, discovery, `Priority` order, `Load`/`Setup`/`Unload` lifecycle, MVC registration and the no-DI-registration rule: [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#the-plugin-system).
- Preserve the dependency direction: plugins may depend on Framework/Core; Framework must remain independent of concrete bot/plugin implementations. Its analyzer reference is build-time infrastructure.
- Configuration uses existing options sections: `Config` (Core), `AdminConfig`, `FPConfig`, `LoginHostConfig`, `PersonalWebsiteConfig`, `MinimalPlugin`, and `VABConfig`. Preserve section/property names unless a configuration migration is explicitly part of the task.

## Discord command conventions

References: `PSLDiscordBotBase/PSLDiscordBot.Framework/CommandBase/`, `PSLDiscordBotBase/PSLDiscordBot.Framework/BuiltInServices/CommandResolveService.cs`, and `PSLDiscordBotBase/PSLDiscordBot.Core/Command/Global/Base/`.

- Discoverable commands inherit the appropriate command base and have `[AddToGlobal]`. The framework registers them as keyed singletons; do not retain per-interaction mutable state on command instances.
- Follow `PSLDiscordBotBase/PSLDiscordBot.Core/Command/Global/Template/` or a nearby plugin command; the flat-command members are described in [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#the-inheritance-pattern). For command-owned buttons/selects, also read [ComponentRouting.md](Topics/ComponentRouting.md) and the unregistered `Template/ComponentCommand.cs` compile example.
- Command pipeline (constraints and `MasterConstraints`, `CreateChildren` nodes, sealed `Execute`, `RootCallback`/`Callback`, nullable `UserData`, deferral and `QuickReply`): [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#the-command-system).
- Routed component callbacks receive the raw interaction without automatic deferral, account/TOS checks, or workflow authorization. The command must acknowledge and authorize each action; component pipelines use the same `ILifetimeService.Track` task tracking and shutdown conventions as other commands rather than a separate resolver lifecycle service.
- Autocomplete (single reply, cancel-only hooks, in-memory handlers, suggestion limits): [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#autocomplete).
- Admin commands default to BotDm context, but derived commands can broaden it. Preserve both runtime admin checks and the intended command context/integration settings.
- Preserve existing localization helpers, `OneOf<string, LocalizedString>`, and Discord name/description constraints. Localization rules (key declarations, `Generate()` defaults, English ownership, pipeline): [Localization.md](Topics/Localization.md).

## Web/client and persistence conventions

- Preserve API routes, content types, OpenAPI attributes, camelCase response envelopes (`success`/`data`), and error-code/status mappings. `PhigrosApi/Controllers/CustomControllerBase.cs` defines the shared API contract.
- `PhigrosLoginHost` uses snake_case for TapTap compatibility; do not impose the API's camelCase rules on the proxy.
- Existing admin/website endpoints perform their own credential checks. Framework endpoint mapping permits anonymous access; do not assume ASP.NET authorization replaces those checks.
- Client APIs/models/runtime and their docs carry generator headers. Do not hand-edit generated artifacts for an unrelated change or blindly overwrite them during regeneration. Preserve the checked-in `...RequestOpts` helpers exposed by client APIs.
- `PhigrosApi.Client.Javascript/generate.cmd` consumes a live localhost OpenAPI endpoint. Never start the API to run it. If regeneration is needed, ask for a saved schema and preserve existing client customizations; ordinary builds only compile the checked-in client.
- Blog Markdown in `PersonalWebsite/Blogs/` has matching `.summary.json` metadata. Keep these paired when changing blog content.
- Requester per operation and the explicit `SaveChangesAsync` save contract: [Developing.md](../PSLDiscordBotBase/Documentation/Developing.md#the-inheritance-pattern).
- Preserve consent, TOS, visibility, and admin safeguards around user tokens, reports, saves, and archives. Do not modify runtime databases, archives, or backup files as part of build validation.

## Editing style and boundaries

- Match the surrounding file: file-scoped namespaces, Allman braces, usually tab indentation, explicit types, target-typed `new`, `_camelCase` private fields, and `this.` qualification. Keep existing line endings and avoid whole-file formatting churn.
- `PSLDiscordBotBase/.editorconfig` applies inside the submodule; it is not inherited by sibling plugin directories. Respect it when editing Core/Framework code.
- Keep nullable annotations and service lifetimes consistent. Prefer existing utilities and logging patterns over new parallel abstractions.
- Do not edit `bin/`, `obj/`, `out/`, `node_modules/`, generated bundles/declarations, or copied swagger client assets directly. Treat minified/vendor assets under `wwwroot` as third-party content unless the task explicitly concerns them.
- `Secret.cs`, launch profiles, and local runtime settings: use tracked configuration definitions to understand the shape. Credential handling is in [AGENTS.md](../AGENTS.md#required-policy).
- `PSLDiscordBotBase/` is a separate Git submodule; the edit, commit and gitlink rules are in [AGENTS.md](../AGENTS.md#required-policy). Inspect its changes separately with `git -C PSLDiscordBotBase status --short`.
- Do not update submodule documentation opportunistically. Report new source/documentation conflicts; when their correction is in scope, fix the source guide rather than maintaining a separate conflicting corrections list.
