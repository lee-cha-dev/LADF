# Themes

LADF includes 12 professionally designed themes, each available in both light and dark variants. Themes are applied by adding a root class to `document.documentElement`.

## Built-in Themes

Default themes:
- `ladf-theme-light` / `ladf-theme-dark` - clean, modern default theme with blue accents

Additional themes:
- `ladf-theme-nord-light` / `ladf-theme-nord-dark` - arctic-inspired with cool blues and muted colors
- `ladf-theme-dracula-light` / `ladf-theme-dracula-dark` - high-contrast purple and pink theme
- `ladf-theme-solarized-light` / `ladf-theme-solarized-dark` - precision colors with warm earth tones
- `ladf-theme-monokai-light` / `ladf-theme-monokai-dark` - vibrant, high contrast with cyan and pink accents
- `ladf-theme-gruvbox-light` / `ladf-theme-gruvbox-dark` - warm, retro palette with earthy browns and greens
- `ladf-theme-material-light` / `ladf-theme-material-dark` - Material Design color palette
- `ladf-theme-one-light` / `ladf-theme-one-dark` - Atom One color scheme
- `ladf-theme-tokyo-light` / `ladf-theme-tokyo-dark` - modern Japanese-inspired purple and blue tones
- `ladf-theme-catppuccin-light` / `ladf-theme-catppuccin-dark` - pastel colors with soft aesthetics
- `ladf-theme-horizon-light` / `ladf-theme-horizon-dark` - warm pink-tinted palette with cyan and magenta accents

## Applying Themes

```jsx
const THEMES = {
  light: 'ladf-theme-light',
  dark: 'ladf-theme-dark',
  nordLight: 'ladf-theme-nord-light',
  nordDark: 'ladf-theme-nord-dark',
  draculaDark: 'ladf-theme-dracula-dark',
  tokyoDark: 'ladf-theme-tokyo-dark',
};

const [currentTheme, setCurrentTheme] = useState('light');

useEffect(() => {
  const root = document.documentElement;
  Object.values(THEMES).forEach((theme) => root.classList.remove(theme));
  root.classList.add(THEMES[currentTheme]);
}, [currentTheme]);
```

## Theme Palette and CSS Variables

All LADF themes use a consistent set of CSS custom properties (variables) that components reference. This allows themes to be swapped without changing component code.

Surface colors:

```css
--ladf-surface-bg        /* Main background */
--ladf-surface-1         /* Primary surface (cards, panels) */
--ladf-surface-2         /* Secondary surface (nested elements) */
--ladf-surface-3         /* Tertiary surface */
--ladf-surface-well      /* Recessed areas */
--ladf-surface-overlay   /* Modals, popovers */
--ladf-surface-muted     /* Muted backgrounds */
```

Border colors:

```css
--ladf-border-subtle     /* Light borders */
--ladf-border-strong     /* Emphasized borders */
--ladf-border-divider    /* Section dividers */
--ladf-border-focus      /* Focus states */
```

Text colors:

```css
--ladf-text-primary      /* Main text */
--ladf-text-secondary    /* Secondary text */
--ladf-text-muted        /* De-emphasized text */
--ladf-text-inverse      /* Text on dark backgrounds */
```

Accent colors:

```css
--ladf-accent-primary         /* Primary brand color */
--ladf-accent-secondary       /* Secondary brand color */
--ladf-accent-success         /* Success states */
--ladf-accent-warning         /* Warning states */
--ladf-accent-danger          /* Error/danger states */
--ladf-accent-primary-soft    /* Transparent primary (backgrounds) */
--ladf-accent-secondary-soft  /* Transparent secondary (backgrounds) */
```

Shadows and gradients:

```css
--ladf-shadow-low             /* Subtle elevation */
--ladf-shadow-med             /* Medium elevation */
--ladf-shadow-high            /* High elevation */
--ladf-shadow-inset           /* Inset shadows */
--ladf-app-gradient           /* App background gradient */
--ladf-panel-gradient         /* Panel background gradient */
--ladf-panel-header-gradient  /* Panel header gradient */
```

