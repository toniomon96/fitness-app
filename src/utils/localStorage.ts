import type {
  User,
  WorkoutHistory,
  WorkoutSession,
  PersonalRecord,
  LearningProgress,
  InsightSession,
  ArticleCache,
  Program,
} from '../types';

const KEYS = {
  // Legacy fitness tracking keys (unchanged — preserve existing data)
  USER: 'fit_user',
  HISTORY: 'fit_history',
  ACTIVE_SESSION: 'fit_active_session',
  THEME: 'fit_theme',
  PROGRAM_WEEK_CURSOR: 'fit_program_week_cursor',
  PROGRAM_DAY_CURSOR: 'fit_program_day_cursor',
  // Omnexus platform keys
  LEARNING_PROGRESS: 'omnexus_learning_progress',
  INSIGHT_SESSIONS: 'omnexus_insight_sessions',
  ARTICLE_CACHE: 'omnexus_article_cache',
  CUSTOM_PROGRAMS: 'omnexus_custom_programs',
  GUEST_PROFILE: 'omnexus_guest',
} as const;

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`localStorage write failed for key: ${key}`);
  }
}

// ─── User ─────────────────────────────────────────────────────────────────────

export function getUser(): User | null {
  return safeRead<User | null>(KEYS.USER, null);
}

export function setUser(user: User): void {
  safeWrite(KEYS.USER, user);
}

export function clearUser(): void {
  localStorage.removeItem(KEYS.USER);
}

// ─── History ──────────────────────────────────────────────────────────────────

const EMPTY_HISTORY: WorkoutHistory = { sessions: [], personalRecords: [] };

export function getHistory(): WorkoutHistory {
  return safeRead<WorkoutHistory>(KEYS.HISTORY, EMPTY_HISTORY);
}

export function appendSession(session: WorkoutSession): void {
  const history = getHistory();
  history.sessions.push(session);
  safeWrite(KEYS.HISTORY, history);
}

export function updatePersonalRecords(prs: PersonalRecord[]): void {
  const history = getHistory();
  // Merge: for each PR, replace existing record for that exercise if new one is better
  for (const pr of prs) {
    const idx = history.personalRecords.findIndex(
      (r) => r.exerciseId === pr.exerciseId,
    );
    if (idx >= 0) {
      history.personalRecords[idx] = pr;
    } else {
      history.personalRecords.push(pr);
    }
  }
  safeWrite(KEYS.HISTORY, history);
}

// ─── Active Session ───────────────────────────────────────────────────────────

export function getActiveSession(): WorkoutSession | null {
  return safeRead<WorkoutSession | null>(KEYS.ACTIVE_SESSION, null);
}

export function setActiveSession(session: WorkoutSession): void {
  safeWrite(KEYS.ACTIVE_SESSION, session);
}

export function clearActiveSession(): void {
  localStorage.removeItem(KEYS.ACTIVE_SESSION);
}

// ─── Theme ────────────────────────────────────────────────────────────────────

export function getTheme(): 'dark' | 'light' {
  const stored = safeRead<'dark' | 'light' | null>(KEYS.THEME, null);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function setTheme(theme: 'dark' | 'light'): void {
  safeWrite(KEYS.THEME, theme);
}

// ─── Program Cursors ──────────────────────────────────────────────────────────

export function getProgramWeekCursor(programId: string): number {
  const cursors = safeRead<Record<string, number>>(
    KEYS.PROGRAM_WEEK_CURSOR,
    {},
  );
  return cursors[programId] ?? 1;
}

export function setProgramWeekCursor(programId: string, week: number): void {
  const cursors = safeRead<Record<string, number>>(
    KEYS.PROGRAM_WEEK_CURSOR,
    {},
  );
  cursors[programId] = week;
  safeWrite(KEYS.PROGRAM_WEEK_CURSOR, cursors);
}

export function getProgramDayCursor(programId: string): number {
  const cursors = safeRead<Record<string, number>>(KEYS.PROGRAM_DAY_CURSOR, {});
  return cursors[programId] ?? 0;
}

export function setProgramDayCursor(programId: string, dayIdx: number): void {
  const cursors = safeRead<Record<string, number>>(KEYS.PROGRAM_DAY_CURSOR, {});
  cursors[programId] = dayIdx;
  safeWrite(KEYS.PROGRAM_DAY_CURSOR, cursors);
}

export function resetProgramCursors(programId: string): void {
  setProgramWeekCursor(programId, 1);
  setProgramDayCursor(programId, 0);
}

// ─── Learning Progress ────────────────────────────────────────────────────────

const EMPTY_LEARNING_PROGRESS: LearningProgress = {
  completedLessons: [],
  completedModules: [],
  completedCourses: [],
  quizScores: {},
  lastActivityAt: '',
};

export function getLearningProgress(): LearningProgress {
  return safeRead<LearningProgress>(KEYS.LEARNING_PROGRESS, EMPTY_LEARNING_PROGRESS);
}

export function setLearningProgress(progress: LearningProgress): void {
  safeWrite(KEYS.LEARNING_PROGRESS, progress);
}

// ─── Insight Sessions ─────────────────────────────────────────────────────────

export function getInsightSessions(): InsightSession[] {
  return safeRead<InsightSession[]>(KEYS.INSIGHT_SESSIONS, []);
}

export function appendInsightSession(session: InsightSession): void {
  const sessions = getInsightSessions();
  // Keep the 50 most recent sessions to avoid unbounded growth
  const trimmed = [session, ...sessions].slice(0, 50);
  safeWrite(KEYS.INSIGHT_SESSIONS, trimmed);
}

export function clearInsightSessions(): void {
  localStorage.removeItem(KEYS.INSIGHT_SESSIONS);
}

// ─── Article Cache ────────────────────────────────────────────────────────────

const EMPTY_ARTICLE_CACHE: ArticleCache = {
  articles: [],
  lastFetchedAt: {},
};

export function getArticleCache(): ArticleCache {
  return safeRead<ArticleCache>(KEYS.ARTICLE_CACHE, EMPTY_ARTICLE_CACHE);
}

export function setArticleCache(cache: ArticleCache): void {
  safeWrite(KEYS.ARTICLE_CACHE, cache);
}

// ─── Custom Programs ──────────────────────────────────────────────────────────

export function getCustomPrograms(): Program[] {
  return safeRead<Program[]>(KEYS.CUSTOM_PROGRAMS, []);
}

export function setCustomPrograms(programs: Program[]): void {
  safeWrite(KEYS.CUSTOM_PROGRAMS, programs);
}

export function saveCustomProgram(program: Program): void {
  const existing = getCustomPrograms();
  const idx = existing.findIndex((p) => p.id === program.id);
  if (idx >= 0) {
    existing[idx] = program;
  } else {
    existing.push(program);
  }
  safeWrite(KEYS.CUSTOM_PROGRAMS, existing);
}

export function deleteCustomProgram(id: string): void {
  const existing = getCustomPrograms().filter((p) => p.id !== id);
  safeWrite(KEYS.CUSTOM_PROGRAMS, existing);
}

// ─── Guest Profile ────────────────────────────────────────────────────────────

export function getGuestProfile(): User | null {
  return safeRead<User | null>(KEYS.GUEST_PROFILE, null);
}

export function setGuestProfile(profile: User): void {
  safeWrite(KEYS.GUEST_PROFILE, profile);
  // Also write to fit_user so existing code that reads the user sees it
  safeWrite(KEYS.USER, profile);
}

export function clearGuestProfile(): void {
  localStorage.removeItem(KEYS.GUEST_PROFILE);
}
