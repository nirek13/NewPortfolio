import { ImageResponse } from 'next/og'

export const alt = 'Plyxl (YC W27), founded by Nirek Shetty'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function PlyxlImage() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: '-0.04em' }}>plyxl</div>
          <div
            style={{
              display: 'flex',
              padding: '6px 16px',
              background: '#f26522',
              color: '#fff',
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            YC W27
          </div>
        </div>
        <div style={{ fontSize: 40, marginTop: 24, color: '#555' }}>The control plane for a business.</div>
        <div style={{ fontSize: 28, marginTop: 48, color: '#888' }}>Founded by Nirek Shetty · nirekshetty.com/plyxl</div>
      </div>
    ),
    size,
  )
}
