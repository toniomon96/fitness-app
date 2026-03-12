## Summary

<!-- What does this PR do? -->

## Ticket / Sprint Context

- Sprint:
- Ticket or issue:
- Problem being solved:
- Primary user journey affected:

## Promotion Path

- [ ] `feature/*`, `bug/*`, `fix/*`, `chore/*`, `docs/*`, or `polish/*` branch targeting `dev`
- [ ] `dev -> main` release candidate targeting production
- [ ] `hotfix/* -> main` urgent production patch

## Environment Validation

- [ ] Local verification completed: `npm run verify:local`
- [ ] Dev smoke gate completed for changes headed to `dev`: `npm run verify:dev`
- [ ] Preview release gate completed for changes headed to `main`: `npm run verify:preview`
- [ ] Preview deployment reviewed manually before production merge

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactor / cleanup
- [ ] Documentation
- [ ] Tests

## Acceptance Criteria

- [ ] Acceptance criteria are reflected in the implementation
- [ ] Guest / authenticated / premium behavior has been considered where applicable
- [ ] Empty, loading, success, and error states were reviewed

## Test Plan

- [ ] Unit tests added or updated
- [ ] Integration tests added or updated
- [ ] E2E tests added or updated where the golden path changed
- [ ] Manual QA completed for the affected journey

## Rollout / Risk

- [ ] No storage or migration risk
- [ ] Storage or sync behavior changed and rollout notes are included
- [ ] Auth / routing behavior changed and rollback approach is clear
- [ ] AI behavior changed and degraded/failure states were reviewed

## Checklist

- [ ] Target branch follows `local -> dev -> preview -> prod`
- [ ] `npm run typecheck` passes (0 errors)
- [ ] `npm run lint` passes (0 warnings)
- [ ] `npm test` passes (all tests green)
- [ ] `npm run build` passes
- [ ] No API keys or secrets added to source files
- [ ] New serverless endpoints call `setCorsHeaders()` and `checkRateLimit()`
- [ ] Analytics or observability updates were considered for user-facing changes
