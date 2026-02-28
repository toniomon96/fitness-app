import type { VercelResponse } from '@vercel/node';

/**
 * Shared CORS helper.
 *
 * Set ALLOWED_ORIGIN in Vercel env to your frontend URL (e.g. https://your-app.vercel.app).
 * Leave unset in development/preview and the wildcard fallback is used.
 *
 * Mutation endpoints should pass ALLOWED_ORIGIN; read-only endpoints can omit it.
 */
export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? '*';

export function setCorsHeaders(res: VercelResponse, origin = '*'): void {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}
