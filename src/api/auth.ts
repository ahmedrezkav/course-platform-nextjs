"use server";

import { authenticate, registerStudent } from "@/data/users";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { safeNextPath } from "@/lib/auth-routes";
import { signInValues, signUpValues, type AuthFormState } from "@/lib/auth-fields";
import { sealSession, SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";
import type { SessionUser } from "@/lib/session-user";
import { paths } from "@/paths";
import { hasLocale } from "next-intl";
import { cookies } from "next/headers";

export type { AuthFormState };

// Posted with the form. getLocale() reads next/root-params, which a server
// action is not allowed to call.
function localeFromForm(formData: FormData) {
  const value = formData.get("locale");
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}

async function startSession(
  user: SessionUser,
  next: string | null,
  locale: (typeof routing.locales)[number],
): Promise<never> {
  const token = await sealSession(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, sessionCookieOptions);
  redirect({ href: next ?? paths.home(), locale });
  throw new Error("Redirect did not complete");
}

export async function signIn(
  _prev: AuthFormState | null,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signInValues(formData);
  if (!parsed.ok) return parsed.state;

  const user = authenticate(parsed.email, parsed.password);
  if (!user) return { formError: "credentials" };

  return startSession(user, safeNextPath(formData.get("next")), localeFromForm(formData));
}

export async function signUp(
  _prev: AuthFormState | null,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signUpValues(formData);
  if (!parsed.ok) return parsed.state;

  const user = registerStudent(parsed);
  if (!user) return { formError: "taken" };

  return startSession(user, safeNextPath(formData.get("next")), localeFromForm(formData));
}

export async function signOut(formData: FormData) {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect({ href: paths.home(), locale: localeFromForm(formData) });
}
