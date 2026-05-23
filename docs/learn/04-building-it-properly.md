# Building it properly — the process behind every change

*This lesson is about **how** we build, not what — the few cheap habits that keep a project from turning into a mess, and why they matter even more when an AI is doing the typing. Still plain English.*

> With an AI, you *can* just say "build me an app" and watch code appear. This lesson is about why the people who get somewhere don't stop there.

## 1. The temptation — and the trap
Because an AI will happily generate whatever you ask, it's tempting to just describe what you want and let code pour out — call it "vibe building." For a tiny throwaway, that's fine. But the moment a project grows, winging it bites back:
- You forget *why* you did something — even a few days later.
- A bug appears and you can't tell *which* change caused it.
- You re-argue the same decision again and again.
- It quietly turns into a tangle nobody understands — not even the AI.

*Analogy:* building a house by stacking bricks wherever feels right. It stands for a while — then you can't add a room without the whole thing wobbling.

## 2. The fix: decide and write it down — *before* you build
"Doing it properly" is really one move: **think and write first, build second.** Three small written things carry most of the weight:

- **A spec — the *what* and *why*, before any building.** For each feature, jot down what it should do and *how you'll know it's done* (its "acceptance criteria"). *Analogy:* a blueprint before you pour concrete; a recipe before you cook for guests. *(In this repo: `docs/specs/`.)*
- **A decision record — a choice, captured.** When you make a real decision ("store the keys encrypted, this way, for these reasons"), write a few lines: what you chose and *why* — so nobody, including future-you or the AI, has to guess later. *Analogy:* a decision diary. *(In this repo: `docs/adr/` — "Architecture Decision Records.")*
- **A changelog — what shipped, when.** A running, plain-language list of what changed. *(In this repo: `CHANGELOG.md`.)*

None of these is heavy — each is a handful of lines. Together they mean the project always knows *why it is the way it is.*

## 3. Small, labeled steps
Rather than one giant "did everything" change, you save progress in **small, labeled steps** (engineers call each one a *commit*), each with a short note on what it did. We even follow a tidy convention — labels like `feat:` (a new feature), `fix:` (a bug fix), `docs:` (documentation) — so the history reads like a clean summary on its own. *Analogy:* labeled save points in a game: you can always see what changed and roll back to a good one. *(The mechanics of this — git — are a later lesson, **Git & GitHub**.)*

## 4. Check before you ship
You never shove a change straight onto the live app and hope. Instead:
- the change goes up as a **proposal** that people (and machines) can look at;
- an automated checker runs the **quality gates** for you (does it still build? any obvious breakage?);
- you get a **preview** — a private copy of the app *with* the change — to click around and confirm it really works;
- only then does it go live.

*Analogy:* a dress rehearsal and a pre-flight checklist before the real show. *(The full local → preview → live pipeline is a later lesson, **Shipping it**.)*

## 5. The golden thread: traceability
Here's what ties it all together. Each piece links to the one before it, so **any line of code can be traced back to why it exists**:

> a goal (the product plan) → a spec → a decision record → the small steps that built it → the proposal that shipped it → the changelog.

Pull any thread and you can walk the whole story backwards. That traceability is the difference between a project you can keep growing for years and one that slowly rots.

## 6. Why this matters *more* with AI (the north star)
Here's the twist. People normally skip specs, decision records, and tidy history because they're tedious. **But the AI will do the tedious parts for you** — draft the spec, write the commit messages, update the changelog. The usual excuse is gone, so "no corners cut" becomes realistic for the first time.

And it unlocks the real prize. If every change is written down and traceable, you can move toward a loop where:

> you drop in a spec → the AI builds it → it appears on a preview → you click **approve** → it ships.

That's the north star of this whole project: a documented, **AI-driven pipeline** where *you decide and approve* and the AI does the building. The careful process isn't bureaucracy — it's the rails that let you (and an AI) move fast *without* losing the plot.

---

## See it in the real project
| The habit | Where it lives here |
|---|---|
| The *what* & *why*, before building | [`../prd/`](../prd) and [`../specs/`](../specs) |
| Decisions, recorded | [`../adr/`](../adr) |
| What shipped, when | [`../../CHANGELOG.md`](../../CHANGELOG.md) |
| The build diary, session by session | [`../session-log/`](../session-log) |

Everything in this repo arrived through exactly this process — you can read the whole trail.

**Next:** *Git & GitHub* — the "save system" and the shared shelf that make small, labeled steps and proposals actually work. *(coming)*
