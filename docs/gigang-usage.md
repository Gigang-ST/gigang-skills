# Gigang Skills 사용법

## 빠른 참조

| 명령 | 용도 |
|------|------|
| `/gigang-init` | 신규 멤버 환경 초기 셋업 |
| `/gigang-help` | 이 사용법 문서 표시 |
| `/gigang-version` | 설치된 버전 및 업데이트 상태 확인 |
| `/folder-guide` | 대화형 폴더 구조 생성 및 정리 (구버전) |
| `/gigang-folder-guide` | 대화형 폴더 구조 생성 및 정리 |
| `/gigang-report` | 버그·개선 아이디어를 GitHub Issue로 제출 |

**자연어 스킬** (슬래시 없이 말로 발동):

| 발동 표현 | 스킬 |
|-----------|------|
| "어제 뭐했더라", "지난주 작업 정리해줘" | `gigang-뭐했더라` |
| "폴더 구조 잡아줘", "폴더 정리해줘" | `gigang-folder-guide` |
| "버그 보고해줘", "이슈 올려줘" | `gigang-report` |

## /gigang-init

**용도**: 기강 멤버의 Claude Code 환경을 한 번에 셋업.

**설치 항목**:
- `git`, `gh` (GitHub CLI), PowerShell 7, uv (Python 실행기)
- Windows Terminal 기본 프로파일 → PowerShell 7, 시작 디렉토리 설정
- D2Coding 폰트 설치 + Windows Terminal 글씨체 적용
- `cc` alias (`claude --dangerously-skip-permissions`)
- `~/.claude/CLAUDE.md` uv 문구
- Claude Code 플러그인: superpowers
- gstack (웹 브라우저 자동화 스킬 모음) — `~/.claude/skills/gstack` 클론 + CLAUDE.md gstack 섹션

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

## /gigang-folder-guide

**용도**: 대화형 폴더 구조 가이드. 프로젝트 유형을 질문한 뒤 맞춤 폴더 구조를 제안하고, 확인 후 실제로 생성한다.

**지원 프로젝트 유형**:
- 업무문서 — 보고서, 엑셀, PPT 등 일반 업무 파일
- AI 활용 — Claude 프롬프트와 결과물 관리
- 데이터 분석 — 데이터 처리, 분석, 차트 생성
- 소프트웨어 개발 — Python/스크립트 개발, 빌드·배포 포함

**주요 기능**:
- 트리 구조 미리보기 → 확인 후 폴더 생성
- `todo.md`, `notes.md` 자동 생성
- 기존 코드/문서의 경로 참조 자동 업데이트
- CLAUDE.md 150줄 초과 시 하위 파일 분리 제안

**트리거 표현**:
- "폴더 구조 잡아줘"
- "폴더 정리 도와줘"
- "프로젝트 디렉토리 만들어줘"
- `/gigang-folder-guide`

## /gigang-뭐했더라 (자연어 스킬)

**용도**: 과거 Claude 세션 작업 내역 조회. 날짜별 로그를 읽어 bullet 요약으로 표시.

**발동 표현**:
- "어제 뭐했더라", "지난주에 뭐했지"
- "5/13에 뭐했더라", "이번주 정리해줘"
- "전체 어제 뭐했더라" → 모든 프로젝트 조회

로그 위치: `~/.claude/logs/prompts/<project>/<날짜>.md`  
요약 캐시: `~/.claude/logs/prompts/<project>/<YYMMDD>_summary.md`

## /gigang-report (자연어 스킬)

**용도**: 스킬·커맨드의 버그, 개선 아이디어, 기능 요청을 GitHub Issue로 제출.

**발동 표현**: "버그 보고해줘", "이슈 올려줘", "에러 났어", "개선 제안 올리고 싶어"

**gh CLI 미설치 시**: 설치·로그인 가이드 안내 후 직접 링크 제공.

Issue 제출처: https://github.com/Gigang-ST/gigang-skills/issues

## /gigang-version

**용도**: 설치된 Gigang Skills 버전, repo 위치, 최신 여부 표시.

## /gigang-help

**용도**: 이 사용법 문서(`docs/gigang-usage.md`)를 그대로 출력.

## /folder-guide (구버전)

`/gigang-folder-guide` 로 대체됨. 기존 사용자 호환용으로 유지.

---

## 교육 자료 (education/)

기강 멤버 대상 Agentic AI 교육 커리큘럼. 4brain-skills 교육 자료를 기강 브랜드로 적용.

| 파일 | 내용 |
|------|------|
| `education/draft_md/00-index.md` | 커리큘럼 인덱스 및 시간표 |
| `education/draft_md/01-why.md` | 왜 Agentic AI인가 |
| `education/draft_md/02-concepts.md` | 핵심 용어 (토큰·컨텍스트·MCP 등) |
| `education/draft_md/03-setup.md` | Claude Code + gigang-skills 설치 가이드 |
| `education/draft_md/04-usage.md` | 기본 사용법 & 단축키 |
| `education/draft_md/05-security.md` | 주의사항 & 보안 |
| `education/draft_md/06-gigang.md` | 기강 스킬 활용 (자동 로그·팀 도구) |
| `education/draft_md/appendix/` | A~G: Git, uv, 프롬프트, CLAUDE.md, MCP, 자동화, 폴더구조 |
| `education/draft_md/appendix/H-gigang-뭐했더라.md` | 과거 세션 조회 — 커리큘럼 이후 추가 기능 |

### PPT 제작 도구

| 파일 | 용도 |
|------|------|
| `education/ppt/design.md` | 기강 PPT 디자인 시스템 (색상·폰트·레이아웃) |
| `education/ppt/GIGANG_PPT_Design_System_Prompt.md` | Claude에게 붙여넣는 슬라이드 제작 프롬프트 |

**PPT 제작 시**: `GIGANG_PPT_Design_System_Prompt.md` 전체를 Claude에 붙여넣은 뒤 슬라이드 내용을 요청.

**로고 위치**: `C:\Prog\PRIVATE\gigang-client\public\logo.webp` (흑백), `logo_white.webp` (흰색)
