import type { Metadata } from 'next'
import { getEssayById } from '@/lib/essays'

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const essay = getEssayById(params.id)
  if (!essay) return { title: 'Essay not found', robots: { index: false } }

  return {
    title: essay.title,
    description: essay.description,
    alternates: { canonical: `/essays/${essay.id}` },
    openGraph: { type: 'article', title: essay.title, description: essay.description, publishedTime: essay.publishedAt },
  }
}

export default function EssayLayout({ children }: { children: React.ReactNode }) {
  return children
}
