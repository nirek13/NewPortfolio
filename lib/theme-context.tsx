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
    name: 'Aurora',
    color: '#00f5ff',
    gradient: 'from-cyan-500/20 via-purple-500/15 to-pink-500/20',
    background: 'from-cyan-50/80 via-purple-50/60 to-pink-50/80',
    glass: 'bg-gradient-to-br from-cyan-100/60 via-purple-100/40 to-pink-100/60 border-cyan-300/30',
    accent: 'text-cyan-600',
    border: 'border-cyan-300/40'
  },
  ocean: {
    name: 'Ocean',
    color: '#0066cc',
    gradient: 'from-blue-500/25 via-cyan-500/15 to-teal-500/20',
    background: 'from-blue-50/80 via-cyan-50/60 to-teal-50/80',
    glass: 'bg-gradient-to-br from-blue-100/60 via-cyan-100/40 to-teal-100/60 border-blue-300/30',
    accent: 'text-blue-600',
    border: 'border-blue-300/40'
  },
  sunset: {
    name: 'Sunset',
    color: '#ff6b35',
    gradient: 'from-orange-500/25 via-red-500/15 to-yellow-500/20',
    background: 'from-orange-50/80 via-red-50/60 to-yellow-50/80',
    glass: 'bg-gradient-to-br from-orange-100/60 via-red-100/40 to-yellow-100/60 border-orange-300/30',
    accent: 'text-orange-600',
    border: 'border-orange-300/40'
  },
  forest: {
    name: 'Forest',
    color: '#22c55e',
    gradient: 'from-green-500/25 via-emerald-500/15 to-teal-500/20',
    background: 'from-green-50/80 via-emerald-50/60 to-teal-50/80',
    glass: 'bg-gradient-to-br from-green-100/60 via-emerald-100/40 to-teal-100/60 border-green-300/30',
    accent: 'text-green-600',
    border: 'border-green-300/40'
  },
  lavender: {
    name: 'Lavender',
    color: '#8b5cf6',
    gradient: 'from-purple-500/25 via-violet-500/15 to-indigo-500/20',
    background: 'from-purple-50/80 via-violet-50/60 to-indigo-50/80',
    glass: 'bg-gradient-to-br from-purple-100/60 via-violet-100/40 to-indigo-100/60 border-purple-300/30',
    accent: 'text-purple-600',
    border: 'border-purple-300/40'
  },
  coral: {
    name: 'Coral',
    color: '#f472b6',
    gradient: 'from-pink-500/25 via-rose-500/15 to-red-500/20',
    background: 'from-pink-50/80 via-rose-50/60 to-red-50/80',
    glass: 'bg-gradient-to-br from-pink-100/60 via-rose-100/40 to-red-100/60 border-pink-300/30',
    accent: 'text-pink-600',
    border: 'border-pink-300/40'
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
    
    // Remove all previous tint classes
    tintOrder.forEach(tint => {
      root.classList.remove(`tint-${tint}`);
    });
    
    // Add current tint class
    root.classList.add(`tint-${glassTint}`);
    
    // Set CSS custom properties for the current tint
    const tintConfig = glassTints[glassTint];
    root.style.setProperty('--tint-color', tintConfig.color);
    root.style.setProperty('--tint-gradient', tintConfig.gradient);
    
    localStorage.setItem('glassTint', glassTint);
  }, [glassTint]);

  const cycleTheme = () => {
    const currentIndex = tintOrder.indexOf(glassTint);
    const nextIndex = (currentIndex + 1) % tintOrder.length;
    setGlassTint(tintOrder[nextIndex]);
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