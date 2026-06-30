---
name: set-inline-status
description: Claude Code 인라인 스테이터스(statusline) 설정 — "인라인 스테이터스 셋업", "상태줄 무지개로", "statusline 깔아줘", "하단 상태표시줄 켜줘" 같은 요청 시 발동. gigang 표준 멀티라인 statusline(모델·경로·git·무지개 컨텍스트 바·비용·5h/7d 한도)을 ~/.claude 에 설치하고 settings.json 에 연결한다. 폴더 구조·로그 등 다른 gigang 작업과는 무관.
---

# set-inline-status (인라인 스테이터스 셋업)

Claude Code 하단 상태표시줄(statusline)을 gigang 표준 디자인으로 설치·연결하는 스킬.

표시 내용:
- **1줄**: `user@host:경로 [모델] 🌿브랜치 +스테이지 ~수정`
- **2줄**: 무지개 컨텍스트 사용량 바 + `%` + `(사용/전체 토큰)` + `$비용` + `⏱경과시간`
- **3줄**: `5h` / `7d` rate-limit 무지개 바 (Claude.ai Pro/Max 구독 + 세션 첫 API 응답 후에만 표시)

무지개 바: 채워진 비율 = 실제 사용률, 색은 초록(낮음)→노랑→주황→빨강(높음)으로 그라데이션. TrueColor(24bit) 지원 터미널에서만 무지개로 보인다(Windows Terminal·iTerm2·WezTerm·Kitty·VS Code 등 대부분 지원).

## 발동 조건

- "인라인 스테이터스 셋업", "상태줄 설정", "statusline 깔아줘/켜줘"
- "하단 상태표시줄 무지개로", "컨텍스트 바 보이게 해줘"
- "statusline gigang 표준으로"

상태줄과 무관한 일반 작업에는 발동하지 않는다.

## 절차

### 1. 플러그인 디렉토리 결정

스크립트 정본(`statusline.sh`)이 들어있는 플러그인 위치를 찾는다:

```bash
plugin_dir="${CLAUDE_PLUGIN_ROOT:-}"
if [ -z "$plugin_dir" ]; then
  pj=$(find ~/.claude/plugins/cache -path '*/gigang/*/.claude-plugin/plugin.json' 2>/dev/null | head -1)
  [ -n "$pj" ] && plugin_dir=$(dirname "$(dirname "$pj")")
fi
src="$plugin_dir/skills/set-inline-status/statusline.sh"
[ -f "$src" ] || echo "⚠ statusline.sh 못 찾음 — 플러그인 설치 확인 (/gigang:version)"
```

### 2. 의존성 점검 (jq)

statusline 은 `jq` 로 JSON 을 파싱한다. 없으면 설치:

- **bash/macOS/Linux**: `command -v jq` 로 확인. 없으면 `brew install jq` 또는 패키지 매니저 안내.
- **Windows (PowerShell)**: `where.exe jq` 로 확인. 없으면 `winget install jqlang.jq`.

`awk` 는 Git Bash 에 기본 포함이라 별도 설치 불필요.

### 3. 스크립트 설치

정본을 사용자 홈으로 복사하고 실행권한 부여:

```bash
mkdir -p ~/.claude
cp "$src" ~/.claude/gigang-statusline.sh
chmod +x ~/.claude/gigang-statusline.sh
```

> **Windows 주의**: settings.json 의 `command` 경로는 **forward slash** 로 쓴다(Git Bash 가 백슬래시를 escape 로 먹어 조용히 실패). `~` 단축어는 Git Bash 에서 홈으로 정상 확장된다.

### 4. settings.json 에 연결

`~/.claude/settings.json` 의 `statusLine` 필드만 교체하고 **다른 키는 보존**한다.

**bash + jq**:

```bash
cfg=~/.claude/settings.json
[ -f "$cfg" ] || echo '{}' > "$cfg"
cp "$cfg" "$cfg.bak"   # 백업
jq '.statusLine = {"type":"command","command":"bash ~/.claude/gigang-statusline.sh"}' "$cfg" > "$cfg.tmp" && mv "$cfg.tmp" "$cfg"
```

**PowerShell** (Windows, jq 안 쓰는 경우):

```powershell
$cfg = "$env:USERPROFILE\.claude\settings.json"
$s = if (Test-Path $cfg) { Get-Content $cfg -Raw | ConvertFrom-Json } else { [PSCustomObject]@{} }
Copy-Item $cfg "$cfg.bak" -ErrorAction SilentlyContinue
$sl = [PSCustomObject]@{ type = "command"; command = "bash ~/.claude/gigang-statusline.sh" }
$s | Add-Member -NotePropertyName statusLine -NotePropertyValue $sl -Force
$s | ConvertTo-Json -Depth 20 | Set-Content $cfg -Encoding UTF8
```

### 5. 검증

mock 입력으로 즉시 동작 확인:

```bash
echo '{"model":{"display_name":"Opus"},"workspace":{"current_dir":"'"$PWD"'"},"cost":{"total_cost_usd":1.23,"total_duration_ms":185000},"context_window":{"used_percentage":42,"context_window_size":200000,"total_input_tokens":84000},"session_id":"t"}' | bash ~/.claude/gigang-statusline.sh
```

3줄 출력(무지개 바 포함)이 나오면 성공. 마지막에 안내:

> ✅ 인라인 스테이터스 설치 완료. **다음 메시지부터** 하단에 표시됩니다.
> 끄려면 `settings.json` 의 `statusLine` 필드 삭제(또는 `/statusline delete`).

## 흔한 실수

- **무지개가 안 보이고 단색/깨짐** → 터미널이 TrueColor 미지원. Windows Terminal·VS Code 등 24bit 지원 터미널 사용.
- **상태줄 자체가 안 뜸** → ① `chmod +x` 누락, ② 워크스페이스 trust 미수락(재시작 후 수락), ③ `disableAllHooks: true` 설정됨.
- **`jq: command not found`** → 2단계 jq 설치 누락.
- **Windows 에서 경로 백슬래시** → `command` 에 `C:\Users\...` 쓰면 Git Bash 가 깨뜨림. `bash ~/.claude/gigang-statusline.sh` 처럼 `~`+forward slash 사용.
- **기존 statusLine 덮어쓰기 걱정** → 4단계는 `statusLine` 키만 바꾸고 나머지(model 등)는 보존. 그래도 시작 전 `settings.json.bak` 백업을 만든다.
