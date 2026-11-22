import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#18181B',
          borderRadius: '16px',
          border: '3px solid #EAB308',
          color: '#EAB308',
          fontSize: 32,
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
        }}
      >
        64
      </div>
    ),
    { ...size }
  );
}