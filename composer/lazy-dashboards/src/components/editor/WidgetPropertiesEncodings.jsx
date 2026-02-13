/**
 * WidgetPropertiesEncodings
 * -------------------------
 * Renders required and optional encoding inputs for the active widget.
 */

import {
  getEncodingInputNextValue,
  getEncodingInputValue,
} from './WidgetPropertiesPanel.utils.js';

/**
 * @typedef {Object} WidgetPropertiesEncodingsProps
 * @property {Object} activeWidget
 * @property {Object[]} requiredEncodings
 * @property {Object[]} optionalEncodings
 * @property {string} fieldOptionsListId
 * @property {(encoding: Object) => string[]} getFieldOptionsForEncoding
 * @property {(encoding: Object, value: *) => boolean} isEncodingValueAllowed
 * @property {(widgetId: string, key: string, value: *) => void} onEncodingChange
 */

/**
 * Encoding inputs section for required/optional encodings.
 *
 * @param {WidgetPropertiesEncodingsProps} props
 * @returns {JSX.Element|null}
 */
const WidgetPropertiesEncodings = ({
  activeWidget,
  requiredEncodings,
  optionalEncodings,
  fieldOptionsListId,
  getFieldOptionsForEncoding,
  isEncodingValueAllowed,
  onEncodingChange,
}) => {
  if (!activeWidget) {
    return null;
  }

  const renderEncodingField = (encoding) => (
    <label key={encoding.id} className="lazy-form__field">
      <datalist id={`${fieldOptionsListId}-${encoding.id}`}>
        {getFieldOptionsForEncoding(encoding).map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
      <span className="lazy-input__label">
        {encoding.label || encoding.id}
      </span>
      <input
        className="lazy-input__field"
        type="text"
        placeholder={encoding.multi ? 'Comma-separated fields' : ''}
        list={`${fieldOptionsListId}-${encoding.id}`}
        value={getEncodingInputValue(
          encoding,
          activeWidget.encodings?.[encoding.id]
        )}
        onChange={(event) =>
          onEncodingChange(
            activeWidget.id,
            encoding.id,
            getEncodingInputNextValue(encoding, event.target.value)
          )
        }
      />
      {encoding.help ? (
        <span className="lazy-input__help">{encoding.help}</span>
      ) : null}
      {!isEncodingValueAllowed(
        encoding,
        activeWidget.encodings?.[encoding.id]
      ) ? (
        <span className="lazy-input__help">
          Select a {encoding.role || 'valid'} field.
        </span>
      ) : null}
    </label>
  );

  return (
    <>
      {requiredEncodings.length > 0 ? (
        <p className="lazy-panel__body">Required encodings</p>
      ) : null}
      {requiredEncodings.map(renderEncodingField)}
      {optionalEncodings.length > 0 ? (
        <p className="lazy-panel__body">Optional encodings</p>
      ) : null}
      {optionalEncodings.map(renderEncodingField)}
    </>
  );
};

export default WidgetPropertiesEncodings;
