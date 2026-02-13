/**
 * WidgetPropertiesValidation
 * --------------------------
 * Renders validation errors for the active widget, if any.
 */

/**
 * @typedef {Object} WidgetPropertiesValidationProps
 * @property {string[]} widgetErrors
 */

/**
 * Validation summary for widget errors.
 *
 * @param {WidgetPropertiesValidationProps} props
 * @returns {JSX.Element|null}
 */
const WidgetPropertiesValidation = ({ widgetErrors }) => {
  if (!widgetErrors.length) {
    return null;
  }

  return (
    <div className="lazy-validation">
      <p className="lazy-validation__title">Needs attention</p>
      <ul className="lazy-validation__list">
        {widgetErrors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetPropertiesValidation;
