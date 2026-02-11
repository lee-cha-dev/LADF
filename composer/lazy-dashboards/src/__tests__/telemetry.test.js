import { describe, expect, it, vi } from 'vitest';
import {
  isTelemetryEnabled,
  setTelemetryEnabled,
  trackTelemetryEvent,
} from '../data/telemetry.js';

describe('telemetry', () => {
  it('stores telemetry preferences', () => {
    setTelemetryEnabled(true);
    expect(isTelemetryEnabled()).toBe(true);
    setTelemetryEnabled(false);
    expect(isTelemetryEnabled()).toBe(false);
  });

  it('records events when enabled', () => {
    setTelemetryEnabled(true);
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    const result = trackTelemetryEvent('export', { status: 'ok' });

    expect(result).toBe(true);
    expect(window.__lazyDashboardsTelemetry).toHaveLength(1);
    expect(window.__lazyDashboardsTelemetry[0].eventName).toBe('export');

    infoSpy.mockRestore();
  });

  it('does not record events when disabled', () => {
    setTelemetryEnabled(false);
    const result = trackTelemetryEvent('export', { status: 'ok' });
    expect(result).toBe(false);
  });
});
