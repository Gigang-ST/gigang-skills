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

---

## 기존 install.ps1 멤버 → 플러그인 마이그레이션 안내

과거 `install.ps1`로 설치한 멤버는 `~/.claude/` 아래 파일 잔재가 남아 플러그인과 충돌할 수 있다.
아래 점검 블록을 실행해 잔재를 확인하고, 발견되면 정리 후 플러그인을 설치한다.

### 1단계: 잔재 점검

```bash
echo "=== 기존 install.ps1 잔재 점검 ==="
ls ~/.claude/commands/gigang-*.md 2>/dev/null && echo "↑ 플러그인과 중복 — 삭제 권장"
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

```bash
/plugin marketplace add Gigang-ST/gigang-skills
```
