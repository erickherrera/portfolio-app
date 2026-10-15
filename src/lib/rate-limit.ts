const buckets = new Map<string, number[]>();

interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: RateLimitOptions = {}
): RateLimitResult {
  const now = Date.now();
  const timestamps = (buckets.get(key) ?? []).filter(
    (time) => now - time < windowMs
  );

  if (timestamps.length >= limit) {
    const retryAfterMs = windowMs - (now - timestamps[0]);
    buckets.set(key, timestamps);
    return { allowed: false, remaining: 0, retryAfterMs };
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  return { allowed: true, remaining: limit - timestamps.length, retryAfterMs: 0 };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
