'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface TiempoRestante {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function Digito({ valor, etiqueta, colorBarra }: { valor: string; etiqueta: string; colorBarra: string }) {
  return (
    <div className="relative bg-white/85 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl pt-4 pb-3 px-1 shadow-sm text-center overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1" style={{ backgroundColor: colorBarra }} />
      <div className="relative h-10 sm:h-12 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={valor}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center font-serif text-3xl sm:text-4xl font-semibold text-[#8C6218] tabular-nums"
          >
            {valor}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6E6259] mt-1.5 block">
        {etiqueta}
      </span>
    </div>
  );
}

export default function CuentaRegresiva({ fechaISO }: { fechaISO: string }) {
  const [tiempo, setTiempo] = useState<TiempoRestante | null>(null);
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    const calcular = () => {
      const diferencia = new Date(fechaISO).getTime() - Date.now();
      if (diferencia <= 0) {
        setTerminado(true);
        setTiempo({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }
      setTerminado(false);
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

  if (terminado) {
    return (
      <p className="font-serif text-2xl text-[#D61F69] flotar">
        ¡Hoy es el gran día! 🎉
      </p>
    );
  }

  const fmt = (n?: number) => (typeof n === 'number' ? String(n).padStart(2, '0') : '--');

  const bloques = [
    { label: 'Días', valor: fmt(tiempo?.dias), color: '#D61F69' },
    { label: 'Horas', valor: fmt(tiempo?.horas), color: '#EA580C' },
    { label: 'Minutos', valor: fmt(tiempo?.minutos), color: '#EAB308' },
    { label: 'Segundos', valor: fmt(tiempo?.segundos), color: '#0284C7' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {bloques.map((b) => (
        <Digito key={b.label} valor={b.valor} etiqueta={b.label} colorBarra={b.color} />
      ))}
    </div>
  );
}
