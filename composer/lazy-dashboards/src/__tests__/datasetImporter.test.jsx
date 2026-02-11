import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import DatasetImporter from '../components/DatasetImporter.jsx';

describe('DatasetImporter', () => {
  it('parses CSV uploads and emits inferred bindings', async () => {
    const onUpdate = vi.fn();
    const { container } = render(<DatasetImporter onUpdate={onUpdate} />);

    const input = container.querySelector('input[type="file"]');
    const file = new File(['Name,Amount\nAlice,10\nBob,20\n'], 'data.csv', {
      type: 'text/csv',
    });
    file.text = () => Promise.resolve('Name,Amount\nAlice,10\nBob,20\n');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledTimes(1);
    });

    const binding = onUpdate.mock.calls[0][0];
    expect(binding.columns.length).toBe(2);
    expect(binding.previewRows.length).toBeGreaterThan(0);
    expect(binding.source.type).toBe('file');
  });
});
