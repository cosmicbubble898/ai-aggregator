# Deferred — core work we've consciously parked

This is the single registry of core work we've **deliberately deferred**, so nothing important is silently dropped. It's the honest counterpart to the roadmap: the roadmap says what we *will* build next; this says what we've chosen *not* to do yet — and **why**, with the **trigger** that should bring it back.

**How to use it:** add a row whenever we consciously punt core work (give the *why* + a *revisit trigger*); strike it through or remove it when picked up. Reviewed at session start (it's listed in `AGENTS.md` → "Where things live").

---

## 1. Near-term (likely soon)

| Item | Why deferred | Revisit when |
|---|---|---|
| **Custom domain** (buy + set `NEXT_PUBLIC_SITE_URL`) | Not bought yet; the one-constant swap is already wired (`lib/site.ts`, ADR-0012) | **Before** any off-page / backlink work, so link equity isn't split between the Vercel URL and the domain |
| **Off-page SEO** — submit sitemap to Search Console; set GitHub About/Website/topics; directory + awesome-list listings | Needs the site merged + ideally the custom domain live | After the SEO PR (#13) merges and the domain is live |
| **R2 framing reword** — `project-brief.md` §8/§9, `prd/phase-1.md` §7 + §3; append an *Update* note to ADR-0002 & ADR-0003 (immutable — don't rewrite) | Owner reframed the rationale: R2 = the more **open** storage choice that fits BYOK + cheaper (no egress), **not** "Vercel's AUP prohibits our content" | Next docs-consistency pass |
| **Reconcile the data-ownership ladder + team tier vs. the PRD** (label them explicitly Phase 2+) | Audit: the ladder/team-tier live only in `vision.md` and read as contradicting the PRD's single-tenant / non-commercial framing | Next docs-consistency pass |
| **Document the content-safety hard line** in `vision.md` | It's a real hard line (no illegal content — CSAM scanning + reporting; legal NSFW left to providers/unmarketed but safety-gated) currently living only in working notes | Next docs/vision pass |
| **Backfill a recorded code-review on PR #11 (BYOK)** | The encryption code is the riskiest unreviewed code; the architecture audit gave the crypto a clean bill but there's no *recorded* review | Before PR #11 merges to production |
| **Fix stale CHANGELOG reference** (`01-foundations.md` → `03-foundations.md`) | Cosmetic dead reference from the old lesson numbering | Any docs pass |

## 2. Foundational groundwork (before / alongside core features)

| Item | Why deferred | Revisit when |
|---|---|---|
| **Versioned migrations** (replace `drizzle-kit push`) | Phase-1 chose schema-as-source `push`; it's a foot-gun with two databases (ADR-0008) and PRD lists it as P2 hardening | Before riskier schema changes / going multi-tenant |
| **Test harness for the risky bits** — key crypto, ownership checks, "delete removes the file" | The PRD defers heavy testing; these three are the security/data-integrity-critical paths | As the first core generation features land |
| **Log line on `getDecryptedKey` decrypt failure** | Silent decrypt failures (e.g. `ENCRYPTION_KEY` changed) are currently invisible in production | With the BYOK (PR #11) merge |
| **Code-review enforcement — Level 3: AI reviewer in CI** (auto-posts a review on every PR) | We're doing **Level 1** now (recorded checklist in the PR/spec templates). Level 3 is the project's north star ("an AI agent running in CI") but is real setup | A dedicated milestone (and a great learning lesson), after the core features exist |
| **Conventional-commit enforcement** (commit-msg hook / commitlint) | Currently followed by discipline alone | Only if commit discipline ever slips |

## 3. SEO / GEO PR1 follow-ups

| Item | Why deferred | Revisit when |
|---|---|---|
| **Static-landing decouple** (`/` is server-rendered because it calls `auth()`) | Lowest-ROI SEO item + a UX tradeoff (sign-in flicker / client-side session); the page is still fully crawlable | Deliberately, low priority |
| **Design-gated UI** — FAQ blocks, `/learn` pillar intro, product→lesson concept links, answer-first lesson leads, `FAQPage` JSON-LD | Design-first; needs an owner design pass | When the owner does the design pass |
| **Homepage learning-first reframe** | **Parked by owner** — the homepage stays product-first for now (not a pending design item) | Only if the owner later decides to lead with learning |
| **Per-lesson dynamic OG images** | The single static OG card is enough for now | Fast-follow, when wanted |
| **Content: lessons 6–10 + 3 "blue-ocean" explainers** (What is BYOK · OpenRouter vs AtlasCloud · Add image+video to a Next.js app) | Content is its own workstream (the real growth driver) | Next content PR |

## 4. Phase 2+ / the ceiling (deliberate, until real revenue + operational stability)

| Item | Why deferred | Revisit when |
|---|---|---|
| **Multi-tenant SaaS economics** — bring-your-own storage/DB, an infra-only fee, self-host | Personal / not-commercial now. BYOK covers the *AI model* cost but **not hosting** — these mechanisms ensure the owner never subsidizes other users' Vercel/Neon/R2 | When a solid product exists and we go multi-tenant |
| **Audio modality** (transcription, speech-to-speech), **workflows**, **user-extensible platform** (users add their own APIs / MCPs) | Post-Phase-1 roadmap; stays within serverless + API-relay | After the Phase-1 generation + chat core is excellent |
| **The hard ceiling** — VM-backed autonomous agents, real-time / persistent-connection features (live canvas, voice-mode), enterprise infra | Heavy, always-on cost + operational + safety burden; taking it on pre-revenue makes the product fragile and expensive (see `vision.md`) | **Only** after real recurring revenue + proven operational stability |
