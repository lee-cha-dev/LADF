import { describe, it, expect } from 'vitest';
import * as LADF from '../../index.js';

describe('public API exports', () => {
  it('exposes core dashboard building blocks', () => {
    expect(LADF.DashboardProvider).toBeDefined();
    expect(LADF.GridLayout).toBeDefined();
  });

  it('exposes query helpers and hooks', () => {
    expect(typeof LADF.useQuery).toBe('function');
    expect(typeof LADF.buildQuerySpec).toBe('function');
  });
});

