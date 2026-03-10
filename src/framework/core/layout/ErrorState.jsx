import React from 'react';

/**
 * @module layout/ErrorState
 * @description
 * Inline error message used inside panels when queries fail.
 */

/**
 * @typedef {Object} ErrorStateProps
 * @property {string} [title] - Short heading describing the error.
 * @property {string} [message] - Supporting text with next steps.
 */

/**
 * Panel error state with LADF panel state styles.
 *
 * Uses:
 * - `ladf-panel__state`
 * - `ladf-panel__state--error`
 * - `ladf-panel__state-title`
 * - `ladf-panel__state-text`
 *
 * @param {ErrorStateProps} props
 * @returns {JSX.Element}
 */
function ErrorState({ title = 'Something went wrong', message = 'Please try again.' }) {
  return (
    <div className="ladf-panel__state ladf-panel__state--error">
      <p className="ladf-panel__state-title">{title}</p>
      <p className="ladf-panel__state-text">{message}</p>
    </div>
  );
}

export default ErrorState;
