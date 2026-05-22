# Design System

Our visual language: the colours, fonts, spacing, and shapes every screen is
built from. It's **Claude-inspired** — a warm, calm, paper-like look — and it
lives as plain-CSS **design tokens** so the whole app stays consistent and is
easy to re-theme. The decision behind it is recorded in
[ADR-0009](adr/0009-claude-inspired-design-system.md).

> **One rule:** UI never hard-codes a colour or a size. It always uses a token
> (e.g. `var(--color-accent)`, `var(--space-4)`). That's what keeps the look
> consistent and changeable from one place.

---

## What are "design tokens"?

A token is a named CSS variable for a single design decision. Instead of
writing `color: #d97757` in fifty places, we define it once:

```css
--color-accent: #d97757;
```

…and everything that should be "the brand colour" uses `var(--color-accent)`.
Change the token, and every button, link, and highlight updates together. All
tokens live in [`app/globals.css`](../app/globals.css).

---

## Colours

The palette is **pixel-matched from the live Claude app** — warm neutrals plus a
single clay accent. Colours are named by **role** (what they're for), not by
appearance, so the same token name works in both light and dark themes.

### Light theme (default)

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#F8F8F6` | App canvas (warm off-white) |
| `--color-bg-panel` | `#EFEEEB` | Sidebars / panels |
| `--color-bg-inset` | `#E6E5E0` | Recessed areas / wells |
| `--color-bg-elevated` | `#FFFFFF` | Cards / popovers above the page |
| `--color-text-strong` | `#121212` | Headings, emphasis |
| `--color-text` | `#373734` | Default body text |
| `--color-text-muted` | `#7B7974` | Secondary / hints |
| `--color-border` | `#E6E4DD` | Hairline separators |
| `--color-accent` | `#D97757` | Brand clay — buttons, focus, active |
| `--color-accent-hover` | `#C2613F` | Accent, hover/active state |
| `--color-accent-contrast` | `#FFFFFF` | Text/icon placed on the accent |
| `--color-danger` | `#CF3A3A` | Errors / destructive actions |

### Dark theme (applies via OS preference)

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#1F1F1E` | App canvas (warm charcoal) |
| `--color-bg-panel` | `#171716` | Sidebars / panels |
| `--color-bg-inset` | `#121212` | Recessed areas |
| `--color-bg-elevated` | `#2C2C2A` | Raised cards / hover surfaces |
| `--color-text-strong` | `#F8F8F6` | Headings, emphasis |
| `--color-text` | `#C3C2B7` | Default body text |
| `--color-text-muted` | `#97958C` | Secondary / hints |
| `--color-border` | `#33322F` | Hairline separators |
| `--color-accent` | `#D97757` | Brand clay (unchanged on dark) |
| `--color-accent-hover` | `#E08A6B` | Accent, hover/active state |
| `--color-accent-contrast` | `#FFFFFF` | Text/icon placed on the accent |
| `--color-danger` | `#E34A4A` | Errors / destructive actions |

**How the theme switches:** light is the default. Dark turns on automatically
when the visitor's operating system is set to dark mode, via a
`@media (prefers-color-scheme: dark)` block in `globals.css`. There's no manual
toggle yet — adding one later means introducing `[data-theme]` overrides; the
tokens are already structured for it.

---

## Fonts

Claude's real fonts (Anthropic Serif/Sans) are commercial and can't ship in an
open-source repo, so we use **free, open-licensed look-alikes** that capture the
same feel (see [ADR-0009](adr/0009-claude-inspired-design-system.md)). They're
self-hosted by `next/font` (no calls to Google at runtime) and wired up in
[`app/layout.tsx`](../app/layout.tsx).

| Token | Font | Used for |
|---|---|---|
| `--font-serif` | **Newsreader** | Headings, branding, display moments |
| `--font-sans` | **Hanken Grotesk** | Body text and all UI |
| `--font-mono` | **JetBrains Mono** | Code blocks |

The serif-for-headings + sans-for-everything pairing is a big part of the Claude
feel. Headings already default to `--font-serif` in `globals.css`.

### Type scale

Sizes step up predictably (in `rem`, so they respect the user's browser
setting): `--text-xs` 12px · `--text-sm` 14px · `--text-base` 16px (body) ·
`--text-lg` 18px · `--text-xl` 20px · `--text-2xl` 24px · `--text-3xl` 30px ·
`--text-4xl` 36px. Line heights: `--leading-tight` (headings),
`--leading-normal` (body), `--leading-relaxed` (long-form). Weights:
`--weight-regular/medium/semibold/bold`.

---

## Spacing & shape

- **Spacing** follows a **4px rhythm** so things line up: `--space-1` (4px)
  through `--space-8` (64px). Use these for padding, margins, and gaps instead
  of arbitrary pixel values.
- **Corner radius** is soft and calm: `--radius-sm` 6px · `--radius-md` 10px ·
  `--radius-lg` 16px · `--radius-xl` 24px · `--radius-full` (pills/circles).

---

## How to use the tokens

Reference them with `var(...)` in any CSS:

```css
.primary-button {
  background: var(--color-accent);
  color: var(--color-accent-contrast);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--weight-medium);
}
.primary-button:hover {
  background: var(--color-accent-hover);
}

.card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}
```

Because these are role-based tokens, the same button automatically looks right
in both light and dark themes — you never write theme-specific colours in a
component.

---

## The intended layout (for later)

The target shell is Claude's three-column layout — a **left sidebar**
(navigation/history), a **central column** (content + the message composer), and
a **right sidebar** (contextual panel). It isn't built yet; this document defines
the *system* the layout will be built from. The layout itself is the next design
step, gated on this.

---

*Tokens: [`app/globals.css`](../app/globals.css) · Fonts:
[`app/layout.tsx`](../app/layout.tsx) · Decision:
[ADR-0009](adr/0009-claude-inspired-design-system.md).*
