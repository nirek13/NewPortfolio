import type { Metadata } from 'next'
import { getBlogPost } from '@/lib/blog'

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) return { title: 'Post not found', robots: { index: false } }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date },
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
