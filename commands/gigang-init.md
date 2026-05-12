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
[OK]   CLAUDE.md     uv 문구 추가
[OK]   superpowers   플러그인 설치
[OK]   디폴트 모델   claude-sonnet-4-6 설정

다음:
  1. 새 PowerShell 창 열기 (PATH 갱신)
  2. cc 로 Claude Code 다시 시작
```

`[FAIL]` 항목이 있으면 강조 + 사용자에게 수동 복구 안내.

## 흔한 실수

- winget 자체 미설치 (Windows 10 구버전) → https://aka.ms/getwinget 안내
- Windows Terminal 한 번도 안 열어봄 → PowerShell 7 프로파일 미등록. Terminal 한 번 열고 init 다시 돌리기
- `cc` alias 가 새 셸에서만 보임 → 첫 실행 끝나고 새 PowerShell 창 열어야 사용 가능
