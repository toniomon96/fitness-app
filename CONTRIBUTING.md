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

## Making Changes

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
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
