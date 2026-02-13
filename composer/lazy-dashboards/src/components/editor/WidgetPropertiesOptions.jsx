/**
 * WidgetPropertiesOptions
 * -----------------------
 * Renders widget option controls (basic and advanced) driven by the manifest.
 */

import { resolveEditorControl } from '../../authoring/editorFieldCatalog.js';
import {
  formatStringList,
  getOptionValue,
  normalizeColorValue,
  parseStringList,
  resolveSelectOptions,
  resolveSelectValue,
} from './WidgetPropertiesPanel.utils.js';

/**
 * @typedef {Object} WidgetOptionFieldProps
 * @property {Object} activeWidget
 * @property {string} optionKey
 * @property {Object} schema
 * @property {string} fieldOptionsListId
 * @property {(widgetId: string, optionKey: string, schema: Object, value: *) => void} onOptionChange
 */

/**
 * Render a single option input based on schema and control type.
 *
 * @param {WidgetOptionFieldProps} props
 * @returns {JSX.Element|null}
 */
const WidgetOptionField = ({
  activeWidget,
  optionKey,
  schema,
  fieldOptionsListId,
  onOptionChange,
}) => {
  if (!activeWidget) {
    return null;
  }
  const optionValue = getOptionValue(schema, optionKey, activeWidget.options);
  const label = schema.label || optionKey;
  const helpText = schema.help;
  const fieldId = `${activeWidget.id}-${optionKey}`;
  const control = resolveEditorControl(schema);
  const listId =
    schema.suggestFrom === 'fields' ? fieldOptionsListId : undefined;

  if (control === 'toggle') {
    return (
      <label key={optionKey} className="lazy-form__field">
        <span className="lazy-input__label">{label}</span>
        <input
          id={fieldId}
          className="lazy-input__field"
          type="checkbox"
          checked={Boolean(optionValue)}
          onChange={(event) =>
            onOptionChange(
              activeWidget.id,
              optionKey,
              schema,
              event.target.checked
            )
          }
        />
        {helpText ? (
          <span className="lazy-input__help">{helpText}</span>
        ) : null}
      </label>
    );
  }

  if (control === 'select') {
    const selectOptions = resolveSelectOptions(schema, activeWidget.options);
    const resolvedValue = resolveSelectValue(
      schema,
      optionValue,
      activeWidget.options
    );
    return (
      <label key={optionKey} className="lazy-form__field">
        <span className="lazy-input__label">{label}</span>
        <select
          id={fieldId}
          className="lazy-input__field"
          value={resolvedValue}
          onChange={(event) =>
            onOptionChange(
              activeWidget.id,
              optionKey,
              schema,
              event.target.value
            )
          }
        >
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {helpText ? (
          <span className="lazy-input__help">{helpText}</span>
        ) : null}
      </label>
    );
  }

  if (control === 'number') {
    return (
      <label key={optionKey} className="lazy-form__field">
        <span className="lazy-input__label">{label}</span>
        <input
          id={fieldId}
          className="lazy-input__field"
          type="number"
          min={schema.min}
          max={schema.max}
          value={Number.isFinite(optionValue) ? optionValue : ''}
          onChange={(event) => {
            const rawValue = event.target.value;
            const parsed = rawValue === '' ? null : Number(rawValue);
            onOptionChange(
              activeWidget.id,
              optionKey,
              schema,
              Number.isNaN(parsed) ? null : parsed
            );
          }}
        />
        {helpText ? (
          <span className="lazy-input__help">{helpText}</span>
        ) : null}
      </label>
    );
  }

  if (control === 'list') {
    return (
      <label key={optionKey} className="lazy-form__field">
        <span className="lazy-input__label">{label}</span>
        <input
          id={fieldId}
          className="lazy-input__field"
          type="text"
          placeholder="Comma-separated values"
          value={formatStringList(optionValue)}
          onChange={(event) =>
            onOptionChange(
              activeWidget.id,
              optionKey,
              schema,
              parseStringList(event.target.value)
            )
          }
        />
        {helpText ? (
          <span className="lazy-input__help">{helpText}</span>
        ) : null}
      </label>
    );
  }

  if (control === 'color') {
    return (
      <label key={optionKey} className="lazy-form__field">
        <span className="lazy-input__label">{label}</span>
        <input
          id={fieldId}
          className="lazy-input__field"
          type="color"
          value={normalizeColorValue(optionValue, schema.default)}
          onChange={(event) =>
            onOptionChange(
              activeWidget.id,
              optionKey,
              schema,
              event.target.value
            )
          }
        />
        {helpText ? (
          <span className="lazy-input__help">{helpText}</span>
        ) : null}
      </label>
    );
  }

  return (
    <label key={optionKey} className="lazy-form__field">
      <span className="lazy-input__label">{label}</span>
      <input
        id={fieldId}
        className="lazy-input__field"
        type="text"
        list={listId}
        value={optionValue ?? ''}
        onChange={(event) =>
          onOptionChange(
            activeWidget.id,
            optionKey,
            schema,
            event.target.value
          )
        }
      />
      {helpText ? (
        <span className="lazy-input__help">{helpText}</span>
      ) : null}
    </label>
  );
};

/**
 * @typedef {Object} WidgetPropertiesOptionsProps
 * @property {Object} activeWidget
 * @property {[string, Object][]} basicOptions
 * @property {[string, Object][]} advancedOptions
 * @property {boolean} showAdvancedOptions
 * @property {() => void} onToggleAdvancedOptions
 * @property {string} fieldOptionsListId
 * @property {string[]} unsupportedOptionPaths
 * @property {(widgetId: string, optionKey: string, schema: Object, value: *) => void} onOptionChange
 */

/**
 * Options section with basic/advanced controls and unsupported warnings.
 *
 * @param {WidgetPropertiesOptionsProps} props
 * @returns {JSX.Element|null}
 */
const WidgetPropertiesOptions = ({
  activeWidget,
  basicOptions,
  advancedOptions,
  showAdvancedOptions,
  onToggleAdvancedOptions,
  fieldOptionsListId,
  unsupportedOptionPaths,
  onOptionChange,
}) => {
  if (!activeWidget) {
    return null;
  }

  return (
    <>
      {basicOptions.length > 0 ? (
        <p className="lazy-panel__body">Options</p>
      ) : null}
      {basicOptions.map(([optionKey, schema]) => (
        <WidgetOptionField
          key={optionKey}
          activeWidget={activeWidget}
          optionKey={optionKey}
          schema={schema}
          fieldOptionsListId={fieldOptionsListId}
          onOptionChange={onOptionChange}
        />
      ))}
      {advancedOptions.length > 0 ? (
        <button
          className="lazy-button ghost"
          type="button"
          onClick={onToggleAdvancedOptions}
        >
          {showAdvancedOptions
            ? 'Hide advanced options'
            : 'Show advanced options'}
        </button>
      ) : null}
      {showAdvancedOptions
        ? advancedOptions.map(([optionKey, schema]) => (
            <WidgetOptionField
              key={optionKey}
              activeWidget={activeWidget}
              optionKey={optionKey}
              schema={schema}
              fieldOptionsListId={fieldOptionsListId}
              onOptionChange={onOptionChange}
            />
          ))
        : null}
      {unsupportedOptionPaths.length > 0 ? (
        <div className="lazy-alert warning">
          <strong>Unsupported options detected.</strong>
          <span>
            These fields are preserved but not editable yet:{' '}
            {unsupportedOptionPaths.join(', ')}
          </span>
        </div>
      ) : null}
    </>
  );
};

export default WidgetPropertiesOptions;
