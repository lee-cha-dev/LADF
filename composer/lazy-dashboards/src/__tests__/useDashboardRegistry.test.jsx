import React from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import useDashboardRegistry from '../hooks/useDashboardRegistry.js';
import { STORAGE_KEY, createDashboard } from '../data/dashboardRegistry.js';

const RegistryProbe = () => {
  const registry = useDashboardRegistry();
  return (
    <div>
      <div data-testid="count">{registry.dashboards.length}</div>
      <button type="button" onClick={() => registry.createDashboard({ name: 'New' })}>
        Create
      </button>
    </div>
  );
};

describe('useDashboardRegistry', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates state after create actions', async () => {
    const { getByText, getByTestId } = render(<RegistryProbe />);

    expect(getByTestId('count').textContent).toBe('0');
    fireEvent.click(getByText('Create'));

    await waitFor(() => {
      expect(getByTestId('count').textContent).toBe('1');
    });
  });

  it('refreshes on storage events', async () => {
    const { getByTestId } = render(<RegistryProbe />);

    expect(getByTestId('count').textContent).toBe('0');

    createDashboard({ name: 'Storage Update' });
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: STORAGE_KEY })
      );
    });

    await waitFor(() => {
      expect(getByTestId('count').textContent).toBe('1');
    });
  });
});
