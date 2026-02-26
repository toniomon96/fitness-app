import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify Bearer token
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  const {
    data: { user },
    error: authError,
  } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const userId = user.id;

  try {
    // Delete all user data in dependency order (children first)
    await Promise.all([
      supabaseAdmin.from('challenge_participants').delete().eq('user_id', userId),
      supabaseAdmin
        .from('friendships')
        .delete()
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`),
      supabaseAdmin.from('personal_records').delete().eq('user_id', userId),
      supabaseAdmin.from('workout_sessions').delete().eq('user_id', userId),
      supabaseAdmin.from('learning_progress').delete().eq('user_id', userId),
      supabaseAdmin.from('custom_programs').delete().eq('user_id', userId),
    ]);

    // Challenges created by the user — remove their ownership (or delete if desired)
    await supabaseAdmin.from('challenges').delete().eq('created_by', userId);

    // Delete the profile row
    await supabaseAdmin.from('profiles').delete().eq('id', userId);

    // Delete the auth user — this removes the account from auth.users
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deleteError) {
      console.error('[/api/delete-account] Failed to delete auth user:', deleteError);
      return res.status(500).json({ error: 'Failed to delete account' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[/api/delete-account]', err);
    return res.status(500).json({ error: 'Failed to delete account' });
  }
}
