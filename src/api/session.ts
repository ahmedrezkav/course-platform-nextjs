import { openSession, SESSION_COOKIE } from "@/lib/session";
import type { SessionUser } from "@/lib/session-user";
import { cookies } from "next/headers";
import { cache } from "react";

export type { SessionUser };

export const getSession = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return openSession(token);
});
