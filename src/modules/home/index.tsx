import { getFeaturedCourses } from "@/api/courses";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { CourseIcon, ForwardIcon, HeroIllustration, StarIcon } from "./illustrations";

export default async function Home() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  // Arabic currency patterns reorder "$" and "US". Latin USD stays readable in both directions.
  const formatPrice = await getFormatter({ locale: "en" });
  const featured = await getFeaturedCourses();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,22rem)]">
        <section className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("headline")}</h1>
          <p className="mt-4 text-lg text-muted">{t("intro")}</p>
          <Link
            href={paths.catalog()}
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-canvas"
          >
            {t("browseCourses")}
            <ForwardIcon />
          </Link>
        </section>
        <HeroIllustration />
      </div>

      <section className="mt-16" aria-labelledby="featured-heading">
        <h2
          id="featured-heading"
          className="flex items-center gap-2 text-2xl font-semibold tracking-tight"
        >
          <StarIcon />
          {t("featuredHeading")}
        </h2>
        {featured.length === 0 ? (
          <p className="mt-4 max-w-2xl text-muted">{t("featuredEmpty")}</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <li key={course.slug}>
                <article className="flex h-full flex-col rounded-sm border border-border p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-primary/10 text-primary">
                      <CourseIcon slug={course.slug} />
                    </span>
                    <p className="text-sm text-muted">
                      <span>{course.category[locale]}</span>
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
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
