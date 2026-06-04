import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/lib/theme-context'

const SplashCursor = dynamic(
  () => import('@/components/ui/splash-cursor').then(m => ({ default: m.SplashCursor })),
  { ssr: false }
)


export const metadata: Metadata = {
  title: "Nirek's Portfolio",
  description: 'Built by Nirek Y.',
  icons: { icon: '/logo L.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=My+Soul&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: 'Charm, sans-serif', fontSize: '1.1rem' }}>
        <ThemeProvider>
          <SplashCursor />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
