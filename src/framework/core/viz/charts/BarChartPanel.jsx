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
import { getSeriesColor, getSeriesColorsForKeys } from '../palettes/seriesColors';

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

function BarChartPanel({
  data = [],
  encodings = {},
  options = {},
  handlers = {},
  colorAssignment,
  hiddenKeys,
}) {
  const assignedKeys =
    colorAssignment?.mode === 'series' || colorAssignment?.mode === 'single'
      ? colorAssignment.items.map((item) => item.key)
      : [];
  const seriesKeys = assignedKeys.length ? assignedKeys : resolveSeriesKeys(encodings, data);
  const showTooltip = options.tooltip !== false;
  const isStacked = options.stacked === true || Array.isArray(options.stackedKeys);
  const seriesColors = useMemo(
    () => getSeriesColorsForKeys(seriesKeys),
    [seriesKeys]
  );
  const filteredSeriesKeys = seriesKeys.filter(
    (key) => !hiddenKeys?.has(String(key))
  );
  const isCategoryMode = colorAssignment?.mode === 'category';
  const isSeriesMode = colorAssignment?.mode === 'series';
  const useCells =
    colorAssignment?.mode === 'category' ||
    colorAssignment?.mode === 'diverging' ||
    colorAssignment?.mode === 'sequential';
  const chartData =
    isCategoryMode && hiddenKeys?.size
      ? data.filter((row) => !hiddenKeys.has(String(row?.[encodings.x])))
      : data;

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="var(--radf-chart-grid)" strokeDasharray="3 3" />
          <XAxis
            dataKey={encodings.x}
            tick={{ fill: 'var(--radf-text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--radf-border-divider)' }}
          />
          <YAxis
            tick={{ fill: 'var(--radf-text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--radf-border-divider)' }}
          />
          {showTooltip ? <Tooltip content={<ChartTooltip />} /> : null}
          {isSeriesMode
            ? filteredSeriesKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={
                    colorAssignment?.getColor?.(key) ||
                    seriesColors[key] ||
                    getSeriesColor(index)
                  }
                  stackId={isStacked ? 'radf-stack' : undefined}
                  radius={[6, 6, 0, 0]}
                  onClick={handlers.onClick}
                />
              ))
            : (
              <Bar
                dataKey={encodings.y}
                fill={colorAssignment?.getColor?.(encodings.y) || getSeriesColor(0)}
                radius={[6, 6, 0, 0]}
                onClick={handlers.onClick}
              >
                {useCells
                  ? chartData.map((entry, index) => {
                      const categoryKey = entry?.[encodings.x];
                      const value = entry?.[encodings.y];
                      const color =
                        colorAssignment?.mode === 'category'
                          ? colorAssignment?.getColor?.(categoryKey)
                          : colorAssignment?.getColor?.(value);
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={color || getSeriesColor(index)}
                        />
                      );
                    })
                  : null}
              </Bar>
            )}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default BarChartPanel;
