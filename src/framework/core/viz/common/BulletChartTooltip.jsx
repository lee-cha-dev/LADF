/**
 * @module core/viz/common/BulletChartTooltip
 * @description Custom tooltip for bullet charts using Recharts payloads.
 */
import React from 'react';

/**
 * @typedef {Object} BulletChartTooltipProps
 * @property {boolean} [active] - Whether tooltip is active.
 * @property {Array<Object>} [payload] - Recharts tooltip payload.
 * @property {string} nameKey - Key for the name/label field.
 * @property {string} valueKey - Key for the primary value field.
 * @property {string} [colorKey] - Key for the category/department field.
 * @property {string} [percentKey] - Key for the percentage field.
 * @property {Map<string, { color: string, index: number }>} [colorMap] - Color map for categories.
 * @property {string} [markerLabel] - Label for the marker value.
 * @property {function(Object): number|null} [getMarkerValue] - Resolve marker value for row.
 * @property {function(Object): boolean} [getExceeds] - Determine if row exceeds outlier rule.
 */

/**
 * Format a numeric value for display.
 * @param {number} value - The value to format.
 * @param {string} [suffix] - Optional suffix.
 * @returns {string} Formatted value.
 */
const formatValue = (value, suffix = '') => {
  if (value == null || Number.isNaN(value)) {
    return '—';
  }
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}${suffix}`;
};

/**
 * Render a tooltip for bullet chart rows showing comprehensive row data.
 * @param {BulletChartTooltipProps} props - Tooltip props.
 * @returns {JSX.Element|null} Tooltip content.
 */
function BulletChartTooltip({
  active,
  payload,
  nameKey,
  valueKey,
  colorKey,
  percentKey,
  colorMap,
  markerLabel,
  getMarkerValue,
  getExceeds,
}) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const row = payload[0]?.payload;
  if (!row) {
    return null;
  }

  const name = row[nameKey] || 'Unknown';
  const value = row[valueKey] || 0;
  const category = colorKey ? row[colorKey] : null;
  const percent = percentKey ? row[percentKey] : null;
  const markerValue = getMarkerValue ? getMarkerValue(row) : null;
  const exceeds = getExceeds ? getExceeds(row) : false;

  const categoryLabel = category
    ? category.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  const colorEntry = category != null ? colorMap?.get(String(category)) : null;
  const dotClass = Number.isInteger(colorEntry?.index)
    ? `radf-chart-color-${colorEntry.index}`
    : 'radf-chart-color-0';

  return (
    <div className="radf-chart-tooltip radf-bullet-tooltip">
      <div className="radf-bullet-tooltip__header">
        <span className={["radf-bullet-tooltip__dot", dotClass].join(' ')} />
        <span className="radf-bullet-tooltip__name">{name}</span>
      </div>

      {categoryLabel && (
        <div className="radf-bullet-tooltip__row">
          <span className="radf-bullet-tooltip__label">Department</span>
          <span className="radf-bullet-tooltip__value">{categoryLabel}</span>
        </div>
      )}

      <div className="radf-bullet-tooltip__row radf-bullet-tooltip__row--primary">
        <span className="radf-bullet-tooltip__label">OT Hours</span>
        <span className="radf-bullet-tooltip__value radf-bullet-tooltip__value--primary">
          {formatValue(value, 'h')}
        </span>
      </div>

      {markerValue != null && (
        <div className="radf-bullet-tooltip__row">
          <span className="radf-bullet-tooltip__label">{markerLabel || 'Dept average'}</span>
          <span className="radf-bullet-tooltip__value">
            {formatValue(markerValue, 'h')}
          </span>
        </div>
      )}

      {percent != null && (
        <div className="radf-bullet-tooltip__row">
          <span className="radf-bullet-tooltip__label">% of Total</span>
          <span className="radf-bullet-tooltip__value">{percent.toFixed(1)}%</span>
        </div>
      )}

      {exceeds && (
        <div className="radf-bullet-tooltip__warning">
          <span className="radf-bullet-tooltip__warning-icon">⚠</span>
          <span className="radf-bullet-tooltip__warning-text">Higher than most peers</span>
        </div>
      )}
    </div>
  );
}

export default BulletChartTooltip;
