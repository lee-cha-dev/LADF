# Extending LADF

This guide maps the actual extension points in the repository so you can add dashboards, viz types, insights, data providers, and themes without guessing.

## Public API surface (exports)

LADF exports its public API from `src/index.js` and ships compiled assets from `dist/`.

**Verified in repo:** `src/index.js`, `package.json`.

## Adding a new dashboard config

Dashboard configs are plain JavaScript objects (see the examples). Start by cloning an existing config file and updating ids/titles.

**Verified in repo:**
- Example dashboard config: `examples/finance-app/src/app/dashboards/example/example.dashboard.js`
- Consumer example config: `examples/consumer-app/src/dashboard.config.js`

### Minimum shape

The JSDoc type for a dashboard config lives in `src/framework/core/docs/jsdocTypes.js` and includes `id`, `title`, `datasetId`, and `panels`.

**Verified in repo:** `src/framework/core/docs/jsdocTypes.js`.

### Example panel definitions

Panels in the examples look like this:

- **Viz panels** (`panelType: 'viz'`) define `vizType`, `encodings`, `options`, and a `query`.
- **Insights panels** in examples use `panelType: 'insights'` and only provide `query` + titles.

**Verified in repo:**
- `examples/finance-app/src/app/dashboards/example/example.dashboard.js`
- `examples/finance-app/src/app/pages/DashboardPage.jsx`
- `examples/consumer-app/src/dashboard.config.js`

> **Note:** `jsdocTypes.js` lists `'insight'` as a panel type, but example usage uses `'insights'`. Follow the rendering logic in your app (see `DashboardPage.jsx`) to avoid mismatches.

## Adding a new panel type / vizType

### 1) Create a visualization component

Chart components accept the props passed by `VizRenderer`:

- `data` — rows from `useQuery`
- `encodings` — channel mappings from panel config
- `options` — visualization options
- `handlers` — interaction callbacks
- `colorAssignment` / `hiddenKeys` — palette + legend support

**Verified in repo:** `src/framework/core/viz/VizRenderer.jsx`, `src/framework/core/viz/charts/LineChartPanel.jsx`.

### 2) Register the viz type

`registerViz` lives in the internal registry module. It is **not** exported from the package root, so registering custom viz types is intended for forks or internal builds.

In a fork, you can either:

- Call `registerViz` directly in your app shell, or
- Add your chart to `registerCharts()` so it registers alongside the built-ins.

**Verified in repo:** `package.json` (exports), `src/framework/core/registry/registry.js`, `src/framework/core/registry/registerCharts.js`.

Example (fork/local source import):

```js
import { registerViz } from './framework/core/registry/registry.js';
import MyCustomChart from './framework/core/viz/charts/MyCustomChart.jsx';

registerViz('custom-chart', MyCustomChart);
```

### 3) Use `vizType` in panel config

```js
{
  id: 'custom-panel',
  panelType: 'viz',
  vizType: 'custom-chart',
  title: 'My Custom Viz',
  layout: { x: 1, y: 1, w: 6, h: 2 },
  query: { measures: ['total_revenue'], dimensions: ['order_day'] },
  encodings: { x: 'order_day', y: 'total_revenue' },
  options: { tooltip: true }
}
```

**Verified in repo:** `examples/consumer-app/src/dashboard.config.js`, `examples/finance-app/src/app/dashboards/example/example.dashboard.js`.

### Minimum implementation checklist

- ✅ Call `registerCharts()` (or `registerViz`) at app startup.
- ✅ Ensure your viz component accepts `data`, `encodings`, and `options`.
- ✅ If you want legend toggles, respect `hiddenKeys` (see `LineChartPanel`).

**Verified in repo:** `examples/consumer-app/src/App.jsx`, `src/framework/core/viz/charts/LineChartPanel.jsx`.

## Adding a new insight

### Where insights are registered

Insight analyzers are registered with `registerInsight`, and the default set is wired in `registerInsights()`.

**Verified in repo:** `src/framework/core/registry/registerInsights.js`, `src/framework/core/registry/registry.js`.

### Analyzer shape

An analyzer object has `{ id, label, analyze }` and returns one or more `Insight` objects.

**Verified in repo:** `src/framework/core/insights/analyzers/trend.js`, `src/framework/core/docs/jsdocTypes.js`.

### How insights get rendered

1) `useInsights()` runs analyzers via `InsightEngine`.
2) `InsightsPanel` renders the normalized list.

**Verified in repo:**
- `src/framework/core/insights/useInsights.js`
- `src/framework/core/insights/InsightEngine.js`
- `src/framework/core/insights/InsightsPanel.jsx`
- Example wiring: `examples/finance-app/src/app/pages/DashboardPage.jsx`

## Adding/using a new DataProvider

LADF expects a **DataProvider** with an `execute(querySpec, { signal })` function that returns `{ rows, meta }`.

**Verified in repo:** `src/framework/core/query/DataProvider.js`, `src/framework/core/docs/jsdocTypes.js`.

### Provider contract

