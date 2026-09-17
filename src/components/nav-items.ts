import { paths } from "@/paths";

export const primaryNavItems = [
  {
    href: paths.home(),
    labelKey: "home" as const,
    isCurrent: (pathname: string) => pathname === "/",
  },
  {
    href: paths.catalog(),
    labelKey: "catalog" as const,
    isCurrent: (pathname: string) => pathname === "/courses" || pathname.startsWith("/courses/"),
  },
];
