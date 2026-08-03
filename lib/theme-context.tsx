'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'reading' | 'matcha';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleDark: () => {},
});

const THEME_CLASSES: ThemeMode[] = ['light', 'dark', 'reading', 'matcha'];

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  THEME_CLASSES.forEach((t) => root.classList.remove(t));
  if (theme !== 'light') root.classList.add(theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('light');

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme') as ThemeMode | null;
    const initial =
      stored && THEME_CLASSES.includes(stored)
        ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = (next: ThemeMode) => {
    setThemeState(next);
    localStorage.setItem('portfolio-theme', next);
    applyTheme(next);
  };

  const toggleDark = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
