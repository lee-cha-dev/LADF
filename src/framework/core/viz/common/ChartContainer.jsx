/**
 * @module core/viz/common/ChartContainer
 * @description Shared wrapper for chart content and optional header/footer.
 */
import React from 'react';

/**
 * @typedef {Object} ChartContainerProps
 * @property {string} [title] - Optional chart title.
 * @property {string} [subtitle] - Optional chart subtitle.
 * @property {React.ReactNode} [footer] - Optional footer content.
 * @property {React.ReactNode} children - Chart body content.
 */

/**
 * Render a chart container with standard LADF chrome.
 * @param {ChartContainerProps} props - Container props.
 * @returns {JSX.Element} Chart container.
 */
function ChartContainer({ title, subtitle, footer, children }) {
  return (
    <div className="ladf-chart">
      {(title || subtitle) && (
        <div className="ladf-chart__header">
          <div className="ladf-chart__heading">
            {title ? <p className="ladf-chart__title">{title}</p> : null}
            {subtitle ? <p className="ladf-chart__subtitle">{subtitle}</p> : null}
          </div>
        </div>
      )}
      <div className="ladf-chart__canvas">{children}</div>
      {footer ? <div className="ladf-chart__footer">{footer}</div> : null}
    </div>
  );
}

export default ChartContainer;
