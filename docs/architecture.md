# Architecture

Vela is a student course platform. UI is English and Arabic; the brand name stays **Vela** in both.

## Layout

- `src/app` — routes, layouts, and that segment’s `loading.tsx` / `error.tsx` / `not-found.tsx`. Feature UI does not live here. `[locale]/[...rest]` calls `notFound()` so unknown paths keep the locale layout.
- `[locale]/layout.tsx` owns the app shell: skip link, header (wordmark, nav, account, language switcher, mobile menu), a single `<main id="main">`, and footer. Pages and recovery UI do not wrap another `<main>`.
- `src/modules/<feature>` — page-level UI. Home is the marketing landing: introduction, catalog link, and featured courses. The catalog at `/courses` lists every course and filters it from the URL. `/courses/[slug]` is one course: facts, syllabus, and Course JSON-LD. `/sign-in` and `/sign-up` are the simulated account forms.
- `src/components` — shared widgets. A parent owns a folder (`site-header/`); leaf widgets stay as files (`skip-link.tsx`, `site-footer.tsx`, `course-card.tsx`). Radix Dialog is used only for the mobile nav. Home and the catalog both render `CourseCard`.
- `src/lib/nav-items.ts` — the public Home/Courses links shared by header and footer (not a component).
- `src/content` — UI copy (`en.json` / `ar.json`).
- `src/data` — temporary in-memory store (bilingual course records and the simulated student list).
- `src/api` — the only data layer the UI may call.
- `src/paths.ts` — locale-unprefixed path helpers used with next-intl `Link`. Nav hrefs come from here; current-page matching lives in the nav UI.

Server Components are the default. `"use client"` only on the file that uses client APIs. One `getTranslations()` when mixing root and nested keys (`t("brandName")`, `t("shell.footerNav")`). Header, account, and footer nav landmarks use different labels (`shell.mainNav`, `shell.accountNav`, `shell.footerNav`). The account nav is the signed-out header links.

## Data access

Modules and pages import from `src/api/*`, never from `src/data/*`. Course records stay in `src/data` so later phases can swap the store without touching UI.

## Cache Components

`cacheComponents` is on. Public course reads (`getCourses`, `getFeaturedCourses`, `getCourseBySlug`) use `'use cache'` so those results can join the static shell. Those reads return bilingual records in catalog order; the page applies the locale. `category` is a stable id (labels live in `course.category`), so catalog query values do not change with the locale. The catalog page filters `getCourses()` in memory. It awaits `searchParams` inside `<Suspense>` so the heading can prerender. Locales are listed in `generateStaticParams` so `/en` and `/ar` prerender.

`[locale]/loading.tsx` and `error.tsx` are the home segment’s recovery UI (the skeleton matches the landing). `[locale]/courses/loading.tsx` and `error.tsx` cover the catalog. `[locale]/courses/[slug]` reads `getCourseBySlug` and prerenders every catalog slug from `generateStaticParams`. An unknown slug calls `notFound()` and that segment’s `not-found.tsx`; the segment also has its own `loading.tsx` and `error.tsx`. The document title is `Vela · {title}`. JSON-LD describes the course and its syllabus. Lessons are an outline, not links.

## Auth

Sign-in and sign-up are simulated. `src/data/users.ts` holds an in-memory student list: a seed student, plus anyone who registers during this server process. Passwords stay in that list. `src/lib/session.ts` seals `{ id, name, email, exp }` into the `vela_session` cookie. The header reads it with `getSession()` inside the existing Suspense boundary. `src/proxy.ts` checks the same cookie and then hands the request to next-intl: `/dashboard`, `/learn`, and `/checkout` redirect to sign-in with a `next` path; sign-in and sign-up redirect home when the cookie is already valid. Those private pages arrive in later phases. Until then a signed-in visit falls through to the locale not-found.
