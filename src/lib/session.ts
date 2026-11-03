import { timingSafeEqual } from "node:crypto";
import type { SessionUser } from "./session-user";

export const SESSION_COOKIE = "vela_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

// Demo key so sign-in works without an env file. Not a production secret.
const DEMO_SESSION_SECRET = "vela-demo-session-key-not-for-production";

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  // Local `next dev` is http. A Secure cookie would be dropped there.
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(DEMO_SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Buffer.from(signature).toString("base64url");
}

// The cookie is the session: id, name, and email. The proxy and the header
// cannot read the in-memory student list. The password is not sealed.
// Date.now() runs only while sealing or opening a request cookie.
export async function sealSession(user: SessionUser) {
  const payload = Buffer.from(
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    }),
  ).toString("base64url");
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

export async function openSession(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;

  try {
    const dot = token.indexOf(".");
    if (dot <= 0 || dot !== token.lastIndexOf(".")) return null;

    const payload = token.slice(0, dot);
    const signature = token.slice(dot + 1);
    const expected = await sign(payload);
    const actualBytes = Buffer.from(signature);
    const expectedBytes = Buffer.from(expected);
    if (
      actualBytes.length !== expectedBytes.length ||
      !timingSafeEqual(actualBytes, expectedBytes)
    ) {
      return null;
    }

    const parsed: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!parsed || typeof parsed !== "object") return null;

    const record = parsed as Record<string, unknown>;
    if (
      typeof record.id !== "string" ||
      typeof record.name !== "string" ||
      typeof record.email !== "string" ||
      typeof record.exp !== "number" ||
      !Number.isFinite(record.exp) ||
      record.exp < Date.now()
    ) {
      return null;
    }

    if (!record.id || record.name.length < 1 || record.name.length > 80) return null;
    if (record.email.length > 254) return null;

    return { id: record.id, name: record.name, email: record.email };
  } catch {
    return null;
  }
}
