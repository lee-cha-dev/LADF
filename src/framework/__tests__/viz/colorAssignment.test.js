import { describe, expect, it } from 'vitest';
import { buildColorAssignment } from '../../core/viz/palettes/colorAssignment.js';

describe('buildColorAssignment', () => {
  it('assigns category colors for bar charts with category legend', () => {
    const assignment = buildColorAssignment({
      panelConfig: { panelType: 'viz' },
      vizType: 'bar',
      encodings: { x: 'region', y: 'value' },
      options: { colorBy: 'category' },
      data: [
        { region: 'East', value: 10 },
        { region: 'West', value: 20 },
      ],
    });

    expect(assignment.mode).toBe('category');
    expect(assignment.items.map((item) => item.key)).toEqual(['East', 'West']);
  });

  it('assigns series colors for multi-series line charts', () => {
    const assignment = buildColorAssignment({
      panelConfig: { panelType: 'viz' },
      vizType: 'line',
      encodings: { x: 'date', y: ['sales', 'profit'] },
      options: {},
      data: [{ date: '2024-01-01', sales: 10, profit: 2 }],
    });

    expect(assignment.mode).toBe('series');
    expect(assignment.items).toHaveLength(2);
  });

  it('assigns diverging palettes when requested', () => {
    const assignment = buildColorAssignment({
      panelConfig: { panelType: 'viz' },
      vizType: 'bar',
      encodings: { x: 'label', y: 'delta' },
      options: { diverging: true },
      data: [
        { label: 'A', delta: -5 },
        { label: 'B', delta: 5 },
      ],
    });

    expect(assignment.mode).toBe('diverging');
    expect(assignment.getColor(-5)).toContain('--ladf-div-neg');
    expect(assignment.getColor(5)).toContain('--ladf-div-pos');
  });

  it('assigns sequential palettes for sequential viz types', () => {
    const assignment = buildColorAssignment({
      panelConfig: { panelType: 'viz' },
      vizType: 'heatmap',
      encodings: { x: 'label', y: 'value' },
      options: {},
      data: [
        { label: 'A', value: 1 },
        { label: 'B', value: 9 },
      ],
    });

    expect(assignment.mode).toBe('sequential');
    expect(assignment.getColor(1)).toContain('--ladf-seq-');
  });
});
