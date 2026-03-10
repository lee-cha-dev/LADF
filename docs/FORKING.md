# Forking LADF

This guide explains how to fork LADF, keep your fork in sync, and validate changes locally and inside a consuming app.

## Fork workflow (upstream + sync)

1) **Fork the repo on GitHub** (create your own fork).
2) **Clone your fork** and add the upstream remote:

```bash
git clone git@github.com:<your-username>/LADF.git
cd LADF
git remote add upstream git@github.com:lee-cha-dev/LADF.git
```

3) **Sync your fork regularly**:

```bash
git fetch upstream
# Option A: rebase your main branch
git checkout main
git rebase upstream/main

# Option B: merge upstream changes
# git merge upstream/main
```

## Local setup

### Node version

LADF does not include a `.nvmrc`/`volta` file; CI uses the Node.js LTS line (`lts/*`).

**Verified in repo:** `.github/workflows/ci.yml`.

### Install + build

```bash
npm install
npm run build:lib
```

### Repo layout (at a glance)

- `src/` — LADF source (exports, core logic, styles).
- `examples/consumer-app/` — minimal consumer app that installs LADF from Git.
- `examples/finance-app/` — fuller demo app showing insights, drilldowns, and filters.
- `scripts/` — smoke and CSS import checks.

**Verified in repo:** `src/`, `examples/`, `scripts/`.

## Run all repo checks

The repo exposes these checks in `package.json`:

```bash
npm run lint
npm run test
npm run build
npm run build:lib
npm run smoke:consumer
npm run test:css
```

**Verified in repo:** `package.json`, `scripts/smoke-consumer.mjs`, `scripts/test-css-import.mjs`.

## Validate changes in the consumer example

The example at `examples/consumer-app` uses LADF as a Git dependency. You can validate your fork in two ways.

### Option A: Point the consumer app to your fork (Git URL)

1) Update `examples/consumer-app/package.json`:

```json
{
  "dependencies": {
    "ladf": "git+https://github.com/<your-username>/LADF.git"
  }
}
```

2) Install and run Vite:

```bash
cd examples/consumer-app
npm install
npm run dev
```

**Verified in repo:** `examples/consumer-app/package.json`.

### Option B: Test a packed tarball (closest to publish)

LADF includes a Playwright-based CSS check that packs the library, installs it into the consumer app, and verifies computed styles.

```bash
npm run test:css
```

Under the hood, this uses `npm pack` + a `file:` dependency to the tarball.

**Verified in repo:** `scripts/test-css-import.mjs`, `tests/css-import.spec.js`, `playwright.config.js`.

## Install LADF from a forked Git URL in any consumer app

Use the same install line as README, but swap in your fork:

```bash
npm install ladf@"git+https://github.com/<your-username>/LADF.git"
```

**Verified in repo:** `README.md` (Git dependency install).

## Common gotchas

- **Forgetting to call `registerCharts()` and `registerInsights()`** leads to missing visualizations/insights at runtime. See the consumer example for correct placement. **Verified in repo:** `examples/consumer-app/src/App.jsx`.
- **Styles are required**. If you don’t import `ladf/styles.css` or rely on the JS import (which includes styles), layouts will look broken. **Verified in repo:** `README.md`, `src/index.js`.
- **`npm pack` output must include `dist/index.js` and `dist/styles.css`** for consumer installs. The smoke script enforces this. **Verified in repo:** `scripts/smoke-consumer.mjs`.

## File map (where to look)

- `README.md` — install and minimal usage summary.
- `src/index.js` — public exports (what consumers can import).
- `examples/consumer-app/` — minimal LADF usage in a real app.
- `scripts/smoke-consumer.mjs` — pack sanity check for `dist` output.
- `scripts/test-css-import.mjs` — tarball install + Playwright CSS check.
- `tests/css-import.spec.js` — CSS verification test.
