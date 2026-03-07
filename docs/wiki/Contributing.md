# Contributing Guide

## Development Setup

```bash
node --version   # must be 20.x (see .nvmrc)
npm install
# create .env.local with required keys (see Architecture page)
vercel dev       # starts frontend + serverless functions on :3000
```

> **Important**: Use `vercel dev`, not `npm run dev`. Serverless functions need the Vercel runtime.

---

## Branching Strategy

`main` is **protected** — no direct pushes allowed. All changes go through PRs.

| Prefix | Use for |
|---|---|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `chore/` | Dependencies, config, scripts |
| `docs/` | Documentation only |
| `hotfix/` | Urgent production patches (branch from main) |

```bash
git checkout -b feat/form-coach-mediapipe
git checkout -b fix/offline-sync-conflict
git checkout -b chore/bump-capacitor-v9
git checkout -b docs/update-roadmap
```

---

## Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add MediaPipe pose estimation to AI form coach
fix: resolve offline sync conflict on duplicate set logs
chore: bump capacitor to v9
docs: update ROADMAP with v3 B2B section
test: add E2E spec for nutrition quick log
```

---

## PR Workflow

1. Create a branch from `main`
2. Make your changes with focused commits
3. Run checks locally:
   ```bash
   npx tsc --noEmit    # 0 errors required
   npx eslint src      # 0 warnings required
   npm test            # 115/115 tests must pass
   ```
4. Push and open a PR:
   ```bash
   git push -u origin feat/your-feature
   # GitHub will show a "Compare & pull request" prompt
   ```
5. CI must pass before merge

---

## Code Conventions

- **Components**: function declarations (not `const` arrow functions)
- **Types**: centralized in `src/types/index.ts`
- **Static data**: `src/data/` folder
- **Utilities**: domain-grouped in `src/utils/`
- **Supabase helpers**: `db.ts` throw `Error('[fnName] ${error.message}')` — callers use `useToast()`
- **API endpoints**: always call `setCorsHeaders()` + `checkRateLimit()` at the top
- **Never expose** API keys in responses or client-side code

---

## Git Remote

The GitHub remote is named `init` (not `origin`):

```bash
git push init main         # push to GitHub
git pull init main         # pull from GitHub
git remote get-url init    # https://github.com/toniomon96/Omnexus.git
```

---

## Reporting Issues

Use the in-app Help page → Bug Report, or open a GitHub Issue.
