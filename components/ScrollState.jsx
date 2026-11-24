'use client';
import { useEffect } from 'react';

// Adds `is-scrolled` to <html> after the first scroll so the header can dock to the top edge.
export default function ScrollState({ threshold = 8 }) {
  useEffect(() => {
    const el = document.documentElement;
    // is the header over a dark section? sample the page just below it
    const lum = (c) => { const m = c.match(/[\d.]+/g); if (!m || (m[3] !== undefined && +m[3] < 0.5)) return null; return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255; };
    const darkUnder = () => {
      const hdr = document.querySelector('.y-hdr-in');
    // set backdrop-filter inline: the CSS minifier drops the unprefixed property Chrome needs
    if (hdr) { hdr.style.setProperty('backdrop-filter', 'var(--glass-bf)'); hdr.style.setProperty('-webkit-backdrop-filter', 'var(--glass-bf)'); } if (!hdr) return false;
      const y = hdr.getBoundingClientRect().bottom + 2;
      for (const x of [innerWidth * 0.25, innerWidth * 0.75]) {
        let n = document.elementFromPoint(x, y);
        while (n && n !== document.documentElement) {
          if (n.closest('.y-hdr')) { n = null; break; }
          const tag = n.tagName;
          if (tag === 'IMG' || tag === 'CANVAS' || tag === 'VIDEO') { const sec = n.closest('section, footer'); if (sec) { n = sec; } }
          const v = lum(getComputedStyle(n).backgroundColor);
          if (v !== null) return v < 0.4;
          n = n.parentElement;
        }
      }
      return false;
    };
    let pending = false;
    const on = () => {
      el.classList.toggle('is-scrolled', scrollY > threshold);
      if (pending) return; pending = true;
      requestAnimationFrame(() => { pending = false; el.classList.toggle('hdr-dark', darkUnder()); });
    };
    on();
    addEventListener('scroll', on, { passive: true });
    const hdr = document.querySelector('.y-hdr-in');
    // set backdrop-filter inline: the CSS minifier drops the unprefixed property Chrome needs
    if (hdr) { hdr.style.setProperty('backdrop-filter', 'var(--glass-bf)'); hdr.style.setProperty('-webkit-backdrop-filter', 'var(--glass-bf)'); }
    return () => { removeEventListener('scroll', on); el.classList.remove('is-scrolled', 'hdr-dark'); };
  }, [threshold]);
  return null;
}
