import { CourseCard } from "@/components/course-card";
import type { Course } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { paths } from "@/paths";
import { getTranslations } from "next-intl/server";
import {
  catalogHref,
  filterCourses,
  hasCatalogFilters,
  parseCatalogFilters,
  type CatalogPrice,
  type CatalogSearchParams,
} from "./filters";

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function FilterGroup<T extends string>({
  id,
  label,
  options,
  selected,
  hrefFor,
}: {
  id: string;
  label: string;
  options: { value: T | undefined; label: string }[];
  selected: T | undefined;
  hrefFor: (value: T | undefined) => ReturnType<typeof catalogHref>;
}) {
  return (
    <div>
      <h2 id={id} className="text-sm font-medium">
        {label}
      </h2>
      <ul aria-labelledby={id} className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option.value === selected;

          return (
            <li key={option.value ?? "all"}>
              <Link
                href={hrefFor(option.value)}
                aria-current={isSelected ? "true" : undefined}
                className={cn(
                  "inline-block rounded-sm px-3 py-1 text-sm",
                  isSelected ? "bg-primary text-canvas" : "border border-border text-foreground",
                )}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function CatalogResults({
  courses,
  searchParams,
}: {
  courses: Course[];
  searchParams: Promise<CatalogSearchParams>;
}) {
  const [raw, t] = await Promise.all([searchParams, getTranslations()]);
  const filters = parseCatalogFilters(raw);
  const matches = filterCourses(courses, filters);
  const filtered = hasCatalogFilters(filters);
  const levels = unique(courses.map((course) => course.level));
  const categories = unique(courses.map((course) => course.category));
  const prices = unique(
    courses.map((course): CatalogPrice => (course.price === 0 ? "free" : "paid")),
  );

  return (
    <>
      <section className="mt-8" aria-label={t("catalog.filtersLabel")}>
        <div className="grid gap-4 sm:grid-cols-3">
          <FilterGroup
            id="catalog-level"
            label={t("catalog.levelLabel")}
            selected={filters.level}
            options={[
              { value: undefined, label: t("catalog.all") },
              ...levels.map((level) => ({ value: level, label: t(`course.level.${level}`) })),
            ]}
            hrefFor={(level) => catalogHref({ ...filters, level })}
          />
          <FilterGroup
            id="catalog-category"
            label={t("catalog.categoryLabel")}
            selected={filters.category}
            options={[
              { value: undefined, label: t("catalog.all") },
              ...categories.map((category) => ({
                value: category,
                label: t(`course.category.${category}`),
              })),
            ]}
            hrefFor={(category) => catalogHref({ ...filters, category })}
          />
          <FilterGroup
            id="catalog-price"
            label={t("catalog.priceLabel")}
            selected={filters.price}
            options={[
              { value: undefined, label: t("catalog.all") },
              ...prices.map((price) => ({
                value: price,
                label: price === "free" ? t("course.free") : t("catalog.paid"),
              })),
            ]}
            hrefFor={(price) => catalogHref({ ...filters, price })}
          />
        </div>
      </section>

      <section className="mt-10" aria-labelledby="catalog-results">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="catalog-results" className="text-2xl font-semibold tracking-tight">
            {matches.length === 0
              ? t("catalog.noResults")
              : t("catalog.resultCount", { count: matches.length })}
          </h2>
          {filtered ? (
            <Link href={paths.catalog()} className="text-sm text-primary">
              {t("catalog.clearFilters")}
            </Link>
          ) : null}
        </div>
        {matches.length > 0 ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((course) => (
              <li key={course.slug}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </>
  );
}
