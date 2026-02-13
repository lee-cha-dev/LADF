/**
 * WidgetPropertiesPanel hooks
 * ---------------------------
 * Focused hooks for deriving widget context, manifest-driven config,
 * field options, and synchronization side effects.
 */

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { updateWidgetInModel } from '../../authoring/authoringModel.js';
import { flattenOptionPaths, mergeDeep } from '../../authoring/optionUtils.js';
import { getVizManifest } from '../../authoring/vizManifest.js';
import { trackTelemetryEvent } from '../../data/telemetry.js';
import {
  buildOptionPatch,
  getOptionPath,
  getOptionValue,
  isOptionVisible,
  resolveSelectOptions,
  resolveSelectValue,
} from './WidgetPropertiesPanel.utils.js';

/**
 * Resolve the active widget and its datasource context.
 * Datasource preference order: widget datasourceId, widget datasetId,
 * active datasource from parent, or first datasource in list.
 *
 * @param {Object} params
 * @param {Object[]} params.widgets
 * @param {string|null} params.activeWidgetId
 * @param {Object[]} params.datasources
 * @param {string|null} params.activeDatasourceId
 * @returns {{
 *   activeWidget: Object|null,
 *   resolvedDatasourceId: string|null,
 *   activeDatasource: Object|null,
 *   datasetColumns: Object[],
 *   normalizedSemanticLayer: Object
 * }}
 */
export const useActiveWidgetContext = ({
  widgets,
  activeWidgetId,
  datasources,
  activeDatasourceId,
}) => {
  const activeWidget = (widgets || []).find(
    (widget) => widget.id === activeWidgetId
  );
  const resolvedDatasourceId =
    activeWidget?.datasourceId ||
    activeWidget?.datasetId ||
    activeDatasourceId ||
    null;
  const activeDatasource =
    (datasources || []).find(
      (datasource) => datasource.id === resolvedDatasourceId
    ) || datasources?.[0] || null;
  const datasetColumns = useMemo(
    () => activeDatasource?.datasetBinding?.columns || [],
    [activeDatasource?.datasetBinding?.columns]
  );
  const normalizedSemanticLayer = useMemo(
    () =>
      activeDatasource?.semanticLayer || {
        enabled: false,
        metrics: [],
        dimensions: [],
      },
    [activeDatasource?.semanticLayer]
  );

  return {
    activeWidget,
    resolvedDatasourceId,
    activeDatasource,
    datasetColumns,
    normalizedSemanticLayer,
  };
};

/**
 * Derive manifest-driven encodings and options, plus visibility and support data.
 *
 * @param {Object|null} activeWidget
 * @returns {{
 *   activeVizManifest: Object|null,
 *   requiredEncodings: Object[],
 *   optionalEncodings: Object[],
 *   optionEntries: [string, Object][],
 *   visibleOptions: [string, Object][],
 *   basicOptions: [string, Object][],
 *   advancedOptions: [string, Object][],
 *   supportedOptionPaths: Set<string>,
 *   unsupportedOptionPaths: string[]
 * }}
 */
