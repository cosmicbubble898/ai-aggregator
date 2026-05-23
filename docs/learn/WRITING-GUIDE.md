# How we write these lessons — the learning style guide

Just as the app has a [design system](../design-system.md) for how it *looks*, the learning track has **this** — a small system for how every lesson *reads*. Follow it so the lessons stay consistent, genuinely beginner-friendly, and never drift into jargon. It's the writer's companion to the [curriculum](README.md).

## The one rule
**Make it very, very simple.** Whenever you're torn between "more complete" and "easier to understand," choose *easier*. A lesson's job is to hand someone a clear **mental picture** — not to turn them into an expert in one sitting.

## Principles

1. **Write for a curious 15-year-old with zero background.** Assume no prior knowledge and no coding. Plain English only.

2. **Never go too technical — that's what the AI is for.** Give the high-level idea, not the implementation: no code, no deep mechanics, no precise jargon (unless a word is the very thing you're teaching — then define it in one breath). **If a reader wants to go deeper, they just ask the AI tutor.** The lessons are the *on-ramp*; the chat tutor is the bottomless well. Don't try to be the well — and tell readers they can always ask for more.

3. **One analogy per idea, from everyday life.** A car, a video game, a recipe, a vending machine, game save-slots, an editor reviewing a draft. **Never explain tech with more tech.**

4. **One lesson, one lane.** Stay on your topic. When another topic surfaces, *forward-reference* the lesson that owns it ("the git mechanics are Lesson 5") instead of half-explaining it. Don't duplicate.

5. **Keep concepts separate.** Don't let two ideas blur together (e.g. *software* vs. *AI*). Explain one fully, then move to the next.

6. **Honest — never hype, never doom.** No over-claiming, no fear-mongering. Admit uncertainty where it's real (e.g. AI timelines). Be straight about cost.

7. **The repo is the lesson.** Tie each idea to the *real* parts of this project — actual files and folders — not toy examples. It makes the abstract concrete.

8. **Short.** Aim for a 5–10 minute read. Tight prose; cut any sentence that isn't pulling its weight.

## Voice
- Warm, direct, **second person** ("you").
- **Bold** a key term the first time it appears; *italics* for the analogy or a quick aside.
- Short sentences beat long ones. Em-dash asides are fine in moderation.

## The shape of a lesson
```
# <Title> — <plain subtitle>

*<one italic line: what this lesson is + the level, e.g. "explained to a 15-year-old who's never coded." No jargon.>*

> <optional one-line hook, or the single most important takeaway.>

## 1. <First idea>
<plain explanation> — *<everyday analogy>*. <and, where it helps, "in this project: …">

## 2. <Next idea>
…

---

## See it in the real project   <!-- optional but recommended; or weave the repo links inline instead -->
| Idea | Where it lives here |
|---|---|
| … | a real file / folder |

**Next:** [<next lesson>](NN-slug.md) — <one line>.
<!-- For an unwritten next lesson, write the title as plain text + *(coming)* — NOT a link. -->
```

## Before a lesson is committed
- A person with **zero background** could read it start to finish with no unexplained word.
- Every new idea has an **everyday analogy**, and nothing goes too technical.
- It **stays in its lane** and forward-references the rest.
- Links and the **Next** pointer are correct (plain text + *(coming)* for any unwritten lesson — never a dead link).
- It passed the **docs-reviewer** gate. *(A wrong lesson mis-teaches, so the bar is higher than for code.)*

---

*Lessons are written once as markdown here in `docs/learn/`, and the app renders the very same files in its in-app **Learn** section — one source of truth (see the [PRD](../prd/phase-1.md)).*
