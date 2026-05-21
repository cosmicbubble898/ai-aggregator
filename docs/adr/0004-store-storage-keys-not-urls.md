# 0004. Store storage keys in the DB, not URLs

- **Status:** Accepted
- **Date:** 2026-05-21

## Context
Media lives in R2 and is served via presigned URLs, which **expire**. We need a durable reference in the database (`image`/`video` rows and chat message parts).

## Decision
Store the **R2 object key** (e.g. `gen/<uuid>.png`) in the database. Generate presigned URLs **on demand** when serving or sending to a provider.

## Consequences
- Durable, tiny references; ownership checks are a simple key match.
- A single rule distinguishes a stored key from a `data:` URL (and from any legacy value), centralized in one helper used by the display path, the serving proxy, and provider-input resolution.
- Presigned URLs are never persisted (they'd expire).
