import { cookies } from 'next/headers';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  LogOut,
  Trash2,
  Users,
  XCircle,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import LoginAdmin from './LoginAdmin';
import SubirRecuerdoAdmin from './SubirRecuerdoAdmin';
import { cerrarSesionAdmin, eliminarInvitado } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const autenticado = cookieStore.get('admin_auth')?.value === 'ok';

  if (!autenticado) {
    return <LoginAdmin />;
  }

  // Consultamos tanto los invitados como los recuerdos guardados en Neon
  const [invitados, recuerdos] = await Promise.all([
    prisma.invitado.findMany({
      orderBy: { creadoEn: 'desc' },
    }),
    prisma.recuerdo.findMany({
      orderBy: { creadoEn: 'desc' },
    }),
  ]);

  const asistentes = invitados.filter((i) => i.asistira);
  const noAsisten = invitados.filter((i) => !i.asistira);

  // Total real de personas (1 titular + sus acompañantes)
  const totalPersonas = asistentes.reduce(
    (acc, item) => acc + 1 + item.acompanantes,
    0
  );

  return (
    <main className="min-h-screen pb-16">
      <div className="h-2 w-full borde-chiapaneca" />

      <div className="max-w-5xl mx-auto px-4 pt-8">
        {/* Barra superior */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D61F69] hover:underline mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver a la invitación
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#18181B]">
              Panel de Administración
            </h1>
            <p className="text-sm text-[#6E6259]">
              Salón Jardín Guadalupe · Sábado 23 de Enero de 2027
            </p>
          </div>

          <form action={cerrarSesionAdmin}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D8CEC0] bg-white text-xs font-semibold text-[#3B332C] hover:bg-[#FAF7F2] cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Salir
            </button>
          </form>
        </div>

        {/* Tarjetas de resumen numérico */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#18181B] text-[#FAF7F2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#EAB308]">
                Total Personas Confirmadas
              </span>
              <Users className="w-5 h-5 text-[#EAB308]" />
            </div>
            <p className="font-serif text-4xl font-bold mt-2">{totalPersonas}</p>
            <p className="text-xs text-stone-400 mt-1">
              Incluye titulares + acompañantes
            </p>
          </div>

          <div className="bg-white border border-[#E6DDD0] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#15803D] font-semibold">
                Familias / Registros Sí
              </span>
              <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
            </div>
            <p className="font-serif text-4xl font-bold text-[#18181B] mt-2">
              {asistentes.length}
            </p>
            <p className="text-xs text-[#6E6259] mt-1">Confirmaciones positivas</p>
          </div>

          <div className="bg-white border border-[#E6DDD0] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#6E6259] font-semibold">
                No Podrán Asistir
              </span>
              <XCircle className="w-5 h-5 text-[#9A8F86]" />
            </div>
            <p className="font-serif text-4xl font-bold text-[#18181B] mt-2">
              {noAsisten.length}
            </p>
            <p className="text-xs text-[#6E6259] mt-1">Avisos recibidos</p>
          </div>
        </div>

        {/* SECCIÓN PARA SUBIR Y BORRAR FOTOS / VIDEOS (Paso 4) */}
        <SubirRecuerdoAdmin recuerdos={recuerdos} />

        {/* Lista de invitados */}
        <div className="bg-white border border-[#E6DDD0] rounded-2xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-[#E6DDD0]">
            <h2 className="font-serif text-2xl font-semibold text-[#18181B]">
              Lista de Invitados Confirmados
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E6DDD0] text-xs uppercase tracking-wider text-[#6E6259]">
                  <th className="py-3.5 px-4">Invitado / Familia</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4 text-center">Lugares</th>
                  <th className="py-3.5 px-4">Dedicatoria</th>
                  <th className="py-3.5 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DC] text-sm">
                {invitados.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-[#7A6F66]">
                      Aún no hay confirmaciones registradas en Neon.
                    </td>
                  </tr>
                ) : (
                  invitados.map((inv) => {
                    const eliminarConId = eliminarInvitado.bind(null, inv.id);
                    return (
                      <tr key={inv.id} className="hover:bg-[#FAF7F2]/60">
                        <td className="py-3.5 px-4 font-medium text-[#18181B]">
                          {inv.nombre}
                        </td>
                        <td className="py-3.5 px-4">
                          {inv.asistira ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Asistirá
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
                              No asiste
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center font-semibold">
                          {inv.asistira ? 1 + inv.acompanantes : 0}
                        </td>
                        <td className="py-3.5 px-4 text-[#5C534B] max-w-xs truncate">
                          {inv.mensaje || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <form action={eliminarConId}>
                            <button
                              type="submit"
                              title="Eliminar registro"
                              className="p-2 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}