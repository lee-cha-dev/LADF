/**
 * @module core/viz/charts/ScatterChartPanel
 * @description Scatter chart visualization panel using Recharts.
 */
import React, { useMemo } from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartContainer from '../common/ChartContainer.jsx';
import ChartTooltip from '../common/ChartTooltip.jsx';
import { getSeriesColor, getSeriesColorsForKeys } from '../palettes/seriesColors';
import { resolveXAxisProps, resolveYAxisProps } from './axisOptions';

/**
 * Group rows by a key for multi-series scatter plots.
 * @param {Array<Object>} data - Chart data rows.
 * @param {string} groupKey - Field to group by.
 * @returns {{ keys: string[], groups: Map<string, Array<Object>> }}
 */
const groupByKey = (data, groupKey) => {
  if (!Array.isArray(data) || !groupKey) {
    return { keys: [], groups: new Map() };
  }
  const groups = new Map();
  data.forEach((row) => {
    const raw = row?.[groupKey];
    if (raw == null) {
      return;
    }
    const key = String(raw);
    const group = groups.get(key) || [];
    group.push(row);
    groups.set(key, group);
  });
  return { keys: Array.from(groups.keys()), groups };
};

/**
 * Normalize a list of keys and preserve order uniqueness.
 * @param {Array<*>} keys - Raw keys list.
 * @returns {string[]} Normalized keys.
 */
const normalizeKeys = (keys) => {
  if (!Array.isArray(keys)) {
    return [];
  }
  const seen = new Set();
  const ordered = [];
  keys.forEach((key) => {
    if (key == null) {
      return;
    }
    const normalized = String(key);
    if (seen.has(normalized)) {
      return;
    }
    seen.add(normalized);
    ordered.push(normalized);
  });
  return ordered;
};

/**
 * @typedef {Object} ScatterChartPanelProps
 * @property {Array<Object>} [data] - Chart data rows.
 * @property {Object} [encodings] - Encoding map (x/y, group).
 * @property {Object} [options] - Chart options (tooltip, pointSize).
 * @property {Object} [handlers] - Interaction handlers (onClick).
 * @property {Object|null} [colorAssignment] - Palette assignment helper.
 * @property {Set<string>} [hiddenKeys] - Keys hidden via legend toggles.
 */

/**
 * Render a scatter chart panel with palette-aware point colors.
 * @param {ScatterChartPanelProps} props - Chart props.
 * @returns {JSX.Element} Chart panel.
 */
function ScatterChartPanel({
  data = [],
  encodings = {},
  options = {},
  handlers = {},
  colorAssignment,
  hiddenKeys,
}) {
  const showTooltip = options.tooltip !== false;
  const pointSize =
    typeof options.pointSize === 'number' && options.pointSize > 0
      ? options.pointSize
      : 6;
  const groupKey = encodings.group;
  const { keys: groupKeys, groups } = useMemo(
    () => groupByKey(data, groupKey),
    [data, groupKey]
  );
  const resolvedGroupKeys = useMemo(() => {
    const declared = normalizeKeys(options?.seriesKeys);
    if (!declared.length) {
      return groupKeys;
    }
    const groupSet = new Set(groupKeys);
    const filtered = declared.filter((key) => groupSet.has(key));
    return filtered.length ? filtered : groupKeys;
  }, [groupKeys, options?.seriesKeys]);
  const filteredGroupKeys = resolvedGroupKeys.filter(
    (key) => !hiddenKeys?.has(String(key))
  );
  const seriesColors = useMemo(
    () => getSeriesColorsForKeys(resolvedGroupKeys),
    [resolvedGroupKeys]
  );
  const xAxisProps = resolveXAxisProps(options);
  const yAxisProps = resolveYAxisProps(options);
  const shape = (props) => {
    const { cx, cy, fill } = props;
    if (cx == null || cy == null) {
      return null;
    }
    return <circle cx={cx} cy={cy} r={pointSize} fill={fill} />;
  };

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="var(--ladf-chart-grid)" strokeDasharray="3 3" />
          <XAxis dataKey={encodings.x} {...xAxisProps} />
          <YAxis dataKey={encodings.y} {...yAxisProps} />
          {showTooltip ? <Tooltip content={<ChartTooltip />} /> : null}
          {groupKey
            ? filteredGroupKeys.map((key, index) => {
                const color =
                  colorAssignment?.getColor?.(key) ||
                  seriesColors[key] ||
                  getSeriesColor(index);
                return (
                  <Scatter
                    key={key}
                    name={key}
                    data={groups.get(key) || []}
                    fill={color}
                    shape={shape}
                    onClick={handlers.onClick}
                  />
                );
              })
            : (
              <Scatter
                data={data}
                fill={colorAssignment?.getColor?.(encodings.y) || getSeriesColor(0)}
                shape={shape}
                onClick={handlers.onClick}
              />
            )}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default ScatterChartPanel;
