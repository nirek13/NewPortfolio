"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GlassCard } from './glass-components';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  onGround: boolean;
  color: string;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'glass' | 'solid';
}

interface Collectible {
  x: number;
  y: number;
  width: number;
  height: number;
  collected: boolean;
  type: 'valuation' | 'followers' | 'views' | 'coding';
  value: string;
  label: string;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export function PlatformerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const keysRef = useRef<{[key: string]: boolean}>({});
  
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);

  // Game state
  const playerRef = useRef<GameObject>({
    x: 50,
    y: 200,
    width: 20,
    height: 20,
    vx: 0,
    vy: 0,
    onGround: false,
    color: 'rgba(59, 130, 246, 0.8)'
  });

  const particlesRef = useRef<Particle[]>([]);

  // Game world
  const platforms: Platform[] = [
    { x: 0, y: 350, width: 800, height: 20, type: 'glass' }, // Ground
    { x: 150, y: 280, width: 100, height: 15, type: 'glass' },
    { x: 320, y: 220, width: 120, height: 15, type: 'glass' },
    { x: 500, y: 160, width: 100, height: 15, type: 'glass' },
    { x: 650, y: 250, width: 150, height: 15, type: 'glass' },
    { x: 200, y: 100, width: 80, height: 15, type: 'glass' },
  ];

  const collectiblesRef = useRef<Collectible[]>([
    { x: 180, y: 240, width: 15, height: 15, collected: false, type: 'valuation', value: '$7M+', label: 'Valuation', color: 'rgba(59, 130, 246, 0.8)' },
    { x: 360, y: 180, width: 15, height: 15, collected: false, type: 'followers', value: '2200+', label: 'LinkedIn', color: 'rgba(34, 197, 94, 0.8)' },
    { x: 530, y: 120, width: 15, height: 15, collected: false, type: 'views', value: '1M+', label: 'Views', color: 'rgba(147, 51, 234, 0.8)' },
    { x: 220, y: 60, width: 15, height: 15, collected: false, type: 'coding', value: '19+', label: 'Years', color: 'rgba(249, 115, 22, 0.8)' },
  ]);

  // Collision detection
  const checkCollision = (rect1: GameObject | Collectible, rect2: Platform | Collectible): boolean => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  // Create glass particle effect
  const createParticles = (x: number, y: number, color: string) => {
    for (let i = 0; i < 8; i++) {
      particlesRef.current.push({
        x: x + Math.random() * 20 - 10,
        y: y + Math.random() * 20 - 10,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 60,
        maxLife: 60,
        color: color,
        size: Math.random() * 3 + 2
      });
    }
  };

  // Game physics
  const updatePlayer = () => {
    const player = playerRef.current;
    const GRAVITY = 0.5;
    const JUMP_FORCE = -12;
    const MOVE_SPEED = 5;
    const FRICTION = 0.85;

    // Handle input
    if (keysRef.current['ArrowLeft'] || keysRef.current['a']) {
      player.vx = -MOVE_SPEED;
    } else if (keysRef.current['ArrowRight'] || keysRef.current['d']) {
      player.vx = MOVE_SPEED;
    } else {
      player.vx *= FRICTION;
    }

    if ((keysRef.current['ArrowUp'] || keysRef.current['w'] || keysRef.current[' ']) && player.onGround) {
      player.vy = JUMP_FORCE;
      player.onGround = false;
    }

    // Apply gravity
    player.vy += GRAVITY;

    // Update position
    player.x += player.vx;
    player.y += player.vy;

    // Reset ground state
    player.onGround = false;

    // Platform collisions
    platforms.forEach(platform => {
      if (checkCollision(player, platform)) {
        // Vertical collision (landing on platform)
        if (player.vy > 0 && player.y < platform.y) {
          player.y = platform.y - player.height;
          player.vy = 0;
          player.onGround = true;
        }
        // Horizontal collisions
        else if (player.vx > 0 && player.x < platform.x) {
          player.x = platform.x - player.width;
          player.vx = 0;
        } else if (player.vx < 0 && player.x > platform.x) {
          player.x = platform.x + platform.width;
          player.vx = 0;
        }
      }
    });

    // Collectible collisions
    collectiblesRef.current.forEach(collectible => {
      if (!collectible.collected && checkCollision(player, collectible)) {
        collectible.collected = true;
        setCollectedItems(prev => [...prev, collectible.type]);
        setScore(prev => prev + 100);
        createParticles(collectible.x + collectible.width / 2, collectible.y + collectible.height / 2, collectible.color);
      }
    });

    // Boundary constraints
    player.x = Math.max(0, Math.min(780, player.x));
    
    // Reset if falling off screen
    if (player.y > 400) {
      player.x = 50;
      player.y = 200;
      player.vx = 0;
      player.vy = 0;
    }
  };

  // Update particles
  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      return particle.life > 0;
    });
  };

  // Render game
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with frosted glass effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw platforms with glass effect
    platforms.forEach(platform => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
      
      // Glass shine effect
      const gradient = ctx.createLinearGradient(platform.x, platform.y, platform.x, platform.y + platform.height);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height / 2);
    });

    // Draw collectibles
    collectiblesRef.current.forEach(collectible => {
      if (!collectible.collected) {
        ctx.fillStyle = collectible.color;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        
        // Floating animation
        const float = Math.sin(Date.now() * 0.005 + collectible.x * 0.01) * 2;
        const y = collectible.y + float;
        
        ctx.fillRect(collectible.x, y, collectible.width, collectible.height);
        ctx.strokeRect(collectible.x, y, collectible.width, collectible.height);
        
        // Glow effect
        ctx.shadowColor = collectible.color;
        ctx.shadowBlur = 10;
        ctx.fillRect(collectible.x + 2, y + 2, collectible.width - 4, collectible.height - 4);
        ctx.shadowBlur = 0;
        
        // Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '10px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(collectible.value, collectible.x + collectible.width / 2, y - 5);
      }
    });

    // Draw particles
    particlesRef.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color.replace('0.8', (alpha * 0.8).toString());
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw player with glass effect
    const player = playerRef.current;
    ctx.fillStyle = player.color;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.strokeRect(player.x, player.y, player.width, player.height);
    
    // Player glow
    ctx.shadowColor = player.color;
    ctx.shadowBlur = 8;
    ctx.fillRect(player.x + 2, player.y + 2, player.width - 4, player.height - 4);
    ctx.shadowBlur = 0;
  };

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameStarted) return;
    
    updatePlayer();
    updateParticles();
    render();
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameStarted]);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === ' ') e.preventDefault();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Start/stop game loop
  useEffect(() => {
    if (gameStarted) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameLoop]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCollectedItems([]);
    
    // Reset collectibles
    collectiblesRef.current.forEach(c => c.collected = false);
    
    // Reset player position
    playerRef.current = {
      x: 50,
      y: 200,
      width: 20,
      height: 20,
      vx: 0,
      vy: 0,
      onGround: false,
      color: 'rgba(59, 130, 246, 0.8)'
    };
  };

  return (
    <GlassCard className="p-4" intensity="subtle">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-800">Interactive Portfolio Game</h3>
          <div className="text-xs text-gray-600">Score: {score}</div>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={370}
            className="w-full h-auto border border-white/20 rounded-lg backdrop-blur-sm bg-white/10"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          
          {!gameStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
              <div className="text-center text-white">
                <h4 className="text-lg font-semibold mb-2">Collect My Achievements!</h4>
                <p className="text-sm mb-4">Use WASD or arrow keys to move and jump</p>
                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Start Game
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {collectiblesRef.current.map((item, index) => (
            <div
              key={index}
              className={`p-2 rounded border transition-all ${
                collectedItems.includes(item.type)
                  ? 'bg-green-100 border-green-300 text-green-800'
                  : 'bg-white/20 border-white/30 text-gray-600'
              }`}
            >
              <div className="font-semibold">{item.value}</div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}