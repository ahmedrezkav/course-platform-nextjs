"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { useLocale, useTranslations } from "next-intl";

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")} className="flex gap-1">
      {routing.locales.map((code) => {
        const isCurrent = locale === code;

        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "rounded-sm px-2 py-1 text-sm",
              isCurrent ? "font-semibold text-foreground" : "text-muted",
            )}
          >
            {t(code)}
          </Link>
        );
      })}
    </nav>
  );
}
