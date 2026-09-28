import { getFeaturedCourses } from "@/api/courses";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  // Arabic currency patterns reorder "$" and "US". Latin USD stays readable in both directions.
  const formatPrice = await getFormatter({ locale: "en" });
  const featured = await getFeaturedCourses();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("headline")}</h1>
        <p className="mt-4 text-lg text-muted">{t("intro")}</p>
        <Link
          href={paths.catalog()}
          className="mt-8 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
        >
          {t("browseCourses")}
        </Link>
      </section>

      <section className="mt-16" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="text-2xl font-semibold tracking-tight">
          {t("featuredHeading")}
        </h2>
        {featured.length === 0 ? (
          <p className="mt-4 max-w-2xl text-muted">{t("featuredEmpty")}</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <li key={course.slug}>
                <article className="flex h-full flex-col rounded-sm border border-border p-5">
                  <p className="text-sm text-muted">
                    <span>{course.category[locale]}</span>
                    <span aria-hidden className="px-1">
                      ·
                    </span>
                    <span>{t(`level.${course.level}`)}</span>
                  </p>
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
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
