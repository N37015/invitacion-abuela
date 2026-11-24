import Image from 'next/image';
import { Calendar, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { DATOS_EVENTO } from '@/data/evento';
import CuentaRegresiva from '@/components/CuentaRegresiva';
import GaleriaRecuerdos from '@/components/GaleriaRecuerdos';
import SeccionRsvp from '@/components/SeccionRsvp';
import Reveal from '@/components/Reveal';
import Petalos from '@/components/Petalos';
import BarraConfirmar from '@/components/BarraConfirmar';
import ReproductorMusica from '@/components/ReproductorMusica';
import IndicadorScroll from '@/components/IndicadorScroll';

export const dynamic = 'force-dynamic';

/**
 * FOTOS DE LA INVITACIÓN
 * Guarda tus imágenes en /public/fotos/ con estos nombres.
 * Si no quieres mostrar alguna, deja su valor como '' y esa sección no aparece.
 */
const FOTOS = {
  portada: '/fotos/portada.jpeg', // retrato (cuadrada o vertical)
  sobreMi: '/fotos/sobre.jpg',
  salon: '/fotos/salon.jpeg',
};

export default async function HomePage() {
  const [saludos, recuerdosDB] = await Promise.all([
    prisma.invitado.findMany({
      where: { mostrarMuro: true, mensaje: { not: null } },
      orderBy: { creadoEn: 'desc' },
      take: 20,
      select: { id: true, nombre: true, mensaje: true, creadoEn: true },
    }),
    prisma.recuerdo.findMany({
      orderBy: [{ orden: 'asc' }, { creadoEn: 'desc' }],
    }),
  ]);

  const recuerdosMostrar = recuerdosDB.map((r) => ({
    id: r.id,
    tipo: r.tipo === 'VIDEO' ? ('video' as const) : ('foto' as const),
    cloudinaryPublicId: r.publicId || '',
    titulo: r.titulo || 'Recuerdo especial',
    anio: r.anio || undefined,
    descripcion: r.descripcion || undefined,
  }));

  return (
    <main className="relative min-h-screen flex flex-col">
      <Petalos />
      <BarraConfirmar />

      {/* Cenefa superior */}
      <div className="relative z-10 h-2.5 w-full borde-chiapaneca" />

      {/* ───────────── HERO ───────────── */}
      <header className="relative z-10 min-h-[88svh] flex flex-col justify-center pt-8 sm:pt-12 pb-8 px-4 text-center max-w-4xl mx-auto w-full">
        <Reveal y={-16}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181B] text-[#FAF7F2] text-[11px] sm:text-xs uppercase tracking-[0.22em] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
            Celebración Especial
          </div>
        </Reveal>

        {FOTOS.portada && (
          <Reveal scale={0.9} delay={0.1}>
            <div className="relative mx-auto mb-6 w-44 h-44 sm:w-56 sm:h-56">
              <div
                className="absolute -inset-2 rounded-full animate-[spin_14s_linear_infinite]"
                style={{
                  background:
                    'conic-gradient(#D61F69, #EA580C, #EAB308, #15803D, #0284C7, #D61F69)',
                }}
              />
              <div className="absolute -inset-0.5 rounded-full bg-[#FAF7F2]" />
              <Image
                src={FOTOS.portada}
                alt={DATOS_EVENTO.nombreCompleto}
                fill
                priority
                sizes="(max-width: 640px) 176px, 224px"
                className="rounded-full object-cover shadow-xl"
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <p className="font-serif italic text-xl sm:text-2xl text-[#D61F69]">
            Celebrando sus
          </p>
          <p className="font-serif font-bold leading-none text-[5rem] sm:text-[7.5rem] texto-brillo flotar">
            {DATOS_EVENTO.edad}
          </p>
          <p className="font-serif italic text-xl sm:text-2xl text-[#D61F69] -mt-1">
            años de vida
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#18181B] mt-4 leading-tight text-balance">
            {DATOS_EVENTO.nombreCompleto}
          </h1>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex items-center justify-center gap-2 my-5">
            <span className="h-px w-10 bg-[#D61F69]/40" />
            {['#D61F69', '#EA580C', '#EAB308', '#15803D', '#0284C7'].map((c, i) => (
              <span
                key={c}
                className="w-2.5 h-2.5 rounded-full flotar"
                style={{ backgroundColor: c, animationDelay: `${i * 0.2}s` }}
              />
            ))}
            <span className="h-px w-10 bg-[#0284C7]/40" />
          </div>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#4A3F37] leading-relaxed text-pretty">
            {DATOS_EVENTO.frasePrincipal}
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6E6259] mb-4 font-semibold">
              Faltan para el gran día
            </p>
            <CuentaRegresiva fechaISO={DATOS_EVENTO.fechaISO} />
            <IndicadorScroll targetId="siguiente-seccion" />
          </div>
        </Reveal>
      </header>

      {/* ───────────── SOBRE EL FESTEJADO/A ───────────── */}
      {FOTOS.sobreMi && (
        <section
          id="siguiente-seccion"
          className="relative z-10 px-4 py-6 max-w-4xl mx-auto w-full scroll-mt-4"
        >
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 items-center bg-white border border-[#E6DDD0] rounded-3xl overflow-hidden shadow-sm">
              <div className="relative h-72 md:h-full md:min-h-[320px]">
                <Image
                  src={FOTOS.sobreMi}
                  alt="Foto de la festejada"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7 sm:p-9 text-center md:text-left">
                <Heart className="w-6 h-6 text-[#D61F69] fill-[#D61F69]/20 mx-auto md:mx-0 mb-3 flotar" />
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#18181B]">
                  Un día para compartir
                </h2>
                <p className="mt-3 text-[#4A3F37] leading-relaxed">
                  Quiero celebrar este momento tan especial junto a las personas
                  que más quiero. Tu presencia es el mejor regalo.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ───────────── DETALLES DEL EVENTO ───────────── */}
      <section
        id={!FOTOS.sobreMi ? 'siguiente-seccion' : undefined}
        className="relative z-10 px-4 py-8 max-w-4xl mx-auto w-full scroll-mt-4"
      >
        <Reveal>
          <div className="bg-[#18181B] text-[#FAF7F2] rounded-3xl p-6 pt-9 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="h-1.5 w-full borde-chiapaneca absolute top-0 left-0" />

            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#EAB308]">
                Cuándo y Dónde
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl mt-1">
                Detalles de la Recepción
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                ({DATOS_EVENTO.cumpleRealTexto})
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
              {[
                { Icono: Calendar, color: 'text-[#D61F69]', titulo: 'Fecha', texto: DATOS_EVENTO.fechaTexto },
                { Icono: Clock, color: 'text-[#EA580C]', titulo: 'Hora', texto: DATOS_EVENTO.horaTexto },
                { Icono: MapPin, color: 'text-[#0284C7]', titulo: 'Lugar', texto: DATOS_EVENTO.lugar.nombre, extra: DATOS_EVENTO.lugar.ciudad },
              ].map(({ Icono, color, titulo, texto, extra }, i) => (
                <Reveal key={titulo} delay={i * 0.12} y={20}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 h-full">
                    <Icono className={`w-7 h-7 ${color} mx-auto mb-2.5`} />
                    <h3 className="font-serif text-xl font-semibold">{titulo}</h3>
                    <p className="text-sm text-stone-200 mt-1">{texto}</p>
                    {extra && <p className="text-xs text-stone-400 mt-0.5">{extra}</p>}
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={DATOS_EVENTO.lugar.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] active:scale-95 text-[#18181B] font-semibold px-6 py-3.5 rounded-full text-sm transition-all shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                Ver Ubicación en Google Maps
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────── GALERÍA ───────────── */}
      <GaleriaRecuerdos recuerdos={recuerdosMostrar} />

      {/* ───────────── RSVP Y MURO ───────────── */}
      <SeccionRsvp saludos={saludos} />
     
       <IndicadorScroll targetId="siguiente-seccion" />
      <ReproductorMusica src="/musica.mp3" />
      
    </main>
  );
}