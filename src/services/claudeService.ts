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

import { supabase } from '../lib/supabase';

async function post<T>(path: string, body: unknown): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  const res = await fetch(path, {
    method: 'POST',
    headers,
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
