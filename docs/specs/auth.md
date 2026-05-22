# Spec — Google sign-in (authentication)

| | |
|---|---|
| **Status** | Draft |
| **PRD** | [P0-1 — Google sign-in + per-user isolation](../prd/phase-1.md#6-feature-set--must-have-p0) |
| **Branch** | `feat/auth` |
| **Date** | 2026-05-22 |

## Problem
A user needs to sign in with their Google account so the app has a stable identity to attach all their data to (API keys, chats, media). This is the **gateway feature**: nothing per-user — key management, history, isolation — can exist until there is a signed-in user to scope it to.

## Scope
- **In:**
  - Sign in with **Google** (Auth.js v5 + Google provider).
  - A **persistent session** (stays signed in across reloads and devices) and a working **sign out**.
  - Wire the landing page's "Sign in with Google" button to start the flow; show signed-in state (name/email + sign out).
  - **First database use:** a **Neon (Postgres)** database holding the Auth.js user/session tables (via the Drizzle adapter).
  - **Per-environment setup:** separate **staging** and **production** databases + their own OAuth redirect URLs (see [ADR-0008](../adr/0008-independent-staging-separate-db.md)).
- **Out:**
  - BYOK key management (next feature, P0-2) and encryption of provider keys.
  - Any chat / image / video / history features.
  - Publishing the Google consent screen for open sign-up — manually-added test users for now (see open questions).
  - Visual design — sign-in/landing UI stays plain until the design pass.

## Design notes
- **Auth.js v5 (`next-auth` beta)** with the **Google** provider. Install needs `--legacy-peer-deps` (per [ADR-0007](../adr/0007-stack-next16-plain-css.md)).
- **Neon Postgres + Drizzle**: introduce the DB now; use the Auth.js **Drizzle adapter** for the `users`, `accounts`, `sessions`, and `verification_tokens` tables (the last is part of the adapter's schema for email/magic-link sign-in — not exercised by Google OAuth, but created for completeness). Session strategy (JWT vs database) decided at implementation — JWT avoids a DB read per request; DB sessions are simpler to reason about.
- **Secrets / env** (never committed — live in `.env.local` + Vercel env settings; `.env.example` ships empty placeholders): `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`, and `AUTH_URL` (Auth.js **v5**'s name for the canonical URL — *not* v4's `NEXTAUTH_URL`; Vercel usually infers it, so it's often optional).
- **Per-environment** (see [ADR-0008](../adr/0008-independent-staging-separate-db.md)): Production env → production Neon DB; Preview env → staging Neon DB; local uses the staging DB. The Google OAuth app registers redirect URIs for local, production, and preview.
- **Before implementing, read** `node_modules/next/dist/docs/01-app/02-guides/authentication.md` (Next 16 conventions differ from older versions).

## Acceptance criteria
- [ ] Clicking "Sign in with Google" runs the Google OAuth flow and returns the user signed in.
- [ ] A `users` row is created in Neon on first sign-in; returning with the same Google account reuses it.
- [ ] Session persists across reloads; signed-in state shows name/email and a working **Sign out**.
- [ ] A signed-out user cannot reach a protected (auth-only) test route — they're redirected to sign-in.
- [ ] No secrets in the repo; `.env.example` lists the new variables with empty values.
- [ ] Verified on **localhost** and **production** (each with its own DB + registered redirect URI). On **preview/staging**, OAuth is verified *only if* a stable preview alias is configured (preview URLs change per branch and Google forbids wildcard redirects — see open questions); the staging **DB wiring** is verified regardless.
- [ ] (Edge) Cancelling the Google consent screen returns to the app cleanly, not an error page.

## Test plan
- **Local:** `npm run dev` → sign in with a test Google account → confirm session + a row in the **staging** Neon DB → reload (still signed in) → sign out.
- **Staging (preview):** confirm it uses the **staging** DB; the full OAuth round-trip here needs a stable preview alias (see open questions) — otherwise verify OAuth on local + production.
- **Production:** sign in on `ai-aggregator-sandy.vercel.app`; confirm a row lands in the **production** DB (separate from staging).

## Open questions
- **Google consent screen:** keep in "Testing" mode (manually-added test users) or publish (shows an "unverified app" warning, ~100-user cap)? → defer; testing mode for now.
- **Preview redirect URIs:** Vercel preview URLs change per branch, and Google OAuth does **not** allow wildcard redirect URIs — so testing the full OAuth flow on previews may need a **stable preview alias** (or we lean on local + production for OAuth verification). Resolve at implementation.
- **Session strategy:** JWT vs database sessions — decide at implementation.
