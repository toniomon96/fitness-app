# Omnexus API Reference

All API endpoints are Vercel serverless functions in `/api/`. They run on Node.js 20. API keys and service-role credentials are never exposed to the browser.

---

## Base URL

| Environment | URL |
|---|---|
| Local | `http://localhost:3000/api` |
| Production | `https://<your-vercel-domain>/api` |

---

## Authentication

Three endpoints require a **Supabase Bearer JWT** (the user's `access_token` from `supabase.auth.getSession()`). The server verifies the token using the `SUPABASE_SERVICE_ROLE_KEY`.

| Endpoint | Auth required |
|---|---|
| `POST /api/ask` | No |
| `POST /api/insights` | No |
| `GET /api/articles` | No |
| `POST /api/setup-profile` | No (verifies user exists via admin SDK) |
| `GET /api/export-data` | **Yes** — Bearer JWT |
| `DELETE /api/delete-account` | **Yes** — Bearer JWT |

---

## POST /api/ask

Sends a fitness or health question to Claude and returns an evidence-based answer.

**Request**

```http
POST /api/ask
Content-Type: application/json
```

```json
{
  "question": "How much protein do I need to build muscle?",
  "userContext": {
    "goal": "hypertrophy",
    "experienceLevel": "intermediate"
  }
}
```

| Field | Type | Required |
|---|---|---|
| `question` | `string` | Yes (max 1000 chars) |
| `userContext.goal` | `"hypertrophy" \| "fat-loss" \| "general-fitness"` | No |
| `userContext.experienceLevel` | `"beginner" \| "intermediate" \| "advanced"` | No |

**Response 200**

```json
{ "answer": "Protein needs for muscle building typically range from **1.6–2.2 g per kg**..." }
```

**Errors**

| Status | Cause |
|---|---|
| `400` | Missing/empty question or question > 1000 chars |
| `405` | Non-POST request |
| `500` | Claude API failure |

**Model:** `claude-sonnet-4-6` · `max_tokens: 1024`

---

## POST /api/insights

Analyzes a user's recent workout history and returns personalized training insights.

**Request**

```http
POST /api/insights
Content-Type: application/json
```

```json
{
  "userGoal": "hypertrophy",
  "userExperience": "intermediate",
  "workoutSummary": "Sessions in last 4 weeks: 12\nAverage session volume: 4200 kg\n..."
}
```

| Field | Type | Required |
|---|---|---|
| `userGoal` | `string` | No (defaults to `"general fitness"`) |
| `userExperience` | `string` | No (defaults to `"beginner"`) |
| `workoutSummary` | `string` | Yes — built by `insightsService.ts` |

The `workoutSummary` is generated client-side: filters to last 28 days (max 20 sessions), calculates total/avg volume, lists each session with date, volume, duration, and top exercises.

**Response 200**

```json
{ "insight": "**Training Overview**\nYour training shows strong consistency..." }
```

**Errors**

| Status | Cause |
|---|---|
| `400` | Missing `workoutSummary` |
| `405` | Non-POST request |
| `500` | Claude API failure |

**Model:** `claude-sonnet-4-6` · `max_tokens: 1024`

---

## GET /api/articles

Fetches recent peer-reviewed research from PubMed for a fitness category.

**Request**

```
GET /api/articles?category=strength-training&limit=5
```

| Param | Type | Default | Notes |
|---|---|---|---|
| `category` | `string` | `strength-training` | See valid values below |
| `limit` | `number` | `5` | Max `10` |

**Valid `category` values**

| Value | Focus |
|---|---|
| `strength-training` | Resistance training, hypertrophy, strength |
| `nutrition` | Sports nutrition, protein, macronutrients |
| `recovery` | Exercise recovery, DOMS, muscle repair |
| `sleep` | Sleep quality, athletic performance |
| `metabolic-health` | Insulin sensitivity, body composition |
| `cardio` | Aerobic exercise, HIIT |
| `mobility` | Flexibility, stretching, range of motion |

**Response 200**

```json
{
  "articles": [
    {
      "id": "38563521",
      "title": "Dose-response relationship...",
      "summary": "Abstract text truncated to 400 chars...",
      "source": "Schoenfeld BJ et al. — Journal of Strength and Conditioning Research",
      "sourceUrl": "https://pubmed.ncbi.nlm.nih.gov/38563521/",
      "publishedDate": "2024 Mar",
      "category": "strength-training",
      "cachedAt": "2025-01-24T14:30:00.000Z"
    }
  ]
}
```

Caching is handled **client-side** in `localStorage` with a 6-hour TTL per category.

**Errors**

| Status | Cause |
|---|---|
| `400` | Unrecognised `category` |
| `405` | Non-GET request |
| `500` | PubMed API failure |

---

## POST /api/setup-profile

Creates the user's profile row in the `profiles` table using the Supabase Admin SDK, bypassing Row Level Security. Called immediately after `supabase.auth.signUp()` from the onboarding flow.

This endpoint is needed because when Supabase email confirmation is enabled, no client session exists after `signUp()` — so `auth.uid()` is null and direct client inserts would fail the RLS check.

**Request**

```http
POST /api/setup-profile
Content-Type: application/json
```

```json
{
  "userId": "uuid-of-new-user",
  "name": "Alex",
  "goal": "hypertrophy",
  "experienceLevel": "intermediate",
  "activeProgramId": "program-id"
}
```

| Field | Type | Required |
|---|---|---|
| `userId` | `string` (UUID) | Yes |
| `name` | `string` | Yes |
| `goal` | `string` | Yes |
| `experienceLevel` | `string` | Yes |
| `activeProgramId` | `string` | No |

The server verifies `userId` exists in `auth.users` via `supabaseAdmin.auth.admin.getUserById()` before inserting. If the profile already exists (duplicate key `23505`), returns `200` silently.

**Response 200**

```json
{ "ok": true }
```

**Errors**

| Status | Cause |
|---|---|
| `400` | Missing required fields |
| `401` | `userId` not found in auth.users |
| `405` | Non-POST request |
| `500` | Supabase insert failure |

---

## GET /api/export-data

Returns a JSON download containing all of the authenticated user's data. GDPR Article 20 (data portability).

**Request**

```http
GET /api/export-data
Authorization: Bearer <supabase-access-token>
```

**Response 200**

```http
Content-Type: application/json
Content-Disposition: attachment; filename="omnexus-data-2026-02-25.json"
```

```json
{
  "exportedAt": "2026-02-25T12:00:00.000Z",
  "profile": { ... },
  "workoutSessions": [ ... ],
  "personalRecords": [ ... ],
  "learningProgress": { ... },
  "customPrograms": [ ... ]
}
```

**Errors**

| Status | Cause |
|---|---|
| `401` | Missing/invalid Bearer token |
| `405` | Non-GET request |
| `500` | Supabase fetch failure |

---

## DELETE /api/delete-account

Permanently deletes the authenticated user's account and all associated data. GDPR Article 17 (right to erasure).

**Deletion order** (respects foreign-key constraints):
1. `challenge_participants`
2. `friendships` (both `requester_id` and `addressee_id`)
3. `personal_records`
4. `workout_sessions`
5. `learning_progress`
6. `custom_programs`
7. `challenges` (created by user)
8. `profiles`
9. `auth.users` via `supabaseAdmin.auth.admin.deleteUser()`

**Request**

```http
DELETE /api/delete-account
Authorization: Bearer <supabase-access-token>
```

**Response 200**

```json
{ "ok": true }
```

After receiving `200`, the client calls `localStorage.clear()` then `supabase.auth.signOut()` and redirects to `/login`.

**Errors**

| Status | Cause |
|---|---|
| `401` | Missing/invalid Bearer token |
| `405` | Non-DELETE request |
| `500` | Supabase delete failure |

---

## Shared AI System Prompt

Both `/api/ask` and `/api/insights` use this persona:

```
You are Omnexus AI, a health and fitness education assistant.

ALWAYS:
- Root answers in peer-reviewed research and established guidelines (ACSM, WHO, NIH, ISSN)
- Cite sources inline: [Author et al., Year — Journal]
- Explain the "why" behind recommendations
- Acknowledge uncertainty or conflicting evidence
- Use accessible, plain language

NEVER:
- Diagnose, prescribe, or treat medical conditions
- Recommend extreme diets, dangerous training, or harmful practices
- Make guarantees about personal outcomes
- Replace qualified healthcare professionals
```

Every response ends with:
> ⚠️ This is educational information only, not medical advice. Consult a qualified healthcare professional for personal health concerns.

---

## Client-Side Services

| File | Calls | Responsibility |
|---|---|---|
| [`src/services/claudeService.ts`](../src/services/claudeService.ts) | `/api/ask`, `/api/insights` | Typed `fetch()` wrappers |
| [`src/services/insightsService.ts`](../src/services/insightsService.ts) | — | Builds `workoutSummary` string from `WorkoutSession[]` |
| [`src/services/pubmedService.ts`](../src/services/pubmedService.ts) | `/api/articles` | Calls API + manages 6 h localStorage cache |
| [`src/lib/db.ts`](../src/lib/db.ts) | Supabase directly | All typed Supabase table operations |