```js
import { createDataProvider } from 'ladf';

export const MyProvider = createDataProvider(async (querySpec, { signal }) => {
  const response = await fetch('/api/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(querySpec),
    signal,
  });
  const json = await response.json();
  return { rows: json.rows, meta: json.meta };
}, {
  validateResult: (result) => Array.isArray(result?.rows) || 'rows must be an array',
});
```

**Verified in repo:** `src/framework/core/query/DataProvider.js`.

### Using the provider

```js
const { data, loading, error } = useQuery(querySpec, {
  provider: MyProvider,
});
```

**Verified in repo:** `src/framework/core/query/useQuery.js`, `examples/consumer-app/src/App.jsx`.

## Extending the semantic/query layer

### Dataset + field definitions

The semantic layer helpers live in `src/framework/core/model/`:

- `createDataset` — dataset definition with dimensions + metrics
- `createDimension` — dimension definition
- `createMetric` — metric definition
- `createHierarchy` — hierarchy helper
- `FIELD_TYPES` — supported field types

**Verified in repo:** `src/framework/core/model/`.

### Query building flow

1) Panel config + dashboard state are merged into a `QuerySpec` by `buildQuerySpec`.
2) `buildQuerySpec` combines panel query fields with global filters, selections, and drilldown path.
3) `dashboardSelectors.selectDerivedQueryInputs` is a convenience wrapper around `buildQuerySpec`.

**Verified in repo:**
- `src/framework/core/query/buildQuerySpec.js`
- `src/framework/core/dashboard/dashboardSelectors.js`
- `src/framework/core/dashboard/dashboardReducer.js`

### How dashboard state influences queries

- `globalFilters`, `selections`, and `drillPath` are all applied as filters.
- `datasetId` comes from the panel config or the dashboard state; panels can
  target different dataset ids for multi-datasource dashboards. Lazy Dashboards
  stores this selection on each widget as `datasourceId` and compiles it into
  `panel.datasetId`.
- Drilldown behavior updates dimensions via `applyDrilldownToDimensions`.

**Verified in repo:** `src/framework/core/query/buildQuerySpec.js`, `src/framework/core/interactions/drilldown.js`.

## Theming & tokens

### Where themes/tokens live

LADF ships CSS variables and theme classes under `src/framework/styles/`, and `src/styles.css` stitches them together into a single entrypoint.

**Verified in repo:** `src/framework/styles/`, `src/styles.css`.

### Theme classes

The built-in theme classes are:

- `ladf-theme-light`
- `ladf-theme-dark`

Additional theme namespaces (e.g., `fecc-theme-light` / `fecc-theme-dark`) also exist.

**Verified in repo:** `src/framework/styles/theme.light.css`, `src/framework/styles/theme.dark.css`.

### Adding a new theme class

1) Add a new `:root.<theme-class>` block in a theme file (or a new CSS file imported by `src/styles.css`).
2) Define all required `--ladf-*` variables (match the existing theme blocks).
3) Ensure consumers apply the class to `document.documentElement`.

**Verified in repo:** `src/framework/styles/theme.light.css`, `src/framework/styles/theme.dark.css`, `src/styles.css`.

### How `ladf/styles.css` is built

The library build uses `src/index.js` as the entry point; it imports `src/styles.css` so Vite emits `dist/styles.css`, and `package.json` exports it as `./styles.css`.

**Verified in repo:** `src/index.js`, `src/styles.css`, `vite.lib.config.js`, `package.json`.

## CSS rules & checks

- No eslint rule explicitly forbids inline styles; follow the project constraints to avoid them.

**Verified in repo:** `eslint.config.js`.

- CSS import integrity is validated by Playwright via `npm run test:css`.

**Verified in repo:** `scripts/test-css-import.mjs`, `tests/css-import.spec.js`, `playwright.config.js`.

## Common gotchas

- **Unregistered viz types render a “Visualization unavailable” state.** Register your custom viz before rendering. **Verified in repo:** `src/framework/core/viz/VizRenderer.jsx`.
- **Panel type mismatches.** Example render logic checks for `panelType === 'insights'`; match that in your configs. **Verified in repo:** `examples/finance-app/src/app/pages/DashboardPage.jsx`.
- **Missing theme class = unthemed UI.** Ensure `ladf-theme-light` or `ladf-theme-dark` is applied at the root. **Verified in repo:** `README.md`, `src/framework/styles/theme.light.css`, `src/framework/styles/theme.dark.css`.

## File map (where to look)

- `src/index.js` — public exports and CSS entry import.
- `src/framework/core/viz/VizRenderer.jsx` — routes `vizType` to a registered component.
- `src/framework/core/registry/registry.js` — `registerViz` and `registerInsight`.
- `src/framework/core/insights/` — analyzers + insights engine + panel renderer.
- `src/framework/core/query/` — `buildQuerySpec`, `useQuery`, DataProvider helpers.
- `src/framework/core/model/` — dataset + dimension + metric helpers.
- `src/framework/styles/` — tokens and theme CSS.
- `examples/consumer-app/` — minimal usage pattern.
- `examples/finance-app/` — advanced example with filters, drilldowns, and insights.
