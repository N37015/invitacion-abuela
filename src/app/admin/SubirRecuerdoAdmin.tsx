'use client';

import { useState } from 'react';
import { ImagePlus, Loader2, Trash2, Video } from 'lucide-react';
import { guardarRecuerdo, eliminarRecuerdo } from './actions';

interface RecuerdoItem {
  id: string;
  titulo: string | null;
  anio: string | null;
  tipo: 'FOTO' | 'VIDEO';
  url: string;
}

export default function SubirRecuerdoAdmin({
  recuerdos,
}: {
  recuerdos: RecuerdoItem[];
}) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [titulo, setTitulo] = useState('');
  const [anio, setAnio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');

  const handleSubir = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) {
      setError('Selecciona una foto o un video primero.');
      return;
    }

    setSubiendo(true);
    setError('');

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error('Faltan las variables de Cloudinary en .env');
      }

      const esVideo = archivo.type.startsWith('video/');
      const formData = new FormData();
      formData.append('file', archivo);
      formData.append('upload_preset', uploadPreset);

      // Subida directa a Cloudinary (auto detecta imagen o video)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Error al subir a Cloudinary');
      }

      // Guardar referencia en Neon
      const guardado = await guardarRecuerdo({
        titulo,
        descripcion,
        anio,
        tipo: esVideo ? 'VIDEO' : 'FOTO',
        url: data.secure_url,
        publicId: data.public_id,
      });

      if (!guardado.ok) {
        throw new Error(guardado.error || 'Error al guardar en base de datos');
      }

      // Limpiar formulario
      setArchivo(null);
      setTitulo('');
      setAnio('');
      setDescripcion('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error al subir.');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="bg-white border border-[#E6DDD0] rounded-2xl p-6 shadow-xs mb-8">
      <h2 className="font-serif text-2xl font-semibold text-[#18181B]">
        Galería de Fotos y Videos
      </h2>
      <p className="text-xs text-[#6E6259] mt-1 mb-5">
        Sube fotos o videos de la abuelita Magdalena; aparecerán automáticamente en la invitación.
      </p>

      <form onSubmit={handleSubir} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C534B] mb-1.5">
            Seleccionar Foto o Video *
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setArchivo(e.target.files?.[0] || null)}
            className="w-full text-sm text-[#3B332C] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#FDF2F8] file:text-[#D61F69] hover:file:bg-[#FCE7F3] border border-[#D8CEC0] rounded-xl p-1.5 bg-[#FAF7F2]/50 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C534B] mb-1.5">
            Título del recuerdo
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej. Fiesta en familia"
            className="w-full rounded-xl border border-[#D8CEC0] bg-[#FAF7F2]/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D61F69]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C534B] mb-1.5">
            Año o etiqueta (opcional)
          </label>
          <input
            type="text"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            placeholder="Ej. 1995 o Navidad 2025"
            className="w-full rounded-xl border border-[#D8CEC0] bg-[#FAF7F2]/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D61F69]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C534B] mb-1.5">
            Descripción breve (opcional)
          </label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Un momento inolvidable junto a nuestros hijos y nietos..."
            className="w-full rounded-xl border border-[#D8CEC0] bg-[#FAF7F2]/50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D61F69]"
          />
        </div>

        {error && (
          <p className="md:col-span-2 text-xs text-red-600 font-medium">{error}</p>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={subiendo}
            className="inline-flex items-center gap-2 bg-[#D61F69] hover:bg-[#BE185D] disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
          >
            {subiendo ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Subiendo a Cloudinary...
              </>
            ) : (
              <>
                <ImagePlus className="w-4 h-4" /> Subir a la Galería
              </>
            )}
          </button>
        </div>
      </form>

      {/* Lista de recuerdos ya subidos */}
      {recuerdos.length > 0 && (
        <div className="mt-8 pt-6 border-t border-[#EFE8DC]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-3">
            Archivos publicados ({recuerdos.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recuerdos.map((rec) => {
              const borrarRecuerdo = eliminarRecuerdo.bind(null, rec.id);
              return (
                <div
                  key={rec.id}
                  className="relative group rounded-xl overflow-hidden border border-[#E6DDD0] bg-[#FAF7F2] aspect-square"
                >
                  {rec.tipo === 'FOTO' ? (
                    <img
                      src={rec.url}
                      alt={rec.titulo || 'Recuerdo'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#18181B] text-white p-2 text-center">
                      <Video className="w-6 h-6 text-[#EAB308] mb-1" />
                      <span className="text-[11px] line-clamp-2">
                        {rec.titulo || 'Video'}
                      </span>
                    </div>
                  )}

                  <form action={borrarRecuerdo} className="absolute top-1.5 right-1.5">
                    <button
                      type="submit"
                      title="Quitar de la galería"
                      className="p-1.5 rounded-lg bg-black/70 text-white hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}