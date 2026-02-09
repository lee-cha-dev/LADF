# RADF (Recharts Analytics Dashboard Framework)

Build analytics dashboards from config, not boilerplate.

RADF is a config-driven React framework for building analytic dashboards (KPIs, trends, breakdowns, and insights) with Recharts. It ships as a package you can install directly from Git and includes a single CSS entrypoint for tokens, themes, and component styles.

- Docs: `docs/EXTENDING.md`, `docs/FORKING.md`, `docs/CONTRIBUTING.md`
- Themes: `docs/THEMES.md`
- Example app: `examples/consumer-app`

## Quick Start

### 1) Install

```bash
npm install radf@"git+https://github.com/lee-cha-dev/RADF.git"
```

### 2) Create a dashboard config

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

### 3) Render it

```jsx
import React, { useEffect, useMemo } from 'react';
import {
  DashboardProvider,
  GridLayout,
  Panel,
  VizRenderer,
  buildQuerySpec,
  registerCharts,
  useDashboardState,
  useQuery,
  MockDataProvider,
} from 'radf';
import 'radf/styles.css';
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
  }, []);

  return (
    <DashboardProvider
      initialState={{
        dashboardId: dashboardConfig.id,
        datasetId: dashboardConfig.datasetId,
      }}
    >
      <section className="radf-dashboard">
        <h1 className="radf-dashboard__title">{dashboardConfig.title}</h1>
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

## Features

- Config-driven dashboards and panels.
- Recharts-based visualization registry with extensible chart types.
- Pluggable data providers (API, local, mock).
- Insights engine with built-in analyzers (trend, anomaly, top drivers).
- Theme system with 12 light/dark palettes and CSS variables.
- Interaction helpers for cross-filter, drilldown, and brush/zoom.

## When to Use RADF

Good fit:
- Internal analytics dashboards.
- Customer-facing reporting and KPI pages.
- Prototyping and validating dashboard layouts quickly.
- Teams that want config-driven governance.

Not a fit:
- Complex multi-page applications that are not dashboard-first.
- Ultra-low-latency streaming visualizations that require bespoke rendering.
- Highly bespoke charts that do not fit the registry model.

## Themes

RADF includes 12 professionally designed themes, each available in both light and dark variants:

- `radf-theme-light` / `radf-theme-dark` - default modern theme
- `radf-theme-nord-*` - arctic-inspired cool blues
- `radf-theme-dracula-*` - high-contrast purple and pink
- `radf-theme-solarized-*` - precision earth tones
- `radf-theme-monokai-*` - vibrant cyan and pink accents
- `radf-theme-gruvbox-*` - warm retro palette
- `radf-theme-material-*` - Material Design tones
- `radf-theme-one-*` - Atom One palette
- `radf-theme-tokyo-*` - modern Japanese-inspired tones
- `radf-theme-catppuccin-*` - soft pastel palette
- `radf-theme-horizon-*` - warm pink with cyan accents

Apply a theme by adding a root class:

```jsx
useEffect(() => {
  document.documentElement.classList.add('radf-theme-nord-dark');
}, []);
```

Full palette documentation and custom theme guidance live in `docs/THEMES.md`.

## Full Example

```jsx
import React, { useEffect, useMemo } from 'react';
import {
  DashboardProvider,
  GridLayout,
  Panel,
  VizRenderer,
  buildQuerySpec,
  createDataProvider,
  registerCharts,
  registerInsights,
  useDashboardState,
  useQuery,
} from 'radf';
import dashboardConfig from './dashboard.config.js';

const ApiDataProvider = createDataProvider(
  async (querySpec, { signal }) => {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(querySpec),
      signal,
    });
    if (!response.ok) {
      throw new Error(`Query failed: ${response.status}`);
    }
    const json = await response.json();
    return { rows: json.rows, meta: json.meta };
  },
  {
    validateResult: (result) => Array.isArray(result?.rows) || 'rows must be an array',
  }
);

const VizPanel = ({ panel }) => {
  const dashboardState = useDashboardState();
  const querySpec = useMemo(
    () => buildQuerySpec(panel, dashboardState),
    [panel, dashboardState]
  );

  const { data, loading, error } = useQuery(querySpec, {
    provider: ApiDataProvider,
  });

  const isEmpty = !loading && !error && (!data || data.length === 0);
  const status = loading ? 'loading' : error ? 'error' : 'ready';

  return (
    <Panel
      title={panel.title}
      subtitle={panel.subtitle}
      status={status}
      error={error}
      isEmpty={isEmpty}
      emptyMessage="No data returned for this panel."
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

const DashboardContent = () => (
  <section className="radf-dashboard">
    <h1 className="radf-dashboard__title">{dashboardConfig.title}</h1>
    <p className="radf-dashboard__subtitle">{dashboardConfig.subtitle}</p>
    <GridLayout
      panels={dashboardConfig.panels}
      renderPanel={(panel) => <VizPanel key={panel.id} panel={panel} />}
    />
  </section>
);

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
      <DashboardContent />
    </DashboardProvider>
  );
};

export default App;
```

## Consumer Example

A runnable consumer app lives at `examples/consumer-app` and installs RADF via the Git dependency. It imports `radf/styles.css` and renders a dashboard using the public API.

## Troubleshooting

Charts not rendering:
- Ensure you imported `radf/styles.css`.
- Check that `registerCharts()` ran once on app startup.

Theme not applying:
- Verify the theme class is on `document.documentElement`.
- Ensure the theme class is not being overwritten by another effect.

## Browser Support

RADF targets modern evergreen browsers (Chrome, Edge, Firefox, Safari).

## Forking & Extending RADF

If you want to fork RADF, extend the framework, or contribute changes back, start with:

- `docs/FORKING.md` for fork workflow and local setup.
- `docs/EXTENDING.md` for adding dashboards, panels, viz types, insights, providers, and themes.
- `docs/CONTRIBUTING.md` for scripts, tests, and contributor hygiene.

## How to Run Tests

```bash
npm run lint
npm run test
npm run build:lib
npm run smoke:consumer
npm run test:css
```

`npm run test:css` builds the library, installs the packed tarball into the consumer app, starts Vite preview, and runs Playwright to assert computed styles are applied.

## Package Surface

Public exports are available from the package root:

```js
import {
  DashboardProvider,
  GridLayout,
  Panel,
  VizRenderer,
  InsightsPanel,
  registerCharts,
  registerInsights,
  buildQuerySpec,
  useQuery,
  MockDataProvider,
} from 'radf';
```

Styles are available from:

```js
import 'radf/styles.css';
```

## Constraints

- JavaScript only (no TypeScript)
- No Tailwind
- No inline styles
- Recharts is the chart library
- CSS variables power tokens and themes

## Next Steps

- Explore `docs/EXTENDING.md` for custom viz types and insights.
- Use `docs/THEMES.md` for theme palettes and custom themes.
- Validate a fork with `docs/FORKING.md`.

## License

MIT © Lee Cha. See `LICENSE` for details.
