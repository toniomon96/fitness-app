/**
 * One-time migration: copies existing localStorage data into Supabase.
 * Runs on the first login after Phase 3 is deployed. Idempotent — safe to retry.
 */

import {
  upsertCustomProgram,
  upsertLearningProgress,
  upsertPersonalRecords,
  upsertSession,
} from './dbHydration';
import {
  clearGuestProfile,
  getExperienceMode,
  getHistory,
  getLearningProgress,
  getCustomPrograms,
  getGuestProfile,
  getWeightUnit,
  setExperienceMode,
  type ExperienceMode,
} from '../utils/localStorage';
import type { WeightUnit } from '../types';

const MIGRATION_KEY = 'omnexus_migrated_v1';
const GUEST_MIGRATION_STATUS_KEY = 'omnexus_guest_migration_status_v1';
const GUEST_MIGRATION_DISMISS_KEY = 'omnexus_guest_migration_dismissed_v1';

interface GuestMigrationStatusEntry {
  completedAt: string;
  guestId: string;
}

type GuestMigrationStatusMap = Record<string, GuestMigrationStatusEntry>;
type GuestMigrationDismissMap = Record<string, string>;

export interface GuestMigrationSummary {
  guestId: string;
  sessionCount: number;
  personalRecordCount: number;
  learningItemCount: number;
  customProgramCount: number;
  weightUnit: WeightUnit;
  experienceMode: ExperienceMode;
}

function readJsonMap<T>(key: string): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : {} as T;
  } catch {
    return {} as T;
  }
}

function writeJsonMap(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function getGuestMigrationStatusMap(): GuestMigrationStatusMap {
  return readJsonMap<GuestMigrationStatusMap>(GUEST_MIGRATION_STATUS_KEY);
}

function setGuestMigrationStatusMap(map: GuestMigrationStatusMap): void {
  writeJsonMap(GUEST_MIGRATION_STATUS_KEY, map);
}

function getGuestMigrationDismissMap(): GuestMigrationDismissMap {
  return readJsonMap<GuestMigrationDismissMap>(GUEST_MIGRATION_DISMISS_KEY);
}

function setGuestMigrationDismissMap(map: GuestMigrationDismissMap): void {
  writeJsonMap(GUEST_MIGRATION_DISMISS_KEY, map);
}

export function getGuestMigrationSummary(userId: string): GuestMigrationSummary | null {
  const guestProfile = getGuestProfile();
  if (!guestProfile?.isGuest) return null;

  const completed = getGuestMigrationStatusMap()[userId];
  if (completed?.guestId === guestProfile.id) return null;

  const history = getHistory();
  const learningProgress = getLearningProgress();
  const customPrograms = getCustomPrograms();
  const learningItemCount =
    learningProgress.completedLessons.length
    + learningProgress.completedModules.length
    + learningProgress.completedCourses.length;

  const summary: GuestMigrationSummary = {
    guestId: guestProfile.id,
    sessionCount: history.sessions.length,
    personalRecordCount: history.personalRecords.length,
    learningItemCount,
    customProgramCount: customPrograms.length,
    weightUnit: getWeightUnit(),
    experienceMode: getExperienceMode(guestProfile.id),
  };

  const hasMeaningfulData =
    summary.sessionCount > 0
    || summary.personalRecordCount > 0
    || summary.learningItemCount > 0
    || summary.customProgramCount > 0;

  return hasMeaningfulData ? summary : null;
}

export function isGuestMigrationDismissed(userId: string): boolean {
  return Boolean(getGuestMigrationDismissMap()[userId]);
}

export function dismissGuestMigrationPrompt(userId: string): void {
  const dismissMap = getGuestMigrationDismissMap();
  dismissMap[userId] = new Date().toISOString();
  setGuestMigrationDismissMap(dismissMap);
}

export function clearGuestMigrationDismissal(userId: string): void {
  const dismissMap = getGuestMigrationDismissMap();
  delete dismissMap[userId];
  setGuestMigrationDismissMap(dismissMap);
}

async function persistGuestPreferences(userId: string, summary: GuestMigrationSummary): Promise<void> {
  setExperienceMode(userId, summary.experienceMode);

  try {
    const { supabase } = await import('./supabase');
    await supabase.auth.updateUser({ data: { weight_unit: summary.weightUnit } });
  } catch {
    // Non-fatal. The local unit preference remains intact.
  }
}

export async function importGuestDataToAccount(userId: string): Promise<GuestMigrationSummary | null> {
  const summary = getGuestMigrationSummary(userId);
  if (!summary) return null;

  const history = getHistory();
  const learningProgress = getLearningProgress();
  const customPrograms = getCustomPrograms();

  const hasLearning =
    learningProgress.completedLessons.length > 0
    || learningProgress.completedModules.length > 0
    || learningProgress.completedCourses.length > 0;

  await Promise.all([
    summary.sessionCount > 0
      ? Promise.all(history.sessions.map((session) => upsertSession(session, userId)))
      : Promise.resolve(),
    summary.personalRecordCount > 0
      ? upsertPersonalRecords(history.personalRecords, userId)
      : Promise.resolve(),
    hasLearning
      ? upsertLearningProgress(learningProgress, userId)
      : Promise.resolve(),
    summary.customProgramCount > 0
      ? Promise.all(customPrograms.map((program) => upsertCustomProgram(program, userId)))
      : Promise.resolve(),
    persistGuestPreferences(userId, summary),
  ]);

  const statusMap = getGuestMigrationStatusMap();
  statusMap[userId] = {
    completedAt: new Date().toISOString(),
    guestId: summary.guestId,
  };
  setGuestMigrationStatusMap(statusMap);
  clearGuestMigrationDismissal(userId);
  clearGuestProfile();
  return summary;
}

export async function runMigrationIfNeeded(userId: string): Promise<void> {
  if (getGuestMigrationSummary(userId)) return;
  if (localStorage.getItem(MIGRATION_KEY)) return;

  const history = getHistory();
  const learningProgress = getLearningProgress();
  const customPrograms = getCustomPrograms();

  const hasSessions = history.sessions.length > 0;
  const hasPRs = history.personalRecords.length > 0;
  const hasLearning =
    learningProgress.completedLessons.length > 0 ||
    learningProgress.completedModules.length > 0 ||
    learningProgress.completedCourses.length > 0;
  const hasCustomPrograms = customPrograms.length > 0;

  if (!hasSessions && !hasPRs && !hasLearning && !hasCustomPrograms) {
    localStorage.setItem(MIGRATION_KEY, 'true');
    return;
  }

  try {
    await Promise.all([
      hasSessions &&
        Promise.all(history.sessions.map((s) => upsertSession(s, userId))),
      hasPRs && upsertPersonalRecords(history.personalRecords, userId),
      hasLearning && upsertLearningProgress(learningProgress, userId),
      hasCustomPrograms &&
        Promise.all(
          customPrograms.map((p) => upsertCustomProgram(p, userId)),
        ),
    ]);

    localStorage.setItem(MIGRATION_KEY, 'true');
  } catch (err) {
    console.error('[dataMigration] Migration failed — will retry next login:', err);
  }
}
