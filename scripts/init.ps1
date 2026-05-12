# Gigang 신규 멤버용 환경 셋업 스크립트
# - winget 패키지(git, gh, pwsh7, node, bun, pnpm), uv, 작업 폴더
# - Windows Terminal 기본 프로파일/시작 폴더
# - PowerShell $PROFILE 의 cc alias
# - ~/.claude/CLAUDE.md 의 uv 문구
# 모든 단계 멱등.

[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [string]$WorkDir
)

$ErrorActionPreference = 'Continue'

$OutputEncoding = [System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

function Write-Step {
    param(
        [ValidateSet('OK','SKIP','FAIL','INFO')]
        [string]$Status,
        [string]$Name,
        [string]$Detail = ''
    )
    $tag = "[{0,-4}]" -f $Status
    Write-Host ("{0} {1,-14} {2}" -f $tag, $Name, $Detail)
}

function Install-WingetPackage {
    param(
        [string]$Id,
        [string]$DisplayName,
        [string]$VersionCommand
    )

    $alreadyInstalled = $false
    if ($VersionCommand) {
        $cmd = $VersionCommand.Split(' ')[0]
        if (Get-Command $cmd -ErrorAction SilentlyContinue) {
            $alreadyInstalled = $true
        }
    }

    if ($alreadyInstalled) {
        $ver = ''
        try { $ver = (& cmd /c $VersionCommand 2>$null | Select-Object -First 1) } catch {}
        Write-Step SKIP $DisplayName "이미 설치됨 ($ver)"
        return
    }

    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        Write-Step FAIL $DisplayName 'winget 미설치 - https://aka.ms/getwinget'
        return
    }

    Write-Host "  -> winget install $Id ..."
    $wingetOut = & winget install --id $Id -e --silent --accept-package-agreements --accept-source-agreements 2>&1
    $alreadyInstalledCode = -1978335215
    if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq $alreadyInstalledCode) {
        $env:Path = [System.Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
                    [System.Environment]::GetEnvironmentVariable('Path', 'User')
        Write-Step OK $DisplayName 'winget 설치 완료'
    } else {
        Write-Step FAIL $DisplayName "winget 종료 코드 $LASTEXITCODE"
        $wingetOut | Select-Object -Last 5 | ForEach-Object { Write-Host "    $_" }
    }
}

function Install-Pnpm {
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        $ver = (pnpm --version 2>$null)
        Write-Step SKIP 'pnpm' "이미 설치됨 ($ver)"
        return
    }
    try {
        Invoke-RestMethod https://get.pnpm.io/install.ps1 | Invoke-Expression
        $env:Path = [System.Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
                    [System.Environment]::GetEnvironmentVariable('Path', 'User')
        Write-Step OK 'pnpm' 'installer 실행 완료'
    } catch {
        Write-Step FAIL 'pnpm' $_.Exception.Message
    }
}

function Install-Uv {
    if (Get-Command uv -ErrorAction SilentlyContinue) {
        $ver = (uv --version 2>$null)
        Write-Step SKIP 'uv' "이미 설치됨 ($ver)"
        return
    }
    try {
        Invoke-RestMethod https://astral.sh/uv/install.ps1 | Invoke-Expression
        Write-Step OK 'uv' 'installer 실행 완료'
    } catch {
        Write-Step FAIL 'uv' $_.Exception.Message
    }
}

function New-WorkDir {
    param([string]$Path)
    if (Test-Path $Path) {
        Write-Step SKIP '작업 폴더' "$Path 이미 존재"
    } else {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
        Write-Step OK '작업 폴더' "$Path 생성"
    }
}

