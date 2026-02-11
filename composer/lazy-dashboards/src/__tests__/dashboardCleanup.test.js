import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createDashboard } from '../data/dashboardRegistry.js';
import { deleteDashboardAndCleanup } from '../data/dashboardCleanup.js';
import * as fileSystemSync from '../data/fileSystemSync.js';

vi.mock('../data/fileSystemSync.js', () => ({
  getSyncEnabled: vi.fn(() => false),
  isFileSystemAccessSupported: vi.fn(() => true),
  loadCustomDashboardsDirectory: vi.fn(async () => null),
  removeDashboardExportFromDirectory: vi.fn(async () => true),
}));

describe('deleteDashboardAndCleanup', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('deletes without sync when disabled', async () => {
    fileSystemSync.getSyncEnabled.mockReturnValue(false);
    const dashboard = createDashboard({ name: 'Cleanup' });

    const result = await deleteDashboardAndCleanup(dashboard);

    expect(result).toEqual({
      success: true,
      syncAttempted: false,
      syncRemoved: false,
    });
    expect(fileSystemSync.removeDashboardExportFromDirectory).not.toHaveBeenCalled();
  });

  it('removes synced exports when enabled and handle provided', async () => {
    fileSystemSync.getSyncEnabled.mockReturnValue(true);
    const dashboard = createDashboard({ name: 'Cleanup Sync' });

    const handle = { id: 'handle' };
    const result = await deleteDashboardAndCleanup(dashboard, {
      syncEnabled: true,
      syncHandle: handle,
    });

    expect(result.success).toBe(true);
    expect(result.syncAttempted).toBe(true);
    expect(fileSystemSync.removeDashboardExportFromDirectory).toHaveBeenCalledTimes(1);
    expect(fileSystemSync.removeDashboardExportFromDirectory).toHaveBeenCalledWith(
      'CleanupSync',
      handle
    );
  });
});
