---
description: 기강 AI 활용 환경 초기 셋업 — winget 패키지, cc alias, Claude Code 플러그인
model: claude-haiku-4-5
---

기강 러닝크루 멤버용 Claude Code 환경 셋업. 한 번 호출하면 필수 패키지, cc alias, Claude Code 플러그인까지 한 번에 처리. 모든 단계 멱등 — 다시 돌려도 안전.

**중요**: 처음 한 번은 `claude --dangerously-skip-permissions` 모드로 호출하세요. winget/git/`claude plugin install` 등 외부 명령마다 권한 프롬프트가 뜨면 부담스럽습니다. 끝나면 `cc` 단축어가 만들어지므로 이후엔 자동.

## Phase 0 — 작업 폴더 결정

PowerShell 로 후보 폴더 검색:

```powershell
@('C:\Prog','C:\WORK','C:\Workspace','C:\Projects','C:\src','C:\dev','C:\code') |
    Where-Object { Test-Path $_ }
```

결과를 기반으로 AskUserQuestion 호출:

- 발견된 폴더들 + `C:\Prog 새로 만들기` 옵션을 보기로 제시
- 첫 번째 (가장 그럴듯한 후보) 라벨 끝에 `(Recommended)` 표시
- 발견 폴더 0개면 `C:\Prog 새로 만들기` 가 유일 옵션

선택된 경로 → 변수 `$WorkDir` 로 보관. 다음 Phase 로.

## Phase 1 — `init.ps1` 호출

repo 위치 검색:

```powershell
$candidates = @(
    "$env:USERPROFILE\.gigang-skills\scripts\init.ps1",
    "C:\Prog\gigang-skills\scripts\init.ps1",
    "C:\WORK\gigang-skills\scripts\init.ps1"
)
$initPath = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
```

발견 못 하면 안내 후 중단:
> init.ps1 못 찾음. gigang-skills repo 가 `$HOME\.gigang-skills` 또는 `C:\Prog\gigang-skills` 에 있는지 확인하세요.

발견하면 호출:

```powershell
pwsh -NoProfile -File $initPath -WorkDir $WorkDir
```

stdout 의 `[OK]/[SKIP]/[FAIL]` 줄들을 캡처해서 Phase 3 요약에 사용.

## Phase 2 — Claude Code 플러그인 설치

```powershell
claude plugin install superpowers@claude-plugins-official
```

멱등 (이미 설치돼 있으면 silently succeed). 설치 후 슬래시 명령으로 `/reload-plugins` 호출.

## Phase 2-b — 디폴트 모델을 Sonnet 으로 변경

`~/.claude/settings.json` 의 `model` 필드를 `claude-sonnet-4-6` 으로 설정:

```powershell
$settingsPath = "$env:USERPROFILE\.claude\settings.json"
$settings = if (Test-Path $settingsPath) {
    Get-Content $settingsPath -Raw | ConvertFrom-Json
} else {
    [PSCustomObject]@{}
}
$settings | Add-Member -NotePropertyName "model" -NotePropertyValue "claude-sonnet-4-6" -Force
$settings | ConvertTo-Json -Depth 10 | Set-Content $settingsPath -Encoding UTF8
```

이미 `claude-sonnet-4-6` 이면 덮어써도 안전 (멱등).

## Phase 2-c — Windows Terminal 글씨체 D2Coding 설정

D2Coding 폰트 설치 + Windows Terminal 적용. 멱등.

```powershell
# 1. 폰트 설치 (이미 있으면 skip)
$fontCheck = "D2Coding-Ver1.3.2-20180524.ttf"
$alreadyInstalled = (Test-Path "C:\Windows\Fonts\$fontCheck") -or
    (Test-Path "$env:LOCALAPPDATA\Microsoft\Windows\Fonts\$fontCheck")

if ($alreadyInstalled) {
    Write-Host '[SKIP] D2Coding 폰트   이미 설치됨'
} else {
    try {
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $zip  = "$env:TEMP\D2Coding.zip"
        $xdir = "$env:TEMP\D2Coding_extracted"
        Invoke-WebRequest -Uri "https://github.com/naver/d2codingfont/releases/download/VER1.3.2/D2Coding-Ver1.3.2-20180524.zip" `
                          -OutFile $zip -UseBasicParsing
        New-Item -ItemType Directory -Path $xdir -Force | Out-Null
        $zf = [System.IO.Compression.ZipFile]::OpenRead($zip)
        foreach ($entry in $zf.Entries) {
            if ($entry.Name -like "*.ttf") {
                $dest = Join-Path $xdir $entry.Name
                $s = $entry.Open(); $fs = [System.IO.File]::Create($dest)
                $s.CopyTo($fs); $fs.Close(); $s.Close()
            }
        }
        $zf.Dispose()
        $shell = New-Object -ComObject Shell.Application
        $fontsFolder = $shell.Namespace(0x14)
        Get-ChildItem $xdir -Filter "*.ttf" | ForEach-Object {
            $fontsFolder.CopyHere($_.FullName, 0x14)
        }
        Remove-Item $zip, $xdir -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host '[OK]   D2Coding 폰트   설치 완료'
    } catch {
        Write-Host "[FAIL] D2Coding 폰트   $_ — 무시하고 계속"
    }
}

