import { describe, expect, it } from 'vitest';
import { createLocalDataProvider } from '../data/localDataProvider.js';

describe('createLocalDataProvider', () => {
  const rows = [
    { region: 'West', amount: '10', date: '2024-01-01', flag: 'true' },
    { region: 'East', amount: '20', date: '2024-01-02', flag: 'false' },
    { region: 'West', amount: '5', date: '2024-01-03', flag: 'true' },
  ];
  const columns = [
    { id: 'region', inferredType: 'string' },
    { id: 'amount', inferredType: 'number' },
    { id: 'date', inferredType: 'date' },
    { id: 'flag', inferredType: 'bool' },
  ];
  const semanticLayer = {
    dimensions: [{ id: 'region', sourceField: 'region' }],
    metrics: [
      { id: 'sum_amount', query: { op: 'SUM', field: 'amount' } },
      { id: 'count_amount', query: { op: 'COUNT', field: 'amount' } },
    ],
  };

  it('aggregates by dimensions and measures', async () => {
    const provider = createLocalDataProvider({ rows, columns, semanticLayer });
    const result = await provider.execute({
      measures: ['sum_amount'],
      dimensions: ['region'],
    });

    const sorted = [...result.rows].sort((a, b) => a.region.localeCompare(b.region));
    expect(sorted).toEqual([
      { region: 'East', sum_amount: 20 },
      { region: 'West', sum_amount: 15 },
    ]);
    expect(result.meta.rowCount).toBe(2);
  });

  it('applies filters and pagination', async () => {
    const provider = createLocalDataProvider({ rows, columns, semanticLayer });
    const result = await provider.execute({
      measures: ['sum_amount', 'count_amount'],
      dimensions: ['region'],
      filters: [
        { field: 'region', op: 'IN', values: ['West'] },
        { field: 'date', op: 'BETWEEN', values: ['2024-01-01', '2024-01-03'] },
      ],
      offset: 0,
      limit: 1,
    });

    expect(result.rows).toEqual([
      { region: 'West', sum_amount: 15, count_amount: 2 },
    ]);
    expect(result.meta.filteredRows).toBe(2);
  });
});
