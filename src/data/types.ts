export type Locale = "en" | "ar";

// Bilingual fields on course/lesson records: `{ en: "...", ar: "..." }`.
// Buttons, errors, and other UI labels stay in `src/content/*.json`.
export type LocalizedString = Record<Locale, string>;

export type LessonType = "video" | "article";

type LessonBase = {
  slug: string;
  title: LocalizedString;
  durationMinutes: number;
};

export type VideoLesson = LessonBase & {
  type: "video";
  videoSrc: string;
  posterSrc: string;
  captionSrcEn?: string;
  captionSrcAr?: string;
};

export type ArticleLesson = LessonBase & {
  type: "article";
  body: LocalizedString;
};

export type Lesson = VideoLesson | ArticleLesson;

export type CourseModule = {
  slug: string;
  title: LocalizedString;
  lessons: Lesson[];
};

export const courseLevels = ["beginner", "intermediate", "advanced"] as const;
export type CourseLevel = (typeof courseLevels)[number];

// Stable ids. Labels live in content (`course.category`) so a catalog
// URL does not change when the locale changes.
export const courseCategories = ["programming", "art", "data", "design", "engineering"] as const;
export type CourseCategory = (typeof courseCategories)[number];

export type Course = {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  category: CourseCategory;
  level: CourseLevel;
  price: number;
  featured: boolean;
  instructorName: LocalizedString;
  modules: CourseModule[];
};
