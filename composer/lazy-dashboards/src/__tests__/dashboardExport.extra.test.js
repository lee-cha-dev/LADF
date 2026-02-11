import { describe, expect, it } from 'vitest';
import { buildDashboardExport } from '../data/dashboardExport.js';

describe('dashboardExport extras', () => {
  it('includes LazyFilterBar when a filter panel exists', () => {
    const exportPlan = buildDashboardExport({
      dashboard: { id: 'dash-1', name: 'Filter Board' },
      compiled: {
        config: {
          datasetId: 'ds-1',
          panels: [{ id: 'filter', panelType: 'viz', vizType: 'filterBar' }],
        },
        modules: {
          dashboard: 'export default {}',
          dataset: 'export default {}',
          dimensions: 'export default []',
          metrics: 'export default []',
        },
      },
    });

    expect(exportPlan.files).toHaveProperty('utils/LazyFilterBar.jsx');
  });

  it('wires theme and palette defaults into component source', () => {
    const exportPlan = buildDashboardExport({
      dashboard: { id: 'dash-2', name: 'Theme Board' },
      compiled: {
        config: { datasetId: 'ds-1', panels: [] },
        modules: {
          dashboard: 'export default {}',
          dataset: 'export default {}',
          dimensions: 'export default []',
          metrics: 'export default []',
        },
      },
      themeFamily: 'nord',
      themeMode: 'dark',
      paletteId: 'analytics',
    });

    const source = exportPlan.files[`${exportPlan.componentName}.jsx`];
    expect(source).toContain('EXPORTED_THEME_FAMILY = "nord"');
    expect(source).toContain('EXPORTED_THEME_MODE = "dark"');
    expect(source).toContain('EXPORTED_PALETTE_ID = "analytics"');
  });

  it('handles multi-api providers when datasources are api backed', () => {
    const exportPlan = buildDashboardExport({
      dashboard: { id: 'dash-3', name: 'Multi API' },
      authoringModel: {
        meta: { title: 'Multi API' },
        datasources: [
          {
            id: 'sales',
            name: 'Sales',
            datasetBinding: { source: { type: 'api' } },
            semanticLayer: { enabled: true, metrics: [], dimensions: [] },
          },
          {
            id: 'inventory',
            name: 'Inventory',
            datasetBinding: { source: { type: 'api' } },
            semanticLayer: { enabled: true, metrics: [], dimensions: [] },
          },
        ],
        widgets: [],
        layout: [],
      },
      compiled: {
        config: { datasetId: 'sales', panels: [] },
        modules: {
          dashboard: 'export default {}',
          dataset: 'export default {}',
          dimensions: 'export default []',
          metrics: 'export default []',
          dataProvider: 'export const ApiDataProviders = {};',
        },
      },
    });

    const source = exportPlan.files[`${exportPlan.componentName}.jsx`];
    expect(source).toContain('createExternalApiMultiProvider');
  });
});
