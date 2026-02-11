import { describe, expect, it, vi } from 'vitest';
import {
  getSyncEnabled,
  isFileSystemAccessSupported,
  removeDashboardExportFromDirectory,
  setSyncEnabled,
  writeDashboardExportToDirectory,
} from '../data/fileSystemSync.js';

describe('fileSystemSync', () => {
  it('detects when the File System Access API is unavailable', () => {
    const original = window.showDirectoryPicker;
    delete window.showDirectoryPicker;

    expect(isFileSystemAccessSupported()).toBe(false);

    window.showDirectoryPicker = original;
  });

  it('stores sync preferences in local storage', () => {
    setSyncEnabled(true);
    expect(getSyncEnabled()).toBe(true);
    setSyncEnabled(false);
    expect(getSyncEnabled()).toBe(false);
  });

  it('throws when write permission is denied', async () => {
    const handle = {
      queryPermission: vi.fn(async () => 'denied'),
      requestPermission: vi.fn(async () => 'denied'),
    };

    await expect(
      writeDashboardExportToDirectory({ folderName: 'Test', files: {} }, handle)
    ).rejects.toThrow(/Permission denied/);
  });

  it('returns false when removal permission is denied', async () => {
    const handle = {
      queryPermission: vi.fn(async () => 'denied'),
      requestPermission: vi.fn(async () => 'denied'),
    };

    const result = await removeDashboardExportFromDirectory('Test', handle);
    expect(result).toBe(false);
  });
});
