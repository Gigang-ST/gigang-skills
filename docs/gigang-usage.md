# Gigang Skills 사용법

## 빠른 참조

| 명령 | 용도 |
|------|------|
| `/gigang-init` | 신규 멤버 환경 초기 셋업 |

## /gigang-init

**용도**: 신규 기강 개발팀 멤버의 개발 환경을 한 번에 셋업.

**설치 항목**:
- `git`, `gh` (GitHub CLI), PowerShell 7, Node.js LTS, Bun, pnpm, uv
- Windows Terminal 기본 프로파일 → PowerShell 7, 시작 디렉토리 설정
- `cc` alias (`claude --dangerously-skip-permissions`)
- `~/.claude/CLAUDE.md` uv 문구
- Claude Code 플러그인: superpowers, playwright
- gstack

**MCP**: gigang-client 폴더를 열면 `.mcp.json` 을 통해 자동 활성.

**실행**:
```
claude --dangerously-skip-permissions
/gigang-init
```

멱등 — 재실행해도 안전.

## 프롬프트/응답 로그

`UserPromptSubmit` / `Stop` hook 이 매 세션의 프롬프트와 응답을 날짜별 마크다운으로 저장합니다.

로그 위치: `~/.claude/logs/prompts/<project-name>/YYYY-MM-DD.md`

비활성화: `~/.claude/settings.json` 에서 `UserPromptSubmit` / `Stop` 항목 제거.

> **평문 저장 주의**: API 키·비밀번호 등을 prompt에 직접 입력하지 마세요. 로컬에만 저장되며 외부 전송은 없지만, 백업·동기화 대상에 포함되지 않도록 주의.

## 자동 업데이트

SessionStart hook이 매 Claude Code 세션 시작 시 백그라운드로 `git fetch + pull + install.ps1` 재실행. 별도 작업 불필요.

비활성화: `~/.claude/settings.json` 의 `hooks.SessionStart` 에서 `update.ps1` 항목 제거.
