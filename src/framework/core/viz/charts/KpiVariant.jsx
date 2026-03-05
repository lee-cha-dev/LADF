/**
 * @module core/viz/charts/KpiVariant
 * @description KPI variant visualization with category/subvariant formatting support.
 */
import React, { useMemo } from 'react';

const VALID_VARIANTS = new Set([
  'clean',
  'accent',
  'gradient',
  'icon',
  'compact',
]);
const VALID_BADGE_TONES = new Set(['neutral', 'success', 'warning', 'danger']);
const VALID_TONES = new Set(['success', 'warning', 'danger', 'accent', 'primary']);
const VALID_TREND_TONES = new Set([
  'positive',
  'negative',
  'neutral',
  'accent',
  'success',
  'warning',
  'danger',
]);
const VALID_TREND_DIRECTIONS = new Set(['up', 'down', 'flat']);
const VALID_VALUE_FROM = new Set(['first', 'last']);
const KPI_VARIANT_REGISTRY = new Map();
const DEFAULT_CURRENCY_COMPACT_THRESHOLD = 1000000;

const clampDecimals = (value, fallback = 0) =>
  Number.isFinite(value) && value >= 0 ? value : fallback;

const normalizeValueSuffix = (suffix) => {
  if (suffix == null) {
    return '';
  }
  if (typeof suffix === 'string') {
    return suffix.trim();
  }
  return String(suffix);
};

const normalizeRatioKey = (value) => {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value.trim();
  }
  return String(value);
};

const normalizeVariant = (variant) => {
  if (typeof variant !== 'string') {
    return 'clean';
  }
  const key = variant.trim().toLowerCase();
  if (!key) {
    return 'clean';
  }
  if (['clean', 'minimal', 'minimal-clean', 'minimal/clean', 'minimal clean'].includes(key)) {
    return 'clean';
  }
  if (key.includes('accent')) {
    return 'accent';
  }
  if (key.includes('gradient') || key.includes('backdrop') || key.includes('halo')) {
    return 'gradient';
  }
  if (key.includes('icon')) {
    return 'icon';
  }
  if (key.includes('compact')) {
    return 'compact';
  }
  return VALID_VARIANTS.has(key) ? key : 'clean';
};

const normalizeValueFrom = (valueFrom) => {
  const key = typeof valueFrom === 'string' ? valueFrom.toLowerCase() : valueFrom;
  return VALID_VALUE_FROM.has(key) ? key : null;
};

const normalizeSubvariant = (subvariant) => {
  if (subvariant == null) {
    return 'standard';
  }
  const key = String(subvariant).trim().toLowerCase();
  return key ? key.replace(/[^a-z0-9]+/g, '-') : 'standard';
};

const normalizeBadgeTone = (tone) => {
  const key = typeof tone === 'string' ? tone.toLowerCase() : tone;
  return VALID_BADGE_TONES.has(key) ? key : 'neutral';
};

const normalizeTone = (tone) => {
  const key = typeof tone === 'string' ? tone.toLowerCase() : tone;
  if (key === 'primary') {
    return 'accent';
  }
  return VALID_TONES.has(key) ? key : undefined;
};

const normalizeTrendTone = (tone) => {
  const key = typeof tone === 'string' ? tone.toLowerCase() : tone;
  if (key === 'positive') return 'positive';
  if (key === 'negative') return 'negative';
  if (key === 'neutral') return 'neutral';
  if (key === 'primary') return 'accent';
  if (VALID_TREND_TONES.has(key)) {
    return key;
  }
  return undefined;
};

const normalizeTrendDirection = (direction) => {
  const key = typeof direction === 'string' ? direction.toLowerCase() : direction;
  if (!key) {
    return undefined;
  }
  if (key === 'up' || key === 'increase' || key === 'positive') {
    return 'up';
  }
  if (key === 'down' || key === 'decrease' || key === 'negative') {
    return 'down';
  }
  if (key === 'flat' || key === 'neutral' || key === 'even') {
    return 'flat';
  }
  return VALID_TREND_DIRECTIONS.has(key) ? key : undefined;
};

const hasContent = (value) => value !== null && value !== undefined && value !== '';

const parseNumeric = (value) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const match = value.match(/-?\d+(\.\d+)?/);
    if (match) {
      const numeric = Number(match[0]);
      if (Number.isFinite(numeric)) {
        return numeric;
      }
    }
  }
  if (value == null) {
    return NaN;
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : NaN;
};