export const useVizManifestState = (activeWidget) => {
  const activeVizManifest = useMemo(
    () => getVizManifest(activeWidget?.vizType),
    [activeWidget?.vizType]
  );
  const requiredEncodings = useMemo(
    () => activeVizManifest?.encodings?.required || [],
    [activeVizManifest]
  );
  const optionalEncodings = useMemo(
    () => activeVizManifest?.encodings?.optional || [],
    [activeVizManifest]
  );
  const optionEntries = useMemo(
    () => Object.entries(activeVizManifest?.options || {}),
    [activeVizManifest]
  );
  const visibleOptions = optionEntries.filter(([, schema]) =>
    isOptionVisible(schema, activeWidget?.options)
  );
  const basicOptions = visibleOptions.filter(([, schema]) => !schema.advanced);
  const advancedOptions = visibleOptions.filter(
    ([, schema]) => schema.advanced
  );
  const supportedOptionPaths = useMemo(() => {
    const paths = new Set();
    optionEntries.forEach(([key, schema]) => {
      paths.add(getOptionPath(schema, key));
    });
    return paths;
  }, [optionEntries]);
  const unsupportedOptionPaths = useMemo(() => {
    if (!activeWidget) {
      return [];
    }
    return flattenOptionPaths(activeWidget.options || {}).filter(
      (path) => !supportedOptionPaths.has(path)
    );
  }, [activeWidget, supportedOptionPaths]);

  return {
    activeVizManifest,
    requiredEncodings,
    optionalEncodings,
    optionEntries,
    visibleOptions,
    basicOptions,
    advancedOptions,
    supportedOptionPaths,
    unsupportedOptionPaths,
  };
};

/**
 * Emit telemetry for option paths that are present but not supported by the manifest.
 *
 * @param {Object|null} activeWidget
 * @param {string[]} unsupportedOptionPaths
 */
export const useUnsupportedOptionTelemetry = (
  activeWidget,
  unsupportedOptionPaths
) => {
  const unsupportedOptionLogRef = useRef(new Set());

  useEffect(() => {
    if (!activeWidget || unsupportedOptionPaths.length === 0) {
      return;
    }
    const logged = unsupportedOptionLogRef.current;
    unsupportedOptionPaths.forEach((path) => {
      const key = `${activeWidget.id}:${path}`;
      if (logged.has(key)) {
        return;
      }
      logged.add(key);
      trackTelemetryEvent('widget_option_unsupported', {
        widgetId: activeWidget.id,
        vizType: activeWidget.vizType,
        optionPath: path,
      });
    });
  }, [activeWidget, unsupportedOptionPaths]);
};

/**
 * Ensure options with option-dependent select lists remain valid.
 * If a value falls out of the allowed list, set it to a safe fallback.
 *
 * @param {Object|null} activeWidget
 * @param {[string, Object][]} optionEntries
 * @param {(updater: (model: Object) => Object) => void} updateAuthoringModel
 */
export const useOptionDependentSync = (
  activeWidget,
  optionEntries,
  updateAuthoringModel
) => {
  useEffect(() => {
    if (!activeWidget) {
      return;
    }
    const nextOptions = optionEntries.reduce((acc, [optionKey, schema]) => {
      if (!schema?.optionsByOption) {
        return acc;
      }
      const selectOptions = resolveSelectOptions(schema, activeWidget.options);
      if (!selectOptions.length) {
        return acc;
      }
      const currentValue = getOptionValue(
        schema,
        optionKey,
        activeWidget.options
      );
      const nextValue = resolveSelectValue(
        schema,
        currentValue,
        activeWidget.options
      );
      if (nextValue === currentValue) {
        return acc;
      }
      return mergeDeep(
        acc,
        buildOptionPatch(schema, optionKey, nextValue)
      );
    }, {});
    if (Object.keys(nextOptions).length === 0) {
      return;
    }
    updateAuthoringModel((current) =>
      updateWidgetInModel(current, activeWidget.id, {
        options: nextOptions,
        draft: false,
      })
    );
  }, [activeWidget, optionEntries, updateAuthoringModel]);
};

/**
 * Build field-option lists and validators based on dataset columns and semantic layer.
 *
 * @param {Object[]} datasetColumns
 * @param {Object} normalizedSemanticLayer
 * @returns {{
 *   fieldOptionsByRole: { all: string[], metric: string[], dimension: string[] },
 *   getFieldOptionsForEncoding: (encoding: Object) => string[],
 *   isEncodingValueAllowed: (encoding: Object, value: *) => boolean
 * }}
 */
