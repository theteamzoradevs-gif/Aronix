const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  start: number;
};

const hits = new Map<string, RateLimitEntry>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(key, { count: 1, start: now });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - entry.start)) / 1000);
    return { allowed: false, retryAfterSec };
  }

  entry.count += 1;
  return { allowed: true };
}
