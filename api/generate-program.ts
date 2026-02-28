import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// ─── CORS helper ─────────────────────────────────────────────────────────────

function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

// ─── Exercise ID catalogue (mirrors src/data/exercises.ts) ───────────────────

const EXERCISE_IDS = [
  'barbell-bench-press', 'dumbbell-bench-press', 'incline-dumbbell-press',
  'cable-chest-fly', 'push-up',
  'barbell-row', 'dumbbell-row', 'lat-pulldown', 'pull-up', 'seated-cable-row', 'face-pull',
  'overhead-press', 'dumbbell-lateral-raise', 'dumbbell-shoulder-press',
  'barbell-curl', 'hammer-curl', 'tricep-pushdown', 'skull-crusher', 'overhead-tricep-extension',
  'barbell-back-squat', 'goblet-squat', 'leg-press', 'leg-extension', 'walking-lunge', 'bulgarian-split-squat',
  'romanian-deadlift', 'deadlift', 'hip-thrust', 'glute-bridge', 'leg-curl',
  'standing-calf-raise', 'plank', 'hanging-leg-raise', 'ab-wheel-rollout',
  'kettlebell-swing', 'box-jump', 'mountain-climbers',
];

const VALID_IDS = new Set(EXERCISE_IDS);

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserTrainingProfile {
  goals: string[];
  trainingAgeYears: number;
  daysPerWeek: number;
  sessionDurationMinutes: number;
  equipment: string[];
  injuries: string[];
  aiSummary: string;
}

interface SetScheme {
  sets: number;
  reps: string;
  restSeconds: number;
  rpe?: number;
}

interface ProgramExercise {
  exerciseId: string;
  scheme: SetScheme;
  notes?: string;
}

interface TrainingDay {
  label: string;
  type: string;
  exercises: ProgramExercise[];
}

