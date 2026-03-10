import { describe, expect, it } from 'vitest';
import { hashQuerySpec } from '../../core/query/hashQuerySpec.js';

describe('hashQuerySpec', () => {
  it('creates stable hashes for semantically equivalent specs', () => {
    const specA = {
      datasetId: 'sales',
      measures: ['revenue', 'orders'],
      dimensions: ['region', 'segment'],
      filters: [
        { field: 'region', op: 'IN', values: ['East', 'West'] },
        { field: 'segment', op: 'IN', values: ['Enterprise', 'SMB'] },
      ],
    };
    const specB = {
      datasetId: 'sales',
      measures: ['orders', 'revenue'],
      dimensions: ['segment', 'region'],
      filters: [
        { field: 'segment', op: 'IN', values: ['SMB', 'Enterprise'] },
        { field: 'region', op: 'IN', values: ['West', 'East'] },
      ],
    };

    expect(hashQuerySpec(specA)).toBe(hashQuerySpec(specB));
  });

  it('changes when query inputs change', () => {
    const base = { datasetId: 'sales', measures: ['revenue'] };
    expect(hashQuerySpec(base)).not.toBe(hashQuerySpec({ ...base, datasetId: 'inventory' }));
  });
});
