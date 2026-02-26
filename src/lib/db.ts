import { supabase } from './supabase';
import type {
  WorkoutSession,
  PersonalRecord,
  WorkoutHistory,
  FriendProfile,
  FriendshipWithProfile,
  LeaderboardEntry,
  Challenge,
  FeedSession,
  LearningProgress,
  Program,
  NutritionLog,
} from '../types';

// ─── Mappers ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSession(row: any): WorkoutSession {
  return {
    id: row.id,
    programId: row.program_id,
    trainingDayIndex: row.training_day_index,
    startedAt: row.started_at,
    completedAt: row.completed_at ?? undefined,
    durationSeconds: row.duration_seconds ?? undefined,
    exercises: row.exercises,
    totalVolumeKg: row.total_volume_kg,
    notes: row.notes ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPR(row: any): PersonalRecord {
  return {
    exerciseId: row.exercise_id,
    weight: row.weight,
    reps: row.reps,
    achievedAt: row.achieved_at,
    sessionId: row.session_id,
  };
}

// ─── Workout History ──────────────────────────────────────────────────────────

export async function fetchHistory(userId: string): Promise<WorkoutHistory> {
  const [sessionsResult, prsResult] = await Promise.all([
    supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: true }),
    supabase
      .from('personal_records')
      .select('*')
      .eq('user_id', userId),
  ]);

  return {
    sessions: (sessionsResult.data ?? []).map(mapSession),
    personalRecords: (prsResult.data ?? []).map(mapPR),
  };
}

export async function upsertSession(
  session: WorkoutSession,
  userId: string,
): Promise<void> {
  await supabase.from('workout_sessions').upsert({
    id: session.id,
    user_id: userId,
    program_id: session.programId,
    training_day_index: session.trainingDayIndex,
    started_at: session.startedAt,
    completed_at: session.completedAt,
    duration_seconds: session.durationSeconds,
    exercises: session.exercises,
    total_volume_kg: session.totalVolumeKg,
    notes: session.notes,
  });
}

export async function upsertPersonalRecords(
  prs: PersonalRecord[],
  userId: string,
): Promise<void> {
  if (prs.length === 0) return;
  await supabase.from('personal_records').upsert(
    prs.map((pr) => ({
      user_id: userId,
      exercise_id: pr.exerciseId,
      weight: pr.weight,
      reps: pr.reps,
      achieved_at: pr.achievedAt,
      session_id: pr.sessionId,
    })),
    { onConflict: 'user_id,exercise_id' },
  );
}

// ─── Learning Progress ────────────────────────────────────────────────────────

export async function fetchLearningProgress(
  userId: string,
): Promise<LearningProgress | null> {
  const { data } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!data) return null;
  return {
    completedLessons: data.completed_lessons ?? [],
    completedModules: data.completed_modules ?? [],
    completedCourses: data.completed_courses ?? [],
    quizScores: data.quiz_scores ?? {},
    lastActivityAt: data.last_activity_at ?? '',
  };
}

export async function upsertLearningProgress(
  progress: LearningProgress,
  userId: string,
): Promise<void> {
  await supabase.from('learning_progress').upsert({
    user_id: userId,
    completed_lessons: progress.completedLessons,
    completed_modules: progress.completedModules,
    completed_courses: progress.completedCourses,
    quiz_scores: progress.quizScores,
    last_activity_at: progress.lastActivityAt || new Date().toISOString(),
  });
}

// ─── Custom Programs ──────────────────────────────────────────────────────────

