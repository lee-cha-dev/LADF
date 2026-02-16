import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ChartContainer from '../../core/viz/common/ChartContainer.jsx';

describe('ChartContainer', () => {
  it('renders header and footer content', () => {
    const { getByText } = render(
      <ChartContainer title="Sales" subtitle="Q1" footer={<span>Footer</span>}>
        <div>Chart</div>
      </ChartContainer>
    );

    expect(getByText('Sales')).toBeInTheDocument();
    expect(getByText('Q1')).toBeInTheDocument();
    expect(getByText('Footer')).toBeInTheDocument();
  });

  it('renders without header when no title or subtitle', () => {
    const { container } = render(
      <ChartContainer>
        <div>Chart</div>
      </ChartContainer>
    );

    expect(container.querySelector('.ladf-chart__header')).toBeNull();
  });
});
