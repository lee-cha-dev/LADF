import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import WidgetPropertiesEncodings from '../components/editor/WidgetPropertiesEncodings.jsx';

describe('WidgetPropertiesEncodings', () => {
  it('renders encoding inputs and parses multi-values', () => {
    const activeWidget = {
      id: 'w1',
      encodings: { measure: ['sales', 'profit'], dimension: 'region' },
    };
    const requiredEncodings = [
      { id: 'measure', label: 'Measure', role: 'metric', multi: true },
    ];
    const optionalEncodings = [
      {
        id: 'dimension',
        label: 'Dimension',
        role: 'dimension',
        help: 'Optional field',
      },
    ];
    const getFieldOptionsForEncoding = vi.fn(() => ['sales', 'profit']);
    const isEncodingValueAllowed = vi.fn(() => true);
    const onEncodingChange = vi.fn();

    const { getByLabelText, getByText } = render(
      <WidgetPropertiesEncodings
        activeWidget={activeWidget}
        requiredEncodings={requiredEncodings}
        optionalEncodings={optionalEncodings}
        fieldOptionsListId="field-options"
        getFieldOptionsForEncoding={getFieldOptionsForEncoding}
        isEncodingValueAllowed={isEncodingValueAllowed}
        onEncodingChange={onEncodingChange}
      />
    );

    expect(getByText('Required encodings')).toBeInTheDocument();
    expect(getByText('Optional encodings')).toBeInTheDocument();

    fireEvent.change(getByLabelText('Measure'), {
      target: { value: 'sales, region' },
    });

    expect(onEncodingChange).toHaveBeenCalledWith('w1', 'measure', [
      'sales',
      'region',
    ]);
  });

  it('shows a validation hint when encoding values are invalid', () => {
    const activeWidget = {
      id: 'w1',
      encodings: { dimension: 'invalid' },
    };
    const optionalEncodings = [
      { id: 'dimension', label: 'Dimension', role: 'dimension' },
    ];

    const { getByText } = render(
      <WidgetPropertiesEncodings
        activeWidget={activeWidget}
        requiredEncodings={[]}
        optionalEncodings={optionalEncodings}
        fieldOptionsListId="field-options"
        getFieldOptionsForEncoding={() => []}
        isEncodingValueAllowed={() => false}
        onEncodingChange={() => {}}
      />
    );

    expect(getByText('Select a dimension field.')).toBeInTheDocument();
  });
});
