import { paths } from "@/paths";

export const primaryNavItems = [
  { href: paths.home(), labelKey: "home" as const },
  { href: paths.catalog(), labelKey: "catalog" as const },
];
