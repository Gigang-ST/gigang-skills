#Requires -Version 5.1
# gigang 플러그인 전환 스크립트 (Windows)
#
#   기존 install.ps1 로 깐 gigang 을 "플러그인 방식"으로 한 번에 옮깁니다.
#     1) 구 install.ps1 잔재 정리 (4brain 공용 hook 은 보존)
#     2) 플러그인 마켓플레이스 등록 + 설치
#
#   사용:
#     powershell -ExecutionPolicy Bypass -File .\migrate.ps1
#
#   옵션:
#     -SkipCleanup   잔재 정리를 건너뛰고 설치만 진행

[CmdletBinding()]
param([switch]$SkipCleanup)

$ErrorActionPreference = 'Stop'

$claude   = Join-Path $env:USERPROFILE '.claude'
$settings = Join-Path $claude 'settings.json'

Write-Host ""
Write-Host "=== gigang 플러그인 전환 (Windows) ==="
Write-Host ""

# --- 0) claude CLI 확인 -----------------------------------------------------
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Host "[!] claude CLI 를 찾을 수 없습니다. Claude Code 설치 후 다시 실행하세요."
    exit 1
}

# --- 1) 구 install.ps1 잔재 정리 -------------------------------------------
if (-not $SkipCleanup) {
    Write-Host "[1/2] 기존 install.ps1 잔재 정리"

    # 1-a) 복사된 파일
    $paths = @()
    $paths += (Get-ChildItem (Join-Path $claude 'commands') -Filter 'gigang-*.md' -ErrorAction SilentlyContinue).FullName
    $paths += (Get-ChildItem (Join-Path $claude 'skills')   -Filter 'gigang*' -Directory -ErrorAction SilentlyContinue).FullName
    $clone = Join-Path $env:USERPROFILE '.gigang-skills'
    if (Test-Path $clone) { $paths += $clone }

    foreach ($p in ($paths | Where-Object { $_ })) {
        Write-Host ("      제거: {0}" -f $p)
        Remove-Item $p -Recurse -Force -ErrorAction SilentlyContinue
    }

    # 1-b) settings.json 의 gigang hook (4brain 공용 hook 은 보존)
    if (Test-Path $settings) {
        $raw = Get-Content $settings -Raw
        $has4brain = ($raw -match '4brain') -or (Test-Path 'C:\Prog\4brain-skills')
        $obj = $raw | ConvertFrom-Json
        $removed = 0

        if ($obj.PSObject.Properties.Name -contains 'hooks' -and $obj.hooks) {
            foreach ($event in @($obj.hooks.PSObject.Properties.Name)) {
                $kept = @()
                foreach ($entry in @($obj.hooks.$event)) {
                    $joined = (@($entry.hooks | ForEach-Object { $_.command }) -join ' ')
                    $isGigangUpdate = $joined -match '(gigang|\.gigang-skills).*update\.ps1'
                    $isLogHook      = $joined -match 'log_prompt\.py|log_response\.py|opus_suggest\.py'
                    if ($isGigangUpdate -or ($isLogHook -and -not $has4brain)) {
                        Write-Host ("      hook 제거: {0}" -f $event)
                        $removed++
                    } else {
                        $kept += $entry
                    }
                }
                $obj.hooks.$event = $kept
            }
        }

        if ($removed -gt 0) {
            $bak = "$settings.bak-$(Get-Date -Format 'yyyyMMddHHmmss')"
            Copy-Item $settings $bak
            [System.IO.File]::WriteAllText($settings, ($obj | ConvertTo-Json -Depth 30), (New-Object System.Text.UTF8Encoding $false))
            Write-Host ("      settings.json 백업: {0}" -f $bak)
        }
        if ($has4brain) {
            Write-Host "      * 4brain 사용 감지 - log/opus hook 은 공용이라 보존했습니다."
        }
    }
} else {
    Write-Host "[1/2] 잔재 정리 건너뜀 (-SkipCleanup)"
}

# --- 2) 플러그인 마켓플레이스 등록 + 설치 -----------------------------------
Write-Host ""
Write-Host "[2/2] 플러그인 마켓플레이스 등록 + 설치"
# 이미 등록/설치돼 있어도 멈추지 않도록 완화 (멱등 재실행 안전)
$ErrorActionPreference = 'Continue'
& claude plugin marketplace add Gigang-ST/gigang-skills
& claude plugin install gigang@gigang-skills

# --- 완료 -------------------------------------------------------------------
Write-Host ""
Write-Host "=== 완료 ==="
Write-Host "Claude Code 를 재시작하거나 /reload-plugins 후, /help 에서 /gigang:help 를 확인하세요."
Write-Host ""
