import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { essays } from '@/lib/essays'
import { blogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/essays`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/essays/ranking-kanye-albums`, priority: 0.5 },
  ]

  const essayPages: MetadataRoute.Sitemap = essays.map((essay) => ({
    url: `${SITE_URL}/essays/${essay.id}`,
    lastModified: essay.updatedAt ?? essay.publishedAt,
    priority: 0.5,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    priority: 0.5,
  }))

  return [...pages, ...essayPages, ...blogPages]
}
