# Vela

Student course platform. The brand name is **Vela** in English and Arabic — do not translate it.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `/` redirects to `/en` or `/ar` from `Accept-Language`. Visit those paths directly to switch languages.

## Stack

Next.js 16 (App Router, Cache Components), next-intl, Tailwind CSS 4. Course data is an in-memory store behind `src/api`.

Roadmap: [docs/roadmap.md](docs/roadmap.md).
