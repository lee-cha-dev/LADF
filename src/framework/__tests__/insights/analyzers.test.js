import { describe, expect, it } from 'vitest';
import { findMeasureId } from '../../core/insights/analyzers/analysisUtils.js';
import anomalyAnalyzer from '../../core/insights/analyzers/anomaly.js';
import topDriversAnalyzer from '../../core/insights/analyzers/topDrivers.js';
import trendAnalyzer from '../../core/insights/analyzers/trend.js';

describe('analysisUtils', () => {
  it('prefers querySpec measures when available', () => {
    const measure = findMeasureId([{ revenue: 10 }], { measures: ['revenue'] });
    expect(measure).toBe('revenue');
  });

  it('falls back to the first numeric field', () => {
    const measure = findMeasureId([{ label: 'A', value: 12 }], null);
    expect(measure).toBe('value');
  });
});

describe('anomaly analyzer', () => {
  it('returns no insights for short series', () => {
    const result = anomalyAnalyzer.analyze({
      rows: [{ value: 1 }, { value: 2 }],
      querySpec: { measures: ['value'] },
    });
    expect(result).toEqual([]);
  });

  it('flags positive anomalies', () => {
    const result = anomalyAnalyzer.analyze({
      rows: [
        { value: 10 },
        { value: 11 },
        { value: 9 },
        { value: 10 },
        { value: 30 },
      ],
      querySpec: { measures: ['value'] },
    });

    expect(result.title).toBe('Recent anomaly detected');
    expect(result.severity).toBe('warning');
  });

  it('flags negative anomalies', () => {
    const result = anomalyAnalyzer.analyze({
      rows: [
        { value: 10 },
        { value: 12 },
        { value: 11 },
        { value: 9 },
        { value: 0 },
      ],
      querySpec: { measures: ['value'] },
    });

    expect(result.severity).toBe('negative');
  });
});

describe('topDrivers analyzer', () => {
  it('returns an insight when a top driver dominates', () => {
    const result = topDriversAnalyzer.analyze({
      rows: [
        { region: 'West', revenue: 60 },
        { region: 'East', revenue: 20 },
        { region: 'South', revenue: 20 },
      ],
      querySpec: { dimensions: ['region'], measures: ['revenue'] },
    });

    expect(result.title).toBe('Top driver: West');
    expect(result.evidence).toHaveLength(3);
  });

  it('returns nothing when no driver exceeds threshold', () => {
    const result = topDriversAnalyzer.analyze({
      rows: [
        { region: 'West', revenue: 10 },
        { region: 'East', revenue: 10 },
        { region: 'South', revenue: 10 },
        { region: 'North', revenue: 10 },
        { region: 'Central', revenue: 10 },
        { region: 'Intl', revenue: 10 },
      ],
      querySpec: { dimensions: ['region'], measures: ['revenue'] },
    });

    expect(result).toEqual([]);
  });
});

describe('trend analyzer', () => {
  it('labels upward trends as positive when magnitude is strong', () => {
    const result = trendAnalyzer.analyze({
      rows: [
        { value: 10 },
        { value: 15 },
      ],
      querySpec: { measures: ['value'] },
      meta: { rowCount: 2 },
    });

    expect(result.title).toBe('Trend is upward');
    expect(result.severity).toBe('positive');
  });

  it('labels downward trends', () => {
    const result = trendAnalyzer.analyze({
      rows: [
        { value: 20 },
        { value: 10 },
      ],
      querySpec: { measures: ['value'] },
      meta: { rowCount: 2 },
    });

    expect(result.title).toBe('Trend is downward');
  });

  it('handles flat trends with a flat narrative', () => {
    const result = trendAnalyzer.analyze({
      rows: [
        { value: 10 },
        { value: 10 },
        { value: 10 },
      ],
      querySpec: { measures: ['value'] },
      meta: { rowCount: 3 },
    });

    expect(result.title).toBe('Trend is flat');
    expect(result.narrative).toContain('stayed flat across 3 points');
  });
});
