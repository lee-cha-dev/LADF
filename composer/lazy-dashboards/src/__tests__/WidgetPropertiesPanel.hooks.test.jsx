import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useActiveWidgetContext,
  useFieldOptionsByRole,
  useMetricEncodingAutoFix,
  useOptionDependentSync,
  useUnsupportedOptionTelemetry,
  useVizManifestState,
} from '../components/editor/WidgetPropertiesPanel.hooks.js';
import { getVizManifest } from '../authoring/vizManifest.js';
import { trackTelemetryEvent } from '../data/telemetry.js';
import { updateWidgetInModel } from '../authoring/authoringModel.js';

vi.mock('../authoring/vizManifest.js', () => ({
  getVizManifest: vi.fn(),
}));

vi.mock('../data/telemetry.js', () => ({
  trackTelemetryEvent: vi.fn(),
}));

vi.mock('../authoring/authoringModel.js', () => ({
  updateWidgetInModel: vi.fn((current, widgetId, patch) => ({
    ...current,
    widgetId,
    patch,
  })),
}));

describe('WidgetPropertiesPanel.hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resolves active widget and datasource context', () => {
    const widgets = [
      { id: 'w1', datasourceId: 'ds-1' },
      { id: 'w2', datasetId: 'ds-2' },
    ];
    const datasources = [
      {
        id: 'ds-1',
        datasetBinding: { columns: [{ id: 'col-1' }] },
      },
      { id: 'ds-2' },
    ];

    const { result } = renderHook(() =>
      useActiveWidgetContext({
        widgets,
        activeWidgetId: 'w1',
        datasources,
        activeDatasourceId: 'ds-2',
      })
    );

    expect(result.current.activeWidget.id).toBe('w1');
    expect(result.current.resolvedDatasourceId).toBe('ds-1');
    expect(result.current.datasetColumns).toEqual([{ id: 'col-1' }]);
  });

  it('derives manifest-driven encodings and option groupings', () => {
    getVizManifest.mockReturnValue({
      encodings: { required: [{ id: 'x' }], optional: [] },
      options: {
        foo: { label: 'Foo' },
        bar: { label: 'Bar', advanced: true, visibleWhen: { option: 'mode', equals: 'show' } },
        baz: { label: 'Baz', path: 'nested.baz' },
      },
    });

    const activeWidget = {
      vizType: 'test',
      options: { foo: 1, mode: 'show', nested: { baz: 2 }, extra: true },
    };

    const { result } = renderHook(() => useVizManifestState(activeWidget));

    expect(result.current.requiredEncodings).toHaveLength(1);
    expect(result.current.basicOptions.map(([key]) => key)).toEqual(
      expect.arrayContaining(['foo', 'baz'])
    );
    expect(result.current.advancedOptions.map(([key]) => key)).toEqual(['bar']);
    expect(result.current.unsupportedOptionPaths).toEqual(
      expect.arrayContaining(['extra'])
    );
  });

  it('logs unsupported options once per widget/path', async () => {
    const activeWidget = { id: 'w1', vizType: 'bar' };
    const unsupported = ['foo', 'bar'];

    const { rerender } = renderHook(
      ({ widget, paths }) => useUnsupportedOptionTelemetry(widget, paths),
      { initialProps: { widget: activeWidget, paths: unsupported } }
    );

    await waitFor(() => {
      expect(trackTelemetryEvent).toHaveBeenCalledTimes(2);
    });

    rerender({ widget: activeWidget, paths: unsupported });

    await waitFor(() => {
      expect(trackTelemetryEvent).toHaveBeenCalledTimes(2);
    });
  });

  it('syncs option-dependent select values', async () => {
    const activeWidget = {
      id: 'w1',
      options: { mode: 'a', variant: 'x' },
    };
    const optionEntries = [
      [
        'variant',
        {
          optionsByOption: {
            option: 'mode',
            map: { a: ['a1'] },
          },
        },
      ],
    ];
    const updateAuthoringModel = vi.fn((updater) => updater({}));

    renderHook(() =>
      useOptionDependentSync(activeWidget, optionEntries, updateAuthoringModel)
    );

    await waitFor(() => {
      expect(updateWidgetInModel).toHaveBeenCalledTimes(1);
    });

    const [, widgetId, patch] = updateWidgetInModel.mock.calls[0];
    expect(widgetId).toBe('w1');
    expect(patch.options).toEqual({ variant: 'a1' });
  });

  it('builds field options by role and validates encoding values', () => {
    const datasetColumns = [
      { id: 'sales', type: 'number' },
      { id: 'region', type: 'string' },
    ];
    const semanticLayer = {
      enabled: true,
      metrics: [{ id: 'gmv' }],
      dimensions: [{ id: 'country' }],
    };

    const { result } = renderHook(() =>
      useFieldOptionsByRole(datasetColumns, semanticLayer)
    );

    expect(result.current.fieldOptionsByRole.metric).toEqual(
      expect.arrayContaining(['sales', 'gmv'])
    );
    expect(result.current.fieldOptionsByRole.dimension).toEqual(
      expect.arrayContaining(['region', 'country'])
    );
    expect(
      result.current.isEncodingValueAllowed({ role: 'metric' }, 'sales')
    ).toBe(true);
  });

  it('auto-fixes invalid metric encodings when one option is available', async () => {
    const activeWidget = { id: 'w1', encodings: { metric: 'bad' } };
    const requiredEncodings = [{ id: 'metric', role: 'metric' }];
    const optionalEncodings = [];
    const fieldOptionsByRole = { metric: ['good'], dimension: [], all: [] };
    const getFieldOptionsForEncoding = () => ['good'];
    const isEncodingValueAllowed = () => false;
    const updateAuthoringModel = vi.fn((updater) => updater({}));

    renderHook(() =>
      useMetricEncodingAutoFix(
        activeWidget,
        requiredEncodings,
        optionalEncodings,
        fieldOptionsByRole,
        getFieldOptionsForEncoding,
        isEncodingValueAllowed,
        updateAuthoringModel
      )
    );

    await waitFor(() => {
      expect(updateWidgetInModel).toHaveBeenCalledTimes(1);
    });

    const [, widgetId, patch] = updateWidgetInModel.mock.calls[0];
    expect(widgetId).toBe('w1');
    expect(patch.encodings).toEqual({ metric: 'good' });
  });
});