export const useFieldOptionsByRole = (
  datasetColumns,
  normalizedSemanticLayer
) => {
  const fieldOptionsByRole = useMemo(() => {
    const all = new Set();
    const metrics = new Set();
    const dimensions = new Set();
    const addOption = (id, role) => {
      if (!id) {
        return;
      }
      all.add(id);
      if (role === 'metric') {
        metrics.add(id);
      } else if (role === 'dimension') {
        dimensions.add(id);
      }
    };
    (datasetColumns || []).forEach((column) => {
      const id = column?.id;
      let role = column?.role || column?.inferredRole || null;
      if (!role) {
        const type = column?.type || column?.inferredType || 'string';
        role = type === 'number' ? 'metric' : 'dimension';
      }
      addOption(id, role);
    });
    if (normalizedSemanticLayer.enabled) {
      normalizedSemanticLayer.dimensions.forEach((dimension) =>
        addOption(dimension?.id, 'dimension')
      );
      normalizedSemanticLayer.metrics.forEach((metric) =>
        addOption(metric?.id, 'metric')
      );
    }
    return {
      all: Array.from(all),
      metric: Array.from(metrics),
      dimension: Array.from(dimensions),
    };
  }, [datasetColumns, normalizedSemanticLayer]);

  const getFieldOptionsForEncoding = useCallback(
    (encoding) => {
      if (encoding?.role === 'metric') {
        return fieldOptionsByRole.metric;
      }
      if (encoding?.role === 'dimension') {
        return fieldOptionsByRole.dimension;
      }
      return fieldOptionsByRole.all;
    },
    [fieldOptionsByRole]
  );

  const isEncodingValueAllowed = useCallback(
    (encoding, value) => {
      const allowed = getFieldOptionsForEncoding(encoding);
      if (!allowed.length) {
        return true;
      }
      if (encoding?.multi) {
        return Array.isArray(value)
          ? value.every((entry) => allowed.includes(entry))
          : false;
      }
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      return allowed.includes(value);
    },
    [getFieldOptionsForEncoding]
  );

  return {
    fieldOptionsByRole,
    getFieldOptionsForEncoding,
    isEncodingValueAllowed,
  };
};

/**
 * Auto-correct invalid metric encodings when there is a single valid option.
 *
 * @param {Object|null} activeWidget
 * @param {Object[]} requiredEncodings
 * @param {Object[]} optionalEncodings
 * @param {Object} fieldOptionsByRole
 * @param {(encoding: Object) => string[]} getFieldOptionsForEncoding
 * @param {(encoding: Object, value: *) => boolean} isEncodingValueAllowed
 * @param {(updater: (model: Object) => Object) => void} updateAuthoringModel
 */
export const useMetricEncodingAutoFix = (
  activeWidget,
  requiredEncodings,
  optionalEncodings,
  fieldOptionsByRole,
  getFieldOptionsForEncoding,
  isEncodingValueAllowed,
  updateAuthoringModel
) => {
  useEffect(() => {
    if (!activeWidget) {
      return;
    }
    const encodingsToCheck = [
      ...(requiredEncodings || []),
      ...(optionalEncodings || []),
    ];
    const patch = {};
    encodingsToCheck.forEach((encoding) => {
      if (encoding?.role !== 'metric') {
        return;
      }
      const allowed = getFieldOptionsForEncoding(encoding);
      if (allowed.length !== 1) {
        return;
      }
      const current = activeWidget.encodings?.[encoding.id];
      if (!current || isEncodingValueAllowed(encoding, current)) {
        return;
      }
      patch[encoding.id] = allowed[0];
    });
    if (Object.keys(patch).length) {
      updateAuthoringModel((current) =>
        updateWidgetInModel(current, activeWidget.id, {
          encodings: patch,
          draft: false,
        })
      );
    }
  }, [
    activeWidget,
    optionalEncodings,
    requiredEncodings,
    fieldOptionsByRole,
    getFieldOptionsForEncoding,
    isEncodingValueAllowed,
    updateAuthoringModel,
  ]);
};
