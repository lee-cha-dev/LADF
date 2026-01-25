import React from 'react';
import LoadingState from './LoadingState.jsx';
import EmptyState from './EmptyState.jsx';
import ErrorState from './ErrorState.jsx';

/**
 * @module layout/PanelBody
 * @description
 * Panel content container that swaps between loading, error, empty, and ready states.
 */

/**
 * @typedef {Object} PanelBodyProps
 * @property {'ready' | 'loading' | 'error' | 'empty'} [status] - Explicit status.
 * @property {boolean} [isEmpty] - Overrides status to force the empty state.
 * @property {string} [emptyMessage] - Custom message for the empty state.
 * @property {Error | string | null} [error] - Error used for the error state message.
 * @property {React.ReactNode} [children] - Content rendered in the ready state.
 */

/**
 * @param {Error | string | null | undefined} error
 * @returns {string | null}
 */
const resolveErrorMessage = (error) => {
  if (!error) {
    return null;
  }
  if (typeof error === 'string') {
    return error;
  }
  return error.message || 'Something went wrong.';
};

/**
 * Renders panel body content with RADF panel state styles.
 *
 * Uses:
 * - `radf-panel__body`
 * - `radf-panel__content`
 *
 * @param {PanelBodyProps} props
 * @returns {JSX.Element}
 */
function PanelBody({ status = 'ready', isEmpty = false, emptyMessage, error, children }) {
  let content = <div className="radf-panel__content">{children}</div>;

  if (status === 'loading') {
    content = <LoadingState />;
  }

  if (status === 'error') {
    content = <ErrorState message={resolveErrorMessage(error)} />;
  }

  if (status === 'empty' || isEmpty) {
    content = <EmptyState message={emptyMessage} />;
  }

  return <div className="radf-panel__body">{content}</div>;
}

export default PanelBody;
