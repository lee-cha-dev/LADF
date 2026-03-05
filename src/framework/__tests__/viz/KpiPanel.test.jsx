import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import KpiVariant from '../../core/viz/charts/KpiVariant.jsx';

describe('KpiPanel', () => {
  const data = [{ value: 1234, percent: 0.42, duration: 3661 }];

  it('falls back to the clean variant for unknown variant ids', () => {
    const { container } = render(
      <KpiVariant data={data} encodings={{ value: 'value' }} options={{ variant: 'unknown' }} />
    );
    const root = container.querySelector('.ladf-kpi');
    expect(root?.classList.contains('ladf-kpi--clean')).toBe(true);
  });

  it('applies subtype as a modifier class when provided', () => {
    const { container } = render(
      <KpiVariant
        data={data}
        encodings={{ value: 'value', label: 'Overtime' }}
        options={{ subtype: 'large-value' }}
      />
    );
    const root = container.querySelector('.ladf-kpi');
    expect(root?.className).toContain('ladf-kpi--subtype-large-value');
  });

  it('formats values according to number, percent, currency, compact, and duration options', () => {
    const { getByText, rerender } = render(
      <KpiVariant data={data} encodings={{ value: 'percent' }} options={{ format: 'percent', decimals: 1 }} />
    );
    expect(getByText(/42(\.|,)?0%/)).toBeInTheDocument();

    rerender(
      <KpiVariant
        data={data}
        encodings={{ value: 'value' }}
        options={{ format: 'currency', currency: 'USD', decimals: 2 }}
      />
    );
    expect(getByText(/1,?234/)).toBeInTheDocument();

    rerender(
      <KpiVariant data={data} encodings={{ value: 'value' }} options={{ format: 'compact', decimals: 1 }} />
    );
    expect(getByText(/1\.2/)).toBeInTheDocument();

    rerender(
      <KpiVariant data={data} encodings={{ value: 'duration' }} options={{ format: 'duration', decimals: 0 }} />
    );
    expect(getByText(/1h 1m 1s/)).toBeInTheDocument();
  });

  it('applies subtype formatting by default and respects explicit format overrides', () => {
    const { getByText, rerender } = render(
      <KpiVariant data={data} encodings={{ value: 'percent' }} options={{ subtype: 'percentage' }} />
    );
    expect(getByText(/42(\.|,)?0%/)).toBeInTheDocument();

    rerender(
      <KpiVariant
        data={data}
        encodings={{ value: 'percent' }}
        options={{ subtype: 'currency', format: 'percent', decimals: 1 }}
      />
    );
    expect(getByText(/42(\.|,)?0%/)).toBeInTheDocument();
  });

  it('ignores badge text on non-compact variants and renders it for compact', () => {
    const { queryByText, rerender } = render(
      <KpiVariant
        data={data}
        encodings={{ value: 'value' }}
        options={{ badgeText: 'Badge', variant: 'clean' }}
      />
    );
    expect(queryByText('Badge')).toBeNull();

    rerender(
      <KpiVariant
        data={data}
        encodings={{ value: 'value' }}
        options={{ badgeText: 'Badge', badgeTone: 'success', variant: 'compact' }}
      />
    );
    expect(queryByText('Badge')).toBeInTheDocument();
  });

  it('prefers data-driven trend labels over manual labels when a label key is present', () => {
    const row = { value: 120, delta: 23.4, delta_label: 'QoQ' };
    const { getByText, queryByText } = render(
      <KpiVariant
        data={[row]}
        encodings={{ value: 'value', trendValue: 'delta', trendLabel: 'delta_label' }}
        options={{ trendLabel: 'Manual label' }}
      />
    );
    expect(getByText('QoQ')).toBeInTheDocument();
    expect(queryByText('Manual label')).toBeNull();
  });

  it('falls back to trend value when the primary value is missing', () => {
    const rows = [{ primary: null, trend: 15 }];
    const { getByText } = render(
      <KpiVariant data={rows} encodings={{ value: 'primary', trendValue: 'trend' }} />
    );
    expect(getByText(/^15$/)).toBeInTheDocument();
  });

  it('keeps the primary value when trend data is also present', () => {
    const rows = [{ primary: 9, trend: 2 }];
    const { getByText } = render(
      <KpiVariant data={rows} encodings={{ value: 'primary', trendValue: 'trend' }} />
    );
    expect(getByText(/^9$/)).toBeInTheDocument();
  });

  it('keeps the primary value when sparkline values come from a different key', () => {
    const series = [
      { month: '2024-01', primary: 5, spark: 10 },
      { month: '2024-02', primary: 8, spark: 20 },
    ];
    const { getByText } = render(
      <KpiVariant
        data={series}
        encodings={{ value: 'primary' }}
        options={{ sparklineFromData: true, sparklineValueKey: 'spark' }}
      />
    );
    expect(getByText(/^8$/)).toBeInTheDocument();
  });

  it('uses panel title and subtitle as defaults when label/caption are not provided', () => {
    const { container, getByText } = render(
      <KpiVariant
        data={data}
        encodings={{ value: 'value', label: 'Headerless' }}
        options={{ variant: 'clean' }}
        panelConfig={{ title: 'Panel Title', subtitle: 'Panel Subtitle' }}
      />
    );
    expect(getByText('Panel Title')).toBeInTheDocument();
    expect(getByText('Panel Subtitle')).toBeInTheDocument();
    const root = container.querySelector('.ladf-kpi');
    expect(root?.classList.contains('ladf-kpi--embedded')).toBe(false);
  });
});
