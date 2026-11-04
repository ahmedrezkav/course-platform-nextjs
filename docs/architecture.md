# Architecture

Vela is a student course platform. UI is English and Arabic; the brand name stays **Vela** in both.

## Layout

- `src/app` — routes, layouts, and that segment’s `loading.tsx` / `error.tsx` / `not-found.tsx`. Feature UI does not live here. `[locale]/[...rest]` calls `notFound()` so unknown paths keep the locale layout.
- `[locale]/layout.tsx` owns the app shell: skip link, header (wordmark, nav, account, language switcher, mobile menu), a single `<main id="main">`, and footer. Pages and recovery UI do not wrap another `<main>`.
- `src/modules/<feature>` — page-level UI. Home is the marketing landing: introduction, catalog link, and featured courses. The catalog at `/courses` lists every course and filters it from the URL. `/courses/[slug]` is one course: facts, syllabus, Course JSON-LD, free enroll, demo checkout, and reviews. `/sign-in` and `/sign-up` are the simulated account forms. `/dashboard` is My learning. `/checkout/[sessionId]`, `/checkout/success`, and `/checkout/cancel` are the demo purchase flow. `/learn/[courseSlug]/[lessonSlug]` is the lesson player.
- `src/components` — shared widgets. A parent owns a folder (`site-header/`); leaf widgets stay as files (`skip-link.tsx`, `site-footer.tsx`, `course-card.tsx`). Radix Dialog is used only for the mobile nav. Home, the catalog, and My learning render `CourseCard`.
- `src/lib/nav-items.ts` — the public Home/Courses links shared by header and footer (not a component).
- `src/content` — UI copy (`en.json` / `ar.json`).
- `src/data` — temporary in-memory store (bilingual course records, the simulated student list, free enrollments, demo checkout sessions, lesson completion, and course reviews).
- `src/api` — the only data layer the UI may call.
- `src/paths.ts` — locale-unprefixed path helpers used with next-intl `Link`. Nav hrefs come from here; current-page matching lives in the nav UI.

Server Components are the default. `"use client"` only on the file that uses client APIs. One `getTranslations()` when mixing root and nested keys (`t("brandName")`, `t("shell.footerNav")`). Header, account, and footer nav landmarks use different labels (`shell.mainNav`, `shell.accountNav`, `shell.footerNav`). The account nav is the header's sign-in links, or My learning and sign out when a session is open.

## Data access

Modules and pages import from `src/api/*`, never from `src/data/*`. Course records stay in `src/data` so later phases can swap the store without touching UI.

## Cache Components

`cacheComponents` is on. Public course reads (`getCourses`, `getFeaturedCourses`, `getCourseBySlug`) use `'use cache'` so those results can join the static shell. Those reads return bilingual records in catalog order; the page applies the locale. `category` is a stable id (labels live in `course.category`), so catalog query values do not change with the locale. The catalog page filters `getCourses()` in memory. It awaits `searchParams` inside `<Suspense>` so the heading can prerender. Locales are listed in `generateStaticParams` so `/en` and `/ar` prerender.

`[locale]/loading.tsx` and `error.tsx` are the home segment’s recovery UI (the skeleton matches the landing). `[locale]/courses/loading.tsx` and `error.tsx` cover the catalog. `[locale]/courses/[slug]` reads `getCourseBySlug` and prerenders every catalog slug from `generateStaticParams`. An unknown slug calls `notFound()` and that segment’s `not-found.tsx`; the segment also has its own `loading.tsx` and `error.tsx`. The document title is `Vela · {title}`. JSON-LD describes the course and its syllabus. Syllabus titles link to the lesson player. The lesson body is shown only to an enrolled student.

## Auth

Sign-in and sign-up are simulated. `src/data/users.ts` holds an in-memory student list: a seed student, plus anyone who registers during this server process. Passwords stay in that list. `src/lib/session.ts` seals `{ id, name, email, exp }` into the `vela_session` cookie. The header reads it with `getSession()` inside the existing Suspense boundary. `src/proxy.ts` checks the same cookie and then hands the request to next-intl: `/dashboard`, `/learn`, and `/checkout` redirect to sign-in with a `next` path; sign-in and sign-up redirect home when the cookie is already valid. A signed-in visit to bare `/learn` or `/checkout` still falls through to the locale not-found. `next` may also be a course path or a lesson path, so sign-in can return to the page the student was viewing.

## Enrollment

A free course (`price === 0`) shows an enroll control. That control reads the session cookie inside `<Suspense>`, so the rest of the course page can still prerender. Signed out, it links to sign-in. Signed in, `enrollFree` writes `{ userId, courseSlug }` to `src/data/enrollments.ts` and redirects to `/dashboard`. Paid courses use demo checkout instead of `enrollFree`. Rows are process memory, not part of the cookie; a restart clears them. My learning lists the joined catalog records for the cookie's student id, with lesson progress and a continue link when the course has lessons, and an empty state when there are none. That segment has its own loading and error UI. The header account landmark links there when a session is open.

## Checkout

A paid course (`price > 0`) offers demo checkout from the same kind of suspended session read. `startCheckout` writes `{ id, userId, courseSlug, amount, status }` to `src/data/checkouts.ts` and redirects to `/checkout/{id}`. Completing an open session enrolls the student and opens `/checkout/success`. Canceling opens `/checkout/cancel`. No card field is rendered, and nothing is charged. An open session is reused only while its amount still matches the course. Rows are process memory, not part of the cookie. `/checkout` is a private prefix, so the session, success, and cancel pages require a signed-in student. Success and cancel are static segments, so `[sessionId]` does not capture them. Those segments have their own loading and error UI. An unknown session calls `notFound()`.

## Player

`/learn/{courseSlug}/{lessonSlug}` plays one lesson for an enrolled student. The title, type, and duration come from the cached catalog and can prerender. The session cookie and completion rows are read under `<Suspense>`. A student who is not enrolled sees a short locked message; the video and the article body are not rendered. Video lessons use a native `<video>` element. Article bodies are text blocks, not HTML. `markLessonComplete` writes `{ userId, courseSlug, lessonSlug }` to `src/data/progress.ts`. Rows are process memory, not part of the cookie. Continue learning opens the first incomplete lesson, or the first lesson when every lesson is complete. The segment has its own loading, error, and not-found UI. An unknown course or lesson calls `notFound()`. Bare `/learn` still has no page.

## Reviews

The course page lists reviews under the syllabus. The heading can prerender. The list and the form read process memory and the session cookie inside `<Suspense>`. A signed-out student sees a sign-in link. A signed-in student who is not enrolled sees a short message and no form. An enrolled student submits one review. `submitReview` checks the rating and the text and returns field errors; a valid review is written to `src/data/reviews.ts` and the page opens again at `#reviews`. A second submit from the same student updates that row. Rows are process memory, not part of the cookie. Catalog cards and the course JSON-LD do not include them.

## Polish

Borders are at least 3:1 against the canvas in both schemes, so inputs, cards, and chips stay identifiable. `color-scheme` and the viewport `themeColor` follow the same light and dark canvas, including native video controls. `scroll-padding-top` on `html` clears the sticky header for focus and in-page hashes. Skeleton pulse stops when the user prefers reduced motion. In-content links are underlined. Header, footer, and account links stay in their navs. A course card is one link; the title covers the card. Catalog filter names are not headings. My learning’s course count is the heading between the page title and the cards. IBM Plex loads weights 400, 500, and 600.
