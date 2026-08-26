import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware replacements for next/link and next/navigation.
// `Link` prefixes hrefs from `paths.ts` with the current locale;
// `usePathname` returns the path without `/en` or `/ar`.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
