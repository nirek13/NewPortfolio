'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin, Briefcase, Camera, User, Sparkles } from "lucide-react";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { GlassCard, LiquidFlowButton, FlowingBorder, LiquidGlassPanel, FloatingGlassCard } from "@/components/ui/glass-components";
import { GitCommitGraph } from "@/components/widgets/GitStatsWidget";


function Logo({ src, alt, size = 18, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
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
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="relative -top-[1px] leading-none align-middle">{children}</span>
);

const FallbackLogo = ({ alt }: { alt: string }) => (
  <Logo src="/YClogo.png" alt={alt} />
);

export default function Home() {
  const { shouldBounce } = useNavigationBounce('home');

  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      
      <div className="relative z-[1] min-h-screen p-1.5 lg:p-2">
        {/* Compact Apple-like Glass Grid Layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-12 gap-2 min-h-screen">
          
          {/* Header Section - Full Width */}
          <div className="col-span-12">
            <GlassCard className="p-3" intensity="subtle">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono">nireks-portfolio</div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-xl lg:text-2xl font-light tracking-wide text-gray-900">◆ Nirek Shetty</h1>
                  <p className="text-gray-600 text-xs mt-0.5">Founder & Engineer</p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <a href="mailto:Nirek.Shetty.business@gmail.com" className="p-2 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-200">
                    <Mail size={16} />
                  </a>
                  <a href="https://github.com/Nirek116" target="_blank" rel="noreferrer" className="p-2 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200">
                    <Github size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/Nirek-Shetty/" target="_blank" rel="noreferrer" className="p-2 hover:bg-blue-700 hover:text-white rounded-lg transition-all duration-200">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Navigation Cards */}
          <div className="col-span-12 md:col-span-4">
  {/* Reduced padding from p-3 to p-2.5 for a tighter footprint */}
  <GlassCard className="p-2.5 h-full border-white/20 shadow-lg" intensity="subtle">
    <h3 className="text-[10px] font-bold mb-2.5 flex items-center gap-1.5 text-gray-400 uppercase tracking-widest">
      <User size={12} className="opacity-70" />
      Navigation
    </h3>
    
    <div className="space-y-1.5">
      {[
        { href: "/about", label: "About Me", icon: User, variant: "pastel-blue", bounce: 'about' },
        { href: "/projects", label: "Projects", icon: Briefcase, variant: "pastel-purple", bounce: '' },
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
              bg-white/10 backdrop-blur-sm
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
          {/* What Makes Me Different */}
          <div className="col-span-12 md:col-span-8">
            <GlassCard className="p-3 h-full" intensity="subtle">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="text-blue-600" size={16} />
                  <h2 className="text-sm font-medium text-gray-800">What makes me different</h2>
                </div>
                <div className="space-y-1.5 text-xs leading-relaxed text-gray-700">
                  <p>↳ The <span className="font-semibold text-blue-700">fastest</span> in <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge text-blue-700">UWaterloo</a></Label></span>'s <span className="font-semibold text-blue-700">entire history</span> to get flown out to San Francisco to raise venture.</p>
                  
                  <p className="ml-3">↳ Built Cursor for mortgage brokers, received offers at a <span className="font-semibold text-green-700">$7M</span> valuation, and turned them all down to build <span className="inline-flex items-center align-middle gap-1"><Logo src="/stealthlogo.jpg" alt="Stealth" className="rounded-full" /><Label>Clice</Label></span>.</p>
                  
                  <p>↳ Received full-time interest for: <span className="font-semibold text-green-700">$300K</span> founding engineer role and another at <span className="inline-flex items-center align-middle gap-1"><Logo src="/icon.jpg" alt="Icon" /><Label><a href="https://icon.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge text-blue-700">Icon</a></Label></span>.</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Currently Building */}
          <div className="col-span-12 md:col-span-6">
            <GlassCard className="p-3 h-full" intensity="subtle">
              <div className="space-y-2">
                <h3 className="text-xs font-medium flex items-center gap-1.5 text-gray-800">
                  <span className="text-green-600">🚀</span>
                  Currently Building
                </h3>
                <div className="space-y-1.5 text-xs leading-relaxed text-gray-700">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Logo src="/stealthlogo.jpg" alt="Stealth" className="rounded-full" />
                      <span className="font-medium text-gray-800">Clice</span>
                    </div>
                    <p className="text-xs">Revolutionary startup in stealth mode.</p>
                  </div>
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-orange-600">📊</span>
                      <span className="font-medium text-orange-700">RateMyInternship</span>
                    </div>
                    <p className="text-xs">RateMyProfessors but for tech internships (Coming soon).</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Experience */}
          <div className="col-span-12 md:col-span-6">
            <GlassCard className="p-3 h-full" intensity="subtle">
              <div className="space-y-2">
                <h3 className="text-xs font-medium flex items-center gap-1.5 text-gray-800">
                  <Briefcase size={14} className="text-purple-600" />
                  Experience Highlights
                </h3>
                <div className="space-y-1.5 text-xs leading-relaxed text-gray-700">
                  <p>↳ Programming since <span className="font-semibold text-purple-700">age 5</span>, entrepreneur since <span className="font-semibold text-purple-700">age 11</span>.</p>
                  
                  <p>↳ Lead Software engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/waterloo-logo.png" alt="UWaterloo" /><Label><a href="https://uwaterloo.ca/" target="_blank" rel="noreferrer" className="hover-underline-nudge text-blue-700">UWaterloo</a></Label></span>'s AI organization.</p>
                  
                  <p>↳ Growth at <span className="inline-flex items-center align-middle gap-1"><Logo src="/symbal_logo.jpeg" alt="Symbal" /><Label><a href="https://www.symbal.ai/" target="_blank" rel="noreferrer" className="hover-underline-nudge text-blue-700">Symbal</a></Label></span>, backed by Peter Thiel.</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* GitHub Stats Widget */}
          <div className="col-span-12 md:col-span-6">
            <GitCommitGraph />
          </div>

          {/* Dog Photo */}
          <div className="col-span-12 md:col-span-6">
            <GlassCard className="p-4 h-full group hover:shadow-xl transition-all duration-500" intensity="subtle">
              <div className="space-y-3">
                <h3 className="text-xs font-medium flex items-center gap-2 text-gray-800">
                  <span className="text-green-600 text-sm">🐕</span>
                  <span className="tracking-wide">Life Moments</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-green-200 to-transparent"></div>
                </h3>
                <div className="relative">
                  {/* Decorative frame border */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-xl blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-white/20 to-white/5 rounded-xl backdrop-blur-sm overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/30 group-hover:border-white/50 transition-all duration-500">
                    {/* Inner frame shadow */}
                    <div className="absolute inset-2 rounded-lg shadow-inner bg-gradient-to-br from-black/5 to-transparent"></div>
                    <Image
                      src="/dog-with-collar.jpg"
                      alt="Dog with glowing collar"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Enhanced Call to Action */}
          <div className="col-span-12 mt-4">
            <GlassCard className="p-6 text-center group hover:shadow-2xl transition-all duration-500" intensity="intense">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-pink-100/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="relative text-lg font-light text-gray-800 tracking-wide">Let's Connect & Create</h3>
                </div>
                <div className="max-w-md mx-auto">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-3"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Reach out if you're a fellow founder, engineer, or someone curious about what I'm building.
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <a href="mailto:Nirek.Shetty.business@gmail.com">
                    <LiquidFlowButton variant="pastel-blue" className="text-sm py-2.5 px-4 hover:scale-105 transition-transform duration-300">
                      <Mail size={14} className="mr-2" />
                      Get in Touch
                    </LiquidFlowButton>
                  </a>
                  <Link href="/projects">
                    <LiquidFlowButton variant="pastel-purple" className="text-sm py-2.5 px-4 hover:scale-105 transition-transform duration-300">
                      <Briefcase size={14} className="mr-2" />
                      View Projects
                    </LiquidFlowButton>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </main>
  );
}
