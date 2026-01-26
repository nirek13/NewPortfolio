'use client';

import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

type ColorPalette = 'default' | 'purple' | 'green' | 'orange' | 'blue' | 'pink';

interface PaletteOption {
  name: string;
  value: ColorPalette;
  colors: string[];
}

const paletteOptions: PaletteOption[] = [
  {
    name: 'Default',
    value: 'default',
    colors: ['bg-gray-500', 'bg-slate-400', 'bg-zinc-500']
  },
  {
    name: 'Purple',
    value: 'purple',
    colors: ['bg-purple-500', 'bg-violet-500', 'bg-indigo-500']
  },
  {
    name: 'Green',
    value: 'green',
    colors: ['bg-green-500', 'bg-emerald-500', 'bg-teal-500']
  },
  {
    name: 'Orange',
    value: 'orange',
    colors: ['bg-orange-500', 'bg-amber-500', 'bg-yellow-500']
  },
  {
    name: 'Blue',
    value: 'blue',
    colors: ['bg-blue-500', 'bg-sky-500', 'bg-cyan-500']
  },
  {
    name: 'Pink',
    value: 'pink',
    colors: ['bg-pink-500', 'bg-rose-500', 'bg-red-500']
  }
];

export function PaletteSwitcher() {
  const themeContext = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  // Defensive check for theme context
  if (!themeContext || !themeContext.palette || !themeContext.setPalette) {
    return (
      <button className="p-1.5 rounded opacity-50 cursor-not-allowed" disabled>
        <Palette size={14} className="text-gray-400" />
      </button>
    );
  }
  
  const { palette, setPalette } = themeContext;

  const handlePaletteChange = (newPalette: ColorPalette) => {
    setPalette(newPalette);
    setIsOpen(false);
  };

  const currentPalette = paletteOptions.find(p => p.value === palette);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          console.log('Palette button clicked');
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1.5 rounded transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        title="Change color palette"
      >
        <Palette size={14} className="text-gray-600 dark:text-gray-300" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-8 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 min-w-[200px]">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2 px-2">
              Color Palette
            </div>
            <div className="space-y-1">
              {paletteOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePaletteChange(option.value)}
                  className={`w-full flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    palette === option.value ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {option.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${color}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {option.name}
                    </span>
                  </div>
                  {palette === option.value && (
                    <Check size={14} className="text-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}