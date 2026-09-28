import { getFeaturedCourses } from "@/api/courses";
import { CourseCard } from "@/components/course-card";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getTranslations } from "next-intl/server";
import { ForwardIcon, HeroIllustration, StarIcon } from "./illustrations";

export default async function Home() {
  const t = await getTranslations("home");
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
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
