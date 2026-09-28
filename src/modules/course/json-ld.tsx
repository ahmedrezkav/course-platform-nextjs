import type { Course, CourseModule, Locale } from "@/data/types";

// schema.org learningResourceType is not localized. Visible labels use course.type.
const learningResourceType = {
  video: "Video",
  article: "Article",
} as const;

export function CourseJsonLd({
  course,
  modules,
  locale,
  providerName,
  level,
  category,
}: {
  course: Course;
  modules: CourseModule[];
  locale: Locale;
  providerName: string;
  level: string;
  category: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title[locale],
    description: course.description[locale],
    inLanguage: locale,
    provider: {
      "@type": "Organization",
      name: providerName,
    },
    instructor: {
      "@type": "Person",
      name: course.instructorName[locale],
    },
    educationalLevel: level,
    about: {
      "@type": "Thing",
      name: category,
    },
    isAccessibleForFree: course.price === 0,
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "USD",
    },
    ...(modules.length > 0
      ? {
          hasPart: modules.map((module) => ({
            "@type": "Syllabus",
            name: module.title[locale],
            hasPart: module.lessons.map((lesson) => ({
              "@type": "LearningResource",
              name: lesson.title[locale],
              learningResourceType: learningResourceType[lesson.type],
              timeRequired: `PT${lesson.durationMinutes}M`,
            })),
          })),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify leaves "<" intact, which can close this script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
