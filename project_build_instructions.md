# Recharts Analytics Dashboard Framework (RADF)
PowerBI-style analytics dashboards in **React (JavaScript)** + **Recharts** + **plain CSS** (no Tailwind, no inline styles)

> **Purpose:** This document is the single source of truth for an AI (or human) to build the project end-to-end.  
> **Non-negotiables:** JavaScript-only (NO TypeScript), Recharts for charts, CSS files for styling (NO Tailwind, NO inline styles), config-driven dashboards, drilldown + cross-filtering + insights.

---

## 0) What We Are Building

A reusable framework to build analytics dashboards that feel like PowerBI:
- Config-driven dashboards (compose panels from a config file)
- Semantic layer (metrics/dimensions/hierarchies defined once)
- Query layer (QuerySpec -> fetch -> normalize -> transforms -> cache)
- Interactions (cross-filtering, drilldown, brush/zoom)
- Insight engine (pluggable analyzers producing “insight cards”)
- Layout system (grid panels + panel chrome)
- Theme + design tokens via CSS variables
- Performance and safety (stable hashing, memoization, AbortController, SWR caching)

The result should allow new dashboards to be created primarily via:
- `dataset.js`, `metrics.js`, `dimensions.js`
- `dashboard.config.js`
- optionally custom panels/analyzers registered in a registry

---

## 1) Tech Stack & Constraints

### Stack
- React 18+
- Recharts
- Plain CSS files
- Optional: lightweight router (React Router) for drilldown routes (recommended)
- Optional: date utility (date-fns) (recommended)
- Optional: formatting utility (Intl APIs preferred)

### Hard Constraints
- **NO TypeScript**
- **NO Tailwind**
- **NO inline styles** (use `className`, CSS files)
- Charts are Recharts-based
- Data fetching must support **AbortController**
- Must avoid fetch storms (stable QuerySpec hashing + memoized selectors + caching)

### Performance & Quality Rules
- No panel fetches directly in the chart component. Fetch in hooks/controllers.
- All query cache keys are deterministic and stable (hash of normalized QuerySpec).
- All global/dashboard state updates are reducer-driven (pure reducer).
- Derived state uses selectors; avoid duplicating derived state across components.
- Ensure “panel local state” does not accidentally trigger global refetches.

---

## 2) Repository Layout (Target)

