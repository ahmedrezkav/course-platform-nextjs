import { getCheckoutForViewer, isCheckoutId } from "@/api/checkouts";
import { getSession } from "@/api/session";
import { Link, redirect } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckoutActions } from "./forms";
import { formatUsd } from "./format-usd";
import { CheckoutBodyFallback } from "./skeleton";

export default async function Checkout({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const t = await getTranslations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">{t("checkout.title")}</h1>
        <p className="mt-4 text-lg text-muted">{t("checkout.intro")}</p>
        {/* The session id and the cookie are request-time. Await them under
            Suspense so this heading can prerender. Rows are process memory. */}
        <Suspense fallback={<CheckoutBodyFallback label={t("loading.label")} />}>
          <CheckoutBody params={params} />
        </Suspense>
      </div>
    </div>
  );
}

async function CheckoutBody({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const session = await getSession();

  if (!session) {
    const locale = await getLocale();
    redirect({
      href: isCheckoutId(sessionId)
        ? { pathname: paths.signIn(), query: { next: paths.checkout(sessionId) } }
        : paths.signIn(),
      locale,
    });
    return null;
  }

  const view = await getCheckoutForViewer(sessionId);
  if (!view) notFound();

  const [t, locale, total] = await Promise.all([
    getTranslations(),
    getLocale(),
    formatUsd(view.amount),
  ]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold tracking-tight">
        <Link href={paths.course(view.course.slug)}>{view.course.title[locale]}</Link>
      </h2>
      <p className="mt-3 text-sm text-muted">{t("checkout.total")}</p>
      <p className="text-lg font-medium">
        <span dir="ltr">{total}</span>
      </p>
      {view.status === "open" ? <CheckoutActions sessionId={view.id} /> : null}
      {view.status === "paid" ? (
        <div className="mt-6">
          <p className="font-medium">{t("checkout.paid")}</p>
          <Link
            href={paths.dashboard()}
            className="mt-4 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
          >
            {t("learning.dashboard")}
          </Link>
        </div>
      ) : null}
      {view.status === "canceled" ? (
        <div className="mt-6">
          <p className="font-medium">{t("checkout.canceled")}</p>
          <Link
            href={paths.course(view.course.slug)}
            className="mt-4 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
          >
            {t("checkout.backToCourse")}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