export async function fetchCustomPrograms(userId: string): Promise<Program[]> {
  const { data } = await supabase
    .from('custom_programs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => row.data as Program);
}

export async function upsertCustomProgram(
  program: Program,
  userId: string,
): Promise<void> {
  await supabase.from('custom_programs').upsert({
    id: program.id,
    user_id: userId,
    data: program,
  });
}

export async function deleteCustomProgramDb(id: string): Promise<void> {
  await supabase.from('custom_programs').delete().eq('id', id);
}

// ─── Community: Friendships ───────────────────────────────────────────────────

export async function searchProfiles(
  query: string,
  excludeId: string,
): Promise<FriendProfile[]> {
  if (!query.trim()) return [];
  const { data } = await supabase
    .from('profiles')
    .select('id, name, avatar_url')
    .ilike('name', `%${query.trim()}%`)
    .neq('id', excludeId)
    .eq('is_public', true)
    .limit(10);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((r: any) => ({
    id: r.id,
    name: r.name,
    avatarUrl: r.avatar_url ?? null,
  }));
}

export async function getFriendships(
  userId: string,
): Promise<FriendshipWithProfile[]> {
  const { data } = await supabase
    .from('friendships')
    .select('id, status, requester_id, addressee_id')
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
    .neq('status', 'blocked');

  if (!data || data.length === 0) return [];

  // Collect all unique peer IDs to fetch their profiles in one query
  const peerIds = data.map((row) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row as any).requester_id === userId
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row as any).addressee_id
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row as any).requester_id,
  );

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, avatar_url')
    .in('id', peerIds);

  const profileMap = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (profiles ?? []).map((p: any) => [p.id, p]),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((row: any) => {
    const isRequester = row.requester_id === userId;
    const friendId = isRequester ? row.addressee_id : row.requester_id;
    const profile = profileMap[friendId] ?? { id: friendId, name: 'Unknown', avatar_url: null };
    return {
      id: row.id,
      status: row.status as 'pending' | 'accepted' | 'blocked',
      direction: isRequester ? ('sent' as const) : ('received' as const),
      friend: { id: profile.id, name: profile.name, avatarUrl: profile.avatar_url ?? null },
    };
  });
}

export async function sendFriendRequest(
  requesterId: string,
  addresseeId: string,
): Promise<void> {
  await supabase
    .from('friendships')
    .insert({ requester_id: requesterId, addressee_id: addresseeId });
}

export async function respondFriendRequest(
  id: string,
  status: 'accepted' | 'blocked',
): Promise<void> {
  await supabase.from('friendships').update({ status }).eq('id', id);
}

export async function removeFriendship(id: string): Promise<void> {
  await supabase.from('friendships').delete().eq('id', id);
}

// ─── Community: Leaderboard ───────────────────────────────────────────────────

export async function getWeeklyLeaderboard(
  userId: string,
): Promise<LeaderboardEntry[]> {
  const { data: friendships } = await supabase
    .from('friendships')
    .select('requester_id, addressee_id')
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
    .eq('status', 'accepted');

  const friendIds = (friendships ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (f: any) => (f.requester_id === userId ? f.addressee_id : f.requester_id),
  );
  const allIds = [userId, ...friendIds];

  // Monday of current week
  const now = new Date();
  const day = now.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() + diff);
  weekStart.setHours(0, 0, 0, 0);

  const [sessionsResult, profilesResult] = await Promise.all([
    supabase
      .from('workout_sessions')
      .select('user_id, total_volume_kg')
      .in('user_id', allIds)
      .gte('started_at', weekStart.toISOString())
      .not('completed_at', 'is', null),
    supabase.from('profiles').select('id, name').in('id', allIds),
  ]);

  const volumeMap: Record<string, number> = {};
  for (const s of sessionsResult.data ?? []) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row = s as any;
    volumeMap[row.user_id] = (volumeMap[row.user_id] ?? 0) + (row.total_volume_kg ?? 0);
  }

  return (profilesResult.data ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((p: any) => ({
      userId: p.id,
      name: p.name,
      weeklyVolumeKg: Math.round(volumeMap[p.id] ?? 0),
      isCurrentUser: p.id === userId,
    }))
    .sort((a, b) => b.weeklyVolumeKg - a.weeklyVolumeKg);
}

// ─── Community: Challenges ────────────────────────────────────────────────────

