import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import DashboardProvider from '../../core/dashboard/DashboardProvider.jsx';
import { useDashboardActions } from '../../core/dashboard/useDashboardActions.js';
import { useDashboardState } from '../../core/dashboard/useDashboardState.js';
import { dashboardSelectors } from '../../core/dashboard/dashboardSelectors.js';
import { registerViz, vizRegistry } from '../../core/registry/registry.js';
import GridLayout from '../../core/layout/GridLayout.jsx';
import Panel from '../../core/layout/Panel.jsx';
import VizRenderer from '../../core/viz/VizRenderer.jsx';

const DummyViz = ({ data }) => (
  <div data-testid="dummy-viz">Rows: {data.length}</div>
);

if (!vizRegistry.has('dummy')) {
  registerViz('dummy', DummyViz);
}

const panelConfig = {
  id: 'panel-1',
  panelType: 'viz',
  vizType: 'dummy',
  title: 'Revenue',
  query: {
    measures: ['revenue'],
    dimensions: ['region'],
    filters: [{ field: 'channel', op: 'IN', values: ['Online'] }],
  },
  encodings: { x: 'region', y: 'revenue' },
  options: { legend: true },
  layout: { x: 1, y: 1, w: 6, h: 2 },
};

const DashboardHarness = () => {
  const state = useDashboardState();
  const actions = useDashboardActions();
  const querySpec = dashboardSelectors.selectDerivedQueryInputs(state, panelConfig);
  return (
    <div>
      <pre data-testid="query">{JSON.stringify(querySpec)}</pre>
      <pre data-testid="state">{JSON.stringify(state)}</pre>
      <button
        type="button"
        onClick={() =>
          actions.addSelection({
            id: 'sel-1',
            filter: { field: 'segment', op: 'IN', values: ['SMB'] },
          })
        }
      >
        Add Selection
      </button>
      <button
        type="button"
        onClick={() =>
          actions.pushDrillPath({
            id: 'drill-1',
            dimension: 'order_month',
            value: '2024-01',
          })
        }
      >
        Add Drill
      </button>
      <button
        type="button"
        onClick={() => actions.setPanelState('panel-1', { focused: true })}
      >
        Set Panel
      </button>
      <GridLayout
        panels={[panelConfig]}
        renderPanel={(panel) => (
          <Panel title={panel.title}>
            <VizRenderer
              panelConfig={panel}
              vizType={panel.vizType}
              data={[{ region: 'West', revenue: 10 }]}
              encodings={panel.encodings}
              options={panel.options}
            />
          </Panel>
        )}
      />
    </div>
  );
};

const parseJson = (node) => JSON.parse(node.textContent || '{}');

describe('Dashboard runtime integration', () => {
  it('propagates filters and renders registered viz components', () => {
    const { getByTestId, getByText } = render(
      <DashboardProvider
        initialState={{
          dashboardId: 'dash-1',
          datasetId: 'ds-1',
          globalFilters: [{ field: 'region', op: 'IN', values: ['West'] }],
        }}
      >
        <DashboardHarness />
      </DashboardProvider>
    );

    expect(getByTestId('dummy-viz').textContent).toContain('Rows: 1');

    const query = parseJson(getByTestId('query'));
    expect(query.filters).toEqual([
      { field: 'region', op: 'IN', values: ['West'] },
      { field: 'channel', op: 'IN', values: ['Online'] },
    ]);

    fireEvent.click(getByText('Add Selection'));
    fireEvent.click(getByText('Add Drill'));

    const updated = parseJson(getByTestId('query'));
    expect(updated.filters).toEqual([
      { field: 'region', op: 'IN', values: ['West'] },
      { field: 'segment', op: 'IN', values: ['SMB'] },
      { field: 'order_month', op: 'IN', values: ['2024-01'] },
      { field: 'channel', op: 'IN', values: ['Online'] },
    ]);

    fireEvent.click(getByText('Set Panel'));
    const state = parseJson(getByTestId('state'));
    expect(state.panelStateById['panel-1']).toEqual({ focused: true });
  });
});
