// ─── Request / Response types ─────────────────────────────────────────────────

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AskRequest {
  question: string;
  userContext?: {
    goal: string;
    experienceLevel: string;
  };
  conversationHistory?: ConversationMessage[];
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
import { apiBase } from '../lib/api';

async function post<T>(path: string, body: unknown): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  const res = await fetch(`${apiBase}${path}`, {
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

// ─── Pre-Workout Briefing ──────────────────────────────────────────────────────

export interface BriefingRequest {
  exerciseNames: string[];
  recentHistory: Array<{ name: string; recent: string[] }>;
  userContext: { goal: string; experienceLevel: string };
}

export interface BriefingResponse {
  briefing: string;
}

export function getPreWorkoutBriefing(body: BriefingRequest): Promise<BriefingResponse> {
  return post<BriefingResponse>('/api/briefing', body);
}

// ─── Meal Plan ────────────────────────────────────────────────────────────────

export interface MealPlanRequest {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  preferences?: string;
}

export interface MealPlanApiResponse {
  plan: import('../types').MealPlan;
}

export function getMealPlan(body: MealPlanRequest): Promise<MealPlanApiResponse> {
  return post<MealPlanApiResponse>('/api/meal-plan', body);
}
