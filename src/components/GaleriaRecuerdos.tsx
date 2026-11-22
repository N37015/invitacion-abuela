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
    <section id="galeria" className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#D61F69] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" /> Nuestros Tesoros
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1F1B18] mt-2">
          Recuerdos de una Vida Hermosa
        </h2>
        <p className="text-[#5C534B] mt-3 max-w-xl mx-auto text-sm sm:text-base">
          Momentos que guardamos en el corazón junto a nuestra querida Magdalena.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recuerdos.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-[#E6DDD0] shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Detalle superior tipo listón */}
            <div className="h-1 w-full borde-chiapaneca" />

            <div className="relative aspect-[4/5] bg-[#F3ECE1] overflow-hidden">
              {item.cloudinaryPublicId ? (
                item.tipo === 'foto' ? (
                  <CldImage
                    src={item.cloudinaryPublicId}
                    alt={item.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
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
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center border-b border-[#E6DDD0]">
                  <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#D61F69]/30 flex items-center justify-center text-[#D61F69] mb-3">
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

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1F1B18]">
                  {item.titulo}
                </h3>
                {item.descripcion && (
                  <p className="text-sm text-[#5C534B] mt-1.5 leading-relaxed">
                    {item.descripcion}
                  </p>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}