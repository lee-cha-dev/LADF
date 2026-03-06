import { describe, expect, it } from 'vitest';
import { resolveXAxisProps, resolveYAxisProps } from '../../core/viz/charts/axisOptions';

describe('axisOptions', () => {
  describe('resolveXAxisProps', () => {
    it('omits interval when not provided', () => {
      const props = resolveXAxisProps({});

      expect(props).not.toHaveProperty('interval');
    });

    it('passes interval through when explicitly set, including zero', () => {
      const props = resolveXAxisProps({ xAxis: { interval: 0 } });

      expect(props).toHaveProperty('interval', 0);
    });
  });

  describe('resolveYAxisProps', () => {
    it('omits interval when not provided', () => {
      const props = resolveYAxisProps({});

      expect(props).not.toHaveProperty('interval');
    });

    it('passes interval through when explicitly set, including zero', () => {
      const props = resolveYAxisProps({ yAxis: { interval: 0 } });

      expect(props).toHaveProperty('interval', 0);
    });
  });
});
