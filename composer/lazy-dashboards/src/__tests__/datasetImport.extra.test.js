import { describe, expect, it } from 'vitest';
import {
  buildApiDatasetBinding,
  buildDatasetBinding,
  buildTableFromObjectRows,
  collectDatasetWarnings,
} from '../data/datasetImport.js';

describe('datasetImport helpers', () => {
  it('builds tables from object rows with warnings', () => {
    const table = buildTableFromObjectRows([
      { 'Total Revenue': '10', details: { nested: true } },
      { 'Total Revenue': '20', details: { nested: false } },
    ]);

    expect(table.columns.length).toBe(2);
    expect(table.warnings.length).toBeGreaterThan(0);
    expect(table.sanitizedHeaders).toBe(true);
  });

  it('collects warnings for truncated and empty tables', () => {
    const warnings = collectDatasetWarnings({
      sanitizedHeaders: true,
      truncated: true,
      rowCount: 0,
    });

    expect(warnings).toEqual([
      'Some headers were empty or duplicated, so they were normalized.',
      'Loaded the first 0 rows to keep editing responsive.',
      'No data rows were found after the header row.',
    ]);
  });

  it('builds file and api dataset bindings', () => {
    const table = {
      columns: [{ id: 'amount', label: 'Amount' }],
      rows: [{ amount: 1 }],
      preview: [{ amount: 1 }],
      warnings: [],
      rowCount: 1,
      rawRowCount: 1,
      truncated: false,
      sanitizedHeaders: false,
    };

    const fileBinding = buildDatasetBinding({
      fileName: 'sales.csv',
      fileSize: 100,
      fileType: 'csv',
      table,
      fieldProfiles: [],
    });

    expect(fileBinding.source.type).toBe('file');
    expect(fileBinding.columns.length).toBe(1);

    const apiBinding = buildApiDatasetBinding({
      apiConfig: { baseUrl: 'https://api.example.com' },
      table,
      fieldProfiles: [],
    });

    expect(apiBinding.source.type).toBe('api');
    expect(apiBinding.source.baseUrl).toBe('https://api.example.com');
  });
});
