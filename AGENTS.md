# Agent instructions

Keep agent-facing documentation and notes in the repository-root `DocsForLLM/` directory. This file is the discovery entry point.

Keep general guidelines/instructions directly in `DocsForLLM/`, confirmed decisions in `DocsForLLM/ADR/`, and local working notes/proposals in gitignored `DocsForLLM/Notes/`. See `DocsForLLM/README.md` for the index and placement rules. Ignored notes are optional; standing rules and accepted decisions must remain available in tracked documentation.

**Before making repository changes, read `DocsForLLM/RepositoryGuide.md`.** It contains the codebase overview, build commands, development conventions, and submodule boundaries. Paths in that guide are relative to the repository root.

**Before writing or changing code, read `DocsForLLM/CodingStandards.md`.** Follow the established style and local conventions; do not reformat unrelated code.

**Before adding helpers, services, or dependencies, consult `DocsForLLM/ExistingUtilities.md` and inspect relevant implementations/callers.** It indexes Framework/Core utilities and reusable patterns, including their limits, so agents do not duplicate existing functionality.

## Required policy

- **Build only. Never run any project.** Do not start the bot, web hosts, run helpers, migrations, client applications, tests, development servers, or live API/Discord checks. Do not invoke application entry points indirectly through scripts.
- After code changes, build affected projects with `dotnet build`; use `dotnet build "PSLBotMiscPlugins.sln" --configuration Debug --nologo --verbosity minimal` for cross-cutting changes. Build tools may compile/bundle code but must not start applications. Report build success/failure without claiming runtime validation.
- Task-related edits inside the `PSLDiscordBotBase/` Git submodule are allowed when needed. Inspect and report them separately; do not automatically commit either repository, change the parent submodule pointer, or advance the submodule revision.
- Preserve unrelated work and local secret/configuration files. Do not print or commit credentials, edit build outputs directly, or fix unrelated warnings opportunistically.

## Project quick reference

- The root solution is `PSLBotMiscPlugins.sln`; root projects are plugins, API/web/client projects, and run helpers. The `PSLDiscordBotBase/` submodule contains the ASP.NET Core/Discord.NET host and plugin framework, Core commands/business/persistence, and the analyzer/generators.
- Projects use .NET 10/preview C# on Windows. For targeted validation run `dotnet build "<project>.csproj" --configuration Debug --nologo --verbosity minimal`; use the solution command above for cross-cutting work. No automated test project is present.
- Match nearby code: usually tabs, file-scoped namespaces, Allman braces, explicit local types, `_camelCase` fields, and `this.` qualification. Discord commands are keyed singletons, so keep interaction state local; register ASP.NET/plugin services in `Load`, add web assemblies through `AddAssemblyToMvc`, and configure resolved services/middleware in the established `Setup`/MVC pipeline.

## Workflow and context hygiene

### Roles

- **Planning:** Produce a written plan without implementing it. Write it to `DocsForLLM/Notes/` (or `DocsForLLM/ADR/` only for confirmed decisions), then stop; do not orchestrate a long implementation run in the same session.
- **Implementation:** Work on one plan chunk per session. Start by reading only that chunk and the files it lists.
- **Mechanical work:** Delegate DTOs, boilerplate, renames, test scaffolding, and documentation to subagents with narrow instructions.

### Plan file format

- Split work into small chunks. Each chunk must list its goal, likely files, acceptance criteria, and exact build/test verification commands; identify any policy-prohibited commands as owner-run rather than executing them.
- Mark chunks done in the plan file as they are completed so a fresh session can resume from that file alone.

### Context hygiene

- Do not read whole large files when a targeted read or grep is enough.
- Filter permitted noisy commands (for example, `dotnet build 2>&1 | tail -30`; use `dotnet test 2>&1 | tail -50` only where tests are permitted) and inspect full logs only when needed.
- Subagents must return short summaries of findings, file paths, and decisions, never full file contents or raw logs.
- Do not re-explore the repository at session start. Rely on this file for layout, conventions, and commands, and add concise reusable facts that are missing.

### Session boundaries

- After each completed chunk, commit with a clear message, subject to the submodule commit restriction above.
- When a chunk finishes or context approaches 100k tokens, say so and recommend a fresh session. Summarize remaining work in the plan file before stopping.
