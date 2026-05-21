# 0006. Rebuild from scratch, feature-by-feature

- **Status:** Accepted
- **Date:** 2026-05-21

## Context
A working reference implementation exists (`../chat-saas`), but it grew organically and isn't structured for a documented, traceable, AI-driven workflow. The project's goals are learning and a clean, fully-understood codebase.

## Decision
Build this project **greenfield**, adding features in order (auth → keys → chat → vision → image → studio → video → history → delete). The old app is a **reference only**; code is re-created (and improved), not copied wholesale. Each feature follows the spec → branch → PR → preview → merge loop.

## Consequences
- Slower than porting, but yields a clean commit history, full understanding, and traceability from day one.
- The reference app remains available for comparison and for proven solutions to hard problems.
