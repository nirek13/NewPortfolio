import type { Metadata } from 'next'
import Script from 'next/script'
import { Caveat, Fraunces, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/lib/theme-context'
import { SignatureLoader } from '@/components/site/signature-loader'

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const hand = Caveat({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-hand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nirek Shetty',
  description: 'Former product engineer at Penseum. Founder of Hackathons Canada.',
  icons: { icon: '/logo_L.png' },
}

/**
 * Runs before first paint:
 *  1. applies the stored theme (only `dark` adds a class; anything else is light)
 *  2. flags the signature intro for first visits in this tab, unless the
 *     visitor prefers reduced motion
 */
const bootInit = `(function(){var h=document.documentElement;try{var t=localStorage.getItem('portfolio-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))h.classList.add('dark')}catch(e){}try{if(!sessionStorage.getItem('sig-intro-seen')&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){h.setAttribute('data-sig-loading','');h.dataset.sigStart=String(performance.now())}}catch(e){}})()`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} ${hand.variable} font-sans antialiased`}>
        <Script id="boot-init" strategy="beforeInteractive">
          {bootInit}
        </Script>
        <SignatureLoader />
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
