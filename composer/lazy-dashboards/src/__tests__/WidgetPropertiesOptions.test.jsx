import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import WidgetPropertiesOptions from '../components/editor/WidgetPropertiesOptions.jsx';

describe('WidgetPropertiesOptions', () => {
  it('renders basic options and triggers changes', () => {
    const activeWidget = {
      id: 'w1',
      options: { showLegend: true, mode: 'b' },
    };
    const basicOptions = [
      ['showLegend', { type: 'boolean', label: 'Show legend' }],
      ['mode', { type: 'enum', label: 'Mode', options: ['a', 'b'] }],
    ];
    const onOptionChange = vi.fn();

    const { getByLabelText } = render(
      <WidgetPropertiesOptions
        activeWidget={activeWidget}
        basicOptions={basicOptions}
        advancedOptions={[]}
        showAdvancedOptions={false}
        onToggleAdvancedOptions={() => {}}
        fieldOptionsListId="field-options"
        unsupportedOptionPaths={[]}
        onOptionChange={onOptionChange}
      />
    );

    fireEvent.click(getByLabelText('Show legend'));
    fireEvent.change(getByLabelText('Mode'), {
      target: { value: 'a' },
    });

    expect(onOptionChange).toHaveBeenCalledWith(
      'w1',
      'showLegend',
      basicOptions[0][1],
      false
    );
    expect(onOptionChange).toHaveBeenCalledWith(
      'w1',
      'mode',
      basicOptions[1][1],
      'a'
    );
  });

  it('handles advanced options and unsupported warnings', () => {
    const activeWidget = {
      id: 'w1',
      options: { tags: ['a'] },
    };
    const advancedOptions = [
      ['tags', { type: 'stringList', label: 'Tags', advanced: true }],
    ];
    const onToggleAdvancedOptions = vi.fn();

    const { getByText, queryByLabelText, rerender } = render(
      <WidgetPropertiesOptions
        activeWidget={activeWidget}
        basicOptions={[]}
        advancedOptions={advancedOptions}
        showAdvancedOptions={false}
        onToggleAdvancedOptions={onToggleAdvancedOptions}
        fieldOptionsListId="field-options"
        unsupportedOptionPaths={['foo.bar']}
        onOptionChange={() => {}}
      />
    );

    fireEvent.click(getByText('Show advanced options'));
    expect(onToggleAdvancedOptions).toHaveBeenCalledTimes(1);
    expect(getByText('Unsupported options detected.')).toBeInTheDocument();
    expect(getByText(/foo\.bar/)).toBeInTheDocument();
    expect(queryByLabelText('Tags')).toBeNull();

    rerender(
      <WidgetPropertiesOptions
        activeWidget={activeWidget}
        basicOptions={[]}
        advancedOptions={advancedOptions}
        showAdvancedOptions
        onToggleAdvancedOptions={onToggleAdvancedOptions}
        fieldOptionsListId="field-options"
        unsupportedOptionPaths={[]}
        onOptionChange={() => {}}
      />
    );

    expect(getByText('Tags')).toBeInTheDocument();
  });
});
