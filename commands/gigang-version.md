---
description: Gigang Skills 현재 버전 및 업데이트 상태 표시
---

설치된 Gigang Skills 버전과 자동 업데이트 상태를 표시합니다.

## 실행

PowerShell로 실행:

```powershell
$candidates = @(
    "$env:USERPROFILE\.gigang-skills",
    "C:\Prog\gigang-skills",
    "C:\Prog\PRIVATE\gigang_skills",
    "C:\WORK\gigang-skills"
)
$repoRoot = $candidates |
    Where-Object { Test-Path (Join-Path $_ '.git') } |
    Select-Object -First 1

if (-not $repoRoot) {
    Write-Host "⚠ Gigang Skills repo를 찾을 수 없습니다."
    Write-Host "  자동 업데이트가 설정되지 않은 상태입니다."
    exit
}

$ver    = git -C $repoRoot rev-list --count HEAD 2>$null
$hash   = git -C $repoRoot log -1 --format='%h'
$date   = git -C $repoRoot log -1 --format='%cd' --date=format:'%Y-%m-%d'
$behind = git -C $repoRoot rev-list HEAD..origin/main --count 2>$null

$cmdCount   = @(Get-ChildItem "$env:USERPROFILE\.claude\commands\gigang-*.md" -ErrorAction SilentlyContinue).Count
$skillCount = @(Get-ChildItem "$env:USERPROFILE\.claude\skills\gigang*"       -ErrorAction SilentlyContinue).Count
```

## 결과 표시

위 결과를 바탕으로 다음 형식으로 출력:

```
Gigang Skills  r<ver>
  Repo    : <repoRoot>
  Commit  : <hash>  <date>
  Status  : <상태 메시지>

  설치된 명령: <cmdCount>개  (gigang-*.md)
  설치된 스킬: <skillCount>개  (gigang-*)
```

`$behind` 값에 따라 `<상태 메시지>` 결정:

- `0` 또는 빈 값 → `최신 ✓`
- 양수 → `⚠ origin/main 보다 $behind 커밋 뒤처짐 → 다음 세션 시작 시 자동 업데이트`

## 흔한 상황

- **repo 없음**: `install.ps1`을 한 번도 실행하지 않았거나 자동 업데이트가 표준 경로에 없는 경우. gigang-skills 레포의 `install.ps1` 실행 권장.
- **behind가 비어있음**: origin/main 참조가 없는 경우 (네트워크 미연결 등). "확인 불가" 로 표시.
