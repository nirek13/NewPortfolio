'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/glass-components'

export function SystemStatsWidget() {
  const [stats, setStats] = useState({
    cpu: 42,
    memory: 68,
    processes: 247
  })

  const [animatedStats, setAnimatedStats] = useState({
    cpu: 0,
    memory: 0,
    processes: 0
  })

  useEffect(() => {
    const animateValue = (key: keyof typeof stats, targetValue: number, delay: number) => {
      setTimeout(() => {
        const startTime = Date.now()
        const duration = 1200
        
        const animate = () => {
          const now = Date.now()
          const progress = Math.min((now - startTime) / duration, 1)
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          const currentValue = Math.floor(targetValue * easeOutQuart)
          
          setAnimatedStats(prev => ({ ...prev, [key]: currentValue }))
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        animate()
      }, delay)
    }

    animateValue('cpu', stats.cpu, 100)
    animateValue('memory', stats.memory, 300)
    animateValue('processes', stats.processes, 500)

    // Simulate fluctuating CPU usage
    const cpuInterval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * 20) + 35 // 35-55%
      setStats(prev => ({ ...prev, cpu: newCpu }))
      setAnimatedStats(prev => ({ ...prev, cpu: newCpu }))
    }, 2000)

    return () => clearInterval(cpuInterval)
  }, [])

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'from-green-400 to-green-500'
    if (usage < 80) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-red-500'
  }

  return (
    <GlassCard className="p-4 h-full" intensity="subtle">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        <span className="text-xs font-medium text-gray-800">System Performance</span>
      </div>
      
      <div className="space-y-3">
        {/* CPU Usage */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">CPU</span>
            <span className="text-xs font-mono text-gray-800">{animatedStats.cpu}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getUsageColor(animatedStats.cpu)} transition-all duration-500 ease-out rounded-full`}
              style={{ width: `${animatedStats.cpu}%` }}
            />
          </div>
        </div>

        {/* Memory Usage */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Memory</span>
            <span className="text-xs font-mono text-gray-800">{animatedStats.memory}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getUsageColor(animatedStats.memory)} transition-all duration-500 ease-out rounded-full`}
              style={{ width: `${animatedStats.memory}%` }}
            />
          </div>
        </div>

        {/* Processes */}
        <div className="flex justify-between items-center pt-1">
          <span className="text-xs text-gray-600">Processes</span>
          <span className="text-sm font-mono font-medium text-purple-700">{animatedStats.processes}</span>
        </div>
      </div>
    </GlassCard>
  )
}