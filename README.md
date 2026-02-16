# LADF (Lazy Analytics Dashboard Framework)

Build analytics dashboards from config, not boilerplate.

LADF is the runtime layer behind Lazy Dashboards. It takes a dashboard config,
turns each panel into a QuerySpec, executes queries through a DataProvider, and
renders Recharts visualizations with consistent layout, state, interactions, and
themes.

- Runtime only (no composer UI). The composer exports dashboards that run on LADF.
- Package name: `ladf`.
- CSS entrypoint: `ladf/styles.css`.

## Why LADF

- Config-first runtime: dashboard config -> QuerySpec -> provider -> viz.
- Deterministic state: global filters, selections, drill path, per-panel state.
- Extensible registries: register charts and insights without changing the renderer.
- Query layer with caching + validation via `useQuery`.
- Theme + palette system driven by CSS tokens and classes.

## Core Flow (composer export model)

1) Register default charts/insights once at app startup.
2) Wrap the dashboard subtree in `DashboardProvider`.
3) Build a QuerySpec from panel config + dashboard state.
4) Execute queries via `useQuery` with a DataProvider.
5) Render with `GridLayout`, `Panel`, and `VizRenderer`.

## Install

```bash
npm install ladf@"git+https://github.com/lee-cha-dev/LADF.git"
```

## Quick Start (runtime)

```js
// dashboard.config.js
const dashboardConfig = {
  id: 'sales-dashboard',
  title: 'Sales Dashboard',
  datasetId: 'sales_dataset',
  panels: [
    {
      id: 'revenue-kpi',
      panelType: 'viz',
      vizType: 'kpi',
      title: 'Total Revenue',
      layout: { x: 1, y: 1, w: 4, h: 1 },
      datasetId: 'sales_dataset',
      query: {
        measures: ['total_revenue'],
        dimensions: [],
      },
      encodings: { value: 'total_revenue', label: 'Total Revenue' },
      options: { format: 'currency' },
    },
  ],
};

export default dashboardConfig;
```

```jsx
import React, { useEffect, useMemo } from 'react';
import {
  DashboardProvider,
  GridLayout,
  Panel,
  VizRenderer,
  buildQuerySpec,
  registerCharts,
  registerInsights,
  useDashboardState,
  useQuery,
  MockDataProvider,
} from 'ladf';
import 'ladf/styles.css';
import dashboardConfig from './dashboard.config.js';

const VizPanel = ({ panel }) => {
  const dashboardState = useDashboardState();
  const querySpec = useMemo(
    () => buildQuerySpec(panel, dashboardState),
    [panel, dashboardState]
  );

  const { data, loading, error } = useQuery(querySpec, {
    provider: MockDataProvider,
  });

  return (
    <Panel
      title={panel.title}
      status={loading ? 'loading' : error ? 'error' : 'ready'}
      error={error}
    >
      <VizRenderer
        vizType={panel.vizType}
        data={data || []}
        encodings={panel.encodings}
        options={panel.options}
      />
    </Panel>
  );
};

const App = () => {
  useEffect(() => {
    registerCharts();
    registerInsights();
  }, []);

  return (
    <DashboardProvider
      initialState={{
        dashboardId: dashboardConfig.id,
        datasetId: dashboardConfig.datasetId,
      }}
    >
      <section className="ladf-dashboard">
        <h1 className="ladf-dashboard__title">{dashboardConfig.title}</h1>
        <GridLayout
          panels={dashboardConfig.panels}
          renderPanel={(panel) => <VizPanel key={panel.id} panel={panel} />}
        />
      </section>
    </DashboardProvider>
  );
};

export default App;
```

## Data Providers

LADF expects a DataProvider with an `execute(querySpec, { signal })` method. Use
`createDataProvider` to wrap your query logic and optionally validate results.

```js
import { createDataProvider } from 'ladf';

const ApiProvider = createDataProvider(
  async (querySpec, { signal }) => {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(querySpec),
      signal,
    });
    const json = await response.json();
    return { rows: json.rows, meta: json.meta };
  },
  {
    validateResult: (result) =>
      Array.isArray(result?.rows) || 'rows must be an array',
  }
);
```

