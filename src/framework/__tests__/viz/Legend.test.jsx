import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import Legend from '../../core/viz/legend/Legend.jsx';

describe('Legend', () => {
  it('renders items and toggles hidden state', () => {
    const onToggle = vi.fn();
    const items = [
      { key: 'a', label: 'Alpha', colorVar: 'var(--ladf-series-1)' },
      { key: 'b', label: 'Beta', colorVar: 'var(--ladf-series-2)' },
    ];

    const { getByText, container } = render(
      <Legend items={items} hiddenKeys={new Set(['b'])} onToggle={onToggle} />
    );

    const hiddenItem = container.querySelector('.ladf-legend__item--hidden');
    expect(hiddenItem).not.toBeNull();

    fireEvent.click(getByText('Alpha'));
    expect(onToggle).toHaveBeenCalledWith('a');
  });

  it('derives swatch classes from palette variables', () => {
    const items = [
      { key: 'a', label: 'Alpha', colorVar: 'var(--ladf-series-2)' },
    ];

    const { container } = render(<Legend items={items} />);
    const item = container.querySelector('.ladf-legend__item');
    expect(item.className).toContain('ladf-swatch--2');
  });
});
