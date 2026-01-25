import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SplashCursor } from '@/components/ui/splash-cursor'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/lib/theme-context'

const charm = { className: 'font-charm' }

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
        <link href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Kapakana:wght@300..400&family=My+Soul&display=swap" rel="stylesheet" />
      </head>
      <body className={`${charm.className} antialiased text-base`} style={{ fontFamily: 'Charm, sans-serif', fontSize: '1.1rem' }}>
        <ThemeProvider>
          <SplashCursor />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