Semantic aliases:

```css
--ladf-color-bg            /* Maps to surface-bg */
--ladf-color-surface       /* Maps to surface-2 */
--ladf-color-surface-alt   /* Maps to surface-1 */
--ladf-color-text          /* Maps to text-primary */
--ladf-color-muted         /* Maps to text-muted */
--ladf-color-border        /* Maps to border-subtle */
--ladf-color-accent        /* Maps to accent-primary */
--ladf-color-accent-weak   /* Maps to accent-primary-soft */
```

## Creating Custom Themes

Custom themes follow the naming convention `ladf-theme-{name}-{light|dark}`.

```css
:root.ladf-theme-custom-dark {
  /* Surface colors */
  --ladf-surface-bg: #1a1a2e;
  --ladf-surface-1: #16213e;
  --ladf-surface-2: #0f3460;
  --ladf-surface-3: #533483;
  --ladf-surface-well: #16213e;
  --ladf-surface-overlay: #0f3460;
  --ladf-surface-muted: #16213e;

  /* Border colors */
  --ladf-border-subtle: #0f3460;
  --ladf-border-strong: #533483;
  --ladf-border-divider: #0f3460;
  --ladf-border-focus: #e94560;

  /* Text colors */
  --ladf-text-primary: #eaeaea;
  --ladf-text-secondary: #d1d1d1;
  --ladf-text-muted: #a8a8a8;
  --ladf-text-inverse: #1a1a2e;

  /* Accent colors */
  --ladf-accent-primary: #e94560;
  --ladf-accent-secondary: #f39c12;
  --ladf-accent-success: #2ecc71;
  --ladf-accent-warning: #f39c12;
  --ladf-accent-danger: #e74c3c;
  --ladf-accent-primary-soft: rgba(233, 69, 96, 0.16);
  --ladf-accent-secondary-soft: rgba(243, 156, 18, 0.16);

  /* Shadows */
  --ladf-shadow-low: 0 1px 2px rgba(0, 0, 0, 0.5), 0 1px 1px rgba(0, 0, 0, 0.4);
  --ladf-shadow-med: 0 16px 32px rgba(0, 0, 0, 0.55), 0 6px 14px rgba(0, 0, 0, 0.4);
  --ladf-shadow-high: 0 24px 50px rgba(0, 0, 0, 0.6), 0 10px 24px rgba(0, 0, 0, 0.45);
  --ladf-shadow-inset: inset 0 1px 0 rgba(255, 255, 255, 0.04), inset 0 -1px 0 rgba(0, 0, 0, 0.4);

  /* Gradients */
  --ladf-app-gradient: radial-gradient(circle at top, rgba(233, 69, 96, 0.1), transparent 55%),
    linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  --ladf-panel-gradient: linear-gradient(180deg, #16213e 0%, #0f3460 100%);
  --ladf-panel-header-gradient: linear-gradient(180deg, #0f3460 0%, #16213e 100%);

  /* Chart grid */
  --ladf-chart-grid: rgba(168, 168, 168, 0.2);

  /* Semantic aliases (required) */
  --ladf-color-bg: var(--ladf-surface-bg);
  --ladf-color-surface: var(--ladf-surface-2);
  --ladf-color-surface-alt: var(--ladf-surface-1);
  --ladf-color-text: var(--ladf-text-primary);
  --ladf-color-muted: var(--ladf-text-muted);
  --ladf-color-border: var(--ladf-border-subtle);
  --ladf-color-accent: var(--ladf-accent-primary);
  --ladf-color-accent-weak: var(--ladf-accent-primary-soft);
}
```

Apply your custom theme:

```jsx
useEffect(() => {
  document.documentElement.classList.add('ladf-theme-custom-dark');
}, []);
```

Important: when creating custom themes, you must define all CSS variables listed above. The semantic aliases at the end are required for component compatibility.
