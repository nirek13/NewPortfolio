'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin, Briefcase, Camera, User, Sparkles } from "lucide-react";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { GlassCard, LiquidFlowButton, FlowingBorder, LiquidGlassPanel, FloatingGlassCard } from "@/components/ui/glass-components";

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
            <GlassCard className="p-3 h-full" intensity="subtle">
              <h3 className="text-xs font-medium mb-2 flex items-center gap-1.5 text-gray-800">
                <User size={16} className="text-blue-600" />
                Navigation
              </h3>
              <div className="space-y-1.5">
                <Link href="/about" className="block">
                  <LiquidFlowButton 
                    variant="pastel-blue" 
                    className={`w-full justify-start py-1.5 px-2.5 text-xs ${shouldBounce('about') ? 'nav-bounce' : ''}`}
                  >
                    <User size={14} />
                    About Me
                  </LiquidFlowButton>
                </Link>

                <Link href="/projects" className="block">
                  <LiquidFlowButton 
                    variant="pastel-purple" 
                    className="w-full justify-start py-1.5 px-2.5 text-xs"
                  >
                    <Briefcase size={14} />
                    Projects
                  </LiquidFlowButton>
                </Link>

                <Link href="/photography" className="block">
                  <LiquidFlowButton 
                    variant="pastel-pink" 
                    className={`w-full justify-start py-1.5 px-2.5 text-xs ${shouldBounce('photography') ? 'nav-bounce-delayed' : ''}`}
                  >
                    <Camera size={14} />
                    Photography
                  </LiquidFlowButton>
                </Link>
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

          {/* Stats Cards - Compact */}
          <div className="col-span-6 md:col-span-3">
            <GlassCard className="p-2 h-full text-center" intensity="subtle">
              <div className="space-y-0.5">
                <div className="text-base font-light text-blue-700">$7M+</div>
                <div className="text-xs text-gray-600">Valuation Offers</div>
              </div>
            </GlassCard>
          </div>

          <div className="col-span-6 md:col-span-3">
            <GlassCard className="p-2 h-full text-center" intensity="subtle">
              <div className="space-y-0.5">
                <div className="text-base font-light text-green-700">2200+</div>
                <div className="text-xs text-gray-600">LinkedIn Followers</div>
              </div>
            </GlassCard>
          </div>

          <div className="col-span-6 md:col-span-3">
            <GlassCard className="p-2 h-full text-center" intensity="subtle">
              <div className="space-y-0.5">
                <div className="text-base font-light text-purple-700">1M+</div>
                <div className="text-xs text-gray-600">Post Views</div>
              </div>
            </GlassCard>
          </div>

          <div className="col-span-6 md:col-span-3">
            <GlassCard className="p-2 h-full text-center" intensity="subtle">
              <div className="space-y-0.5">
                <div className="text-base font-light text-orange-700">19+</div>
                <div className="text-xs text-gray-600">Years Coding</div>
              </div>
            </GlassCard>
          </div>

          {/* Mentorship Network */}
          <div className="col-span-12">
            <GlassCard className="p-3" intensity="subtle">
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-gray-800">Mentorship & Network</h3>
                <div className="text-xs leading-relaxed text-gray-700">
                  <p>↳ Mentored by founders from <span className="inline-flex items-center align-middle gap-1"><Logo src="/YClogo.png" alt="YC" /><Label><a href="https://www.ycombinator.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge text-blue-700">Y Combinator</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/speedrun.jpg" alt="speedrun" /><Label><a href="https://speedrun.a16z.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge text-blue-700">speedrun</a></Label></span>, <span className="inline-flex items-center align-middle gap-1"><Logo src="/zfellows.jpg" alt="Z Fellows" /><Label><a href="https://www.zfellows.com/" target="_blank" rel="noreferrer" className="hover-underline-nudge text-blue-700">Z Fellows</a></Label></span> and <span className="inline-flex items-center align-middle gap-1"><Logo src="/thielfellow.png" alt="Thiel Fellows" /><Label><a href="https://thielfellowship.org/" target="_blank" rel="noreferrer" className="hover-underline-nudge text-blue-700">Thiel Fellowship</a></Label></span>.</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Call to Action */}
          <div className="col-span-12">
            <GlassCard className="p-3 text-center" intensity="intense">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">Let's Connect</h3>
                <p className="text-xs text-gray-700 max-w-2xl mx-auto">
                  Reach out if you're a fellow founder, engineer, or someone curious about what I'm building.
                </p>
                <div className="flex justify-center gap-2">
                  <LiquidFlowButton variant="pastel-blue" className="text-xs py-1.5 px-3">
                    <Mail size={12} />
                    Get in Touch
                  </LiquidFlowButton>
                  <Link href="/projects">
                    <LiquidFlowButton variant="pastel-purple" className="text-xs py-1.5 px-3">
                      <Briefcase size={12} />
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
