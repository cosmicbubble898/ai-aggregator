# 0010. Encrypt per-user provider keys at rest (AES-256-GCM, env master key)

- **Status:** Accepted
- **Date:** 2026-05-23

## Context
The BYOK feature ([spec](../specs/byok.md), PRD P0-2) stores each user's **OpenRouter** and **AtlasCloud** API keys so the server can call those providers on the user's behalf. An API key is effectively a password to the user's *paid* provider account, so storing it in plaintext is unacceptable: anyone who could read the database (a leak, a backup, a misconfigured query) would get working credentials that cost the user money.

We need: keys unreadable at rest, never exposed to the browser, decryptable only by our server at the moment of a provider call, and scoped per user.

## Decision
- **Encrypt every key with AES-256-GCM** before storing it. GCM is authenticated encryption — it both hides the key (confidentiality) and detects tampering (integrity via an auth tag).
- **The master key lives only in the environment**, never in the database and never in the repo: an `ENCRYPTION_KEY` env var (a 32-byte key, base64-encoded), read lazily server-side. Set **per environment** (staging vs production) per [ADR-0008](0008-independent-staging-separate-db.md). This separation means a database leak alone yields only ciphertext.
- **Store, per encrypted key:** the `ciphertext`, the random per-encryption `iv` (12-byte nonce), and the `authTag` — all base64 — in a `provider_key` row, plus a plaintext `keyHint` (last 4 chars) for display.
- **One row per (user, provider)** with a unique constraint; add/replace = upsert, remove = delete.
- **Validate before storing:** a live, low-cost authenticated call to the provider confirms the key works; invalid keys are rejected, not stored.
- **Never return the key to the browser** — only connected status + the last-4 hint. Decryption happens server-side only, via a server-only helper, at provider-call time.

## Consequences
- **Pro:** a database compromise alone does not expose usable keys; integrity is verified on decrypt; the design extends cleanly to more providers (new rows, no schema change).
- **Trade-off / operational risk:** the `ENCRYPTION_KEY` becomes critical state. **If it is lost or changed, every stored key becomes undecryptable** and users must re-enter their keys. Safe rotation tooling is **deferred** (Phase-1 non-goal: no secret rotation).
- **Cost:** a new `provider_key` table migrated to **both** Neon databases (staging then production), and a new per-environment secret to manage.
- Encryption/decryption is symmetric and fast; negligible runtime cost.
- The plaintext `keyHint` (last 4 chars) is a deliberate, low-risk leak for usability — four characters can't reconstruct a key.

Relates to [ADR-0008](0008-independent-staging-separate-db.md) (per-environment secrets + databases) and the [BYOK spec](../specs/byok.md).
