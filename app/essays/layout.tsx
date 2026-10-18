import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Essays', template: '%s — Nirek Shetty' },
  description: 'Essays by Nirek Shetty on startups, AI, education, and building things young.',
  alternates: { canonical: '/essays' },
}

export default function EssaysLayout({ children }: { children: React.ReactNode }) {
  return children
}
