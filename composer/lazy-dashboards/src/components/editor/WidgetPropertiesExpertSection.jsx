/**
 * WidgetPropertiesExpertSection
 * -----------------------------
 * Renders expert-mode controls for raw options JSON and compiled config output.
 */

/**
 * @typedef {Object} WidgetPropertiesExpertSectionProps
 * @property {boolean} showExpertOptions
 * @property {boolean} showCompiledConfig
 * @property {() => void} onToggleExpertOptions
 * @property {() => void} onToggleCompiledConfig
 * @property {string} rawOptionsText
 * @property {string} rawOptionsError
 * @property {(next: string) => void} onRawOptionsTextChange
 * @property {() => void} onResetRawOptions
 * @property {() => void} onApplyRawOptions
 * @property {string} compiledPanelJson
 */

/**
 * Expert section with toggles and JSON/compiled views.
 *
 * @param {WidgetPropertiesExpertSectionProps} props
 * @returns {JSX.Element}
 */
const WidgetPropertiesExpertSection = ({
  showExpertOptions,
  showCompiledConfig,
  onToggleExpertOptions,
  onToggleCompiledConfig,
  rawOptionsText,
  rawOptionsError,
  onRawOptionsTextChange,
  onResetRawOptions,
  onApplyRawOptions,
  compiledPanelJson,
}) => (
  <>
    <div className="lazy-expert__actions">
      <button
        className="lazy-button ghost"
        type="button"
        onClick={onToggleExpertOptions}
      >
        {showExpertOptions ? 'Hide expert mode' : 'Show expert mode'}
      </button>
      <button
        className="lazy-button ghost"
        type="button"
        onClick={onToggleCompiledConfig}
      >
        {showCompiledConfig
          ? 'Hide compiled config'
          : 'Show compiled config'}
      </button>
    </div>
    {showExpertOptions ? (
      <div className="lazy-expert">
        <label className="lazy-form__field">
          <span className="lazy-input__label">Options JSON</span>
          <textarea
            className="lazy-input__field lazy-input__field--code"
            rows={8}
            value={rawOptionsText}
            onChange={(event) => onRawOptionsTextChange(event.target.value)}
          />
        </label>
        {rawOptionsError ? (
          <div className="lazy-alert danger">{rawOptionsError}</div>
        ) : null}
        <div className="lazy-form__actions">
          <button
            className="lazy-button ghost"
            type="button"
            onClick={onResetRawOptions}
          >
            Reset JSON
          </button>
          <button
            className="lazy-button"
            type="button"
            onClick={onApplyRawOptions}
          >
            Apply JSON
          </button>
        </div>
      </div>
    ) : null}
    {showCompiledConfig ? (
      <pre className="lazy-code-block lazy-code-block--panel">
        {compiledPanelJson || 'No compiled config available.'}
      </pre>
    ) : null}
  </>
);

export default WidgetPropertiesExpertSection;
