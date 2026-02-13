import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import WidgetPropertiesValidation from '../components/editor/WidgetPropertiesValidation.jsx';

describe('WidgetPropertiesValidation', () => {
  it('renders errors when present', () => {
    const { getByText } = render(
      <WidgetPropertiesValidation widgetErrors={['Missing title']} />
    );

    expect(getByText('Needs attention')).toBeInTheDocument();
    expect(getByText('Missing title')).toBeInTheDocument();
  });

  it('renders nothing when empty', () => {
    const { queryByText } = render(
      <WidgetPropertiesValidation widgetErrors={[]} />
    );

    expect(queryByText('Needs attention')).toBeNull();
  });
});
