"""User-scope hook: log every user prompt to a per-project daily markdown file.

Triggered by Claude Code's UserPromptSubmit event.

Output layout:
    ~/.claude/logs/prompts/<project-name>/YYYY-MM-DD.md
"""

import json
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

KST = timezone(timedelta(hours=9))
LOG_ROOT = Path.home() / ".claude" / "logs" / "prompts"


def _project_slug(cwd: str | None) -> str:
    if not cwd:
        return "_unknown"
    try:
        p = Path(cwd).resolve()
    except OSError:
        return "_unknown"
    try:
        if p == Path.home().resolve():
            return "_unknown"
    except OSError:
        pass
    name = p.name or "_unknown"
    return "".join(c if c.isalnum() or c in "-_." else "_" for c in name)


def main() -> None:
    raw = sys.stdin.buffer.read()
    try:
        data = json.loads(raw.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        return

    prompt = (data.get("prompt") or "").strip()
    if not prompt:
        return

    session_id = data.get("session_id", "unknown")
    slug = _project_slug(data.get("cwd"))
    now = datetime.now(KST)

    log_dir = LOG_ROOT / slug
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"{now:%Y-%m-%d}.md"

    is_new = not log_file.exists()
    with log_file.open("a", encoding="utf-8") as f:
        if is_new:
            f.write(f"# Prompt Log - {slug} - {now:%Y-%m-%d}\n\n")
        f.write(f"## [{now:%H:%M KST}] `{session_id[:8]}`\n\n")
        f.write(f"{prompt}\n\n")


if __name__ == "__main__":
    main()
