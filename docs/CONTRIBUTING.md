# Contributing to LADF

Thanks for your interest in contributing! This guide summarizes how to run checks and keep PRs aligned with existing repo conventions.

## Quick start

```bash
npm install
npm run lint
npm run test
npm run build
```

**Verified in repo:** `package.json`, `.github/workflows/ci.yml`.

## Scripts (what they do)

From `package.json`:

- `npm run dev` / `npm run start` — run Vite dev server.
- `npm run build` — build the example app.
- `npm run build:lib` — build the LADF library for `dist/`.
- `npm run lint` — ESLint check.
- `npm run test` — Vitest (unit tests).
- `npm run smoke:consumer` — ensure `npm pack` includes `dist/index.js` and `dist/styles.css`.
- `npm run test:css` — pack tarball, install in consumer app, run Playwright CSS test.

**Verified in repo:** `package.json`, `scripts/smoke-consumer.mjs`, `scripts/test-css-import.mjs`.

## Branching + commit conventions

No explicit branching or commit message conventions were found in the repo.

**Not found in repo; omitted.**

## Test matrix expectations

CI currently runs these checks:

```bash
npm run lint
npm run test
npm run build
```

**Verified in repo:** `.github/workflows/ci.yml`.

Locally, the repo also exposes consumer smoke and CSS tests (recommended before PRs):

```bash
npm run build:lib
npm run smoke:consumer
npm run test:css
```

**Verified in repo:** `package.json`.

## Adding a regression test

When you change a component, hook, or query behavior:

- **Unit tests (Vitest):** add/extend tests under `src/framework/__tests__/`.
- **CSS behavior:** update or add a Playwright test in `tests/` if styles or theme behavior change.
- **Consumer flows:** validate in `examples/consumer-app` or `examples/finance-app`.

**Verified in repo:** `src/framework/__tests__/`, `tests/`, `examples/consumer-app/`, `examples/finance-app/`.

## Common gotchas

- **Forgetting to run `build:lib` before `npm pack`.** The tarball and CSS tests expect `dist/` to exist. **Verified in repo:** `scripts/smoke-consumer.mjs`, `scripts/test-css-import.mjs`.
- **Inline styles are discouraged, but there is no lint rule enforcing it.** Follow the repo constraints in README. **Verified in repo:** `README.md`, `eslint.config.js`.

## File map (where to look)

- `.github/workflows/ci.yml` — CI checks and Node version.
- `package.json` — scripts and dependencies.
- `scripts/` — smoke + CSS test scripts.
- `tests/` — Playwright tests.
- `src/framework/__tests__/` — Vitest tests.
- `examples/` — consumer apps for manual validation.
