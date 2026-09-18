"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { primaryNavItems } from "@/lib/nav-items";
import { paths } from "@/paths";
import { useTranslations } from "next-intl";

function isCurrentPath(pathname: string, href: string) {
  // `/` is a prefix of every path, so home is exact-only.
  if (href === paths.home()) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PrimaryNav({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const t = useTranslations("shell");
  const pathname = usePathname();

  return (
    <ul className={className}>
      {primaryNavItems.map((item) => {
        const isCurrent = isCurrentPath(pathname, item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isCurrent ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "inline-block rounded-sm px-2 py-1 text-sm",
                isCurrent ? "font-semibold text-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {t(item.labelKey)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
