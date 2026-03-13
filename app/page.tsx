'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin, Briefcase, Camera, User, Sparkles, Settings } from "lucide-react";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { GlassCard, LiquidFlowButton, FlowingBorder, LiquidGlassPanel, FloatingGlassCard } from "@/components/ui/glass-components";
import { GitCommitGraph } from "@/components/widgets/GitStatsWidget";
import { ThemeIndicator } from "@/components/ui/theme-toggle";
import { useState, useEffect, memo } from "react";


const Logo = memo(function Logo({ src, alt, size = 18, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span className="inline-flex items-center align-middle relative -top-[1px]">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        quality={100}
        priority={false}
        className={`h-[18px] w-[18px] object-contain align-middle ${className}`}
      />
    </span>
  );
});

const Label = memo(function Label({ children }: { children: React.ReactNode }) {
  return <span className="relative -top-[1px] leading-none align-middle">{children}</span>;
});

const FallbackLogo = memo(function FallbackLogo({ alt }: { alt: string }) {
  return <Logo src="/YClogo.png" alt={alt} />;
});

const CurrentTimeDisplay = memo(function CurrentTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 font-medium">
        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
        --:--
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 font-medium">
      <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
      {currentTime.toLocaleTimeString('en-US', { 
        timeZone: 'America/Toronto',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>
  );
});

const FuturisticClock = memo(function FuturisticClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second for smooth animation
    return () => clearInterval(timer);
  }, []);

  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours() % 12;

  // Calculate rotation angles
  const secondAngle = (seconds * 6) - 90; // 360/60 = 6 degrees per second
  const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90; // Include seconds for smooth movement
  const hourAngle = (hours * 30) + (minutes * 0.5) - 90; // 360/12 = 30 degrees per hour

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Static clock placeholder */}
        <div className="relative w-20 h-20 rounded-full glass-tinted">
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gradient-to-br from-orange-400 to-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30"></div>
        </div>
        {/* Digital time placeholder */}
        <div className="glass-tinted px-3 py-1.5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
          <div className="text-[10px] font-mono text-cyan-300 dark:text-cyan-400 tracking-wide">
            --:--:--
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Clock Section */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-400/10 to-pink-400/20 dark:from-cyan-300/30 dark:via-purple-300/20 dark:to-pink-300/30 animate-pulse blur-sm"></div>
        
        {/* Main clock container */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white/40 via-white/20 to-white/10 dark:from-black/60 dark:via-black/40 dark:to-black/20 backdrop-blur-xl border border-white/30 dark:border-cyan-400/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(100,200,255,0.3),0_12px_48px_rgba(0,0,0,0.8)] clock-glow">
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-3 bg-gradient-to-b from-gray-600 to-gray-400 dark:from-cyan-300 dark:to-cyan-500 origin-bottom"
            style={{
              top: '6px',
              left: '50%',
              transformOrigin: '50% 34px',
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              opacity: i % 3 === 0 ? 1 : 0.6,
              height: i % 3 === 0 ? '8px' : '6px',
              boxShadow: i % 3 === 0 ? '0 0 4px rgba(6,182,212,0.6)' : 'none'
            }}
          />
        ))}

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gradient-to-br from-orange-400 to-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30 shadow-[0_0_8px_rgba(251,146,60,0.8)]"></div>

        {/* Hour hand */}
        <div
          className="absolute w-0.5 bg-gradient-to-t from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 rounded-full origin-bottom z-20 transition-transform duration-1000 ease-out shadow-[0_0_4px_rgba(0,0,0,0.5)]"
          style={{
            height: '20px',
            top: '20px',
            left: '50%',
            transformOrigin: '50% 20px',
            transform: `translateX(-50%) rotate(${hourAngle}deg)`
          }}
        />

        {/* Minute hand */}
        <div
          className="absolute w-0.5 bg-gradient-to-t from-blue-600 to-cyan-400 dark:from-cyan-400 dark:to-cyan-200 rounded-full origin-bottom z-20 transition-transform duration-500 ease-out shadow-[0_0_6px_rgba(6,182,212,0.6)]"
          style={{
            height: '28px',
            top: '12px',
            left: '50%',
            transformOrigin: '50% 28px',
            transform: `translateX(-50%) rotate(${minuteAngle}deg)`
          }}
        />

        {/* Second hand */}
        <div
          className="absolute w-0.5 bg-gradient-to-t from-red-500 to-orange-400 rounded-full origin-bottom z-30 transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          style={{
            height: '32px',
            top: '8px',
            left: '50%',
            transformOrigin: '50% 32px',
            transform: `translateX(-50%) rotate(${secondAngle}deg)`
          }}
        />

        {/* Floating particles */}
        <div className="absolute -top-1 -left-1 w-1 h-1 bg-cyan-400 rounded-full clock-particle opacity-70"></div>
        <div className="absolute -top-1 -right-1 w-1 h-1 bg-purple-400 rounded-full clock-particle opacity-70" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-pink-400 rounded-full clock-particle opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-yellow-400 rounded-full clock-particle opacity-70" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>

      {/* Digital time display */}
      <div className="glass-tinted px-3 py-1.5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
        <div className="text-[10px] font-mono text-cyan-300 dark:text-cyan-400 tracking-wide">
          {currentTime.toLocaleTimeString('en-US', { 
            timeZone: 'America/Toronto',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
});

const Navigation = memo(function Navigation() {
  const { shouldBounce } = useNavigationBounce('home');
  return (
    <div className="col-span-12 md:col-span-4">
      <GlassCard className="p-2.5 h-full" intensity="subtle">
        <h3 className="text-[10px] font-bold mb-2.5 flex items-center gap-1.5 text-gray-400 dark:text-gray-200 uppercase tracking-widest">
          <User size={12} className="opacity-70" />
          Navigation
        </h3>
        
        <div className="space-y-1.5">
          {[
            { href: "/about", label: "About Me", icon: User, variant: "pastel-blue", bounce: 'about' },
            { href: "/essays", label: "Essays", icon: Briefcase, variant: "pastel-purple", bounce: '' },
            { href: "/photography", label: "Photography", icon: Camera, variant: "pastel-pink", bounce: 'photography' }
          ].map((item) => (
            <Link href={item.href} key={item.label} className="block group">
              <LiquidFlowButton 
                variant={item.variant as "pastel-blue" | "pastel-purple" | "pastel-pink" | "pastel-green"} 
                className={`
                  w-full justify-start py-1.5 px-3 text-[11px] font-semibold transition-all duration-300 ease-out
        relative overflow-visible
        /* 1. Base State: Flat-ish with a slight rim light */
        border-t border-white/50 border-l border-white/30
        glass-tinted
        shadow-[2px_2px_5px_rgba(0,0,0,0.05)]
        
        /* 2. Popping Effect on Hover */
        hover:-translate-y-1 hover:translate-x-0.5
        hover:shadow-[8px_12px_20px_rgba(0,0,0,0.15),-2px_-2px_10px_rgba(255,255,255,0.8)]
        hover:border-white/80
        
        /* 3. Click compression */
        active:translate-y-0.5 active:translate-x-0 active:shadow-inner
        ${item.bounce && shouldBounce(item.bounce) ? 'nav-bounce' : ''}
      `}
                >
                  <item.icon size={13} className="mr-2 group-hover:scale-110 group-hover:rotate-3 transition-transform" />
                  {item.label}
                </LiquidFlowButton>
              </Link>
            ))}
          </div>
        </GlassCard>
    </div>
  );
});

const TLDR = memo(function TLDR() {
  return (
    <div className="col-span-12 md:col-span-8">
      <GlassCard className="p-3 h-full" intensity="subtle">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="text-blue-600 dark:text-cyan-400" size={16} />
            <h2 className="text-sm font-medium text-gray-800 dark:text-white">TL;DR</h2>
          </div>
          <div className="space-y-1.5 text-xs leading-relaxed text-gray-700 dark:text-gray-100">
            <p>↳ <span className="font-semibold text-blue-700 dark:text-cyan-300">16</span> years old, working at a startup with <span className="font-semibold text-green-700 dark:text-green-300">1 million users</span> called <span className="inline-flex items-center align-middle gap-1"><Logo src="/penseum-logo.avif" alt="Penseum" className="rounded-full" /><Label>Penseum</Label></span>.</p>
            
            <p>↳ Founded a non-profit <span className="font-semibold text-purple-700 dark:text-purple-300">Hackathons Canada</span> which has partnered with <span className="font-semibold text-blue-700 dark:text-cyan-300">Google</span> and <span className="font-semibold text-blue-700 dark:text-cyan-300">Microsoft</span> with <span className="font-semibold text-green-700 dark:text-green-300">25 million views</span> across social media and <span className="font-semibold text-green-700 dark:text-green-300">5,000 members</span> in its online community.</p>
          </div>
          </div>
        </GlassCard>
    </div>
  );
});

const CurrentlyBuilding = memo(function CurrentlyBuilding() {
  return (
    <div className="col-span-12 md:col-span-6">
      <GlassCard className="p-3 h-full" intensity="subtle">
        <div className="space-y-2">
          <h3 className="text-xs font-medium flex items-center gap-1.5 text-gray-800 dark:text-white">
            <span className="text-green-600 dark:text-green-300">•</span>
            Currently Building
          </h3>
          <div className="space-y-1.5 text-xs leading-relaxed text-gray-700 dark:text-gray-100">
            <div className="p-2 glass-tinted rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Logo src="/penseum-logo.avif" alt="Penseum" className="rounded-full" />
                <span className="font-medium text-gray-800 dark:text-white">Penseum</span>
              </div>
              <p className="text-xs">Educational platform helping 1M+ users learn.</p>
            </div>
            <div className="p-2 glass-tinted rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-purple-600 dark:text-purple-300">💼</span>
                <span className="font-medium text-purple-700 dark:text-purple-300">Contractual</span>
              </div>
              <p className="text-xs">AI-powered contract management platform.</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
});

const Experience = memo(function Experience() {
  return (
    <div className="col-span-12 md:col-span-6">
      <GlassCard className="p-3 h-full" intensity="subtle">
        <div className="space-y-2">
          <h3 className="text-xs font-medium flex items-center gap-1.5 text-gray-800 dark:text-white">
            <Briefcase size={14} className="text-purple-600 dark:text-purple-300" />
            Experience Highlights
          </h3>
          <div className="space-y-1.5 text-xs leading-relaxed text-gray-700 dark:text-gray-100">
            
            <p>↳ Product engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/penseum-logo.avif" alt="Penseum" className="rounded-full" /><Label>Penseum</Label></span>, helping <span className="font-semibold text-green-700 dark:text-green-300">1M+ users learn</span>.</p>
            
            <p>↳ Founder and Vice President at <span className="font-semibold text-purple-700 dark:text-purple-300">Hackathons Canada</span>.</p>
            
            <p>↳ Founder at <span className="font-semibold text-purple-700 dark:text-purple-300">Contractual</span>.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
});

const GitStats = memo(function GitStats() {
  return (
    <div className="col-span-12 md:col-span-6 flex flex-col">
      {/* GitHub Stats Widget */}
      <div className="mb-3">
        <GitCommitGraph />
      </div>
      
      {/* Side-by-Side Connect & Time Display */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {/* Connect Section */}
        <div className="relative">
          <GlassCard className="p-4 h-full" intensity="subtle">
            <div className="text-center mb-3">
              <h3 className="text-xs font-medium text-gray-900 dark:text-white" style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 500,
                letterSpacing: '-0.01em'
              }}>
                Connect
              </h3>
            </div>
            
            {/* 2x2 Grid of Connect Buttons */}
            <div className="grid grid-cols-2 gap-2 max-w-[96px] mx-auto">
              <a 
                href="https://github.com/nirek13" 
                target="_blank" 
                rel="noreferrer" 
                className="group relative flex items-center justify-center w-10 h-10 rounded-xl glass-tinted transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github size={14} className="text-gray-800 dark:text-gray-200 transition-transform duration-200 group-hover:scale-105" />
              </a>
              
              <a 
                href="https://www.linkedin.com/in/nirekshetty/" 
                target="_blank" 
                rel="noreferrer" 
                className="group relative flex items-center justify-center w-10 h-10 rounded-xl glass-tinted transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Linkedin size={14} className="text-[#0077b5] dark:text-blue-400 transition-transform duration-200 group-hover:scale-105" />
              </a>
              
              <a 
                href="mailto:shettynirek@gmail.com" 
                className="group relative flex items-center justify-center w-10 h-10 rounded-xl glass-tinted transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail size={14} className="text-[#ea4335] dark:text-red-400 transition-transform duration-200 group-hover:scale-105" />
              </a>
              
              <a 
                href="mailto:nirek@penseum.com" 
                className="group relative flex items-center justify-center w-10 h-10 rounded-xl glass-tinted transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Briefcase size={14} className="text-[#16a34a] dark:text-green-400 transition-transform duration-200 group-hover:scale-105" />
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Futuristic Clock Display */}
        <div className="relative">
          <GlassCard className="p-3 h-full" intensity="subtle">
            <div className="flex flex-col items-center justify-center min-h-[120px]">
              {/* Futuristic Analog Clock */}
              <FuturisticClock />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
});

const TurtleSection = memo(function TurtleSection() {
  return (
    <div className="col-span-12 md:col-span-6 h-[500px] flex flex-col gap-3">
      {/* 1. MINIMALIST QUOTE BOX (TOP) */}
      <div className="flex-[0.4] glass-tinted rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
            "This is a rat race. <br />
            <span className="text-gray-300 dark:text-gray-600 group-hover:text-orange-500 transition-colors duration-500">But I'm no rat."</span>
          </h2>
          <p className="mt-2 text-sm font-medium text-gray-400 dark:text-gray-500 italic">
            I'm a f***ing turtle, <span className="text-gray-900 dark:text-white not-italic font-bold uppercase">ninja turtle.</span>
          </p>
        </div>
      </div>

      {/* 2. APPLICATIONS DIV (BOTTOM) */}
      <div className="flex-[0.6] glass-tinted rounded-[2rem] p-8 flex flex-col relative group overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[12px] font-bold tracking-[0.2em] text-gray-400 uppercase">Applications</h3>
          <div className="px-2 py-1 glass-tinted rounded-md border border-orange-400/20">
            <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400 uppercase">2 Open Slots</span>
          </div>
        </div>

        {/* Main Application Card: Hackathons Canada */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              {/* Using your Turtle Mascot as a branding element */}
              <div className="w-12 h-12 rounded-2xl glass-tinted flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                 <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="w-full h-1.5 bg-black" /> {/* Mini Mask Icon */}
                 </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Hackathons Canada</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Join the core team to help build the future of Canadian student innovation.
                </p>
              </div>
            </div>
          </div>

    {/* Updated Interactive CTA */}
    <a 
      href="mailto:shettynirek@gmail.com?subject=hackathons%20canada%20application"
      className="block w-full mt-6"
    >
      <button className="w-full py-4 px-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black dark:bg-gradient-to-br dark:from-white dark:via-gray-100 dark:to-gray-200 text-white dark:text-gray-900 rounded-2xl font-bold text-sm transition-all duration-300 ease-out
                   /* 3D Base State */
                   shadow-[0_8px_20px_rgba(0,0,0,0.25),0_3px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]
                   border border-gray-700/50 dark:border-gray-300/50
                   
                   /* 3D Hover Effects */
                   hover:shadow-[0_12px_32px_rgba(249,115,22,0.4),0_6px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]
                   hover:bg-gradient-to-br hover:from-orange-600 hover:via-orange-500 hover:to-orange-400
                   hover:dark:bg-gradient-to-br hover:dark:from-orange-500 hover:dark:via-orange-400 hover:dark:to-orange-300
                   hover:text-white hover:dark:text-white
                   hover:-translate-y-1 hover:scale-[1.02]
                   hover:border-orange-400/60
                   
                   /* 3D Active/Press State */
                   active:translate-y-0 active:scale-[0.98] active:shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(0,0,0,0.1)]">
        Apply for Core Team
      </button>
    </a>
        </div>

        {/* Subtle Background Detail */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full group-hover:bg-orange-500/10 transition-colors duration-700" />
      </div>
    </div>
  );
});

const MusicPlayer = memo(function MusicPlayer() {
  return (
    <div className="col-span-12 mt-4">
      <GlassCard className="p-4 group overflow-hidden" intensity="subtle">
        <div className="flex items-center gap-4">
            {/* Album Art with glass effects */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/40 via-purple-400/30 to-pink-400/40 dark:from-cyan-300/60 dark:via-purple-300/50 dark:to-pink-300/60 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-xl overflow-hidden glass-tinted shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.8)]">
                <Image
                  src="/college-dropout-cover.jpg"
                  alt="The College Dropout Album Art"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Glass overlay on album art */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 dark:from-cyan-400/20 dark:via-transparent dark:to-purple-400/10 opacity-40"></div>
                {/* Corner glass accents */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-white/60 to-transparent dark:from-cyan-300/80 dark:to-transparent rounded-full"></div>
              </div>
            </div>
            
            {/* Track Info & Controls */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Family Business</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-200 truncate">Kanye West • The College Dropout</p>
                </div>
                
                {/* Glass audio visualizer */}
                <div className="flex items-end gap-1 ml-4 h-6">
                  <div className="w-1 bg-gradient-to-t from-cyan-500/80 to-cyan-300/60 rounded-full animate-[wave1_1s_ease-in-out_infinite] h-3 shadow-[0_0_4px_rgba(6,182,212,0.5)]"></div>
                  <div className="w-1 bg-gradient-to-t from-purple-500/80 to-purple-300/60 rounded-full animate-[wave2_1.2s_ease-in-out_infinite] h-4 shadow-[0_0_4px_rgba(168,85,247,0.5)]"></div>
                  <div className="w-1 bg-gradient-to-t from-pink-500/80 to-pink-300/60 rounded-full animate-[wave3_0.8s_ease-in-out_infinite] h-2 shadow-[0_0_4px_rgba(236,72,153,0.5)]"></div>
                  <div className="w-1 bg-gradient-to-t from-cyan-500/80 to-cyan-300/60 rounded-full animate-[wave4_1.1s_ease-in-out_infinite] h-5 shadow-[0_0_4px_rgba(168,85,247,0.5)]"></div>
                  <div className="w-1 bg-gradient-to-t from-purple-500/80 to-purple-300/60 rounded-full animate-[wave5_0.9s_ease-in-out_infinite] h-3 shadow-[0_0_4px_rgba(168,85,247,0.5)]"></div>
                </div>
              </div>
              
              {/* Glass Audio Player */}
              <div className="mt-3">
                <audio 
                  controls 
                  className="w-full h-8 glass-audio-player"
                  preload="metadata"
                >
                  <source src="/family-business.m4a" type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            
            {/* Glass status indicator */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.6)]"></div>
                <div className="absolute inset-0.5 bg-white/30 rounded-full"></div>
              </div>
            </div>
        </div>
      </GlassCard>
    </div>
  );
});

const Header = memo(function Header() {
  return (
    <div className="col-span-12">
      <GlassCard className="p-3 h-full" intensity="subtle">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeIndicator />
            <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">nireks-portfolio</div>
            <CurrentTimeDisplay />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-light tracking-wide text-gray-900 dark:text-white">◆ Nirek Shetty</h1>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">Founder & Engineer</p>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <a href="mailto:shettynirek@gmail.com" className="p-2 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300">
              <Mail size={16} />
            </a>
            <a href="https://github.com/nirek13" target="_blank" rel="noreferrer" className="p-2 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-600 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300">
              <Github size={16} />
            </a>
            <a href="https://www.linkedin.com/in/nirekshetty/" target="_blank" rel="noreferrer" className="p-2 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-600 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </GlassCard>
    </div>
  );
});

const Footer = memo(function Footer() {
  return (
    <footer className="col-span-12 mt-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 via-white/20 to-transparent dark:from-black/80 dark:via-black/40 backdrop-blur-xl rounded-2xl border border-gray-200/30 dark:border-cyan-400/20"></div>
      
      <div className="relative z-10 px-5 py-6 text-center">
        {/* Signature */}
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl tracking-wider font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
            <div className="flex justify-center items-center gap-1">
              <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                color: 'transparent', 
                WebkitTextStroke: '1.5px rgba(255,120,150,0.6)',
                background: 'linear-gradient(135deg, rgba(255,180,200,0.2), rgba(255,120,150,0.1))',
                WebkitBackgroundClip: 'text',
                filter: 'drop-shadow(0 0 15px rgba(255,120,150,0.3))',
                textShadow: '0 0 25px rgba(255,255,255,0.4)'
              }}>N</span>
              {/* ... more letters ... */}
            </div>
          </h1>
        </div>
        
        {/* Apple-style footer content */}
        <div className="border-t border-gray-300/20 dark:border-cyan-400/30 pt-3">
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 text-xs text-gray-600 dark:text-gray-100 font-light">
            <p className="flex items-center gap-1">
              <span>Made with</span>
              <span className="text-red-500 text-xs animate-pulse">♥</span>
              <span>in Toronto</span>
            </p>
            <span className="hidden md:block text-gray-400 dark:text-gray-200">•</span>
            <p className="flex items-center gap-1">
              <span>Built with</span>
              <span className="font-medium text-blue-600 dark:text-cyan-300">Next.js</span>
            </p>
            <span className="hidden md:block text-gray-400 dark:text-gray-200">•</span>
            <p className="text-gray-500 dark:text-gray-200">© 2024 Nirek Shetty</p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default function Home() {
  const { shouldBounce } = useNavigationBounce('home');
  const [cursorEnabled, setCursorEnabled] = useState(true);

  // Toggle cursor effect in the DOM
  // useEffect(() => {
  //   const splashCursor = document.getElementById('fluid');
  //   if (splashCursor) {
  //     splashCursor.style.display = cursorEnabled ? 'block' : 'none';
  //   }
  // }, [cursorEnabled]);

  return (
    <main className="relative min-h-screen bg-textured-3d">
      {/* <DynamicBackground /> */}
      
      <div className="relative z-[10] min-h-screen p-1.5 lg:p-2 pb-20">
        {/* Compact Apple-like Glass Grid Layout */}
        <div className="max-w-5xl lg:max-w-none lg:w-[90%] mx-auto grid grid-cols-12 gap-2 min-h-screen">
          
          <Header />
          <Navigation />
          <TLDR />
          <CurrentlyBuilding />
          <Experience />
          <GitStats />
          <TurtleSection />
          <MusicPlayer />
          <Footer />

        </div>
      </div>
    </main>
  );
}
