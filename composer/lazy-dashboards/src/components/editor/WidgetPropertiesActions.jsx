/**
 * WidgetPropertiesActions
 * -----------------------
 * Renders action buttons for the active widget (currently remove).
 */

/**
 * @typedef {Object} WidgetPropertiesActionsProps
 * @property {string} activeWidgetId
 * @property {(widgetId: string) => void} onRequestRemoveWidget
 */

/**
 * Widget action buttons.
 *
 * @param {WidgetPropertiesActionsProps} props
 * @returns {JSX.Element}
 */
const WidgetPropertiesActions = ({
  activeWidgetId,
  onRequestRemoveWidget,
}) => (
  <div className="lazy-form__actions">
    <button
      className="lazy-button danger"
      type="button"
      onClick={() => onRequestRemoveWidget(activeWidgetId)}
    >
      Remove widget
    </button>
  </div>
);

export default WidgetPropertiesActions;