export async function getChallenges(userId: string): Promise<Challenge[]> {
  const { data } = await supabase
    .from('challenges')
    .select('*, challenge_participants(*)')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(30);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((c: any) => {
    const parts = c.challenge_participants ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userPart = parts.find((p: any) => p.user_id === userId);
    return {
      id: c.id,
      createdBy: c.created_by,
      name: c.name,
      description: c.description ?? null,
      type: c.type as Challenge['type'],
      targetValue: c.target_value ?? null,
      startDate: c.start_date,
      endDate: c.end_date,
      isPublic: c.is_public,
      participantCount: parts.length,
      userProgress: userPart?.progress ?? null,
      isJoined: !!userPart,
    };
  });
}

export async function joinChallenge(
  challengeId: string,
  userId: string,
): Promise<void> {
  await supabase
    .from('challenge_participants')
    .insert({ challenge_id: challengeId, user_id: userId });
}

export async function createChallenge(
  input: {
    name: string;
    description?: string;
    type: Challenge['type'];
    targetValue?: number;
    startDate: string;
    endDate: string;
  },
  userId: string,
): Promise<string> {
  const { data } = await supabase
    .from('challenges')
    .insert({
      created_by: userId,
      name: input.name,
      description: input.description ?? null,
      type: input.type,
      target_value: input.targetValue ?? null,
      start_date: input.startDate,
      end_date: input.endDate,
      is_public: true,
    })
    .select('id')
    .single();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any).id as string;
}

// ─── Nutrition ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapNutritionLog(row: any): NutritionLog {
  return {
    id: row.id,
    userId: row.user_id,
    loggedAt: row.logged_at,
    mealName: row.meal_name ?? undefined,
    calories: row.calories ?? undefined,
    proteinG: row.protein_g ?? undefined,
    carbsG: row.carbs_g ?? undefined,
    fatG: row.fat_g ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
  };
}

export async function fetchNutritionLogs(
  userId: string,
  date: string,
): Promise<NutritionLog[]> {
  const { data } = await supabase
    .from('nutrition_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('logged_at', date)
    .order('created_at', { ascending: true });
  return (data ?? []).map(mapNutritionLog);
}

export async function addNutritionLog(
  log: Omit<NutritionLog, 'id' | 'createdAt'>,
): Promise<NutritionLog | null> {
  const { data } = await supabase
    .from('nutrition_logs')
    .insert({
      user_id: log.userId,
      logged_at: log.loggedAt,
      meal_name: log.mealName ?? null,
      calories: log.calories ?? null,
      protein_g: log.proteinG ?? null,
      carbs_g: log.carbsG ?? null,
      fat_g: log.fatG ?? null,
      notes: log.notes ?? null,
    })
    .select('*')
    .single();
  return data ? mapNutritionLog(data) : null;
}

export async function deleteNutritionLog(id: string): Promise<void> {
  await supabase.from('nutrition_logs').delete().eq('id', id);
}

// ─── Community: Activity Feed ─────────────────────────────────────────────────

export async function getFriendFeed(userId: string): Promise<FeedSession[]> {
  const { data: friendships } = await supabase
    .from('friendships')
    .select('requester_id, addressee_id')
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
    .eq('status', 'accepted');

  const friendIds = (friendships ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (f: any) => (f.requester_id === userId ? f.addressee_id : f.requester_id),
  );

  if (friendIds.length === 0) return [];

  const [sessionsResult, profilesResult] = await Promise.all([
    supabase
      .from('workout_sessions')
      .select('id, user_id, program_id, started_at, completed_at, total_volume_kg, duration_seconds')
      .in('user_id', friendIds)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(30),
    supabase.from('profiles').select('id, name').in('id', friendIds),
  ]);

  const nameMap = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (profilesResult.data ?? []).map((p: any) => [p.id, p.name]),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (sessionsResult.data ?? []).map((s: any) => ({
    sessionId: s.id,
    userId: s.user_id,
    userName: nameMap[s.user_id] ?? 'Unknown',
    programId: s.program_id,
    startedAt: s.started_at,
    completedAt: s.completed_at ?? undefined,
    totalVolumeKg: s.total_volume_kg ?? 0,
    durationSeconds: s.duration_seconds ?? undefined,
  }));
}
