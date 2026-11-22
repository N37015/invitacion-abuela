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
          alignItems: 'center',
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
            height: '22px',
            background:
              'linear-gradient(90deg, #D61F69 0%, #EA580C 25%, #EAB308 50%, #15803D 75%, #0284C7 100%)',
          }}
        />

        {/* Zona segura cuadrada centrada para que WhatsApp nunca recorte el nombre */}
        <div
          style={{
            width: '580px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#EAB308',
              fontFamily: 'sans-serif',
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            INVITACIÓN ESPECIAL
          </div>

          <div
            style={{
              fontSize: 44,
              fontStyle: 'italic',
              color: '#F472B6',
              marginBottom: 10,
            }}
          >
            Mis 64 Años
          </div>

          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.08,
              color: '#FAF7F2',
            }}
          >
            Magdalena
          </div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 500,
              lineHeight: 1.15,
              color: '#E7E5E4',
              marginTop: 6,
            }}
          >
            Pacheco Roblero
          </div>

          {/* Puntos bordados */}
          <div style={{ display: 'flex', gap: '16px', margin: '28px 0' }}>
            <div style={{ width: 16, height: 16, borderRadius: 99, background: '#D61F69' }} />
            <div style={{ width: 16, height: 16, borderRadius: 99, background: '#EA580C' }} />
            <div style={{ width: 16, height: 16, borderRadius: 99, background: '#EAB308' }} />
            <div style={{ width: 16, height: 16, borderRadius: 99, background: '#15803D' }} />
            <div style={{ width: 16, height: 16, borderRadius: 99, background: '#0284C7' }} />
          </div>

          <div
            style={{
              fontSize: 26,
              fontFamily: 'sans-serif',
              fontWeight: 600,
              color: '#EAB308',
            }}
          >
            23 de Enero · 2027
          </div>
        </div>

        {/* Cenefa inferior Chiapaneca */}
        <div
          style={{
            width: '100%',
            height: '22px',
            background:
              'linear-gradient(90deg, #0284C7 0%, #15803D 25%, #EAB308 50%, #EA580C 75%, #D61F69 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}