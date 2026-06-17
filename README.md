# Gigang Skills

기강 러닝크루 멤버가 Claude Code 로 AI 자동화를 쉽게 시작할 수 있도록 도와주는 슬래시 커맨드/스킬 모음.

엑셀 자동화, 데이터 정리, 반복 작업 자동화 등 비개발자도 AI 를 바로 활용할 수 있게 환경을 셋업해줍니다.

## 설치 (Claude Code 플러그인)

Claude Code 에서 아래 두 명령을 순서대로 실행합니다:

```
/plugin marketplace add Gigang-ST/gigang-skills
/plugin install gigang@gigang-skills
```

> **자동 업데이트**: 서드파티 마켓플레이스 등록 플러그인은 기본적으로 자동 업데이트가 비활성일 수 있습니다. `/plugin` 명령으로 업데이트 정책을 확인하세요.

### 사전 준비 — `uv` (프롬프트 로그용)

**Windows**:
```powershell
irm https://astral.sh/uv/install.ps1 | iex
```

**macOS / Linux**:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

로그 위치: `~/.claude/logs/prompts/<project-name>/YYYY-MM-DD.md`

> **평문 저장 주의**: API 키·비밀번호 등을 Claude 에 직접 입력하지 마세요. 로컬에만 저장되며 외부 전송은 없습니다.

## 기존 멤버 마이그레이션

이전에 `install.ps1` 방식으로 설치한 멤버는 `~/.claude/` 아래 파일 잔재가 남아 플러그인과 충돌할 수 있습니다. 마이그레이션 스크립트가 잔재 정리 + 플러그인 설치를 한 번에 처리합니다 (settings.json 자동 백업, 4brain 공용 hook 보존):

- Windows: `powershell -ExecutionPolicy Bypass -File scripts\migrate.ps1`
- macOS/Linux: `bash scripts/migrate.sh`

수동으로 하려면 `/gigang:help` 가 점검·정리 절차를 안내합니다.

## 들어있는 명령

| 명령 | 용도 |
|------|------|
| `/gigang:init` | 신규 멤버 환경 초기 셋업 (git, gh, uv, cc alias, 플러그인) |
| `/gigang:help` | 사용법 안내 + 기존 설치 마이그레이션 점검 |
| `/gigang:version` | 설치된 버전 및 업데이트 상태 확인 |
| `/gigang:folder-guide` | 대화형 폴더 구조 생성 및 정리 |
| `/gigang:report` | 버그·개선 아이디어를 GitHub Issue로 제출 |
| `/gigang:recall` | 과거 Claude 세션 작업 내역 조회 ("어제 뭐했더라") |

**자연어 스킬** (슬래시 없이 말로 발동):

| 발동 표현 | 스킬 |
|-----------|------|
| "기강 환경 셋업해줘", "기강 도움말" | `gigang` (자연어 라우터) |
| "어제 뭐했더라", "지난주 작업 정리해줘" | `gigang:recall` |
| "폴더 구조 잡아줘", "폴더 정리해줘" | `gigang:folder-guide` |
| "버그 보고해줘", "이슈 올려줘" | `gigang:report` |

## 신규 멤버 첫 셋업

플러그인 설치 후 한 번만:

```
claude --dangerously-skip-permissions
/gigang:init
```

이게 git, gh, uv 설치부터 cc 단축어, Claude Code 플러그인(superpowers)까지 한 번에 처리. 끝나면:

1. 새 터미널 창 열기 (PATH 갱신)
2. `cc` 로 Claude Code 다시 시작

`/gigang:init` 은 멱등 — 재실행해도 안전.

## 문제 신고 / 개선 제안

버그, 설치 실패, 불편한 점, 추가됐으면 하는 기능 — 뭐든 이슈로 올려주세요.

**→ https://github.com/Gigang-ST/gigang-skills/issues/new**

이슈 작성 시 아래 내용만 적어주면 됩니다:

- **무슨 일이 있었나** (예: `/gigang:init` 실행했더니 `[FAIL] uv` 떴다)
- **어떻게 됐으면 좋겠나** (예: uv가 자동으로 설치됐으면 좋겠다)
- **PC 환경** — OS, 어떤 방법으로 설치했는지

형식 없이 한국어로 자유롭게 써도 됩니다.

## 라이선스

MIT
