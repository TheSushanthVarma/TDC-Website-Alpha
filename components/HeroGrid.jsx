'use client';
import { useEffect, useRef } from 'react';

/*
  Hero backdrop: a faint square grid. Cells under the pointer fill with a soft
  accent tint and fade out behind it (ease-out, ~250ms). Idle = no drawing.
*/
const S = 56;
export default function HeroGrid() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, host = c?.parentElement;
    if (!c || !host) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover)').matches) return;
    const ctx = c.getContext('2d');
    let w = 0, h = 0, cols = 0, ox = 0, raf = 0, px = -1e4, py = -1e4, over = false;
    const v = new Map();
    const size = () => {
      const r = host.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
      w = r.width; h = r.height; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      ox = ((w / 2) % S); cols = Math.ceil(w / S) + 1;
    };
    const tick = () => {
      if (over) {
        const cx = Math.floor((px - ox) / S), cy = Math.floor(py / S);
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const key = (cy + dy) * 1000 + (cx + dx);
          const t = dx === 0 && dy === 0 ? 0.16 : (dx && dy ? 0.04 : 0.08);
          v.set(key, Math.max(v.get(key) || 0, t));
        }
      }
      ctx.clearRect(0, 0, w, h);
      for (const [key, a] of v) {
        const na = a * 0.86;                       // fade ≈250ms
        if (na < 0.004) { v.delete(key); continue; }
        v.set(key, na);
        const cy = Math.floor(key / 1000), cx = key - cy * 1000;
        ctx.fillStyle = `rgba(15,98,254,${na.toFixed(3)})`;
        ctx.fillRect(ox + cx * S + 1, cy * S + 1, S - 1, S - 1);
      }
      raf = v.size || over ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e) => { const r = host.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; over = true; kick(); };
    const leave = () => { over = false; kick(); };
    size();
    const ro = new ResizeObserver(size); ro.observe(host);
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); };
  }, []);
  return <canvas ref={ref} className="h2-cv" aria-hidden="true" />;
}
