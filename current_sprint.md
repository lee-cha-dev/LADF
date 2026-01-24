# RADF — Current Sprint (Codex)

This sprint is organized by branch. Each branch should be a focused PR with clear acceptance criteria.

Conventions:
- Branch name format: `feature/{feature_name}`
- Keep changes scoped; avoid drive-by refactors.
- No TypeScript. No Tailwind. No inline styles.
- Prefer small, reviewable commits.

---

## feature/tooling-quality-gates

### Goal
Add baseline quality gates for developer experience and CI readiness: ESLint, Prettier, Vitest, Testing Library.

### Scope / Tasks
- Add ESLint config suitable for React + modern JS.
- Add Prettier config + ignore rules.
- Add Vitest + React Testing Library setup.
- Add npm scripts:
  - `lint`, `lint:fix`
  - `format`, `format:check`
  - `test`, `test:watch`
- Ensure the repo runs cleanly:
  - `npm run lint`
  - `npm run format:check`
  - `npm run test`
  - `npm run build`

### Files
- `package.json` (deps + scripts)
- `.eslintrc.*` (or `eslint.config.*`)
- `.prettierrc*`, `.prettierignore`
- `vitest.config.*`
- `src/**` (only if lint fixes are required)
- Optional:
  - `.editorconfig`
  - `README.md` (brief “Tooling” section)

### Acceptance Criteria
- Lint/format/test scripts exist and pass on a clean install.
- No noisy rules that fight the existing code style (keep it pragmatic).
- Tests can run in CI without a browser.
- No behavior changes to the framework.

### Notes
- Prefer minimal rule set + incremental strictness.
- If adding aliases (like `@/`), ensure Vite/Vitest both resolve them.

---

## feature/ci-workflow

### Goal
Add a GitHub Actions workflow to run lint + tests + build on PRs.

### Scope / Tasks
- Add CI workflow that runs on:
  - `pull_request`
  - `push` to main branches (if applicable)
- Steps:
  - Checkout
  - Setup Node (LTS)
  - Install (`npm ci`)
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - Optional: `npm audit --production` (non-blocking or warning-only, depending on tolerance)

### Files
- `.github/workflows/ci.yml`

### Acceptance Criteria
- CI runs successfully on a fresh runner.
- Workflow is fast and deterministic.
- Uses `npm ci` and respects lockfile policy (see Notes).

### Notes
- If the repo doesn’t currently have a lockfile and you intend to keep it that way, CI should use `npm install` instead of `npm ci`.
- If you decide to introduce a lockfile as part of “quality gates,” do it intentionally and document it.

---

## feature/theme-namespace-standardization

### Goal
Eliminate confusion by standardizing theme class naming between docs and the app.

### Decision (implement in this branch)
- Pick ONE theme namespace:
  - Recommended: `radf-theme-*` (aligns with framework identity and README)
- Update code + docs so there is a single source of truth.

### Scope / Tasks
- Update app theme toggle constant to match the chosen namespace.
- Update README theming instructions to match the actual implementation.
- Remove unused/duplicate theme class definitions to prevent drift.

### Files
- `src/App.jsx`
- `src/framework/styles/**` (theme CSS files)
- `README.md`

### Acceptance Criteria
- README theming instructions match runtime behavior.
- Only one theme namespace remains in codebase.
- Example app toggles themes correctly.

### Notes
- Keep class naming consistent: `radf-theme-light`, `radf-theme-dark` (or similar).
- If themes are also used in the example config, ensure nothing breaks.

---

## feature/root-element-guard

### Goal
Improve resilience: add a defensive guard if `#root` is missing.

### Scope / Tasks
- In `src/main.jsx`, check for `document.getElementById("root")`.
- If missing, throw a descriptive error OR render a simple fallback message.

### Files
- `src/main.jsx`

### Acceptance Criteria
- If `#root` is missing, the error message is clear and actionable.
- Normal behavior unchanged when `#root` exists.

### Notes
- Prefer a clear thrown error during startup (easy to diagnose).

---

## feature/query-cache-eviction

### Goal
Prevent memory growth by adding bounded eviction (LRU and/or TTL) to the query cache.

### Scope / Tasks
- Implement an eviction strategy in `core/query/cache.js`:
  - Option A (recommended): LRU with a `maxSize` (e.g., 250–1000 configurable)
  - Option B: TTL expiration (e.g., 5–30 minutes) + pruning
  - Option C: LRU + TTL (best, but keep it simple)
