---
description: Gigang Skills 현재 버전 및 업데이트 상태 표시
---

설치된 Gigang Skills 버전과 명령·스킬 개수를 표시합니다.

## 실행

bash로 실행:

```bash
plugin_json=$(find ~/.claude/plugins -path "*gigang*/.claude-plugin/plugin.json" 2>/dev/null | head -1)

if [ -z "$plugin_json" ]; then
    echo "⚠ Gigang Skills 플러그인을 찾을 수 없습니다."
    echo "  /plugin install 로 플러그인을 설치하세요."
    exit 0
fi

plugin_dir=$(dirname "$(dirname "$plugin_json")")
ver=$(grep '"version"' "$plugin_json" | sed 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')

cmd_count=$(ls "$plugin_dir/commands/gigang-"*.md 2>/dev/null | wc -l | tr -d ' ')
skill_count=$(ls -d "$plugin_dir/skills/gigang"* 2>/dev/null | wc -l | tr -d ' ')
```

## 결과 표시

위 결과를 바탕으로 다음 형식으로 출력:

```
Gigang Skills  v<ver>
  Plugin  : <plugin_dir>
  Version : <ver>

  설치된 명령: <cmd_count>개  (gigang-*.md)
  설치된 스킬: <skill_count>개  (gigang-*)
```

## 흔한 상황

- **플러그인 없음**: `/plugin install` 로 Gigang Skills 플러그인을 설치하세요.
- **개수가 0**: 플러그인 디렉토리 구조가 다를 수 있습니다. `plugin_dir` 경로를 직접 확인하세요.
