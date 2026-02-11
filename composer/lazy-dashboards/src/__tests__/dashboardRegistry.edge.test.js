import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  STORAGE_KEY,
  createDashboard,
  listDashboards,
  renameDashboard,
  updateDashboard,
} from '../data/dashboardRegistry.js';

const seedRegistry = (dashboards) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ dashboards })
  );
};

describe('dashboardRegistry edge cases', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-01T00:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('generates the next untitled dashboard name', () => {
    seedRegistry([
      { id: '1', name: 'Untitled Dashboard', updatedAt: '2024-01-01T00:00:00Z' },
      { id: '2', name: 'Untitled Dashboard 2', updatedAt: '2024-01-02T00:00:00Z' },
    ]);

    const created = createDashboard();
    expect(created.name).toBe('Untitled Dashboard 3');
    expect(created.id).toMatch(/untitled-dashboard-3/);
  });

  it('renames dashboards to a fallback when name is empty', () => {
    const created = createDashboard({ name: 'Ops' });
    const renamed = renameDashboard(created.id, '  ');

    expect(renamed.name).toBe('Untitled Dashboard');
  });

  it('normalizes authoring model on update', () => {
    const created = createDashboard({ name: 'Normalize' });

    const updated = updateDashboard(created.id, {
      authoringModel: {
        meta: { title: 'Normalized' },
        widgets: [],
      },
    });

    expect(updated.authoringModel.schemaVersion).toBe(1);
    expect(updated.authoringModel.datasources.length).toBe(1);
    expect(updated.authoringModel.activeDatasourceId).toBe('datasource');
  });

  it('lists dashboards sorted by updated timestamp', () => {
    seedRegistry([
      { id: 'a', name: 'Older', updatedAt: '2024-01-01T00:00:00Z' },
      { id: 'b', name: 'Newer', updatedAt: '2024-01-05T00:00:00Z' },
    ]);

    const dashboards = listDashboards();
    expect(dashboards.map((dash) => dash.id)).toEqual(['b', 'a']);
  });
});
