import React from 'react';

/**
 * @module layout/PanelHeader
 * @description
 * Optional panel header containing title, subtitle, and actions.
 */

/**
 * @typedef {Object} PanelHeaderProps
 * @property {string} [title] - Title rendered in the header.
 * @property {string} [subtitle] - Subtitle rendered under the title.
 * @property {React.ReactNode} [actions] - Action elements aligned to the right.
 */

/**
 * Renders the panel header if any content is provided.
 *
 * Uses:
 * - `radf-panel__header`
 * - `radf-panel__heading`
 * - `radf-panel__title`
 * - `radf-panel__subtitle`
 * - `radf-panel__actions`
 *
 * @param {PanelHeaderProps} props
 * @returns {JSX.Element | null}
 */
function PanelHeader({ title, subtitle, actions }) {
  if (!title && !subtitle && !actions) {
    return null;
  }

  return (
    <div className="radf-panel__header">
      <div className="radf-panel__heading">
        {title ? <h2 className="radf-panel__title">{title}</h2> : null}
        {subtitle ? <p className="radf-panel__subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="radf-panel__actions">{actions}</div> : null}
    </div>
  );
}

export default PanelHeader;
