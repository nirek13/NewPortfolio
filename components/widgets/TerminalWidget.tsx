'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/glass-components'

export function TerminalWidget() {
  const [currentText, setCurrentText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  
  const messages = [
    'i build things',
    'i ship features', 
    'i fix bugs',
    'i optimize code'
  ]
  
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let cursorInterval: NodeJS.Timeout

    const typeMessage = (message: string, index: number = 0) => {
      if (index <= message.length) {
        setCurrentText(message.slice(0, index))
        timeout = setTimeout(() => typeMessage(message, index + 1), 100)
      } else {
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % messages.length)
        }, 2000)
      }
    }

    typeMessage(messages[messageIndex])

    cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearTimeout(timeout)
      clearInterval(cursorInterval)
    }
  }, [messageIndex])

  return (
    <GlassCard className="p-4 h-full bg-gray-900/10" intensity="medium">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-medium text-gray-600">~/terminal</span>
      </div>
      
      <div className="font-mono text-sm space-y-1">
        <div className="text-green-400 text-xs">nireks@portfolio:~$</div>
        <div className="text-blue-300 min-h-[1.25rem] flex items-center">
          {currentText}
          <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
            |
          </span>
        </div>
      </div>
    </GlassCard>
  )
}