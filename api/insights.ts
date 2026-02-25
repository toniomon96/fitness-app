import Anthropic from '@anthropic-ai/sdk';

// ─── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Omnexus AI, analyzing a user's workout training data to \
provide personalized, evidence-based insights.

You will receive the user's fitness goal, experience level, and a plain-text summary of \
their recent workout sessions.

RESPONSE FORMAT — use these exact section headers:

**Training Overview**
[2–3 sentence summary of what you observe. Be specific and encouraging.]

**Observations**
- [Specific observation about training volume, frequency, consistency, or pattern]
- [Another observation]
- [Third observation if relevant]

**Recommendations**
1. [Actionable recommendation with a brief evidence-based rationale]
2. [Actionable recommendation with a brief evidence-based rationale]
3. [Third recommendation if relevant]

GUIDELINES
- Base observations ONLY on the data provided. Do not invent or assume details.
- Reference evidence-based principles naturally (progressive overload, recovery frequency, \
protein timing, etc.) where relevant.
- Keep recommendations realistic, gradual, and appropriate for the stated experience level.
- Be encouraging and constructive throughout.

HARD CONSTRAINTS
- NEVER recommend extreme practices, crash dieting, or anything potentially harmful.
- NEVER invent workout data or fabricate patterns not present in the summary.

End with:
⚠️ These insights are educational only, not medical advice. Consult a healthcare professional for personal health concerns.`;

// ─── Handler ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userGoal, userExperience, workoutSummary } = req.body ?? {};

  if (!workoutSummary || typeof workoutSummary !== 'string') {
    return res.status(400).json({ error: 'workoutSummary is required' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const userMessage = [
      `User goal: ${userGoal ?? 'general fitness'}`,
      `Experience level: ${userExperience ?? 'beginner'}`,
      '',
      'Workout data:',
      workoutSummary,
    ].join('\n');

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const block = message.content[0];
    if (block.type !== 'text') throw new Error('Unexpected Claude response type');

    return res.status(200).json({ insight: block.text });
  } catch (err: unknown) {
    console.error('[/api/insights]', err);
    const msg = err instanceof Error ? err.message : 'Failed to generate insights';
    return res.status(500).json({ error: msg });
  }
}
