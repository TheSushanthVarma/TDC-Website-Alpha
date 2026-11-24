'use client';
import { useEffect } from 'react';

// Feeds --mx/--my to every [data-glow] card so its border/halo follows the cursor.
export default function Glow() {
  useEffect(() => {
    if (matchMedia('(hover: none)').matches) return;
    const move = (e) => {
      for (const el of document.querySelectorAll('[data-glow]')) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, []);
  return null;
}
