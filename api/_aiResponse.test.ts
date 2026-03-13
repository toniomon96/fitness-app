import { describe, expect, it } from 'vitest';
import { cleanAskAnswer } from './_aiResponse.js';

const DISCLAIMER =
  '⚠️ This is educational information only, not medical advice. Please consult a qualified healthcare professional for personal health concerns.';

describe('cleanAskAnswer', () => {
  it('removes wrappers/noise and ensures one trailing disclaimer', () => {
    const input = [
      '```markdown',
      'Assistant: Keep protein near 1.6-2.2 g/kg/day.',
      '',
      DISCLAIMER,
      '',
      DISCLAIMER,
      '```',
    ].join('\n');

    expect(cleanAskAnswer(input)).toBe(
      `Keep protein near 1.6-2.2 g/kg/day.\n\n${DISCLAIMER}`,
    );
  });

  it('adds disclaimer when absent', () => {
    expect(cleanAskAnswer('Simple answer')).toBe(`Simple answer\n\n${DISCLAIMER}`);
  });
});
