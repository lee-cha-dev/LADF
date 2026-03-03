/**
 * @module core/viz/charts/LineChartPanel
 * @description Line chart visualization panel using Recharts.
 */
import React, { useMemo } from 'react';
import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartContainer from '../common/ChartContainer.jsx';
import ChartTooltip from '../common/ChartTooltip.jsx';
import { pivotRows } from '../../query/transforms/pivot';
import { getSeriesColor, getSeriesColorsForKeys } from '../palettes/seriesColors';
import { resolveXAxisProps, resolveYAxisProps } from './axisOptions';

/**
 * Resolve series keys from encodings or data.
 * @param {Object} encodings - Encoding map for the visualization.
 * @param {Array<Object>} data - Chart data rows.
 * @returns {string[]} Series keys.
 */
const resolveSeriesKeys = (encodings, data) => {
  if (!encodings) {
    return [];
  }
  if (Array.isArray(encodings.y)) {
    return encodings.y;
  }
  if (encodings.y) {
    return [encodings.y];
  }
  if (data?.length) {
    return Object.keys(data[0]).filter((key) => key !== encodings.x);
  }
  return [];
};

const isZeroValue = (value) => {
  if (value === 0 || value === '0') {
    return true;
  }
  if (value == null || value === '') {
    return true;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) && value === 0;
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric === 0;
};

const isZeroRow = (row, keys) => {
  if (!row || !Array.isArray(keys) || keys.length === 0) {
    return false;
  }
  return keys.every((key) => isZeroValue(row?.[key]));
};

/**
 * @typedef {Object} LineChartPanelProps
 * @property {Array<Object>} [data] - Chart data rows.
 * @property {Object} [encodings] - Encoding map (x/y, stacked keys).
 * @property {Object} [options] - Chart options (tooltip, brush).
 * @property {Object} [handlers] - Interaction handlers (onClick, onBrushChange).
 * @property {Object|null} [colorAssignment] - Palette assignment helper.
 * @property {Set<string>} [hiddenKeys] - Keys hidden via legend toggles.
 */

/**
 * Render a line chart panel with optional brush interaction.
 * @param {LineChartPanelProps} props - Chart props.
 * @returns {JSX.Element} Chart panel.
 */
function LineChartPanel({
  data = [],
  encodings = {},
  options = {},
  handlers = {},
  colorAssignment,
  hiddenKeys,
}) {
  const assignedKeys = useMemo(() => {
    if (
      colorAssignment?.mode === 'series' ||
      colorAssignment?.mode === 'single' ||
      colorAssignment?.mode === 'category'
    ) {
      return colorAssignment.items.map((item) => item.key);
    }
    return [];
  }, [colorAssignment]);
  const { chartData, seriesKeys } = useMemo(() => {
    const filterZeroRows = options?.filterZeroRows === true;
    const groupKey = encodings.group || options.seriesBy;
    const xKey = encodings.x;
    const yKey = encodings.y;
    const shouldPivot =
      groupKey &&
      xKey &&
      typeof yKey === 'string' &&
      Array.isArray(data) &&
      data.length;
    if (shouldPivot) {
      const pivoted = pivotRows(data, {
        index: xKey,
        column: groupKey,
        value: yKey,
        fill: null,
      });
      const groupKeys = assignedKeys.length
        ? assignedKeys
        : Array.from(
            new Set(
              data.map((row) => row?.[groupKey]).filter((value) => value != null)
            )
          ).map((value) => String(value));
      const filtered = filterZeroRows
        ? pivoted.filter((row) => !isZeroRow(row, groupKeys))
        : pivoted;
      return { chartData: filtered, seriesKeys: groupKeys };
    }
    const useAssignedKeys =
      assignedKeys.length &&
      (colorAssignment?.mode !== 'category' || shouldPivot);
    const resolvedKeys = useAssignedKeys
      ? assignedKeys
      : resolveSeriesKeys(encodings, data);
    const filtered = filterZeroRows
      ? data.filter((row) => !isZeroRow(row, resolvedKeys))
      : data;
    return { chartData: filtered, seriesKeys: resolvedKeys };
  }, [
    data,
    encodings,
    assignedKeys,
    colorAssignment,
    options.filterZeroRows,
    options.seriesBy,
  ]);
  const visibleSeriesKeys = seriesKeys.filter((key) => !hiddenKeys?.has(String(key)));
  const showTooltip = options.tooltip !== false;
  const brushConfig = options.brush || {};
  const brushEnabled = Boolean(brushConfig.enabled) && chartData.length > 1;
  const seriesColors = useMemo(
    () => getSeriesColorsForKeys(seriesKeys),
    [seriesKeys]
  );
  const brushStartIndex =
    typeof brushConfig.startIndex === 'number' ? brushConfig.startIndex : undefined;
  const brushEndIndex =
    typeof brushConfig.endIndex === 'number' ? brushConfig.endIndex : undefined;
  const xAxisProps = resolveXAxisProps(options);
  const yAxisProps = resolveYAxisProps(options);

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="var(--ladf-chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey={encodings.x} {...xAxisProps} />
          <YAxis {...yAxisProps} />
          {showTooltip ? <Tooltip content={<ChartTooltip />} /> : null}
          {visibleSeriesKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={
                colorAssignment?.getColor?.(key) ||
                seriesColors[key] ||
                getSeriesColor(index)
              }
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5, onClick: handlers.onClick }}
              onClick={handlers.onClick}
            />
          ))}
          {brushEnabled ? (
            <Brush
              className="ladf-chart__brush"
              dataKey={encodings.x}
              height={24}
              travellerWidth={12}
              stroke="var(--ladf-accent-primary)"
              startIndex={brushStartIndex}
              endIndex={brushEndIndex}
              onChange={(range) => {
                if (handlers.onBrushChange) {
                  handlers.onBrushChange({
                    ...range,
                    data: chartData,
                    dataKey: encodings.x,
                  });
                }
              }}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default LineChartPanel;
