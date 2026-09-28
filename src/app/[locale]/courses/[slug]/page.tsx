import { getCourseBySlug, getCourses } from "@/api/courses";
import CourseDetail from "@/modules/course";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

// Every catalog slug is known at build time, so this page can await `params`
// and prerender. A slug that is not in the catalog still matches the dynamic
// segment; notFound() renders this segment's not-found inside the locale shell.
export async function generateStaticParams() {
  const courses = await getCourses();

  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/courses/[slug]">) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  return {
    title: { absolute: `${t("brandName")} · ${course.title[locale]}` },
    description: course.description[locale],
  };
}

export default async function Page({ params }: PageProps<"/[locale]/courses/[slug]">) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}
