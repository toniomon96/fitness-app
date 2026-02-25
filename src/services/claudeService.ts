// ─── Request / Response types ─────────────────────────────────────────────────

export interface AskRequest {
  question: string;
  userContext?: {
    goal: string;
    experienceLevel: string;
  };
}

export interface AskResponse {
  answer: string;
}

export interface InsightRequest {
  userGoal: string;
  userExperience: string;
  workoutSummary: string;
}

export interface InsightResponse {
  insight: string;
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Request failed' })) as { error?: string };
    throw new Error(data.error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function askOmnexus(body: AskRequest): Promise<AskResponse> {
  return post<AskResponse>('/api/ask', body);
}

export function getWorkoutInsights(body: InsightRequest): Promise<InsightResponse> {
  return post<InsightResponse>('/api/insights', body);
}
