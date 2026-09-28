import { CourseIcon } from "@/components/course-icon";
import type { Course } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { CourseJsonLd } from "./json-ld";

export default async function CourseDetail({ course }: { course: Course }) {
  const t = await getTranslations();
  const locale = await getLocale();
  // Arabic currency patterns reorder "$" and "US". Latin USD stays readable in both directions.
  const formatPrice = await getFormatter({ locale: "en" });
  const modules = course.modules.filter((module) => module.lessons.length > 0);
  const lessonTotal = modules.reduce((total, module) => total + module.lessons.length, 0);
  const minutes = modules.reduce(
    (total, module) =>
      total + module.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0),
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <CourseJsonLd
        course={course}
        modules={modules}
        locale={locale}
        providerName={t("brandName")}
        level={t(`course.level.${course.level}`)}
        category={t(`course.category.${course.category}`)}
      />
      <article className="max-w-3xl">
        <Link href={paths.catalog()} className="text-sm text-primary">
          {t("course.backToCatalog")}
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-primary/10 text-primary">
            <CourseIcon slug={course.slug} />
          </span>
          <p className="text-sm text-muted">
            <span>{t(`course.category.${course.category}`)}</span>
            <span aria-hidden className="px-1">
              ·
            </span>
            <span>{t(`course.level.${course.level}`)}</span>
          </p>
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{course.title[locale]}</h1>
        <p className="mt-4 text-lg text-muted">{course.description[locale]}</p>
        <p className="mt-4 text-sm text-muted">
          {t("course.taughtBy", { name: course.instructorName[locale] })}
        </p>
        {/* Store prices are numbers with no currency. USD is display-only until checkout. */}
        <p className="mt-3 text-lg font-medium">
          {course.price === 0 ? (
            t("course.free")
          ) : (
            <span dir="ltr">
              {formatPrice.number(course.price, { style: "currency", currency: "USD" })}
            </span>
          )}
        </p>
      </article>
      <section className="mt-12 max-w-3xl" aria-labelledby="syllabus-heading">
        <h2 id="syllabus-heading" className="text-2xl font-semibold tracking-tight">
          {t("course.syllabus")}
        </h2>
        {lessonTotal === 0 ? (
          <p className="mt-4 text-muted">{t("course.syllabusEmpty")}</p>
        ) : (
          <>
            <p className="mt-2 text-sm text-muted">
              <span>{t("course.lessonCount", { count: lessonTotal })}</span>
              <span aria-hidden className="px-1">
                ·
              </span>
              <span>{t("course.duration", { minutes })}</span>
            </p>
            <div className="mt-8 flex flex-col gap-8">
              {modules.map((module) => (
                <section key={module.slug} aria-labelledby={`module-${module.slug}`}>
                  <h3 id={`module-${module.slug}`} className="text-lg font-semibold">
                    {module.title[locale]}
                  </h3>
                  <ol className="mt-3 list-decimal ps-5">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.slug} className="border-t border-border py-3">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="font-medium">{lesson.title[locale]}</span>
                          <span className="text-sm text-muted">
                            <span>{t(`course.type.${lesson.type}`)}</span>
                            <span aria-hidden className="px-1">
                              ·
                            </span>
                            <span>{t("course.duration", { minutes: lesson.durationMinutes })}</span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
