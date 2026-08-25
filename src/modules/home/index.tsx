import { getTranslations } from "next-intl/server";
import { getCourses } from "@/api/courses";

export default async function Home() {
  const t = await getTranslations();
  const courses = await getCourses();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">{t("brandName")}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{t("home.intro")}</p>
      <p className="mt-6">{t("home.courseCount", { count: courses.length })}</p>
    </main>
  );
}
