"""User-scope hook: append Claude's response to the same daily prompt log.

Triggered by Claude Code's Stop event.
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


def _extract_text(content: object) -> str:
    if isinstance(content, str):
        return content
    if not isinstance(content, list):
        return ""
    parts: list[str] = []
    for block in content:
        if isinstance(block, dict) and block.get("type") == "text":
            text = block.get("text", "")
            if isinstance(text, str):
                parts.append(text)
    return "".join(parts)


def _collect_latest_response(transcript_path: Path) -> str:
    try:
        with transcript_path.open("r", encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
    except OSError:
        return ""

    assistant_chunks: list[str] = []
    for raw_line in reversed(lines):
        line = raw_line.strip()
        if not line:
            continue
        try:
            entry = json.loads(line)
        except json.JSONDecodeError:
            continue

        msg = entry.get("message") if isinstance(entry, dict) else None
        if not isinstance(msg, dict):
            msg = entry if isinstance(entry, dict) else {}

        entry_role = entry.get("role") if isinstance(entry, dict) else None
        role = msg.get("role") or entry_role
        if role == "user":
            break
        if role == "assistant":
            text = _extract_text(msg.get("content"))
            if text:
                assistant_chunks.append(text)

    assistant_chunks.reverse()
    return "\n\n".join(chunk.strip() for chunk in assistant_chunks if chunk.strip())


def main() -> None:
    raw = sys.stdin.buffer.read()
    try:
        data = json.loads(raw.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        return

    if data.get("stop_hook_active"):
        return

    transcript_path_str = data.get("transcript_path")
    if not transcript_path_str:
        return
    transcript_path = Path(transcript_path_str)
    if not transcript_path.exists():
        return

    response = _collect_latest_response(transcript_path)
    if not response:
        return

    slug = _project_slug(data.get("cwd"))
    now = datetime.now(KST)
    log_dir = LOG_ROOT / slug
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"{now:%Y-%m-%d}.md"

    with log_file.open("a", encoding="utf-8") as f:
        f.write(f"### 응답 [{now:%H:%M KST}]\n\n{response}\n\n---\n\n")


if __name__ == "__main__":
    main()
