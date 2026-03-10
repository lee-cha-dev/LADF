import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ChartTooltip from '../../core/viz/common/ChartTooltip.jsx';

describe('ChartTooltip', () => {
  it('renders nothing when inactive', () => {
    const { container } = render(<ChartTooltip active={false} payload={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders label and payload entries when active', () => {
    const { getByText } = render(
      <ChartTooltip
        active
        label="Jan"
        payload={[{ name: 'Revenue', value: 10, dataKey: 'revenue' }]}
      />
    );

    expect(getByText('Jan')).toBeInTheDocument();
    expect(getByText('Revenue')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
  });
});
