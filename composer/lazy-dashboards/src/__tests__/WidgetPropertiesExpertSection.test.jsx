import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import WidgetPropertiesExpertSection from '../components/editor/WidgetPropertiesExpertSection.jsx';

describe('WidgetPropertiesExpertSection', () => {
  it('renders expert controls and compiled config', () => {
    const onRawOptionsTextChange = vi.fn();

    const { getByText, getByLabelText } = render(
      <WidgetPropertiesExpertSection
        showExpertOptions
        showCompiledConfig
        onToggleExpertOptions={() => {}}
        onToggleCompiledConfig={() => {}}
        rawOptionsText={'{\n  "foo": true\n}'}
        rawOptionsError=""
        onRawOptionsTextChange={onRawOptionsTextChange}
        onResetRawOptions={() => {}}
        onApplyRawOptions={() => {}}
        compiledPanelJson="compiled"
      />
    );

    fireEvent.change(getByLabelText('Options JSON'), {
      target: { value: '{"foo": false}' },
    });

    expect(onRawOptionsTextChange).toHaveBeenCalledWith('{"foo": false}');
    expect(getByText('compiled')).toBeInTheDocument();
  });
});
