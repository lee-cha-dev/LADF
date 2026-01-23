import { getDivergingVar, getSequentialVar, getSeriesVar } from './paletteRegistry';

const TEXT_VIZ_TYPES = new Set(['kpi', 'text', 'metric', 'number', 'markdown']);
const LINE_VIZ_TYPES = new Set(['line', 'area', 'composed', 'time-series', 'timeseries']);
const BAR_VIZ_TYPES = new Set(['bar', 'column', 'histogram']);
const SEQUENTIAL_VIZ_TYPES = new Set(['heatmap', 'choropleth', 'density']);

const normalizeKey = (key) => {
  if (key == null) {
    return null;
  }
  return String(key);
};

const normalizeKeys = (keys) => {
  if (!Array.isArray(keys)) {
    return [];
  }
  const seen = new Set();
  const ordered = [];
  keys.forEach((key) => {
    const normalized = normalizeKey(key);
    if (!normalized || seen.has(normalized)) {
      return;
    }
    seen.add(normalized);
    ordered.push(normalized);
  });
  return ordered;
};

const resolveSeriesDefinitions = (panelConfig) => {
  if (!Array.isArray(panelConfig?.series)) {
    return [];
  }
  return panelConfig.series
    .map((entry) => ({
      key: normalizeKey(entry?.key),
      label: entry?.label ?? normalizeKey(entry?.key),
    }))
    .filter((entry) => entry.key);
};

const resolveSeriesKeys = ({ encodings, options, panelConfig, data }) => {
  const seriesDefinitions = resolveSeriesDefinitions(panelConfig);
  if (seriesDefinitions.length) {
    return seriesDefinitions.map((entry) => entry.key);
  }
  if (Array.isArray(options?.seriesKeys) && options.seriesKeys.length) {
    return normalizeKeys(options.seriesKeys);
  }
  if (Array.isArray(options?.stackedKeys) && options.stackedKeys.length) {
    return normalizeKeys(options.stackedKeys);
  }
  if (Array.isArray(encodings?.y)) {
    return normalizeKeys(encodings.y);
  }
  if (encodings?.y) {
    return normalizeKeys([encodings.y]);
  }
  if (Array.isArray(data) && data.length > 0) {
    const sample = data[0] || {};
    return normalizeKeys(Object.keys(sample).filter((key) => key !== encodings?.x));
  }
  return [];
};

const resolveValueKey = (encodings) => {
  if (Array.isArray(encodings?.y)) {
    return encodings.y[0];
  }
  return encodings?.y ?? null;
};

const resolveIntent = ({ panelConfig, vizType, options }) => {
  if (panelConfig?.paletteIntent) {
    return panelConfig.paletteIntent;
  }
  if (options?.diverging === true) {
    return 'diverging';
  }
  if (SEQUENTIAL_VIZ_TYPES.has(vizType)) {
    return 'sequential';
  }
  return 'categorical';
};

const buildSeriesAssignment = ({ seriesKeys, seriesDefinitions }) => {
  const labelMap = new Map(seriesDefinitions.map((entry) => [entry.key, entry.label]));
  const items = seriesKeys.map((key, index) => ({
    key,
    label: labelMap.get(key) ?? key,
    colorVar: getSeriesVar(index),
  }));
  const colorMap = new Map(items.map((item) => [item.key, item.colorVar]));
  return {
    items,
    getColor: (key) => colorMap.get(normalizeKey(key)) ?? getSeriesVar(0),
    getLabel: (key) => labelMap.get(normalizeKey(key)) ?? normalizeKey(key),
  };
};

const buildCategoryAssignment = ({ data, xKey }) => {
  const values = Array.isArray(data)
    ? data.map((row) => row?.[xKey]).filter((value) => value != null)
    : [];
  const uniqueValues = Array.from(new Set(values));
  const isNumeric = uniqueValues.every((value) => typeof value === 'number');
  uniqueValues.sort((a, b) => {
    if (isNumeric) {
      return a - b;
    }
    return String(a).localeCompare(String(b), undefined, { numeric: true });
  });
  const items = uniqueValues.map((value, index) => {
    const key = normalizeKey(value);
    return {
      key,
      label: key,
      colorVar: getSeriesVar(index),
    };
  });
  const colorMap = new Map(items.map((item) => [item.key, item.colorVar]));
  return {
    items,
    getColor: (key) => colorMap.get(normalizeKey(key)) ?? getSeriesVar(0),
    getLabel: (key) => normalizeKey(key),
  };
};

