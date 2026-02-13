import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import WidgetPropertiesHeaderFields from '../components/editor/WidgetPropertiesHeaderFields.jsx';

describe('WidgetPropertiesHeaderFields', () => {
  it('renders fields and updates widget values', () => {
    const activeWidget = {
      id: 'w1',
      title: 'Sales',
      subtitle: 'Q1',
      vizType: 'bar',
    };
    const datasources = [{ id: 'ds-1', name: 'Main' }];
    const vizManifests = [{ id: 'bar', label: 'Bar', supportLevel: 'partial' }];
    const onWidgetFieldChange = vi.fn();

    const { getByLabelText, getByText } = render(
      <WidgetPropertiesHeaderFields
        activeWidget={activeWidget}
        resolvedDatasourceId="ds-1"
        datasources={datasources}
        vizManifests={vizManifests}
        activeVizManifest={vizManifests[0]}
        onWidgetFieldChange={onWidgetFieldChange}
      />
    );

    fireEvent.change(getByLabelText('Title'), {
      target: { value: 'New title' },
    });
    fireEvent.change(getByLabelText('Subtitle'), {
      target: { value: 'New subtitle' },
    });
    fireEvent.change(getByLabelText('Datasource'), {
      target: { value: 'ds-1' },
    });
    fireEvent.change(getByLabelText('Viz Type'), {
      target: { value: 'bar' },
    });

    expect(onWidgetFieldChange).toHaveBeenCalledWith(
      'w1',
      'title',
      'New title'
    );
    expect(onWidgetFieldChange).toHaveBeenCalledWith(
      'w1',
      'subtitle',
      'New subtitle'
    );
    expect(onWidgetFieldChange).toHaveBeenCalledWith(
      'w1',
      'datasourceId',
      'ds-1'
    );
    expect(onWidgetFieldChange).toHaveBeenCalledWith(
      'w1',
      'vizType',
      'bar'
    );
    expect(getByText('Partial support.')).toBeInTheDocument();
  });

  it('renders deferred support warning', () => {
    const activeWidget = {
      id: 'w1',
      title: 'Sales',
      subtitle: 'Q1',
      vizType: 'bar',
    };
    const datasources = [{ id: 'ds-1', name: 'Main' }];
    const vizManifests = [{ id: 'bar', label: 'Bar', supportLevel: 'deferred' }];

    const { getByText } = render(
      <WidgetPropertiesHeaderFields
        activeWidget={activeWidget}
        resolvedDatasourceId="ds-1"
        datasources={datasources}
        vizManifests={vizManifests}
        activeVizManifest={vizManifests[0]}
        onWidgetFieldChange={() => {}}
      />
    );

    expect(getByText('Deferred widget.')).toBeInTheDocument();
  });
});
