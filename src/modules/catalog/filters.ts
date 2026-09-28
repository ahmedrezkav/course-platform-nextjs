import {
  courseCategories,
  courseLevels,
  type Course,
  type CourseCategory,
  type CourseLevel,
} from "@/data/types";
import { paths } from "@/paths";

export const catalogPrices = ["free", "paid"] as const;
export type CatalogPrice = (typeof catalogPrices)[number];

export type CatalogFilters = {
  level?: CourseLevel;
  category?: CourseCategory;
  price?: CatalogPrice;
};

export type CatalogSearchParams = {
  level?: string | string[];
  category?: string | string[];
  price?: string | string[];
  [key: string]: string | string[] | undefined;
};

function single(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

function allowed<T extends string>(value: string | undefined, options: readonly T[]) {
  if (!value) return undefined;
  return options.includes(value as T) ? (value as T) : undefined;
}

// Unknown and repeated values are ignored so a bad link still shows the catalog.
// Accepted values are locale-independent ids, not translated labels.
export function parseCatalogFilters(raw: CatalogSearchParams): CatalogFilters {
  return {
    level: allowed(single(raw.level), courseLevels),
    category: allowed(single(raw.category), courseCategories),
    price: allowed(single(raw.price), catalogPrices),
  };
}

export function hasCatalogFilters(filters: CatalogFilters) {
  return Boolean(filters.level || filters.category || filters.price);
}

export function filterCourses(courses: Course[], filters: CatalogFilters) {
  return courses.filter((course) => {
    if (filters.level && course.level !== filters.level) return false;
    if (filters.category && course.category !== filters.category) return false;
    if (filters.price === "free" && course.price !== 0) return false;
    if (filters.price === "paid" && course.price === 0) return false;
    return true;
  });
}

export function catalogHref(filters: CatalogFilters) {
  const query: Record<string, string> = {};
  if (filters.level) query.level = filters.level;
  if (filters.category) query.category = filters.category;
  if (filters.price) query.price = filters.price;
  if (Object.keys(query).length === 0) return paths.catalog();
  return { pathname: paths.catalog(), query };
}
