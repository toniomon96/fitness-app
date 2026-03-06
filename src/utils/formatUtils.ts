/**
 * Converts a snake_case or kebab-case string into Title Case.
 * Examples:
 *   formatLabel("full_commercial_gym") → "Full Commercial Gym"
 *   formatLabel("home-gym")            → "Home Gym"
 *   formatLabel("Dumbbells Only")      → "Dumbbells Only"
 */
export function formatLabel(value: string): string {
  return value
    .replace(/[_-]/g, ' ')
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}
