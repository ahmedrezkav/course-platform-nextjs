"use client";

import type { SessionUser } from "@/lib/session-user";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { AccountMenu } from "./account-menu";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { PrimaryNav } from "./primary-nav";

export function HeaderTools({ session }: { session: SessionUser | null }) {
  const t = useTranslations("shell");

  return (
    <div className="ms-auto flex items-center gap-2">
      <nav aria-label={t("mainNav")} className="hidden md:block">
        <PrimaryNav className="flex gap-1" />
      </nav>
      <AccountMenu session={session} className="hidden shrink-0 md:flex" />
      {/* useSearchParams always suspends. Keep it off the nav so those links stay in the static shell. */}
      <Suspense fallback={<div className="h-8 w-36" aria-hidden />}>
        <LanguageSwitcher />
      </Suspense>
      {/* Remount when the session changes so sign-out closes the dialog after the action, not during it. */}
      <MobileNav key={session?.id ?? "guest"} session={session} />
    </div>
  );
}
