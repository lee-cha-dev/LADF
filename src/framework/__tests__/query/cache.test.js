import { describe, expect, it } from 'vitest';
import { createQueryCache } from '../../core/query/cache.js';

describe('createQueryCache', () => {
  it('evicts least recently used entries', () => {
    const cache = createQueryCache({ maxSize: 2 });

    cache.set('a', { value: 1 });
    cache.set('b', { value: 2 });
    cache.get('a');
    cache.set('c', { value: 3 });

    expect(cache.has('a')).toBe(true);
    expect(cache.has('b')).toBe(false);
    expect(cache.has('c')).toBe(true);
  });

  it('clears entries when maxSize is zero', () => {
    const cache = createQueryCache({ maxSize: 0 });
    cache.set('a', { value: 1 });
    expect(cache.size()).toBe(0);
  });
});
