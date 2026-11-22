'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function iniciarSesionAdmin(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const password = String(formData.get('password') || '');
  const correcta = process.env.ADMIN_PASSWORD || 'magdalena64';

  if (password !== correcta) {
    return { error: 'Contraseña incorrecta.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('admin_auth', 'ok', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  });

  revalidatePath('/admin');
  return {};
}

export async function cerrarSesionAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  revalidatePath('/admin');
}

export async function eliminarInvitado(id: string) {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'ok') return;

  await prisma.invitado.delete({ where: { id } });
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function guardarRecuerdo(datos: {
  titulo: string;
  descripcion: string;
  anio: string;
  tipo: 'FOTO' | 'VIDEO';
  url: string;
  publicId: string;
}) {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'ok') {
    return { ok: false, error: 'No autorizado' };
  }

  await prisma.recuerdo.create({
    data: {
      titulo: datos.titulo.trim() || 'Recuerdo especial',
      descripcion: datos.descripcion.trim() || null,
      anio: datos.anio.trim() || null,
      tipo: datos.tipo,
      url: datos.url,
      publicId: datos.publicId,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/');
  return { ok: true };
}

export async function eliminarRecuerdo(id: string) {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'ok') return;

  await prisma.recuerdo.delete({ where: { id } });
  revalidatePath('/admin');
  revalidatePath('/');
}