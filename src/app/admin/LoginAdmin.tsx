'use client';
import Link from 'next/link';
import { useActionState, } from 'react';
import { Lock } from 'lucide-react';
import { iniciarSesionAdmin } from './actions';
import {
  ArrowLeft,
  CheckCircle2,
  LogOut,
  Trash2,
  Users,
  XCircle,
} from 'lucide-react';

export default function LoginAdmin() {
  const [state, formAction, isPending] = useActionState(iniciarSesionAdmin, null);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-[#E6DDD0] rounded-3xl shadow-md max-w-sm w-full overflow-hidden">
        <div className="h-2 w-full borde-chiapaneca" />
        <form action={formAction} className="p-8 space-y-5">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#FDF2F8] text-[#D61F69] flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-[#18181B]">
              Panel de Invitados
            </h1>
            <p className="text-xs text-[#6E6259] mt-1">
              Cumpleaños 64 · Abuelita Magdalena
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C534B] mb-1.5">
              Contraseña de acceso
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#D8CEC0] bg-[#FAF7F2] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D61F69]"
            />
          </div>

          {state?.error && (
            <p className="text-xs text-red-600 font-medium text-center">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white font-semibold py-3 text-sm transition-colors cursor-pointer"
          >
            {isPending ? 'Verificando...' : 'Entrar al Panel'}
          
            
          </button>
           <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D8CEC0] bg-white text-xs font-semibold text-[#3B332C] hover:bg-[#FAF7F2] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver a la invitación
            </Link>
        </form>
      </div>
    </div>
  );
}