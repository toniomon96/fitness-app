/**
 * Base URL for all /api/* calls.
 *
 * On web builds this is '' (relative) so Vercel's routing handles it.
 * On native Capacitor builds set VITE_API_BASE_URL to the deployed Vercel
 * URL at build time (e.g. "https://your-app.vercel.app").
 *
 * Usage:
 *   import { apiBase } from '../lib/api';
 *   fetch(`${apiBase}/api/ask`, ...)
 */
export const apiBase: string = import.meta.env.VITE_API_BASE_URL ?? '';