const resolveRatioValue = (options, encodings, dataRow) => {
  if (!dataRow) {
    return null;
  }
  const numeratorKey =
    options?.ratioNumeratorKey ||
    encodings?.numerator ||
    encodings?.left ||
    encodings?.ratioNumerator ||
    null;
  const denominatorKey =
    options?.ratioDenominatorKey ||
    encodings?.denominator ||
    encodings?.right ||
    encodings?.ratioDenominator ||
    null;
  if (!numeratorKey && !denominatorKey && options?.ratioDenominator == null) {
    return null;
  }
  const numerator = numeratorKey ? dataRow?.[numeratorKey] : undefined;
  const denominator = denominatorKey
    ? dataRow?.[denominatorKey]
    : options?.ratioDenominator ?? undefined;
  if (numerator == null && denominator == null) {
    return null;
  }
  return { numerator, denominator };
};

const resolveValueKey = (encodings, data) => {
  if (encodings?.value) {
    return encodings.value;
  }
  if (encodings?.y) {
    return encodings.y;
  }
  if (data?.length) {
    const firstRow = data[0];
    return Object.keys(firstRow || {}).find((key) => typeof firstRow[key] === 'number') || null;
  }
  return null;
};

const resolveValueRow = (data, options) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  const valueFrom = normalizeValueFrom(options?.valueFrom);
  const resolved = valueFrom || (options?.sparklineFromData ? 'last' : 'first');
  if (resolved === 'last') {
    return data[data.length - 1] ?? null;
  }
  return data[0] ?? null;
};

const resolveLabel = (options, encodings, data, panelConfig, valueRow = null) => {
  if (options?.title || options?.label) {
    return options.title || options.label;
  }
  if (panelConfig?.title) {
    return panelConfig.title;
  }
  const labelKey = encodings?.label;
  const sourceRow = valueRow || data?.[0];
  if (labelKey && sourceRow?.[labelKey] != null) {
    return String(sourceRow[labelKey]);
  }
  if (typeof labelKey === 'string') {
    return labelKey;
  }
  return '';
};

const resolveCaption = (options, panelConfig) =>
  options?.subtitle || options?.caption || panelConfig?.subtitle || '';

const resolveTrendValue = (options, encodings, dataRow) => {
  if (options?.trendChipValue !== undefined && options?.trendChipValue !== null) {
    return options.trendChipValue;
  }
  if (options?.trendValue !== undefined && options?.trendValue !== null) {
    return options.trendValue;
  }
  const trendKey =
    options?.trendChipValueKey ||
    options?.trendValueKey ||
    encodings?.trendChipValue ||
    encodings?.trendValue ||
    encodings?.trend ||
    null;
  if (trendKey && dataRow && dataRow[trendKey] != null) {
    return dataRow[trendKey];
  }
  return null;
};

const resolveTrendLabel = (options, encodings, dataRow) => {
  const labelKey =
    options?.trendLabelKey || encodings?.trendLabel || encodings?.context || null;
  if (labelKey && dataRow && dataRow[labelKey] != null) {
    return String(dataRow[labelKey]);
  }
  if (options?.trendLabel) {
    return options.trendLabel;
  }
  return '';
};

const resolveTrendChipLabel = (options, encodings, dataRow) => {
  const labelKey = options?.trendChipLabelKey || encodings?.trendChipLabel || null;
  if (labelKey && dataRow && dataRow[labelKey] != null) {
    return String(dataRow[labelKey]);
  }
  if (options?.trendChipLabel) {
    return options.trendChipLabel;
  }
  return '';
};

