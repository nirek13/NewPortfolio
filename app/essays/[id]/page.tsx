'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye, Heart, ArrowLeft, BookOpen, Tag } from 'lucide-react';
import { GlassCard, GlassSection, LiquidFlowButton, FlowingBorder, GlassRipple } from '@/components/ui/glass-components';
import { DynamicBackground } from '@/components/ui/dynamic-background';
import { getEssayById, formatDate, type Essay } from '@/lib/essays';


// Markdown renderer component for essay content
function MarkdownRenderer({ content }: { content: string }) {
  // Simple markdown parsing for headings, paragraphs, and basic formatting
  const parseMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Handle headings
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-light mb-4 mt-8 text-gray-900">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-light mb-3 mt-6 text-gray-800">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-light mb-2 mt-4 text-gray-700">{line.slice(4)}</h3>;
        }
        
        // Handle empty lines
        if (line.trim() === '') {
          return <div key={index} className="mb-4"></div>;
        }
        
        // Handle paragraphs
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {line}
          </p>
        );
      });
  };
  
  return <div className="prose prose-lg max-w-none">{parseMarkdown(content)}</div>;
}

export default function EssayDetailPage({ params }: { params: { id: string } }) {
  const essay = getEssayById(params.id);

  if (!essay) {
    return (
      <main className="relative min-h-screen">
        <DynamicBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <GlassCard className="p-8 text-center">
            <h1 className="text-2xl font-light mb-4">Essay Not Found</h1>
            <Link href="/essays">
              <LiquidFlowButton variant="pastel-blue">
                Back to Essays
              </LiquidFlowButton>
            </Link>
          </GlassCard>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="pt-16 sm:pt-24" />

        {/* macOS-style window */}
        <div className="macos-window w-full">
          <div className="macos-titlebar">
            <div className="macos-traffic-light close"></div>
            <div className="macos-traffic-light minimize"></div>
            <div className="macos-traffic-light maximize"></div>
            <div className="flex-1 text-center">
              <span className="text-sm font-light text-gray-600">{essay.title} - Essay</span>
            </div>
          </div>

          <div className="p-8">
            {/* Back Button */}
            <div className="mb-8">
              <Link href="/essays">
                <LiquidFlowButton variant="pastel-purple" className="group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Essays
                </LiquidFlowButton>
              </Link>
            </div>

        {/* Hero Section */}
        <FlowingBorder colors={['#93c5fd', '#c4b5fd', '#f9a8d4', '#a7f3d0']} speed={12}>
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight">
                {essay.title}
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 font-light max-w-3xl mx-auto">
                {essay.description}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              <span className="px-4 py-2 bg-blue-200/50 text-blue-800 rounded-full text-sm font-medium">
                {essay.category}
              </span>
              <span className="flex items-center gap-1 px-4 py-2 bg-white/30 rounded-full text-sm">
                <Calendar size={14} />
                {formatDate(essay.publishedAt)}
              </span>
              <span className="flex items-center gap-1 px-4 py-2 bg-white/30 rounded-full text-sm">
                <Clock size={14} />
                {essay.readTime} min read
              </span>
              {essay.views && (
                <span className="flex items-center gap-1 px-4 py-2 bg-white/30 rounded-full text-sm">
                  <Eye size={14} />
                  {essay.views} views
                </span>
              )}
              {essay.likes && (
                <span className="flex items-center gap-1 px-4 py-2 bg-white/30 rounded-full text-sm">
                  <Heart size={14} />
                  {essay.likes} likes
                </span>
              )}
              {essay.featured && (
                <span className="px-4 py-2 bg-yellow-200/50 text-yellow-800 rounded-full text-sm font-medium">
                  ⭐ Featured
                </span>
              )}
            </div>
          </div>
        </FlowingBorder>

        <div className="my-12" />

        {/* Essay Image or Icon */}
        {essay.image && (
          <GlassRipple className="mb-12">
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative h-64 sm:h-96">
                <Image
                  src={essay.image}
                  alt={essay.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
            </GlassCard>
          </GlassRipple>
        )}

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Essay Content */}
            <GlassRipple>
              <GlassSection>
                <MarkdownRenderer content={essay.content} />
              </GlassSection>
            </GlassRipple>
            
            {/* Tags */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-light mb-4 flex items-center gap-2">
                <Tag size={20} />
                Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {essay.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-2 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-lg text-sm font-medium border border-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Essay Stats */}
            <FlowingBorder colors={['#fecaca', '#ddd6fe', '#a7f3d0']} speed={8}>
              <div className="space-y-4">
                <h3 className="text-lg font-light flex items-center gap-2">
                  <BookOpen size={16} />
                  Essay Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Published</span>
                    <span className="font-medium">{formatDate(essay.publishedAt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Read Time</span>
                    <span className="font-medium">{essay.readTime} minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Category</span>
                    <span className="font-medium capitalize">{essay.category}</span>
                  </div>
                  {essay.views && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Views</span>
                      <span className="font-medium">{essay.views}</span>
                    </div>
                  )}
                  {essay.likes && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Likes</span>
                      <span className="font-medium">{essay.likes}</span>
                    </div>
                  )}
                </div>
              </div>
            </FlowingBorder>
            
            {/* Share Essay */}
            <GlassCard className="p-6" intensity="normal">
              <h3 className="text-lg font-light mb-3">Share This Essay</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-2 rounded-lg hover:bg-white/50 transition-colors text-sm">
                  📜 Copy Link
                </button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-white/50 transition-colors text-sm">
                  📱 Share on Twitter
                </button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-white/50 transition-colors text-sm">
                  💼 Share on LinkedIn
                </button>
              </div>
            </GlassCard>
            
            {/* Edit Note for Admin */}
            <div className="text-xs text-gray-500 p-3 bg-white/20 rounded-lg">
              <p><strong>Admin Note:</strong> To edit this essay, modify the content in <code>/lib/essays.ts</code></p>
            </div>
          </div>
        </div>

            {/* Navigation */}
            <div className="flex justify-center pt-16 pb-8">
              <Link href="/essays">
                <LiquidFlowButton variant="pastel-blue" className="group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to All Essays
                </LiquidFlowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}