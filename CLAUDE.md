# Gigang Skills — 프로젝트 규칙

## Python

Python이 필요하면 항상 `uv run --no-project python` 사용. 절대 bare `python` / `python3` 호출 금지.
테스트: `uv run --no-project pytest`. 외부 패키지: `uv run --no-project --with <pkg> python`.

## 사용법 문서 자동 업데이트

`commands/` 또는 `skills/` 에 파일을 추가·변경·삭제하면
**같은 커밋에서 `docs/gigang-usage.md` 도 반드시 수정**한다.

- 새 명령·스킬 → 빠른 참조 표에 행 추가 + 상세 섹션 작성
- 동작·옵션 변경 → 해당 섹션 수정
- 삭제·이름 변경 → usage 문서에서 항목 제거

## 커맨드·스킬 파일 규칙

- `commands/*.md` frontmatter: `description` 필수. 비용 큰 작업은 `model: claude-haiku-4-5`.
- `skills/*/SKILL.md` frontmatter: `description` 에 발동 표현 예시 포함.
- 커맨드가 PowerShell + Python 모두 쓸 때는 PowerShell → `uv run` 순서.

## 인코딩

- `.ps1` 스크립트 (한글 포함): UTF-8 **BOM 있음** — Windows PowerShell 5.1이 BOM 없는 UTF-8을 ANSI로 오독해 한글 라인부터 파싱 실패. `.ps1` 파일을 저장할 때는 BOM 보존 필수.
- `scripts/init.sh` (bash): UTF-8 BOM 없음.
- Python hook 스크립트 stdout: `sys.stdout.reconfigure(encoding="utf-8")` 호출. Windows 기본 cp949에서 한글 JSON 출력 시 Claude Code가 파싱 실패.
- 새 파일: 특별한 이유 없으면 UTF-8 BOM 없음.

## Hook 등록

훅은 `hooks/hooks.json` 에 선언한다. 플러그인 시스템이 `${CLAUDE_PLUGIN_ROOT}` 를 기준으로 경로를 해석해 자동 등록한다.

- 훅 실행 파일: `hooks/*.py`
- **`args` 없이 `command` 하나에 전체 셸 문자열을 넣는다(shell form)**: `uv run --no-project python "${CLAUDE_PLUGIN_ROOT}/hooks/log_prompt.py"` (스크립트 경로는 공백 대비 큰따옴표로 감쌀 것). `args` 를 함께 넣으면 exec form 으로 바뀌어 `command` 가 단일 실행 파일 이름으로 해석된다 — `command: "uv run --no-project python"` + `args: [...]` 처럼 쓰면 "uv run --no-project python" 을 통째로 실행 파일로 찾다가 실패하고, 결과적으로 스크립트 경로 없이 `uv run --no-project python` 만 돌아 stdin 의 이벤트 JSON 을 소스로 해석한다(Stop 페이로드의 `false` → `NameError`). 관련 이슈 #5.
- 경로 참조 예시: `"${CLAUDE_PLUGIN_ROOT}/hooks/log_prompt.py"`
- `hooks.json` 포맷은 기존 선언을 참고. 새 훅 추가 시 이미 있는 이벤트 키(`UserPromptSubmit`, `Stop` 등)에 항목을 append하고 idempotent하게 작성.
- `uv` 최초 Python 다운로드 시 간헐적 타임아웃을 피하려 timeout 은 최소 10초.
