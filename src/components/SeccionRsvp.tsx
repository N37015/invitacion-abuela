'use client';

import { useActionState, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Heart, Send } from 'lucide-react';
import { registrarConfirmacion, EstadoRsvp } from '@/app/actions';

interface SaludoPublico {
  id: string;
  nombre: string;
  mensaje: string | null;
  creadoEn: Date;
}

const campo =
  'w-full rounded-xl border border-[#D8CEC0] bg-[#FAF7F2]/60 px-4 py-3.5 text-base text-[#1F1B18] focus:outline-none focus:ring-2 focus:ring-[#D61F69] focus:border-transparent transition-shadow';

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
      const colors = ['#D61F69', '#EA580C', '#EAB308', '#15803D', '#0284C7'];
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.65 }, colors });
      setTimeout(
        () => confetti({ particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors }),
        250
      );
      setTimeout(
        () => confetti({ particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors }),
        250
      );
    }
  }, [state]);

  return (
    <section id="confirmar" className="relative z-10 py-12 sm:py-16 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-3xl shadow-md border border-[#E6DDD0] overflow-hidden"
      >
        <div className="h-2 w-full borde-chiapaneca" />

        <div className="p-5 sm:p-10">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#D61F69] font-semibold">
              <Heart className="w-3.5 h-3.5 fill-[#D61F69]" /> Confirmación y Buenos Deseos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18] mt-2">
              Acompáñanos a Celebrar
            </h2>
            <p className="text-sm sm:text-base text-[#5C534B] mt-2">
              Confirma tu asistencia y déjale unas palabras llenas de cariño a nuestra abuelita Magdalena.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {state?.ok ? (
              <motion.div
                key="gracias"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="bg-[#FDF2F8] border border-[#D61F69]/30 rounded-2xl p-6 text-center max-w-md mx-auto"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.15, stiffness: 260, damping: 14 }}
                >
                  <CheckCircle2 className="w-14 h-14 text-[#D61F69] mx-auto mb-3" />
                </motion.div>
                <h3 className="font-serif text-2xl text-[#1F1B18] font-semibold">
                  ¡Registro recibido!
                </h3>
                <p className="text-sm text-[#4A3F37] mt-2">{state.mensaje}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                action={formAction}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5 max-w-xl mx-auto"
              >
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-[#2C2520] mb-1.5">
                    Tu nombre completo *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    required
                    autoComplete="name"
                    placeholder="Escribe tu nombre completo"
                    className={campo}
                  />
                </div>

                <fieldset>
                  <legend className="block text-sm font-medium text-[#2C2520] mb-2">
                    ¿Podrás acompañarnos el sábado 23 de enero?
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        { v: 'si', t: '¡Sí, ahí estaré!', on: 'border-[#D61F69] bg-[#FDF2F8] text-[#9D174D] shadow-xs' },
                        { v: 'no', t: 'No podré asistir', on: 'border-[#18181B] bg-[#F4F4F5] text-[#18181B] shadow-xs' },
                      ] as const
                    ).map((op) => (
                      <label
                        key={op.v}
                        className={`cursor-pointer min-h-[3.25rem] flex items-center justify-center rounded-xl border p-3 text-center text-sm font-medium transition-all active:scale-95 ${
                          asistira === op.v
                            ? op.on
                            : 'border-[#D8CEC0] text-[#5C534B] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="asistira"
                          value={op.v}
                          checked={asistira === op.v}
                          onChange={() => setAsistira(op.v)}
                          className="sr-only"
                        />
                        {op.t}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Solo se muestra si elige "¡Sí, ahí estaré!" */}
                <AnimatePresence initial={false}>
                  {asistira === 'si' && (
                    <motion.div
                      key="bloque-mensaje"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <label htmlFor="mensaje" className="block text-sm font-medium text-[#2C2520] mb-1.5">
                        Mensaje para la abuelita Magdalena
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        rows={4}
                        placeholder="Escribe un mensaje bonito para nuestra abuelita..."
                        className={campo}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {state && !state.ok && (
                  <p role="alert" className="text-sm text-red-600 font-medium">
                    {state.mensaje}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-xl bg-[#D61F69] hover:bg-[#BE185D] disabled:opacity-60 text-white font-semibold py-4 px-6 shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className={`w-4 h-4 ${isPending ? 'animate-pulse' : ''}`} />
                  {isPending ? 'Guardando...' : 'Enviar'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}