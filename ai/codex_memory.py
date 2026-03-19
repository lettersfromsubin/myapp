#!/usr/bin/env python3
"""Local memory helper for Codex-style sessions.

This script emulates three layers similar to the user-provided Claude pattern:
1) Project instructions file
2) Auto memory store with MEMORY.md (first 200 lines as startup context)
3) Session summaries
"""

from __future__ import annotations

import argparse
import datetime as dt
from pathlib import Path


ROOT = Path(__file__).resolve().parent
STORE = ROOT / ".codex"
GLOBAL_CLAUDE = Path.home() / ".claude" / "CLAUDE.md"
PROJECT_CLAUDE = ROOT / "CLAUDE.md"
PROJECT_INSTRUCTIONS = ROOT / "AGENTS.md"
AUTO_DIR = STORE / "memory"
SESSIONS_DIR = STORE / "sessions"
MEMORY_INDEX = AUTO_DIR / "MEMORY.md"
AUTO_NOTES = AUTO_DIR / "auto-memory.md"


def now_iso() -> str:
    return dt.datetime.now().isoformat(timespec="seconds")


def ensure_store() -> None:
    AUTO_DIR.mkdir(parents=True, exist_ok=True)
    SESSIONS_DIR.mkdir(parents=True, exist_ok=True)

    if not MEMORY_INDEX.exists():
        MEMORY_INDEX.write_text(
            "# Codex Memory Index\n\n"
            "This file is loaded at session startup (first 200 lines).\n\n"
            "## Rules\n"
            "- Keep this short and high-signal.\n"
            "- Put stable team conventions here.\n"
            "- Put transient notes in auto-memory.md or session summaries.\n\n"
            "## Linked Files\n"
            "- memory/auto-memory.md\n",
            encoding="utf-8",
        )

    if not AUTO_NOTES.exists():
        AUTO_NOTES.write_text("# Auto Memory Notes\n\n", encoding="utf-8")


def remember(note: str) -> None:
    ensure_store()
    with AUTO_NOTES.open("a", encoding="utf-8") as f:
        f.write(f"- [{now_iso()}] {note}\n")


def session_path(session_id: str) -> Path:
    return SESSIONS_DIR / session_id / "session-memory" / "summary.md"


def start_session(session_id: str) -> Path:
    ensure_store()
    summary_file = session_path(session_id)
    summary_file.parent.mkdir(parents=True, exist_ok=True)
    if not summary_file.exists():
        summary_file.write_text(
            f"# Session Summary: {session_id}\n\nCreated: {now_iso()}\n\n## Notes\n",
            encoding="utf-8",
        )
    return summary_file


def add_summary(session_id: str, note: str) -> None:
    summary_file = start_session(session_id)
    with summary_file.open("a", encoding="utf-8") as f:
        f.write(f"- [{now_iso()}] {note}\n")


def first_lines(path: Path, limit: int) -> str:
    if not path.exists():
        return ""
    lines = path.read_text(encoding="utf-8").splitlines()
    return "\n".join(lines[:limit]).strip()


def build_context(session_id: str | None = None) -> str:
    ensure_store()
    sections: list[str] = []

    if GLOBAL_CLAUDE.exists():
        global_text = GLOBAL_CLAUDE.read_text(encoding="utf-8").strip()
        sections.append("## Global Instructions (~/.claude/CLAUDE.md)\n" + global_text)

    if PROJECT_CLAUDE.exists():
        project_claude_text = PROJECT_CLAUDE.read_text(encoding="utf-8").strip()
        sections.append("## Project Instructions (CLAUDE.md)\n" + project_claude_text)

    if PROJECT_INSTRUCTIONS.exists():
        project_text = PROJECT_INSTRUCTIONS.read_text(encoding="utf-8").strip()
        sections.append("## Project Instructions (AGENTS.md)\n" + project_text)

    memory_text = first_lines(MEMORY_INDEX, 200)
    if memory_text:
        sections.append("## Auto Memory (MEMORY.md first 200 lines)\n" + memory_text)

    auto_notes = (
        AUTO_NOTES.read_text(encoding="utf-8").strip() if AUTO_NOTES.exists() else ""
    )
    if auto_notes:
        sections.append("## Auto Memory Notes\n" + auto_notes)

    if session_id:
        summary_file = session_path(session_id)
        if summary_file.exists():
            sections.append(
                "## Current Session Summary\n"
                + summary_file.read_text(encoding="utf-8").strip()
            )

    return "\n\n".join(section for section in sections if section)


def list_sessions() -> list[str]:
    if not SESSIONS_DIR.exists():
        return []
    return sorted([p.name for p in SESSIONS_DIR.iterdir() if p.is_dir()])


def main() -> None:
    parser = argparse.ArgumentParser(description="Codex local memory helper")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("init", help="Create local memory directories and seed files")

    remember_parser = sub.add_parser("remember", help="Append note to auto memory")
    remember_parser.add_argument("note", help="Note text")

    start_parser = sub.add_parser("start-session", help="Create a session summary file")
    start_parser.add_argument("session_id", help="Session identifier")

    summary_parser = sub.add_parser("summarize", help="Append note to session summary")
    summary_parser.add_argument("session_id", help="Session identifier")
    summary_parser.add_argument("note", help="Summary note")

    context_parser = sub.add_parser(
        "build-context", help="Print merged startup context"
    )
    context_parser.add_argument("--session-id", dest="session_id", default=None)

    sub.add_parser("list-sessions", help="List known sessions")

    args = parser.parse_args()

    if args.cmd == "init":
        ensure_store()
        print(f"Initialized memory store at: {STORE}")
        return

    if args.cmd == "remember":
        remember(args.note)
        print("Saved note to auto memory")
        return

    if args.cmd == "start-session":
        path = start_session(args.session_id)
        print(f"Session started: {path}")
        return

    if args.cmd == "summarize":
        add_summary(args.session_id, args.note)
        print("Saved note to session summary")
        return

    if args.cmd == "build-context":
        print(build_context(args.session_id))
        return

    if args.cmd == "list-sessions":
        sessions = list_sessions()
        if not sessions:
            print("No sessions found")
        else:
            for session in sessions:
                print(session)
        return


if __name__ == "__main__":
    main()
