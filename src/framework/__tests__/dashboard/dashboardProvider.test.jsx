import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import DashboardProvider from '../../core/dashboard/DashboardProvider.jsx';
import { useDashboardActions } from '../../core/dashboard/useDashboardActions.js';
import { useDashboardState } from '../../core/dashboard/useDashboardState.js';

const StateProbe = () => {
  const state = useDashboardState();
  return <pre data-testid="state">{JSON.stringify(state)}</pre>;
};

const ActionsProbe = () => {
  const actions = useDashboardActions();
  return (
    <div>
      <button type="button" onClick={() => actions.setDashboardContext({ dashboardId: 'dash-2', datasetId: 'ds-2' })}>
        Set Context
      </button>
      <button
        type="button"
        onClick={() =>
          actions.setGlobalFilters([{ field: 'region', op: 'IN', values: ['West'] }])
        }
      >
        Set Filters
      </button>
      <button
        type="button"
        onClick={() =>
          actions.addSelection({
            id: 'sel-1',
            sourcePanelId: 'panel-1',
            label: 'Region: West',
            filter: { field: 'region', op: 'IN', values: ['West'] },
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
            label: 'order_month: 2024-01',
          })
        }
      >
        Add Drill
      </button>
      <button
        type="button"
        onClick={() => actions.setPanelState('panel-1', { expanded: false })}
      >
        Set Panel
      </button>
    </div>
  );
};

const parseState = (node) => JSON.parse(node.textContent || '{}');

describe('DashboardProvider', () => {
  it('provides state and bound actions', () => {
    const { getByText, getByTestId } = render(
      <DashboardProvider initialState={{ dashboardId: 'dash-1', datasetId: 'ds-1' }}>
        <ActionsProbe />
        <StateProbe />
      </DashboardProvider>
    );

    const stateNode = getByTestId('state');
    expect(parseState(stateNode).dashboardId).toBe('dash-1');

    fireEvent.click(getByText('Set Context'));
    expect(parseState(stateNode)).toMatchObject({
      dashboardId: 'dash-2',
      datasetId: 'ds-2',
    });

    fireEvent.click(getByText('Set Filters'));
    expect(parseState(stateNode).globalFilters).toEqual([
      { field: 'region', op: 'IN', values: ['West'] },
    ]);

    fireEvent.click(getByText('Add Selection'));
    expect(parseState(stateNode).selections).toHaveLength(1);

    fireEvent.click(getByText('Add Drill'));
    expect(parseState(stateNode).drillPath).toHaveLength(1);

    fireEvent.click(getByText('Set Panel'));
    expect(parseState(stateNode).panelStateById['panel-1']).toEqual({
      expanded: false,
    });
  });
});
