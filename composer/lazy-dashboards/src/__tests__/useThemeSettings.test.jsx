import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import useThemeSettings from '../hooks/useThemeSettings.js';
import { THEME_SETTINGS_STORAGE_KEY } from '../theme/themeConfig.js';

const ThemeProbe = () => {
  const {
    themeFamily,
    themeMode,
    paletteId,
    resolvedMode,
    setThemeFamily,
    setThemeMode,
    setPaletteId,
  } = useThemeSettings();

  return (
    <div>
      <div data-testid="theme">{themeFamily}</div>
      <div data-testid="mode">{themeMode}</div>
      <div data-testid="resolved">{resolvedMode}</div>
      <div data-testid="palette">{paletteId}</div>
      <button type="button" onClick={() => setThemeFamily('nord')}>Set Family</button>
      <button type="button" onClick={() => setThemeMode('dark')}>Set Mode</button>
      <button type="button" onClick={() => setPaletteId('set2')}>Set Palette</button>
    </div>
  );
};

describe('useThemeSettings', () => {
  it('syncs theme settings to storage and document classes', () => {
    window.localStorage.setItem(
      THEME_SETTINGS_STORAGE_KEY,
      JSON.stringify({ themeFamily: 'default', themeMode: 'light', paletteId: 'analytics' })
    );

    const { getByText } = render(<ThemeProbe />);

    fireEvent.click(getByText('Set Family'));
    fireEvent.click(getByText('Set Mode'));
    fireEvent.click(getByText('Set Palette'));

    const root = document.documentElement;
    expect(root.classList.contains('ladf-theme-nord-dark')).toBe(true);
    expect(root.classList.contains('ladf-palette-set2')).toBe(true);

    const stored = JSON.parse(window.localStorage.getItem(THEME_SETTINGS_STORAGE_KEY));
    expect(stored).toMatchObject({
      themeFamily: 'nord',
      themeMode: 'dark',
      paletteId: 'set2',
    });
  });
});
