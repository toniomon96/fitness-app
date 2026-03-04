# Omnexus v1.0 — App Store & Play Store Submission Guide

Complete checklist for the first public release on iOS (App Store) and Android (Google Play).

---

## Prerequisites

Ensure these are done before starting:

- [ ] All items in `docs/TESTING-PLAN.md` passed
- [ ] Production Vercel deployment is live and healthy
- [ ] Both Sprint 6 Supabase SQL migrations applied to production
- [ ] All production env vars set in Vercel dashboard
- [ ] Capacitor v8 installed and configured (`capacitor.config.ts`)
- [ ] Apple Developer account ($99/year) enrolled
- [ ] Google Play Console account ($25 one-time) enrolled
- [ ] App icon created (1024×1024 PNG, no alpha, no rounded corners — both stores handle rounding)

---

## App Metadata (shared)

Fill these once; copy to both stores.

**App name:** Omnexus — Smart Fitness Tracker

**Short description (80 chars):**
> AI-powered workout tracking, coaching, and community for serious athletes.

**Full description:**
> Omnexus is the fitness app for people who want to train smarter. Built around evidence-based exercise science and powered by Claude AI, it adapts to your goals and experience level — not the other way around.
>
> FEATURES
> • AI Onboarding — a conversational coach builds your personalized 8-week training program from scratch
> • Smart Workout Logger — log sets with weight, reps, and RPE; PRs auto-detected with confetti celebration
> • Ask Omnexus — science-backed Q&A with peer-reviewed citations (powered by Claude + pgvector RAG)
> • AI Insights — weekly workout analysis with personalized recommendations
> • Training Programs — browse pre-built programs or build your own
> • Exercise Library — 51 exercises with instructions, muscle diagrams, and 1RM progression charts
> • Community — activity feed, friend challenges, leaderboards, and cooperative team challenges
> • Nutrition Tracking — macro logging with daily goals and AI meal plan generation
> • Body Measurements — track weight, body fat %, and other metrics over time
> • Learning Hub — structured courses on strength, nutrition, recovery, and sleep with quizzes
>
> PRIVACY
> Omnexus uses Supabase for secure cloud storage with Row Level Security. Your health data is never sold or shared. You can export or delete your data at any time from the Profile page.
>
> ⚠️ Educational use only. Not a substitute for professional medical advice.

**Category:** Health & Fitness

**Age rating:** 4+ (iOS) / Everyone (Android)

**Keywords (iOS, comma-separated):**
> fitness tracker, workout log, AI coach, strength training, muscle building, calorie tracker, exercise log, gym tracker, weight lifting, hypertrophy

---

## iOS — App Store

### 1. Xcode project setup

```bash
# Make sure the production build is ready
npm run build
VITE_API_BASE_URL=https://your-app.vercel.app npx cap sync ios
npx cap open ios
```

In Xcode:
1. **Bundle ID:** `com.omnexus.app` (must match `capacitor.config.ts`)
2. **Version:** 1.0.0 · **Build:** 1
3. **Display Name:** Omnexus
4. **Deployment Target:** iOS 16.0 minimum
5. **Signing:** select your Apple Developer team; enable automatic signing

### 2. Capabilities

In Xcode → target → Signing & Capabilities, add:
- **Push Notifications** (for VAPID notifications)
- **Background Modes** → Remote notifications
- **Do NOT add HealthKit** — wearables are deferred to v1.1. Adding HealthKit without active usage causes App Store rejection.

### 3. Info.plist additions

```xml
<!-- Push notifications -->
<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
</array>
```

### 4. App icon + Launch screen

- Add 1024×1024 icon to `App/App/Assets.xcassets/AppIcon.appiconset`
- Capacitor generates all required sizes automatically from this
- Splash screen configured in `capacitor.config.ts`

### 5. Screenshots

