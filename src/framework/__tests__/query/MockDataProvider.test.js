import { describe, expect, it } from 'vitest';
import { MockDataProvider } from '../../core/query/MockDataProvider.js';

describe('MockDataProvider', () => {
  it('returns deterministic rows for the same query spec', async () => {
    const querySpec = {
      datasetId: 'sales',
      measures: ['revenue'],
      dimensions: ['region'],
    };

    const first = await MockDataProvider.execute(querySpec, {});
    const second = await MockDataProvider.execute(querySpec, {});

    expect(first.rows).toEqual(second.rows);
    expect(first.meta.rowCount).toBe(first.rows.length);
  });

  it('respects explicit time ranges for date dimensions', async () => {
    const querySpec = {
      datasetId: 'sales',
      measures: ['revenue'],
      dimensions: ['order_date'],
      timeRange: { start: '2024-01-01', end: '2024-01-03' },
    };

    const result = await MockDataProvider.execute(querySpec, {});
    expect(result.rows.length).toBe(3);
    expect(result.meta.rowCount).toBe(3);
  });
});
