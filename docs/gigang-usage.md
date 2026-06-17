# Gigang Skills 사용법

## 빠른 참조

| 명령 | 용도 |
|------|------|
| `/gigang:init` | 신규 멤버 환경 초기 셋업 |
| `/gigang:help` | 이 사용법 문서 표시 + 마이그레이션 점검 |
| `/gigang:version` | 설치된 버전 및 업데이트 상태 확인 |
| `/gigang:folder-guide` | 대화형 폴더 구조 생성 및 정리 |
| `/gigang:report` | 버그·개선 아이디어를 GitHub Issue로 제출 |
| `/gigang:recall` | 과거 Claude 세션 작업 내역 조회 ("어제 뭐했더라") |
| `/gigang` | 자연어 라우터 ("기강 셋업해줘" 등 말로 발동) |

**자연어 스킬** (슬래시 없이 말로 발동):

| 발동 표현 | 스킬 |
|-----------|------|
| "기강 환경 셋업해줘", "기강 도움말" | `gigang` (자연어 라우터) |
| "어제 뭐했더라", "지난주 작업 정리해줘" | `gigang:recall` |
| "폴더 구조 잡아줘", "폴더 정리해줘" | `gigang:folder-guide` |
| "버그 보고해줘", "이슈 올려줘" | `gigang:report` |

## 설치 / 업데이트

Claude Code 에서:

```
/plugin marketplace add Gigang-ST/gigang-skills
/plugin install gigang@gigang-skills
```

서드파티 마켓플레이스 플러그인은 기본적으로 자동 업데이트가 비활성일 수 있습니다. `/plugin` 명령으로 업데이트 정책을 확인하세요.

### 기존 install.ps1 멤버 → 플러그인 전환

예전 `install.ps1` 로 깐 멤버는 마이그레이션 스크립트로 잔재 정리 + 플러그인 설치를 한 번에 처리합니다 (settings.json 자동 백업, 4brain 공용 hook 보존).

**repo 없이 한 줄로**:

- Windows: `irm https://raw.githubusercontent.com/Gigang-ST/gigang-skills/main/scripts/migrate.ps1 -OutFile "$env:TEMP\gm.ps1"; powershell -ExecutionPolicy Bypass -File "$env:TEMP\gm.ps1"`
- macOS/Linux: `curl -fsSL https://raw.githubusercontent.com/Gigang-ST/gigang-skills/main/scripts/migrate.sh | bash`

repo 를 받아둔 경우 로컬 실행: `scripts\migrate.ps1` / `bash scripts/migrate.sh`. 수동 절차는 `/gigang:help` 가 안내합니다.

## /gigang:init

**용도**: 기강 멤버의 Claude Code 환경을 한 번에 셋업.

**설치 항목**:
- `git`, `gh` (GitHub CLI), uv (Python 실행기)
- Windows: PowerShell 7, Windows Terminal 기본 프로파일 설정, D2Coding 폰트
- `cc` alias (`claude --dangerously-skip-permissions`)
- `~/.claude/CLAUDE.md` uv 문구
- Claude Code 플러그인: superpowers
- gstack (웹 브라우저 자동화 스킬 모음) — `~/.claude/skills/gstack` 클론 + CLAUDE.md gstack 섹션
- 디폴트 모델: `claude-sonnet-4-6`

**실행**:
```
claude --dangerously-skip-permissions
/gigang:init
```

멱등 — 재실행해도 안전. OS를 자동 감지해 macOS / Windows 각각 적합한 셋업 실행.

## 프롬프트/응답 로그

`UserPromptSubmit` / `Stop` hook 이 매 세션의 프롬프트와 응답을 날짜별 마크다운으로 저장합니다.

로그 위치: `~/.claude/logs/prompts/<project-name>/YYYY-MM-DD.md`

비활성화: `hooks/hooks.json` 의 선언에 따라 플러그인이 hook을 등록합니다. hook을 끄려면 `~/.claude/settings.json` 에서 해당 훅 항목을 제거하세요.

> **평문 저장 주의**: API 키·비밀번호 등을 prompt에 직접 입력하지 마세요.

## 자동 업데이트

플러그인 시스템이 업데이트를 관리합니다. `/plugin` 명령으로 현재 버전 및 업데이트 가능 여부를 확인하세요.

## /gigang:help

**용도**: 이 사용법 문서(`docs/gigang-usage.md`)를 그대로 출력. 또한 기존 `install.ps1` 방식으로 설치한 멤버를 위한 마이그레이션 점검·정리 절차를 안내합니다.

## /gigang:version

**용도**: 설치된 Gigang Skills 버전, repo 위치, 최신 여부 표시.

## /gigang:folder-guide

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
- `/gigang:folder-guide`

## /gigang:recall (자연어 스킬)

**용도**: 과거 Claude 세션 작업 내역 조회. 날짜별 로그를 읽어 bullet 요약으로 표시.

**발동 표현**:
- "어제 뭐했더라", "지난주에 뭐했지"
- "5/13에 뭐했더라", "이번주 정리해줘"
- "전체 어제 뭐했더라" → 모든 프로젝트 조회

로그 위치: `~/.claude/logs/prompts/<project>/<날짜>.md`  
요약 캐시: `~/.claude/logs/prompts/<project>/<YYMMDD>_summary.md`

## /gigang:report (자연어 스킬)

**용도**: 스킬·커맨드의 버그, 개선 아이디어, 기능 요청을 GitHub Issue로 제출.

**발동 표현**: "버그 보고해줘", "이슈 올려줘", "에러 났어", "개선 제안 올리고 싶어"

**gh CLI 미설치 시**: 설치·로그인 가이드 안내 후 직접 링크 제공.

Issue 제출처: https://github.com/Gigang-ST/gigang-skills/issues

## /gigang (자연어 라우터 스킬)

**용도**: 슬래시 명령을 외울 필요 없이 평소 말투로 기강 작업 시작.

**발동 표현**:
- "신규 멤버 환경 셋업해줘", "기강 깔아줘" → `/gigang:init`
- "기강 뭐 있어", "기강 도움말" → 명령 목록 출력

---

## 교육 자료 (education/)

기강 멤버 대상 Agentic AI 교육 커리큘럼. 4brain-skills 교육 자료를 기강 브랜드로 적용.

**PPT 제작 시**: `education/ppt/GIGANG_PPT_Design_System_Prompt.md` 전체를 Claude에 붙여넣은 뒤 슬라이드 내용을 요청.
