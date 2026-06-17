---
description: Gigang Skills 사용법 표시 — 슬래시 명령·자연어 스킬·데이터 위치 안내
---

Gigang Skills 사용법 문서를 그대로 표시한다.

## 실행

플러그인 설치 여부를 확인한다:

```bash
ls ~/.claude/plugins/*/gigang 2>/dev/null && echo "설치됨" || echo "미설치 — /plugin install gigang@gigang-skills"
```

미설치 메시지가 출력되면:
> Gigang Skills 플러그인이 설치되어 있지 않습니다. `/plugin marketplace add Gigang-ST/gigang-skills` 를 실행하세요.

설치됨 메시지가 출력되면 Read 도구로 `~/.claude/plugins/gigang/docs/gigang-usage.md` 를 읽어 **내용을 수정·요약 없이 그대로 출력**한다.
