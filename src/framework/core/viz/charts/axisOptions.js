/**
 * @module core/viz/charts/axisOptions
 * @description Shared axis option helpers for Recharts-based panels.
 */

const BASE_TICK_STYLE = { fill: 'var(--ladf-text-muted)', fontSize: 12 };
const BASE_AXIS_LINE = { stroke: 'var(--ladf-border-divider)' };
const ROTATION_HEIGHT = 56;

const resolveRotation = (value) =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;

const hasInterval = (value) => value !== undefined && value !== null;

/**
 * Resolve props for a chart X axis.
 * @param {Object} options - Viz options object.
 * @returns {Object} XAxis props.
 */
export const resolveXAxisProps = (options = {}) => {
  const axisOptions = options?.xAxis ?? {};
  const rotation = resolveRotation(axisOptions.tickRotation);
  const tick = { ...BASE_TICK_STYLE };
  if (rotation) {
    tick.angle = rotation;
    tick.textAnchor = rotation > 0 ? 'start' : 'end';
  }
  const props = {
    hide: axisOptions.enabled === false,
    tick,
    axisLine: BASE_AXIS_LINE,
  };
  if (hasInterval(axisOptions.interval)) {
    props.interval = axisOptions.interval;
  }
  if (rotation) {
    props.height = ROTATION_HEIGHT;
  }
  return props;
};

/**
 * Resolve props for a chart Y axis.
 * @param {Object} options - Viz options object.
 * @returns {Object} YAxis props.
 */
export const resolveYAxisProps = (options = {}) => {
  const axisOptions = options?.yAxis ?? {};
  const props = {
    hide: axisOptions.enabled === false,
    tick: { ...BASE_TICK_STYLE },
    axisLine: BASE_AXIS_LINE,
  };
  if (hasInterval(axisOptions.interval)) {
    props.interval = axisOptions.interval;
  }
  if (typeof axisOptions.tickFormatter === 'function') {
    props.tickFormatter = axisOptions.tickFormatter;
  }
  return props;
};
