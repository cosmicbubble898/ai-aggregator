# PRD — AI Aggregator (Phase 1)

| | |
|---|---|
| **Status** | Approved |
| **Owner** | Cosmic Bubble |
| **Date** | 2026-05-21 |
| **Type** | Personal learning / experimentation project (not commercial) |

---

## 1. What we're building

A **BYOK multi-model AI aggregator** — one web app to use many AI models across **chat, image, and video** from a single interface, with each user bringing **their own API keys**. Sign in with Google, paste your provider keys, and start generating. Everything you create is saved to your own private, persistent history that you can browse and delete.

It's cloud-hosted and multi-tenant — every user gets an isolated workspace — and is built primarily as a **learning / experimentation** project.

## 2. Why

- **One place for many models.** No more juggling separate apps/subscriptions for different chat, image, and video models.
- **Bring your own key (BYOK).** Each user supplies their own OpenRouter + AtlasCloud keys, so generation runs on their own balances — no shared cost, no markup, and access to a wider range of models than mainstream consumer apps.
- **Own your history.** A private, persistent, deletable record of everything you generate.

## 3. Goals (outcomes)

1. From any browser, a user can **chat with many models, generate & edit images, and generate video** — all in one app.
2. **Self-serve:** new user → generating output using only a Google account + their own two API keys, zero developer involvement.
3. **Durable private history** across sessions/devices, visible only to its owner.
4. **Clean deletion:** removing an item deletes it from the database *and* from cloud file storage (no orphans).
5. **Sustainable for experimentation:** ~$0/month baseline; generated media is stored on infrastructure that permits it.

## 4. Non-Goals (Phase 1)

1. Anything beyond the feature set in §6 — extensions are Phase 2+.
2. Commercial hardening — rate limiting, billing, quotas, abuse handling.
3. Secret rotation / production security review.
4. Teams / sharing / collaboration — every workspace belongs to one person.
5. Custom domain — the platform URL is fine.

## 5. Target Users

- **Primary:** the developer (self) — a daily multi-model tool and a learning vehicle.
- **Secondary:** anyone with a Google account and their own API keys whom the developer shares the link with.

Every user is fully isolated: own keys, own data, no visibility into anyone else's.

## 6. Feature Set — Must-Have (P0)

| # | Capability | Acceptance criteria |
|---|---|---|
| **Accounts & keys** | | |
| P0-1 | Google sign-in + per-user isolation | User signs in with Google; all data scoped to their account; never sees another user's data. |
| P0-2 | BYOK key management | Add/replace/remove OpenRouter + AtlasCloud keys; encrypted at rest; never returned to browser; generation uses the user's own keys. |
| **Chat** | | |
| P0-3 | Multi-model streaming chat | Send a message, stream a reply; pick model per chat; per-chat model/web-search/system-prompt persist; markdown renders. |
| P0-4 | Vision (image input) | Attach/paste an image to a vision-capable model and get a response about it. |
| P0-5 | Concurrent generations | Multiple generations (across chats/models) run at once without blocking. |
| **Image** | | |
| P0-6 | Text-to-image | Generate images from a prompt across the supported models. |
| P0-7 | Image-to-image / edit | Transform/edit an input image; optional negative prompt, seed, strength, second image honored when provided. |
| P0-8 | Image studio | A dedicated studio for focused image work, including 1–2 images per run. |
| **Video** | | |
| P0-9 | Text-to-video & image-to-video | Generate video from a prompt or a starting image, across the supported models. |
| P0-10 | Resilient in-progress video | A video generating when the page refreshes resumes rather than being lost. |
| **History & deletion** | | |
| P0-11 | Persistent per-user history | Chats, images, videos saved per user; reload across sessions/devices. |
| P0-12 | Media galleries | Galleries for images and videos with lightbox / playback. |
| P0-13 | Delete removes the file too | Deleting an item removes the DB record **and** the underlying file from cloud storage; no orphans. |

### Nice-to-Have (P1)
- Per-length price labels on video models · live timer in the image studio · 2-image input + negative/seed directly in chat.

### Future (P2)
- Fully async client-poll pipeline for image editing · AR-matched high-res output for edit models · production hardening (rate limiting, secret rotation, versioned migrations).

## 7. Non-Functional / Technical Requirements

- **Privacy:** all media private; served only to its authenticated owner; logged-out/non-owner requests rejected.
- **Content policy & storage:** generated media stored on **Cloudflare R2** (permits the content), not Vercel Blob. → [ADR-0003](../adr/0003-cloudflare-r2-for-media.md)
- **Uploads:** image uploads go **directly to storage** (not through a function body), avoiding the host's 4.5 MB request-body limit. → [ADR-0005](../adr/0005-direct-to-storage-uploads.md)
- **Stack:** Next.js 16 (App Router) on Vercel; Neon Postgres + Drizzle; Cloudflare R2; Auth.js v5 (Google). → [ADR-0007](../adr/0007-stack-next16-plain-css.md)

## 8. Success Criteria

- Every P0 verified on the public URL, not just locally.
- A second Google account can self-serve end-to-end (sign in → keys → generate image + video → view → delete) with no developer help.
- After deletions, files confirmed gone from storage.
- Cost stays ~$0/month at experimentation volume (excluding each user's own API spend).

## 9. Open Questions

- **[self]** "Anyone can sign in" needs the Google OAuth consent screen **published** (currently *Testing* mode = manually-added test users only). Publish (shows "unverified app" warning, ~100-user cap) or keep a small test-user list?
- **[self]** Any cap on signups during experimentation, given hardening is deferred?

## 10. Phasing

- **Phase 1 (this doc):** the AI aggregator with the §6 feature set — cloud-hosted, multi-tenant, self-serve.
- **Phase 2+:** the P1/P2 items and any genuinely new capabilities — including an **in-app Learn section** that renders the repo's `docs/learn/` lessons inside the app itself (single source of truth: written once, shown on GitHub *and* in-app), styled in the design system, so the product also teaches how it was built. Gets its own spec + ADR when built.
