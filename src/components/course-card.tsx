import { CourseIcon } from "@/components/course-icon";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import type { Course } from "@/data/types";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";

export async function CourseCard({ course }: { course: Course }) {
  const t = await getTranslations("course");
  const locale = await getLocale();
  // Arabic currency patterns reorder "$" and "US". Latin USD stays readable in both directions.
  const formatPrice = await getFormatter({ locale: "en" });

  return (
    <article className="flex h-full flex-col rounded-sm border border-border p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-primary/10 text-primary">
          <CourseIcon slug={course.slug} />
        </span>
        <p className="text-sm text-muted">
          <span>{t(`category.${course.category}`)}</span>
          <span aria-hidden className="px-1">
            ·
          </span>
          <span>{t(`level.${course.level}`)}</span>
        </p>
      </div>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">
        <Link href={paths.course(course.slug)} className="hover:text-primary">
          {course.title[locale]}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-muted">{course.description[locale]}</p>
      <p className="mt-4 text-sm text-muted">
        {t("taughtBy", { name: course.instructorName[locale] })}
      </p>
      {/* Store prices are numbers with no currency. USD is display-only until checkout. */}
      <p className="mt-3 font-medium">
        {course.price === 0 ? (
          t("free")
        ) : (
          <span dir="ltr">
            {formatPrice.number(course.price, { style: "currency", currency: "USD" })}
          </span>
        )}
      </p>
    </article>
  );
}
