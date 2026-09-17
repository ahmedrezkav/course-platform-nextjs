<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Vela

Student course platform. Brand name is **Vela** in English and Arabic — do not translate it.

## Workflow

- Implement **one roadmap phase per request**. See [docs/roadmap.md](docs/roadmap.md).
- Do not add tests. Do not push until asked.
- Loading, error, empty, and pending UI ship in the **same phase** as the feature.
- Git: branch `feat/phase-0N-<slug>` from `master`, commit on that branch, merge into `master` when the phase is done. Do not stack a new phase on the previous phase branch after `master` has caught up.

## Conventions

Full rules: [`.cursor/rules/vela.mdc`](.cursor/rules/vela.mdc).

- `src/app` is routing only. Feature UI lives in `src/modules/<feature>/`.
- Server Components by default. Client components only for real interactivity.
- UI talks to `src/api/*` only. `src/data/*` is a temporary store.
- Routes go through `src/paths.ts`. Copy lives in `src/content/`.
- Read `node_modules/next/dist/docs/` before using Next.js APIs (this is Next 16).
