import { ImageResponse } from 'next/og'

export const alt = 'Nirek Shetty — founder of Plyxl (YC W27)'
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
          justifyContent: 'center',
          padding: '0 96px',
          background: '#fafaf9',
          color: '#111',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: '-0.03em' }}>Nirek Shetty</div>
        <div style={{ fontSize: 40, marginTop: 24, color: '#555' }}>Founder of Plyxl (YC W27).</div>
        <div style={{ fontSize: 28, marginTop: 48, color: '#888' }}>nirekshetty.com</div>
      </div>
    ),
    size,
  )
}
