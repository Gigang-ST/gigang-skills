# Gigang Skills

기강 러닝크루 개발팀이 함께 쓰는 Claude Code 슬래시 커맨드/스킬 모음.

## 설치 (Windows)

> **사전 — PowerShell 실행 정책**: 신규 PC가 `Restricted` 정책이면 `install.ps1` 실행이 막힙니다. 한 번만:
>
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

### 방법 A — Claude에게 시키기 (Claude Code 설치된 경우)

Claude Code 에 아래 프롬프트를 붙여넣으세요:

```
gigang-skills 설치해줘.

repo: https://github.com/Gigang-ST/gigang-skills
설치 경로: C:\Prog\gigang-skills

아래 순서대로 진행해. 각 단계 결과를 [OK]/[FAIL] 로 보고해줘.

**0. git + gh 설치**
winget install -e --id Git.Git --accept-package-agreements --accept-source-agreements
winget install -e --id GitHub.cli --accept-package-agreements --accept-source-agreements
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')

**1. repo clone**
if (Test-Path "C:\Prog\gigang-skills") { Remove-Item -Recurse -Force "C:\Prog\gigang-skills" }
git clone https://github.com/Gigang-ST/gigang-skills.git C:\Prog\gigang-skills

**2. install.ps1 실행**
& "C:\Prog\gigang-skills\install.ps1"

**3. /gigang-init 호출**

완료 후 반드시 이렇게 안내해줘:
"설치 완료. → 새 PowerShell 창 하나 열어주세요 (PATH·cc alias 적용) → 새 창에서: cc 로 Claude Code 시작"
```

### 방법 B — 직접 설치

1. GitHub 페이지에서 `Code` → `Download ZIP`
2. 압축 풀기
3. 풀린 폴더에서 PowerShell 열고: `.\install.ps1`

설치 위치:
- 슬래시 커맨드: `%USERPROFILE%\.claude\commands\<name>.md`
- 스킬: `%USERPROFILE%\.claude\skills\<name>\`
- 훅 스크립트: `%USERPROFILE%\.claude\hooks\<name>.py`

업데이트: **자동** — SessionStart hook이 매 Claude Code 세션 시작 시 백그라운드로 `git fetch + pull + install.ps1` 재실행.

### 사전 준비 — `uv` (프롬프트 로그용)

```powershell
irm https://astral.sh/uv/install.ps1 | iex
```

로그 위치: `~/.claude/logs/prompts/<project-name>/YYYY-MM-DD.md`

> **평문 저장 주의**: 사용자가 입력한 prompt 전체가 평문 마크다운으로 저장됩니다. API 키·비밀번호 등을 prompt에 넣지 마세요. 로컬에만 저장되며 외부 전송은 없습니다.

## 들어있는 명령

| 명령 | 용도 |
|------|------|
| `/gigang-init` | 신규 멤버 환경 초기 셋업 — winget 패키지, cc alias, Claude Code 플러그인, MCP 설치 |

## 신규 멤버 첫 셋업

설치 끝났으면 한 번만:

```
claude --dangerously-skip-permissions
```

→ Claude 안에서 `/gigang-init` 호출.

이게 winget 패키지(git, gh, pwsh7, node, bun, pnpm, uv), cc 단축어, Claude Code 플러그인(superpowers, playwright), gstack까지 한 번에 처리. 끝나면:

1. 새 PowerShell 창 열기 (PATH 갱신)
2. `cc` 로 Claude Code 다시 시작

`/gigang-init` 은 멱등 — 재실행해도 부작용 없음.

## 라이선스

MIT
