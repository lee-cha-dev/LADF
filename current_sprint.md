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
- `eslint.config.js` (or equivalent)
- `.prettierrc*`, `.prettierignore`
- `vitest.config.js`
- `vitest.setup.js`
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
- Uses `npm ci` and respects lockfile policy.

### Notes
- If lockfile is required: use `npm ci`.
- If lockfile is intentionally not used: use `npm install` and document it (but this repo currently has `package-lock.json`).

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
- `src/framework/core/query/DataProvider.js`
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

# Documentation Sprint — Full Project JSDoc

Objective: produce **high-quality JSDoc documentation** for the entire RADF codebase (framework + example app) so new contributors and consumers can understand APIs, contracts, and extension points quickly.

Rules:
- Use **JSDoc** (not TypeScript).
- Prefer **module-level** docs + **public API** docs over commenting every trivial line.
- Document **contracts**, **inputs/outputs**, **side effects**, **error cases**, and **examples**.
- When a file exports multiple things, add a short “Exports” section at top.
- Keep docs consistent across folders (types, naming, tags).
- Do not change runtime behavior except where absolutely necessary to make docs accurate.

## JSDoc style requirement (classes + functions)

You prefer JSDoc on **classes** and **methods/functions** (not just modules). Apply the following consistently:

### General rules
- Every **exported** function/class/component must have JSDoc.
- Every **class** must have:
  - Class-level JSDoc describing purpose + lifecycle + side effects.
  - JSDoc for constructor params (if any).
  - JSDoc for each public method.
- Non-exported helpers: document only if non-trivial or reused across modules.

### Function documentation checklist
For each exported function:
- `@param` for every parameter (include shapes via `@typedef` where possible)
- `@returns` with explicit shape
- `@throws` when it can throw
- `@example` for consumer-facing functions

### Class documentation checklist
For each exported class:
- Class-level doc + `@module` at file top
- Document:
  - constructor signature and invariants
  - public methods and their contracts
  - mutable state and side effects
  - async behavior (promises, abort signals, caching, etc.)
- Use `@private` for internal methods if you keep them on the class

### React components
- JSDoc the component function and define `Props` typedef:
  - `/** @typedef {Object} MyComponentProps ... */`
  - `/** @param {MyComponentProps} props */`

### Typedef strategy
- Prefer shared typedefs from the canonical file created in `feature/docs-jsdoc-foundation`
- Reference typedefs via JSDoc (no runtime imports required)

Deliverables:
- Consistent JSDoc coverage across **framework/core** (primary), then app/example.
- A small canonical typedef module containing shared shapes referenced throughout.
- README section: “API / Extension Points” linking to the main modules.

---

## feature/docs-jsdoc-foundation

### Goal
Create the shared documentation foundation: typedefs, standards, and first pass on entrypoints.

### Scope / Tasks
- Add a canonical typedef file for commonly referenced shapes:
  - QuerySpec, QueryResult, ProviderResult, Dataset, Dimension, Metric, DashboardConfig, PanelConfig, VizConfig, InsightConfig
  - DashboardState, DashboardAction, SelectionState, DrilldownState
- Add module headers to entrypoints and “public surface” modules.
- Add a short README section describing where the docs live and how to read them.

### Files
- New: `src/framework/core/docs/jsdocTypes.js` (or similar canonical location)
- `src/main.jsx`, `src/routes.jsx`, `src/App.jsx`
- `README.md`

### Acceptance Criteria
- There is exactly one canonical place for shared typedefs.
- Entry points explain how RADF boots, registers charts/insights, and renders routes.
- No behavior changes.

---

## feature/docs-dashboard-core

### Goal
Document the dashboard state system (provider/reducer/actions/selectors/hooks) so consumers know how to integrate and extend.

### Scope / Tasks
- Add JSDoc for:
  - `DashboardContext.js`
  - `DashboardProvider.jsx`
  - `dashboardReducer.js`
  - `dashboardActions.js`
  - `dashboardSelectors.js`
  - `useDashboardActions.js`
  - `useDashboardState.js`
- Document:
  - state shape
  - supported actions and what they do
  - selector contracts (inputs/outputs)
  - provider responsibilities and usage examples

### Files
- `src/framework/core/dashboard/*`

### Acceptance Criteria
- A new dev can answer: “Where does state live?”, “How do I dispatch?”, “How do I read derived state?”
- Each exported function/class has JSDoc with accurate types and examples where appropriate.
- Class methods (if any) are documented.

---

## feature/docs-query-layer

### Goal
Document the entire query layer: QuerySpec creation/normalization/hash/cache/useQuery and the DataProvider contract.

### Scope / Tasks
- Add JSDoc for:
  - `DataProvider.js` (contract) + `MockDataProvider.js`
  - `QuerySpec.js`
  - `buildQuerySpec.js`
  - `normalizeQuerySpec.js`
  - `hashQuerySpec.js`
  - `cache.js`
  - `useQuery.js`
  - `transforms/*` + `transforms/index.js`
- Must include:
  - QuerySpec shape (typedef)
  - ProviderResult shape (rows/meta/errors)
  - caching semantics (stale, keying, eviction expectations)
  - abort behavior / side effects
  - transform contracts (input rows -> output rows)

### Files
- `src/framework/core/query/**`

### Acceptance Criteria
- DataProvider contract is crystal clear (methods, expected args, return shape, error handling).
- useQuery documents lifecycle: cache hit, fetch, abort, stale rules, validation expectations.
- Transforms list their supported options and sample usage.
- If there are classes, their methods are documented.

