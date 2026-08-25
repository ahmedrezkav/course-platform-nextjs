import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// next-intl still ships createMiddleware; Next.js 16 loads this file as proxy.ts.
export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
