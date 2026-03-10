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
 * Panel loading state with LADF panel state styles.
 *
 * Uses:
 * - `ladf-panel__state`
 * - `ladf-panel__state--loading`
 * - `ladf-panel__state-icon`
 * - `ladf-panel__state-text`
 *
 * @param {LoadingStateProps} props
 * @returns {JSX.Element}
 */
function LoadingState({ message = 'Loading data…' }) {
  return (
    <div className="ladf-panel__state ladf-panel__state--loading">
      <span className="ladf-panel__state-icon" aria-hidden="true">
        ⏳
      </span>
      <p className="ladf-panel__state-text">{message}</p>
    </div>
  );
}

export default LoadingState;
