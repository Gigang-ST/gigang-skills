#!/usr/bin/env bash
# gigang 플러그인 설치 스크립트 (macOS / Linux)
#
#   gigang 을 플러그인 방식으로 설치합니다.
#   (macOS 는 기존 install.ps1 을 쓴 적이 없어 잔재 정리는 필요 없습니다.)
#
#   사용:  bash migrate.sh

set -u

echo ""
echo "=== gigang 플러그인 설치 (macOS/Linux) ==="
echo ""

# 0) claude CLI 확인
if ! command -v claude >/dev/null 2>&1; then
  echo "[!] claude CLI 를 찾을 수 없습니다. Claude Code 설치 후 다시 실행하세요."
  exit 1
fi

# 1) 혹시 남아있을 수 있는 옛 복사본 정리 (있을 때만)
removed=0
for f in "$HOME"/.claude/commands/gigang-*.md; do
  [ -e "$f" ] && { echo "      제거: $f"; rm -f "$f"; removed=1; }
done
for d in "$HOME"/.claude/skills/gigang*; do
  [ -d "$d" ] && { echo "      제거: $d"; rm -rf "$d"; removed=1; }
done
[ "$removed" -eq 1 ] && echo ""

# 2) 플러그인 마켓플레이스 등록 + 설치
echo "[1/2] 플러그인 마켓플레이스 등록 + 설치"
claude plugin marketplace add Gigang-ST/gigang-skills
claude plugin install gigang@gigang-skills

# 3) uv (프롬프트 로그 hook 용) — 없으면 설치
echo ""
echo "[2/2] uv 확인"
if command -v uv >/dev/null 2>&1; then
  echo "      uv 이미 설치됨"
else
  echo "      uv 설치 중..."
  curl -LsSf https://astral.sh/uv/install.sh | sh
fi

echo ""
echo "=== 완료 ==="
echo "Claude Code 를 재시작하거나 /reload-plugins 후, /help 에서 /gigang:help 를 확인하세요."
echo ""
