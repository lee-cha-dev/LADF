export const THEME_SETTINGS_STORAGE_KEY = 'lazyDashboards.themeSettings';

export const THEME_FAMILIES = [
  { id: 'default', label: 'Default' },
  { id: 'nord', label: 'Nord' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'solarized', label: 'Solarized' },
  { id: 'monokai', label: 'Monokai' },
  { id: 'gruvbox', label: 'Gruvbox' },
  { id: 'material', label: 'Material' },
  { id: 'one', label: 'One' },
  { id: 'tokyo', label: 'Tokyo' },
  { id: 'catppuccin', label: 'Catppuccin' },
  { id: 'horizon', label: 'Horizon' },
];

export const THEME_CLASS_MAP = {
  default: {
    light: 'ladf-theme-light',
    dark: 'ladf-theme-dark',
  },
  nord: {
    light: 'ladf-theme-nord-light',
    dark: 'ladf-theme-nord-dark',
  },
  dracula: {
    light: 'ladf-theme-dracula-light',
    dark: 'ladf-theme-dracula-dark',
  },
  solarized: {
    light: 'ladf-theme-solarized-light',
    dark: 'ladf-theme-solarized-dark',
  },
  monokai: {
    light: 'ladf-theme-monokai-light',
    dark: 'ladf-theme-monokai-dark',
  },
  gruvbox: {
    light: 'ladf-theme-gruvbox-light',
    dark: 'ladf-theme-gruvbox-dark',
  },
  material: {
    light: 'ladf-theme-material-light',
    dark: 'ladf-theme-material-dark',
  },
  one: {
    light: 'ladf-theme-one-light',
    dark: 'ladf-theme-one-dark',
  },
  tokyo: {
    light: 'ladf-theme-tokyo-light',
    dark: 'ladf-theme-tokyo-dark',
  },
  catppuccin: {
    light: 'ladf-theme-catppuccin-light',
    dark: 'ladf-theme-catppuccin-dark',
  },
  horizon: {
    light: 'ladf-theme-horizon-light',
    dark: 'ladf-theme-horizon-dark',
  },
};

export const PALETTE_OPTIONS = [
  { id: 'analytics', label: 'Analytics' },
  { id: 'tableau10', label: 'Tableau 10' },
  { id: 'set2', label: 'Set 2' },
  { id: 'dark2', label: 'Dark 2' },
  { id: 'okabe-ito', label: 'Okabe-Ito' },
  { id: 'viridis', label: 'Viridis' },
  { id: 'rdylgn', label: 'RdYlGn' },
];

export const ALL_THEME_CLASSES = Object.values(THEME_CLASS_MAP).flatMap((modes) =>
  Object.values(modes)
);

export const ALL_PALETTE_CLASSES = PALETTE_OPTIONS.map(
  ({ id }) => `ladf-palette-${id}`
);

export const resolveThemeFamily = (value) =>
  THEME_CLASS_MAP[value] ? value : 'default';

export const resolveThemeMode = (value) =>
  value === 'light' || value === 'dark' || value === 'system' ? value : 'system';

export const resolveResolvedMode = (value) =>
  value === 'light' || value === 'dark' ? value : 'light';

export const resolvePaletteId = (value) =>
  PALETTE_OPTIONS.some((palette) => palette.id === value)
    ? value
    : 'analytics';

export const readStoredThemeSettings = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(THEME_SETTINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};
