# 0002. Host on Vercel (serverless)

- **Status:** Accepted
- **Date:** 2026-05-21

## Context
We need a cloud host for a Next.js App Router app, multi-tenant, low cost, with easy CI/CD and preview deploys. The developer already has a Vercel Hobby account, and Next.js is Vercel-native.

## Decision
Host on **Vercel**, running as **serverless functions** (no always-on server to manage). GitHub→Vercel gives automatic preview + production deploys.

## Consequences
- ~$0/month baseline (Hobby), per-request scaling, zero ops.
- **Constraints to design around:** a hard **4.5 MB request/response body limit** (→ [0005](0005-direct-to-storage-uploads.md)) and a **60s function cap** (300s with Fluid Compute).
- Vercel's Acceptable Use Policy prohibits the content this app can generate, so **media must not be stored on Vercel** (→ [0003](0003-cloudflare-r2-for-media.md)). Only ephemeral request transit touches Vercel.
