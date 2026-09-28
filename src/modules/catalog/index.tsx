import { getCourses } from "@/api/courses";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import type { CatalogSearchParams } from "./filters";
import { CatalogResults } from "./results";
import { CatalogResultsFallback } from "./skeleton";

export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const [t, courses] = await Promise.all([getTranslations(), getCourses()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{t("catalog.title")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{t("catalog.intro")}</p>
      {courses.length === 0 ? (
        <p className="mt-8 text-muted">{t("catalog.empty")}</p>
      ) : (
        // searchParams is request-time. Await it under Suspense so the heading can prerender.
        <Suspense fallback={<CatalogResultsFallback label={t("loading.label")} />}>
          <CatalogResults courses={courses} searchParams={searchParams} />
        </Suspense>
      )}
    </div>
  );
}
