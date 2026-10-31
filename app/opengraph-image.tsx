import { ImageResponse } from 'next/og'

export const alt = 'Nirek Shetty — Co-founder & CTO of Plyxl (YC W27)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '88px 96px',
          background: '#f8f7f4',
          color: '#181614',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, color: '#8a857e', letterSpacing: '0.02em' }}>
          nirekshetty.com
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 120, fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1 }}>
            Nirek Shetty
          </div>
          <div style={{ fontSize: 40, marginTop: 28, color: '#5c5852' }}>
            Co-founder &amp; CTO of Plyxl — the workspace that does the work.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="5" fill="#f26625" />
            <path d="M10 8.5 16 18.2 22 8.5M16 18.2V24" fill="none" stroke="#fff" strokeWidth="2.9" />
          </svg>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 600 }}>Y Combinator · W27</div>
        </div>
      </div>
    ),
    size,
  )
}