```txt
src/
  framework/
    core/
      dashboard/
        DashboardProvider.jsx
        dashboardReducer.js
        dashboardActions.js
        dashboardSelectors.js
        useDashboardState.js
        useDashboardActions.js

      registry/
        registry.js
        registerCharts.js
        registerInsights.js

      model/
        createDataset.js
        createMetric.js
        createDimension.js
        hierarchies.js
        fieldTypes.js

      query/
        QuerySpec.js
        buildQuerySpec.js
        normalizeQuerySpec.js
        hashQuerySpec.js
        DataProvider.js
        useQuery.js
        cache.js
        transforms/
          index.js
          sort.js
          pivot.js
          rolling.js
          yoy.js

      interactions/
        interactionTypes.js
        crossFilter.js
        drilldown.js
        brushZoom.js

      insights/
        InsightEngine.js
        useInsights.js
        analyzers/
          anomaly.js
          trend.js
          topDrivers.js
          contribution.js

      layout/
        GridLayout.jsx
        Panel.jsx
        PanelHeader.jsx
        PanelBody.jsx
        SplitPane.jsx

      viz/
        VizRenderer.jsx
        charts/
          LineChartPanel.jsx
          BarChartPanel.jsx
          AreaChartPanel.jsx
          ScatterChartPanel.jsx
          TablePanel.jsx
          KPI.jsx
        common/
          ChartContainer.jsx
          ChartLegend.jsx
          ChartTooltip.jsx
          EmptyState.jsx
          LoadingState.jsx
          ErrorState.jsx

    styles/
      tokens.css
      theme.light.css
      theme.dark.css
      framework.css
      components/
        grid.css
        panel.css
        charts.css
        table.css
        insights.css

  app/
    dashboards/
      example/
        example.dataset.js
        example.metrics.js
        example.dimensions.js
        example.dashboard.js
        example.css
    pages/
      DashboardPage.jsx
    App.jsx
    routes.jsx
````

---

## 3) Conceptual Model (PowerBI-ish)

### 3.1 Dataset

A dataset describes:

* Fields catalog: dimensions, measures, time fields, keys
* How queries are executed (server-side vs client-side compute)
* Default grain/timezone settings (optional)
* Mapping for raw response fields -> semantic fields

**Dataset** is identified by `datasetId`.

### 3.2 Dimensions

A dimension is a group-by field:

* `id`, `label`, `type` (`string|number|date|bool|geo`)
* optional `hierarchy`:

  * date: `year > quarter > month > day`
  * org: `vp > director > manager > team`
* optional `formatter`

### 3.3 Metrics (Measures)

A metric is:

* `id`, `label`, `format` (hours, currency, percent, int)
* `dependsOn` (fields needed)
* either:

  * `query`: server calculates it
  * `compute`: client calculates it from rows
* optional `validGrains`, `constraints`

### 3.4 Visual Spec

A panel defines:

* `vizType`: `line|bar|area|scatter|table|kpi|insights`
* `query`: `{ measures: [], dimensions: [], filters: [], grain: ... }`
* `encodings`: `{ x, y, series, color, size }` (optional per viz)
* `interactions`: `crossFilter`, `drilldown`, `brushZoom`
* `options`: `stacked`, `legend`, `tooltip`, etc.

**Rule:** Panels describe what they want. The framework decides how to fetch and render.

---

## 4) State Model

Three scopes:

### 4.1 App Scope

* theme, feature flags, auth

### 4.2 Dashboard Scope (stored in `DashboardProvider`)

* `dashboardId`
* `datasetId`
* `globalFilters` (date range, org, region, etc.)
* `selections` (cross-filter selections)
* `drillPath` (breadcrumbs / drilldown stack)
* `panelStateById` (lightweight panel local state that must persist)

### 4.3 Panel Scope (component-local)

* legend toggles, hovered point, local pagination
* brush range (if not promoted to dashboard scope)
* UI-only state that should not affect other panels

**Rule:** Anything that should affect other panels belongs in Dashboard Scope.

---

## 5) Query Layer

### 5.1 QuerySpec

A normalized object describing a query request.

Required fields:

* `datasetId`
* `measures` (array of metric IDs)
* `dimensions` (array of dimension IDs)
* `filters` (array of filter objects)
* optional `timeRange`, `grain`, `sort`, `limit`, `offset`, `timezone`

Filter format:

```js
{ field: "team", op: "IN", values: ["A", "B"] }
{ field: "work_date", op: "BETWEEN", values: ["2026-01-01", "2026-01-31"] }
```

### 5.2 Query Builder

`buildQuerySpec(panelConfig, dashboardState)`:

* merges:

  * global filters
  * selection filters (cross-filter)
  * drill path constraints
  * panel-specific filters
* applies hierarchy/grain rules (drilldown level changes dimensions)

### 5.3 DataProvider

Abstract interface:

* `execute(querySpec, { signal }) -> Promise<{ rows, meta }>`
* must support abort via `AbortController`

### 5.4 Caching

* cache key = `hashQuerySpec(normalizeQuerySpec(querySpec))`
* SWR strategy:

  * serve cached immediately if present
  * refetch in background if stale
* store:

  * `{ status, data, error, updatedAt }`

### 5.5 Transforms

Composable transforms applied after fetch:

* `sort`, `pivot`, `rolling`, `yoy`, `rank`, `% of total`

**Rule:** Transforms must be pure and testable.

---

## 6) Interactions

### 6.1 Cross-filtering

Clicking on a datum generates a filter. Example:

* click bar for Team A -> `{ field: "team", op: "IN", values: ["Team A"] }`
  Store it in `dashboardState.selections`.

Other panels re-run queries with selection filters applied.

### 6.2 Drilldown

Drilldown updates `drillPath`:

* `[{ dimension: "work_date_month", value: "2026-01" }, ...]`
  Then:
* either changes the query dimension to a deeper level (month -> day)
* or navigates to a drill route (recommended):

  * `/dash/:id/drill/...`

### 6.3 Brush/Zoom

For time-series:

* brush range can:

  * update a panel-local time range
  * OR promote to global filter (optional config)
* must not cause stormy updates; debounced commit recommended.

---

## 7) Insight Engine

Insights are plugins (“analyzers”) that take:

* `{ rows, meta, querySpec, dashboardState }`
  and return:
* `[{ id, title, severity, narrative, recommendedAction, evidence }]`

Initial analyzers (simple heuristics):

* Trend summary (slope + direction)
* Anomaly detection (z-score on recent points)
* Top drivers (largest contributions to delta by dimension)
* Contribution breakdown (percent-of-total)

Insights render as a panel type or as a sidecar panel.

---

## 8) Rendering Layer

### 8.1 Layout

* `GridLayout` places panels using config coordinates (12-col grid)
* `Panel` provides consistent chrome:

  * title, actions, loading/error/empty states
* `PanelBody` renders either:

  * `VizRenderer` (vizType -> chart panel)
  * `InsightsPanel`

### 8.2 Viz Registry

`VizRenderer` uses a registry:

* `vizType -> component`
  So new viz types can be registered without touching core renderer.

### 8.3 Chart Panels

Chart panels:

* receive `data`, `encodings`, `handlers`, `options`
* do not build QuerySpec
* do not fetch data

---

## 9) CSS & Theming

Use CSS variables:

* `tokens.css` defines base tokens (spacing, radii, typography)
* `theme.light.css` / `theme.dark.css` define semantic tokens (bg, text, border, accent)
* components reference semantic tokens

Rules:

* no inline styles
* no Tailwind
* each component uses a CSS file or shared component stylesheet
* class naming: `radf-` prefix recommended

---

## 10) Minimal End-to-End Example (Must Exist)

An example dashboard proving:

* Dashboard config -> renders layout
* One line chart panel (Recharts)
* One bar chart panel (Recharts)
* Cross-filter: click bar filters line
* Drilldown: click line point drills from month -> day
* Insights: trend summary card
* Theme toggle: light/dark via CSS files

---

## 11) API Assumptions (Data)

This framework supports both:

1. Real backend: query endpoint that accepts QuerySpec
2. Mock provider: in-memory dataset for local demo

The project must ship with a working MockDataProvider so the UI is runnable without a backend.

---

# Feature Branch Plan (Work Sequencing)

Each branch below is a discrete “feature slice.” The AI should implement branches in order.

> Branch naming convention: `feature/<name>`
> Each branch includes: **Goals**, **Deliverables**, **Acceptance Criteria**, **Notes/Constraints**

---

## Branch 1 — `feature/repo-bootstrap`

### Goals

Create a runnable React app skeleton with the framework folder layout and CSS pipeline.

### Deliverables

* React project initialized
* Folder structure created
* Base `App.jsx`, `routes.jsx`, `DashboardPage.jsx`
* CSS token + theme setup loaded globally
* Example page renders “Framework Loaded”

### Acceptance Criteria

* `npm install && npm start` runs
* No TypeScript anywhere
* No Tailwind
* No inline styles
* Light/dark theme CSS files exist and are switchable

### Notes

* Prefer Vite for speed (recommended)
* Use CSS imports in `main.jsx` or equivalent entry

---

## Branch 2 — `feature/core-dashboard-provider`

### Goals

Implement dashboard state container + actions + selectors.

### Deliverables

* `DashboardProvider.jsx` using `useReducer + Context`
* `dashboardReducer.js`, `dashboardActions.js`, `dashboardSelectors.js`
* Hooks: `useDashboardState`, `useDashboardActions`
* State includes:

  * `dashboardId`, `datasetId`
  * `globalFilters`, `selections`, `drillPath`
  * `panelStateById`

### Acceptance Criteria

* Can set global filter
* Can add/remove selection filter
* Can push/pop drillPath
* State updates are pure reducer operations

### Notes

* Keep actions small and explicit
* Selectors must be memoizable (but can start simple)

---

## Branch 3 — `feature/semantic-layer`

### Goals

Define dataset/metric/dimension contracts and builder helpers.

### Deliverables

* `createDataset.js`, `createMetric.js`, `createDimension.js`
* `hierarchies.js`, `fieldTypes.js`
* Example dataset definitions under `app/dashboards/example/`

### Acceptance Criteria

* Example dataset exports:

  * `datasetId`, `fields`, `metrics`, `dimensions`, `hierarchies`
* Metrics and dimensions have stable `id`s and labels

### Notes

* Use plain objects + optional JSDoc comments

---

## Branch 4 — `feature/query-layer-foundation`

### Goals

Implement QuerySpec, builder, normalization, hashing.

### Deliverables

* `QuerySpec.js` (schema helpers)
* `buildQuerySpec.js`
* `normalizeQuerySpec.js`
* `hashQuerySpec.js` (stable hash)
* `cache.js` basic in-memory cache

### Acceptance Criteria

* Same semantic query always yields same hash regardless of object key order
* QuerySpec merges:

  * globalFilters + selections + drillPath + panel query
* Unit-like demo in dev console or minimal tests (optional)

### Notes

* Hash can be built from stable JSON stringify (sorted keys)

---

## Branch 5 — `feature/data-provider-and-useQuery`

### Goals

Implement DataProvider abstraction + MockDataProvider + `useQuery`.

### Deliverables

* `DataProvider.js` interface pattern
* `MockDataProvider` implementation (in app or framework)
* `useQuery.js`:

  * caching with SWR semantics
  * AbortController cancellation
  * returns `{ data, meta, loading, error, status }`

### Acceptance Criteria

* Rapid filter changes abort prior requests
* Cache prevents refetch storms
* MockDataProvider provides realistic-looking aggregated output (but clearly mocked)

### Notes

* Mock provider can simulate latency with `setTimeout` + abort checks

---

## Branch 6 — `feature/transforms`

### Goals

Build pure, reusable transforms.

### Deliverables

* `transforms/index.js`
* `sort.js`, `pivot.js`, `rolling.js`, `yoy.js`

### Acceptance Criteria

* Transforms are pure functions
* Can apply transforms via panel config:

  * `panel.query.transforms: [{ type: "yoy", ... }]`

### Notes

* Start minimal: sort + yoy + rolling

---

## Branch 7 — `feature/layout-panels`

### Goals

Implement grid layout + panel chrome.

### Deliverables

* `GridLayout.jsx`, `Panel.jsx`, `PanelHeader.jsx`, `PanelBody.jsx`
* Shared UI states: loading, empty, error components
* CSS: `grid.css`, `panel.css`, `framework.css`

### Acceptance Criteria

* Dashboard config places panels on a 12-col grid
* Panel chrome consistent across viz types
* No inline styles; all styles in CSS

### Notes

* Use CSS grid with named columns or repeat(12, 1fr)

---

## Branch 8 — `feature/viz-registry-and-core-charts`

### Goals

Create VizRenderer + registry + initial Recharts panels.

### Deliverables

* `registry.js`, `registerCharts.js`
* `VizRenderer.jsx`
* Chart panels:

  * `LineChartPanel.jsx`
  * `BarChartPanel.jsx`
* Common:

  * `ChartContainer.jsx`, `ChartTooltip.jsx`, `ChartLegend.jsx`
* CSS: `charts.css`

### Acceptance Criteria

* Chart panels render data from `useQuery`
* Tooltips and legend are consistent
* Charts use Recharts only
* No chart fetches data directly (they receive props)

### Notes

* Prefer a panel-controller pattern:

  * `VizPanelController` or hook that returns `{ data, handlers }`

---

## Branch 9 — `feature/interactions-crossfilter`

### Goals

Implement cross-filtering end-to-end.

### Deliverables

* `crossFilter.js` utilities
* Chart click handlers that emit selection filters
* Dashboard reducer actions for selection updates
* Demonstration:

  * Clicking bar filters line chart

### Acceptance Criteria

* Click-to-filter works
* Clear selection action works
* Selection state visible (chips UI optional but recommended)

### Notes

* Selection should be additive by default, configurable per panel

---

## Branch 10 — `feature/interactions-drilldown`

### Goals

Implement drilldown and drillPath logic.

### Deliverables

* `drilldown.js`
* Panel config supports:

  * `interactions.drilldown: { dimension, to }`
* Drill breadcrumbs component (recommended)
* Demonstration:

  * line chart month -> day drill

### Acceptance Criteria

* Drilldown changes query dimension level and/or navigates route
* Breadcrumbs allow stepping back
* Drill filters apply consistently to all relevant panels

### Notes

* If routing: keep drillPath mirrored in state

---

## Branch 11 — `feature/interactions-brushzoom`

### Goals

Implement brush/zoom for time-series panels.

### Deliverables

* `brushZoom.js`
* Line chart includes Recharts Brush
* Debounced commit option:

  * panel-local brush updates fast
  * optional “Apply” to promote to global filter

### Acceptance Criteria

* Brushing changes the visible window
* Optional mode updates global date range filter

### Notes

* Avoid constant global dispatch during drag

---

## Branch 12 — `feature/insight-engine`

### Goals

Implement insights as plugins + insight panel.

### Deliverables

* `InsightEngine.js`, `useInsights.js`
* Analyzers:

  * `trend.js` (required)
  * `anomaly.js` (optional initial)
  * `topDrivers.js` (optional initial)
* `InsightsPanel` rendering insight cards
* CSS: `insights.css`

### Acceptance Criteria

* Insights render from same data used by panels
* At least one analyzer produces useful output on mock data
* Insights are registry-driven like charts

### Notes

* Start with simple heuristics; correctness over complexity

---

## Branch 13 — `feature/example-dashboard`

### Goals

Ship a complete demo dashboard proving capabilities.

### Deliverables

* `app/dashboards/example/*` with:

  * dataset/metrics/dimensions
  * dashboard config placing:

    * KPI
    * line chart (trend)
    * bar chart (breakdown)
    * insights panel
* Theme toggle UI
* Filter bar UI (date range + chips)

### Acceptance Criteria

* One command runs demo
* Cross-filter works
* Drilldown works
* Insights show
* Theming works
* No inline styles, no Tailwind, JS only

---

## Branch 14 — `feature/docs-and-hardening`

### Goals

Documentation + developer ergonomics + guardrails.

### Deliverables

* README with “How to add a new dashboard”
* “How to add a metric/dimension”
* “How to add a chart panel”
* “How to add an insight analyzer”
* Basic error boundaries and empty states
* Optional lightweight tests for transforms/hash

### Acceptance Criteria

* A developer can create a new dashboard by following docs
* Clear constraints restated (no TS/tailwind/inline)

---

# Implementation Notes for the AI

## A) Coding Standards

* JavaScript only (no TS)
* Functional components + hooks
* Reducers are pure
* Prefer `useMemo` for derived objects passed to hooks to prevent rerenders
* All styles in CSS files (imported into components or globally)

## B) Component Pattern

* Controllers/hooks handle data + interactions:

  * `usePanelQuery(panelConfig)`
  * `usePanelInteractions(panelConfig)`
* Presentational components render:

  * `LineChartPanel({ data, encodings, handlers, options })`

## C) Avoiding Fetch Storms

* Normalize QuerySpec before hashing
* Stable hashing (sorted keys)
* Cache results by hash
* Abort previous request on hash change
* Never rebuild QuerySpec as a new object each render unless inputs changed (memoize)

## D) What “Generic” Means Here

* No domain-specific naming in framework (`overtime`, `sales`) except in example app
* Everything is defined by:

  * dataset/metric/dimension definitions
  * dashboard/panel configs
  * registry of components/analyzers

---

# Appendix: Minimal Panel Config Shape (Reference)

```js
{
  id: "trend",
  title: "Metric Trend",
  panelType: "viz",
  vizType: "line",
  query: {
    measures: ["metric_id"],
    dimensions: ["date_month"],
    filters: [],
    transforms: [{ type: "yoy", measure: "metric_id" }]
  },
  encodings: { x: "date_month", y: "metric_id" },
  interactions: {
    crossFilter: true,
    drilldown: { dimension: "date_month", to: "date_day" },
    brushZoom: true
  },
  options: {
    legend: true,
    tooltip: true
  }
}
```

---

# Done Definition

The project is complete when:

* A new dashboard can be created by adding a folder under `app/dashboards/<name>/`
* Dashboards render from config
* Cross-filter + drilldown + insights work
* CSS tokens + light/dark themes work
* MockDataProvider makes it runnable without backend
* No Tailwind, no inline styles, JS only
