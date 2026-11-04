import { getEnrollmentState } from "@/api/enrollments";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getTranslations } from "next-intl/server";
import { EnrollForm } from "./enroll-form";
import { EnrolledActions } from "./enrolled";

// This child reads the session cookie. The course page wraps it in Suspense
// so the syllabus can still prerender.
export async function EnrollSlot({ slug }: { slug: string }) {
  const [t, state] = await Promise.all([getTranslations("learning"), getEnrollmentState(slug)]);

  if (state === "guest") {
    return (
      <Link
        href={{ pathname: paths.signIn(), query: { next: paths.course(slug) } }}
        className="mt-6 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
      >
        {t("enrollSignIn")}
      </Link>
    );
  }

  if (state === "enrolled") {
    return <EnrolledActions slug={slug} />;
  }

  return <EnrollForm slug={slug} />;
}

export function EnrollFallback({ label }: { label: string }) {
  return (
    <div className="mt-6">
      <p className="sr-only" role="status">
        {label}
      </p>
      <div aria-hidden className="h-10 w-40 animate-pulse rounded-sm bg-border" />
    </div>
  );
}
