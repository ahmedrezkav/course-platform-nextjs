# Vela roadmap

Student course platform. Brand name **Vela** in English and Arabic (do not translate).

Implement **one phase per request**. Loading, error, empty, and pending UI ship with each feature — Phase 11 is not a catch-up for those.

| Phase | Scope |
| ----- | ----- |
| 1 Foundation | `src/` layout, Next 16 config, i18n/RTL, tokens, `paths.ts`, data/API boundary, agent rules, docs |
| 2 App shell | Header, footer, skip link, responsive nav, Vela wordmark |
| 3 Home | Marketing landing, featured courses, home `loading.tsx` / `error.tsx` |
| 4 Catalog | Listing, URL filters, empty/no-results, `loading.tsx` / `error.tsx` |
| 5 Course detail | Syllabus, metadata, JSON-LD, `loading.tsx` / `error.tsx` / `not-found` |
| 6 Auth | Simulated session, proxy guards, accessible forms with pending/errors |
| 7 Enrollment | Free enroll, My learning dashboard, dashboard loading/error/empty |
| 8 Demo payments | Checkout session, success/cancel, no real charges or card fields |
| 9 Player | HTML5 video + articles, progress, lesson loading/error/`not-found` |
| 10 Reviews | List + submit with pending and inline errors |
| 11 Polish | A11y/performance QA, leftover UX — not missing loading/error UI |

Out of scope for now: instructor CMS, live Stripe, real backend, tests.
