# Spec — BYOK provider key management

| | |
|---|---|
| **Status** | In progress |
| **PRD** | [P0-2 — BYOK key management](../prd/phase-1.md#6-feature-set--must-have-p0) |
| **Branch** | `feat/byok-keys` |
| **Date** | 2026-05-23 |

## Problem
The app calls AI providers (OpenRouter + AtlasCloud) **on behalf of each user, using that user's own API keys** (BYOK). So each user needs to add their keys, the keys must be stored **safely** (an API key is a password to the user's paid account), and the app must use them server-side without ever exposing them back to the browser. This is the prerequisite for every generation feature (chat, image, video).

## Scope
- **In:**
  - A `/settings` page (auth-only) where a user can **add / replace / remove** their **OpenRouter** and **AtlasCloud** keys.
  - **Encryption at rest:** keys are encrypted with **AES-256-GCM** using a server-held master key (`ENCRYPTION_KEY` env var); ciphertext + IV + auth tag stored in the database. See [ADR-0010](../adr/0010-encrypt-provider-keys.md).
  - **Live validation before saving:** a cheap authenticated test-call to the provider confirms the key actually works; an invalid key is rejected with a clear message and never stored.
  - **Never returned to the browser:** the API returns only a connected/not-connected status plus a **last-4-character hint** (`••••AB12`). The full key leaves the server only when calling the provider.
  - **Per-user isolation:** keys scoped to the signed-in user (`provider_key` rows reference `user.id`, cascade-deleted with the user).
  - A server-only `getDecryptedKey(userId, provider)` helper for future generation features to use.
- **Out:**
  - Actually *using* the keys to generate (chat/image/video) — those are later features; this only stores + validates them.
  - Key rotation, more than one key per provider, more providers than OpenRouter + AtlasCloud.
  - Rotating the master `ENCRYPTION_KEY` (changing it invalidates all stored keys — an operational concern noted in the ADR, not built here).

## Design notes
- **Table `provider_key`** (Drizzle, in `db/schema.ts`): one row per **(user, provider)** with a `UNIQUE(userId, provider)` constraint, so add/replace is an upsert and remove is a delete. Columns: `id`, `userId` (FK → `user.id`, `onDelete: cascade`), `provider` (`'openrouter' | 'atlascloud'`), `ciphertext`, `iv`, `authTag`, `keyHint` (last 4 chars, plaintext — safe to show), `createdAt`, `updatedAt`.
- **Crypto** (`lib/crypto.ts`): AES-256-GCM. `ENCRYPTION_KEY` is a 32-byte key, base64-encoded, read lazily from the environment (never hard-coded, never committed). A fresh random 12-byte IV per encryption.
- **Server-only key logic** (`lib/provider-keys.ts`): `saveProviderKey`, `listProviderKeys`, `removeProviderKey`, `getDecryptedKey`. Imports Node's `crypto`, so it can only run server-side.
- **Validation** (`lib/providers.ts`): `validateKey(provider, key)` makes one cheap authenticated request and decides validity purely from the HTTP status (a 401/403 means the key is bad) — OpenRouter `GET /api/v1/key` (no generation cost). AtlasCloud's exact lightweight auth-check endpoint is an **open question** (see below) — verified against a real key in the migration/secret step.
- **UI** (`app/settings/`): a server page (gated like `/dashboard`: `auth()` → redirect to `/` if signed out) that loads current status, plus a `'use client'` form per provider (paste key → Save; Remove if connected). Styled with the design-system tokens.
- **Session:** expose `session.user.id` (database sessions) via a `session` callback in `auth.ts` + a `next-auth` type augmentation, so server code can scope by user id.
- **Per-environment** (see [ADR-0008](../adr/0008-independent-staging-separate-db.md)): `ENCRYPTION_KEY` is set separately for staging (local + preview) and production. The `provider_key` table is migrated to the **staging** DB first, then **production**.
- **Before implementing**, re-read the relevant Next 16 docs already consulted (server actions, forms).

## Acceptance criteria
- [ ] A signed-in user can add an OpenRouter key and an AtlasCloud key on `/settings`; a signed-out visitor is redirected away.
- [ ] An **invalid** key (fails the live provider check) is rejected with a clear message and **not** stored.
- [ ] A valid key is stored **encrypted** (DB shows ciphertext/iv/authTag, never plaintext); decrypting yields the original key.
- [ ] Saving again for the same provider **replaces** the key (one row per user+provider); **Remove** deletes it.
- [ ] The browser never receives the full key — only connected status + a last-4 hint.
- [ ] Each user sees only their own keys (per-user isolation).
- [ ] No secrets in the repo; `.env.example` documents `ENCRYPTION_KEY` (already present).
- [ ] Verified on **localhost** and **production**, each with its own `ENCRYPTION_KEY` + DB.

## Test plan
- **Local:** `npm run dev` → `/settings` → paste a real OpenRouter key → confirm it validates + saves (encrypted row in the **staging** DB, last-4 hint shown) → paste a bad key → confirm rejection → Remove → row gone. Repeat for AtlasCloud.
- **Production:** same flow on the live URL with the production `ENCRYPTION_KEY` + DB.

## Open questions
- **AtlasCloud validation endpoint:** confirm the cheapest authenticated endpoint to validate a key (e.g. a models-list or account endpoint) against AtlasCloud's docs — verified when testing with a real AtlasCloud key.
- **Master-key loss/rotation:** if `ENCRYPTION_KEY` is ever lost or changed, all stored keys become undecryptable and users must re-enter them. Rotation tooling is deferred (out of scope for Phase 1 per the PRD).
