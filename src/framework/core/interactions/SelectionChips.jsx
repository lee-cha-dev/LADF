/**
 * @module core/interactions/SelectionChips
 * @description Renders active selections as removable chips.
 */

import React from 'react';
import { getSelectionLabel } from './crossFilter';

/**
 * @typedef {import('../docs/jsdocTypes.js').Selection} Selection
 */

/**
 * @typedef {Object} SelectionChipsProps
 * @property {Selection[]} [selections] - Active cross-filter selections.
 * @property {(selectionId: string) => void} onRemove - Handler for removing a selection.
 * @property {() => void} onClear - Handler for clearing all selections.
 */

/**
 * Render selection chips with remove/clear actions.
 *
 * @param {SelectionChipsProps} props
 * @returns {JSX.Element|null} Selection bar or null when empty.
 */
const SelectionChips = ({ selections = [], onRemove, onClear }) => {
  if (!selections.length) {
    return null;
  }

  return (
    <div className="ladf-selection-bar">
      <span className="ladf-selection-bar__title">Selections</span>
      <div className="ladf-selection-bar__chips">
        {selections.map((selection) => (
          <button
            key={selection.id}
            type="button"
            className="ladf-selection-chip"
            onClick={() => onRemove(selection.id)}
          >
            <span className="ladf-selection-chip__label">
              {getSelectionLabel(selection)}
            </span>
            <span className="ladf-selection-chip__remove">×</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="ladf-selection-bar__clear"
        onClick={onClear}
      >
        Clear All
      </button>
    </div>
  );
};

export default SelectionChips;
