import "server-only";

/**
 * Fixed-window rate limiter.
 *
 * Production: Upstash Redis over its REST API, called with plain fetch (no SDK dependency).
 * Serverless instances don't share memory, so a shared store is the only reliable option.
 * Local dev without credentials: an in-memory Map, clearly not suitable for production.
 */

type Result = { allowed: boolean; remaining: number };

const memory = new Map<string, { count: number; resetAt: number }>();

function memoryLimit(key: string, limit: number, windowSec: number): Result {
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    return { allowed: true, remaining: limit - 1 };
  }
  entry.count += 1;
  return { allowed: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}

async function upstashLimit(
  url: string,
  token: string,
  key: string,
  limit: number,
  windowSec: number,
): Promise<Result> {
  // INCR then set the TTL only when the key is new (NX), in one round trip.
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(windowSec), "NX"],
    ]),
    cache: "no-store",
    signal: AbortSignal.timeout(3000),
  });
  if (!res.ok) throw new Error(`Rate limiter unavailable (${res.status})`);
  const [incr] = (await res.json()) as [{ result: number }, unknown];
  return { allowed: incr.result <= limit, remaining: Math.max(0, limit - incr.result) };
}

export async function rateLimit(identifier: string, limit = 5, windowSec = 600): Promise<Result> {
  const key = `ratelimit:contact:${identifier}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) return upstashLimit(url, token, key, limit, windowSec);
  return memoryLimit(key, limit, windowSec);
}

/**
 * Raw IPs are personal data; we only need a stable bucket key, so store a SHA-256 hash instead.
 * On Vercel, x-forwarded-for is set by the platform edge and can't be spoofed by the client.
 */
export async function clientKey(headers: Headers): Promise<string> {
  const ip =
    headers.get("x-real-ip") ?? headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  return Buffer.from(digest).toString("hex").slice(0, 32);
}
