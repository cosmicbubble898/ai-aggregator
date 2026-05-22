# 0008. Independent staging environment with its own separate database

- **Status:** Accepted
- **Date:** 2026-05-22

## Context
We deploy on Vercel: production builds from `main`, and every branch/PR gets an automatic **preview** deploy, which we treat as **staging**. By default, every deployment (preview *and* production) reads the same environment variables — and therefore would talk to the **same database**.

Two things drive a change: (1) local development can be slow and can behave differently from the cloud, so we want a realistic, cloud-based place to validate changes before production; and (2) experiments on a staging/preview deploy must **never** read or write **production** data. The Phase-1 PRD originally listed "separate dev/prod data" as a deferred non-goal (§4); this ADR **reverses that** and brings it in-scope, starting at the first feature that needs a database (auth → [spec](../specs/auth.md)).

## Decision
- Run **two isolated databases** on Neon: a **production** database and a **staging** database.
- Wire them per **Vercel environment** using scoped environment variables: the **Production** `DATABASE_URL` points at the production Neon DB; the **Preview** `DATABASE_URL` points at the staging Neon DB. Local development (`.env.local`) uses the **staging** DB.
- Extend the same pattern to other per-environment config (OAuth redirect URLs now; R2 buckets later): production resources for production, separate staging resources for preview + local.
- **No production data is ever touched** by staging, preview, or local runs.

## Consequences
- **Pro:** previews and experiments run against realistic infrastructure with zero risk to production data — matching the "it's not real until it works on staging" workflow.
- **Cost:** more setup and ongoing care — two databases to provision, two sets of secrets, and **schema migrations must be applied to both** (staging first, then production).
- Neon's free tier covers multiple databases/branches at experimentation volume, so the ~$0/month baseline holds.
- This **supersedes** the PRD's deferred "separate dev/prod data" non-goal; the PRD (§4), `architecture.md`, and `runbook.md` should be updated to describe the new environment model.
- Local currently shares the **staging** DB (both are non-production, so this is safe); local can be given its own DB later if desired.

Relates to [ADR-0002](0002-host-on-vercel-serverless.md) (Vercel hosting) and [ADR-0007](0007-stack-next16-plain-css.md) (Drizzle + Neon).
