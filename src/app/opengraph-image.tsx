import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mis 64 Años · Magdalena Pacheco Roblero';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#18181B',
          color: '#FAF7F2',
          justifyContent: 'space-between',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Cenefa superior Chiapaneca */}
        <div
          style={{
            width: '100%',
            height: '18px',
            background:
              'linear-gradient(90deg, #D61F69 0%, #EA580C 25%, #EAB308 50%, #15803D 75%, #0284C7 100%)',
          }}
        />

        {/* Contenido central */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#EAB308',
              fontFamily: 'sans-serif',
              marginBottom: 16,
            }}
          >
            Celebración Especial · Chiapas
          </div>

          <div
            style={{
              fontSize: 38,
              fontStyle: 'italic',
              color: '#F472B6',
              marginBottom: 8,
            }}
          >
            Mis 64 Años
          </div>

          <div
            style={{
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FAF7F2',
            }}
          >
            Magdalena Pacheco Roblero
          </div>

          {/* Puntos bordados */}
          <div style={{ display: 'flex', gap: '14px', margin: '28px 0' }}>
            <div style={{ width: 14, height: 14, borderRadius: 99, background: '#D61F69' }} />
            <div style={{ width: 14, height: 14, borderRadius: 99, background: '#EA580C' }} />
            <div style={{ width: 14, height: 14, borderRadius: 99, background: '#EAB308' }} />
            <div style={{ width: 14, height: 14, borderRadius: 99, background: '#15803D' }} />
            <div style={{ width: 14, height: 14, borderRadius: 99, background: '#0284C7' }} />
          </div>

          <div
            style={{
              fontSize: 26,
              fontFamily: 'sans-serif',
              color: '#E7E5E4',
            }}
          >
            Sábado 23 de Enero de 2027 · 4:00 PM · Salón Jardín Guadalupe
          </div>
        </div>

        {/* Cenefa inferior Chiapaneca */}
        <div
          style={{
            width: '100%',
            height: '18px',
            background:
              'linear-gradient(90deg, #0284C7 0%, #15803D 25%, #EAB308 50%, #EA580C 75%, #D61F69 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}