// ─── Enums & Literals ────────────────────────────────────────────────────────

export type Goal = 'hypertrophy' | 'fat-loss' | 'general-fitness';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'core'
  | 'cardio';

export type ExerciseCategory = 'strength' | 'cardio' | 'mobility';

export type Equipment =
  | 'barbell'
  | 'dumbbell'
  | 'cable'
  | 'machine'
  | 'bodyweight'
  | 'kettlebell'
  | 'resistance-band'
  | 'cardio-machine';

export type DayType =
  | 'full-body'
  | 'upper'
  | 'lower'
  | 'push'
  | 'pull'
  | 'legs'
  | 'cardio'
  | 'rest';

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  goal: Goal;
  experienceLevel: ExperienceLevel;
  activeProgramId: string;
  onboardedAt: string;
  theme: 'dark' | 'light';
}

// ─── Exercise Library ─────────────────────────────────────────────────────────

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment[];
  instructions: string[];
  tips: string[];
}

// ─── Program Structure ────────────────────────────────────────────────────────

export interface SetScheme {
  sets: number;
  reps: string;
  restSeconds: number;
  rpe?: number;
}

export interface ProgramExercise {
  exerciseId: string;
  scheme: SetScheme;
  notes?: string;
  isOptional?: boolean;
}

export interface TrainingDay {
  label: string;
  type: DayType;
  exercises: ProgramExercise[];
}

export interface Program {
  id: string;
  name: string;
  goal: Goal;
  experienceLevel: ExperienceLevel;
  description: string;
  daysPerWeek: number;
  estimatedDurationWeeks: number;
  schedule: TrainingDay[];
  tags: string[];
  isCustom?: boolean;
  createdAt?: string;
}

// ─── Active Workout Session ───────────────────────────────────────────────────

export interface LoggedSet {
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
  isPersonalRecord?: boolean;
  rpe?: number;
  timestamp: string;
}

export interface LoggedExercise {
  exerciseId: string;
  sets: LoggedSet[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  programId: string;
  trainingDayIndex: number;
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  exercises: LoggedExercise[];
  totalVolumeKg: number;
  notes?: string;
}

// ─── History & Analytics ──────────────────────────────────────────────────────

export interface PersonalRecord {
  exerciseId: string;
  weight: number;
  reps: number;
  achievedAt: string;
  sessionId: string;
}

export interface WorkoutHistory {
  sessions: WorkoutSession[];
  personalRecords: PersonalRecord[];
}

// ─── Learning System ──────────────────────────────────────────────────────────

export type LearningCategory =
  | 'strength-training'
  | 'nutrition'
  | 'recovery'
  | 'sleep'
  | 'metabolic-health'
  | 'cardio'
  | 'mobility';

export interface ContentReference {
  title: string;
  authors?: string;
  journal?: string;
  year?: number;
  url?: string;
  type: 'journal' | 'guideline' | 'book' | 'organization' | 'meta-analysis';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown prose
  keyPoints: string[];
  references: ContentReference[];
  estimatedMinutes: number;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: LearningCategory;
  difficulty: ExperienceLevel;
  estimatedMinutes: number;
  relatedGoals: Goal[];
  tags: string[];
  modules: CourseModule[];
  coverEmoji: string;
}

// ─── Learning Progress ────────────────────────────────────────────────────────

export interface QuizAttempt {
  score: number;         // 0–100
  correctCount: number;
  totalQuestions: number;
  attemptedAt: string;
}

export interface LearningProgress {
  completedLessons: string[];   // lesson IDs
  completedModules: string[];   // module IDs
  completedCourses: string[];   // course IDs
  quizScores: Record<string, QuizAttempt>; // moduleId → best attempt
  lastActivityAt: string;
}

// ─── AI Insights & Q&A ────────────────────────────────────────────────────────

export type InsightCategory =
  | 'workout-analysis'
  | 'nutrition'
  | 'recovery'
  | 'general-health'
  | 'ask-anything';

export interface InsightMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  references?: ContentReference[];
  timestamp: string;
}

export interface InsightSession {
  id: string;
  category: InsightCategory;
  messages: InsightMessage[];
  createdAt: string;
}

// ─── Health Articles ──────────────────────────────────────────────────────────

export interface HealthArticle {
  id: string;
  title: string;
  summary: string;
  keyTakeaways: string[];
  source: string;
  sourceUrl: string;
  publishedDate: string;
  category: LearningCategory;
  tags: string[];
  cachedAt: string;
}

export interface ArticleCache {
  articles: HealthArticle[];
  lastFetchedAt: Partial<Record<LearningCategory, string>>;
}

// ─── Community ────────────────────────────────────────────────────────────────

export interface FriendProfile {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface FriendshipWithProfile {
  id: string;
  status: 'pending' | 'accepted' | 'blocked';
  direction: 'sent' | 'received';
  friend: FriendProfile;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  weeklyVolumeKg: number;
  isCurrentUser: boolean;
}

export interface Challenge {
  id: string;
  createdBy: string;
  name: string;
  description: string | null;
  type: 'volume' | 'streak' | 'sessions';
  targetValue: number | null;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  participantCount: number;
  userProgress: number | null;
  isJoined: boolean;
}

export interface FeedSession {
  sessionId: string;
  userId: string;
  userName: string;
  programId: string;
  startedAt: string;
  completedAt?: string;
  totalVolumeKg: number;
  durationSeconds?: number;
}
