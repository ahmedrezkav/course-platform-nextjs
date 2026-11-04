import { getEnrollmentState } from "@/api/enrollments";
import { getProgressForCourses } from "@/api/progress";
import { getSession } from "@/api/session";
import type { Course, Locale } from "@/data/types";
import { Link, redirect } from "@/i18n/navigation";
import type { LessonRef } from "@/lib/lessons";
import { courseLessons } from "@/lib/lessons";
import { paths } from "@/paths";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ArticleBody } from "./article";
import { CompleteForm } from "./complete-form";
import { PlayerBodyFallback } from "./skeleton";
import { LessonVideo } from "./video";

export default async function Player({ course, entry }: { course: Course; entry: LessonRef }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const total = courseLessons(course).length;
  const lesson = entry.lesson;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Link href={paths.course(course.slug)} className="text-sm text-primary">
        {t("player.backToCourse")}
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">{lesson.title[locale]}</h1>
      <p className="mt-3 text-sm text-muted">
        <span>{t(`course.type.${lesson.type}`)}</span>
        <span aria-hidden className="px-1">
          ·
        </span>
        <span>{t("course.duration", { minutes: lesson.durationMinutes })}</span>
        <span aria-hidden className="px-1">
          ·
        </span>
        <span>{t("player.position", { index: entry.index, total })}</span>
      </p>
      {/* The session cookie and completion rows are request-time. Await them
          under Suspense so this title can prerender. Rows are process memory. */}
      <Suspense fallback={<PlayerBodyFallback label={t("loading.label")} />}>
        <PlayerBody course={course} entry={entry} />
      </Suspense>
    </div>
  );
}

async function PlayerBody({ course, entry }: { course: Course; entry: LessonRef }) {
  const [session, locale] = await Promise.all([getSession(), getLocale()]);

  if (!session) {
    redirect({
      href: {
        pathname: paths.signIn(),
        query: { next: paths.learn(course.slug, entry.lesson.slug) },
      },
      locale,
    });
    return null;
  }

  const [t, state, progressMap] = await Promise.all([
    getTranslations(),
    getEnrollmentState(course.slug),
    getProgressForCourses([course]),
  ]);
  const progress = progressMap.get(course.slug) ?? {
    completed: 0,
    total: courseLessons(course).length,
    resumeSlug: null,
    completedSlugs: [],
  };
  const enrolled = state === "enrolled";
  const completedSlugs = enrolled ? progress.completedSlugs : [];
  const lesson = entry.lesson;

  return (
    <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0">
        {enrolled ? (
          <p className="text-sm text-muted">
            {t("learning.progress", { completed: progress.completed, total: progress.total })}
          </p>
        ) : (
          <p className="max-w-xl">{t("player.locked")}</p>
        )}
        {enrolled && lesson.type === "video" ? (
          <LessonVideo
            lesson={lesson}
            locale={locale}
            label={lesson.title[locale]}
            captionsLabel={t("player.captions")}
            unsupported={t("player.videoUnsupported")}
          />
        ) : null}
        {enrolled && lesson.type === "article" ? (
          <ArticleBody body={lesson.body[locale]} title={lesson.title[locale]} />
        ) : null}
        {enrolled ? (
          completedSlugs.includes(lesson.slug) ? (
            <p className="mt-6 font-medium">{t("player.completed")}</p>
          ) : (
            <CompleteForm courseSlug={course.slug} lessonSlug={lesson.slug} />
          )
        ) : null}
        <LessonPager
          course={course}
          index={entry.index}
          locale={locale}
          previousLabel={t("player.previous")}
          nextLabel={t("player.next")}
        />
      </div>
      <LessonOutline
        course={course}
        currentSlug={lesson.slug}
        completedSlugs={completedSlugs}
        locale={locale}
        label={t("player.outline")}
        completedLabel={t("player.completed")}
      />
    </div>
  );
}

function LessonPager({
  course,
  index,
  locale,
  previousLabel,
  nextLabel,
}: {
  course: Course;
  index: number;
  locale: Locale;
  previousLabel: string;
  nextLabel: string;
}) {
  const lessons = courseLessons(course);
  const previous = lessons.find((item) => item.index === index - 1);
  const next = lessons.find((item) => item.index === index + 1);
  if (!previous && !next) return null;

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {previous ? (
        <Link
          href={paths.learn(course.slug, previous.lesson.slug)}
          className="me-auto block max-w-xs hover:text-primary"
        >
          <span className="block text-sm text-muted">{previousLabel}</span>
          <span className="font-medium">{previous.lesson.title[locale]}</span>
        </Link>
      ) : null}
      {next ? (
        <Link
          href={paths.learn(course.slug, next.lesson.slug)}
          className="ms-auto block max-w-xs text-end hover:text-primary"
        >
          <span className="block text-sm text-muted">{nextLabel}</span>
          <span className="font-medium">{next.lesson.title[locale]}</span>
        </Link>
      ) : null}
    </div>
  );
}

function LessonOutline({
  course,
  currentSlug,
  completedSlugs,
  locale,
  label,
  completedLabel,
}: {
  course: Course;
  currentSlug: string;
  completedSlugs: readonly string[];
  locale: Locale;
  label: string;
  completedLabel: string;
}) {
  const modules = course.modules.filter((courseModule) => courseModule.lessons.length > 0);
  const done = new Set(completedSlugs);

  return (
    <nav aria-labelledby="lesson-outline">
      <h2 id="lesson-outline" className="text-lg font-semibold">
        {label}
      </h2>
      <div className="mt-4 flex flex-col gap-6">
        {modules.map((courseModule) => (
          <section key={courseModule.slug} aria-labelledby={`outline-${courseModule.slug}`}>
            <h3 id={`outline-${courseModule.slug}`} className="text-sm font-semibold text-muted">
              {courseModule.title[locale]}
            </h3>
            <ol className="mt-2 list-none">
              {courseModule.lessons.map((lesson) => {
                const current = lesson.slug === currentSlug;

                return (
                  <li key={lesson.slug} className="border-t border-border py-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      {current ? (
                        <span aria-current="page" className="font-semibold">
                          {lesson.title[locale]}
                        </span>
                      ) : (
                        <Link
                          href={paths.learn(course.slug, lesson.slug)}
                          className="font-medium hover:text-primary"
                        >
                          {lesson.title[locale]}
                        </Link>
                      )}
                      {done.has(lesson.slug) ? (
                        <span className="text-sm text-muted">{completedLabel}</span>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </nav>
  );
}
