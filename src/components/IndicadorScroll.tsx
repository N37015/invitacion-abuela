'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

export default function IndicadorScroll({
  targetId = 'siguiente-seccion',
}: {
  targetId?: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const manejarScroll = () => {
      if (window.scrollY > 50) {
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <motion.button
            type="button"
            onClick={bajarSuave}
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-label="Desliza hacia abajo para ver más información"
            className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full bg-[#D61F69] hover:bg-[#BE185D] text-white border-2 border-[#EAB308] px-5 py-3 shadow-2xl shadow-[#D61F69]/50 cursor-pointer active:scale-95"
          >
            <ChevronsDown className="w-5 h-5 text-[#EAB308] shrink-0" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] whitespace-nowrap">
              Desliza para ver más
            </span>
            <ChevronsDown className="w-5 h-5 text-[#EAB308] shrink-0" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}