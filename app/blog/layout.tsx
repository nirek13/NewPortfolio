import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Blog', template: '%s — Nirek Shetty' },
  description:
    'Writing from Nirek Shetty: notes from building Plyxl (YC W27), startups, product, engineering, and whatever else is on his mind.',
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/rss.xml' } },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
