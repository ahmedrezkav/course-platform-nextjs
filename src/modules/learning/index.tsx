import { getMyCourses } from "@/api/enrollments";
import { getSession } from "@/api/session";
import { CourseCard } from "@/components/course-card";
import { Link, redirect } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LearningListFallback } from "./skeleton";

export default async function Learning() {
  const t = await getTranslations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{t("learning.title")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{t("learning.intro")}</p>
      {/* The session cookie is request-time. Await it under Suspense so the heading can prerender. */}
      <Suspense fallback={<LearningListFallback label={t("loading.label")} />}>
        <LearningList />
      </Suspense>
    </div>
  );
}

async function LearningList() {
  const session = await getSession();

  if (!session) {
    const locale = await getLocale();
    redirect({
      href: { pathname: paths.signIn(), query: { next: paths.dashboard() } },
      locale,
    });
    return null;
  }

  const [t, courses] = await Promise.all([getTranslations("learning"), getMyCourses()]);

  if (courses.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-muted">{t("empty")}</p>
        <Link
          href={paths.catalog()}
          className="mt-6 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
        >
          {t("browse")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mt-4 text-sm text-muted">{t("count", { count: courses.length })}</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <li key={course.slug}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </>
  );
}
