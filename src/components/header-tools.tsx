"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { PrimaryNav } from "@/components/primary-nav";
import { useTranslations } from "next-intl";

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
