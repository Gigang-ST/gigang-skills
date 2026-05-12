# Gigang Skills 설치 스크립트
# - $PSScriptRoot가 git repo가 아니면 표준 위치(%USERPROFILE%\.gigang-skills)에 clone
# - commands/, skills/, hooks/ 를 ~/.claude/ 로 복사
# - SessionStart hook 등록 (자동 업데이트)
# - UserPromptSubmit / Stop hook 등록 (프롬프트/응답 로그)
# 모든 hook 등록은 idempotent.

$ErrorActionPreference = 'Stop'

$repoRoot    = $PSScriptRoot
$claudeDir   = Join-Path $env:USERPROFILE '.claude'
$stdLocation = Join-Path $env:USERPROFILE '.gigang-skills'

# 1. git repo 확인 + 표준 위치 clone (zip 다운로드 시)
$isGitRepo = Test-Path (Join-Path $repoRoot '.git')
if (-not $isGitRepo) {
    Write-Host ""
    Write-Host "git repo가 아닙니다 (zip 다운로드?). 자동 업데이트 위해 표준 위치에 clone:"
    Write-Host "  -> $stdLocation"
    Write-Host ""

    $skipClone = $false
    if ((Test-Path $stdLocation) -and -not (Test-Path (Join-Path $stdLocation '.git'))) {
        $existing = @(Get-ChildItem -Force $stdLocation -ErrorAction SilentlyContinue)
        if ($existing.Count -gt 0) {
            Write-Warning "$stdLocation 이미 존재하지만 git repo가 아닙니다 ($($existing.Count) 항목)."
            Write-Warning "  덮어쓰기 위험 — 먼저 백업 후 직접 삭제하고 다시 install 돌리세요."
            Write-Warning "  자동 업데이트 미등록 — 명령 설치만 진행."
            $skipClone = $true
        } else {
            Remove-Item -Recurse -Force $stdLocation
        }
    }

    if (-not $skipClone -and -not (Test-Path (Join-Path $stdLocation '.git'))) {
        $cloneErr = git clone --quiet https://github.com/Gigang-ST/gigang-skills.git $stdLocation 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "git clone 실패. 자동 업데이트 미등록 — 명령 설치만 진행."
            if ($cloneErr) { Write-Warning "  $cloneErr" }
        }
    }

    if (Test-Path (Join-Path $stdLocation '.git')) {
        $repoRoot = $stdLocation
        Write-Host "Source: $repoRoot"
    }
}

# 2. commands / skills / hooks 동기화
function Sync-Children {
    param([string]$srcDir, [string]$dstDir, [string]$kind)

    if (-not (Test-Path $srcDir)) { return }
    if (-not (Test-Path $dstDir)) {
        New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
    }

    $items = Get-ChildItem $srcDir
    if ($items.Count -eq 0) { return }

    foreach ($item in $items) {
        $target = Join-Path $dstDir $item.Name
        if (Test-Path $target) {
            Remove-Item -Recurse -Force $target
        }
        Copy-Item -Recurse -Force $item.FullName $target
        Write-Host ("[OK] {0,-7} {1}  ->  {2}" -f $kind, $item.Name, $target)
    }
}

Sync-Children (Join-Path $repoRoot 'commands') (Join-Path $claudeDir 'commands') 'command'
Sync-Children (Join-Path $repoRoot 'skills')   (Join-Path $claudeDir 'skills')   'skill'
Sync-Children (Join-Path $repoRoot 'hooks')    (Join-Path $claudeDir 'hooks')    'hook'

# 3. settings.json hook 등록 (idempotent)
$settingsPath = Join-Path $claudeDir 'settings.json'
if (-not (Test-Path $settingsPath)) {
    [System.IO.File]::WriteAllText($settingsPath, '{}', [System.Text.UTF8Encoding]::new($false))
}

