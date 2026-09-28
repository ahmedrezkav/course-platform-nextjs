# Architecture

Vela is a student course platform. UI is English and Arabic; the brand name stays **Vela** in both.

## Layout

- `src/app` — routes, layouts, and that segment’s `loading.tsx` / `error.tsx` / `not-found.tsx`. Feature UI does not live here. `[locale]/[...rest]` calls `notFound()` so unknown paths keep the locale layout.
- `[locale]/layout.tsx` owns the app shell: skip link, header (wordmark, nav, language switcher, mobile menu), a single `<main id="main">`, and footer. Pages and recovery UI do not wrap another `<main>`.
- `src/modules/<feature>` — page-level UI. Home is the marketing landing: introduction, catalog link, and featured courses.
- `src/components` — shared widgets. A parent owns a folder (`site-header/`); leaf widgets stay as files (`skip-link.tsx`, `site-footer.tsx`). Radix Dialog is used only for the mobile nav.
- `src/lib/nav-items.ts` — the public Home/Courses links shared by header and footer (not a component).
- `src/content` — UI copy (`en.json` / `ar.json`).
- `src/data` — temporary in-memory store (bilingual course records).
- `src/api` — the only data layer the UI may call.
- `src/paths.ts` — locale-unprefixed path helpers used with next-intl `Link`. Nav hrefs come from here; current-page matching lives in the nav UI.

Server Components are the default. `"use client"` only on the file that uses client APIs. One `getTranslations()` when mixing root and nested keys (`t("brandName")`, `t("shell.footerNav")`). Header and footer nav landmarks use different labels (`shell.mainNav` vs `shell.footerNav`).

## Data access

Modules and pages import from `src/api/*`, never from `src/data/*`. Course records stay in `src/data` so later phases can swap the store without touching UI.

## Cache Components

`cacheComponents` is on. Public course reads (`getCourses`, `getFeaturedCourses`, `getCourseBySlug`) use `'use cache'` so those results can join the static shell. Featured reads return bilingual records in catalog order; the home page applies the locale. Locales are listed in `generateStaticParams` so `/en` and `/ar` prerender.

`[locale]/loading.tsx` and `error.tsx` are the home segment’s recovery UI (the skeleton matches the landing). Nested routes add their own files in later phases. Catalog and course links from home 404 until those pages exist.
