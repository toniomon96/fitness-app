# Omnexus — Roadmap

---

## v1.0 — Shipped

All 11 sprints complete. **0 TypeScript errors · 115 tests passing.**

| Sprint | Delivered |
|---|---|
| Foundation (1–8) | Branding, 5-tab nav, learning system, Vercel serverless, Claude Q&A, AI insights, PubMed feed, personalization, RPE, custom program builder, CI |
| Production | Supabase Auth (email+password), cloud sync, community (friends, leaderboard, challenges, real-time feed), GDPR (cookie consent, data export, account deletion) |
| AI Intelligence | Multi-turn onboarding agent, generative 8-week mesocycle engine, adaptation engine (per-exercise session suggestions), block missions, AI challenges (personal + weekly cron), peer insights |
| Semantic Learning | pgvector embeddings (OpenAI), semantic content search, dynamic micro-lesson generation |
| Security | Upstash rate limiting (20 req/10 min/IP), CORS production enforcement, prompt injection whitelist, Playwright E2E suite |
| Native | Capacitor v8 — iOS + Android, haptics, status bar, splash screen, safe areas |
| Sprint 4 | Nutrition tracking (macro logging, goals, date navigator, quick-add) |
| Sprint 5 | Source-grounded AI coach — pgvector RAG in `/api/ask`, citation display in AskPage |
| Sprint 6 | Social/cooperative challenges — per-challenge leaderboard, team mode, friend invitations with Realtime |
| Sprint 7 | Wearables MVP (`src/lib/health.ts`, `HealthWidget`) — code ready, HealthKit entitlement deferred to v1.1 |
| Sprint 8 | Analytics — PostHog wrapper, 8 tracked events |
| Sprint 9 | Profile pictures (Supabase Storage), light mode polish (24 files), exercise YouTube demo embeds |
| Sprint 10 | Premium tier — Stripe checkout + webhooks + usage gating, SubscriptionPage |
| Sprint 11 | UX overhaul, TrainPage + CommunityPage hubs, HelpPage (FAQ + bug report), `/api/report-bug`, marketing landing page |
| Signup + Email | Custom `/api/signup` with Resend — branded confirmation emails, server-side admin user creation |
| Inline Workout Editing | Edit logged sets inline in history cards |

**Live:** https://fitness-app-ten-eta.vercel.app

---

## Post-v1.0 Plans

### v1.1 — Wearables (Full)

- Install `@capacitor-community/health` + `cap sync`
- Add HealthKit entitlement in Xcode (iOS) + Health Connect in AndroidManifest
- Submit app update to both stores

### v1.2 — PDF Export

- Export training program as formatted PDF
- Export workout history as PDF/CSV

### v1.3 — Advanced Program Progression

- Progressive overload automation — auto-suggest next session targets from adaptation results
- Week-by-week program view with planned vs. actual volume
- Deload week detection (auto-drop volume when 3 sessions show RPE ≥ 9)

### v1.4 — AI Form Coach

- Video capture during workout set
- Claude vision analysis of exercise form
- Cue suggestions overlaid on playback

### v1.5 — Enhanced Learning

- Interactive exercise animations (Lottie or CSS)
- Video lesson integration
- Adaptive quiz difficulty based on past scores
- Course completion certificates (shareable PNG)