const buildDivergingAssignment = ({ data, valueKey }) => {
  const values = Array.isArray(data)
    ? data
        .map((row) => row?.[valueKey])
        .filter((value) => typeof value === 'number' && Number.isFinite(value))
    : [];
  let min = 0;
  let max = 0;
  values.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });
  const maxMagnitude = Math.max(Math.abs(min), Math.abs(max));
  const hasDivergingRange = min < 0 && max > 0;
  const items = [
    { key: 'neg', label: 'Negative', colorVar: getDivergingVar('neg', 3) },
    { key: 'zero', label: 'Neutral', colorVar: getDivergingVar('zero') },
    { key: 'pos', label: 'Positive', colorVar: getDivergingVar('pos', 3) },
  ];
  const getColor = (value) => {
    if (!hasDivergingRange || !Number.isFinite(value)) {
      return getSeriesVar(0);
    }
    if (value === 0) {
      return getDivergingVar('zero');
    }
    if (maxMagnitude === 0) {
      return getDivergingVar(value < 0 ? 'neg' : 'pos', 1);
    }
    const ratio = Math.min(1, Math.abs(value) / maxMagnitude);
    const step = Math.max(1, Math.ceil(ratio * 4));
    return getDivergingVar(value < 0 ? 'neg' : 'pos', step);
  };
  return {
    items,
    getColor,
    getLabel: (key) => {
      if (key === 'neg') return 'Negative';
      if (key === 'pos') return 'Positive';
      if (key === 'zero') return 'Neutral';
      return null;
    },
  };
};

const buildSequentialAssignment = ({ data, valueKey }) => {
  const values = Array.isArray(data)
    ? data
        .map((row) => row?.[valueKey])
        .filter((value) => typeof value === 'number' && Number.isFinite(value))
    : [];
  let min = 0;
  let max = 0;
  values.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });
  const range = max - min;
  const getColor = (value) => {
    if (!Number.isFinite(value)) {
      return getSequentialVar(1);
    }
    if (range === 0) {
      return getSequentialVar(5);
    }
    const ratio = (value - min) / range;
    const step = Math.max(1, Math.min(9, Math.ceil(ratio * 9)));
    return getSequentialVar(step);
  };
  return {
    items: [],
    getColor,
    getLabel: () => null,
  };
};

export const buildColorAssignment = ({
  panelConfig,
  vizType,
  encodings,
  options,
  data,
}) => {
  if (panelConfig?.panelType !== 'viz') {
    return null;
  }
  if (TEXT_VIZ_TYPES.has(vizType)) {
    return null;
  }
  const intent = resolveIntent({ panelConfig, vizType, options });
  if (intent === 'none') {
    return null;
  }

  const seriesDefinitions = resolveSeriesDefinitions(panelConfig);
  const seriesKeys = resolveSeriesKeys({ encodings, options, panelConfig, data });
  const isMultiSeries =
    seriesDefinitions.length > 0 ||
    Array.isArray(encodings?.y) ||
    (Array.isArray(options?.seriesKeys) && options.seriesKeys.length > 1) ||
    (Array.isArray(options?.stackedKeys) && options.stackedKeys.length > 0);

  if (intent === 'diverging' && options?.diverging === true) {
    const valueKey = resolveValueKey(encodings);
    return {
      mode: 'diverging',
      ...buildDivergingAssignment({ data, valueKey }),
    };
  }

  if (intent === 'sequential') {
    const valueKey = resolveValueKey(encodings);
    return {
      mode: 'sequential',
      ...buildSequentialAssignment({ data, valueKey }),
    };
  }

  if (LINE_VIZ_TYPES.has(vizType)) {
    if (isMultiSeries) {
      return {
        mode: 'series',
        ...buildSeriesAssignment({ seriesKeys, seriesDefinitions }),
      };
    }
    const single = buildSeriesAssignment({
      seriesKeys: seriesKeys.slice(0, 1),
      seriesDefinitions,
    });
    return { mode: 'single', ...single };
  }

  if (BAR_VIZ_TYPES.has(vizType)) {
    if (isMultiSeries) {
      return {
        mode: 'series',
        ...buildSeriesAssignment({ seriesKeys, seriesDefinitions }),
      };
    }
    const shouldColorByCategory =
      options?.colorBy === 'category' ||
      options?.legendMode === 'category' ||
      options?.legend === true;
    if (shouldColorByCategory) {
      return {
        mode: 'category',
        ...buildCategoryAssignment({ data, xKey: encodings?.x }),
      };
    }
    const single = buildSeriesAssignment({
      seriesKeys: seriesKeys.slice(0, 1),
      seriesDefinitions,
    });
    return { mode: 'single', ...single };
  }

  if (seriesKeys.length > 1) {
    return {
      mode: 'series',
      ...buildSeriesAssignment({ seriesKeys, seriesDefinitions }),
    };
  }

  const single = buildSeriesAssignment({
    seriesKeys: seriesKeys.slice(0, 1),
    seriesDefinitions,
  });
  return { mode: 'single', ...single };
};