- Ensure `useQuery` calls `cache.prune()` (or equivalent) when inserting.
- Expose minimal cache API:
  - `get`, `set`, `has`
  - `clear()`
  - `prune()` / `size()` (optional but helpful)

### Files
- `src/framework/core/query/cache.js`
- `src/framework/core/query/useQuery.js`

### Acceptance Criteria
- Cache size is bounded and does not grow without limit in long-lived sessions.
- No breaking changes to public APIs unless documented.
- Behavior remains correct for equivalent QuerySpecs.

### Notes
- Keep the implementation predictable and testable.
- If you change the cache key strategy, do it in a separate branch (don’t mix concerns).

---

## feature/provider-result-validation

### Goal
Detect malformed provider results early to avoid silent chart failures.

### Scope / Tasks
- Extend the DataProvider contract (docs + runtime) to support validation:
  - Option: `validateResult(result, querySpec)` callback in provider OR in `useQuery` options.
- Add lightweight runtime checks:
  - `rows` is an array (required)
  - `meta` is an object (optional)
- Decide behavior:
  - Default: `console.warn` + return empty result (safer for dashboards)
  - Optional: strict mode that throws

### Files
- `src/framework/core/query/useQuery.js`
- `src/framework/core/query/*` (if contract docs exist here)
- `README.md` (or DataProvider docs section)

### Acceptance Criteria
- Invalid provider responses are detected and surfaced clearly.
- Default behavior does not hard-crash dashboards unless explicitly configured.
- Works with `MockDataProvider`.

### Notes
- Keep validation cheap; avoid heavy schema libs unless truly necessary.

---

## feature/core-tests-query-and-interactions

### Goal
Add minimal, high-value tests around core utilities to prevent regressions.

### Scope / Tasks
Add Vitest unit tests for:
- `normalizeQuerySpec`:
  - stable ordering of filters/dimensions
  - same semantic spec -> same normalized output
- `buildQuerySpec`:
  - correct construction from inputs
  - expected defaults applied
- Interactions utilities:
  - cross-filter mapping behavior
  - drilldown path derivation
  - brush range handling

### Files
- `src/framework/core/query/**`
- `src/framework/core/interactions/**`
- `src/framework/**/__tests__/**` (or preferred test folder structure)

### Acceptance Criteria
- Tests run fast and pass in CI.
- Coverage focuses on correctness of normalization/interaction logic, not UI snapshots.
- No flaky tests.

### Notes
- Avoid over-testing React rendering; target pure functions first.

---

## feature/dashboard-selectors

### Goal
Encourage memoized derived state patterns by exposing selector helpers.

### Scope / Tasks
- Add selector utilities (pure functions) for common derived state:
  - active filters summary
  - drill path labels / breadcrumbs
  - selected entities
  - derived query inputs
- Update example dashboard to use selectors (where it improves clarity/perf).

### Files
- `src/framework/core/dashboard/**` (new selectors module)
- `src/app/**` (example usage, likely DashboardPage)

### Acceptance Criteria
- Selectors are pure and easy to compose.
- Example demonstrates usage without increasing complexity.
- No breaking changes to existing reducer/state shape.

---

## feature/distribution-docs

### Goal
Clarify how consumers should adopt RADF (copy strategy vs packaging vs npm publish plan).

### Scope / Tasks
- Add a “Distribution / Packaging” section to README:
  - How to embed RADF into another React app
  - Expected folder structure
  - What to copy vs what is optional
  - Versioning guidance
- If packaging is intended soon:
  - Document future plan (do not implement full packaging unless explicitly desired)

### Files
- `README.md`

### Acceptance Criteria
- A new consumer can understand how to adopt RADF without guessing.
- Documentation aligns with the current repo reality.

---

# Sprint Ordering (suggested)

## Quick Wins (do first)
1. `feature/tooling-quality-gates`
2. `feature/theme-namespace-standardization`
3. `feature/root-element-guard`

## Next (highest leverage)
4. `feature/query-cache-eviction`
5. `feature/provider-result-validation`
6. `feature/ci-workflow`

## After (nice-to-have, but valuable)
7. `feature/core-tests-query-and-interactions`
8. `feature/dashboard-selectors`
9. `feature/distribution-docs`
