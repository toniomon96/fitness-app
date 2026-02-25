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
}

// ─── Active Workout Session ───────────────────────────────────────────────────

export interface LoggedSet {
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
  isPersonalRecord?: boolean;
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
