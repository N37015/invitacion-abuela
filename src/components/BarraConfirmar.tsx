'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/** Botón fijo abajo en el celular. Aparece al bajar y se oculta al llegar al formulario. */
export default function BarraConfirmar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pasoHero = false;
    let enFormulario = false;

    const actualizar = () => setVisible(pasoHero && !enFormulario);

    const onScroll = () => {
      pasoHero = window.scrollY > 520;
      actualizar();
    };

    const destino = document.getElementById('confirmar');
    const observer = new IntersectionObserver(
      ([entry]) => {
        enFormulario = entry.isIntersecting;
        actualizar();
      },
      { threshold: 0.15 }
    );
    if (destino) observer.observe(destino);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed bottom-0 inset-x-0 z-50 px-4 pt-3 pb-seguro md:hidden bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent"
        >
          <a
            href="#confirmar"
            className="pulso-suave flex items-center justify-center gap-2 w-full rounded-2xl bg-[#D61F69] active:bg-[#BE185D] text-white font-semibold py-3.5 shadow-lg"
          >
            <Heart className="w-4 h-4 fill-white" />
            Confirmar asistencia
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
