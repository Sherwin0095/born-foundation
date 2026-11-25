// ============================================================
// BORN FOUNDATION — SERVER SECURITY HELPERS
// Rate limiting, PII log masking, and safe validation guards.
// ============================================================

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitBucket>();

/**
 * Simple sliding-window in-memory limiter per route & IP key.
 * Note: for multi-instance production deployments, replace with Redis / Upstash rate limiting.
 */
export function checkRateLimit(
  key: string,
  maxRequests = 10,
  windowMs = 60_000
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfterSeconds: 0 };
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - current.count),
    retryAfterSeconds: 0,
  };
}

export function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "local-client";
}

export function isSameOriginOrLocal(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser API callers / curl in tests
  const host = request.headers.get("host");
  if (!host) return true;
  try {
    const parsedOrigin = new URL(origin);
    return parsedOrigin.host === host;
  } catch {
    return false;
  }
}

export function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return "[redacted]";
  const local = parts[0];
  const domain = parts[1];
  const visible = local.length <= 2 ? local.charAt(0) : local.slice(0, 2);
  return `${visible}***@${domain}`;
}
