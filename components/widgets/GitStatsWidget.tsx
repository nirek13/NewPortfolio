'use client'

import { GitHubCalendar } from 'react-github-calendar';
import { GlassCard } from '@/components/ui/glass-components';

export function GitCommitGraph() {
  const username = "nirek13";

  const purpleTheme = {
    light: ['#ffffff', '#e9e5ff', '#c7b8ff', '#8b6cff', '#5a2fd8'],
    dark: ['#161b22', '#332060', '#4f2fa5', '#7c5cff', '#b4a3ff']
  };

  return (
    <GlassCard className="p-6 overflow-hidden" intensity="subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
            <h3 className="text-sm font-semibold text-gray-800">Contribution Heatmap</h3>
          </div>
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
            Showing last 6 months
          </p>
        </div>
        
        <div className="text-right">
          {/* We'll let the library inject the total count here via the labels prop */}
          <a 
            href={`https://github.com/${username}`}
            target="_blank" 
            className="text-[10px] text-purple-600 hover:underline font-bold uppercase tracking-widest"
          >
            {username} ↗
          </a>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <GitHubCalendar 
          username={username}
          blockSize={12}
          blockMargin={4}
          theme={purpleTheme}
          fontSize={12}
          // 1. VISUAL: Only show the last ~180 days
          transformData={(data) => data.slice(-180)} 
          // 2. DATA: The label still calculates the total from the full year data
          labels={{
            // bold
            totalCount: '{{count}} commits in the last 6 months',
          }}
          showTotalCount={true}
        />
      </div>
      
      <div className="mt-4 flex justify-between items-center text-[11px] text-gray-500 border-t border-gray-100 pt-4">
        <span>Less activity</span>
        <div className="flex gap-1">
          {purpleTheme.light.map((color) => (
            <div key={color} className="w-3 h-3 rounded-sm border border-gray-50" style={{ backgroundColor: color }} />
          ))}
        </div>
        <span>More activity</span>
      </div>
    </GlassCard>
  );
}