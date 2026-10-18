import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Blog', template: '%s — Nirek Shetty' },
  description: 'Notes and write-ups from Nirek Shetty on hackathons, products, and engineering.',
  alternates: { canonical: '/blog' },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
