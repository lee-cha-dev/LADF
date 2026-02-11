/**
 * @fileoverview Ensures widget field options are scoped to the selected datasource.
 */

import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { listVizManifests } from '../authoring/vizManifest.js';
import WidgetPropertiesPanel from '../components/editor/WidgetPropertiesPanel.jsx';

describe('WidgetPropertiesPanel datasource scoping', () => {
  it('limits field options to the active widget datasource', () => {
    const authoringModel = {
      widgets: [
        {
          id: 'widget-1',
          panelType: 'viz',
          vizType: 'kpi',
          title: 'KPI',
          subtitle: '',
          datasourceId: 'sales',
          encodings: { value: 'revenue' },
          options: {},
          layout: { x: 1, y: 1, w: 3, h: 1 },
        },
      ],
    };
    const datasources = [
      {
        id: 'sales',
        name: 'Sales',
        datasetBinding: {
          columns: [{ id: 'revenue' }, { id: 'region' }],
        },
        semanticLayer: { enabled: false, metrics: [], dimensions: [] },
      },
      {
        id: 'inventory',
        name: 'Inventory',
        datasetBinding: {
          columns: [{ id: 'sku' }, { id: 'on_hand' }],
        },
        semanticLayer: { enabled: false, metrics: [], dimensions: [] },
      },
    ];

    const html = renderToStaticMarkup(
      <WidgetPropertiesPanel
        authoringModel={authoringModel}
        activeWidgetId="widget-1"
        vizManifests={listVizManifests()}
        datasources={datasources}
        activeDatasourceId="sales"
        validation={{ widgets: { 'widget-1': { errors: [], status: 'valid' } } }}
        manifestCoverage={{ errors: [] }}
        compiledPanelMap={new Map()}
        onUpdateAuthoringModel={() => {}}
        onRequestRemoveWidget={() => {}}
      />
    );

    expect(html).toContain('value="revenue"');
    expect(html).toContain('value="region"');
    expect(html).not.toContain('value="sku"');
    expect(html).not.toContain('value="on_hand"');
  });
});
