import React, { forwardRef } from 'react';

const formatValue = (value, suffix = '') => {
  if (value == null || Number.isNaN(value)) return '—';
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}${suffix}`;
};

const BulletChartTooltip = forwardRef(function BulletChartTooltip(
  {
    active,
    payload,
    row,
    nameKey,
    valueKey,
    colorKey,
    percentKey,
    colorMap,
    position,
    visible,
    markerLabel,
    getMarkerValue,
    getExceeds,
  },
  tooltipRef
) {
  const isRecharts = Array.isArray(payload) && payload.length > 0;
  const show = isRecharts ? active : visible;
  if (!show) return null;

  const resolvedRow = isRecharts ? payload[0]?.payload : row;
  if (!resolvedRow) return null;

  // IMPORTANT: allow 0 values
  const name = resolvedRow[nameKey] ?? 'Unknown';
  const value = resolvedRow[valueKey] ?? 0;

  const category = colorKey ? resolvedRow[colorKey] : null;
  const percent = percentKey ? resolvedRow[percentKey] : null;

  const markerValue = getMarkerValue ? getMarkerValue(resolvedRow) : null;
  const exceeds = getExceeds ? getExceeds(resolvedRow) : false;

  const categoryLabel = category
    ? String(category)
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  const colorEntry = category != null ? colorMap?.get(String(category)) : null;
  const dotClass = Number.isInteger(colorEntry?.index)
    ? `radf-chart-color-${colorEntry.index}`
    : 'radf-chart-color-0';

  const style = position ? { left: `${position.x}px`, top: `${position.y}px` } : undefined;

  return (
    <div ref={tooltipRef} className="radf-chart-tooltip radf-bullet-tooltip" style={style}>
      <div className="radf-bullet-tooltip__header">
        <span className={['radf-bullet-tooltip__dot', dotClass].join(' ')} />
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
          <span className="radf-bullet-tooltip__value">{formatValue(markerValue, 'h')}</span>
        </div>
      )}

      {percent != null && (
        <div className="radf-bullet-tooltip__row">
          <span className="radf-bullet-tooltip__label">% of Total</span>
          <span className="radf-bullet-tooltip__value">{Number(percent).toFixed(1)}%</span>
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
});

export default BulletChartTooltip;
