"use client";

import { signOut } from "@/api/auth";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { SessionUser } from "@/lib/session-user";
import { paths } from "@/paths";
import { useLocale, useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export function AccountMenu({
  session,
  onNavigate,
  className,
}: {
  session: SessionUser | null;
  onNavigate?: () => void;
  className?: string;
}) {
  const t = useTranslations("shell");
  const locale = useLocale();
  const pathname = usePathname();

  if (!session) {
    return (
      <nav aria-label={t("accountNav")} className={cn("flex items-center gap-1", className)}>
        <Link
          href={paths.signIn()}
          aria-current={pathname === paths.signIn() ? "page" : undefined}
          onClick={onNavigate}
          className={cn(
            "rounded-sm px-2 py-1 text-sm",
            pathname === paths.signIn()
              ? "font-semibold text-foreground"
              : "text-muted hover:text-foreground",
          )}
        >
          {t("signIn")}
        </Link>
        <Link
          href={paths.signUp()}
          aria-current={pathname === paths.signUp() ? "page" : undefined}
          onClick={onNavigate}
          className="rounded-sm bg-primary px-3 py-1 text-sm text-canvas"
        >
          {t("signUp")}
        </Link>
      </nav>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <p className="max-w-48 truncate text-sm font-medium" dir="auto" translate="no" title={session.name}>
        {session.name}
      </p>
      <form action={signOut}>
        <input type="hidden" name="locale" value={locale} />
        <SignOutButton />
      </form>
    </div>
  );
}

function SignOutButton() {
  const t = useTranslations("shell");
  const { pending } = useFormStatus();

  return (
    <>
      <p className="sr-only" role="status">
        {pending ? t("signOutPending") : ""}
      </p>
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="rounded-sm px-2 py-1 text-sm text-muted hover:text-foreground disabled:opacity-70"
      >
        {pending ? t("signOutPending") : t("signOut")}
      </button>
    </>
  );
}
