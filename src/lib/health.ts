/**
 * Health data wrapper for Omnexus.
 *
 * Uses the @capacitor-community/health plugin when running natively.
 * All functions are no-ops on web and return null / empty data safely.
 *
 * SETUP (one-time):
 *   npm install @capacitor-community/health
 *   npx cap sync
 *   iOS: add NSHealthShareUsageDescription to Info.plist + HealthKit capability in Xcode
 *   Android: add <uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
 *            and configure Health Connect in the manifest
 *
 * The bridge is accessed at runtime via window.Capacitor.Plugins.Health so
 * this file compiles fine even before the npm package is installed.
 */

import { isNative } from './capacitor';

export interface HealthSample {
  value: number;
  startDate: string;
  endDate: string;
}

export interface HealthSummary {
  stepsToday: number | null;
  activeCaloriesToday: number | null;
  stepsLast7Days: HealthSample[];  // one entry per day
  isAvailable: boolean;
}

// ─── Internal helpers ──────────────────────────────────────────────────────────

function getPlugin(): Record<string, unknown> | null {
  if (!isNative) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plugin = (window as any)?.Capacitor?.Plugins?.Health;
    return plugin ?? null;
  } catch {
    return null;
  }
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Request permission to read health data.
 * On web: no-op, returns false.
 * On native: prompts the OS permission dialog; returns true if granted.
 */
export async function requestHealthPermission(): Promise<boolean> {
  const plugin = getPlugin();
  if (!plugin) return false;
  try {
    await (plugin.requestAuthorization as (opts: unknown) => Promise<void>)({
      read: ['steps', 'calories.active'],
      write: [],
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Query the total step count for a single day.
 * Returns null on web or if permission is denied.
 */
async function queryDayTotal(
  plugin: Record<string, unknown>,
  dataType: string,
  date: Date,
): Promise<number | null> {
  try {
    const start = startOfDay(date);
    const end = addDays(start, 1);
    const result = await (plugin.query as (opts: unknown) => Promise<{ data: HealthSample[] }>)({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      dataType,
      limit: 1000,
      ascending: false,
    });
    const samples: HealthSample[] = result?.data ?? [];
    return samples.reduce((sum, s) => sum + (s.value ?? 0), 0);
  } catch {
    return null;
  }
}

/**
 * Read today's steps, active calories, and the last 7 days of daily step totals.
 * Returns an object with null values on web or if the plugin is unavailable.
 */
export async function readHealthSummary(): Promise<HealthSummary> {
  const plugin = getPlugin();
  if (!plugin) {
    return { stepsToday: null, activeCaloriesToday: null, stepsLast7Days: [], isAvailable: false };
  }

  const today = new Date();
  const [stepsToday, activeCaloriesToday] = await Promise.all([
    queryDayTotal(plugin, 'steps', today),
    queryDayTotal(plugin, 'calories.active', today),
  ]);

  const stepsLast7Days: HealthSample[] = [];
  for (let i = 6; i >= 0; i--) {
    const day = addDays(today, -i);
    const total = await queryDayTotal(plugin, 'steps', day);
    stepsLast7Days.push({
      value: total ?? 0,
      startDate: startOfDay(day).toISOString(),
      endDate: addDays(startOfDay(day), 1).toISOString(),
    });
  }

  return {
    stepsToday,
    activeCaloriesToday,
    stepsLast7Days,
    isAvailable: true,
  };
}
