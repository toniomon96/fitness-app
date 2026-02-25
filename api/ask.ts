import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// ─── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Omnexus AI, a health and fitness education assistant. \
Your role is to provide clear, evidence-based answers to questions about training, \
nutrition, recovery, sleep, and performance.

GUIDELINES
- Base every answer on peer-reviewed research, established guidelines (ACSM, WHO, NIH, \
ISSN), or widely accepted expert consensus.
- Cite sources inline: [Author et al., Year — Journal Name]. Add a PubMed URL when known.
- Explain the mechanism — not just what to do, but why it works physiologically.
- Acknowledge uncertainty or conflicting evidence honestly.
- Use plain, accessible language. Avoid unnecessary jargon.
- Structure longer answers with bold headings and bullet points for readability.

HARD CONSTRAINTS
- NEVER diagnose, prescribe, or provide treatment for any medical condition.
- NEVER recommend extreme diets, unsafe training practices, or anything potentially harmful.
- NEVER make personal health predictions or outcome guarantees.
- If a question requires personal medical evaluation, direct the user to a qualified \
healthcare professional.

End EVERY response with this exact line:
⚠️ This is educational information only, not medical advice. Please consult a qualified healthcare professional for personal health concerns.`;

// ─── Handler ────────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[/api/ask] ANTHROPIC_API_KEY is not configured');
    return res.status(500).json({ error: 'AI service is not configured' });
  }

  const { question, userContext } = req.body ?? {};

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'question is required' });
  }
  if (question.length > 1000) {
    return res.status(400).json({ error: 'Question too long (max 1000 characters)' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Append user context as a lightweight annotation, not part of the question
    let userMessage = question.trim();
    if (userContext?.goal || userContext?.experienceLevel) {
      userMessage +=
        `\n\n[User context — Goal: ${userContext.goal ?? 'unspecified'}, ` +
        `Experience: ${userContext.experienceLevel ?? 'unspecified'}]`;
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const block = message.content[0];
    if (block.type !== 'text') throw new Error('Unexpected Claude response type');

    return res.status(200).json({ answer: block.text });
  } catch (err: unknown) {
    console.error('[/api/ask]', err);
    const msg = err instanceof Error ? err.message : 'Failed to generate response';
    return res.status(500).json({ error: msg });
  }
}
