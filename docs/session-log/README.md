# Session logs

This folder is the **canonical handoff between Claude Code sessions**. Each working session ends by writing (or updating) a log here; each new session starts by reading the most recent one. The goal: **no project context lives only in a chat** — the repo is the source of truth.

## Naming

- One session per day: `SESSION-YYYY-MM-DD.md` (e.g. `SESSION-2026-05-21.md`).
- Multiple sessions in one day: add a counter — `SESSION-YYYY-MM-DD-2.md`, `SESSION-YYYY-MM-DD-3.md`, …

## How to use

- **Start a session:** read `CLAUDE.md`, then the most recent `SESSION-*.md` here. (See the "Session start protocol" in `CLAUDE.md`.)
- **End a session:** copy `_TEMPLATE.md` to a new dated file (or update today's) and fill it in.
- These logs are **committed** — they are part of the project's history, not throwaway notes.

See [`_TEMPLATE.md`](_TEMPLATE.md) for the structure.
