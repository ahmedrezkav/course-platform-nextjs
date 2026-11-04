import { getEnrollmentState } from "@/api/enrollments";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getTranslations } from "next-intl/server";
import { EnrolledActions } from "./enrolled";
import { PurchaseForm } from "./purchase-form";

// This child reads the session cookie. The course page wraps it in Suspense
// so the syllabus can still prerender.
export async function PurchaseSlot({ slug }: { slug: string }) {
  const [t, state] = await Promise.all([getTranslations(), getEnrollmentState(slug)]);

  if (state === "enrolled") {
    return <EnrolledActions slug={slug} />;
  }

  return (
    <div className="mt-6">
      <p className="max-w-xl text-sm text-muted">{t("checkout.intro")}</p>
      {state === "guest" ? (
        <Link
          href={{ pathname: paths.signIn(), query: { next: paths.course(slug) } }}
          className="mt-3 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
        >
          {t("checkout.signIn")}
        </Link>
      ) : (
        <PurchaseForm slug={slug} />
      )}
    </div>
  );
}

export function PurchaseFallback({ label }: { label: string }) {
  return (
    <div className="mt-6">
      <p className="sr-only" role="status">
        {label}
      </p>
      <div aria-hidden>
        <div className="h-4 w-72 max-w-full animate-pulse rounded-sm bg-border" />
        <div className="mt-3 h-10 w-40 animate-pulse rounded-sm bg-border" />
      </div>
    </div>
  );
}
