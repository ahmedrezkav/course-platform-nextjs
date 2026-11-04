import { checkoutIdFromQuery, getCheckoutForViewer } from "@/api/checkouts";
import { getSession } from "@/api/session";
import { Link, redirect } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { formatUsd } from "./format-usd";
import { OutcomeFallback } from "./skeleton";

export async function CheckoutOutcome({
  kind,
  searchParams,
}: {
  kind: "success" | "cancel";
  searchParams: Promise<{ session?: string | string[] }>;
}) {
  const t = await getTranslations("loading");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-3xl">
        {/* The query and the cookie are request-time. The heading depends on
            the row, so it streams with the body. */}
        <Suspense fallback={<OutcomeFallback label={t("label")} />}>
          <OutcomeBody kind={kind} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function OutcomeBody({
  kind,
  searchParams,
}: {
  kind: "success" | "cancel";
  searchParams: Promise<{ session?: string | string[] }>;
}) {
  const { session: raw } = await searchParams;
  const id = checkoutIdFromQuery(raw);
  const user = await getSession();
  const locale = await getLocale();

  if (!user) {
    const next = kind === "success" ? paths.checkoutSuccess() : paths.checkoutCancel();
    redirect({
      href: { pathname: paths.signIn(), query: { next } },
      locale,
    });
    return null;
  }

  const t = await getTranslations();
  const view = id ? await getCheckoutForViewer(id) : null;

  if (!view) {
    return (
      <>
        <h1 className="text-4xl font-semibold tracking-tight">{t("checkout.unavailableTitle")}</h1>
        <p className="mt-4 text-lg text-muted">{t("checkout.unavailable")}</p>
        <DashboardLink label={t("learning.dashboard")} />
      </>
    );
  }

  if (view.status === "paid" && kind === "success") {
    const total = await formatUsd(view.amount);
    return (
      <>
        <h1 className="text-4xl font-semibold tracking-tight">{t("checkout.successTitle")}</h1>
        <p className="mt-4 text-lg text-muted">{t("checkout.successIntro")}</p>
        <CourseTitle courseSlug={view.course.slug} title={view.course.title[locale]} />
        <p className="mt-3 text-sm text-muted">{t("checkout.total")}</p>
        <p className="text-lg font-medium">
          <span dir="ltr">{total}</span>
        </p>
        <DashboardLink label={t("learning.dashboard")} />
      </>
    );
  }

  if (view.status === "paid") {
    return (
      <>
        <h1 className="text-4xl font-semibold tracking-tight">{t("checkout.paid")}</h1>
        <CourseTitle courseSlug={view.course.slug} title={view.course.title[locale]} />
        <DashboardLink label={t("learning.dashboard")} />
      </>
    );
  }

  if (view.status === "canceled") {
    return (
      <>
        <h1 className="text-4xl font-semibold tracking-tight">{t("checkout.cancelTitle")}</h1>
        <p className="mt-4 text-lg text-muted">{t("checkout.cancelIntro")}</p>
        <CourseTitle courseSlug={view.course.slug} title={view.course.title[locale]} />
        <Link
          href={paths.course(view.course.slug)}
          className="mt-6 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
        >
          {t("checkout.backToCourse")}
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-semibold tracking-tight">{t("checkout.title")}</h1>
      <p className="mt-4 text-lg text-muted">{t("checkout.incomplete")}</p>
      <Link
        href={paths.checkout(view.id)}
        className="mt-6 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
      >
        {t("checkout.return")}
      </Link>
    </>
  );
}

function CourseTitle({ courseSlug, title }: { courseSlug: string; title: string }) {
  return (
    <p className="mt-6 text-2xl font-semibold tracking-tight">
      <Link href={paths.course(courseSlug)} className="underline underline-offset-4 hover:text-primary">
        {title}
      </Link>
    </p>
  );
}

function DashboardLink({ label }: { label: string }) {
  return (
    <Link
      href={paths.dashboard()}
      className="mt-6 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
    >
      {label}
    </Link>
  );
}
