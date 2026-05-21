# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added
- Project scaffolded: Next.js 16.2.6, TypeScript, App Router, ESLint.
- Documentation & open-source framework: PRD (`docs/prd/phase-1.md`), architecture overview, ADRs, runbook, spec template.
- Repo conventions: `AGENTS.md` agent rules, `CONTRIBUTING.md`, Conventional Commits, MIT `LICENSE`.
- CI (typecheck + lint + build) and PR/issue templates.
- Project brief (`docs/project-brief.md`) — standalone overview for brainstorming.
- Specialist subagents in `.claude/agents/` (code-reviewer, backend, frontend, devops) as available helpers, with a soft delegation note in `CLAUDE.md`.
- Session continuity system: `docs/session-log/` (logs + template + README) and `CLAUDE.md` updates (context imports, current phase, session start/end protocol).
- Learning-first mission declared up front (README + AGENTS.md) + a `docs/learn/` learning-path index — the repo doubles as an open-source learning resource.
- `docs/learn/01-foundations.md` — beginner foundations lesson (hardware/software, local vs cloud, server, frontend/backend, database vs file storage, API, hosting, git) with analogies, mapped to this project.
- `docs-reviewer` agent + a review gate: learning/docs content gets an independent accuracy/clarity review before commit/push. Applied it to `01-foundations.md` (clearer cloud-access framing, defined "serverless," tightened the restaurant/kitchen analogy).
- `/ai-start` slash command (`.claude/commands/ai-start.md`) + a project-scoped session-start protocol in `CLAUDE.md` — one-word session resume (read CLAUDE.md + latest session log, then ask before acting). Named `ai-start` (not `start`) to avoid colliding with the productivity plugin's `/start`.
- `ONBOARDING.md` — guided-build companion at the repo root: a beginner opens it in Claude Code (or a claude.ai chat) to go from empty folder to deployed app (tutor-in-chat vs. builder-in-Claude-Code, why-first golden rules, a doc map, the phased build journey, and the chat-handoff/continuity lesson). Passed the docs-reviewer gate; linked from README + `docs/learn/`.
