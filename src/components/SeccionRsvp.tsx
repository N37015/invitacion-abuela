'use client';

import { useActionState, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Heart, Send, Users } from 'lucide-react';
import { registrarConfirmacion, EstadoRsvp } from '@/app/actions';

interface SaludoPublico {
  id: string;
  nombre: string;
  mensaje: string | null;
  creadoEn: Date;
}

export default function SeccionRsvp({
  saludos,
}: {
  saludos: SaludoPublico[];
}) {
  const [state, formAction, isPending] = useActionState<EstadoRsvp | null, FormData>(
    registrarConfirmacion,
    null
  );
  const [asistira, setAsistira] = useState<'si' | 'no'>('si');

  useEffect(() => {
    if (state?.ok) {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#D61F69', '#EA580C', '#EAB308', '#15803D', '#0284C7'],
      });
    }
  }, [state]);

  return (
    <section id="confirmar" className="py-16 px-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-md border border-[#E6DDD0] overflow-hidden">
        {/* Cenefa superior estilo listones de Chiapaneca */}
        <div className="h-2 w-full borde-chiapaneca" />

        <div className="p-6 sm:p-10">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#D61F69] font-semibold">
              <Heart className="w-3.5 h-3.5 fill-[#D61F69]" /> Confirmación y Buenos Deseos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18] mt-2">
              Acompáñanos a Celebrar
            </h2>
            <p className="text-sm sm:text-base text-[#5C534B] mt-2">
              Confirma tu asistencia y déjale unas palabras llenas de cariño a nuestra abuelita Magdalena.
            </p>
          </div>

          {state?.ok ? (
            <div className="bg-[#FDF2F8] border border-[#D61F69]/30 rounded-2xl p-6 text-center max-w-md mx-auto">
              <CheckCircle2 className="w-12 h-12 text-[#D61F69] mx-auto mb-3" />
              <h3 className="font-serif text-2xl text-[#1F1B18] font-semibold">
                ¡Registro recibido!
              </h3>
              <p className="text-sm text-[#4A3F37] mt-2">{state.mensaje}</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-5 max-w-xl mx-auto">
              <div>
                <label className="block text-sm font-medium text-[#2C2520] mb-1.5">
                  Tu nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  placeholder="Ej. Familia Pérez Gómez"
                  className="w-full rounded-xl border border-[#D8CEC0] bg-[#FAF7F2]/60 px-4 py-3 text-base text-[#1F1B18] focus:outline-none focus:ring-2 focus:ring-[#D61F69]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2520] mb-2">
                  ¿Podrás acompañarnos el sábado 23 de enero?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    onClick={() => setAsistira('si')}
                    className={`cursor-pointer rounded-xl border p-3.5 text-center text-sm font-medium transition-all ${
                      asistira === 'si'
                        ? 'border-[#D61F69] bg-[#FDF2F8] text-[#9D174D] shadow-xs'
                        : 'border-[#D8CEC0] text-[#5C534B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="asistira"
                      value="si"
                      checked={asistira === 'si'}
                      onChange={() => setAsistira('si')}
                      className="sr-only"
                    />
                    ¡Sí, ahí estaremos!
                  </label>

                  <label
                    onClick={() => setAsistira('no')}
                    className={`cursor-pointer rounded-xl border p-3.5 text-center text-sm font-medium transition-all ${
                      asistira === 'no'
                        ? 'border-[#18181B] bg-[#F4F4F5] text-[#18181B] shadow-xs'
                        : 'border-[#D8CEC0] text-[#5C534B] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="asistira"
                      value="no"
                      checked={asistira === 'no'}
                      onChange={() => setAsistira('no')}
                      className="sr-only"
                    />
                    No podré asistir
                  </label>
                </div>
              </div>

              {asistira === 'si' && (
                <div>
                  <label className="block text-sm font-medium text-[#2C2520] mb-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#EA580C]" />
                      Acompañantes adicionales (sin contarte a ti)
                    </span>
                  </label>
                  <select
                    name="acompanantes"
                    defaultValue="0"
                    className="w-full rounded-xl border border-[#D8CEC0] bg-[#FAF7F2]/60 px-4 py-3 text-base text-[#1F1B18] focus:outline-none focus:ring-2 focus:ring-[#D61F69]"
                  >
                    <option value="0">Voy solo(a)</option>
                    <option value="1">+ 1 acompañante</option>
                    <option value="2">+ 2 acompañantes</option>
                    <option value="3">+ 3 acompañantes</option>
                    <option value="4">+ 4 acompañantes</option>
                    <option value="5">+ 5 acompañantes</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#2C2520] mb-1.5">
                  Dedicatoria o felicitación para la abuelita Magdalena
                </label>
                <textarea
                  name="mensaje"
                  rows={3}
                  placeholder="Escribe un mensaje bonito o un recuerdo especial con ella..."
                  className="w-full rounded-xl border border-[#D8CEC0] bg-[#FAF7F2]/60 px-4 py-3 text-base text-[#1F1B18] focus:outline-none focus:ring-2 focus:ring-[#D61F69]"
                />
              </div>

              <label className="flex items-center gap-2.5 text-sm text-[#5C534B] cursor-pointer">
                <input
                  type="checkbox"
                  name="mostrarMuro"
                  defaultChecked
                  className="w-4 h-4 rounded accent-[#D61F69]"
                />
                Mostrar mi felicitación en el muro de recuerdos de la página
              </label>

              {state && !state.ok && (
                <p className="text-sm text-red-600 font-medium">{state.mensaje}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-[#D61F69] hover:bg-[#BE185D] disabled:opacity-60 text-white font-semibold py-3.5 px-6 shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {isPending ? 'Guardando...' : 'Enviar Confirmación y Saludo'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Muro de Felicitaciones desde Neon */}
      {saludos.length > 0 && (
        <div className="mt-14">
          <h3 className="font-serif text-2xl sm:text-3xl text-center text-[#1F1B18] mb-6">
            Palabras con Cariño de la Familia
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {saludos.map((s) => (
              <div
                key={s.id}
                className="bg-white/90 border border-[#E6DDD0] rounded-2xl p-5 shadow-xs relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#D61F69] via-[#EA580C] to-[#EAB308]" />
                <p className="text-[#3B332C] italic text-sm sm:text-base leading-relaxed">
                  &ldquo;{s.mensaje}&rdquo;
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9D174D] mt-3">
                  — {s.nombre}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}