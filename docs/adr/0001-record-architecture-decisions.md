# 0001. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-05-21

## Context
This project aims to be fully documented and traceable so that any change can be followed from *why* to *shipped* — and so an AI pipeline can act on durable context rather than re-deriving decisions.

## Decision
We record significant technical and process decisions as **Architecture Decision Records (ADRs)** in `docs/adr/`, numbered sequentially and immutable. Each ADR has Context, Decision, and Consequences. When a decision is reversed, we add a new ADR that supersedes the old one (we don't edit history).

## Consequences
- The reasoning behind choices survives even as the code changes.
- Slight overhead per decision — acceptable, and largely automated by AI.
- ADRs are the canonical answer to "why is it built this way?"
