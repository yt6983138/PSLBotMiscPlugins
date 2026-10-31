<#
.SYNOPSIS
	Deploy pipeline (ADR 0014). Stage 1 publishes and stages (deploys nothing); stage 2 copies
	to a named target and only runs when -Target is given.

.DESCRIPTION
	Publishes the Framework host and every plugin listed in the local config
	(framework-dependent, linux-x64), then computes what each plugin must ship:

		plugin files = plugin publish output
		               - host publish output
		               - publish output of each DIRECT dependency
		(compared by relative path + SHA-256; dependency outputs are the raw
		 publish outputs, not their already-subtracted sets)

	Same relative path with a different hash is version skew and fails the run
	(-AllowSkew downgrades it to a warning).

	Every `wwwroot/` (host and plugins) is pulled out and merged into one
	`wwwroot/`. Same path with a different hash is an error.

	Final layout (all under <StagingPath>/out):
		root/                 host files minus wwwroot
		wwwroot/              merged static files
		Plugins/<Folder>/     per-plugin files

	OWNER-RUN ONLY. Agents must never execute this script.

	Case sensitivity: the server is Linux, so paths are compared case-SENSITIVELY
	(ordinal) after normalising separators to '/'. Paths that differ only by case
	inside one set are reported as a warning because they would collide on Windows.

	Static web assets manifests: Web SDK projects can emit `*.staticwebassets*.json`
	and `*.endpoints.json` next to the publish output. They embed project-specific
	content (names, source paths), so their hashes legitimately differ between
	projects. They are never merged into wwwroot, and a same-path/different-hash
	hit on them is a warning, not skew. Plugin-named manifests are unique per
	plugin and therefore ship in that plugin's folder unchanged. Check the staged
	output after the first run to see which manifests actually appear.

.PARAMETER ConfigPath
	Local config JSON. Default: Tools/Deploy/deploy.config.json beside this script.

.PARAMETER StagingPath
	Staging directory (gitignored). Default: <repo>/artifacts/deploy.

.PARAMETER Configuration
	Build configuration. Default: Release.

.PARAMETER SkipPublish
	Reuse the existing <StagingPath>/publish instead of publishing again.

.PARAMETER AllowSkew
	Report version skew as warnings instead of failing.

.PARAMETER Target
	Name from config Targets. Without it the script is a staging dry run. With it, after
	confirmation, the staged output is copied to that target (see Tools/Deploy/README.md).

.PARAMETER DryRunCopy
	With -Target: print planned deletions and counts, write nothing, no prompts.
