'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface EstadoRsvp {
  ok: boolean;
  mensaje: string;
}

export async function registrarConfirmacion(
  _prevState: EstadoRsvp | null,
  formData: FormData
): Promise<EstadoRsvp> {
  const nombre = String(formData.get('nombre') || '').trim();
  const asistira = formData.get('asistira') === 'si';
  const acompanantes = Math.max(0, Math.min(10, Number(formData.get('acompanantes') || 0)));
  const mensaje = String(formData.get('mensaje') || '').trim();
  const mostrarMuro = formData.get('mostrarMuro') === 'on';

  if (nombre.length < 2) {
    return { ok: false, mensaje: 'Por favor escribe tu nombre completo.' };
  }

  try {
    await prisma.invitado.create({
      data: {
        nombre,
        asistira,
        acompanantes: asistira ? acompanantes : 0,
        mensaje: mensaje || null,
        mostrarMuro,
      },
    });

    revalidatePath('/');
    return {
      ok: true,
      mensaje: asistira
        ? '¡Gracias por confirmar! Qué alegría contar contigo en este día tan especial.'
        : '¡Muchas gracias por avisarnos y por tus buenos deseos para la abuelita Magdalena!',
    };
  } catch (error) {
    console.error('Error al guardar RSVP:', error);
    return {
      ok: false,
      mensaje: 'Hubo un problema al guardar tu confirmación. Inténtalo de nuevo.',
    };
  }
}