Required sizes (portrait):
| Device | Size |
|---|---|
| iPhone 15 Pro Max | 1290 × 2796 px |
| iPhone 8 Plus | 1242 × 2208 px |
| iPad Pro 12.9" (6th gen) | 2048 × 2732 px |

**5 recommended screens:**
1. Dashboard with streak + muscle heat map
2. Active workout with set logging + PR banner
3. Ask Omnexus with AI answer + citations
4. Challenges page with team challenge card
5. Community feed with reactions

You can use Simulator screenshots: Device → Screenshot (⌘S).

### 6. App Privacy (App Store Connect)

Under App Privacy, declare:
| Data Type | Collected | Used For |
|---|---|---|
| Email address | Yes | Account management |
| User ID | Yes | Analytics |
| Health & Fitness | Yes | App functionality |
| Coarse location | No | — |
| Precise location | No | — |

### 7. Build + Archive

1. Set scheme to "Any iOS Device (arm64)" (not a Simulator)
2. Product → Archive
3. Window → Organizer → Distribute App → App Store Connect → Upload

### 8. App Store Connect

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. My Apps → + → New App
3. Fill metadata from the shared section above
4. Select the uploaded build
5. App Review Notes: *"Test account: e2e-test@omnexus.test / password: [your test pw]"*
6. Submit for Review

**Typical review time:** 24–48 hours for first submission.

---

## Android — Google Play

### 1. Android Studio setup

```bash
npm run build
VITE_API_BASE_URL=https://your-app.vercel.app npx cap sync android
npx cap open android
```

In Android Studio:
1. **Application ID:** `com.omnexus.app`
2. **Version name:** 1.0.0 · **Version code:** 1

### 2. AndroidManifest.xml additions

```xml
<!-- Internet -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Push notifications (Android 13+) -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

> **Do NOT add Health Connect permissions** — wearables are deferred to v1.1.

### 3. Generate signed AAB

1. Build → Generate Signed Bundle / APK → Android App Bundle
2. Create a new keystore (keep it safe — losing it means you cannot update the app)
   - Keystore file: `omnexus.jks`
   - Alias: `omnexus`
3. Build Variant: release
4. Output: `app/release/app-release.aab`

### 4. Screenshots

Required: at least 2 screenshots per device type.
| Device | Size |
|---|---|
| Phone | 1080 × 1920 px (16:9) |
| 7-inch tablet | 1200 × 1920 px |
| 10-inch tablet | 1920 × 1200 px |

Use Android Emulator → Extended Controls → Screenshot.

### 5. Play Console upload

1. Go to [play.google.com/console](https://play.google.com/console)
2. All apps → Create app → fill details
3. Production → Releases → Create release → upload `.aab`
4. Fill store listing with metadata from the shared section
5. Content rating → fill questionnaire → Health & Fitness app, no violence/sexual content
6. Privacy policy URL: `https://fitness-app-ten-eta.vercel.app/privacy`
7. Data safety:
   - Collects: Email, User IDs, Health & Fitness data
   - Shares: No data shared with third parties
8. Submit for review

**Typical review time:** 3–7 days for first submission.

---

## Post-Launch

After both apps are approved and live:

1. **Monitor crash reports** — Xcode Organizer (iOS) + Play Console Android Vitals
2. **Check PostHog dashboard** — verify events are flowing (workout_completed, ask_submitted, etc.)
3. **Respond to reviews** — App Store Connect + Play Console both support responses
4. **Vercel deployment** — set `VITE_API_BASE_URL` in Vercel env vars so future web builds still work
5. **Update MEMORY.md** — note v1.0 is live, track App Store / Play Store app IDs

---

## Version Numbering

Going forward, use semantic versioning:

| Type | Version bump | Example |
|---|---|---|
| Bug fix | patch | 1.0.0 → 1.0.1 |
| New feature | minor | 1.0.0 → 1.1.0 |
| Breaking change | major | 1.0.0 → 2.0.0 |

iOS Build number must increment on every App Store upload (even for the same version string).
Android Version code must increment on every Play Store release.
