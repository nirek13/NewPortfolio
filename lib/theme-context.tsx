'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type GlassTint = 'aurora' | 'ocean' | 'sunset' | 'forest' | 'lavender' | 'coral';

interface GlassTintConfig {
  name: string;
  color: string;
  gradient: string;
  background: string;
  glass: string;
  accent: string;
  border: string;
}

export const glassTints: Record<GlassTint, GlassTintConfig> = {
  aurora: {
    name: 'Verdigris',
    color: '#40a08a',
    gradient: 'linear-gradient(135deg, rgba(64, 160, 138, 0.08), rgba(132, 152, 158, 0.04), rgba(94, 200, 174, 0.06))',
    background: 'linear-gradient(135deg, rgba(238, 246, 243, 0.8), rgba(240, 244, 243, 0.6), rgba(236, 245, 242, 0.8))',
    glass: 'rgba(64, 160, 138, 0.07)',
    accent: 'text-teal-700',
    border: 'rgba(64, 160, 138, 0.28)'
  },
  ocean: {
    name: 'Steel',
    color: '#5e8091',
    gradient: 'linear-gradient(135deg, rgba(94, 128, 145, 0.09), rgba(132, 152, 158, 0.04), rgba(64, 160, 138, 0.05))',
    background: 'linear-gradient(135deg, rgba(238, 243, 245, 0.8), rgba(240, 244, 245, 0.6), rgba(237, 243, 244, 0.8))',
    glass: 'rgba(94, 128, 145, 0.07)',
    accent: 'text-slate-600',
    border: 'rgba(94, 128, 145, 0.28)'
  },
  sunset: {
    name: 'Rust',
    color: '#b05c3a',
    gradient: 'linear-gradient(135deg, rgba(176, 92, 58, 0.09), rgba(196, 126, 78, 0.05), rgba(163, 88, 55, 0.06))',
    background: 'linear-gradient(135deg, rgba(248, 242, 238, 0.8), rgba(247, 241, 236, 0.6), rgba(246, 240, 236, 0.8))',
    glass: 'rgba(176, 92, 58, 0.07)',
    accent: 'text-orange-700',
    border: 'rgba(176, 92, 58, 0.28)'
  },
  forest: {
    name: 'Patina',
    color: '#5f9e6e',
    gradient: 'linear-gradient(135deg, rgba(95, 158, 110, 0.09), rgba(64, 160, 138, 0.05), rgba(95, 158, 110, 0.05))',
    background: 'linear-gradient(135deg, rgba(239, 246, 240, 0.8), rgba(238, 245, 240, 0.6), rgba(237, 244, 239, 0.8))',
    glass: 'rgba(95, 158, 110, 0.07)',
    accent: 'text-green-700',
    border: 'rgba(95, 158, 110, 0.28)'
  },
  lavender: {
    name: 'Tarnish',
    color: '#877e94',
    gradient: 'linear-gradient(135deg, rgba(135, 126, 148, 0.09), rgba(132, 152, 158, 0.04), rgba(135, 126, 148, 0.05))',
    background: 'linear-gradient(135deg, rgba(242, 241, 245, 0.8), rgba(242, 242, 245, 0.6), rgba(241, 240, 244, 0.8))',
    glass: 'rgba(135, 126, 148, 0.07)',
    accent: 'text-slate-500',
    border: 'rgba(135, 126, 148, 0.28)'
  },
  coral: {
    name: 'Copper',
    color: '#c47e4e',
    gradient: 'linear-gradient(135deg, rgba(196, 126, 78, 0.09), rgba(224, 152, 100, 0.05), rgba(176, 92, 58, 0.05))',
    background: 'linear-gradient(135deg, rgba(249, 244, 239, 0.8), rgba(248, 243, 238, 0.6), rgba(247, 242, 237, 0.8))',
    glass: 'rgba(196, 126, 78, 0.07)',
    accent: 'text-amber-700',
    border: 'rgba(196, 126, 78, 0.28)'
  }
};

interface ThemeContextType {
  glassTint: GlassTint;
  setGlassTint: (tint: GlassTint) => void;
  cycleTheme: () => void;
  currentTintConfig: GlassTintConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const tintOrder: GlassTint[] = ['aurora', 'ocean', 'sunset', 'forest', 'lavender', 'coral'];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [glassTint, setGlassTint] = useState<GlassTint>('aurora');

  useEffect(() => {
    const savedTint = localStorage.getItem('glassTint') as GlassTint;
    if (savedTint && glassTints[savedTint]) {
      setGlassTint(savedTint);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    tintOrder.forEach(tint => root.classList.remove(`tint-${tint}`));
    root.classList.add(`tint-${glassTint}`);

    const tintConfig = glassTints[glassTint];
    root.style.setProperty('--tint-color', tintConfig.color);
    root.style.setProperty('--tint-gradient', tintConfig.gradient);
    root.style.setProperty('--tint-bg', tintConfig.background);
    root.style.setProperty('--tint-glass', tintConfig.glass);
    root.style.setProperty('--tint-border', tintConfig.border);
    
    localStorage.setItem('glassTint', glassTint);
  }, [glassTint]);

  const cycleTheme = () => {
    const currentIndex = tintOrder.indexOf(glassTint);
    const nextIndex = (currentIndex + 1) % tintOrder.length;
    const nextTint = tintOrder[nextIndex];
    setGlassTint(nextTint);
  };

  const currentTintConfig = glassTints[glassTint];

  return (
    <ThemeContext.Provider value={{ glassTint, setGlassTint, cycleTheme, currentTintConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}