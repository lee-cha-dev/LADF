import { describe, expect, it } from 'vitest';
import {
  buildDefaultSemanticLayer,
  buildDimensionSuggestions,
  buildMetricSuggestions,
} from '../data/semanticLayer.js';

describe('semanticLayer helpers', () => {
  const columns = [
    { id: 'region', inferredType: 'string', inferredRole: 'dimension' },
    { id: 'amount', inferredType: 'number', inferredRole: 'metric' },
  ];

  it('builds dimension suggestions from columns', () => {
    const dimensions = buildDimensionSuggestions(columns);
    expect(dimensions[0]).toMatchObject({ id: 'region', type: 'string' });
  });

  it('builds metric suggestions from numeric columns', () => {
    const metrics = buildMetricSuggestions(columns);
    const group = metrics.find((entry) => entry.fieldId === 'amount');
    expect(group.metrics.length).toBeGreaterThan(0);
  });

  it('builds default semantic layer from columns', () => {
    const layer = buildDefaultSemanticLayer(columns);
    expect(layer.dimensions.length).toBeGreaterThan(0);
    expect(layer.metrics.length).toBeGreaterThan(0);
  });
});
