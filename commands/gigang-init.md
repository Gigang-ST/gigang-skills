---
description: 기강 개발 환경 초기 셋업 — winget 패키지, cc alias, Claude Code 플러그인, MCP 설치, gstack
model: claude-haiku-4-5
---

기강 러닝크루 개발팀 신규 멤버용 환경 셋업. 한 번 호출하면 winget 패키지, cc alias, Claude Code 플러그인, MCP, gstack까지 한 번에 처리. 모든 단계 멱등 — 다시 돌려도 안전.

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

stdout 의 `[OK]/[SKIP]/[FAIL]` 줄들을 캡처해서 Phase 5 요약에 사용.

## Phase 2 — Claude Code 플러그인 설치

```powershell
claude plugin install superpowers@claude-plugins-official
claude plugin install playwright@claude-plugins-official
```

둘 다 멱등 (이미 설치돼 있으면 silently succeed). 설치 후 슬래시 명령으로 `/reload-plugins` 호출.

각 명령 결과를 `[OK]` / `[FAIL]` 로 기록.

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

이미 `claude-sonnet-4-6` 이면 덮어써도 안전 (멱등). 결과를 `[OK] 디폴트 모델  claude-sonnet-4-6` 로 기록.

## Phase 3 — gstack 설치

```powershell
$gstackDir = "$HOME\.claude\skills\gstack"
if (-not (Test-Path "$gstackDir\.git")) {
    git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git $gstackDir
}
Set-Location $gstackDir

$bashExe = $null
$gitCmd  = Get-Command git -ErrorAction SilentlyContinue
if ($gitCmd) {
    $gitRoot   = Split-Path -Parent (Split-Path -Parent $gitCmd.Source)
    $candidate = Join-Path $gitRoot 'bin\bash.exe'
    if (Test-Path $candidate) { $bashExe = $candidate }
}

if (-not $bashExe) {
    Write-Host '[FAIL] gstack         Git Bash 미발견 - https://github.com/garrytan/gstack 참고해 수동 설치'
} else {
    & $bashExe ./setup
    if ($LASTEXITCODE -eq 0) {
        Write-Host '[OK]   gstack         설치 + setup 완료'
    } else {
        Write-Host "[FAIL] gstack         setup 종료 코드 $LASTEXITCODE"
    }
}
```

이미 `.git` 디렉토리 있으면 clone skip, `setup` 만 다시 실행.

`~/.claude/CLAUDE.md` 에 **gstack 섹션** 추가 (멱등):

```powershell
$claudeMd = "$env:USERPROFILE\.claude\CLAUDE.md"
$marker   = '## gstack'
$content  = if (Test-Path $claudeMd) { Get-Content $claudeMd -Raw } else { '' }
if ($content -notmatch [regex]::Escape($marker)) {
    $section = @"

## gstack

모든 웹 브라우징은 gstack 의 ``/browse`` 스킬 사용. ``mcp__claude-in-chrome__*`` 도구는 사용하지 않는다.
"@
    Add-Content -Path $claudeMd -Value $section -Encoding UTF8
}
```

그 다음 슬래시 명령으로 `/unfreeze`, `/gstack-upgrade`, `/learn` 차례로 호출.

## Phase 4 — MCP 설치 여부 안내

기강 프로젝트(gigang-client)는 `.mcp.json` 을 통해 MCP 서버를 관리합니다. Claude Code 가 프로젝트 폴더에서 실행되면 자동으로 인식합니다.

gigang-client 체크아웃 후 해당 폴더에서 `cc` 로 Claude Code 를 열면 다음 MCP 가 자동 활성화됩니다:
- `supabase-gigang-dev` / `supabase-gigang-prd` / `supabase-gigang-local`
- `vercel`
- `chrome-devtools`
- `shadcn`

Supabase MCP 인증이 필요하면:
> 새 PowerShell 창에서 `claude` 를 열고 supabase MCP 도구를 한 번 사용하면 브라우저 인증 프롬프트가 뜹니다.

## Phase 5 — 최종 요약

각 Phase 의 결과를 표로:

```
[OK]   git           이미 설치
[OK]   PowerShell 7  설치 (v7.4.6)
[OK]   Node.js       설치 (v20.18.0)
[OK]   Bun           설치 (v1.1.34)
[OK]   pnpm          설치 (v9.x.x)
[OK]   gh            설치 (v2.x.x)
[OK]   uv            이미 설치
[OK]   작업 폴더     C:\Prog (변경 없음)
[OK]   Terminal      기본=pwsh7, startingDir=C:\Prog
[OK]   cc alias      $PROFILE 에 추가
[OK]   CLAUDE.md     uv 문구 + gstack 섹션
[OK]   superpowers   플러그인 설치
[OK]   playwright    플러그인 설치
[OK]   디폴트 모델   claude-sonnet-4-6 설정
[OK]   gstack        설치 + 후속 명령 실행 완료
[INFO] MCP           gigang-client 폴더에서 cc 열면 자동 활성

다음:
  1. 새 PowerShell 창 열기 (PATH 갱신)
  2. cc 로 Claude Code 다시 시작
  3. C:\Prog 에 gigang-client 클론 후 cc 로 개발 시작
```

`[FAIL]` 항목이 있으면 강조 + 사용자에게 수동 복구 안내.

## 흔한 실수

- winget 자체 미설치 (Windows 10 구버전) → https://aka.ms/getwinget 안내
- Windows Terminal 한 번도 안 열어봄 → PowerShell 7 프로파일 미등록. Terminal 한 번 열고 init 다시 돌리기
- `cc` alias 가 새 셸에서만 보임 → 첫 실행 끝나고 새 PowerShell 창 열어야 사용 가능
