"use client";

import { primaryNavItems } from "@/components/nav-items";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

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
        const isCurrent = item.isCurrent(pathname);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isCurrent ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "inline-block rounded-sm px-2 py-1 text-sm",
                isCurrent ? "font-semibold text-foreground" : "text-muted",
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