const formatTrendValue = (value, options) => {
  if (value == null || value === '') {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    const decimals = Number.isFinite(options?.trendDecimals) ? options.trendDecimals : 1;
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return String(value);
};

const resolveTrendDirection = (direction, trendValue) => {
  const normalized = normalizeTrendDirection(direction);
  if (normalized) {
    return normalized;
  }
  const numeric = parseNumeric(trendValue);
  if (!Number.isFinite(numeric)) {
    return undefined;
  }
  if (numeric > 0) return 'up';
  if (numeric < 0) return 'down';
  return 'flat';
};

const resolveTrendTone = (tone, direction) => {
  const normalized = normalizeTrendTone(tone);
  if (normalized) {
    return normalized;
  }
  if (!direction) {
    return undefined;
  }
  if (direction === 'up') return 'positive';
  if (direction === 'down') return 'negative';
  return 'neutral';
};

const resolveTrendIconKey = (trendIcon, direction) => {
  if (trendIcon) {
    return trendIcon;
  }
  if (direction === 'up') return 'trend-up';
  if (direction === 'down') return 'trend-down';
  if (direction === 'flat') return 'minus';
  return null;
};

const resolveValueToneFromValue = (value) => {
  const numeric = parseNumeric(value);
  if (!Number.isFinite(numeric)) {
    return undefined;
  }
  if (numeric < 0) {
    return 'danger';
  }
  if (numeric > 0) {
    return 'neutral';
  }
  return undefined;
};

const resolveSparklineDirection = (values) => {
  if (!Array.isArray(values) || values.length < 2) {
    return undefined;
  }
  const first = values[0];
  const last = values[values.length - 1];
  if (!Number.isFinite(first) || !Number.isFinite(last)) {
    return undefined;
  }
  if (last > first) {
    return 'up';
  }
  if (last < first) {
    return 'down';
  }
  return 'flat';
};

const resolveSparklineDelta = (values) => {
  if (!Array.isArray(values) || values.length < 2) {
    return null;
  }
  const first = values[0];
  const last = values[values.length - 1];
  if (!Number.isFinite(first) || !Number.isFinite(last)) {
    return null;
  }
  return last - first;
};

const normalizeSparklineValues = (values, valueKey) => {
  if (!Array.isArray(values)) {
    return null;
  }
  if (values.length === 0) {
    return null;
  }
  if (typeof values[0] === 'number') {
    const numeric = values.filter((value) => Number.isFinite(value));
    return numeric.length >= 2 ? numeric : null;
  }
  const key = valueKey || 'value';
  const numeric = values
    .map((entry) => {
      if (entry == null) return NaN;
      if (typeof entry === 'number') return entry;
      if (typeof entry === 'object') return Number(entry[key]);
      return Number(entry);
    })
    .filter((value) => Number.isFinite(value));
  return numeric.length >= 2 ? numeric : null;
};

const resolveSparklineValues = (options, encodings, data, dataRow, valueKey) => {
  if (Array.isArray(options?.sparkline)) {
    return normalizeSparklineValues(options.sparkline, options.sparklineValueKey || valueKey);
  }
  const sparklineKey = options?.sparklineKey || encodings?.sparkline || null;
  if (sparklineKey && dataRow) {
    return normalizeSparklineValues(
      dataRow[sparklineKey],
      options?.sparklineValueKey || valueKey
    );
  }
  if (options?.sparklineFromData && Array.isArray(data) && data.length > 1) {
    const key = options?.sparklineValueKey || valueKey;
    if (key) {
      const values = data.map((row) => row?.[key]).filter((value) => value != null);
      return normalizeSparklineValues(values, key);
    }
  }
  return null;
};

const buildSparklinePaths = (values, width = 100, height = 32, padding = 2) => {
  if (!Array.isArray(values) || values.length < 2) {
    return null;
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const usableHeight = height - padding * 2;
  const points = values.map((value, index) => {
    const x = index * step;
    const y = padding + (max - value) * (usableHeight / range);
    return [x, y];
  });
  const line = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point[0]},${point[1]}`)
    .join(' ');
  const last = points[points.length - 1];
  const area = `${line} L${last[0]},${height} L0,${height} Z`;
  return { line, area };
};

const formatDuration = (value, decimals) => {
  const safeDecimals = Math.min(6, clampDecimals(decimals, 0));
  const sign = value < 0 ? '-' : '';
  const totalSeconds = Math.abs(value);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [];
  if (hours) {
    parts.push(`${hours}h`);
  }
  if (minutes || hours) {
    parts.push(`${minutes}m`);
  }
  const secondsValue =
    safeDecimals > 0 ? seconds.toFixed(safeDecimals) : Math.round(seconds).toString();
  if (seconds || (!hours && !minutes)) {
    parts.push(`${secondsValue}s`);
  }
  return `${sign}${parts.join(' ')}`.trim();
};

const formatRatio = (value, options) => {
  if (Array.isArray(value) && value.length >= 2) {
    return `${value[0]}:${value[1]}`;
  }
  if (value && typeof value === 'object') {
    const numerator =
      value.numerator ?? value.n ?? value.left ?? value.a ?? value.top ?? value[0];
    const denominator =
      value.denominator ?? value.d ?? value.right ?? value.b ?? value.bottom ?? value[1];
    if (numerator != null && denominator != null) {
      return `${numerator}:${denominator}`;
    }
  }
  if (typeof value === 'string') {
    return value;
  }
  const numerator = typeof value === 'number' ? value : Number(value);
  const denominator =
    options?.ratioDenominator != null ? Number(options.ratioDenominator) : null;
  if (Number.isFinite(numerator) && Number.isFinite(denominator)) {
    return `${numerator}:${denominator}`;
  }
  if (Number.isFinite(numerator)) {
    return numerator.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  return value == null ? '--' : String(value);
};

const appendValueSuffix = (value, suffix) => {
  if (!suffix || value == null || value === '' || value === '--') {
    return value;
  }
  const normalizedSuffix = normalizeValueSuffix(suffix);
  if (!normalizedSuffix) {
    return value;
  }
  const needsSpace = !/^[%)]/.test(normalizedSuffix);
  return `${value}${needsSpace ? ' ' : ''}${normalizedSuffix}`;
};

const formatHours = (value, decimals) => {
  const numericValue = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numericValue)) {
    return value == null ? '--' : String(value);
  }
  const safeDecimals = Math.min(6, clampDecimals(decimals, 1));
  const formatted = numericValue.toLocaleString(undefined, {
    minimumFractionDigits: safeDecimals,
    maximumFractionDigits: safeDecimals,
  });
  return `${formatted}h`;
};

const formatKpiValue = (value, options) => {
  const format = options.format || 'number';
  const decimals = clampDecimals(options.decimals, 0);
  if (value == null || value === '') {
    return '--';
  }
  if (format === 'ratio') {
    return formatRatio(value, options);
  }
  if (format === 'hours' || format === 'time') {
    return formatHours(value, decimals);
  }
  const numericValue = typeof value === 'number' ? value : Number(value);
  const isNumeric = Number.isFinite(numericValue);
  if (!isNumeric) {
    return String(value);
  }
  if (format === 'currency') {
    const compactThreshold = Number.isFinite(options.compactThreshold)
      ? options.compactThreshold
      : DEFAULT_CURRENCY_COMPACT_THRESHOLD;
    const shouldCompact =
      options.compact === true ||
      (options.compact === 'auto' && Math.abs(numericValue) >= compactThreshold);
    const formatterOptions = {
      style: 'currency',
      currency: options.currency || 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    };
    if (shouldCompact) {
      formatterOptions.notation = 'compact';
      formatterOptions.compactDisplay = 'short';
    }
    return numericValue.toLocaleString(undefined, formatterOptions);
  }
  if (format === 'percent') {
    return `${(numericValue * 100).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}%`;
  }
  if (format === 'compact') {
    const fractionDigits = decimals === 0 ? 1 : decimals;
    return numericValue.toLocaleString(undefined, {
      notation: 'compact',
      maximumFractionDigits: fractionDigits,
    });
  }
  if (format === 'duration') {
    return formatDuration(numericValue, decimals || 0);
  }
  if (format === 'custom') {
    if (typeof options.formatter === 'function') {
      return options.formatter(numericValue, options);
    }
    if (typeof options.customFormat === 'function') {
      return options.customFormat(numericValue, options);
    }
    return String(numericValue);
  }
  return numericValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const GENERAL_SUBVARIANT_PRESETS = {
  standard: {},
  currency: {
    format: 'currency',
    compact: 'auto',
    compactThreshold: DEFAULT_CURRENCY_COMPACT_THRESHOLD,
    decimals: 0,
  },
  'large-value': { format: 'compact', decimals: 1 },
  integer: { format: 'number', decimals: 0 },
  count: { format: 'number', decimals: 0 },
  percentage: { format: 'percent', decimals: 1 },
  'decimal-percentage': { format: 'percent', decimals: 2 },
  decimal: { format: 'number', decimals: 2 },
  ratio: { format: 'ratio' },
  amount: { format: 'currency', decimals: 0 },
  time: { format: 'hours', decimals: 1 },
  negative: { valueTone: 'danger' },
  duration: { format: 'duration', decimals: 0 },
  index: { format: 'number', decimals: 0 },
};

const VARIANT_SUBVARIANT_PRESETS = {
  icon: {
    standard: { icon: 'users' },
    rating: { icon: 'star', format: 'number', decimals: 1 },
    alert: {
      icon: 'alert',
      valueTone: 'danger',
      iconTone: 'danger',
      format: 'number',
      decimals: 0,
    },
    capacity: { icon: 'box', valueTone: 'warning', iconTone: 'warning' },
    velocity: { icon: 'spark', valueTone: 'success', iconTone: 'success' },
  },
  compact: {
    standard: {
      badgeText: '+12% vs last month',
      badgeTone: 'success',
      badgeIcon: 'check',
    },
    growth: {
      badgeText: '+28% growth',
      badgeTone: 'success',
      badgeIcon: 'trend-up',
    },
    minimal: {
      badgeText: 'All systems operational',
      badgeTone: 'success',
      badgeIcon: 'check',
    },
    score: {
      badgeText: 'No change',
      badgeTone: 'neutral',
      badgeIcon: 'minus',
    },
    efficiency: {
      badgeText: '-8% reduction',
      badgeTone: 'success',
      badgeIcon: 'trend-down',
    },
  },
};

const VARIANT_BASE_PRESETS = {
  icon: { icon: 'users' },
  compact: {
    badgeText: '+12% vs last month',
    badgeTone: 'success',
    badgeIcon: 'check',
  },
};

const applySubvariantPreset = (variant, subvariant, viewModel) => {
  const lowerVariant = (variant || '').toLowerCase();
  const lowerSubvariant = (subvariant || '').toLowerCase();
  const presets = {
    ...GENERAL_SUBVARIANT_PRESETS,
    ...(VARIANT_SUBVARIANT_PRESETS[lowerVariant] || {}),
  };
  const preset = presets[lowerSubvariant] || presets.standard || {};
  const mergedPreset = {
    ...(VARIANT_BASE_PRESETS[lowerVariant] || {}),
    ...preset,
  };
  const next = { ...viewModel };
  if (!viewModel.format && mergedPreset.format) next.format = mergedPreset.format;
  if (viewModel.compact == null && mergedPreset.compact != null) next.compact = mergedPreset.compact;
  if (viewModel.compactThreshold == null && mergedPreset.compactThreshold != null) {
    next.compactThreshold = mergedPreset.compactThreshold;
  }
  if (!viewModel.icon && mergedPreset.icon) next.icon = mergedPreset.icon;
  if (!viewModel.valueSuffix && mergedPreset.valueSuffix) {
    next.valueSuffix = mergedPreset.valueSuffix;
  }
  if (!viewModel.badgeText && mergedPreset.badgeText) next.badgeText = mergedPreset.badgeText;
  if (!viewModel.badgeIcon && mergedPreset.badgeIcon) next.badgeIcon = mergedPreset.badgeIcon;
  if (viewModel.badgeTone === 'neutral' && mergedPreset.badgeTone) {
    next.badgeTone = mergedPreset.badgeTone;
  }
  if (viewModel.valueTone == null && mergedPreset.valueTone) next.valueTone = mergedPreset.valueTone;
  if (viewModel.iconTone == null && mergedPreset.iconTone) next.iconTone = mergedPreset.iconTone;
  if (viewModel.trendTone == null && mergedPreset.trendTone) next.trendTone = mergedPreset.trendTone;
  if (viewModel.trendChipTone == null && mergedPreset.trendTone) {
    next.trendChipTone = mergedPreset.trendTone;
  }
  if (viewModel.sparklineTone == null && mergedPreset.sparklineTone) {
    next.sparklineTone = mergedPreset.sparklineTone;
  }
  if (typeof mergedPreset.decimals === 'number' && viewModel.decimals == null) {
    next.decimals = mergedPreset.decimals;
  }
  return next;
};

const normalizeOptions = (options) => ({
  variant: normalizeVariant(options?.variant),
  subvariant: normalizeSubvariant(options?.subvariant ?? options?.subtype),
  format: options?.format,
  currency: options?.currency || 'USD',
  decimals: Number.isFinite(options?.decimals) ? options.decimals : null,
  compact: options?.compact ?? null,
  compactThreshold: Number.isFinite(options?.compactThreshold) ? options.compactThreshold : null,
  ratioDenominator: options?.ratioDenominator ?? null,
  ratioNumeratorKey: normalizeRatioKey(
    options?.ratioNumeratorKey ?? options?.ratioLeftKey
  ),
  ratioDenominatorKey: normalizeRatioKey(
    options?.ratioDenominatorKey ?? options?.ratioRightKey
  ),
  title: options?.title || options?.label || '',
  subtitle: options?.subtitle || options?.caption || '',
  valueFrom: normalizeValueFrom(options?.valueFrom),
  badgeText: options?.badgeText || '',
  badgeTone: normalizeBadgeTone(options?.badgeTone),
  badgeIcon: options?.badgeIcon || '',
  icon: options?.icon || '',
  valueTone: normalizeTone(options?.valueTone),
  iconTone: normalizeTone(options?.iconTone),
  trendValue: options?.trendValue ?? options?.delta ?? options?.change ?? null,
  trendValueKey: options?.trendValueKey || options?.trendKey || options?.deltaKey || '',
  trendLabel: options?.trendLabel || options?.contextLabel || '',
  trendLabelKey: options?.trendLabelKey || options?.contextKey || '',
  trendChipValue: options?.trendChipValue ?? null,
  trendChipValueKey: options?.trendChipValueKey || '',
  trendChipLabel: options?.trendChipLabel || '',
  trendChipLabelKey: options?.trendChipLabelKey || '',
  trendTone: normalizeTrendTone(options?.trendTone ?? options?.trendChipTone),
  trendChipTone: normalizeTrendTone(options?.trendChipTone ?? options?.trendTone),
  trendDirection: normalizeTrendDirection(options?.trendDirection ?? options?.trendChipDirection),
  trendIcon: options?.trendIcon || '',
  trendChipIcon: options?.trendChipIcon || '',
  trendDecimals: Number.isFinite(options?.trendDecimals) ? options.trendDecimals : null,
  sparkline: Array.isArray(options?.sparkline) ? options.sparkline : null,
  sparklineKey: options?.sparklineKey || options?.sparklineField || '',
  sparklineValueKey: options?.sparklineValueKey || '',
  sparklineFromData: options?.sparklineFromData === true,
  sparklineDeriveTrend: options?.sparklineDeriveTrend !== false,
  sparklineTone: normalizeTrendTone(options?.sparklineTone),
  showSparkline: options?.showSparkline ?? null,
  valueSuffix: normalizeValueSuffix(
    options?.valueSuffix ?? options?.suffix ?? options?.unit ?? options?.capacitySuffix
  ),
  value: options?.value,
});

const resolveIconNode = (iconKey) => {
  const icons = {
    star: (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    alert: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    box: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="11"
          cy="7"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    spark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline
          points="4 14 9 9 13 13 20 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline
          points="20 6 9 17 4 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    minus: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'trend-up': (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline
          points="23 6 13.5 15.5 8.5 10.5 1 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="17 6 23 6 23 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    'trend-down': (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline
          points="23 18 13.5 8.5 8.5 13.5 1 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="17 18 23 18 23 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };
  return icons[iconKey] || (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

class BaseKpiVariant {
  constructor(viewModel) {
    this.viewModel = viewModel;
  }

  className() {
    const subvariantClass = this.viewModel.subvariant
      ? String(this.viewModel.subvariant).toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : null;
    const classes = [
      'ladf-kpi',
      `ladf-kpi--${this.viewModel.variant}`,
      subvariantClass ? `ladf-kpi--subvariant-${subvariantClass}` : null,
      subvariantClass ? `ladf-kpi--subtype-${subvariantClass}` : null,
      this.viewModel.sparklinePaths ? 'ladf-kpi--has-sparkline' : null,
      this.viewModel.hasFooter ? 'ladf-kpi--has-footer' : null,
    ];
    return classes.filter(Boolean).join(' ');
  }

  renderLabel() {
    if (!this.viewModel.label) {
      return null;
    }
    return <div className="ladf-kpi__label">{this.viewModel.label}</div>;
  }

  renderValue() {
    const toneClass = this.viewModel.valueTone
      ? `ladf-kpi__value--${this.viewModel.valueTone}`
      : '';
    return (
      <div className={`ladf-kpi__value ${toneClass}`.trim()}>
        {this.viewModel.formattedValue}
      </div>
    );
  }

  renderCaption() {
    if (!this.viewModel.caption) {
      return null;
    }
    return <div className="ladf-kpi__caption">{this.viewModel.caption}</div>;
  }

  renderSparkline() {
    if (!this.viewModel.sparklinePaths) {
      return null;
    }
    const toneClass = this.viewModel.sparklineTone
      ? `ladf-kpi__sparkline--${this.viewModel.sparklineTone}`
      : '';
    return (
      <svg
        className={`ladf-kpi__sparkline ${toneClass}`.trim()}
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="ladf-kpi__sparkline-line" d={this.viewModel.sparklinePaths.line} />
        <path className="ladf-kpi__sparkline-fill" d={this.viewModel.sparklinePaths.area} />
      </svg>
    );
  }

  renderTrendChip() {
    if (!hasContent(this.viewModel.trendChipValue)) {
      return null;
    }
    const toneClass = this.viewModel.trendChipTone
      ? `ladf-kpi__trend-chip--${this.viewModel.trendChipTone}`
      : '';
    const iconKey = this.viewModel.trendIconKey;
    const iconNode = iconKey ? resolveIconNode(iconKey) : null;
    return (
      <div className={`ladf-kpi__trend-chip ${toneClass}`.trim()}>
        {iconNode ? <span className="ladf-kpi__trend-chip-icon">{iconNode}</span> : null}
        <span className="ladf-kpi__trend-chip-text">{this.viewModel.trendChipValue}{this.viewModel.trendChipLabel}</span>
      </div>
    );
  }

  renderFooter() {
    const trendChip = this.renderTrendChip();
    const trendLabel = this.viewModel.trendLabel ? (
      <div className="ladf-kpi__trend-label">{this.viewModel.trendLabel}</div>
    ) : null;
    if (!trendChip && !trendLabel) {
      return null;
    }
    return (
      <div className="ladf-kpi__footer">
        {trendChip}
        {trendLabel}
      </div>
    );
  }

  renderContent() {
    return (
      <>
        {this.renderLabel()}
        {this.renderValue()}
        {this.renderCaption()}
        {this.renderSparkline()}
        {this.renderFooter()}
      </>
    );
  }

  render() {
    return <div className={this.className()}>{this.renderContent()}</div>;
  }
}

class CleanKpiVariant extends BaseKpiVariant {}

class AccentKpiVariant extends BaseKpiVariant {}

class GradientKpiVariant extends BaseKpiVariant {}

class IconKpiVariant extends BaseKpiVariant {
  renderIcon() {
    if (!this.viewModel.icon && !this.viewModel.label) {
      return null;
    }
    const iconNode = resolveIconNode(this.viewModel.icon || 'spark');
    const label = this.viewModel.label ? (
      <div className="ladf-kpi__label">{this.viewModel.label}</div>
    ) : null;
    const toneClass = this.viewModel.iconTone ? `ladf-kpi__icon--${this.viewModel.iconTone}` : '';
    return (
      <div className="ladf-kpi__header">
        <div className={`ladf-kpi__icon ${toneClass}`.trim()}>{iconNode}</div>
        {label}
      </div>
    );
  }

  renderContent() {
    return (
      <>
        {this.renderIcon()}
        {this.renderValue()}
        {this.renderCaption()}
        {this.renderSparkline()}
        {this.renderFooter()}
      </>
    );
  }
}

class CompactKpiVariant extends BaseKpiVariant {
  renderBadge() {
    if (!this.viewModel.badgeText) {
      return null;
    }
    const iconNode = this.viewModel.badgeIcon ? resolveIconNode(this.viewModel.badgeIcon) : null;
    return (
      <div className={`ladf-kpi__badge ladf-kpi__badge--${this.viewModel.badgeTone}`}>
        {iconNode ? <span className="ladf-kpi__badge-icon">{iconNode}</span> : null}
        {this.viewModel.badgeText}
      </div>
    );
  }

  renderFooter() {
    const badge = this.renderBadge();
    if (!badge) {
      return null;
    }
    return <div className="ladf-kpi__footer">{badge}</div>;
  }

  renderContent() {
    return (
      <>
        {this.renderLabel()}
        {this.renderValue()}
        {this.renderCaption()}
        {this.renderFooter()}
      </>
    );
  }
}

const registerVariant = (variantId, VariantClass) =>
  KPI_VARIANT_REGISTRY.set(variantId, VariantClass);

registerVariant('clean', CleanKpiVariant);
registerVariant('accent', AccentKpiVariant);
registerVariant('gradient', GradientKpiVariant);
registerVariant('icon', IconKpiVariant);
registerVariant('compact', CompactKpiVariant);

const resolveVariantRenderer = (variantId) =>
  KPI_VARIANT_REGISTRY.get(variantId) || KPI_VARIANT_REGISTRY.get('clean');

/**
 * Render a KPI variant visualization with variant/subvariant formatting presets.
 * @param {Object} props - KPI props.
 * @param {Array<Object>} [props.data] - KPI data rows.
 * @param {Object} [props.encodings] - Encoding map (value/label).
 * @param {Object} [props.options] - KPI options (variant, subvariant, formatting).
 * @param {Object} [props.panelConfig] - Parent panel metadata (title/subtitle defaults).
 * @returns {JSX.Element} KPI visualization.
 */
function KpiVariant({ data = [], encodings = {}, options = {}, panelConfig = null }) {
  const viewModel = useMemo(() => {
    const normalized = normalizeOptions(options);
    const valueKey = resolveValueKey(encodings, data);
    const valueRow = resolveValueRow(data, normalized);
    const ratioValue =
      normalized.format === 'ratio'
        ? resolveRatioValue(normalized, encodings, valueRow)
        : null;
    const sparklineValues = resolveSparklineValues(
      normalized,
      encodings,
      data,
      valueRow,
      valueKey
    );
    const sparklineLatestValue = Array.isArray(sparklineValues)
      ? sparklineValues[sparklineValues.length - 1]
      : null;
    const trendValueFallback = resolveTrendValue(normalized, encodings, valueRow);
    let rawValue =
      normalized.value !== undefined && normalized.value !== null
        ? normalized.value
        : ratioValue
        ? ratioValue
        : valueKey
        ? valueRow?.[valueKey]
        : null;
    const hasExplicitValue = normalized.value !== undefined && normalized.value !== null;
    const hasValueFromData = valueKey != null && valueRow?.[valueKey] != null;
    const hasTrendFallback = trendValueFallback !== null && trendValueFallback !== undefined;
    if (rawValue == null && hasTrendFallback) {
      rawValue = trendValueFallback;
    }
    if (
      rawValue == null &&
      !hasExplicitValue &&
      ratioValue == null &&
      !hasValueFromData &&
      Number.isFinite(sparklineLatestValue)
    ) {
      rawValue = sparklineLatestValue;
    }
    const label = resolveLabel(normalized, encodings, data, panelConfig, valueRow);
    const caption = resolveCaption(normalized, panelConfig);

    const hydrated = applySubvariantPreset(normalized.variant, normalized.subvariant, {
      ...normalized,
      valueKey,
      rawValue,
      label,
      caption,
    });

    const trendChipValueRaw = resolveTrendValue(hydrated, encodings, valueRow);
    const sparklineDelta = resolveSparklineDelta(sparklineValues);
    const hasExplicitTrendValue =
      options?.trendValue != null ||
      options?.trendChipValue != null ||
      options?.delta != null ||
      options?.change != null;
    const resolvedTrendValueRaw =
      hydrated.sparklineDeriveTrend &&
      Number.isFinite(sparklineDelta) &&
      !hasExplicitTrendValue
        ? sparklineDelta
        : trendChipValueRaw;
    const trendChipValue = formatTrendValue(resolvedTrendValueRaw, hydrated);
    const trendChipLabel = resolveTrendChipLabel(hydrated, encodings, valueRow);
    const trendLabel = resolveTrendLabel(hydrated, encodings, valueRow);
    const trendDirection = resolveTrendDirection(
      hydrated.trendDirection,
      resolvedTrendValueRaw
    );
    const trendTone =
      hydrated.trendTone != null ? hydrated.trendTone : resolveTrendTone(null, trendDirection);
    const trendChipTone =
      hydrated.trendChipTone != null ? hydrated.trendChipTone : trendTone;
    const trendIconKey = resolveTrendIconKey(
      hydrated.trendChipIcon || hydrated.trendIcon,
      trendDirection
    );

    const shouldShowSparkline =
      Boolean(sparklineValues) && hydrated.showSparkline !== false;
    const sparklinePaths = shouldShowSparkline ? buildSparklinePaths(sparklineValues) : null;
    const sparklineDirection = resolveSparklineDirection(sparklineValues);
    const valueTone =
      hydrated.valueTone != null ? hydrated.valueTone : resolveValueToneFromValue(rawValue);
    const sparklineTone =
      hydrated.sparklineTone != null
        ? hydrated.sparklineTone
        : resolveTrendTone(
            null,
            sparklineDirection || trendDirection || resolveTrendDirection(null, rawValue)
          ) || valueTone || 'success';
    const hasFooter =
      hasContent(trendChipValue) || hasContent(trendLabel) || hasContent(hydrated.badgeText);
    const isStandardLayout = !sparklinePaths || !hasFooter;

    return {
      ...hydrated,
      valueTone,
      trendChipValue,
      trendChipLabel,
      trendChipTone,
      trendValue: trendChipValue,
      trendLabel,
      trendTone,
      trendDirection,
      trendIconKey,
      sparklinePaths,
      sparklineTone,
      hasFooter,
      isStandardLayout,
      formattedValue: appendValueSuffix(
        formatKpiValue(rawValue, hydrated),
        hydrated.valueSuffix
      ),
    };
  }, [data, encodings, options, panelConfig]);

  const VariantRenderer = resolveVariantRenderer(viewModel.variant);
  const instance = useMemo(() => new VariantRenderer(viewModel), [VariantRenderer, viewModel]);
  return instance.render();
}

export default KpiVariant;
// eslint-disable-next-line react-refresh/only-export-components
export { KPI_VARIANT_REGISTRY as kpiVariantRegistry, registerVariant as registerKpiVariant };
