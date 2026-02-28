export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function toDateString(iso: string): string {
  return iso.slice(0, 10); // YYYY-MM-DD
}

export function today(): string {
  return toDateString(new Date().toISOString());
}

export function calculateStreak(sessionDates: string[]): number {
  if (sessionDates.length === 0) return 0;
  const unique = [
    ...new Set(sessionDates.map((d) => toDateString(d))),
  ].sort().reverse();

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const dateStr of unique) {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    const diffDays = Math.floor(
      (cursor.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays === 0 || diffDays === 1) {
      streak++;
      cursor = d;
    } else {
      break;
    }
  }
  return streak;
}

export function getWeekStart(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Mon start
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}