---

## feature/docs-interactions

### Goal
Document interaction utilities and UI components: cross-filter, drilldown, brush zoom, chips, breadcrumbs.

### Scope / Tasks
- Add JSDoc for:
  - `brushZoom.js`
  - `crossFilter.js`
  - `drilldown.js`
  - `SelectionChips.jsx`
  - `DrillBreadcrumbs.jsx`
- Document:
  - selection shapes
  - expected inputs/outputs
  - edge cases (empty selection, multi-select, hierarchy navigation)
  - usage in dashboards (short examples)

### Files
- `src/framework/core/interactions/**`

### Acceptance Criteria
- Utility functions read like small APIs with clear contracts.
- Components document props, expected state integration, and typical placement.

---

## feature/docs-insights

### Goal
Document the insights engine (analyzers + panel + hook) so new analyzers can be added safely.

### Scope / Tasks
- Add JSDoc for:
  - `InsightEngine.js`
  - `useInsights.js`
  - `InsightsPanel.jsx`
  - `analyzers/*` + `analysisUtils.js`
- Document:
  - analyzer interface (inputs: data/context/config; outputs: insights array)
  - severity/priority conventions
  - how analyzers are registered
  - expected result shapes and UI rendering assumptions

### Files
- `src/framework/core/insights/**`

### Acceptance Criteria
- A dev can implement a new analyzer using docs alone.
- Registration pathway and analyzer lifecycle are documented.
- If there are classes, their methods are documented.

---

## feature/docs-registry-and-viz

### Goal
Document visualization registry + renderer + core chart panels and shared chart components.

### Scope / Tasks
- Add JSDoc for:
  - `registry/registry.js`, `registerCharts.js`, `registerInsights.js`
  - `viz/VizRenderer.jsx`
  - `viz/charts/*`
  - `viz/common/*`
  - `viz/palettes/*`
  - `viz/legend/*`
- Document:
  - how to register a new viz type
  - viz config shape (panel config, series config, axes, formatting)
  - renderer behavior when missing registry entries
  - palette assignment rules + customization points

### Files
- `src/framework/core/registry/**`
- `src/framework/core/viz/**`

### Acceptance Criteria
- Clear extension guide: “How to add a chart type” end-to-end.
- Public props for panels and renderer are documented.
- Palette logic is understandable and consistent.

---

## feature/docs-layout-and-error-handling

### Goal
Document layout components and the error boundary states so consumers know what is framework UI vs app UI.

### Scope / Tasks
- Add JSDoc for:
  - `layout/*` components (Panel, GridLayout, Loading/Error states, EmptyState)
  - `ErrorBoundary.jsx` including reset behavior
- Document:
  - component responsibilities
  - expected props
  - styling assumptions (CSS classes used)

### Files
- `src/framework/core/layout/**`

### Acceptance Criteria
- Layout components have concise, accurate docs and prop definitions.
- ErrorBoundary explains fallback behavior and integration.

---

## feature/docs-model-layer

### Goal
Document the semantic/model layer (dataset/dimensions/metrics) and validation helpers.

### Scope / Tasks
- Add JSDoc for:
  - `createDataset.js`
  - `createDimension.js`
  - `createMetric.js`
  - `fieldTypes.js`
  - `hierarchies.js`
- Document:
  - schema expectations
  - required fields
  - examples for defining a dataset and referencing it in dashboards

### Files
- `src/framework/core/model/**`

### Acceptance Criteria
- A consumer can define datasets/metrics/dimensions correctly from docs + examples.

---

## feature/docs-example-app

### Goal
Document the example dashboard and app-level usage patterns (how a consumer would wire RADF).

### Scope / Tasks
- Add JSDoc for:
  - `src/app/pages/DashboardPage.jsx`
  - `src/app/dashboards/example/*` (dashboard/dataset/dimensions/metrics/filter bar)
- Document:
  - where dashboard config lives
  - how example dataset maps to panels + filters + interactions
  - how to clone the example to create a new dashboard

### Files
- `src/app/**`

### Acceptance Criteria
- The example becomes a “living tutorial.”
- Clear instructions: “copy this folder and replace X/Y/Z.”

---

# Suggested Execution Order (least dependencies → most)

## Core sprint (quality + reliability)
1. `feature/tooling-quality-gates`
2. `feature/theme-namespace-standardization`
3. `feature/root-element-guard`
4. `feature/query-cache-eviction`
5. `feature/provider-result-validation`
6. `feature/ci-workflow`
7. `feature/core-tests-query-and-interactions`
8. `feature/dashboard-selectors`
9. `feature/distribution-docs`

## Documentation sprint (JSDoc)
1. `feature/docs-jsdoc-foundation`
2. `feature/docs-query-layer`
3. `feature/docs-dashboard-core`
4. `feature/docs-registry-and-viz`
5. `feature/docs-interactions`
6. `feature/docs-insights`
7. `feature/docs-layout-and-error-handling`
8. `feature/docs-model-layer`
9. `feature/docs-example-app`

---

# Definition of Done (Documentation Sprint) — Updated

- Every file in `src/framework/core/**` has:
  - module header (or clear top-level summary)
  - JSDoc for **each exported class/function/component**
  - JSDoc for **class methods** (public; private if non-trivial)
  - typedef references used consistently for shared shapes
- README includes an “API / Extension Points” section pointing to the primary modules.
- No behavior changes unless required to fix doc inaccuracies (and if so, documented in PR notes).
