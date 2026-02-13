import { useCallback, useEffect, useMemo, useState } from 'react';
import { updateWidgetInModel } from '../../authoring/authoringModel.js';
import { isPlainObject, mergeDeep } from '../../authoring/optionUtils.js';
import {
  getVizEncodingDefaults,
  getVizOptionDefaults,
} from '../../authoring/vizManifest.js';
import {
  buildKpiSubtypePatch,
  buildOptionPatch,
} from './WidgetPropertiesPanel.utils.js';
import {
  useActiveWidgetContext,
  useFieldOptionsByRole,
  useMetricEncodingAutoFix,
  useOptionDependentSync,
  useUnsupportedOptionTelemetry,
  useVizManifestState,
} from './WidgetPropertiesPanel.hooks.js';
import WidgetPropertiesActions from './WidgetPropertiesActions.jsx';
import WidgetPropertiesEncodings from './WidgetPropertiesEncodings.jsx';
import WidgetPropertiesExpertSection from './WidgetPropertiesExpertSection.jsx';
import WidgetPropertiesHeaderFields from './WidgetPropertiesHeaderFields.jsx';
import WidgetPropertiesOptions from './WidgetPropertiesOptions.jsx';
import WidgetPropertiesValidation from './WidgetPropertiesValidation.jsx';

/**
 * WidgetPropertiesPanel
 * ---------------------
 * Orchestrates the widget properties editor by wiring manifest-driven data,
 * datasource context, and update handlers into focused child components.
 */

/**
 * @typedef {Object} WidgetPropertiesPanelProps
 * @property {{ widgets: Object[] }} authoringModel
 * @property {string|null} activeWidgetId
 * @property {Object[]} vizManifests
 * @property {Object[]} datasources
 * @property {string|null} activeDatasourceId
 * @property {Object} validation
 * @property {Object} manifestCoverage
 * @property {Map<string, Object>} compiledPanelMap
 * @property {(updater: (model: Object) => Object) => void} onUpdateAuthoringModel
 * @property {(widgetId: string) => void} onRequestRemoveWidget
 */

/**
 * Editor panel for configuring widget encodings and options.
 *
 * @param {WidgetPropertiesPanelProps} props
 * @returns {JSX.Element}
 */
