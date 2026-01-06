'use client'

import { GitHubCalendar } from 'react-github-calendar';
import { GlassCard } from '@/components/ui/glass-components';

export function GitCommitGraph() {
  // Custom theme to match your purple brand
  const purpleTheme = {
    light: [
      '#ffffff',  // true white background
      '#e9e5ff',  // very light lavender
      '#c7b8ff',  // soft purple
      '#8b6cff',  // strong accent
      '#5a2fd8'   // deep but still vibrant
    ],
    dark: [
      '#ffffff',  // dark slate, not black
      '#332060',  // dark purple base
      '#4f2fa5',  // saturated mid purple
      '#7c5cff',  // bright accent
      '#b4a3ff'   // light highlight
    ]
  };

  return (
    <GlassCard className="p-6 overflow-hidden" intensity="subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
          <h3 className="text-sm font-semibold text-gray-800">Contribution Heatmap</h3>
        </div>
        <a 
          href="https://github.com/nirek13" 
          target="_blank" 
          className="text-[10px] text-purple-600 hover:underline font-medium uppercase tracking-wider"
        >
          View Profile ↗
        </a>
      </div>

      <div className="flex justify-center items-center">
        <GitHubCalendar 
          username="nirek13"
          blockSize={12}
          blockMargin={4}
          theme={purpleTheme}
          fontSize={12}
          // This ensures it looks good on mobile by only showing the last few months
          transformData={(data) => data.slice(-360)} 
        />
      </div>
      
      <div className="mt-4 flex justify-between items-center text-[11px] text-gray-500 border-t border-gray-100 pt-4">
        <span>Less</span>
        <div className="flex gap-1">
          {purpleTheme.light.map((color) => (
            <div key={color} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
        <span>More</span>
      </div>
    </GlassCard>
  );
}