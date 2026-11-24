'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';

export default function SobreEntrada({
  onAbrir,
}: {
  onAbrir: () => void;
}) {
  const [abierto, setAbierto] = useState(false);

  const manejarApertura = () => {
    setAbierto(true);
    onAbrir(); // Este clic desbloquea y arranca la música inmediatamente
  };

  return (
    <AnimatePresence>
      {!abierto && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-marfil text-[#1F1B18] text-center px-6"
        >
          {/* Cenefa superior Chiapaneca */}
          <div className="h-2.5 w-full borde-chiapaneca shrink-0" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto flex flex-col items-center my-auto"
          >
            {/* Nombre principal */}
            <h1 className="font-serif text-4xl sm:text-6xl font-semibold text-[#1F1B18] leading-tight">
              Magdalena Pacheco Roblero
            </h1>

            {/* Línea ornamental con 5 puntos bordados */}
            <div className="flex items-center justify-center gap-2 my-6">
              <span className="h-px w-10 bg-[#D61F69]/40" />
              <span className="w-2 h-2 rounded-full bg-[#D61F69]" />
              <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
              <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
              <span className="w-2 h-2 rounded-full bg-[#15803D]" />
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              <span className="h-px w-10 bg-[#0284C7]/40" />
            </div>

            <p className="text-sm sm:text-base text-[#5C534B] mb-8 max-w-sm">
              Tienes una invitación especial para celebrar juntos este gran día.
            </p>

            {/* Botón para abrir e iniciar la música */}
            <motion.button
              type="button"
              onClick={manejarApertura}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#D61F69] hover:bg-[#BE185D] text-white font-semibold px-8 py-4 text-base shadow-lg shadow-[#D61F69]/25 transition-colors cursor-pointer"
            >
              <MailOpen className="w-5 h-5" />
              Abrir Invitación
            </motion.button>
          </motion.div>

          {/* Cenefa inferior Chiapaneca */}
          <div className="h-2.5 w-full borde-chiapaneca shrink-0" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}