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