interface GeneratedProgram {
  id: string;
  name: string;
  goal: string;
  experienceLevel: string;
  description: string;
  daysPerWeek: number;
  estimatedDurationWeeks: number;
  schedule: TrainingDay[];
  tags: string[];
  isCustom: boolean;
  isAiGenerated: boolean;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateProgram(p: unknown): p is GeneratedProgram {
  if (!p || typeof p !== 'object') return false;
  const prog = p as Record<string, unknown>;
  if (!Array.isArray(prog.schedule)) return false;
  if (!['hypertrophy', 'fat-loss', 'general-fitness'].includes(prog.goal as string)) return false;
  if (!['beginner', 'intermediate', 'advanced'].includes(prog.experienceLevel as string)) return false;
  for (const day of prog.schedule as unknown[]) {
    if (!day || typeof day !== 'object') return false;
    const d = day as Record<string, unknown>;
    if (!Array.isArray(d.exercises)) return false;
    for (const ex of d.exercises as unknown[]) {
      if (!ex || typeof ex !== 'object') return false;
      const e = ex as Record<string, unknown>;
      if (typeof e.exerciseId !== 'string' || !VALID_IDS.has(e.exerciseId)) return false;
    }
  }
  return true;
}

// ─── Fallback program ────────────────────────────────────────────────────────

function buildFallback(profile: UserTrainingProfile): GeneratedProgram {
  const goal = (profile.goals[0] ?? 'general-fitness') as string;
  const days = Math.min(Math.max(profile.daysPerWeek, 2), 5);
  const level = profile.trainingAgeYears === 0
    ? 'beginner'
    : profile.trainingAgeYears <= 2
      ? 'intermediate'
      : 'advanced';

  // 3-day full-body template used for the fallback
  const fullBodyA: ProgramExercise[] = [
    { exerciseId: 'barbell-back-squat', scheme: { sets: 3, reps: '8-10', restSeconds: 120 } },
    { exerciseId: 'barbell-bench-press', scheme: { sets: 3, reps: '8-10', restSeconds: 90 } },
    { exerciseId: 'barbell-row', scheme: { sets: 3, reps: '8-10', restSeconds: 90 } },
    { exerciseId: 'overhead-press', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
    { exerciseId: 'plank', scheme: { sets: 3, reps: '30-60s', restSeconds: 60 } },
  ];
  const fullBodyB: ProgramExercise[] = [
    { exerciseId: 'romanian-deadlift', scheme: { sets: 3, reps: '8-10', restSeconds: 120 } },
    { exerciseId: 'dumbbell-bench-press', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
    { exerciseId: 'lat-pulldown', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
    { exerciseId: 'dumbbell-shoulder-press', scheme: { sets: 3, reps: '10-12', restSeconds: 90 } },
    { exerciseId: 'hanging-leg-raise', scheme: { sets: 3, reps: '10-15', restSeconds: 60 } },
  ];

  const schedule: TrainingDay[] = [];
  for (let i = 0; i < days; i++) {
    schedule.push({
      label: `Day ${i + 1}`,
      type: 'full-body',
      exercises: i % 2 === 0 ? fullBodyA : fullBodyB,
    });
  }

  return {
    id: '',
    name: 'AI-Generated Full-Body Program',
    goal: goal as GeneratedProgram['goal'],
    experienceLevel: level,
    description: profile.aiSummary || 'A personalised program built around your training profile.',
    daysPerWeek: days,
    estimatedDurationWeeks: 8,
    schedule,
    tags: ['ai-generated', goal],
    isCustom: true,
    isAiGenerated: true,
  };
}

// ─── System prompt ─────────────────────────────────────────────────────────────

function buildSystemPrompt(profile: UserTrainingProfile): string {
  return `You are an expert strength and conditioning coach. Generate a personalised 8-week training program as valid JSON.

USER PROFILE:
- Goals: ${profile.goals.join(', ')}
- Training age: ${profile.trainingAgeYears} year(s)
- Days per week: ${profile.daysPerWeek}
- Session duration: ${profile.sessionDurationMinutes} minutes
- Equipment: ${profile.equipment.join(', ') || 'full gym'}
- Injuries/limitations: ${profile.injuries.join(', ') || 'none'}

AVAILABLE EXERCISE IDs (use ONLY these exact IDs):
${EXERCISE_IDS.join(', ')}

OUTPUT REQUIREMENTS:
- Output ONLY a single JSON object — no markdown, no prose, no code fences
- Match this exact schema:
{
  "name": "string",
  "goal": "hypertrophy" | "fat-loss" | "general-fitness",
  "experienceLevel": "beginner" | "intermediate" | "advanced",
  "description": "string (1-2 sentences)",
  "daysPerWeek": number,
  "estimatedDurationWeeks": 8,
  "schedule": [
    {
      "label": "string (e.g. Day 1 — Push)",
      "type": "push" | "pull" | "legs" | "upper" | "lower" | "full-body" | "cardio" | "rest",
      "exercises": [
        {
          "exerciseId": "string (from list above)",
          "scheme": {
            "sets": number,
            "reps": "string (e.g. '8-10' or '60s')",
            "restSeconds": number,
            "rpe": number (optional, 6-9)
          },
          "notes": "string (optional)"
        }
      ]
    }
  ],
  "tags": ["string"]
}

PROGRAMMING RULES:
- Use ONLY exercise IDs from the list above — no exceptions
- Respect equipment constraints: avoid barbell exercises if equipment is "bodyweight only"
- Number of schedule days must equal daysPerWeek
- Each session: 4–7 exercises; respect the sessionDurationMinutes
- Balance push/pull/squat/hinge patterns across the week
- Progress intensity over 8 weeks (reflect this in rpe values increasing, e.g. start rpe 7, end rpe 9)
- Beginners (0 training age): 3×8-12, RPE 6-7, full-body splits
- Intermediate (1-3 yrs): 3-4×8-12, RPE 7-8, upper/lower or PPL
- Advanced (3+ yrs): 4-5×6-10, RPE 8-9, specialised splits`;
}

// ─── Handler ────────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[/api/generate-program] ANTHROPIC_API_KEY is not configured');
    return res.status(500).json({ error: 'AI service is not configured' });
  }

  const profile = req.body as UserTrainingProfile;
  if (!profile?.goals || !Array.isArray(profile.goals)) {
    return res.status(400).json({ error: 'Valid UserTrainingProfile is required' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: buildSystemPrompt(profile),
      messages: [{ role: 'user', content: 'Generate the program now.' }],
    });

    const block = message.content[0];
    if (block.type !== 'text') throw new Error('Unexpected Claude response type');

    let program: GeneratedProgram | null = null;

    try {
      // Strip any accidental markdown code fences
      const raw = block.text.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
      const parsed = JSON.parse(raw) as GeneratedProgram;
      if (validateProgram(parsed)) {
        program = { ...parsed, isCustom: true, isAiGenerated: true };
      } else {
        console.warn('[/api/generate-program] Validation failed — using fallback');
      }
    } catch (parseErr) {
      console.warn('[/api/generate-program] JSON parse error — using fallback', parseErr);
    }

    if (!program) {
      program = buildFallback(profile);
    }

    return res.status(200).json({ program });
  } catch (err: unknown) {
    console.error('[/api/generate-program]', err);
    // Even on server error, return a usable fallback
    return res.status(200).json({ program: buildFallback(profile) });
  }
}
