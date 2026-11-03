import { isAuthPath, isPrivatePath, localeFromPath, safeNextPath, withLocale } from "./lib/auth-routes";
import { openSession, SESSION_COOKIE } from "./lib/session";
import { paths } from "./paths";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

// next-intl still exports `createMiddleware`; Next.js 16 runs this file as
// `proxy.ts`. Unprefixed paths go there first so the guard always sees `/en`
// or `/ar`. The guard reads the signed cookie only — not the student list.
export default async function proxy(request: NextRequest) {
  const located = localeFromPath(request.nextUrl.pathname);
  if (!located) {
    return handleI18n(request);
  }

  const session = await openSession(request.cookies.get(SESSION_COOKIE)?.value);
  const { locale, pathname } = located;

  if (isPrivatePath(pathname) && !session) {
    const url = request.nextUrl.clone();
    url.pathname = withLocale(locale, paths.signIn());
    url.search = "";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPath(pathname) && session) {
    const next = safeNextPath(request.nextUrl.searchParams.get("next"));
    const url = request.nextUrl.clone();
    url.pathname = withLocale(locale, next ?? paths.home());
    url.search = "";
    return NextResponse.redirect(url);
  }

  return handleI18n(request);
}

export const config = {
  // Skip API, internals, and files with an extension (favicon, images).
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
