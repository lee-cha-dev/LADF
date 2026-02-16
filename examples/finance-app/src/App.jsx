/**
 * @module App
 * @description Application shell that manages theme toggling, routing, and
 * error boundaries for the LADF example dashboard.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ErrorBoundary } from 'ladf';
import routes from './routes.jsx';
import "./app.css";

// Switch to "fecc-theme-light" and "fecc-theme-dark"
// for an example of a custom style
const THEME_CLASS = {
  light: 'ladf-theme-dracula-light',
  dark: 'ladf-theme-dracula-dark',
};

function App() {
  const [theme, setTheme] = useState('dark');
  const routing = useRoutes(routes);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(THEME_CLASS.light, THEME_CLASS.dark);
    root.classList.add(THEME_CLASS[theme]);
  }, [theme]);

  const toggleLabel = useMemo(
    () => (theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'),
    [theme]
  );

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleResetApp = () => {
    window.location.reload();
  };

  return (
    <div className="ladf-app app">
      <header className="ladf-app__header">
        <div className="ladf-app__branding">
          <span className="ladf-app__title">LADF</span>
          <span className="ladf-app__subtitle">
            Lazy Analytics Dashboard Framework
          </span>
        </div>
        <button className="ladf-button" type="button" onClick={handleToggleTheme}>
          {toggleLabel}
        </button>
      </header>
      <main className="ladf-app__content">
        <ErrorBoundary
          title="Dashboard failed to load"
          message="The dashboard encountered an unexpected error. Reload the page to retry."
          onReset={handleResetApp}
        >
          {routing}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
