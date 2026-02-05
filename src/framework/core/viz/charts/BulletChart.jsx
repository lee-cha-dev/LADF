/**
 * @module core/viz/charts/BarWithThresholdPanel
 * @description Bullet chart table with per-row marker lines, department coloring,
 * and Recharts-native hover/tooltip behavior.
 */
import React, { useMemo, useCallback } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Customized,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartContainer from '../common/ChartContainer.jsx';
import BulletChartTooltip from '../common/BulletChartTooltip.jsx';
import { getSeriesVar } from '../palettes/paletteRegistry';

const SERIES_COUNT = 12;

/**
 * Normalize a category key.
 * @param {*} value - Raw value.
 * @returns {string|null} Normalized key.
 */
const normalizeKey = (value) => (value == null ? null : String(value));

/**
 * Parse a CSS color string into rgb values.
 * @param {string} color - CSS color string.
 * @returns {{r:number,g:number,b:number}|null} RGB or null.
 */
const parseColor = (color) => {
  if (!color) {
    return null;
  }
  const trimmed = color.trim();
  if (trimmed.startsWith('#')) {
    const hex = trimmed.replace('#', '');
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return { r, g, b };
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }
    return null;
  }
  if (trimmed.startsWith('rgb')) {
    const match = trimmed.match(/rgba?\(([^)]+)\)/i);
    if (!match) {
      return null;
    }
    const parts = match[1].split(',').map((part) => parseFloat(part.trim()));
    if (parts.length < 3) {
      return null;
    }
    return { r: parts[0], g: parts[1], b: parts[2] };
  }
  return null;
};

/**
 * Convert RGB to HSL hue.
 * @param {{r:number,g:number,b:number}} rgb - RGB values.
 * @returns {{h:number,s:number,l:number}} HSL values.
 */
