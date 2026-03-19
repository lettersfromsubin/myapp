# Codex Session Memory (Local Emulation)

This project now includes a small local memory system in `codex_memory.py`.

It mirrors the same structure described in your note:

1. Global instructions (`~/.claude/CLAUDE.md`) when available
2. Project instructions (`CLAUDE.md` and `AGENTS.md`)
3. Auto memory (`.codex/memory/MEMORY.md`, `.codex/memory/auto-memory.md`)
4. Session summaries (`.codex/sessions/<session-id>/session-memory/summary.md`)

## Commands

```bash
python3 codex_memory.py init
python3 codex_memory.py remember "always use pnpm, not npm"
python3 codex_memory.py start-session demo-001
python3 codex_memory.py summarize demo-001 "Implemented result fallback"
python3 codex_memory.py build-context --session-id demo-001
python3 codex_memory.py list-sessions
```

## How startup context is built

- Includes full `~/.claude/CLAUDE.md` if present.
- Includes full project `CLAUDE.md` if present.
- Includes full `AGENTS.md` if present.
- Includes first 200 lines from `.codex/memory/MEMORY.md`.
- Includes all notes from `.codex/memory/auto-memory.md`.
- Includes current session summary when `--session-id` is passed.

## Notes

- This is a local file-based emulation to make memory behavior explicit and testable.
- It does not modify Codex platform internals; it provides a deterministic project memory workflow.
