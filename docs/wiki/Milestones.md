# Milestones

## M1 — App Store Submission (v1.0)

**Status**: In Progress

| Task | Status |
|---|---|
| Generate iOS + Android native projects (`npx cap add ios/android`) | Pending (needs Mac or Windows Capacitor setup) |
| Configure HealthKit entitlement in Xcode (deferred — v1.1) | Deferred |
| Submit to iOS App Store | Pending |
| Submit to Google Play | Pending |
| Set up branch protection on `main` | Done |
| Resolve GitHub Dependabot vulnerabilities (2 high, 1 moderate) | In Progress |

---

## M2 — Security Hardening (v1.4)

| Task | Status |
|---|---|
| Cron endpoints fail-closed when `CRON_SECRET` absent | Pending |
| CORS reject (403) on unknown origin | Pending |
| Rate limiting in all environments | Pending |
| Content-Security-Policy header on API responses | Pending |

---

## M3 — Product Depth (v2.0)

| Feature | Priority |
|---|---|
| AI Form Coach (MediaPipe) | High |
| Full Wearables (HealthKit + Health Connect) | High |
| In-App Video (Mux) | Medium |
| Offline Sync (IndexedDB + service worker) | Medium |
| Advanced AI Personalization | Low |

---

## M4 — B2B Launch (v3.0)

| Feature | Priority |
|---|---|
| Multi-tenancy (`gym_id` RLS) | High |
| Gym Admin Dashboard | High |
| White-label branding | Medium |
| Trainer Tools | Medium |
| Per-seat Stripe Billing | High |

---

## Ongoing

- Fix Dependabot-flagged vulnerabilities (2 high: `tar` and npm dependency chain)
- Stripe: add `customer.subscription.updated` webhook event in dashboard
- Wiki: initialize and push content (see `docs/wiki/` in repo)
