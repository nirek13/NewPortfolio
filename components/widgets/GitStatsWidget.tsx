'use client'

import { useState, useEffect } from 'react'

import { GlassCard } from '@/components/ui/glass-components'

export function GitStatsWidget() {
  const [stats, setStats] = useState({
    commits: 127,
    branches: 3,
    pullRequests: 15,
    issues: 2
  })

  const [animatedStats, setAnimatedStats] = useState({
    commits: 0,
    branches: 0,
    pullRequests: 0,
    issues: 0
  })

  useEffect(() => {
    const animateValue = (key: keyof typeof stats, start: number, end: number, duration: number) => {
      const startTime = Date.now()
      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(start + (end - start) * easeOutQuart)
        
        setAnimatedStats(prev => ({ ...prev, [key]: currentValue }))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }

    setTimeout(() => animateValue('commits', 0, stats.commits, 1000), 200)
    setTimeout(() => animateValue('branches', 0, stats.branches, 800), 400)
    setTimeout(() => animateValue('pullRequests', 0, stats.pullRequests, 900), 600)
    setTimeout(() => animateValue('issues', 0, stats.issues, 700), 800)
  }, [])

  return (
    <GlassCard className="p-4 h-full" intensity="subtle">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <span className="text-xs font-medium text-gray-800">Git Activity</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-lg font-mono font-medium text-green-700">
              {animatedStats.commits}
            </span>
          </div>
          <div className="text-xs text-gray-600">commits</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-lg font-mono font-medium text-blue-700">
              {animatedStats.branches}
            </span>
          </div>
          <div className="text-xs text-gray-600">branches</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span className="text-lg font-mono font-medium text-orange-700">
              {animatedStats.pullRequests}
            </span>
          </div>
          <div className="text-xs text-gray-600">PRs</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-lg font-mono font-medium text-red-700">
              {animatedStats.issues}
            </span>
          </div>
          <div className="text-xs text-gray-600">issues</div>
        </div>
      </div>
    </GlassCard>
  )
}