import { getPaletteClass } from './paletteRegistry';

const TEXT_VIZ_TYPES = new Set(['kpi', 'text', 'metric', 'number', 'markdown']);
const SEQUENTIAL_VIZ_TYPES = new Set(['heatmap', 'choropleth', 'density']);

const isTextViz = ({ panelConfig, vizType }) =>
  panelConfig?.vizRole === 'text' || TEXT_VIZ_TYPES.has(vizType);

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

const resolveDefaultPaletteId = (intent) => {
  if (intent === 'diverging') {
    return 'rdylgn';
  }
  if (intent === 'sequential') {
    return 'viridis';
  }
  return 'analytics';
};

export const resolvePalette = ({ panelConfig, vizType, encodings, options, data }) => {
  if (panelConfig?.panelType !== 'viz') {
    return null;
  }
  if (isTextViz({ panelConfig, vizType })) {
    return null;
  }
  if (panelConfig?.paletteIntent === 'none') {
    return null;
  }
  if (panelConfig?.paletteId) {
    return {
      paletteId: panelConfig.paletteId,
      paletteClass: getPaletteClass(panelConfig.paletteId),
      intent: resolveIntent({ panelConfig, vizType, options, encodings, data }),
    };
  }
  const intent = resolveIntent({ panelConfig, vizType, options, encodings, data });
  if (intent === 'none') {
    return null;
  }
  const paletteId = resolveDefaultPaletteId(intent);
  return {
    paletteId,
    paletteClass: getPaletteClass(paletteId),
    intent,
  };
};

export const resolvePaletteId = (args) => resolvePalette(args)?.paletteId ?? null;

export const resolvePaletteClass = (args) =>
  resolvePalette(args)?.paletteClass ?? null;
