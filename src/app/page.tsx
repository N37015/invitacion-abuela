import Image from 'next/image';
import { Calendar, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { DATOS_EVENTO } from '@/data/evento';
import CuentaRegresiva from '@/components/CuentaRegresiva';
import GaleriaRecuerdos from '@/components/GaleriaRecuerdos';
import SeccionRsvp from '@/components/SeccionRsvp';

export const dynamic = 'force-dynamic';

/**
 * FOTOS DE LA INVITACIÓN
 * Guarda tus imágenes en la carpeta /public/fotos/ con estos nombres.
 * Si no quieres mostrar alguna, deja su valor como '' (cadena vacía)
 * y esa sección simplemente no aparece.
 */
const FOTOS = {
  portada: '/fotos/portada.jpg', // retrato del festejado/a (cuadrada o vertical)
  sobreMi: '/fotos/sobre.jpg', // foto junto a la frase / dedicatoria
  salon: '/fotos/salon.jpg', // foto del Salón Jardín Guadalupe
};

export default async function HomePage() {
  const [saludos, recuerdosDB] = await Promise.all([
    prisma.invitado.findMany({
      where: {
        mostrarMuro: true,
        mensaje: { not: null },
      },
      orderBy: { creadoEn: 'desc' },
      take: 20,
      select: {
        id: true,
        nombre: true,
        mensaje: true,
        creadoEn: true,
      },
    }),
    prisma.recuerdo.findMany({
      orderBy: [{ orden: 'asc' }, { creadoEn: 'desc' }],
    }),
  ]);

  const recuerdosMostrar =
    recuerdosDB.length > 0
      ? recuerdosDB.map((r) => ({
          id: r.id,
          tipo: r.tipo === 'VIDEO' ? ('video' as const) : ('foto' as const),
          cloudinaryPublicId: r.publicId || '',
          titulo: r.titulo || 'Recuerdo especial',
          anio: r.anio || undefined,
          descripcion: r.descripcion || undefined,
        }))
      : DATOS_EVENTO.recuerdos;

  return (
    <main className="min-h-screen flex flex-col">
      {/* Cenefa superior */}
      <div className="h-2.5 w-full borde-chiapaneca" />

      {/* ───────────── HERO / PORTADA ───────────── */}
      <header className="relative pt-14 pb-16 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181B] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
          Celebración Especial · Chiapas
        </div>

        {/* 📸 FOTO DE PORTADA */}
        {FOTOS.portada && (
          <div className="relative mx-auto mb-8 w-48 h-48 sm:w-60 sm:h-60">
            {/* Anillo de colores estilo bordado */}
            <div
              className="absolute -inset-2 rounded-full"
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
              sizes="(max-width: 640px) 192px, 240px"
              className="rounded-full object-cover shadow-xl"
            />
          </div>
        )}

        <p className="font-serif italic text-xl sm:text-2xl text-[#D61F69]">
          Mis {DATOS_EVENTO.edad} Años
        </p>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#18181B] mt-2 leading-tight">
          {DATOS_EVENTO.nombreCompleto}
        </h1>

        {/* Detalle ornamental estilo bordado */}
        <div className="flex items-center justify-center gap-2 my-6">
          <span className="h-px w-12 bg-[#D61F69]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D61F69]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
          <span className="h-px w-12 bg-[#0284C7]/40" />
        </div>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#4A3F37] leading-relaxed">
          {DATOS_EVENTO.frasePrincipal}
        </p>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6E6259] mb-4 font-semibold">
            Faltan para el gran día
          </p>
          <CuentaRegresiva fechaISO={DATOS_EVENTO.fechaISO} />
        </div>
      </header>

      {/* ───────────── SOBRE EL FESTEJADO/A ───────────── */}
      {FOTOS.sobreMi && (
        <section className="px-4 py-6 max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white border border-[#E6DDD0] rounded-3xl overflow-hidden shadow-xs">
            {/* 📸 FOTO 2 */}
            <div className="relative h-72 md:h-full md:min-h-[320px]">
              <Image
                src={FOTOS.sobreMi}
                alt="Foto del festejado"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-7 sm:p-9 text-center md:text-left">
              <Heart className="w-6 h-6 text-[#D61F69] mx-auto md:mx-0 mb-3" />
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#18181B]">
                Un día para compartir
              </h2>
              <p className="mt-3 text-[#4A3F37] leading-relaxed">
                Quiero celebrar este momento tan especial junto a las personas
                que más quiero. Tu presencia es el mejor regalo.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ───────────── DETALLES DEL EVENTO ───────────── */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <div className="bg-[#18181B] text-[#FAF7F2] rounded-3xl p-7 sm:p-10 shadow-lg relative overflow-hidden">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <Calendar className="w-7 h-7 text-[#D61F69] mx-auto mb-2.5" />
              <h3 className="font-serif text-xl font-semibold">Fecha</h3>
              <p className="text-sm text-stone-200 mt-1">
                {DATOS_EVENTO.fechaTexto}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <Clock className="w-7 h-7 text-[#EA580C] mx-auto mb-2.5" />
              <h3 className="font-serif text-xl font-semibold">Hora</h3>
              <p className="text-sm text-stone-200 mt-1">
                {DATOS_EVENTO.horaTexto}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <MapPin className="w-7 h-7 text-[#0284C7] mx-auto mb-2.5" />
              <h3 className="font-serif text-xl font-semibold">Lugar</h3>
              <p className="text-sm text-stone-200 mt-1">
                {DATOS_EVENTO.lugar.nombre}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                {DATOS_EVENTO.lugar.ciudad}
              </p>
            </div>
          </div>

          {/* 📸 FOTO 3: EL SALÓN */}
          {FOTOS.salon && (
            <div className="relative mt-8 h-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={FOTOS.salon}
                alt={DATOS_EVENTO.lugar.nombre}
                fill
                sizes="(max-width: 896px) 100vw, 800px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-4 font-serif text-lg">
                {DATOS_EVENTO.lugar.nombre}
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <a
              href={DATOS_EVENTO.lugar.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#18181B] font-semibold px-6 py-3 rounded-full text-sm transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              Ver Ubicación en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ───────────── GALERÍA (Neon + Cloudinary) ───────────── */}
      <GaleriaRecuerdos recuerdos={recuerdosMostrar} />

      {/* ───────────── FORMULARIO RSVP Y MURO ───────────── */}
      <SeccionRsvp saludos={saludos} />

      {/* ───────────── FOOTER ───────────── */}
      <footer className="mt-auto py-8 text-center text-xs text-[#6E6259] border-t border-[#E6DDD0]">
        <p className="font-serif text-base text-[#2C2520]">
          Con todo nuestro amor · Familia de {DATOS_EVENTO.nombreCorto}
        </p>
        <p className="mt-1">23 de Enero de 2027 · Ocozocoautla, Chiapas</p>
      </footer>
    </main>
  );
}