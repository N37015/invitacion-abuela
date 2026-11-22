'use client';

import { CldImage, CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { motion } from 'framer-motion';
import { Camera, Film, Sparkles } from 'lucide-react';
import { MediaRecuerdo } from '@/data/evento';

export default function GaleriaRecuerdos({
  recuerdos,
}: {
  recuerdos: MediaRecuerdo[];
}) {
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

      {/* Celular: carrusel deslizable con imán. Pantallas grandes: cuadrícula. */}
      <div
        className="
          flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none
        "
      >
        {recuerdos.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.98 }}
            className="group snap-center shrink-0 basis-[80%] sm:basis-[60%] md:basis-auto bg-white rounded-2xl overflow-hidden border border-[#E6DDD0] shadow-sm md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="h-1 w-full borde-chiapaneca" />

            <div className="relative aspect-[4/5] bg-[#F3ECE1] overflow-hidden">
              {item.cloudinaryPublicId ? (
                item.tipo === 'foto' ? (
                  <CldImage
                    src={item.cloudinaryPublicId}
                    alt={item.titulo}
                    fill
                    sizes="(max-width: 768px) 80vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
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
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="flotar w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#D61F69]/30 flex items-center justify-center text-[#D61F69] mb-3">
                    {item.tipo === 'foto' ? (
                      <Camera className="w-6 h-6" />
                    ) : (
                      <Film className="w-6 h-6" />
                    )}
                  </div>
                  <p className="font-serif text-lg text-[#3B332C]">
                    {item.tipo === 'foto'
                      ? 'Espacio para Fotografía'
                      : 'Espacio para Video'}
                  </p>
                  <p className="text-xs text-[#7A6F66] mt-1">
                    Próximamente disponible
                  </p>
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
        ))}
      </div>

      <p className="md:hidden text-center text-xs text-[#7A6F66] mt-1">
        Desliza para ver más →
      </p>
    </section>
  );
}
