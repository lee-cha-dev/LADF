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
 * Panel error state with RADF panel state styles.
 *
 * Uses:
 * - `radf-panel__state`
 * - `radf-panel__state--error`
 * - `radf-panel__state-title`
 * - `radf-panel__state-text`
 *
 * @param {ErrorStateProps} props
 * @returns {JSX.Element}
 */
function ErrorState({ title = 'Something went wrong', message = 'Please try again.' }) {
  return (
    <div className="radf-panel__state radf-panel__state--error">
      <p className="radf-panel__state-title">{title}</p>
      <p className="radf-panel__state-text">{message}</p>
    </div>
  );
}

export default ErrorState;
