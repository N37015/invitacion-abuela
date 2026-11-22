'use client';

import { useEffect, useState } from 'react';

interface TiempoRestante {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

export default function CuentaRegresiva({ fechaISO }: { fechaISO: string }) {
  const [tiempo, setTiempo] = useState<TiempoRestante | null>(null);

  useEffect(() => {
    const calcular = () => {
      const diferencia = new Date(fechaISO).getTime() - Date.now();
      if (diferencia <= 0) {
        setTiempo({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }
      setTiempo({
        dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diferencia / 1000 / 60) % 60),
        segundos: Math.floor((diferencia / 1000) % 60),
      });
    };

    calcular();
    const timer = setInterval(calcular, 1000);
    return () => clearInterval(timer);
  }, [fechaISO]);

  const bloques = [
    { label: 'Días', valor: tiempo?.dias ?? '--' },
    { label: 'Horas', valor: tiempo?.horas ?? '--' },
    { label: 'Minutos', valor: tiempo?.minutos ?? '--' },
    { label: 'Segundos', valor: tiempo?.segundos ?? '--' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto">
      {bloques.map((item) => (
        <div
          key={item.label}
          className="bg-white/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl py-3.5 px-2 shadow-sm text-center"
        >
          <span className="block font-serif text-3xl sm:text-4xl font-semibold text-[#8C6218] tabular-nums">
            {typeof item.valor === 'number'
              ? String(item.valor).padStart(2, '0')
              : item.valor}
          </span>
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#6E6259] mt-1 block">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}