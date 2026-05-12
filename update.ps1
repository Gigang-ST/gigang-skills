# Gigang Skills 자동 업데이트 스크립트
# Claude Code SessionStart hook이 호출.
# 백그라운드(async), 빠르게, 실패는 조용히 무시.

$ErrorActionPreference = 'SilentlyContinue'

$env:GIT_TERMINAL_PROMPT = '0'

$repoRoot = $PSScriptRoot
if (-not (Test-Path (Join-Path $repoRoot '.git'))) { exit 0 }

git -C $repoRoot fetch --quiet 2>$null | Out-Null

$behind = git -C $repoRoot rev-list HEAD..origin/main --count 2>$null
if (-not $behind -or [int]$behind -eq 0) { exit 0 }

$before = git -C $repoRoot rev-parse --short HEAD 2>$null
git -C $repoRoot pull --quiet 2>$null | Out-Null
& "$repoRoot\install.ps1" 2>$null | Out-Null
$after = git -C $repoRoot rev-parse --short HEAD 2>$null

if ($before -and $after -and $before -ne $after) {
    $marker = [PSCustomObject]@{ from = $before; to = $after; date = (Get-Date -Format 'yyyy-MM-dd') }
    $markerPath = Join-Path $env:USERPROFILE '.claude\gigang-update-log.json'
    $json = $marker | ConvertTo-Json -Compress
    [System.IO.File]::WriteAllText($markerPath, $json, [System.Text.UTF8Encoding]::new($false))
}

exit 0
