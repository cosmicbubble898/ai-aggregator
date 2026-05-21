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
