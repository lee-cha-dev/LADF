/**
 * @fileoverview Coverage for multi-datasource provider routing.
 */

import { describe, expect, it } from 'vitest';
import {
  createDataProvider,
  createMultiDataProvider,
} from '../../core/query/DataProvider.js';

describe('createMultiDataProvider', () => {
  it('routes queries by datasetId', async () => {
    const alpha = createDataProvider(async (querySpec) => ({
      rows: [{ id: 'alpha', datasetId: querySpec.datasetId }],
      meta: { source: 'alpha' },
    }));
    const beta = createDataProvider(async (querySpec) => ({
      rows: [{ id: 'beta', datasetId: querySpec.datasetId }],
      meta: { source: 'beta' },
    }));

    const provider = createMultiDataProvider({
      alpha,
      beta,
    });

    const result = await provider.execute(
      { datasetId: 'beta' },
      { signal: new AbortController().signal }
    );
    expect(result.meta.source).toBe('beta');
    expect(result.rows[0].datasetId).toBe('beta');
  });

  it('falls back to the default provider when needed', async () => {
    const fallback = createDataProvider(async () => ({
      rows: [{ id: 'fallback' }],
      meta: { source: 'fallback' },
    }));
    const provider = createMultiDataProvider(
      {},
      { defaultProvider: fallback }
    );

    const result = await provider.execute(
      { datasetId: 'unknown' },
      { signal: new AbortController().signal }
    );
    expect(result.meta.source).toBe('fallback');
  });
});
