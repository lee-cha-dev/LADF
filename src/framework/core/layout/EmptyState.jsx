import React from 'react';

/**
 * @module layout/EmptyState
 * @description
 * Empty state message for a panel body when no data is available.
 */

/**
 * @typedef {Object} EmptyStateProps
 * @property {string} [title] - Short heading shown above the message.
 * @property {string} [message] - Supporting text that explains why the panel is empty.
 */

/**
 * Panel empty state with RADF panel state styles.
 *
 * Uses:
 * - `radf-panel__state`
 * - `radf-panel__state--empty`
 * - `radf-panel__state-title`
 * - `radf-panel__state-text`
 *
 * @param {EmptyStateProps} props
 * @returns {JSX.Element}
 */
function EmptyState({ title = 'No data yet', message = 'Try adjusting filters or refreshing the panel.' }) {
  return (
    <div className="radf-panel__state radf-panel__state--empty">
      <p className="radf-panel__state-title">{title}</p>
      <p className="radf-panel__state-text">{message}</p>
    </div>
  );
}

export default EmptyState;
