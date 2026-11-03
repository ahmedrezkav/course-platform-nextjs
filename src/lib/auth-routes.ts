import { routing } from "@/i18n/routing";
import { paths } from "@/paths";

// Roots of paths.dashboard, paths.learn, and paths.checkout.
const privatePrefixes = [paths.dashboard(), "/learn", "/checkout"] as const;

export function isPrivatePath(pathname: string) {
  return privatePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthPath(pathname: string) {
  return pathname === paths.signIn() || pathname === paths.signUp();
}

// `next` may only be a locale-unprefixed private path. Schemes, slashes, and
// encodings are dropped so the query cannot redirect off this site.
export function safeNextPath(value: unknown) {
  if (typeof value !== "string") return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  if (value.includes("\\") || value.includes("%") || value.includes("..")) return null;

  const pathname = value.split(/[?#]/)[0] ?? "";
  if (!/^\/[A-Za-z0-9/_-]+$/.test(pathname)) return null;
  if (!isPrivatePath(pathname)) return null;
  return pathname;
}

export function localeFromPath(pathname: string) {
  const [, maybeLocale, ...rest] = pathname.split("/");
  if (!maybeLocale || !(routing.locales as readonly string[]).includes(maybeLocale)) {
    return null;
  }

  const locale = maybeLocale as (typeof routing.locales)[number];
  const bare = `/${rest.join("/")}`.replace(/\/+$/, "") || "/";
  return { locale, pathname: bare };
}

export function withLocale(locale: string, pathname: string) {
  if (pathname === "/") return `/${locale}`;
  return `/${locale}${pathname}`;
}
