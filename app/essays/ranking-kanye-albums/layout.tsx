import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ranking Kanye Albums',
  description: "Nirek Shetty ranks every Kanye West album.",
  alternates: { canonical: '/essays/ranking-kanye-albums' },
}

export default function KanyeLayout({ children }: { children: React.ReactNode }) {
  return children
}
