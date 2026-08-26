import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// next-intl still exports `createMiddleware`; Next.js 16 runs this file as
// `proxy.ts` (not `middleware.ts`). It prefixes routes and redirects `/`
// using Accept-Language, then the NEXT_LOCALE cookie after a switch.
export default createMiddleware(routing);

export const config = {
  // Skip API, internals, and files with an extension (favicon, images).
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
