'use client';

import React, { useEffect, useRef, useState } from 'react';

export function LiquidGlassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
      setIsPointer(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`liquid-glass-cursor ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ pointerEvents: 'none' }}
      >
        {/* Main cursor body */}
        <div className="cursor-main">
          <div className="cursor-glow"></div>
        </div>
        
        {/* Liquid trails */}
        <div className="cursor-trail cursor-trail-1"></div>
        <div className="cursor-trail cursor-trail-2"></div>
        <div className="cursor-trail cursor-trail-3"></div>
      </div>
      
      <style jsx>{`
        .liquid-glass-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .cursor-main {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(240, 249, 255, 0.7) 50%,
            rgba(226, 242, 255, 0.5) 100%);
          backdrop-filter: blur(10px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 0 20px rgba(255, 255, 255, 0.3);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .cursor-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, 
            rgba(255, 255, 255, 0.3) 0%, 
            rgba(240, 249, 255, 0.1) 50%, 
            transparent 100%);
          border-radius: 50%;
          filter: blur(5px);
          opacity: 0.8;
        }
        
        .cursor-trail {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%,
            rgba(240, 249, 255, 0.2) 100%);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          opacity: 0.6;
          animation: liquidTrail 2s ease-in-out infinite;
        }
        
        .cursor-trail-1 {
          width: 6px;
          height: 6px;
          animation-delay: 0s;
        }
        
        .cursor-trail-2 {
          width: 4px;
          height: 4px;
          animation-delay: 0.3s;
        }
        
        .cursor-trail-3 {
          width: 3px;
          height: 3px;
          animation-delay: 0.6s;
        }
        
        .liquid-glass-cursor.pointer .cursor-main {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.8) 0%,
            rgba(147, 197, 253, 0.6) 100%);
          box-shadow: 
            0 4px 12px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 0 24px rgba(59, 130, 246, 0.4);
        }
        
        .liquid-glass-cursor.clicking .cursor-main {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, 
            rgba(236, 72, 153, 0.9) 0%,
            rgba(251, 146, 213, 0.7) 100%);
          box-shadow: 
            0 2px 6px rgba(236, 72, 153, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 0 16px rgba(236, 72, 153, 0.5);
        }
        
        @keyframes liquidTrail {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.2;
          }
        }
      `}</style>
    </>
  );
}