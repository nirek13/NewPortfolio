'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowLeft, Search, BookOpen } from 'lucide-react';
import { GlassCard, LiquidFlowButton } from '@/components/ui/glass-components';
import { DynamicBackground } from '@/components/ui/dynamic-background';
import { getBlogPosts, BlogPost } from '@/lib/blog';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const allPosts = getBlogPosts();
  
  // Get all unique tags
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags)));
  
  // Filter posts based on search and tag
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
              <div className="text-xs text-gray-500 font-mono">blog</div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-gray-900">◆ Blog</h1>
              <p className="text-gray-600 text-xs mt-1">Thoughts on entrepreneurship, technology, and building the future</p>
            </div>
          </GlassCard>

          {/* Search and Filter */}
          <GlassCard className="p-3 mb-4" intensity="subtle">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedTag === null
                      ? 'bg-blue-500/20 text-blue-700 backdrop-blur-sm'
                      : 'text-gray-600 hover:bg-white/30'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                      selectedTag === tag
                        ? 'bg-blue-500/20 text-blue-700 backdrop-blur-sm'
                        : 'text-gray-600 hover:bg-white/30'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <>
              <div className="mb-3">
                <h2 className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
                  <BookOpen size={16} className="text-blue-600" />
                  Featured Posts
                </h2>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {featuredPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <GlassCard className="group cursor-pointer h-full transition-all duration-300 hover:scale-[1.02] p-0 overflow-hidden" intensity="subtle">
                      
                      {/* Cover Image */}
                      <div className="relative h-32 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm bg-blue-500/80 text-white">
                            Featured
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-0.5 bg-white/60 rounded text-xs font-medium text-gray-700 capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="px-2 py-0.5 bg-white/60 rounded text-xs font-medium text-gray-500">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar size={10} />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={10} />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Regular Posts */}
          {regularPosts.length > 0 && (
            <>
              {featuredPosts.length > 0 && (
                <div className="mb-3">
                  <h2 className="text-sm font-medium text-gray-800">All Posts</h2>
                </div>
              )}
              
              <div className="space-y-3">
                {regularPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <GlassCard className="group cursor-pointer transition-all duration-300 hover:scale-[1.01] p-4" intensity="subtle">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.map((tag) => (
                              <span 
                                key={tag}
                                className="px-2 py-0.5 bg-white/40 rounded text-xs font-medium text-gray-600 capitalize"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500 sm:flex-col sm:items-end">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <GlassCard className="p-8 text-center" intensity="subtle">
              <div className="text-gray-500">
                <BookOpen size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No posts found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag(null);
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-xs underline"
                >
                  Clear filters
                </button>
              </div>
            </GlassCard>
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

        </div>
      </div>
    </main>
  );
}