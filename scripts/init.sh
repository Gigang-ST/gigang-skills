#!/usr/bin/env bash
set -u
WORKDIR="${1:-$HOME/work}"

step() { printf "[%-4s] %-14s %s\n" "$1" "$2" "$3"; }

# 1. brew 확인
if ! command -v brew >/dev/null 2>&1; then
  step FAIL brew "미설치 — https://brew.sh 참고 후 재실행"
else
  for pkg in git gh uv; do
    if command -v "$pkg" >/dev/null 2>&1; then
      step SKIP "$pkg" "이미 설치됨"
    else
      brew install "$pkg" && step OK "$pkg" "설치 완료" || step FAIL "$pkg" "brew 실패"
    fi
  done
fi

# 2. 작업 폴더
if [ -d "$WORKDIR" ]; then step SKIP "작업 폴더" "$WORKDIR 이미 존재"
else mkdir -p "$WORKDIR" && step OK "작업 폴더" "$WORKDIR 생성"; fi

# 3. zshrc cc alias (멱등)
ZSHRC="$HOME/.zshrc"
MARKER='alias cc="claude --dangerously-skip-permissions"'
if [ -f "$ZSHRC" ] && grep -qF "$MARKER" "$ZSHRC"; then
  step SKIP "cc alias" "~/.zshrc 에 이미 있음"
else
  printf '\n# gigang-init: cc shortcut\n%s\n' "$MARKER" >> "$ZSHRC"
  step OK "cc alias" "~/.zshrc 에 추가"
fi

# 4. ~/.claude/CLAUDE.md uv 문구 (멱등)
CMD="$HOME/.claude/CLAUDE.md"
mkdir -p "$(dirname "$CMD")"
if [ -f "$CMD" ] && grep -qF "파이썬이 필요한 경우 uv를 이용하세요" "$CMD"; then
  step SKIP "CLAUDE.md uv" "이미 있음"
else
  printf '\n## Python\n\n파이썬이 필요한 경우 uv를 이용하세요.\n' >> "$CMD"
  step OK "CLAUDE.md uv" "추가"
fi

echo "=== Mac init 완료 (베타 — 첫 실행 검증 필요) ==="
