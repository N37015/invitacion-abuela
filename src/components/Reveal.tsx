'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
}

/** Aparece suavemente al hacer scroll. Se puede usar dentro de páginas de servidor. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  className,
}: RevealProps) {
  const reducir = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducir ? false : { opacity: 0, y, x, scale: scale === 1 ? 1 : 0.92 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
