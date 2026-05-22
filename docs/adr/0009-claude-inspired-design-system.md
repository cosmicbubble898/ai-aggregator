# 0009. Claude-inspired design system with free font look-alikes

- **Status:** Accepted
- **Date:** 2026-05-22

## Context
Before building any user-visible UI, we agreed a **design-first gate**: finalize
the design system (colours, typography, spacing, shape) together first, so UI is
built from a consistent foundation rather than decided ad hoc. We want the look
and feel of the **Claude** app — warm neutrals, a single clay accent, a
serif + sans pairing, soft rounded shapes, and (eventually) its three-column
layout — because it's calm, legible, and well-liked.

Two things needed deciding:

1. **Fonts.** Claude's actual typefaces (Anthropic Serif/Sans) are *commercial,
   licensed* fonts. Bundling them in a public, MIT-licensed, open-source repo
   would violate their licences.
2. **Exact colours.** We wanted the palette to genuinely match Claude rather
   than approximate it by eye.

## Decision
- Adopt a **Claude-inspired** design system (we are *inspired by* the aesthetic;
  we do not use Anthropic's trademarks, logo, or claim affiliation).
- **Fonts — free, open-licensed look-alikes** that capture the same feel,
  self-hosted via `next/font` (no runtime calls to Google):
  - **Newsreader** (serif) for headings/branding — stands in for Anthropic Serif.
  - **Hanken Grotesk** (sans) for body and UI — stands in for Anthropic Sans.
  - **JetBrains Mono** for code.
- **Colours — pixel-matched from the live Claude app.** We sampled the running
  app's computed CSS tokens in both light and dark modes and mapped them to our
  own role-based tokens (`--color-bg`, `--color-text`, `--color-accent`, …). The
  brand accent is Claude's clay `#D97757`, used unchanged in dark mode.
- **Both themes from the start.** Light is the default; dark applies
  automatically via `@media (prefers-color-scheme: dark)`. No manual toggle yet
  (that's a later UI step; the tokens are structured so a `[data-theme]`
  override slots in cleanly).
- **Plain-CSS design tokens** (CSS custom properties) in `app/globals.css`, in
  keeping with [ADR-0007](0007-stack-next16-plain-css.md) (plain CSS, no
  framework). UI references tokens; it never hard-codes a colour or size.
- Full reference (palette tables, type scale, spacing, usage) lives in
  [`docs/design-system.md`](../design-system.md).

## Consequences
- **Pro:** a consistent, re-themable foundation; UI work can now proceed against
  agreed tokens. Most of the Claude feel with **zero font-licensing risk** and
  no third-party CSS dependency.
- **Pro:** dark mode "just works" by following the OS, with no extra UI.
- **Trade-off:** the look is *inspired by*, not identical to, Claude — the
  look-alike fonts differ slightly from the originals. Fonts are a one-token
  swap, so this is cheap to revisit.
- **Deferred:** a manual light/dark toggle, and the three-column **layout/shell**
  itself — both are follow-on steps that consume this system.
- Adds three self-hosted fonts (sourced via `next/font/google`, bundled at build time — no runtime calls to Google) to the bundle (a small, expected cost).

Relates to [ADR-0007](0007-stack-next16-plain-css.md) (Next.js 16 + plain CSS).
