/**
 * @module core/viz/charts/BarWithConditionalColoringPanel
 * @description Bar chart visualization panel with per-bar conditional colors.
 */
import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartContainer from '../common/ChartContainer.jsx';
import ChartTooltip from '../common/ChartTooltip.jsx';
import { getChartColor, getChartColorClass } from '../common/chartColors';
import { getSeriesColor } from '../palettes/seriesColors';
import { resolveXAxisProps, resolveYAxisProps } from './axisOptions';

const legendColorClassMap = {
  'var(--ladf-accent-primary)': 'ladf-chart-legend__swatch--accent-primary',
  'var(--ladf-accent-secondary)': 'ladf-chart-legend__swatch--accent-secondary',
  'var(--ladf-accent-success)': 'ladf-chart-legend__swatch--accent-success',
  'var(--ladf-accent-warning)': 'ladf-chart-legend__swatch--accent-warning',
  'var(--ladf-accent-danger)': 'ladf-chart-legend__swatch--accent-danger',
};

/**
 * @typedef {Object} BarWithConditionalColoringPanelProps
 * @property {Array<Object>} [data] - Chart data rows.
 * @property {Object} [encodings] - Encoding map (x/y/color).
 * @property {Object} [options] - Chart options (tooltip, colorFn, legendItems).
 * @property {Object} [handlers] - Interaction handlers (onClick).
 * @property {Object|null} [colorAssignment] - Palette assignment helper.
 * @property {Set<string>} [hiddenKeys] - Keys hidden via legend toggles.
 */

const resolveLegendSwatchClass = (color, index) => {
  if (color && legendColorClassMap[color]) {
    return legendColorClassMap[color];
  }
  return getChartColorClass(index);
};

const resolveBarColor = ({ row, encodings, options, colorAssignment }) => {
  if (typeof options?.colorFn === 'function') {
    return options.colorFn(row);
  }
  if (encodings?.color) {
    return row?.[encodings.color]
      ? 'var(--ladf-accent-warning)'
      : 'var(--ladf-accent-primary)';
  }
  if (colorAssignment?.mode === 'category') {
    const categoryKey = row?.[encodings?.x];
    const assignedColor = colorAssignment?.getColor?.(categoryKey);
    if (assignedColor) {
      return assignedColor;
    }
  }
  if (
    colorAssignment?.mode === 'diverging' ||
    colorAssignment?.mode === 'sequential'
  ) {
    const value = row?.[encodings?.y];
    const assignedColor = colorAssignment?.getColor?.(value);
    if (assignedColor) {
      return assignedColor;
    }
  }
  if (colorAssignment?.mode === 'series' || colorAssignment?.mode === 'single') {
    const assignedColor = colorAssignment?.getColor?.(encodings?.y);
    if (assignedColor) {
      return assignedColor;
    }
  }
  return 'var(--ladf-accent-primary)';
};

/**
 * Render a bar chart panel with conditional bar colors.
 * @param {BarWithConditionalColoringPanelProps} props - Chart props.
 * @returns {JSX.Element} Chart panel.
 */
function BarWithConditionalColoringPanel({
  data = [],
  encodings = {},
  options = {},
  handlers = {},
  colorAssignment,
  hiddenKeys,
}) {
  const showTooltip = options.tooltip !== false;
  const legendItems = Array.isArray(options.legendItems) ? options.legendItems : [];
  const orientation = options.orientation === 'horizontal' ? 'horizontal' : 'vertical';
  const isHorizontal = orientation === 'horizontal';
  const chartData = useMemo(() => {
    if (hiddenKeys?.size && encodings?.x) {
      return data.filter((row) => !hiddenKeys.has(String(row?.[encodings.x])));
    }
    return data;
  }, [data, encodings.x, hiddenKeys]);
  const barRadius = isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0];
  const xAxisProps = resolveXAxisProps(options);
  const yAxisProps = resolveYAxisProps(options);

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        >
          <CartesianGrid stroke="var(--ladf-chart-grid)" strokeDasharray="3 3" />
          {isHorizontal ? (
            <>
              <XAxis
                type="number"
                {...xAxisProps}
              />
              <YAxis
                type="category"
                dataKey={encodings.x}
                {...yAxisProps}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={encodings.x}
                {...xAxisProps}
              />
              <YAxis
                {...yAxisProps}
              />
            </>
          )}
          {showTooltip ? <Tooltip content={<ChartTooltip />} /> : null}
          <Bar
            dataKey={encodings.y}
            fill={getSeriesColor(0)}
            radius={barRadius}
            onClick={handlers.onClick}
          >
            {chartData.map((row, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  resolveBarColor({ row, index, encodings, options, colorAssignment }) ||
                  getChartColor(index)
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {legendItems.length ? (
        <ul className="ladf-chart-legend">
          {legendItems.map((item, index) => (
            <li
              key={`${item.label || 'legend'}-${index}`}
              className="ladf-chart-legend__item"
            >
              <span
                className={[
                  'ladf-chart-legend__swatch',
                  resolveLegendSwatchClass(item.color, index),
                ].join(' ')}
              />
              <span className="ladf-chart-legend__label">{item.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </ChartContainer>
  );
}

export default BarWithConditionalColoringPanel;
