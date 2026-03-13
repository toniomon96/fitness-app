import type { SpacedRepCard, SpacedRepQuality } from '../types';

// ─── SM-2 Algorithm ────────────────────────────────────────────────────────────
// Based on the original SM-2 algorithm by Piotr Wozniak (SuperMemo).
// Quality scale: 0–5 (0-1 = fail, 2 = barely recall, 3 = correct w/ difficulty,
//                        4 = correct, 5 = perfect)

const MIN_EASINESS = 1.3;
const DEFAULT_EASINESS = 2.5;

/**
 * Apply SM-2 algorithm to update a card after a review.
 * Returns a new SpacedRepCard object (immutable).
 */
export function applyReview(card: SpacedRepCard, quality: SpacedRepQuality): SpacedRepCard {
  const now = new Date().toISOString();

  // SM-2 easiness update (clamped to MIN_EASINESS)
  const newEasiness = Math.max(
    MIN_EASINESS,
    card.easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  );

  let newRepetitions: number;
  let newIntervalDays: number;

  if (quality < 3) {
    // Failed — reset repetitions and interval
    newRepetitions = 0;
    newIntervalDays = 1;
  } else {
    newRepetitions = card.repetitions + 1;
    if (card.repetitions === 0) {
      newIntervalDays = 1;
    } else if (card.repetitions === 1) {
      newIntervalDays = 6;
    } else {
      newIntervalDays = Math.round(card.intervalDays * newEasiness);
    }
  }

  const nextDue = new Date();
  nextDue.setDate(nextDue.getDate() + newIntervalDays);

  return {
    ...card,
    easinessFactor: newEasiness,
    intervalDays: newIntervalDays,
    repetitions: newRepetitions,
    nextDueAt: nextDue.toISOString(),
    lastReviewedAt: now,
  };
}

/**
 * Create a brand-new SpacedRepCard for a lesson or quiz question.
 */
export function createCard(cardId: string, userId: string): SpacedRepCard {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return {
    cardId,
    userId,
    easinessFactor: DEFAULT_EASINESS,
    intervalDays: 1,
    repetitions: 0,
    nextDueAt: tomorrow.toISOString(),
    lastReviewedAt: new Date().toISOString(),
  };
}

/**
 * Returns true if a card is due for review (nextDueAt ≤ now).
 */
export function isCardDue(card: SpacedRepCard): boolean {
  return new Date(card.nextDueAt) <= new Date();
}

/**
 * Map a quiz score (0–100) to SM-2 quality (0–5).
 *   ≥ 90 → 5, ≥ 75 → 4, ≥ 60 → 3, ≥ 40 → 2, ≥ 20 → 1, < 20 → 0
 */
export function scoreToQuality(score: number): SpacedRepQuality {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  if (score >= 40) return 2;
  if (score >= 20) return 1;
  return 0;
}