function Set-TerminalDefault {
    param([string]$WorkDir)

    $candidates = Get-ChildItem "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal*" -Directory -ErrorAction SilentlyContinue |
        ForEach-Object { Join-Path $_.FullName 'LocalState\settings.json' } |
        Where-Object { Test-Path $_ }

    if (-not $candidates) {
        Write-Step SKIP 'Terminal' '미설치 또는 미실행 - 한 번 열고 다시 init 돌리세요'
        return
    }
    $settingsPath = $candidates | Select-Object -First 1

    try {
        $json = Get-Content $settingsPath -Raw | ConvertFrom-Json -ErrorAction Stop
    } catch {
        Write-Step FAIL 'Terminal' "settings.json 파싱 실패: $($_.Exception.Message)"
        Write-Host "    경로: $settingsPath"
        return
    }

    $pwshProfile = $json.profiles.list | Where-Object {
        $_.source -eq 'Windows.Terminal.PowershellCore' -or
        $_.commandline -match 'pwsh\.exe'
    } | Select-Object -First 1

    if (-not $pwshProfile) {
        Write-Step SKIP 'Terminal' 'PowerShell 7 프로파일 미등록 - Terminal 한 번 열고 다시 돌리세요'
        return
    }

    $changed = $false
    if ($json.defaultProfile -ne $pwshProfile.guid) {
        $json.defaultProfile = $pwshProfile.guid
        $changed = $true
    }
    if ($pwshProfile.startingDirectory -ne $WorkDir) {
        if ($pwshProfile.PSObject.Properties.Name -contains 'startingDirectory') {
            $pwshProfile.startingDirectory = $WorkDir
        } else {
            $pwshProfile | Add-Member -NotePropertyName startingDirectory -NotePropertyValue $WorkDir
        }
        $changed = $true
    }

    if ($changed) {
        $jsonStr = $json | ConvertTo-Json -Depth 32
        [System.IO.File]::WriteAllText($settingsPath, $jsonStr, [System.Text.UTF8Encoding]::new($false))
        Write-Step OK 'Terminal' "기본=pwsh7, startingDir=$WorkDir"
    } else {
        Write-Step SKIP 'Terminal' '이미 적용됨'
    }
}

function Add-CcAlias {
    $profilePath = $PROFILE
    $marker = 'function cc { claude --dangerously-skip-permissions @args }'

    $profileDir = Split-Path $profilePath -Parent
    if (-not (Test-Path $profileDir)) {
        New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
    }

    if (Test-Path $profilePath) {
        $content = Get-Content $profilePath -Raw
        if ($content -match [regex]::Escape($marker)) {
            Write-Step SKIP 'cc alias' '$PROFILE 에 이미 있음'
            return
        }
    }

    [System.IO.File]::AppendAllText($profilePath, "`n# gigang-init: cc shortcut`n$marker`n", [System.Text.UTF8Encoding]::new($false))
    Write-Step OK 'cc alias' "$profilePath 에 추가"
}

function Add-ClaudeMdUv {
    $claudeMd = Join-Path $env:USERPROFILE '.claude\CLAUDE.md'
    $marker   = '파이썬이 필요한 경우 uv를 이용하세요'

    if (Test-Path $claudeMd) {
        $content = Get-Content $claudeMd -Raw
        if ($content -match [regex]::Escape($marker)) {
            Write-Step SKIP 'CLAUDE.md uv' '이미 있음'
            return
        }
    } else {
        $dir = Split-Path $claudeMd -Parent
        if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    }

    $section = @"

## Python

$marker.
"@
    [System.IO.File]::AppendAllText($claudeMd, $section, [System.Text.UTF8Encoding]::new($false))
    Write-Step OK 'CLAUDE.md uv' "$claudeMd 에 추가"
}

# === 메인 ===================================================================
Write-Host ""
Write-Host "=== Gigang init ==========================================="
Write-Host "WorkDir: $WorkDir"
Write-Host ""

Install-WingetPackage -Id 'Git.Git'              -DisplayName 'git'          -VersionCommand 'git --version'
Install-WingetPackage -Id 'GitHub.cli'           -DisplayName 'gh'           -VersionCommand 'gh --version'
Install-WingetPackage -Id 'Microsoft.PowerShell' -DisplayName 'PowerShell 7' -VersionCommand 'pwsh -Version'
Install-WingetPackage -Id 'OpenJS.NodeJS.LTS'    -DisplayName 'Node.js'      -VersionCommand 'node --version'
Install-WingetPackage -Id 'Oven-sh.Bun'          -DisplayName 'Bun'          -VersionCommand 'bun --version'
Install-Pnpm
Install-Uv
New-WorkDir         -Path    $WorkDir
Set-TerminalDefault -WorkDir $WorkDir
Add-CcAlias
Add-ClaudeMdUv

Write-Host ""
Write-Host "=== 완료 ==================================================="
