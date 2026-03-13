const TRAILING_CODE_FENCE = /\n?```\s*$/i;
const LEADING_CODE_FENCE = /^```(?:markdown|md|text)?\s*\n?/i;

export function cleanAiResponseText(raw: string): string {
  return String(raw ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(LEADING_CODE_FENCE, '')
    .replace(TRAILING_CODE_FENCE, '')
    .replace(/^\s*(assistant|ai|omnexus\s*ai)\s*:\s*/i, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
