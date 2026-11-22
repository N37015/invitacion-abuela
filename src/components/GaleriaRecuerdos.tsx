'use client';

import { useEffect, useState } from 'react';
import { CldImage, CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, Sparkles, X } from 'lucide-react';
import { MediaRecuerdo } from '@/data/evento';

export default function GaleriaRecuerdos({
  recuerdos,
}: {
  recuerdos: MediaRecuerdo[];
}) {
  const recuerdosValidos = recuerdos.filter((r) => r.cloudinaryPublicId);
  const [fotoActiva, setFotoActiva] = useState<MediaRecuerdo | null>(null);

  useEffect(() => {
    const cerrarConEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFotoActiva(null);
    };

    if (fotoActiva) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', cerrarConEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', cerrarConEscape);
    };
  }, [fotoActiva]);

  if (recuerdosValidos.length === 0) {
    return null;
  }

  return (
    <section id="galeria" className="relative z-10 py-14 sm:py-16 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 sm:mb-12 px-4"
      >
        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#D61F69] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" /> Nuestros Tesoros
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1F1B18] mt-2 leading-tight">
          Recuerdos de una Vida Hermosa
        </h2>
        <p className="text-[#5C534B] mt-3 max-w-xl mx-auto text-sm sm:text-base">
          Momentos que guardamos en el corazón junto a nuestra querida Magdalena.
        </p>
      </motion.div>

      <div
        className="
          flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none
        "
      >
        {recuerdosValidos.map((item, idx) => {
          const esFoto = item.tipo === 'foto';

          return (
            <motion.article
              key={item.id}
              onClick={() => {
                if (esFoto) setFotoActiva(item);
              }}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileTap={esFoto ? { scale: 0.98 } : undefined}
              className={`group snap-center shrink-0 basis-[80%] sm:basis-[60%] md:basis-auto bg-white rounded-2xl overflow-hidden border border-[#E6DDD0] shadow-sm md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                esFoto ? 'cursor-pointer' : ''
              }`}
            >
              <div className="h-1 w-full borde-chiapaneca" />

              <div className="relative aspect-[4/5] bg-[#F3ECE1] overflow-hidden">
                {esFoto ? (
                  <>
                    <CldImage
                      src={item.cloudinaryPublicId}
                      alt={item.titulo}
                      fill
                      sizes="(max-width: 768px) 80vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs text-white flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#18181B]">
                    <CldVideoPlayer
                      id={`video-${item.id}`}
                      width="720"
                      height="900"
                      src={item.cloudinaryPublicId}
                      colors={{
                        accent: '#D61F69',
                        base: '#18181B',
                        text: '#FAF7F2',
                      }}
                    />
                  </div>
                )}

                {item.anio && (
                  <span className="absolute top-3 left-3 bg-[#18181B]/85 backdrop-blur-sm text-[#FAF7F2] text-xs font-medium px-3 py-1 rounded-full border border-[#EAB308]/40">
                    {item.anio}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1">
                <h3 className="font-serif text-xl font-semibold text-[#1F1B18]">
                  {item.titulo}
                </h3>
                {item.descripcion && (
                  <p className="text-sm text-[#5C534B] mt-1.5 leading-relaxed">
                    {item.descripcion}
                  </p>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {recuerdosValidos.length > 1 && (
        <p className="md:hidden text-center text-xs text-[#7A6F66] mt-1">
          Desliza para ver más →
        </p>
      )}

      {/* MODAL SOLO PARA FOTOS (tamaño medio, no pantalla completa) */}
      <AnimatePresence>
        {fotoActiva && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFotoActiva(null)}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md sm:max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E6DDD0]"
            >
              <div className="h-1.5 w-full borde-chiapaneca" />

              <button
                type="button"
                onClick={() => setFotoActiva(null)}
                aria-label="Cerrar foto"
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#18181B]/80 hover:bg-[#D61F69] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="bg-[#FAF7F2] flex items-center justify-center">
                <CldImage
                  src={fotoActiva.cloudinaryPublicId}
                  alt={fotoActiva.titulo}
                  width={900}
                  height={1100}
                  className="w-full max-h-[56vh] object-contain"
                />
              </div>

              <div className="p-5 bg-white">
                <div className="flex flex-wrap items-center gap-2">
                  {fotoActiva.anio && (
                    <span className="bg-[#FDF2F8] text-[#9D174D] border border-[#D61F69]/25 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {fotoActiva.anio}
                    </span>
                  )}
                  <h3 className="font-serif text-xl font-semibold text-[#18181B]">
                    {fotoActiva.titulo}
                  </h3>
                </div>
                {fotoActiva.descripcion && (
                  <p className="text-sm text-[#5C534B] mt-1.5 leading-relaxed">
                    {fotoActiva.descripcion}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}