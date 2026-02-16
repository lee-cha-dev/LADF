/**
 * @module core/viz/legend/Legend
 * @description Toggleable legend for palette assignments.
 */
import React from 'react';
import './legend.css';

/**
 * Resolve the swatch class from a palette CSS variable.
 * @param {string} colorVar - CSS variable string.
 * @returns {string} Swatch class name.
 */
const resolveSwatchClass = (colorVar) => {
  if (typeof colorVar !== 'string') {
    return 'ladf-swatch--1';
  }
  const seriesMatch = colorVar.match(/--ladf-series-(\d+)/);
  if (seriesMatch) {
    return `ladf-swatch--${seriesMatch[1]}`;
  }
  const seqMatch = colorVar.match(/--ladf-seq-(\d+)/);
  if (seqMatch) {
    return `ladf-swatch--seq-${seqMatch[1]}`;
  }
  const divNegMatch = colorVar.match(/--ladf-div-neg-(\d+)/);
  if (divNegMatch) {
    return `ladf-swatch--div-neg-${divNegMatch[1]}`;
  }
  const divPosMatch = colorVar.match(/--ladf-div-pos-(\d+)/);
  if (divPosMatch) {
    return `ladf-swatch--div-pos-${divPosMatch[1]}`;
  }
  if (colorVar.includes('--ladf-div-zero')) {
    return 'ladf-swatch--div-zero';
  }
  return 'ladf-swatch--1';
};

/**
 * @typedef {Object} LegendItem
 * @property {string} key - Unique key for the series/category.
 * @property {string} label - Label shown in the legend.
 * @property {string} colorVar - CSS variable for the swatch color.
 */

/**
 * @typedef {Object} LegendProps
 * @property {LegendItem[]} [items] - Legend items to display.
 * @property {Set<string>} [hiddenKeys] - Keys hidden from the chart.
 * @property {(key: string) => void} [onToggle] - Toggle handler for legend items.
 * @property {('top'|'bottom'|'right')} [position] - Legend position.
 */

/**
 * Render a palette-aware legend list.
 * @param {LegendProps} props - Legend props.
 * @returns {JSX.Element|null} Legend markup.
 */
function Legend({
  items = [],
  hiddenKeys,
  onToggle,
  position = 'bottom',
}) {
  if (!items.length) {
    return null;
  }
  const toggleable = typeof onToggle === 'function';

  return (
    <div className={['ladf-legend', `ladf-legend--${position}`].join(' ')}>
      <ul className="ladf-legend__list">
        {items.map((item) => {
          const isHidden = hiddenKeys?.has(item.key);
          const swatchClass = resolveSwatchClass(item.colorVar);
          return (
            <li
              key={item.key}
              className={[
                'ladf-legend__item',
                swatchClass,
                toggleable ? 'ladf-legend__item--toggleable' : '',
                isHidden ? 'ladf-legend__item--hidden' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <button
                className="ladf-legend__button"
                type="button"
                onClick={() => {
                  if (toggleable) {
                    onToggle(item.key);
                  }
                }}
              >
                <span className="ladf-legend__swatch" />
                <span className="ladf-legend__label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Legend;
