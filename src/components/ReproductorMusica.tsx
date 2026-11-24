'use client';

import { useEffect, useRef, useState } from 'react';
import { Music, Pause, Play } from 'lucide-react';
import SobreEntrada from './SobreEntrada';

export default function ReproductorMusica({
  src = '/musica.mp3',
}: {
  src?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [reproduciendo, setReproduciendo] = useState(false);

  // Guarda si el usuario quiere la música activa (no la pausó manualmente con el botón)
  const musicaActivaPorUsuarioRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Pausar al salir de la pestaña / bloquear pantalla y reanudar al volver
    const manejarVisibilidad = () => {
      if (document.hidden) {
        if (!audio.paused) {
          audio.pause();
          setReproduciendo(false);
        }
      } else if (musicaActivaPorUsuarioRef.current) {
        audio
          .play()
          .then(() => setReproduciendo(true))
          .catch(() => {});
      }
    };

    // 2. Pausar música cuando empieza un <video> de la galería
    const alReproducirVideo = (e: Event) => {
      const objetivo = e.target as HTMLElement | null;
      if (objetivo && objetivo.tagName === 'VIDEO') {
        if (!audio.paused) {
          audio.pause();
          setReproduciendo(false);
        }
      }
    };

    // 3. Reanudar música cuando el <video> se pausa o termina
    const alDetenerVideo = (e: Event) => {
      const objetivo = e.target as HTMLElement | null;
      if (objetivo && objetivo.tagName === 'VIDEO') {
        // Verifica que no haya otro video reproduciéndose al mismo tiempo
        const otrosVideosSonando = Array.from(
          document.querySelectorAll('video')
        ).some((v) => !v.paused && !v.ended);

        if (!otrosVideosSonando && musicaActivaPorUsuarioRef.current && !document.hidden) {
          audio
            .play()
            .then(() => setReproduciendo(true))
            .catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', manejarVisibilidad);
    // El tercer parámetro "true" (capture) es clave porque play/pause en <video> no hacen burbujeo
    document.addEventListener('play', alReproducirVideo, true);
    document.addEventListener('pause', alDetenerVideo, true);
    document.addEventListener('ended', alDetenerVideo, true);

    return () => {
      document.removeEventListener('visibilitychange', manejarVisibilidad);
      document.removeEventListener('play', alReproducirVideo, true);
      document.removeEventListener('pause', alDetenerVideo, true);
      document.removeEventListener('ended', alDetenerVideo, true);
    };
  }, []);

  const iniciarMusica = () => {
    const audio = audioRef.current;
    if (!audio) return;

    musicaActivaPorUsuarioRef.current = true;
    audio.volume = 0.5;
    audio
      .play()
      .then(() => setReproduciendo(true))
      .catch((err) => console.error('No se pudo reproducir:', err));
  };

  const alternarMusica = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      musicaActivaPorUsuarioRef.current = false;
      audio.pause();
      setReproduciendo(false);
    } else {
      musicaActivaPorUsuarioRef.current = true;
      audio
        .play()
        .then(() => setReproduciendo(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      <SobreEntrada onAbrir={iniciarMusica} />

      <button
        type="button"
        onClick={alternarMusica}
        aria-label={reproduciendo ? 'Pausar música' : 'Reproducir música'}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#18181B]/95 hover:bg-[#D61F69] text-[#FAF7F2] border border-[#EAB308]/60 px-4 py-2.5 shadow-xl backdrop-blur-xs transition-all cursor-pointer active:scale-95"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D61F69]/25 text-[#EAB308]">
          <Music className={`w-3.5 h-3.5 ${reproduciendo ? 'animate-pulse' : ''}`} />
        </span>

        <span className="text-xs font-semibold tracking-wide">
          {reproduciendo ? 'Sonando' : 'Música'}
        </span>

        {reproduciendo ? (
          <Pause className="w-3.5 h-3.5 text-[#EAB308]" />
        ) : (
          <Play className="w-3.5 h-3.5 text-[#EAB308] fill-[#EAB308]" />
        )}
      </button>
    </>
  );
}