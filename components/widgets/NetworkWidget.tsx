'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/glass-components'

export function NetworkWidget() {
  const [ping, setPing] = useState(0)
  const [status, setStatus] = useState<'online' | 'connecting' | 'slow'>('connecting')
  const [requests, setRequests] = useState(0)

  useEffect(() => {
    // Simulate ping animation
    const animatePing = () => {
      const targetPing = Math.floor(Math.random() * 50) + 15 // 15-65ms
      const startTime = Date.now()
      const startPing = ping
      const duration = 800
      
      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentPing = Math.floor(startPing + (targetPing - startPing) * easeOut)
        
        setPing(currentPing)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          // Determine status based on ping
          if (targetPing < 30) setStatus('online')
          else if (targetPing < 50) setStatus('connecting')
          else setStatus('slow')
        }
      }
      animate()
    }

    // Initial animation
    setTimeout(animatePing, 500)

    // Update ping periodically
    const pingInterval = setInterval(animatePing, 3000)

    // Simulate request counter
    const requestInterval = setInterval(() => {
      setRequests(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 2000)

    return () => {
      clearInterval(pingInterval)
      clearInterval(requestInterval)
    }
  }, [ping])

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'connecting': return 'bg-yellow-500'
      case 'slow': return 'bg-red-500'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Connected'
      case 'connecting': return 'Stable'
      case 'slow': return 'Slow'
    }
  }

  return (
    <GlassCard className="p-4 h-full" intensity="subtle">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}></div>
        <span className="text-xs font-medium text-gray-800">Network Status</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Latency</span>
          <span className="text-lg font-mono font-medium text-blue-700">{ping}ms</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Status</span>
          <span className="text-xs font-medium text-gray-800">{getStatusText()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Requests</span>
          <span className="text-sm font-mono font-medium text-purple-700">{requests}</span>
        </div>

        {/* Connection Visualization */}
        <div className="flex justify-center pt-1">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`w-1 rounded-full transition-all duration-300 ${
                  ping < 30 ? 'bg-green-500' : ping < 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{
                  height: `${Math.max(4, (5 - bar) * (ping < 30 ? 3 : ping < 50 ? 2 : 1))}px`,
                  opacity: ping < bar * 15 ? 0.3 : 1
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}