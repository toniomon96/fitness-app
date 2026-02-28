import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// ─── CORS helper ─────────────────────────────────────────────────────────────

function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

// ─── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the Omnexus onboarding coach. Your job is to have a warm, \
conversational exchange to learn about a new user's training background and goals. \
Keep each reply concise — 2–4 sentences max. Ask one or two focused questions per turn.

YOU MUST COLLECT all of the following before completing onboarding:
1. Primary goal(s): muscle building (hypertrophy), fat loss, or general fitness
2. Training age: how many years they have been lifting consistently (0 = complete beginner)
3. Days per week available to train (1–7)
4. Typical session duration in minutes (e.g. 45, 60, 90)
5. Available equipment: e.g. full gym, home gym with dumbbells, bodyweight only, barbell, etc.
6. Any injuries or physical limitations (answer "none" is fine)

TONE: Friendly, encouraging, and professional. Use the user's first name occasionally.

QUICK-REPLY CHIPS: After your message you may optionally append a chips line in this exact format:
[CHIPS: option 1|option 2|option 3]
Use chips for fixed-choice questions (goals, days/week, equipment type). Do NOT use chips for open-ended questions.

COMPLETING ONBOARDING: Once you have collected all 6 data points, end your reply with:
[PROFILE_COMPLETE]
{"goals":["hypertrophy"],"trainingAgeYears":2,"daysPerWeek":4,"sessionDurationMinutes":60,"equipment":["barbell","dumbbell"],"injuries":[],"aiSummary":"..."}

The aiSummary field should be 1–2 sentences summarising the user's profile in an encouraging tone, e.g. "You're an intermediate lifter with 2 years of experience, training 4 days/week with a full barbell and dumbbell setup — perfect for a structured hypertrophy program."

Valid goal values: "hypertrophy", "fat-loss", "general-fitness" (use an array, user may have multiple).
The JSON block must be valid JSON on a single line immediately after [PROFILE_COMPLETE].`;

// ─── Type helpers ─────────────────────────────────────────────────────────────

type MessageParam = { role: 'user' | 'assistant'; content: string };

interface OnboardProfile {
  goals: string[];
  trainingAgeYears: number;
  daysPerWeek: number;
  sessionDurationMinutes: number;
  equipment: string[];
  injuries: string[];
  aiSummary: string;
}

function parseProfile(reply: string): OnboardProfile | null {
  const marker = '[PROFILE_COMPLETE]';
  const idx = reply.indexOf(marker);
  if (idx === -1) return null;

  const after = reply.slice(idx + marker.length).trim();
  // Extract the first {...} block
  const start = after.indexOf('{');
  const end = after.lastIndexOf('}');
  if (start === -1 || end === -1) return null;

  try {
    const parsed = JSON.parse(after.slice(start, end + 1)) as OnboardProfile;
    // Basic validation
    if (!Array.isArray(parsed.goals) || typeof parsed.daysPerWeek !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

// ─── Handler ────────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[/api/onboard] ANTHROPIC_API_KEY is not configured');
    return res.status(500).json({ error: 'AI service is not configured' });
  }

  const { messages, userName } = req.body ?? {};

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Cap conversation history to last 12 turns to keep tokens reasonable
  const history = (messages as MessageParam[]).slice(-12);

  // If this is the very first message (empty history), inject a greeting from the user
  // that kicks off the conversation context
  const conversationMessages: MessageParam[] = history.length === 0
    ? [{ role: 'user', content: `Hi, my name is ${userName ?? 'there'}.` }]
    : history;

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: conversationMessages,
    });

    const block = message.content[0];
    if (block.type !== 'text') throw new Error('Unexpected Claude response type');

    const reply = block.text;
    const profile = parseProfile(reply);

    // Strip the [PROFILE_COMPLETE] signal + JSON from the displayed reply
    const displayReply = profile
      ? reply.slice(0, reply.indexOf('[PROFILE_COMPLETE]')).trim()
      : reply;

    return res.status(200).json({
      reply: displayReply,
      profileComplete: !!profile,
      profile: profile ?? undefined,
    });
  } catch (err: unknown) {
    console.error('[/api/onboard]', err);
    const msg = err instanceof Error ? err.message : 'Failed to generate response';
    return res.status(500).json({ error: msg });
  }
}
