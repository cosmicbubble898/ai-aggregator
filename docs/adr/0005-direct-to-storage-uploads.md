# 0005. Upload images directly to storage (presigned PUT)

- **Status:** Accepted
- **Date:** 2026-05-21

## Context
Users attach images (for vision and image-to-image). Sending them as base64 through a Vercel function or Server Action hits the **4.5 MB request-body limit** (→ [0002](0002-host-on-vercel-serverless.md)) and bloats the database.

## Decision
The browser uploads an attached image **directly to R2** via a short-lived **presigned PUT URL** (issued by a tiny auth-gated route). Only the resulting **object key** flows through the app afterward. For vision, the provider receives a presigned GET URL, not base64.

## Consequences
- No large payload ever transits a function body; the 4.5 MB limit is a non-issue.
- Requires a **CORS** policy on the R2 bucket allowing browser `PUT` from the app origin(s).
- The presigned `Content-Type` must match the upload header, or R2 rejects the signature.
