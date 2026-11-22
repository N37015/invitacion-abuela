/**
 * Pétalos de colores que caen lentamente de fondo.
 * Posiciones fijas (no aleatorias) para evitar errores de hidratación.
 * Es solo CSS, así que casi no gasta batería en el celular.
 */
const COLORES = ['#D61F69', '#EA580C', '#EAB308', '#15803D', '#0284C7'];

const PETALOS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3 + 3) % 96}%`,
  size: 8 + ((i * 5) % 9),
  dur: 14 + ((i * 3) % 10),
  delay: -((i * 2.7) % 16),
  deriva: (i % 2 === 0 ? 1 : -1) * (30 + ((i * 11) % 50)),
  color: COLORES[i % COLORES.length],
}));

export default function Petalos() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {PETALOS.map((p, i) => (
        <span
          key={i}
          className="petalo"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: 0.7,
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
              '--deriva': `${p.deriva}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
