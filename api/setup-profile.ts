import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, name, goal, experienceLevel, activeProgramId } = req.body ?? {};

  if (!userId || !name || !goal || !experienceLevel) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Verify the userId actually exists in auth.users to prevent spoofing
  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.admin.getUserById(userId);

  if (userError || !user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const { error } = await supabaseAdmin.from('profiles').insert({
    id: userId,
    name,
    goal,
    experience_level: experienceLevel,
    active_program_id: activeProgramId ?? null,
  });

  if (error) {
    // If the profile already exists (duplicate key), treat as success
    if (error.code === '23505') {
      return res.status(200).json({ ok: true });
    }
    console.error('[/api/setup-profile]', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ ok: true });
}