#>
[CmdletBinding()]
param(
	[string]$ConfigPath,
	[string]$StagingPath,
	[string]$Configuration = 'Release',
	[switch]$SkipPublish,
	[switch]$AllowSkew,
	[string]$Target,
	[switch]$DryRunCopy
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$scriptDir = $PSScriptRoot
$repoRoot = (Resolve-Path (Join-Path $scriptDir '..\..')).Path
if (-not $ConfigPath) { $ConfigPath = Join-Path $scriptDir 'deploy.config.json' }
if (-not $StagingPath) { $StagingPath = Join-Path $repoRoot 'artifacts\deploy' }

# The staging dir gets deleted recursively, so it must be strictly inside <repo>/artifacts.
$StagingPath = [IO.Path]::GetFullPath($StagingPath).TrimEnd('\', '/')
$artifactsRoot = [IO.Path]::GetFullPath((Join-Path $repoRoot 'artifacts')).TrimEnd('\', '/')
$sep = [IO.Path]::DirectorySeparatorChar
if (-not $StagingPath.StartsWith($artifactsRoot + $sep, [StringComparison]::OrdinalIgnoreCase))
{
	throw "-StagingPath must be strictly inside '$artifactsRoot' (got '$StagingPath')."
}

$manifestPattern = '(\.staticwebassets.*\.json|\.endpoints\.json)$'

# Server-owned state; never staged (matches the root blocklist names of ADR 0014).
function Test-IsBlocked([string]$rel)
{
	$leaf = $rel.Substring($rel.LastIndexOf('/') + 1)
	return $leaf -like 'appsettings.*' -or $leaf -ieq 'nlog.config'
}

# Config paths must be repo-relative; returns the full path.
function Resolve-RepoProject([string]$what, [string]$path)
{
	if ([IO.Path]::IsPathRooted($path)) { throw "$what must be relative to the repo root, not absolute: $path" }
	$full = Join-Path $repoRoot $path
	if (-not (Test-Path -LiteralPath $full -PathType Leaf)) { throw "$what project not found: $path" }
	return $full
}

# ---------------------------------------------------------------- config

# DependsOn may be omitted (= only the host is subtracted).
function Get-Deps($plugin)
{
	if ($plugin.PSObject.Properties['DependsOn'] -and $plugin.DependsOn) { return @($plugin.DependsOn) }
	return @()
}

function Read-DeployConfig([string]$path)
{
	if (-not (Test-Path -LiteralPath $path -PathType Leaf))
	{
		throw "Config not found: $path (copy deploy.config.example.json to deploy.config.json and fill it in)."
	}
	$config = Get-Content -LiteralPath $path -Raw | ConvertFrom-Json

	foreach ($key in 'Targets', 'Host', 'Plugins')
	{
		if (-not $config.PSObject.Properties[$key]) { throw "Config is missing '$key'." }
	}
	if (-not $config.Host) { throw "Config 'Host' is empty." }
	Resolve-RepoProject 'Host' $config.Host | Out-Null
	if (@($config.Targets.PSObject.Properties).Count -eq 0) { throw "Config 'Targets' is empty." }
	if ($config.PSObject.Properties['ShutdownUrls'])
	{
		foreach ($entry in $config.ShutdownUrls.PSObject.Properties)
		{
			if (-not $config.Targets.PSObject.Properties[$entry.Name]) { throw "ShutdownUrls has unknown target '$($entry.Name)'." }
			$uri = $null
			if (-not [Uri]::TryCreate([string]$entry.Value, [UriKind]::Absolute, [ref]$uri) -or $uri.Scheme -notin 'http', 'https')
			{
				throw "ShutdownUrls.$($entry.Name) must be a full http(s) URL."
			}
		}
	}

	$names = @{}
	$folders = @{}
	foreach ($plugin in $config.Plugins)
	{
		foreach ($key in 'Project', 'Folder')
		{
			if (-not $plugin.PSObject.Properties[$key] -or -not $plugin.$key) { throw "A plugin entry is missing '$key'." }
		}
		$folder = [string]$plugin.Folder
		if ([string]::IsNullOrWhiteSpace($folder) -or $folder -in '.', '..' -or $folder -ne $folder.Trim() `
			-or $folder.IndexOfAny([IO.Path]::GetInvalidFileNameChars()) -ge 0 -or $folder -match '[\\/:]' `
			-or [IO.Path]::IsPathRooted($folder) -or $folder -match '[. ]$' -or $folder -match '^\.+$' `
			-or $folder -match '^(?i:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$')
		{
			throw "Plugin folder must be a single plain path segment: '$folder'"
		}
		Resolve-RepoProject "Plugin '$($plugin.Project)'" $plugin.Project | Out-Null
		$name = [IO.Path]::GetFileNameWithoutExtension($plugin.Project)
		if ($name -eq 'Host') { throw "Plugin name 'Host' is reserved ($($plugin.Project))." }
		if ($names.ContainsKey($name)) { throw "Duplicate plugin project name: $name" }
		if ($folders.ContainsKey($plugin.Folder)) { throw "Duplicate plugin folder: $($plugin.Folder)" }
		$names[$name] = $true
		$folders[$plugin.Folder] = $true
	}

	# Dependencies must exist.
	foreach ($plugin in $config.Plugins)
	{
		$name = [IO.Path]::GetFileNameWithoutExtension($plugin.Project)
		foreach ($dep in @((Get-Deps $plugin)))
		{
			if ($dep -ne 'Host' -and -not $names.ContainsKey($dep)) { throw "Plugin '$name' depends on unknown '$dep'." }
			if ($dep -eq $name) { throw "Plugin '$name' depends on itself." }
		}
	}

	# Cycle check (DFS: 1 = visiting, 2 = done).
	$deps = @{}
	foreach ($plugin in $config.Plugins)
	{
		$deps[[IO.Path]::GetFileNameWithoutExtension($plugin.Project)] = @((Get-Deps $plugin) | Where-Object { $_ -and $_ -ne 'Host' })
	}
	$state = @{}
	function Visit([string]$node, [string[]]$trail)
	{
		if ($state[$node] -eq 2) { return }
		if ($state[$node] -eq 1) { throw "Dependency cycle: $(($trail + $node) -join ' -> ')" }
		$state[$node] = 1
		foreach ($d in $deps[$node]) { Visit $d ($trail + $node) }
		$state[$node] = 2
	}
	foreach ($n in $deps.Keys) { Visit $n @() }

	return $config
}

# ---------------------------------------------------------------- file sets

# Relative path (forward slashes) -> SHA-256, ordinal (case-sensitive) keys.
function Get-FileSet([string]$dir)
{
	$set = [System.Collections.Generic.Dictionary[string, string]]::new([StringComparer]::Ordinal)
	$base = (Resolve-Path -LiteralPath $dir).Path.TrimEnd('\', '/')
	foreach ($file in Get-ChildItem -LiteralPath $base -Recurse -File -Force)
	{
		$rel = $file.FullName.Substring($base.Length + 1).Replace('\', '/')
		$set[$rel] = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
	}

	$lower = @{}
	foreach ($key in $set.Keys)
	{
		$l = $key.ToLowerInvariant()
		if ($lower.ContainsKey($l)) { Write-Warning "Paths differ only by case in $dir : '$($lower[$l])' and '$key'" }
		$lower[$l] = $key
	}
	return , $set
}

function Test-IsWwwroot([string]$rel) { return $rel.StartsWith('wwwroot/', [StringComparison]::Ordinal) }

# ---------------------------------------------------------------- run

$config = Read-DeployConfig $ConfigPath

# Fail fast on the target (read-only checks) before spending time on publish.
$targetRoot = $null
if ($DryRunCopy -and -not $Target) { throw '-DryRunCopy needs -Target.' }
if ($Target)
{
	$targetProp = $config.Targets.PSObject.Properties[$Target]
	if (-not $targetProp) { throw "Unknown target '$Target'. Known: $(($config.Targets.PSObject.Properties.Name) -join ', ')" }
	$targetRoot = [string]$targetProp.Value
	if (-not (Test-Path -LiteralPath $targetRoot -PathType Container)) { throw "Target root does not exist: $targetRoot" }
	# Looks like a bot root: the host binary (Linux) or its dll is present.
	if (-not ((Test-Path -LiteralPath (Join-Path $targetRoot 'PSLDiscordBot.Framework') -PathType Leaf) -or
			(Test-Path -LiteralPath (Join-Path $targetRoot 'PSLDiscordBot.Framework.dll') -PathType Leaf)))
	{
		throw "Target root does not look like a bot root (no PSLDiscordBot.Framework[.dll]): $targetRoot"
	}
}

$publishRoot = Join-Path $StagingPath 'publish'
$outRoot = Join-Path $StagingPath 'out'

# Units: Host first, then plugins. Name -> @{ Project; Dir }.
$units = [ordered]@{}
$units['Host'] = @{ Project = (Join-Path $repoRoot $config.Host); Dir = (Join-Path $publishRoot 'Host') }
foreach ($plugin in $config.Plugins)
{
	$name = [IO.Path]::GetFileNameWithoutExtension($plugin.Project)
	$units[$name] = @{ Project = (Join-Path $repoRoot $plugin.Project); Dir = (Join-Path $publishRoot $name) }
}

# 1. Publish.
if ($SkipPublish)
{
	foreach ($name in $units.Keys)
	{
		if (-not (Test-Path -LiteralPath $units[$name].Dir)) { throw "-SkipPublish: missing publish output for '$name' in $publishRoot" }
	}
	Write-Host "Reusing existing publish output in $publishRoot"
}
else
{
	if (Test-Path -LiteralPath $StagingPath) { Remove-Item -LiteralPath $StagingPath -Recurse -Force }
	New-Item -ItemType Directory -Path $publishRoot | Out-Null
	foreach ($name in $units.Keys)
	{
		$unit = $units[$name]
		if (-not (Test-Path -LiteralPath $unit.Project -PathType Leaf)) { throw "Project not found: $($unit.Project)" }
		Write-Host "Publishing $name ..."
		& dotnet publish $unit.Project -c $Configuration -r linux-x64 --self-contained false -o $unit.Dir --nologo -v minimal
		if ($LASTEXITCODE -ne 0) { throw "dotnet publish failed for $name (exit code $LASTEXITCODE)." }
	}
}

# Drop any previous output now, so a failed run never leaves old output that looks current.
if (Test-Path -LiteralPath $outRoot) { Remove-Item -LiteralPath $outRoot -Recurse -Force }

# 2. Hash every raw publish output once; set blocklisted state files aside (never staged).
$raw = @{}
$excluded = @{}
foreach ($name in $units.Keys)
{
	$raw[$name] = Get-FileSet $units[$name].Dir
	$excluded[$name] = [System.Collections.Generic.List[string]]::new()
	foreach ($rel in @($raw[$name].Keys))
	{
		if ((Test-IsWwwroot $rel) -or -not (Test-IsBlocked $rel)) { continue }
		$excluded[$name].Add($rel)
		$raw[$name].Remove($rel) | Out-Null
	}
}

# 3. Split wwwroot out of every raw output and merge it.
$wwwroot = [System.Collections.Generic.Dictionary[string, hashtable]]::new([StringComparer]::Ordinal)
$wwwrootConflicts = New-Object System.Collections.Generic.List[string]
foreach ($name in $units.Keys)
{
	foreach ($rel in $raw[$name].Keys)
	{
		if (-not (Test-IsWwwroot $rel)) { continue }
		$sub = $rel.Substring('wwwroot/'.Length)
		$hash = $raw[$name][$rel]
		if ($wwwroot.ContainsKey($sub) -and $wwwroot[$sub].Hash -ne $hash)
		{
			$wwwrootConflicts.Add("wwwroot/$sub : $($wwwroot[$sub].Source) vs $name")
			continue
		}
		if (-not $wwwroot.ContainsKey($sub)) { $wwwroot[$sub] = @{ Hash = $hash; Source = $name; Full = (Join-Path $units[$name].Dir $rel) } }
	}
}

# 4. Subtract per unit (wwwroot excluded; it is handled above).
$skew = New-Object System.Collections.Generic.List[string]
$skewManifestWarnings = New-Object System.Collections.Generic.List[string]
$sets = @{}

# Host: everything except wwwroot.
$sets['Host'] = [System.Collections.Generic.List[string]]::new()
foreach ($rel in $raw['Host'].Keys) { if (-not (Test-IsWwwroot $rel)) { $sets['Host'].Add($rel) } }

foreach ($plugin in $config.Plugins)
{
	$name = [IO.Path]::GetFileNameWithoutExtension($plugin.Project)
	$subtractFrom = @('Host') + @((Get-Deps $plugin) | Where-Object { $_ -and $_ -ne 'Host' })
	$keep = [System.Collections.Generic.List[string]]::new()
	foreach ($rel in $raw[$name].Keys)
	{
		if (Test-IsWwwroot $rel) { continue }
		$hash = $raw[$name][$rel]
		$covered = $false
		foreach ($other in $subtractFrom)
		{
			if (-not $raw[$other].ContainsKey($rel)) { continue }
			if ($raw[$other][$rel] -eq $hash) { $covered = $true; continue }
			$msg = "$rel : $name differs from $other"
			if ($rel -match $manifestPattern) { $skewManifestWarnings.Add($msg) } else { $skew.Add($msg) }
		}
		if (-not $covered) { $keep.Add($rel) }
	}
	$sets[$name] = $keep
}

# 5. Report problems.
foreach ($w in $skewManifestWarnings) { Write-Warning "Manifest differs (expected, not skew): $w" }

$failed = $false
if ($wwwrootConflicts.Count -gt 0)
{
	$failed = $true
	Write-Host "wwwroot conflicts (same path, different content):" -ForegroundColor Red
	$wwwrootConflicts | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
}
if ($skew.Count -gt 0)
{
	if ($AllowSkew)
	{
		Write-Warning "Version skew allowed by -AllowSkew:"
		$skew | ForEach-Object { Write-Warning "  $_" }
	}
	else
	{
		$failed = $true
		Write-Host "Version skew (same path, different content):" -ForegroundColor Red
		$skew | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
	}
}
if ($failed) { throw 'Staging failed; the out directory was cleared and nothing was staged.' }

# 6. Write final layout.
function Copy-Staged([string]$from, [string]$to)
{
	$dir = Split-Path -Parent $to
	if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
	Copy-Item -LiteralPath $from -Destination $to -Force
}

foreach ($rel in $sets['Host']) { Copy-Staged (Join-Path $units['Host'].Dir $rel) (Join-Path $outRoot "root/$rel") }
foreach ($sub in $wwwroot.Keys) { Copy-Staged $wwwroot[$sub].Full (Join-Path $outRoot "wwwroot/$sub") }
foreach ($plugin in $config.Plugins)
{
	$name = [IO.Path]::GetFileNameWithoutExtension($plugin.Project)
	$pluginOut = Join-Path $outRoot "Plugins/$($plugin.Folder)"
	New-Item -ItemType Directory -Path $pluginOut -Force | Out-Null
	foreach ($rel in $sets[$name]) { Copy-Staged (Join-Path $units[$name].Dir $rel) (Join-Path $pluginOut $rel) }
}

# 7. Summary (dry run: nothing is deployed).
Write-Host ''
Write-Host "Staged layout: $outRoot"
Write-Host ("  root files        : {0}" -f $sets['Host'].Count)
Write-Host ("  wwwroot files     : {0}" -f $wwwroot.Count)
foreach ($plugin in $config.Plugins)
{
	$name = [IO.Path]::GetFileNameWithoutExtension($plugin.Project)
	Write-Host ("  Plugins/{0,-12}: {1} files (raw output {2})" -f $plugin.Folder, $sets[$name].Count, $raw[$name].Count)
}
Write-Host ("  version skew      : {0}" -f $skew.Count)
Write-Host ("  manifest warnings : {0}" -f $skewManifestWarnings.Count)
Write-Host 'Excluded as server state (appsettings.*, nlog.config):'
foreach ($name in $units.Keys)
{
	if ($excluded[$name].Count -eq 0) { continue }
	Write-Host ("  {0}: {1}" -f $name, ($excluded[$name] -join ', '))
}
if (-not $Target)
{
	Write-Host ''
	Write-Host 'Dry run only: nothing was copied to any target. Pass -Target <name> to deploy.'
	return
}

# ---------------------------------------------------------------- stage 2: copy

# Root blocklist (ADR 0014): server-owned state and scripts, matched on the file name.
#   appsettings.*, nlog.config, *.sh, *.log, and all-caps names = at least one uppercase letter and
#   no lowercase letters (SAFE_LOCK, DEPLOY_PAUSE, ...).
function Test-IsRootBlocked([string]$rel)
{
	$leaf = $rel.Substring($rel.LastIndexOf('/') + 1)
	if (Test-IsBlocked $rel) { return $true }
	if ($leaf -like '*.sh' -or $leaf -like '*.log') { return $true }
	return ($leaf -cmatch '[A-Z]') -and -not ($leaf -cmatch '[a-z]')
}

# Relative paths ('/' separators) of all files under a directory; empty if it does not exist.
function Get-RelativeFiles([string]$dir)
{
	if (-not (Test-Path -LiteralPath $dir -PathType Container)) { return @() }
	$base = (Resolve-Path -LiteralPath $dir).Path.TrimEnd('\', '/')
	return @(Get-ChildItem -LiteralPath $base -Recurse -File -Force | ForEach-Object { $_.FullName.Substring($base.Length + 1).Replace('\', '/') })
}

$stats = [ordered]@{ Copied = 0; Deleted = 0; DirsRemoved = 0; Skipped = 0 }
$write = -not $DryRunCopy

function Copy-ToTarget([string]$from, [string]$to)
{
	$stats.Copied++
	if ($write) { Copy-Staged $from $to }
}

function Remove-FromTarget([string]$path, [bool]$isDir)
{
	if ($isDir) { $stats.DirsRemoved++ } else { $stats.Deleted++ }
	Write-Host "  delete $path"
	if ($write) { Remove-Item -LiteralPath $path -Recurse:$isDir -Force }
}

# Copy-only: overwrite files from a staged dir, never delete. $filter (optional) rejects names.
function Copy-Merge([string]$fromDir, [string]$toDir, [scriptblock]$filter)
{
	foreach ($rel in (Get-RelativeFiles $fromDir))
	{
		if ($filter -and (& $filter $rel)) { $stats.Skipped++; Write-Host "  skip (blocklist) $rel"; continue }
		Copy-ToTarget (Join-Path $fromDir $rel) (Join-Path $toDir $rel)
	}
}

# Mirror: copy everything, then delete target files and empty dirs that are not staged.
# Comparison is case-insensitive: the target may be reached over a case-insensitive share.
function Copy-Mirror([string]$fromDir, [string]$toDir)
{
	$pluginsRoot = [IO.Path]::GetFullPath((Join-Path $targetRoot 'Plugins')).TrimEnd('\', '/')
	$fullTo = [IO.Path]::GetFullPath($toDir).TrimEnd('\', '/')
	if ($fullTo.Length -le $pluginsRoot.Length -or -not $fullTo.StartsWith($pluginsRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase))
	{
		throw "Refusing to mirror into '$fullTo': not a strict descendant of '$pluginsRoot'."
	}
	if (Test-Path -LiteralPath $toDir)
	{
		$top = Get-Item -LiteralPath $toDir -Force
		$linked = @($top) + @(if ($top.PSIsContainer) { Get-ChildItem -LiteralPath $toDir -Recurse -Force })
		foreach ($item in $linked)
		{
			if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Refusing to mirror: reparse point (symlink/junction) in target: $($item.FullName)" }
		}
	}
	$staged = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
	foreach ($rel in (Get-RelativeFiles $fromDir))
	{
		$staged.Add($rel) | Out-Null
		Copy-ToTarget (Join-Path $fromDir $rel) (Join-Path $toDir $rel)
	}
	foreach ($rel in (Get-RelativeFiles $toDir))
	{
		if (-not $staged.Contains($rel)) { Remove-FromTarget (Join-Path $toDir $rel) $false }
	}
	if (-not (Test-Path -LiteralPath $toDir -PathType Container)) { return }
	# Empty dirs, deepest first. Under -DryRunCopy only directories empty right now are seen.
	$dirs = Get-ChildItem -LiteralPath $toDir -Recurse -Directory -Force | Sort-Object { $_.FullName.Length } -Descending
	foreach ($d in $dirs)
	{
		if (-not (Get-ChildItem -LiteralPath $d.FullName -Force | Select-Object -First 1)) { Remove-FromTarget $d.FullName $true }
	}
}

# Status code of an HTTP call, or 0 if there was no response. Works on Windows PowerShell 5.1
# (WebException, HttpWebResponse) and PowerShell 7 (HttpResponseException, HttpResponseMessage).
function Invoke-StatusCall([string]$method, [string]$url, [hashtable]$headers)
{
	$webArgs = @{ Uri = $url; Method = $method; Headers = $headers; UseBasicParsing = $true; TimeoutSec = 15; ErrorAction = 'Stop' }
	# PS7 validates header values strictly; the password may contain characters it rejects.
	if ($PSVersionTable.PSVersion.Major -ge 6) { $webArgs['SkipHeaderValidation'] = $true }
	try
	{
		$response = Invoke-WebRequest @webArgs
		return [int]$response.StatusCode
	}
	catch
	{
		# Not every exception has a Response property (connection refused, DNS, timeout); StrictMode throws on a missing one.
		$responseProp = $_.Exception.PSObject.Properties['Response']
		if ($null -ne $responseProp -and $null -ne $responseProp.Value) { return [int]$responseProp.Value.StatusCode }
		return 0
	}
}

# POSTs the shutdown request. Returns $true when the bot is shutting down (202 or 409),
# $false to fall back to the manual /shutdown flow. The password is prompted every run and never stored or printed.
function Request-Shutdown([string]$url)
{
	for ($attempt = 1; $attempt -le 2; $attempt++)
	{
		$secure = Read-Host 'Admin panel password (input hidden; not stored)' -AsSecureString
		$bstr = [IntPtr]::Zero
		$plain = $null
		$headers = $null
		try
		{
			$bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
			$plain = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
			$headers = @{ Authorization = $plain }
			$status = Invoke-StatusCall 'POST' $url $headers
		}
		finally
		{
			if ($bstr -ne [IntPtr]::Zero) { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
			$plain = $null
			$headers = $null
			$secure.Dispose()
		}

		if ($status -eq 202) { Write-Host 'Shutdown accepted (202). The bot waits for running tasks, then exits.'; return $true }
		if ($status -eq 409) { Write-Host 'Bot is already shutting down (409); continuing to wait.'; return $true }
		if ($status -eq 401)
		{
			Write-Host 'Wrong password (401).' -ForegroundColor Yellow
			if ($attempt -eq 1) { Write-Host 'Try once more.' }
		}
		else
		{
			Write-Host "Shutdown request failed (status $status; 0 = no response)." -ForegroundColor Yellow
			return $false
		}
	}
	return $false
}

# Hint only: polls the URL unauthenticated (GET) for up to 5 minutes. A reverse proxy answers 502/503/504 or the
# connection fails once the bot is gone; a running bot answers with its own status (e.g. 401/405). Ctrl+C aborts.
function Wait-ForBotDown([string]$url)
{
	Write-Host 'Polling until the bot stops answering (hint only, up to 5 minutes, Ctrl+C to abort) ...'
	$deadline = [DateTime]::UtcNow.AddMinutes(5)
	while ([DateTime]::UtcNow -lt $deadline)
	{
		$status = Invoke-StatusCall 'GET' $url @{}
		if ($status -eq 0 -or $status -in 502, 503, 504)
		{
			Write-Host 'The bot no longer answers (looks stopped).'
			return
		}
		Start-Sleep -Seconds 5
	}
	Write-Host 'Timed out; the bot still answers. Check it yourself before confirming.' -ForegroundColor Yellow
}

$pausePath = Join-Path $targetRoot 'DEPLOY_PAUSE'
$pauseCreated = $false
$pauseHandled = $false
$copyStarted = $false

Write-Host ''
Write-Host "Target '$Target': $targetRoot"
if ($DryRunCopy) { Write-Host '-DryRunCopy: nothing will be written; planned deletions are listed.' -ForegroundColor Yellow }
else
{
	$answer = Read-Host "This WILL modify the target. Type the target name ($Target) to continue"
	if ($answer -cne $Target) { throw 'Confirmation did not match; nothing was changed.' }
}

try
{
	if ($write)
	{
		if (Test-Path -LiteralPath $pausePath)
		{
			$answer = Read-Host 'DEPLOY_PAUSE already exists in the target (stale from a failed run?). Reuse it? [y/N]'
			if ($answer -notmatch '^[yY]') { throw 'DEPLOY_PAUSE already exists; remove it manually or reuse it.' }
		}
		else { New-Item -ItemType File -Path $pausePath | Out-Null }
		$pauseCreated = $true
		Write-Host 'Created DEPLOY_PAUSE (start.sh must wait while it exists).'
		$shutdownUrl = $null
		if ($config.PSObject.Properties['ShutdownUrls'] -and $config.ShutdownUrls.PSObject.Properties[$Target])
		{
			$shutdownUrl = [string]$config.ShutdownUrls.PSObject.Properties[$Target].Value
		}
		$requested = $false
		if ($shutdownUrl) { $requested = Request-Shutdown $shutdownUrl }
		if ($requested) { Wait-ForBotDown $shutdownUrl }
		else { Write-Host 'Now run /shutdown on the bot manually and wait until the process has exited.' -ForegroundColor Yellow }
		$answer = Read-Host 'Type "stopped" once the bot has fully stopped'
		if ($answer -cne 'stopped') { throw 'Bot not confirmed stopped; nothing was copied.' }
	}

	$copyStarted = $true
	Write-Host 'Root files (copy-only, nothing deleted) ...'
	Copy-Merge (Join-Path $outRoot 'root') $targetRoot { param($rel) Test-IsRootBlocked $rel }
	Write-Host 'wwwroot (copy-only, nothing deleted) ...'
	Copy-Merge (Join-Path $outRoot 'wwwroot') (Join-Path $targetRoot 'wwwroot') $null
	foreach ($plugin in $config.Plugins)
	{
		Write-Host "Plugins/$($plugin.Folder) (mirror) ..."
		Copy-Mirror (Join-Path $outRoot "Plugins/$($plugin.Folder)") (Join-Path $targetRoot "Plugins/$($plugin.Folder)")
	}

	if ($write)
	{
		Remove-Item -LiteralPath $pausePath -Force
		$pauseCreated = $false
		Write-Host 'Removed DEPLOY_PAUSE.'
	}
}
catch
{
	Write-Host ''
	Write-Host "Deploy FAILED: $($_.Exception.Message)" -ForegroundColor Red
	Write-Host ("Done before failure: copied {0}, deleted {1} files, removed {2} dirs, skipped {3}." -f $stats.Copied, $stats.Deleted, $stats.DirsRemoved, $stats.Skipped) -ForegroundColor Red
	if ($pauseCreated)
	{
		$pauseHandled = $true
		$state = if ($copyStarted) { 'bot will restart on a possibly half-deployed tree' } else { 'nothing was copied; the target is unchanged' }
		try
		{
			$answer = Read-Host "Remove DEPLOY_PAUSE now ($state)? [y/N]"
			if ($answer -match '^[yY]') { Remove-Item -LiteralPath $pausePath -Force; $pauseCreated = $false; Write-Host 'Removed DEPLOY_PAUSE.' }
			else { Write-Host 'DEPLOY_PAUSE kept; the bot stays paused. Remove it manually after fixing.' -ForegroundColor Yellow }
		}
		catch { Write-Host "Could not remove DEPLOY_PAUSE: $($_.Exception.Message). Remove it manually: $pausePath" -ForegroundColor Yellow }
	}
	throw
}
finally
{
	# Ctrl+C / pipeline stop skips the catch block; prompting may not be possible here.
	if ($pauseCreated -and -not $pauseHandled)
	{
		Write-Host ''
		Write-Host "Deploy interrupted. DEPLOY_PAUSE was left in place (bot stays paused); copy started: $copyStarted." -ForegroundColor Yellow
		Write-Host ("Done so far: copied {0}, deleted {1} files, removed {2} dirs. Remove it manually when safe: {3}" -f $stats.Copied, $stats.Deleted, $stats.DirsRemoved, $pausePath) -ForegroundColor Yellow
	}
}

Write-Host ''
Write-Host ("{0}: copied {1} files, deleted {2} files, removed {3} empty dirs, skipped {4} (root blocklist)." -f $(if ($write) { 'Deployed' } else { 'Planned (dry)' }), $stats.Copied, $stats.Deleted, $stats.DirsRemoved, $stats.Skipped)
Write-Host 'Reminder: overwriting the host binary over SMB may drop its execute bit on Linux. If the bot fails to start, run chmod +x on PSLDiscordBot.Framework (start.sh.draft does this).' -ForegroundColor Yellow