`useQuery` handles caching, stale checks, aborts, and validation warnings. Set
`staleTime` and `strictResultValidation` as needed.

### Multiple Datasources

Panels can target different `datasetId` values. Use `createMultiDataProvider`
to route queries to the right backend.

```js
import { createMultiDataProvider } from 'ladf';

const provider = createMultiDataProvider({
  sales: SalesApiProvider,
  inventory: InventoryApiProvider,
});

// panel.datasetId decides which provider runs.
```

## Dashboard State and Interactions

`DashboardProvider` owns shared dashboard state (filters, selections, drill
path, per-panel UI state). Use:

- `useDashboardState`, `useDashboardActions` for read/write access.
- `dashboardSelectors` for derived inputs (filters, breadcrumbs, QuerySpec).
- Interaction helpers: `crossFilter`, `drilldown`, `brushZoom`.

## Insights

Register default insights with `registerInsights()`, or add your own analyzers
via `registerInsight`. Render them with `InsightsPanel` or call `useInsights`
directly for custom UI.

## Semantic Layer Helpers

Define dataset metadata with the semantic layer helpers:

- `createDataset`, `createDimension`, `createMetric`, `createHierarchy`
- `FIELD_TYPES` for dimension typing

These helpers keep query specs and dashboard configs aligned.

## Themes and Palettes

Import `ladf/styles.css` once. Apply theme and palette classes at the root.

Theme families (light + dark):

- `ladf-theme-light` / `ladf-theme-dark` (default)
- `ladf-theme-nord-*`
- `ladf-theme-dracula-*`
- `ladf-theme-solarized-*`
- `ladf-theme-monokai-*`
- `ladf-theme-gruvbox-*`
- `ladf-theme-material-*`
- `ladf-theme-one-*`
- `ladf-theme-tokyo-*`
- `ladf-theme-catppuccin-*`
- `ladf-theme-horizon-*`

Palette classes:

- `ladf-palette-analytics` (default)
- `ladf-palette-tableau10`
- `ladf-palette-set2`
- `ladf-palette-dark2`
- `ladf-palette-okabe-ito`
- `ladf-palette-viridis`
- `ladf-palette-rdylgn`

## Package Surface

Public exports from `ladf`:

```js
import {
  DashboardProvider,
  useDashboardState,
  useDashboardActions,
  dashboardSelectors,
  Panel,
  PanelBody,
  PanelHeader,
  GridLayout,
  ErrorBoundary,
  VizRenderer,
  InsightsPanel,
  useInsights,
  registerCharts,
  registerInsights,
  buildQuerySpec,
  DataProvider,
  createDataProvider,
  createMultiDataProvider,
  assertDataProvider,
  isDataProvider,
  MockDataProvider,
  useQuery,
  DrillBreadcrumbs,
  buildCrossFilterSelectionFromEvent,
  isSelectionDuplicate,
  applyDrilldownToDimensions,
  buildDrilldownEntryFromEvent,
  isDrilldownDuplicate,
  buildBrushFilter,
  formatBrushRangeLabel,
  getBrushRange,
  removeBrushFilter,
  upsertBrushFilter,
  resolvePalette,
  createDataset,
  createHierarchy,
  createDimension,
  FIELD_TYPES,
  createMetric,
} from 'ladf';
```

Styles are available from:

```js
import 'ladf/styles.css';
```

## Examples

- `examples/consumer-app` shows a runnable consumer app using the runtime API.

## Docs

- `docs/EXTENDING.md` for custom viz, insights, providers, and themes.
- `docs/THEMES.md` for palette details.
- `docs/FORKING.md` and `docs/CONTRIBUTING.md` for dev workflow.

## Browser Support

LADF targets modern evergreen browsers (Chrome, Edge, Firefox, Safari).

## Tests

```bash
npm run lint
npm run test
npm run build:lib
npm run smoke:consumer
npm run test:css
```

## License

ELv2 © 2026, Lee Charles. See `LICENSE` for details.
