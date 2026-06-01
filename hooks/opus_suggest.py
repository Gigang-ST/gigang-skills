"""Opus 권장 작업 감지 → 비차단 힌트 출력.

UserPromptSubmit 이벤트. 프롬프트에 Opus 가 유리한 패턴 발견 시
현재 모델이 Sonnet 계열인 경우에만 한 줄 힌트를 출력.
"""
import json
import re
import sys
from pathlib import Path


# 단독으로 충분한 강한 신호
STRONG = [
    r"brainstorm",
    r"브레인스토밍",
    r"아키텍처",
    r"architecture",
    r"전략\s*(수립|세워|적으로)",
    r"로드맵",
    r"어떻게\s*접근",
    r"어떤\s*방향",
    r"설계\s*(해|해줘|하자|방안|방향|전략)",
    r"시스템\s*설계",
    r"방법론",
    r"/autoplan",
    r"/plan-",
    r"/design",
]

# 3개 이상 동시 감지 시 권장
WEAK = [
    r"분석\s*(해|해줘|좀|하자)",
    r"종합\s*(해|해줘|적으로|하자)",
    r"전체적으로",
    r"복잡한",
    r"복합적",
    r"비교\s*(해|해줘|하자)",
    r"검토\s*(해|해줘|하자)",
    r"평가\s*(해|해줘|하자)",
]


def _settings_model() -> str:
    try:
        p = Path.home() / ".claude" / "settings.json"
        return json.loads(p.read_text(encoding="utf-8")).get("model", "")
    except Exception:
        return ""


def _is_sonnet(model: str) -> bool:
    return "sonnet" in model.lower() or not model


def main() -> None:
    raw = sys.stdin.buffer.read()
    try:
        data = json.loads(raw.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        return

    prompt = data.get("prompt", "")
    if not prompt:
        return

    model = data.get("model") or _settings_model()
    if not _is_sonnet(model):
        return  # 이미 Opus 계열 — 제안 불필요

    t = prompt.lower()
    strong_hit = any(re.search(pat, t) for pat in STRONG)
    weak_hits = sum(1 for pat in WEAK if re.search(pat, t))

    if strong_hit or weak_hits >= 3:
        msg = "💡 Opus 권장 작업 — /model 로 전환하거나 이대로 진행하세요.\n"
        sys.stderr.buffer.write(msg.encode("utf-8"))
        sys.stderr.buffer.flush()


if __name__ == "__main__":
    main()