function Register-Hook {
    param(
        [string]$Event,
        [string]$Marker,
        [PSCustomObject]$HookEntry,
        [string]$Label
    )

    $content  = Get-Content $script:settingsPath -Raw
    if ($content -match $Marker) {
        Write-Host ("[OK] hook    {0} (이미 등록됨)" -f $Label)
        return
    }

    $settings = $content | ConvertFrom-Json
    if (-not (Get-Member -InputObject $settings -Name hooks -MemberType NoteProperty)) {
        $settings | Add-Member -NotePropertyName hooks -NotePropertyValue ([PSCustomObject]@{})
    }
    if (-not (Get-Member -InputObject $settings.hooks -Name $Event -MemberType NoteProperty)) {
        $settings.hooks | Add-Member -NotePropertyName $Event -NotePropertyValue @()
    }

    $settings.hooks.$Event = @($settings.hooks.$Event) + $HookEntry
    $json = $settings | ConvertTo-Json -Depth 20
    [System.IO.File]::WriteAllText($script:settingsPath, $json, [System.Text.UTF8Encoding]::new($false))
    Write-Host ("[OK] hook    {0} 등록됨" -f $Label)
}

# 3a. SessionStart — 자동 업데이트
if (Test-Path (Join-Path $repoRoot 'update.ps1')) {
    $updateScript = Join-Path $repoRoot 'update.ps1'
    $updateCmd    = '& "{0}"' -f $updateScript
    $entry = [PSCustomObject]@{
        hooks = @(
            [PSCustomObject]@{
                type    = 'command'
                command = $updateCmd
                shell   = 'powershell'
                timeout = 10
                async   = $true
            }
        )
    }
    Register-Hook -Event 'SessionStart' `
                  -Marker 'gigang.*update\.ps1|\.gigang-skills.*update\.ps1' `
                  -HookEntry $entry `
                  -Label 'SessionStart 자동 업데이트'
} else {
    Write-Warning "update.ps1 없음 — 자동 업데이트 hook 미등록"
}

# 3b. UserPromptSubmit / Stop — 프롬프트/응답 로그
$logPromptPath   = Join-Path $claudeDir 'hooks\log_prompt.py'
$logResponsePath = Join-Path $claudeDir 'hooks\log_response.py'
$hasLogScripts   = (Test-Path $logPromptPath) -and (Test-Path $logResponsePath)

if ($hasLogScripts) {
    $uvFound = [bool](Get-Command uv -ErrorAction SilentlyContinue)
    if (-not $uvFound) {
        Write-Warning "uv 미설치 — 프롬프트 로그 hook은 등록되지만 실행 시 무음 실패."
        Write-Warning "  설치: irm https://astral.sh/uv/install.ps1 | iex"
    }

    $promptEntry = [PSCustomObject]@{
        hooks = @(
            [PSCustomObject]@{
                type    = 'command'
                command = 'uv run --no-project python "$HOME/.claude/hooks/log_prompt.py"'
                timeout = 10
            }
        )
    }
    Register-Hook -Event 'UserPromptSubmit' `
                  -Marker 'log_prompt\.py' `
                  -HookEntry $promptEntry `
                  -Label 'UserPromptSubmit 프롬프트 로그'

    $responseEntry = [PSCustomObject]@{
        hooks = @(
            [PSCustomObject]@{
                type    = 'command'
                command = 'uv run --no-project python "$HOME/.claude/hooks/log_response.py"'
                timeout = 15
            }
        )
    }
    Register-Hook -Event 'Stop' `
                  -Marker 'log_response\.py' `
                  -HookEntry $responseEntry `
                  -Label 'Stop 응답 로그'
} else {
    Write-Warning "hooks/log_prompt.py 또는 log_response.py 없음 — 로그 hook 미등록"
}

Write-Host ""
Write-Host "설치 완료. 다음 Claude Code 세션부터 자동 업데이트 + 프롬프트/응답 로그 활성."
Write-Host "로그 위치: ~/.claude/logs/prompts/<project-name>/YYYY-MM-DD.md"
