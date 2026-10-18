import type { Metadata } from 'next'
import { Caveat, Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/lib/theme-context'
import { SignatureLoader } from '@/components/site/signature-loader'
import { INTRO_ONCE_PER_SESSION, INTRO_SESSION_KEY } from '@/lib/signature-intro'
import { PERSON_JSON_LD, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

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
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Founder of Plyxl (YC W27)`, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    firstName: 'Nirek',
    lastName: 'Shetty',
    locale: 'en_CA',
  },
  twitter: { card: 'summary_large_image', creator: '@nirekshetty', title: SITE_NAME, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
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
