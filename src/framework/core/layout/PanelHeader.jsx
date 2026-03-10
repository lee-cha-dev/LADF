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
 * - `ladf-panel__header`
 * - `ladf-panel__heading`
 * - `ladf-panel__title`
 * - `ladf-panel__subtitle`
 * - `ladf-panel__actions`
 *
 * @param {PanelHeaderProps} props
 * @returns {JSX.Element | null}
 */
function PanelHeader({ title, subtitle, actions }) {
  if (!title && !subtitle && !actions) {
    return null;
  }

  return (
    <div className="ladf-panel__header">
      <div className="ladf-panel__heading">
        {title ? <h2 className="ladf-panel__title">{title}</h2> : null}
        {subtitle ? <p className="ladf-panel__subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="ladf-panel__actions">{actions}</div> : null}
    </div>
  );
}

export default PanelHeader;
