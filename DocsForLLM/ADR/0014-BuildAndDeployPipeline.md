# ADR 0014: Build and deploy pipeline

- **Status:** Accepted
- **Tracking:** [Project #2 item](https://github.com/users/yt6983138/projects/2?pane=issue&itemId=289103060)
- **Recorded:** 2026-10-31.
- **Source:** Owner planning session and the owner's CI/CD idea on 2026-10-31.

This record does not authorize implementation, deployment, or live data changes. Apply [RepositoryGuide.md](../RepositoryGuide.md) and [PlanningGuidelines.md](../PlanningGuidelines.md).

## Context

Package versions and shared build properties are repeated inline in each `.csproj`, with no `Directory.*.props`. Releases are copied to the server plugin by plugin, so a Core or Framework change means several manual copies. Overwriting loaded DLLs crashes the running bot, and the start script restarts the bot on crash. Version skew between a plugin and its dependencies breaks deploy-time subtraction and `Assembly.LoadFrom` binding. The server holds runtime state (config, flag files) beside the binaries; plugin folders hold none.

## Decision

- **Central package management.** `Directory.Packages.props` in the submodule root (the submodule must build standalone) plus a root file that imports it and adds root-only packages. `Version=` is removed from `PackageReference`s and transitive pinning is on. Existing `PrivateAssets` metadata is kept. The Analyzer's Roslyn versions are not bumped along with the rest.
- **Shared build properties.** `Directory.Build.props` laid out the same way (submodule root, plus a root file importing it). `LangVersion preview` applies to every project except the Analyzer, which keeps its own target and language version. Project-specific settings (such as `AllowUnsafeBlocks`) stay local.
- **Local deploy script, owner-run only.** It targets the owner's production and testing server directories. Agents may write it but never run it.
  - Root files are copied one by one using a blocklist: `appsettings.*`, `nlog.config`, `*.sh`, `*.log`, and all-caps flag-file names. Nothing in the root is ever deleted.
  - `Plugins/` subfolders are mirrored, stale files included, because they hold no runtime state and discovery loads every DLL there.
  - A plugin's files are its publish output minus the host output and its direct dependencies' outputs, compared by relative path and content hash. Same path with a different hash is version skew and fails or warns.
  - Everything is always deployed; never a single plugin after a Core change.
- **Stopping the bot.** An authenticated HTTP shutdown endpoint reusing the soft-shutdown flow. The owner sets up the reverse proxy and `start.sh`; agents may only draft them. `start.sh` must not restart the bot during a deploy.
- **GitHub Actions is build-only**: check out with submodules and build. No deploy.
- **Run helpers are kept for now** for local debugging.

## Addendum (owner decisions, 2026-10-31)

- **Pause mechanism:** a `DEPLOY_PAUSE` flag file in the bot root. The deploy script creates it before copying and deletes it afterwards. `start.sh` waits while it exists instead of restarting. Its all-caps name already puts it in the root blocklist.
- **wwwroot placement:** every plugin's `wwwroot` is merged into one root `wwwroot/` on the server. That folder is copy-only and never deleted from, like other root files. A same-path, different-hash collision between plugins fails the deploy.
- **Shutdown endpoint:** `POST /admin/api/shutdown` in AdminHelper. The `Authorization` header is compared against the admin panel password (`AdminConfig.MvcSuperSecretNumber`). A raw compare is acceptable because nginx gates `/admin/` to the intranet. The deploy script prompts for the password at run time and never stores it.
- **CI:** `.github/workflows/build.yml` builds `PSLBotMiscPlugins.sln` in Release on `windows-latest`. The Framework `PreBuild` target uses cmd syntax, which is why it runs on Windows. Release is used because Debug currently has a PersonalWebsite/PhigrosApi swagger asset conflict. The private packages (`yt6983138.PhiInfo.*`, `PhigrosLibraryCSharp.Modification`) come from the owner's private GitHub Packages feed, read with `GITHUB_TOKEN` and `packages: read`. Pull requests from forks cannot restore them.
- **Host publish:** framework-dependent `linux-x64`. Plugin-to-`Plugins/<subfolder>` mapping lives in an untracked local deploy config.

## Open questions

- Whether the execute bit survives an overwrite of the host binary on the server. The `start.sh` draft runs `chmod +x` before each start as a workaround.

## Consequences

- Version skew becomes a build-time or deploy-time error instead of a runtime binding surprise.
- Sibling plugins sharing a package not in Core each carry their own copy.
- Server paths, hosts, and credentials stay out of tracked files.
