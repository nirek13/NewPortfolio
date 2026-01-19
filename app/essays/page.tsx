'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye, Heart, ArrowLeft, BookOpen } from 'lucide-react';
import { GlassCard, LiquidFlowButton } from '@/components/ui/glass-components';
import { DynamicBackground } from '@/components/ui/dynamic-background';
import { MacOSHelloLoader } from '@/components/ui/loading-animation';
import { essays, categories, getEssaysByCategory, formatDate, type Essay } from '@/lib/essays';




export default function EssaysPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const filteredEssays = getEssaysByCategory(selectedCategory);

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsLoading(false);
    }, 2000); // Duration for the hello animation
  };

  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      
      <div className="relative z-[1] min-h-screen p-1.5 lg:p-2">
        <div className="max-w-5xl mx-auto">
          
          {/* Header with macOS dots */}
          <GlassCard className="p-3 mb-4" intensity="subtle">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono">essays</div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-gray-900">◆ Essays</h1>
              <p className="text-gray-600 text-xs mt-1">Coming Soon</p>
            </div>
          </GlassCard>

          {/* Filter Tabs */}
          <GlassCard className="p-2 mb-4" intensity="subtle">
            <div className="flex gap-1 overflow-x-auto">
              {categories.map((category) => {
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    disabled={isLoading}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap disabled:opacity-50 ${
                      selectedCategory === category.id
                        ? 'bg-blue-500/20 text-blue-700 backdrop-blur-sm'
                        : 'text-gray-600 hover:bg-white/30'
                    }`}
                  >
                    <span className="text-sm">{category.icon}</span>
                    {category.label}
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <MacOSHelloLoader 
                size="md"
                onComplete={() => setIsLoading(false)}
              />
            </div>
          )}

          {/* Essays Grid */}
          {!isLoading && (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredEssays.map((essay) => (
              <Link key={essay.id} href={`/essays/${essay.id}`}>
                <GlassCard className="group cursor-pointer h-full transition-all duration-300 hover:scale-[1.02] p-0 overflow-hidden" intensity="subtle">
                  
                  {/* Cover */}
                  <div className="relative h-32 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                    {essay.image ? (
                      <Image
                        src={essay.image}
                        alt={essay.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen size={48} className="text-gray-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm bg-blue-500/80 text-white">
                        {categories.find(c => c.id === essay.category)?.label || essay.category}
                      </span>
                    </div>
                    
                    {/* Featured Badge */}
                    {essay.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm bg-yellow-500/80 text-white">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {essay.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {essay.excerpt}
                      </p>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {essay.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 bg-white/60 rounded text-xs font-medium text-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                      {essay.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-white/60 rounded text-xs font-medium text-gray-500">
                          +{essay.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(essay.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {essay.readTime}min read
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {essay.views && (
                          <span className="flex items-center gap-1">
                            <Eye size={10} />
                            {essay.views}
                          </span>
                        )}
                        {essay.likes && (
                          <span className="flex items-center gap-1">
                            <Heart size={10} />
                            {essay.likes}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
              ))}
            </div>
          )}

          {/* Back Button */}
          <div className="flex justify-center mt-8">
            <Link href="/">
              <LiquidFlowButton variant="pastel-blue" className="text-xs">
                <ArrowLeft size={14} />
                Back to Home
              </LiquidFlowButton>
            </Link>
          </div>

          {/* Add Essay CTA for Admin */}
          <div className="text-center mt-4 text-xs text-gray-500">
            <p>Want to add a new essay? Edit the essays data in <code>/lib/essays.ts</code></p>
          </div>

        </div>
      </div>
    </main>
  );
}