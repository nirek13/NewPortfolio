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
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(168, 85, 247, 0.04), rgba(236, 72, 155, 0.06))',
    background: 'linear-gradient(135deg, rgba(236, 254, 255, 0.8), rgba(250, 245, 255, 0.6), rgba(253, 242, 248, 0.8))',
    glass: 'rgba(6, 182, 212, 0.06)',
    accent: 'text-cyan-600',
    border: 'rgba(6, 182, 212, 0.25)'
  },
  ocean: {
    name: 'Ocean',
    color: '#0066cc',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(6, 182, 212, 0.04), rgba(20, 184, 166, 0.06))',
    background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.8), rgba(236, 254, 255, 0.6), rgba(240, 253, 250, 0.8))',
    glass: 'rgba(59, 130, 246, 0.06)',
    accent: 'text-blue-600',
    border: 'rgba(59, 130, 246, 0.25)'
  },
  sunset: {
    name: 'Sunset',
    color: '#ff6b35',
    gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08), rgba(239, 68, 68, 0.04), rgba(234, 179, 8, 0.06))',
    background: 'linear-gradient(135deg, rgba(255, 247, 237, 0.8), rgba(254, 242, 242, 0.6), rgba(254, 252, 232, 0.8))',
    glass: 'rgba(249, 115, 22, 0.06)',
    accent: 'text-orange-600',
    border: 'rgba(249, 115, 22, 0.25)'
  },
  forest: {
    name: 'Forest',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(16, 185, 129, 0.04), rgba(20, 184, 166, 0.06))',
    background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.8), rgba(236, 253, 245, 0.6), rgba(240, 253, 250, 0.8))',
    glass: 'rgba(34, 197, 94, 0.06)',
    accent: 'text-green-600',
    border: 'rgba(34, 197, 94, 0.25)'
  },
  lavender: {
    name: 'Lavender',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(168, 85, 247, 0.04), rgba(99, 102, 241, 0.06))',
    background: 'linear-gradient(135deg, rgba(250, 245, 255, 0.8), rgba(243, 232, 255, 0.6), rgba(238, 242, 255, 0.8))',
    glass: 'rgba(139, 92, 246, 0.06)',
    accent: 'text-purple-600',
    border: 'rgba(139, 92, 246, 0.25)'
  },
  coral: {
    name: 'Coral',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.08), rgba(244, 63, 94, 0.04), rgba(239, 68, 68, 0.06))',
    background: 'linear-gradient(135deg, rgba(253, 242, 248, 0.8), rgba(255, 241, 242, 0.6), rgba(254, 242, 242, 0.8))',
    glass: 'rgba(244, 114, 182, 0.06)',
    accent: 'text-pink-600',
    border: 'rgba(244, 114, 182, 0.25)'
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
    
    console.log('ThemeContext: Updating DOM with tint:', glassTint);
    
    // Remove all previous tint classes
    tintOrder.forEach(tint => {
      root.classList.remove(`tint-${tint}`);
    });
    
    // Add current tint class
    root.classList.add(`tint-${glassTint}`);
    console.log('ThemeContext: Added class tint-' + glassTint + ' to root element');
    
    // Set CSS custom properties for the current tint
    const tintConfig = glassTints[glassTint];
    root.style.setProperty('--tint-color', tintConfig.color);
    root.style.setProperty('--tint-gradient', tintConfig.gradient);
    root.style.setProperty('--tint-bg', tintConfig.background);
    root.style.setProperty('--tint-glass', tintConfig.glass);
    root.style.setProperty('--tint-border', tintConfig.border);
    
    console.log('ThemeContext: Set CSS variables for tint:', glassTint, tintConfig);
    
    localStorage.setItem('glassTint', glassTint);
  }, [glassTint]);

  const cycleTheme = () => {
    const currentIndex = tintOrder.indexOf(glassTint);
    const nextIndex = (currentIndex + 1) % tintOrder.length;
    const nextTint = tintOrder[nextIndex];
    console.log('ThemeContext: Cycling from', glassTint, 'to', nextTint);
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