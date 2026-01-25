/**
 * RADF public entry point.
 * Importing this module applies RADF styles automatically.
 */
import tokensStyles from './styles/tokens.css?inline';
import palettesStyles from './styles/palettes.css?inline';
import frameworkStyles from './styles/framework.css?inline';
import gridStyles from './styles/components/grid.css?inline';
import panelStyles from './styles/components/panel.css?inline';
import chartsStyles from './styles/components/charts.css?inline';
import filtersStyles from './styles/components/filters.css?inline';
import insightsStyles from './styles/components/insights.css?inline';
import tableStyles from './styles/components/table.css?inline';
import lightThemeStyles from './styles/theme.light.css?inline';
import darkThemeStyles from './styles/theme.dark.css?inline';

const STYLE_ELEMENT_ID = 'radf-framework-styles';

const ensureFrameworkStyles = () => {
  if (typeof document === 'undefined') {
    return;
  }

  if (document.getElementById(STYLE_ELEMENT_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = STYLE_ELEMENT_ID;
  style.textContent = [
    tokensStyles,
    palettesStyles,
    frameworkStyles,
    gridStyles,
    panelStyles,
    chartsStyles,
    filtersStyles,
    insightsStyles,
    tableStyles,
    lightThemeStyles,
    darkThemeStyles,
  ].join('\n');
  document.head.appendChild(style);
};

ensureFrameworkStyles();

/** Provider that supplies dashboard state and actions. */
export { default as DashboardProvider } from './core/dashboard/DashboardProvider.jsx';
/** Hook to dispatch dashboard actions. */
export { useDashboardActions } from './core/dashboard/useDashboardActions.js';
/** Hook to read the current dashboard state. */
export { useDashboardState } from './core/dashboard/useDashboardState.js';
/** Selector helpers for dashboard state. */
export * as dashboardSelectors from './core/dashboard/dashboardSelectors.js';

/** Build a normalized query specification from a panel config. */
export { buildQuerySpec } from './core/query/buildQuerySpec.js';
/** Create a DataProvider contract wrapper around an execute function. */
export { createDataProvider as DataProvider } from './core/query/DataProvider.js';
/** Create a DataProvider contract wrapper around an execute function. */
export {
  assertDataProvider,
  createDataProvider,
  isDataProvider,
} from './core/query/DataProvider.js';
/** Mock data provider for local development. */
export { MockDataProvider } from './core/query/MockDataProvider.js';
/** Query hook that executes a QuerySpec against a DataProvider. */
export { useQuery } from './core/query/useQuery.js';

/** Register the default chart visualizations. */
export { default as registerCharts } from './core/registry/registerCharts.js';
/** Register the default insight modules. */
export { default as registerInsights } from './core/registry/registerInsights.js';

/** Grid layout component for arranging dashboard panels. */
export { default as GridLayout } from './core/layout/GridLayout.jsx';
/** Panel chrome component for titles, loading, and empty states. */
export { default as Panel } from './core/layout/Panel.jsx';
/** Error boundary component for dashboard routes. */
export { default as ErrorBoundary } from './core/layout/ErrorBoundary.jsx';
/** Visualization renderer for registered viz types. */
export { default as VizRenderer } from './core/viz/VizRenderer.jsx';
/** Insights renderer for insights panels. */
export { default as InsightsPanel } from './core/insights/InsightsPanel.jsx';
/** Hook to run the insights engine. */
export { useInsights } from './core/insights/useInsights.js';

/** Drill breadcrumb trail for drilldown interactions. */
export { default as DrillBreadcrumbs } from './core/interactions/DrillBreadcrumbs.jsx';
/** Helpers for cross-filter interactions. */
export {
  buildCrossFilterSelectionFromEvent,
  isSelectionDuplicate,
} from './core/interactions/crossFilter.js';
/** Helpers for drilldown interactions. */
export {
  applyDrilldownToDimensions,
  buildDrilldownEntryFromEvent,
  isDrilldownDuplicate,
} from './core/interactions/drilldown.js';
/** Helpers for brush/zoom interactions. */
export {
  buildBrushFilter,
  formatBrushRangeLabel,
  getBrushRange,
  removeBrushFilter,
  upsertBrushFilter,
} from './core/interactions/brushZoom.js';
/** Resolve palette classes for panels. */
export { resolvePalette } from './core/viz/palettes/paletteResolver.js';

/** Create a dataset definition for the semantic layer. */
export { default as createDataset } from './core/model/createDataset.js';
/** Create hierarchy definitions for semantic layer drilldowns. */
export { createHierarchy } from './core/model/hierarchies.js';
/** Create a dimension definition for the semantic layer. */
export { default as createDimension } from './core/model/createDimension.js';
/** Field type constants for dimensions. */
export { FIELD_TYPES } from './core/model/fieldTypes.js';
/** Create a metric definition for the semantic layer. */
export { default as createMetric } from './core/model/createMetric.js';
