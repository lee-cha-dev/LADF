import React, { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { createDataProvider } from '../../core/query/DataProvider.js';
import { createQueryCache } from '../../core/query/cache.js';
import { useQuery } from '../../core/query/useQuery.js';
import { hashQuerySpec } from '../../core/query/hashQuerySpec.js';

const QueryProbe = ({ querySpec, provider, cache, options, onState }) => {
  const result = useQuery(querySpec, { provider, cache, ...options });

  useEffect(() => {
    if (onState) {
      onState(result);
    }
  }, [result, onState]);

  return (
    <div>
      <div data-testid="status">{result.status}</div>
      <div data-testid="data-count">
        {Array.isArray(result.data) ? result.data.length : 0}
      </div>
    </div>
  );
};

describe('useQuery', () => {
  it('fetches data and reports success', async () => {
    const provider = createDataProvider(async () => ({
      rows: [{ id: 1 }, { id: 2 }],
      meta: { rowCount: 2 },
    }));

    const cache = createQueryCache();
    const { getByTestId } = render(
      <QueryProbe
        querySpec={{ datasetId: 'sales', measures: [] }}
        provider={provider}
        cache={cache}
      />
    );

    await waitFor(() => {
      expect(getByTestId('status').textContent).toBe('success');
    });

    expect(getByTestId('data-count').textContent).toBe('2');
  });

  it('supports strict validation errors', async () => {
    const provider = createDataProvider(async () => ({
      rows: 'bad',
      meta: 'bad',
    }));

    const cache = createQueryCache();
    const { getByTestId } = render(
      <QueryProbe
        querySpec={{ datasetId: 'sales', measures: [] }}
        provider={provider}
        cache={cache}
        options={{ strictResultValidation: true }}
      />
    );

    await waitFor(() => {
      expect(getByTestId('status').textContent).toBe('error');
    });
  });

  it('skips execution when disabled', async () => {
    const execute = vi.fn(async () => ({ rows: [] }));
    const provider = createDataProvider(execute);

    render(
      <QueryProbe
        querySpec={{ datasetId: 'sales', measures: [] }}
        provider={provider}
        cache={createQueryCache()}
        options={{ enabled: false }}
      />
    );

    await waitFor(() => {
      expect(execute).not.toHaveBeenCalled();
    });
  });

  it('refetches when staleTime is zero even with cached data', async () => {
    const execute = vi.fn(async () => ({ rows: [{ id: 1 }] }));
    const provider = createDataProvider(execute);
    const cache = createQueryCache();
    const querySpec = { datasetId: 'sales', measures: [] };

    cache.set(hashQuerySpec(querySpec), {
      status: 'success',
      data: [{ id: 99 }],
      meta: null,
      error: null,
      updatedAt: Date.now(),
    });

    render(
      <QueryProbe
        querySpec={querySpec}
        provider={provider}
        cache={cache}
        options={{ staleTime: 0 }}
      />
    );

    await waitFor(() => {
      expect(execute).toHaveBeenCalledTimes(1);
    });
  });

  it('shares in-flight promises across subscribers', async () => {
    const execute = vi.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ rows: [{ id: 1 }], meta: {} }), 10)
        )
    );
    const provider = createDataProvider(execute);
    const cache = createQueryCache();
    const querySpec = { datasetId: 'sales', measures: [] };

    const { rerender } = render(
      <>
        <QueryProbe querySpec={querySpec} provider={provider} cache={cache} />
        <QueryProbe querySpec={querySpec} provider={provider} cache={cache} />
      </>
    );

    await waitFor(() => {
      expect(execute).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      const cached = cache.get(hashQuerySpec(querySpec));
      expect(cached?.status).toBe('success');
    });

    rerender(
      <QueryProbe querySpec={querySpec} provider={provider} cache={cache} />
    );
  });

  it('respects staleTime Infinity and does not refetch', async () => {
    const execute = vi.fn(async () => ({ rows: [{ id: 1 }], meta: {} }));
    const provider = createDataProvider(execute);
    const cache = createQueryCache();
    const querySpec = { datasetId: 'sales', measures: [] };

    cache.set(hashQuerySpec(querySpec), {
      status: 'success',
      data: [{ id: 42 }],
      meta: { rowCount: 1 },
      error: null,
      updatedAt: Date.now(),
    });

    const { getByTestId } = render(
      <QueryProbe
        querySpec={querySpec}
        provider={provider}
        cache={cache}
        options={{ staleTime: Infinity }}
      />
    );

    await waitFor(() => {
      expect(getByTestId('status').textContent).toBe('success');
    });
    expect(execute).not.toHaveBeenCalled();
  });

  it('aborts in-flight requests on unmount', async () => {
    const abortSpy = vi.fn();
    const execute = vi.fn(
      (_querySpec, { signal }) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => {
            abortSpy();
            reject(new DOMException('Aborted', 'AbortError'));
          });
        })
    );
    const provider = createDataProvider(execute);
    const cache = createQueryCache();
    const querySpec = { datasetId: 'sales', measures: [] };

    const { unmount } = render(
      <QueryProbe querySpec={querySpec} provider={provider} cache={cache} />
    );

    await waitFor(() => {
      expect(execute).toHaveBeenCalledTimes(1);
    });

    unmount();

    await waitFor(() => {
      expect(abortSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('invokes onSuccess and onError callbacks', async () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();
    const successProvider = createDataProvider(async () => ({ rows: [{ id: 1 }], meta: {} }));
    const errorProvider = createDataProvider(async () => {
      throw new Error('Boom');
    });

    const { rerender } = render(
      <QueryProbe
        querySpec={{ datasetId: 'sales', measures: [] }}
        provider={successProvider}
        cache={createQueryCache()}
        options={{ onSuccess, onError }}
      />
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    rerender(
      <QueryProbe
        querySpec={{ datasetId: 'sales', measures: [] }}
        provider={errorProvider}
        cache={createQueryCache()}
        options={{ onSuccess, onError }}
      />
    );

    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });

  it('honors custom validation outcomes', async () => {
    const provider = createDataProvider(async () => ({ rows: [{ id: 1 }], meta: {} }));
    const cache = createQueryCache();
    const validator = vi.fn(() => ({ valid: false, errors: ['bad data'] }));

    const { getByTestId } = render(
      <QueryProbe
        querySpec={{ datasetId: 'sales', measures: [] }}
        provider={provider}
        cache={cache}
        options={{ validateResult: validator }}
      />
    );

    await waitFor(() => {
      expect(getByTestId('status').textContent).toBe('success');
    });
    expect(getByTestId('data-count').textContent).toBe('0');
  });
});
