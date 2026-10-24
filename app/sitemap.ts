import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { essays } from '@/lib/essays'
import { getBlogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts()
  const latestPost = posts[0]?.date

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: latestPost, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/plyxl`, lastModified: latestPost, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: latestPost, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/essays`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/essays/ranking-kanye-albums`, priority: 0.5 },
  ]

  const essayPages: MetadataRoute.Sitemap = essays.map((essay) => ({
    url: `${SITE_URL}/essays/${essay.id}`,
    lastModified: essay.updatedAt ?? essay.publishedAt,
    priority: 0.5,
  }))

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    priority: post.tags.includes('plyxl') ? 0.8 : 0.6,
  }))

  return [...pages, ...essayPages, ...blogPages]
}
