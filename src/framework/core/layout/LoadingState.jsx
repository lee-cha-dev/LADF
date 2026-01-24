import React from 'react';

/**
 * @module layout/LoadingState
 * @description
 * Inline loading indicator for panel content.
 */

/**
 * @typedef {Object} LoadingStateProps
 * @property {string} [message] - Message to display while loading data.
 */

/**
 * Panel loading state with RADF panel state styles.
 *
 * Uses:
 * - `radf-panel__state`
 * - `radf-panel__state--loading`
 * - `radf-panel__state-icon`
 * - `radf-panel__state-text`
 *
 * @param {LoadingStateProps} props
 * @returns {JSX.Element}
 */
function LoadingState({ message = 'Loading data…' }) {
  return (
    <div className="radf-panel__state radf-panel__state--loading">
      <span className="radf-panel__state-icon" aria-hidden="true">
        ⏳
      </span>
      <p className="radf-panel__state-text">{message}</p>
    </div>
  );
}

export default LoadingState;
