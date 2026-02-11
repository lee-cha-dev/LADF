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
 * Panel empty state with LADF panel state styles.
 *
 * Uses:
 * - `ladf-panel__state`
 * - `ladf-panel__state--empty`
 * - `ladf-panel__state-title`
 * - `ladf-panel__state-text`
 *
 * @param {EmptyStateProps} props
 * @returns {JSX.Element}
 */
function EmptyState({ title = 'No data yet', message = 'Try adjusting filters or refreshing the panel.' }) {
  return (
    <div className="ladf-panel__state ladf-panel__state--empty">
      <p className="ladf-panel__state-title">{title}</p>
      <p className="ladf-panel__state-text">{message}</p>
    </div>
  );
}

export default EmptyState;
