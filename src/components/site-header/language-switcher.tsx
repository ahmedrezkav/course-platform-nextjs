"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  // next-intl strips `/en` or `/ar`, so this is the same page without a locale.
  // `locale={code}` rebuilds `/ar/...` from `/en/...` (and vice versa)
  // and writes the locale cookie. Passing a prefixed pathname would nest locales (`/ar/en/...`).
  // The query is forwarded so catalog filters survive the switch. Values are locale-independent ids.
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const href = Object.keys(query).length > 0 ? { pathname, query } : pathname;

  return (
    <nav aria-label={t("label")} className="flex gap-1">
      {routing.locales.map((code) => {
        const isCurrent = locale === code;

        return (
          <Link
            key={code}
            href={href}
            locale={code}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "rounded-sm px-2 py-1 text-sm",
              isCurrent ? "font-semibold text-foreground" : "text-muted hover:text-foreground",
            )}
          >
            {t(code)}
          </Link>
        );
      })}
    </nav>
  );
}
