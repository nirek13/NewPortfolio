import type { Metadata } from 'next'
import { Caveat, Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/lib/theme-context'
import { SignatureLoader } from '@/components/site/signature-loader'
import { INTRO_ONCE_PER_SESSION, INTRO_SESSION_KEY } from '@/lib/signature-intro'

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
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
 * Inline <head> script, so it runs synchronously before the first paint
 * (next/script's inline `beforeInteractive` is queued behind the client
 * bootstrap in the app router, which is too late for this):
 *  1. applies the stored theme (only `dark` adds a class; anything else is light)
 *  2. flags the signature intro (every load, or once per tab session when
 *     INTRO_ONCE_PER_SESSION is on) unless the visitor prefers reduced motion,
 *     and stamps the first painted frame so the loader can enforce a minimum
 *     on-screen time
 */
const seenCheck = INTRO_ONCE_PER_SESSION ? `!sessionStorage.getItem('${INTRO_SESSION_KEY}')&&` : ''
const bootInit = `(function(){var h=document.documentElement;try{var t=localStorage.getItem('portfolio-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))h.classList.add('dark')}catch(e){}try{if(${seenCheck}!window.matchMedia('(prefers-reduced-motion: reduce)').matches){h.setAttribute('data-sig-loading','');var s0=performance.now();h.dataset.sigStart=String(s0);window.__sigIntro={start:s0};requestAnimationFrame(function(){var s1=performance.now();h.dataset.sigStart=String(s1);window.__sigIntro.start=s1;performance.mark('sig-intro:first-frame')})}}catch(e){}})()`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="boot-init" dangerouslySetInnerHTML={{ __html: bootInit }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} ${display.variable} ${hand.variable} font-sans antialiased`}>
        <SignatureLoader />
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
