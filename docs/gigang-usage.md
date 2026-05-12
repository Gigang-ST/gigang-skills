# Gigang Skills 사용법

## 빠른 참조

| 명령 | 용도 |
|------|------|
| `/gigang-init` | 신규 멤버 환경 초기 셋업 |
| `/folder-guide` | 대화형 폴더 구조 생성 및 정리 |

## /gigang-init

**용도**: 기강 멤버의 Claude Code 환경을 한 번에 셋업.

**설치 항목**:
- `git`, `gh` (GitHub CLI), PowerShell 7, uv (Python 실행기)
- Windows Terminal 기본 프로파일 → PowerShell 7, 시작 디렉토리 설정
- `cc` alias (`claude --dangerously-skip-permissions`)
- `~/.claude/CLAUDE.md` uv 문구
- Claude Code 플러그인: superpowers

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

> **평문 저장 주의**: API 키·비밀번호 등을 prompt에 직접 입력하지 마세요.

## 자동 업데이트

SessionStart hook이 매 Claude Code 세션 시작 시 백그라운드로 `git fetch + pull + install.ps1` 재실행. 별도 작업 불필요.

비활성화: `~/.claude/settings.json` 의 `hooks.SessionStart` 에서 `update.ps1` 항목 제거.

## /folder-guide

**용도**: 비개발자를 위한 대화형 폴더 구조 가이드.
프로젝트 유형을 질문한 뒤 맞춤 폴더 구조를 제안하고, 확인 후 실제로 생성한다.

**지원 프로젝트 유형**:
- 업무문서 — 보고서, 엑셀, PPT 등 일반 업무 파일
- AI 활용 — Claude/GPT 프롬프트와 결과물 관리
- 데이터 분석 — 데이터 처리, 분석, 차트 생성
- 복합 — 위 여러 유형 조합

**주요 기능**:
- 트리 구조 미리보기 → 확인 후 폴더 생성
- `todo.md`, `notes.md` 자동 생성
- 기존 코드/문서의 경로 참조 자동 업데이트
- CLAUDE.md 150줄 초과 시 하위 파일 분리 제안

**트리거 표현**:
- "폴더 구조 잡아줘"
- "폴더 정리 도와줘"
- "프로젝트 디렉토리 만들어줘"
- `/folder-guide`
