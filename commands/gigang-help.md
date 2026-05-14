---
description: Gigang Skills 사용법 표시 — 슬래시 명령·자연어 스킬·데이터 위치 안내
---

Gigang Skills 사용법 문서를 그대로 표시한다.

## 실행

PowerShell로 repo 경로를 찾는다:

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
    Write-Host "NOT_FOUND"
} else {
    Write-Host $repoRoot
}
```

`NOT_FOUND` 가 출력되면:
> Gigang Skills repo를 찾을 수 없습니다. `install.ps1` 을 먼저 실행하세요.

repo 경로가 출력되면 Read 도구로 `<repoRoot>/docs/gigang-usage.md` 를 읽어 **내용을 수정·요약 없이 그대로 출력**한다.
