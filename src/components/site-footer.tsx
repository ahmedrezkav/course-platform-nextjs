import { Link } from "@/i18n/navigation";
import { primaryNavItems } from "@/lib/nav-items";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations();

  return (
    <footer className="border-border mt-auto border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold tracking-tight">{t("brandName")}</p>
        <nav aria-label={t("shell.footerNav")}>
          <ul className="flex flex-wrap gap-3">
            {primaryNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted hover:text-foreground">
                  {t(`shell.${item.labelKey}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Year is fixed so Cache Components can prerender the footer (no Date.now()).
            dir=ltr keeps ©, the year, and Vela from reordering under html[dir=rtl]. */}
        <p className="text-sm text-muted" dir="ltr">
          {t("shell.copyright", { year: 2026 })}
        </p>
      </div>
    </footer>
  );
}
