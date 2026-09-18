"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { PrimaryNav } from "./primary-nav";

export function HeaderTools() {
  const t = useTranslations("shell");

  return (
    <div className="ms-auto flex items-center gap-2">
      <nav aria-label={t("mainNav")} className="hidden md:block">
        <PrimaryNav className="flex gap-1" />
      </nav>
      <LanguageSwitcher />
      <MobileNav />
    </div>
  );
}
