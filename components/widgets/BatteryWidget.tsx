'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/glass-components'

export function BatteryWidget() {
  const [batteryLevel, setBatteryLevel] = useState(87)
  const [isCharging, setIsCharging] = useState(false)
  const [animatedLevel, setAnimatedLevel] = useState(0)

  useEffect(() => {
    const animateLevel = () => {
      const startTime = Date.now()
      const duration = 1500
      
      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        const currentLevel = Math.floor(batteryLevel * easeOutCubic)
        
        setAnimatedLevel(currentLevel)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }

    setTimeout(animateLevel, 300)

    const interval = setInterval(() => {
      setIsCharging(prev => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [batteryLevel])

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'from-green-400 to-green-500'
    if (level > 20) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-red-500'
  }

  return (
    <GlassCard className="p-4 h-full" intensity="subtle">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-600"></div>
        <span className="text-xs font-medium text-gray-800">Energy Level</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Battery Icon */}
          <div className="relative">
            <div className="w-16 h-8 border-2 border-gray-400 rounded-md bg-white/50 relative overflow-hidden">
              {/* Battery Fill */}
              <div 
                className={`h-full bg-gradient-to-r ${getBatteryColor(animatedLevel)} transition-all duration-300 ease-out rounded-sm`}
                style={{ width: `${animatedLevel}%` }}
              />
              
              {/* Charging Animation */}
              {isCharging && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-3 border border-white rotate-12 transform">
                    <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-b-2 border-b-white"></div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Battery Terminal */}
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-3 bg-gray-400 rounded-r-sm"></div>
          </div>
          
          <div className="mt-2 space-y-1">
            <div className="text-lg font-mono font-medium text-gray-800">
              {animatedLevel}%
            </div>
            <div className="text-xs text-gray-600">
              {isCharging ? 'Charging' : 'Caffeinated'}
            </div>
          </div>
        </div>
        
        {/* Charging Indicator */}
        {isCharging && (
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-3 h-3 text-green-600 text-xs font-bold">+</div>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  )
}