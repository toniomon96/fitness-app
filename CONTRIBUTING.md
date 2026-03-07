# Contributing to Omnexus

Thank you for your interest in contributing. Here's everything you need to get started.

---

## Development Setup

See the [README](README.md#local-development) for full setup instructions.

Quick start:

```bash
npm install
# create .env.local with required keys
vercel dev        # starts frontend + serverless functions on :3000
```

---

## Branching Strategy

The `main` branch is **protected** — no direct pushes. All changes go through a PR.

### Branch naming

| Prefix | Use for |
|---|---|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `chore/` | Dependencies, config, scripts |
| `docs/` | Documentation only |
| `hotfix/` | Urgent production patches |

Examples:
```bash
git checkout -b feat/form-coach-mediapipe
git checkout -b fix/offline-sync-conflict
git checkout -b chore/bump-capacitor-v9
git checkout -b docs/update-roadmap
```

### Commit conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add MediaPipe pose estimation to AI form coach
fix: resolve offline sync conflict on duplicate set logs
chore: bump capacitor to v9
docs: update ROADMAP with v3 B2B section
test: add E2E spec for nutrition quick log
```

### PR workflow

1. Create your branch from `main`
2. Make your changes; commit often with descriptive messages
3. Run all checks locally (see below) — CI will reject failures
4. Push your branch and open a PR against `main`
5. Address review feedback; the branch merges when CI is green + approved

```bash
git push -u origin feat/your-feature
gh pr create --base main --fill
```

### Hotfixes

Branch from `main`, fix, PR back to `main` with fast-track review:
```bash
git checkout -b hotfix/fix-broken-api main
# ... fix ...
git push -u origin hotfix/fix-broken-api
gh pr create --base main --label hotfix
```

---

## Making Changes

1. Create a branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Run the checks:
   ```bash
   npx tsc --noEmit    # TypeScript — must pass with 0 errors
   npx eslint src      # ESLint — must pass with 0 warnings
   npm test            # Vitest — all 115 tests must pass
   ```
4. Open a pull request against `main`

---

## Code Conventions

- **Components**: function declarations, not arrow functions assigned to `const`
- **Types**: centralized in `src/types/index.ts`
- **Static data**: goes in `src/data/`
- **Utilities**: grouped by domain in `src/utils/`
- **Supabase write helpers** in `db.ts` throw `Error('[fnName] ${error.message}')` — callers catch and use `toast()`
- **API endpoints**: always call `setCorsHeaders()` and `checkRateLimit()` at the top; never expose API keys in responses

---

## Reporting Bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) or submit through the in-app Help page.

---

## Requesting Features

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md). Check [ROADMAP.md](docs/ROADMAP.md) first — it may already be planned.
