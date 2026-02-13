import { describe, expect, it } from 'vitest';
import {
  buildKpiSubtypePatch,
  buildOptionPatch,
  formatStringList,
  getEncodingInputNextValue,
  getEncodingInputValue,
  getOptionPath,
  getOptionValue,
  isOptionVisible,
  normalizeColorValue,
  normalizeSubvariantKey,
  parseStringList,
  resolveSelectOptions,
  resolveSelectValue,
} from '../components/editor/WidgetPropertiesPanel.utils.js';

describe('WidgetPropertiesPanel.utils', () => {
  it('resolves option paths and values', () => {
    const schema = { path: 'appearance.color' };
    const options = { appearance: { color: '#fff' } };

    expect(getOptionPath(schema, 'color')).toBe('appearance.color');
    expect(getOptionPath({}, 'color')).toBe('color');
    expect(getOptionValue(schema, 'color', options)).toBe('#fff');
  });

  it('builds nested option patches', () => {
    const schema = { path: 'axis.label' };
    expect(buildOptionPatch(schema, 'label', 'Sales')).toEqual({
      axis: { label: 'Sales' },
    });
  });

  it('resolves select options and values safely', () => {
    const schema = {
      options: ['fallback'],
      default: 'b',
      optionsByOption: {
        option: 'mode',
        map: { a: ['a1', 'a2'] },
        fallback: ['b'],
      },
    };
    const options = { mode: 'a' };

    expect(resolveSelectOptions(schema, options)).toEqual(['a1', 'a2']);
    expect(resolveSelectValue(schema, 'missing', { mode: 'unknown' })).toBe('b');
  });

  it('normalizes KPI subtype presets', () => {
    expect(normalizeSubvariantKey('Large Value')).toBe('large-value');
    expect(buildKpiSubtypePatch('currency')).toEqual({
      format: 'currency',
      decimals: 0,
      compact: 'auto',
      compactThreshold: 1000000,
    });
    expect(buildKpiSubtypePatch('unknown')).toBeNull();
  });

  it('handles list parsing, color normalization, and visibility checks', () => {
    expect(parseStringList('a, b,, c')).toEqual(['a', 'b', 'c']);
    expect(formatStringList(['a', 'b'])).toBe('a, b');
    expect(formatStringList('solo')).toBe('solo');
    expect(normalizeColorValue('#123456', '#000000')).toBe('#123456');
    expect(normalizeColorValue('red', '#000000')).toBe('#000000');

    const schema = { visibleWhen: { option: 'mode', equals: ['a', 'b'] } };
    expect(isOptionVisible(schema, { mode: 'b' })).toBe(true);
    expect(isOptionVisible(schema, { mode: 'c' })).toBe(false);
  });

  it('formats encoding inputs', () => {
    expect(
      getEncodingInputValue({ multi: true }, ['foo', 'bar'])
    ).toBe('foo, bar');
    expect(
      getEncodingInputNextValue({ multi: true }, 'foo, bar')
    ).toEqual(['foo', 'bar']);
    expect(getEncodingInputValue({ multi: false }, 'x')).toBe('x');
    expect(getEncodingInputNextValue({ multi: false }, 'y')).toBe('y');
  });
});
