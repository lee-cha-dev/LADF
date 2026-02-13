import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import WidgetPropertiesActions from '../components/editor/WidgetPropertiesActions.jsx';

describe('WidgetPropertiesActions', () => {
  it('calls remove handler', () => {
    const onRequestRemoveWidget = vi.fn();

    const { getByText } = render(
      <WidgetPropertiesActions
        activeWidgetId="w1"
        onRequestRemoveWidget={onRequestRemoveWidget}
      />
    );

    fireEvent.click(getByText('Remove widget'));
    expect(onRequestRemoveWidget).toHaveBeenCalledWith('w1');
  });
});
