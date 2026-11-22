import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abuelita-ashen.vercel.app/'),
  title: 'Mis 64 Años · Magdalena Pacheco Roblero',
  description:
    'Acompáñanos a celebrar los 64 años de nuestra querida abuelita Magdalena este sábado 23 de enero de 2027 en el Salón Jardín Guadalupe.',
  openGraph: {
    title: 'Mis 64 Años · Magdalena Pacheco Roblero',
    description:
      'Sábado 23 de enero de 2027 · 4:00 PM · Salón Jardín Guadalupe, Ocozocoautla, Chiapas.',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-marfil text-[#1F1B18] font-sans antialiased selection:bg-bugambilia/20">
        {children}
      </body>
    </html>
  );
}