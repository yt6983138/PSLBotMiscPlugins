# Deploy tooling (owner-run)

**Agents must never run `Deploy.ps1` or touch a deploy target.** Decision record: `DocsForLLM/ADR/0014-BuildAndDeployPipeline.md`.

## Setup

1. Copy `deploy.config.example.json` to `deploy.config.json` (gitignored) and fill in the target roots, the host project and the plugin map (`Folder`, direct `DependsOn`).
2. Never put credentials in the config.
3. Optional `ShutdownUrls`: map of target name to the **full** shutdown URL (e.g. `http://intranet-host.example/admin/api/shutdown`). Must be an http(s) URL; keys must be existing targets. **With `http://` the admin password travels in cleartext** (it is sent raw in the `Authorization` header). That is only acceptable on the trusted intranet behind the nginx `/admin/` gate; prefer `https://` if available.

### Reverse proxy (draft, adapt yourself)

Placeholder nginx snippet: `/admin/` (including `/admin/api/shutdown` and the bug report API) reachable only from the intranet. Replace the ranges and upstream with your own; this is not applied by any script.

```nginx
location /admin/ {
    allow 10.0.0.0/8;
    allow 172.16.0.0/12;
    allow 192.168.0.0/16;
    deny all;

    proxy_pass http://127.0.0.1:PORT;   # placeholder: the bot's listen address
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

`proxy_pass` deliberately has no URI part (no trailing slash/path), so the original `/admin/...` path is passed to the bot unchanged.

The deploy polling treats 502/503/504 or no response as "bot is down", which matches nginx behavior when the upstream is gone.

## Dry run (stage only)

```powershell
pwsh Tools/Deploy/Deploy.ps1
```

Publishes (`linux-x64`, framework-dependent) the host and each plugin into `artifacts/deploy/publish`, computes per-plugin file sets and writes `artifacts/deploy/out/{root,wwwroot,Plugins}`. Fails on version skew (`-AllowSkew` downgrades to warnings) and on wwwroot conflicts. `-SkipPublish` reuses the last publish output.

## Deploy

```powershell
pwsh Tools/Deploy/Deploy.ps1 -Target Production -DryRunCopy   # prints planned deletions, writes nothing
pwsh Tools/Deploy/Deploy.ps1 -Target Production
```

1. Type the target name to confirm.
2. The script creates `DEPLOY_PAUSE` in the target root.
3. If the target has a `ShutdownUrls` entry, the script asks for the admin panel password (hidden input, every run, never stored or logged) and calls `POST /admin/api/shutdown` (202 accepted, 409 already shutting down; a wrong password gets one retry). It then polls the URL for up to 5 minutes as a hint that the bot is gone. Without an entry, or if the call fails, run `/shutdown` on the bot yourself. Either way, wait for the process to exit, then type `stopped`; that confirmation is always required. No HTTP call is made under `-DryRunCopy`.
4. Copy: root files and `wwwroot/` are copy-only (never deleted; `appsettings.*`, `nlog.config`, `*.sh`, `*.log` and all-caps names such as `SAFE_LOCK` are skipped). `Plugins/<Folder>` is mirrored (stale files and empty dirs are deleted) for each mapped plugin only.
5. `DEPLOY_PAUSE` is removed on success. On failure you are asked whether to remove it (default: keep). If interrupted (Ctrl+C) it is left in place and the script prints how to remove it.

Notes:

- `-DryRunCopy` still publishes and clears the staging directories first (unless `-SkipPublish`); only the target is untouched.
- If `DEPLOY_PAUSE` already exists in the target (e.g. stale from a failed run), you are asked whether to reuse it (default: no, abort).
- `-SkipPublish` can be combined with `-Target` to deploy the last publish output without rebuilding.
- Mirroring refuses to run if the mapped plugin folder or anything beneath it in the target is a symlink/junction.

## start.sh

`start.sh.draft` is a restart loop that waits while `DEPLOY_PAUSE` exists. Review it, rename to `start.sh` and install it in the bot root yourself.

## Execute bit

Overwriting `PSLDiscordBot.Framework` over SMB may drop its execute bit. The draft runs `chmod +x` before every start; if you start the bot another way, check this after the first deploy.
