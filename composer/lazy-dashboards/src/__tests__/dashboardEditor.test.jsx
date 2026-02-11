import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import DashboardEditor from '../pages/DashboardEditor.jsx';
import { createDashboard, getDashboard } from '../data/dashboardRegistry.js';

let activeDashboardId = '';

vi.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useParams: () => ({ dashboardId: activeDashboardId }),
}));

vi.mock('../components/editor/GridCanvas.jsx', () => ({
  default: ({ onAddWidget }) => (
    <button type="button" onClick={onAddWidget}>
      Open Add Widget
    </button>
  ),
}));

vi.mock('../components/editor/WidgetListPanel.jsx', () => ({
  default: () => <div>Widget List</div>,
}));

vi.mock('../components/editor/DatasetPanel.jsx', () => ({
  default: () => <div>Dataset Panel</div>,
}));

vi.mock('../components/editor/SemanticLayerPanel.jsx', () => ({
  default: () => <div>Semantic Layer</div>,
}));

vi.mock('../components/editor/WidgetPropertiesPanel.jsx', () => ({
  default: () => <div>Widget Properties</div>,
}));

vi.mock('../components/editor/TemplateModal.jsx', () => ({
  default: () => null,
}));

vi.mock('../components/editor/RemoveWidgetModal.jsx', () => ({
  default: () => null,
}));

vi.mock('../components/editor/AddWidgetModal.jsx', () => ({
  default: ({ isOpen, onConfirm, onClose }) =>
    isOpen ? (
      <button
        type="button"
        onClick={() => {
          onConfirm();
          onClose();
        }}
      >
        Confirm Widget
      </button>
    ) : null,
}));

vi.mock('../authoring/compiler.js', () => ({
  compileAuthoringModel: () => ({
    config: { id: 'dash-1', datasetId: 'ds-1', panels: [] },
    modules: {},
  }),
}));

const buildDashboardExport = vi.fn(() => ({
  folderName: 'Test',
  files: {},
  componentName: 'TestDashboard',
  fileBase: 'test',
}));
const downloadDashboardZip = vi.fn(async () => true);

vi.mock('../data/dashboardExport.js', () => ({
  buildDashboardExport: (...args) => buildDashboardExport(...args),
  downloadDashboardZip: (...args) => downloadDashboardZip(...args),
}));

vi.mock('../data/fileSystemSync.js', () => ({
  getSyncEnabled: () => false,
  isFileSystemAccessSupported: () => false,
  loadCustomDashboardsDirectory: () => Promise.resolve(null),
  requestCustomDashboardsDirectory: () => Promise.resolve(null),
  setSyncEnabled: () => {},
  writeDashboardExportToDirectory: () => Promise.resolve(true),
}));

vi.mock('../data/telemetry.js', () => ({
  trackTelemetryEvent: () => true,
}));

describe('DashboardEditor', () => {
  it('adds a widget, saves, and exports', async () => {
    window.localStorage.setItem('lazy-editor-autosave-enabled', 'false');
    const dashboard = createDashboard({ name: 'Ops Board' });
    activeDashboardId = dashboard.id;

    const { getByText } = render(
      <DashboardEditor themeFamily="default" themeMode="light" paletteId="analytics" />
    );

    fireEvent.click(getByText('Open Add Widget'));
    fireEvent.click(getByText('Confirm Widget'));

    fireEvent.click(getByText('Save Draft'));

    await waitFor(() => {
      const updated = getDashboard(dashboard.id);
      expect(updated.authoringModel.widgets.length).toBe(1);
    });

    fireEvent.click(getByText('Export'));

    await waitFor(() => {
      expect(buildDashboardExport).toHaveBeenCalledTimes(1);
      expect(downloadDashboardZip).toHaveBeenCalledTimes(1);
    });
  });
});
