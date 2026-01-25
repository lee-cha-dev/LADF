import './styles.css';

export { default as DashboardProvider } from './framework/core/dashboard/DashboardProvider.jsx';
export { useDashboardState } from './framework/core/dashboard/useDashboardState.js';
export { useDashboardActions } from './framework/core/dashboard/useDashboardActions.js';
export { default as PanelBody } from './framework/core/layout/PanelBody.jsx';
export { default as PanelHeader } from './framework/core/layout/PanelHeader.jsx';

/** Build a normalized query specification from a panel config. */
export { buildQuerySpec } from './framework/core/query/buildQuerySpec.js';
/** Create a DataProvider contract wrapper around an execute function. */
export { createDataProvider as DataProvider } from './framework/core/query/DataProvider.js';
/** Create a DataProvider contract wrapper around an execute function. */
export {
  assertDataProvider,
  createDataProvider,
  isDataProvider,
} from './framework/core/query/DataProvider.js';
/** Mock data provider for local development. */
export { MockDataProvider } from './framework/core/query/MockDataProvider.js';
/** Query hook that executes a QuerySpec against a DataProvider. */
export { useQuery } from './framework/core/query/useQuery.js';

/** Register the default chart visualizations. */
export { default as registerCharts } from './framework/core/registry/registerCharts.js';
/** Register the default insight modules. */
export { default as registerInsights } from './framework/core/registry/registerInsights.js';

/** Grid layout component for arranging dashboard panels. */
export { default as GridLayout } from './framework/core/layout/GridLayout.jsx';
/** Panel chrome component for titles, loading, and empty states. */
export { default as Panel } from './framework/core/layout/Panel.jsx';
/** Error boundary component for dashboard routes. */
export { default as ErrorBoundary } from './framework/core/layout/ErrorBoundary.jsx';
/** Visualization renderer for registered viz types. */
export { default as VizRenderer } from './framework/core/viz/VizRenderer.jsx';
/** Insights renderer for insights panels. */
export { default as InsightsPanel } from './framework/core/insights/InsightsPanel.jsx';
/** Hook to run the insights engine. */
export { useInsights } from './framework/core/insights/useInsights.js';

/** Drill breadcrumb trail for drilldown interactions. */
export { default as DrillBreadcrumbs } from './framework/core/interactions/DrillBreadcrumbs.jsx';
/** Helpers for cross-filter interactions. */
export {
  buildCrossFilterSelectionFromEvent,
  isSelectionDuplicate,
} from './framework/core/interactions/crossFilter.js';
/** Helpers for drilldown interactions. */
export {
  applyDrilldownToDimensions,
  buildDrilldownEntryFromEvent,
  isDrilldownDuplicate,
} from './framework/core/interactions/drilldown.js';
/** Helpers for brush/zoom interactions. */
export {
  buildBrushFilter,
  formatBrushRangeLabel,
  getBrushRange,
  removeBrushFilter,
  upsertBrushFilter,
} from './framework/core/interactions/brushZoom.js';
/** Resolve palette classes for panels. */
export { resolvePalette } from './framework/core/viz/palettes/paletteResolver.js';

/** Create a dataset definition for the semantic layer. */
export { default as createDataset } from './framework/core/model/createDataset.js';
/** Create hierarchy definitions for semantic layer drilldowns. */
export { createHierarchy } from './framework/core/model/hierarchies.js';
/** Create a dimension definition for the semantic layer. */
export { default as createDimension } from './framework/core/model/createDimension.js';
/** Field type constants for dimensions. */
export { FIELD_TYPES } from './framework/core/model/fieldTypes.js';
/** Create a metric definition for the semantic layer. */
export { default as createMetric } from './framework/core/model/createMetric.js';