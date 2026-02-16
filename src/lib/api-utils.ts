import { NextRequest } from 'next/server';

// ─── Rate Limiter ───────────────────────────────────────────────
// Simple in-memory rate limiter using a Map.
// NOTE: This resets on server restart. For production-grade rate
// limiting, use Redis or a similar persistent store.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function checkRateLimit(request: NextRequest): { allowed: boolean } {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false };
  }

  entry.count++;
  return { allowed: true };
}

// Periodically clean up expired entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000); // Clean every 10 minutes

// ─── Input Sanitization ────────────────────────────────────────

const HTML_TAG_REGEX = /<[^>]*>/g;

export function sanitizeString(value: string): string {
  return value.trim().replace(HTML_TAG_REGEX, '');
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeString(sanitized[key] as string);
    }
  }
  return sanitized;
}

// ─── Payload Size Check ────────────────────────────────────────

const MAX_PAYLOAD_BYTES = 10 * 1024; // 10kb

export function checkPayloadSize(request: NextRequest): boolean {
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
    return false;
  }
  return true;
}