const WidgetPropertiesPanel = ({
  authoringModel,
  activeWidgetId,
  vizManifests,
  datasources,
  activeDatasourceId,
  validation,
  manifestCoverage,
  compiledPanelMap,
  onUpdateAuthoringModel,
  onRequestRemoveWidget,
}) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showExpertOptions, setShowExpertOptions] = useState(false);
  const [rawOptionsText, setRawOptionsText] = useState('');
  const [rawOptionsError, setRawOptionsError] = useState('');
  const [showCompiledConfig, setShowCompiledConfig] = useState(false);
  const widgets = authoringModel?.widgets || [];
  const fieldOptionsListId = 'lazy-field-options';

  /**
   * Reset view-specific state whenever the active widget changes.
   */
  useEffect(() => {
    setShowAdvancedOptions(false);
    setShowExpertOptions(false);
    setRawOptionsError('');
  }, [activeWidgetId]);

  const {
    activeWidget,
    resolvedDatasourceId,
    datasetColumns,
    normalizedSemanticLayer,
  } = useActiveWidgetContext({
    widgets,
    activeWidgetId,
    datasources,
    activeDatasourceId,
  });

  /**
   * Keep the raw JSON editor in sync with the widget options.
   * Disabled when expert mode is on because expert mode owns the text.
   */
  useEffect(() => {
    if (!activeWidget || showExpertOptions) {
      return;
    }
    setRawOptionsText(JSON.stringify(activeWidget.options || {}, null, 2));
    setRawOptionsError('');
  }, [activeWidget, showExpertOptions]);

  /**
   * Guarded dispatcher for authoring model updates.
   *
   * @param {(model: Object) => Object} updater
   */
  const updateAuthoringModel = useCallback((updater) => {
    if (typeof onUpdateAuthoringModel === 'function') {
      onUpdateAuthoringModel(updater);
    }
  }, [onUpdateAuthoringModel]);

  /**
   * Update a top-level widget field.
   * Special-case vizType changes to reset encodings/options to defaults.
   *
   * @param {string} widgetId
   * @param {string} key
   * @param {*} value
   */
  const handleWidgetFieldChange = (widgetId, key, value) => {
    updateAuthoringModel((current) => {
      if (key !== 'vizType') {
        return updateWidgetInModel(current, widgetId, {
          [key]: value,
          draft: false,
        });
      }
      const nextEncodings = getVizEncodingDefaults(value);
      const nextOptions = getVizOptionDefaults(value);
      return updateWidgetInModel(current, widgetId, {
        [key]: value,
        encodings: nextEncodings,
        options: nextOptions,
        replaceEncodings: true,
        replaceOptions: true,
        draft: false,
      });
    });
  };

  /**
   * Update a single encoding field for the widget.
   *
   * @param {string} widgetId
   * @param {string} key
   * @param {*} value
   */
  const handleEncodingChange = (widgetId, key, value) => {
    updateAuthoringModel((current) =>
      updateWidgetInModel(current, widgetId, {
        encodings: { [key]: value },
        draft: false,
      })
    );
  };

  /**
   * Update a widget option.
   * When KPI subtype changes, apply the preset formatting fields.
   *
   * @param {string} widgetId
   * @param {string} optionKey
   * @param {Object} schema
   * @param {*} value
   */
  const handleOptionChange = (widgetId, optionKey, schema, value) => {
    let patch = buildOptionPatch(schema, optionKey, value);
    const isKpiSubtypeChange =
      (activeWidget?.vizType === 'kpi' && optionKey === 'subtype') ||
      (activeWidget?.vizType === 'kpiVariant' && optionKey === 'subvariant');
    if (isKpiSubtypeChange) {
      const subtypePatch = buildKpiSubtypePatch(value);
      if (subtypePatch) {
        patch = mergeDeep(patch, subtypePatch);
      }
    }
    updateAuthoringModel((current) =>
      updateWidgetInModel(current, widgetId, {
        options: patch,
        draft: false,
      })
    );
  };

  /**
   * Toggle the expert (raw JSON) options editor.
   */
  const handleToggleExpertOptions = () => {
    setShowExpertOptions((current) => {
      const next = !current;
      if (next && activeWidget) {
        setRawOptionsText(
          JSON.stringify(activeWidget.options || {}, null, 2)
        );
      }
      setRawOptionsError('');
      return next;
    });
  };

  /**
   * Apply the raw JSON editor contents into widget options.
   * Validates that the JSON parses into a plain object.
   */
  const handleApplyRawOptions = () => {
    if (!activeWidget) {
      return;
    }
    try {
      const parsed = rawOptionsText ? JSON.parse(rawOptionsText) : {};
      if (!isPlainObject(parsed)) {
        throw new Error('Options JSON must be an object.');
      }
      updateAuthoringModel((current) =>
        updateWidgetInModel(current, activeWidget.id, {
          options: parsed,
          replaceOptions: true,
          draft: false,
        })
      );
      setRawOptionsError('');
    } catch (error) {
      setRawOptionsError(error?.message || 'Options JSON is invalid.');
    }
  };

  /**
   * Reset the raw JSON editor to the current widget options.
   */
  const handleResetRawOptions = () => {
    if (!activeWidget) {
      return;
    }
    setRawOptionsText(JSON.stringify(activeWidget.options || {}, null, 2));
    setRawOptionsError('');
  };

  const {
    activeVizManifest,
    requiredEncodings,
    optionalEncodings,
    optionEntries,
    basicOptions,
    advancedOptions,
    unsupportedOptionPaths,
  } = useVizManifestState(activeWidget);

  useUnsupportedOptionTelemetry(activeWidget, unsupportedOptionPaths);
  useOptionDependentSync(activeWidget, optionEntries, updateAuthoringModel);

  const {
    fieldOptionsByRole,
    getFieldOptionsForEncoding,
    isEncodingValueAllowed,
  } = useFieldOptionsByRole(datasetColumns, normalizedSemanticLayer);

  useMetricEncodingAutoFix(
    activeWidget,
    requiredEncodings,
    optionalEncodings,
    fieldOptionsByRole,
    getFieldOptionsForEncoding,
    isEncodingValueAllowed,
    updateAuthoringModel
  );

  const compiledActivePanel = activeWidget
    ? compiledPanelMap.get(activeWidget.id)
    : null;
  const compiledPanelJson = useMemo(
    () =>
      compiledActivePanel ? JSON.stringify(compiledActivePanel, null, 2) : '',
    [compiledActivePanel]
  );

  const activeValidation = activeWidget
    ? validation.widgets[activeWidget.id]
    : null;
  const widgetErrors = activeValidation?.errors || [];

  return (
    <section className="lazy-panel">
      <h2 className="lazy-panel__title">Widget Properties</h2>
      {manifestCoverage.errors.length > 0 ? (
        <div className="lazy-alert danger">
          <strong>Manifest coverage check failed.</strong>
          <span>{manifestCoverage.errors.join(' ')}</span>
        </div>
      ) : null}
      {!activeWidget ? (
        <p className="lazy-panel__body">
          Select a widget to tune encodings, options, and filters.
        </p>
      ) : (
        <div className="lazy-form">
          <datalist id={fieldOptionsListId}>
            {fieldOptionsByRole.all.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
          <WidgetPropertiesHeaderFields
            activeWidget={activeWidget}
            resolvedDatasourceId={resolvedDatasourceId}
            datasources={datasources}
            vizManifests={vizManifests}
            activeVizManifest={activeVizManifest}
            onWidgetFieldChange={handleWidgetFieldChange}
          />
          <WidgetPropertiesEncodings
            activeWidget={activeWidget}
            requiredEncodings={requiredEncodings}
            optionalEncodings={optionalEncodings}
            fieldOptionsListId={fieldOptionsListId}
            getFieldOptionsForEncoding={getFieldOptionsForEncoding}
            isEncodingValueAllowed={isEncodingValueAllowed}
            onEncodingChange={handleEncodingChange}
          />
          <WidgetPropertiesOptions
            activeWidget={activeWidget}
            basicOptions={basicOptions}
            advancedOptions={advancedOptions}
            showAdvancedOptions={showAdvancedOptions}
            onToggleAdvancedOptions={() =>
              setShowAdvancedOptions((current) => !current)
            }
            fieldOptionsListId={fieldOptionsListId}
            unsupportedOptionPaths={unsupportedOptionPaths}
            onOptionChange={handleOptionChange}
          />
          <WidgetPropertiesExpertSection
            showExpertOptions={showExpertOptions}
            showCompiledConfig={showCompiledConfig}
            onToggleExpertOptions={handleToggleExpertOptions}
            onToggleCompiledConfig={() =>
              setShowCompiledConfig((current) => !current)
            }
            rawOptionsText={rawOptionsText}
            rawOptionsError={rawOptionsError}
            onRawOptionsTextChange={setRawOptionsText}
            onResetRawOptions={handleResetRawOptions}
            onApplyRawOptions={handleApplyRawOptions}
            compiledPanelJson={compiledPanelJson}
          />
          <WidgetPropertiesValidation widgetErrors={widgetErrors} />
          <WidgetPropertiesActions
            activeWidgetId={activeWidget.id}
            onRequestRemoveWidget={onRequestRemoveWidget}
          />
        </div>
      )}
    </section>
  );
};

export default WidgetPropertiesPanel;
