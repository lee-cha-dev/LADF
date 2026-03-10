import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import GridLayout from '../../core/layout/GridLayout.jsx';

const panels = [
  {
    id: 'panel-1',
    layout: { x: 0, y: -1, w: 0, h: null },
  },
];

describe('GridLayout', () => {
  it('builds default grid classes when layout is invalid', () => {
    const { container } = render(
      <GridLayout
        panels={panels}
        renderPanel={() => <div>Panel</div>}
      />
    );

    const item = container.querySelector('.ladf-grid__item');
    expect(item.className).toContain('ladf-grid__item--col-start-1');
    expect(item.className).toContain('ladf-grid__item--row-start-1');
    expect(item.className).toContain('ladf-grid__item--col-span-12');
    expect(item.className).toContain('ladf-grid__item--row-span-1');
  });
});