# 2. Windows Terminal settings.json 에 font.face 적용
$wtSettings = "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json"
if (Test-Path $wtSettings) {
    $raw = Get-Content $wtSettings -Raw | ConvertFrom-Json
    if (-not $raw.profiles.defaults) {
        $raw.profiles | Add-Member -NotePropertyName defaults -NotePropertyValue ([PSCustomObject]@{}) -Force
    }
    if (-not $raw.profiles.defaults.font) {
        $raw.profiles.defaults | Add-Member -NotePropertyName font -NotePropertyValue ([PSCustomObject]@{}) -Force
    }
    $raw.profiles.defaults.font | Add-Member -NotePropertyName face -NotePropertyValue "D2Coding" -Force
    $raw | ConvertTo-Json -Depth 20 | Set-Content $wtSettings -Encoding UTF8
    Write-Host '[OK]   Terminal 글씨체  D2Coding 적용'
} else {
    Write-Host '[SKIP] Terminal 글씨체  settings.json 없음 — Windows Terminal 미설치 or 경로 다름'
}
```

실패해도 다음 Phase 계속. Terminal 재시작해야 적용됨.

## Phase 3 — 최종 요약

각 Phase 의 결과를 표로:

```
[OK]   git           이미 설치
[OK]   gh            설치 (v2.x.x)
[OK]   PowerShell 7  설치 (v7.4.6)
[OK]   uv            이미 설치
[OK]   작업 폴더     C:\Prog (변경 없음)
[OK]   Terminal      기본=pwsh7, startingDir=C:\Prog
[OK]   cc alias      $PROFILE 에 추가
[OK]   CLAUDE.md     uv 문구 + gigang-skills 이슈 안내 추가
[OK]   superpowers   플러그인 설치
[OK]   디폴트 모델   claude-sonnet-4-6 설정
[OK]   D2Coding 폰트  설치 + Terminal 적용

다음:
  1. 새 PowerShell 창 열기 (PATH 갱신)
  2. cc 로 Claude Code 다시 시작
```

`[FAIL]` 항목이 있으면 강조 + 사용자에게 수동 복구 안내.

## Phase 4 — 실패 항목 이슈 자동 등록

Phase 3 요약에서 `[FAIL]` 항목이 하나라도 있으면 자동으로 GitHub 이슈를 생성한다.

먼저 gh 인증 여부 확인:

```powershell
gh auth status 2>&1
```

인증 안 된 경우 → 이슈 생성 skip, 아래 안내만 출력:
> gh 인증이 필요합니다. `gh auth login` 실행 후 `/gigang-init` 을 다시 호출하면 자동으로 이슈가 등록됩니다.
> 지금 바로 올리려면: https://github.com/Gigang-ST/gigang-skills/issues/new

인증된 경우 → Windows 버전과 실패 항목 목록을 포함한 이슈 생성:

```powershell
$winVer = (Get-CimInstance Win32_OperatingSystem).Caption
$psVer  = $PSVersionTable.PSVersion.ToString()

$failLines = # Phase 3에서 캡처한 [FAIL] 줄들

$body = @"
## 환경
- OS: $winVer
- PowerShell: $psVer

## 실패 항목
$failLines

## 재현 방법
/gigang-init 실행
"@

gh issue create `
    --repo Gigang-ST/gigang-skills `
    --title "[gigang-init] $($failLines.Count)개 항목 실패" `
    --body $body `
    --label "bug"
```

이슈 생성 성공 시:
> 이슈가 등록됐습니다: <이슈 URL>
> 확인 후 수동으로 처리하거나 멤버에게 공유하세요.

이슈 생성 실패 시 (네트워크 오류 등) → URL 안내로 fallback:
> 이슈 자동 등록 실패. 직접 올려주세요: https://github.com/Gigang-ST/gigang-skills/issues/new

## 흔한 실수

- winget 자체 미설치 (Windows 10 구버전) → https://aka.ms/getwinget 안내
- Windows Terminal 한 번도 안 열어봄 → PowerShell 7 프로파일 미등록. Terminal 한 번 열고 init 다시 돌리기
- `cc` alias 가 새 셸에서만 보임 → 첫 실행 끝나고 새 PowerShell 창 열어야 사용 가능