const rgbToHsl = ({ r, g, b }) => {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    if (max === nr) {
      h = ((ng - nb) / delta) % 6;
    } else if (max === ng) {
      h = (nb - nr) / delta + 2;
    } else {
      h = (nr - ng) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  return { h, s, l };
};

/**
 * Determine if a color reads as a red hue.
 * @param {string} color - CSS color string.
 * @returns {boolean} True if color is red-ish.
 */
const isRedHue = (color) => {
  const rgb = parseColor(color);
  if (!rgb) {
    return false;
  }
  const { h, s, l } = rgbToHsl(rgb);
  const isHueRed = h <= 20 || h >= 340;
  return isHueRed && s > 0.35 && l > 0.2 && l < 0.85;
};

/**
 * Resolve non-red series indices based on computed palette colors.
 * @returns {number[]} Series indices that avoid red hues.
 */
const resolveNonRedSeriesIndices = () => {
  const indices = Array.from({ length: SERIES_COUNT }, (_, index) => index);
  if (typeof window === 'undefined' || !window.getComputedStyle) {
    return indices.filter((index) => index !== 2);
  }
  const styles = window.getComputedStyle(document.documentElement);
  const allowed = indices.filter((index) => {
    const color = styles.getPropertyValue(`--radf-series-${index + 1}`);
    return !isRedHue(color);
  });
  return allowed.length ? allowed : indices;
};

/**
 * Build a color map for categorical coloring using series palette.
 * Ensures each unique category gets a distinct non-red color from the palette.
 */
const buildCategoryColorMap = (data, colorKey, seriesIndices) => {
  if (!colorKey || !data?.length) {
    return new Map();
  }

  const categories = [];
  const seen = new Set();
  data.forEach((row) => {
    const cat = normalizeKey(row[colorKey]);
    if (cat && !seen.has(cat)) {
      seen.add(cat);
      categories.push(cat);
    }
  });

  const colorMap = new Map();
  categories.forEach((cat, index) => {
    const seriesIndex = seriesIndices[index % seriesIndices.length] ?? 0;
    colorMap.set(cat, { color: getSeriesVar(seriesIndex), index: seriesIndex });
  });

  return colorMap;
};

/**
 * Compute a quantile for sorted values.
 * @param {number[]} values - Sorted numeric values.
 * @param {number} quantile - Quantile between 0-1.
 * @returns {number|null} Quantile value.
 */
const computeQuantile = (values, quantile) => {
  if (!values.length) {
    return null;
  }
  const position = (values.length - 1) * quantile;
  const base = Math.floor(position);
  const rest = position - base;
  if (values[base + 1] != null) {
    return values[base] + rest * (values[base + 1] - values[base]);
  }
  return values[base];
};

/**
 * Compute IQR upper bounds per group.
 * @param {Array<Object>} data - Rows.
 * @param {string|null} groupKey - Grouping key.
 * @param {string} valueKey - Value key.
 * @returns {Map<string, number>} Group to upper bound map.
 */
const computeIqrUpperBounds = (data, groupKey, valueKey) => {
  const grouped = new Map();
  data.forEach((row) => {
    const group = normalizeKey(groupKey ? row[groupKey] : 'all');
    const value = row[valueKey];
    if (group && Number.isFinite(value)) {
      if (!grouped.has(group)) {
        grouped.set(group, []);
      }
      grouped.get(group).push(value);
    }
  });

  const bounds = new Map();
  grouped.forEach((values, group) => {
    const sorted = [...values].sort((a, b) => a - b);
    const q1 = computeQuantile(sorted, 0.25);
    const q3 = computeQuantile(sorted, 0.75);
    if (q1 == null || q3 == null) {
      return;
    }
    const iqr = q3 - q1;
    bounds.set(group, q3 + 1.5 * iqr);
  });

  return bounds;
};

/**
 * Compute averages per group.
 * @param {Array<Object>} data - Rows.
 * @param {string|null} groupKey - Grouping key.
 * @param {string} valueKey - Value key.
 * @returns {Map<string, number>} Group to average map.
 */
const computeGroupAverages = (data, groupKey, valueKey) => {
  const grouped = new Map();
  data.forEach((row) => {
    const group = normalizeKey(groupKey ? row[groupKey] : 'all');
    const value = row[valueKey];
    if (group && Number.isFinite(value)) {
      if (!grouped.has(group)) {
        grouped.set(group, { total: 0, count: 0 });
      }
      const entry = grouped.get(group);
      entry.total += value;
      entry.count += 1;
    }
  });

  const averages = new Map();
  grouped.forEach((entry, group) => {
    if (entry.count > 0) {
      averages.set(group, entry.total / entry.count);
    }
  });
  return averages;
};

/**
 * Render a bullet chart table with per-row marker lines.
 */
function BulletChart({
  data = [],
  encodings = {},
  options = {},
  handlers = {},
  hiddenKeys,
}) {
  const isHorizontal = options.orientation !== 'vertical';
  const colorKey = encodings.color || options.colorBy;
  const leftAnnotations = options.leftAnnotations || {};
  const leftAnnotationKey = leftAnnotations.colorBy || colorKey;
  const showAnnotations = leftAnnotations.enabled !== false && leftAnnotations.type !== 'none';
  const showPercent = options.showPercentColumn !== false;
  const percentKey = options.percentKey;

  const xKey = isHorizontal ? encodings.x : encodings.y;
  const yKey = isHorizontal ? encodings.y : encodings.x;

  const filteredData = useMemo(() => {
    if (!hiddenKeys?.size || !colorKey) {
      return data;
    }
    return data.filter((row) => !hiddenKeys.has(row[colorKey]));
  }, [data, hiddenKeys, colorKey]);

  const seriesIndices = useMemo(() => resolveNonRedSeriesIndices(), []);

  const barColorMap = useMemo(
    () => buildCategoryColorMap(filteredData, colorKey, seriesIndices),
    [filteredData, colorKey, seriesIndices]
  );

  const annotationColorMap = useMemo(
    () =>
      leftAnnotationKey === colorKey
        ? barColorMap
        : buildCategoryColorMap(filteredData, leftAnnotationKey, seriesIndices),
    [filteredData, leftAnnotationKey, colorKey, seriesIndices, barColorMap]
  );

  const legendItems = useMemo(() => {
    if (!colorKey || !filteredData?.length) {
      return [];
    }
    const categories = [];
    const seen = new Set();
    filteredData.forEach((row) => {
      const cat = normalizeKey(row[colorKey]);
      if (cat && !seen.has(cat)) {
        seen.add(cat);
        categories.push(cat);
      }
    });
    return categories.map((cat) => {
      const entry = barColorMap.get(cat);
      return {
        key: cat,
        label: cat.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        color: entry?.color || getSeriesVar(0),
        index: entry?.index ?? 0,
      };
    });
  }, [filteredData, colorKey, barColorMap]);

  const markerConfig = options.markerLines || options.thresholdMarkers || {};
  const markerEnabled = markerConfig?.enabled !== false;
  const outlierConfig = options.outlierRule || {};
  const outlierValueKey =
    outlierConfig.valueKey ||
    options.iqrValueKey ||
    options.outlierValueKey ||
    options.thresholdMarkers?.valueKey ||
    'dept_threshold';

  const markerValueKey =
    options.markerLines?.valueKey ||
    (markerConfig.valueKey && markerConfig.valueKey !== outlierValueKey
      ? markerConfig.valueKey
      : null) ||
    options.averageKey ||
    'dept_average';

  const hasOutlierKey = useMemo(
    () => filteredData.some((row) => Number.isFinite(row?.[outlierValueKey])),
    [filteredData, outlierValueKey]
  );

  const iqrBounds = useMemo(() => {
    if (hasOutlierKey) {
      return new Map();
    }
    return computeIqrUpperBounds(filteredData, colorKey, xKey);
  }, [filteredData, colorKey, xKey, hasOutlierKey]);

  const hasMarkerKey = useMemo(
    () => filteredData.some((row) => Number.isFinite(row?.[markerValueKey])),
    [filteredData, markerValueKey]
  );

  const markerAverages = useMemo(() => {
    if (hasMarkerKey) {
      return new Map();
    }
    return computeGroupAverages(filteredData, colorKey, xKey);
  }, [filteredData, colorKey, xKey, hasMarkerKey]);

  const getMarkerValue = useCallback(
    (row) => {
      if (!markerEnabled) {
        return null;
      }
      if (Number.isFinite(row?.[markerValueKey])) {
        return row[markerValueKey];
      }
      const group = normalizeKey(colorKey ? row[colorKey] : 'all');
      return markerAverages.get(group) ?? null;
    },
    [markerValueKey, markerAverages, colorKey, markerEnabled]
  );

  const getOutlierBound = useCallback(
    (row) => {
      if (Number.isFinite(row?.[outlierValueKey])) {
        return row[outlierValueKey];
      }
      const group = normalizeKey(colorKey ? row[colorKey] : 'all');
      return iqrBounds.get(group) ?? null;
    },
    [outlierValueKey, iqrBounds, colorKey]
  );

  const getExceeds = useCallback(
    (row) => {
      const bound = getOutlierBound(row);
      const value = row?.[xKey];
      return Number.isFinite(bound) && Number.isFinite(value) && value > bound;
    },
    [getOutlierBound, xKey]
  );

  const maxValue = useMemo(() => {
    if (!filteredData.length) {
      return 100;
    }
    let max = 0;
    filteredData.forEach((row) => {
      const value = row?.[xKey] || 0;
      const markerValue = getMarkerValue(row) || 0;
      max = Math.max(max, value, markerValue);
    });
    return max * 1.1;
  }, [filteredData, xKey, getMarkerValue]);

  const ticks = useMemo(() => {
    if (maxValue <= 0) {
      return [0];
    }
    const step = Math.ceil(maxValue / 4 / 50) * 50 || Math.ceil(maxValue / 4);
    const values = [];
    for (let i = 0; i <= maxValue; i += step) {
      values.push(i);
    }
    return values;
  }, [maxValue]);

  const hasExceeded = useMemo(() => filteredData.some((row) => getExceeds(row)), [
    filteredData,
    getExceeds,
  ]);

  const barSize = options.barSize || 18;
  const chartHeight = Math.max(220, filteredData.length * 30 + 60);
  const markerLabel = markerConfig.label || 'Dept average';
  const markerColor = markerConfig.color || 'var(--radf-border-divider)';

  const renderYAxisTick = useCallback(
    (props) => {
      const { x, y, payload } = props;
      const row = filteredData[payload.index];
      const annotationValue = row ? normalizeKey(row[leftAnnotationKey]) : null;
      const colorEntry = annotationValue ? annotationColorMap.get(annotationValue) : null;
      const dotFill = colorEntry?.color || getSeriesVar(0);

      return (
        <g transform={`translate(${x},${y})`} className="radf-bullet__axis-tick">
          {showAnnotations ? (
            <circle
              className="radf-bullet__axis-dot"
              cx={-12}
              cy={0}
              r={5}
              fill={dotFill}
            />
          ) : null}
          <text x={0} y={4} className="radf-bullet__axis-text">
            {payload.value}
          </text>
        </g>
      );
    },
    [filteredData, leftAnnotationKey, annotationColorMap, showAnnotations]
  );

  const renderValueLabel = useCallback((props) => {
    const { x, y, width, height, value } = props;
    if (!Number.isFinite(value)) {
      return null;
    }
    const label = `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}h`;
    const labelX = x + Math.max(width - 6, 6);
    return (
      <text
        x={labelX}
        y={y + height / 2 + 4}
        textAnchor="end"
        className="radf-bullet__value-label"
      >
        {label}
      </text>
    );
  }, []);

  const renderPercentLabel = useCallback(
    (props) => {
      if (!showPercent || !percentKey) {
        return null;
      }
      const { x, y, width, height, payload } = props;
      const percent = payload?.[percentKey];
      if (!Number.isFinite(percent)) {
        return null;
      }
      return (
        <text
          x={x + width + 10}
          y={y + height / 2 + 4}
          className="radf-bullet__percent-label"
        >
          {percent.toFixed(1)}%
        </text>
      );
    },
    [showPercent, percentKey]
  );

  const renderMarkerLines = useCallback(
    (props) => {
      if (!markerEnabled) {
        return null;
      }
      const { xAxisMap, yAxisMap } = props;
      const xAxis = Object.values(xAxisMap || {})[0];
      const yAxis = Object.values(yAxisMap || {})[0];
      if (!xAxis?.scale || !yAxis?.scale) {
        return null;
      }
      const xScale = xAxis.scale;
      const yScale = yAxis.scale;
      const bandwidth = yScale.bandwidth ? yScale.bandwidth() : 0;

      return (
        <g className="radf-bullet__marker-layer">
          {filteredData.map((row, index) => {
            const markerValue = getMarkerValue(row);
            if (!Number.isFinite(markerValue)) {
              return null;
            }
            const yPosition = yScale(row[yKey]) + (bandwidth - barSize) / 2;
            const xPosition = xScale(markerValue);
            return (
              <line
                key={`marker-${index}`}
                className="radf-bullet__marker-line"
                x1={xPosition}
                x2={xPosition}
                y1={yPosition - 2}
                y2={yPosition + barSize + 2}
                stroke={markerColor}
              />
            );
          })}
        </g>
      );
    },
    [filteredData, getMarkerValue, yKey, barSize, markerColor, markerEnabled]
  );

  const subtitle =
    options.subtitle ||
    options.chartSubtitle ||
    'Bars show individual OT; marker shows dept average; highlights indicate higher-than-peer OT';

  return (
    <ChartContainer subtitle={subtitle}>
      <div className="radf-bullet">
        <div className="radf-bullet__header">
          <span className="radf-bullet__axis-label">OT Hours</span>
          {showPercent ? (
            <span className="radf-bullet__pct-header">% of Total</span>
          ) : null}
        </div>

        <div className="radf-bullet__chart">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={filteredData}
              layout="vertical"
              margin={{ top: 8, right: showPercent ? 48 : 16, left: 32, bottom: 8 }}
              barCategoryGap="25%"
            >
              <CartesianGrid stroke="var(--radf-chart-grid)" strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey={xKey}
                ticks={ticks}
                tick={{ fill: 'var(--radf-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--radf-border-divider)' }}
              />
              <YAxis
                type="category"
                dataKey={yKey}
                tick={renderYAxisTick}
                axisLine={{ stroke: 'var(--radf-border-divider)' }}
                width={180}
              />
              <Tooltip
                cursor={{ fill: 'var(--radf-accent-primary-soft)' }}
                content={(
                  <BulletChartTooltip
                    nameKey={yKey}
                    valueKey={xKey}
                    colorKey={colorKey}
                    percentKey={percentKey}
                    colorMap={barColorMap}
                    markerLabel={markerLabel}
                    getMarkerValue={getMarkerValue}
                    getExceeds={getExceeds}
                  />
                )}
              />
              <Bar
                dataKey={xKey}
                barSize={barSize}
                radius={[4, 4, 4, 4]}
                background={{ fill: 'var(--radf-surface-well)', radius: 4 }}
                onClick={handlers.onClick}
              >
                {filteredData.map((row, index) => {
                  const categoryValue = normalizeKey(row[colorKey]);
                  const entry = categoryValue ? barColorMap.get(categoryValue) : null;
                  const fill = entry?.color || getSeriesVar(0);
                  const exceeded = getExceeds(row);
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={fill}
                      className={exceeded ? 'radf-bullet__bar--exceeded' : undefined}
                      stroke={exceeded ? 'var(--radf-accent-danger)' : undefined}
                      strokeWidth={exceeded ? 2 : 0}
                    />
                  );
                })}
                <LabelList content={renderValueLabel} />
                {showPercent ? <LabelList content={renderPercentLabel} /> : null}
              </Bar>
              <Customized component={renderMarkerLines} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {(legendItems.length > 0 || markerEnabled || hasExceeded) && (
          <div className="radf-bullet__legend">
            <ul className="radf-bullet__legend-list">
              {legendItems.map((item) => {
                const isHidden = hiddenKeys?.has(item.key);
                return (
                  <li
                    key={item.key}
                    className={[
                      'radf-bullet__legend-item',
                      isHidden ? 'radf-bullet__legend-item--hidden' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <button
                      type="button"
                      className="radf-bullet__legend-button"
                      onClick={() => handlers.onLegendToggle?.(item.key)}
                    >
                      <span
                        className={[
                          'radf-bullet__legend-swatch',
                          `radf-chart-color-${item.index}`,
                        ].join(' ')}
                      />
                      <span className="radf-bullet__legend-label">{item.label}</span>
                    </button>
                  </li>
                );
              })}
              {markerEnabled && (
                <li className="radf-bullet__legend-item radf-bullet__legend-item--threshold">
                  <svg
                    className="radf-bullet__legend-line"
                    viewBox="0 0 4 16"
                    aria-hidden="true"
                  >
                    <line x1="2" x2="2" y1="0" y2="16" stroke={markerColor} />
                  </svg>
                  <span className="radf-bullet__legend-label">{markerLabel}</span>
                </li>
              )}
              {hasExceeded && (
                <li className="radf-bullet__legend-item radf-bullet__legend-item--exceeded">
                  <span className="radf-bullet__legend-exceeded-swatch" />
                  <span className="radf-bullet__legend-label">Higher than most peers</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </ChartContainer>
  );
}

export default BulletChart;
