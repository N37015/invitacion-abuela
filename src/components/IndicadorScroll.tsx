'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

export default function IndicadorScroll({
  targetId = 'detalles-evento',
}: {
  targetId?: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const manejarScroll = () => {
      // Se oculta en cuanto el usuario baja más de 60px
      if (window.scrollY > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', manejarScroll, { passive: true });
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  const bajarSuave = () => {
    const destino = document.getElementById(targetId);
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={bajarSuave}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.35 }}
          aria-label="Desliza hacia abajo para ver la invitación"
          className="mt-6 inline-flex flex-col items-center gap-1 text-[#5C534B] hover:text-[#D61F69] transition-colors cursor-pointer group"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
            Desliza hacia abajo
          </span>

          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D61F69]/30 bg-white/80 text-[#D61F69] shadow-xs group-hover:bg-[#D61F69] group-hover:text-white transition-colors"
          >
            <ChevronsDown className="w-4 h-4" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}