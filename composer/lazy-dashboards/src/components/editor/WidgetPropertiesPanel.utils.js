/**
 * WidgetPropertiesPanel utilities
 * --------------------------------
 * Pure helpers for option/encoding normalization shared by the panel,
 * its child components, and related hooks.
 */

import { getNestedValue, setNestedValue } from '../../authoring/optionUtils.js';

const DEFAULT_CURRENCY_COMPACT_THRESHOLD = 1000000;

const KPI_SUBVARIANT_FORMAT_PRESETS = {
  standard: { format: 'number', decimals: 0, compact: null, compactThreshold: null },
  currency: {
    format: 'currency',
    decimals: 0,
    compact: 'auto',
    compactThreshold: DEFAULT_CURRENCY_COMPACT_THRESHOLD,
  },
  amount: {
    format: 'currency',
    decimals: 0,
    compact: null,
    compactThreshold: null,
  },
  'large-value': { format: 'compact', decimals: 1 },
  integer: { format: 'number', decimals: 0 },
  count: { format: 'number', decimals: 0 },
  percentage: { format: 'percent', decimals: 1 },
  'decimal-percentage': { format: 'percent', decimals: 2 },
  decimal: { format: 'number', decimals: 2 },
  ratio: { format: 'ratio' },
  time: { format: 'hours', decimals: 1 },
  duration: { format: 'duration', decimals: 0 },
  index: { format: 'number', decimals: 0 },
  rating: { format: 'number', decimals: 1 },
};

/**
 * Resolve the canonical option path for a manifest option.
 *
 * @param {Object} schema
 * @param {string} optionKey
 * @returns {string}
 */
export const getOptionPath = (schema, optionKey) => schema?.path || optionKey;

/**
 * Read a nested option value using its resolved path.
 *
 * @param {Object} schema
 * @param {string} optionKey
 * @param {Object} options
 * @returns {*}
 */
export const getOptionValue = (schema, optionKey, options) =>
  getNestedValue(options, getOptionPath(schema, optionKey));

/**
 * Build a minimal patch object that sets a single option at its nested path.
 *
 * @param {Object} schema
 * @param {string} optionKey
 * @param {*} value
 * @returns {Object}
 */
export const buildOptionPatch = (schema, optionKey, value) =>
  setNestedValue({}, getOptionPath(schema, optionKey), value);

/**
 * Resolve the set of valid select options.
 *
 * Supports dynamic lists via `schema.optionsByOption`, which maps the current
 * value of another option to a list of choices.
 *
 * @param {Object} schema
 * @param {Object} options
 * @returns {string[]}
 */
export const resolveSelectOptions = (schema, options) => {
  if (!schema?.optionsByOption) {
    return schema?.options || [];
  }
  const { option, map, fallback } = schema.optionsByOption;
  if (!option || !map) {
    return schema?.options || [];
  }
  const selected = getNestedValue(options, option);
  const mapped = map?.[selected];
  if (Array.isArray(mapped) && mapped.length > 0) {
    return mapped;
  }
  if (Array.isArray(fallback) && fallback.length > 0) {
    return fallback;
  }
  return schema?.options || [];
};

/**
 * Resolve a safe select value that must be within the current options list.
 *
 * If the stored value isn't valid, fall back to the schema default (if valid)
 * or the first available option.
 *
 * @param {Object} schema
 * @param {*} optionValue
 * @param {Object} options
 * @returns {string}
 */
export const resolveSelectValue = (schema, optionValue, options) => {
  const selectOptions = resolveSelectOptions(schema, options);
  if (selectOptions.includes(optionValue)) {
    return optionValue;
  }
  if (selectOptions.includes(schema?.default)) {
    return schema.default;
  }
  return selectOptions[0] ?? '';
};

/**
 * Normalize a user-provided KPI subtype label into a key used by the presets.
 *
 * @param {*} value
 * @returns {string}
 */
export const normalizeSubvariantKey = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

/**
 * Build a partial options patch that applies the KPI subtype defaults.
 *
 * @param {*} value
 * @returns {Object|null}
 */
export const buildKpiSubtypePatch = (value) => {
  const preset = KPI_SUBVARIANT_FORMAT_PRESETS[normalizeSubvariantKey(value)];
  if (!preset) {
    return null;
  }
  const patch = {};
  if (preset.format !== undefined) {
    patch.format = preset.format;
  }
  if (typeof preset.decimals === 'number') {
    patch.decimals = preset.decimals;
  }
  if (Object.prototype.hasOwnProperty.call(preset, 'compact')) {
    patch.compact = preset.compact;
  }
  if (Object.prototype.hasOwnProperty.call(preset, 'compactThreshold')) {
    patch.compactThreshold = preset.compactThreshold;
  }
  return patch;
};

/**
 * Parse a comma-separated list string into an array.
 *
 * @param {string} rawValue
 * @returns {string[]}
 */
export const parseStringList = (rawValue) =>
  rawValue
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

/**
 * Convert a list back into a comma-separated string.
 *
 * @param {string[]|string|null|undefined} value
 * @returns {string}
 */
export const formatStringList = (value) =>
  Array.isArray(value) ? value.join(', ') : value ?? '';

/**
 * Normalize color values to a hex string for the color input.
 *
 * @param {*} value
 * @param {string} [fallback='#000000']
 * @returns {string}
 */
export const normalizeColorValue = (value, fallback = '#000000') => {
  if (typeof value === 'string' && value.startsWith('#')) {
    return value;
  }
  return fallback;
};

/**
 * Determine whether an option is visible based on dependent option values.
 *
 * @param {Object} schema
 * @param {Object} options
 * @returns {boolean}
 */
export const isOptionVisible = (schema, options) => {
  if (!schema?.visibleWhen) {
    return true;
  }
  const { option, equals } = schema.visibleWhen;
  if (!option) {
    return true;
  }
  const current = getNestedValue(options, option);
  if (Array.isArray(equals)) {
    return equals.includes(current);
  }
  return current === equals;
};

/**
 * Format an encoding value for text input.
 * Multi-encodings use comma-separated lists.
 *
 * @param {Object} encoding
 * @param {*} value
 * @returns {string}
 */
export const getEncodingInputValue = (encoding, value) => {
  if (encoding?.multi) {
    return Array.isArray(value) ? value.join(', ') : '';
  }
  return value ?? '';
};

/**
 * Parse user input into the correct encoding value type.
 *
 * @param {Object} encoding
 * @param {string} rawValue
 * @returns {*}
 */
export const getEncodingInputNextValue = (encoding, rawValue) => {
  if (encoding?.multi) {
    return rawValue
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return rawValue;
};
