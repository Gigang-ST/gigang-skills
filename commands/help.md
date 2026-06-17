---
description: Gigang Skills 사용법 표시 — 슬래시 명령·자연어 스킬·데이터 위치 안내
---

Gigang Skills 사용법 문서를 그대로 표시한다.

## 실행

플러그인 디렉토리를 결정한다:

```bash
plugin_dir="${CLAUDE_PLUGIN_ROOT:-}"
if [ -z "$plugin_dir" ]; then
  pj=$(find ~/.claude/plugins/cache -path '*/gigang/*/.claude-plugin/plugin.json' 2>/dev/null | head -1)
  [ -n "$pj" ] && plugin_dir=$(dirname "$(dirname "$pj")")
fi
if [ -n "$plugin_dir" ] && [ -d "$plugin_dir" ]; then
  echo "설치됨: $plugin_dir"
  cat "$plugin_dir/docs/gigang-usage.md"
else
  echo "미설치 — 아래로 설치하세요:"
  echo "  /plugin marketplace add Gigang-ST/gigang-skills"
  echo "  /plugin install gigang@gigang-skills"
fi
```

미설치 메시지가 출력되면:
> Gigang Skills 플러그인이 설치되어 있지 않습니다. 아래 명령으로 설치하세요.
> ```
> /plugin marketplace add Gigang-ST/gigang-skills
> /plugin install gigang@gigang-skills
> ```

설치됨 메시지가 출력되면 위 bash 블록이 이미 `cat`으로 출력한 내용을 **수정·요약 없이 그대로 출력**한다.

---

## 기존 install.ps1 멤버 → 플러그인 마이그레이션 안내

과거 `install.ps1`로 설치한 멤버는 `~/.claude/` 아래 파일 잔재가 남아 플러그인과 충돌할 수 있다.

### 가장 쉬운 방법: 마이그레이션 스크립트 (권장)

`scripts/migrate.*` 가 잔재 정리 + 플러그인 설치를 한 번에 처리한다. (settings.json 은 변경 전 자동 백업, 4brain 공용 hook 은 보존)

repo 없이 한 줄로:

- Windows: `irm https://raw.githubusercontent.com/Gigang-ST/gigang-skills/main/scripts/migrate.ps1 -OutFile "$env:TEMP\gm.ps1"; powershell -ExecutionPolicy Bypass -File "$env:TEMP\gm.ps1"`
- macOS/Linux: `curl -fsSL https://raw.githubusercontent.com/Gigang-ST/gigang-skills/main/scripts/migrate.sh | bash`

repo 를 받아둔 경우 로컬 실행: `scripts\migrate.ps1` / `bash scripts/migrate.sh`. 스크립트를 못 쓰는 멤버는 아래 수동 절차를 따른다.

### (수동) 1단계: 잔재 점검

```bash
echo "=== 기존 install.ps1 잔재 점검 ==="
ls ~/.claude/commands/gigang-*.md 2>/dev/null && echo "↑ 구 install.ps1 잔재 — 삭제 권장"
ls -d ~/.claude/skills/gigang* 2>/dev/null
grep -l "update.ps1\|log_prompt\|opus_suggest" ~/.claude/settings.json 2>/dev/null && \
  echo "↑ settings.json 에 구 hook 등록됨 — 수동 삭제 필요"
```

### 2단계: 파일 정리

점검에서 잔재가 발견됐으면 아래 명령으로 삭제한다:

```bash
rm ~/.claude/commands/gigang-*.md
rm -rf ~/.claude/skills/gigang*
rm ~/.claude/hooks/log_prompt.py ~/.claude/hooks/log_response.py ~/.claude/hooks/opus_suggest.py
rm -rf ~/.gigang-skills
```

### 3단계: settings.json hook 수동 제거

`update.ps1` / `log_prompt` / `log_response` / `opus_suggest` 관련 hook 항목은 자동 삭제되지 않는다.
`~/.claude/settings.json` 을 직접 열어 해당 훅 항목을 손으로 제거해야 한다.

### 4단계: 플러그인 재설치

```
/plugin marketplace add Gigang-ST/gigang-skills
/plugin install gigang@gigang-skills
```
