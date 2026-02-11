import { describe, expect, it } from 'vitest';
import {
  generateExternalApiProviderModule,
  generateExternalApiProvidersModule,
} from '../data/externalApiProvider.js';

describe('externalApiProvider module generation', () => {
  it('serializes normalized config values', () => {
    const source = generateExternalApiProviderModule({
      baseUrl: 'https://api.example.com',
      headers: [
        { key: 'Authorization', value: 'token' },
        { key: '', value: 'ignore' },
      ],
      queryParams: [{ key: 'region', value: 'west' }],
      responsePath: '',
      refreshInterval: 60,
    });

    expect(source).toContain('"baseUrl": "https://api.example.com"');
    expect(source).toContain('"Authorization"');
    expect(source).not.toContain('"key": ""');
    expect(source).toContain('"responsePath": ""');
    expect(source).toContain('"refreshInterval": 60');
    expect(source).toContain('Base URL is required to fetch data.');
  });

  it('includes only api-backed datasources in multi-provider modules', () => {
    const source = generateExternalApiProvidersModule([
      {
        id: 'sales',
        datasetBinding: { source: { type: 'api', baseUrl: 'https://api.example.com' } },
      },
      {
        id: 'local',
        datasetBinding: { source: { type: 'file' } },
      },
    ]);

    expect(source).toContain('"sales"');
    expect(source).not.toContain('"local"');
  });
});
