'use client';
import { useEffect, useRef } from 'react';

/*
  Signature CTA: chamfered button with a pixel-mosaic texture.
  At rest the mosaic is a quiet, fixed pattern. Under the pointer the nearby
  cells brighten and settle back as it leaves (ease-out, ~250ms). Draws only
  while something is changing; static with reduced motion.
*/
const CELL = 7, GAP = 2;

export default function PixelButton({ href = '#', variant = 'blue', size, className = '', children, ...rest }) {
  const btn = useRef(null), cvs = useRef(null);
  useEffect(() => {
    const el = btn.current, c = cvs.current;
    if (!el || !c) return;
    const ctx = c.getContext('2d');
    const ink = variant === 'light' ? '15,98,254' : '255,255,255';
    const baseMax = variant === 'blue' ? 0.13 : variant === 'glass' ? 0.05 : 0.035;
    const hotMax = variant === 'blue' ? 0.3 : variant === 'glass' ? 0.2 : 0.14;
    let cells = [], w = 0, h = 0, raf = 0, px = -999, py = -999, over = false;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const size = () => {
      const r = el.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
      w = r.width; h = r.height; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      cells = []; seed = 7;
      for (let y = 1; y < h; y += CELL + GAP) for (let x = 1; x < w; x += CELL + GAP) {
        const b = rnd(); cells.push({ x, y, b: b < 0.4 ? 0 : b * baseMax, d: variant === 'blue' && rnd() < 0.18 ? 0.12 : 0, v: 0 });
      }
      draw();
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const k of cells) {
        if (k.d) { ctx.fillStyle = `rgba(0,24,110,${k.d})`; ctx.fillRect(k.x, k.y, CELL, CELL); }
        const a = k.b + k.v;
        if (a < 0.005) continue;
        ctx.fillStyle = `rgba(${ink},${a.toFixed(3)})`;
        ctx.fillRect(k.x, k.y, CELL, CELL);
      }
    };
    const tick = () => {
      let moving = false;
      for (const k of cells) {
        let t = 0;
        if (over) {
          const d = Math.hypot(k.x + CELL / 2 - px, k.y + CELL / 2 - py);
          t = d < 46 ? (1 - d / 46) * hotMax * (0.55 + 0.45 * ((k.x * 13 + k.y * 7) % 10) / 10) : 0;
        }
        const nv = k.v + (t - k.v) * 0.22;           // ≈250ms ease-out at 60fps
        if (Math.abs(nv - k.v) > 0.002) moving = true;
        k.v = Math.abs(nv) < 0.002 ? 0 : nv;
      }
      draw();
      raf = moving || over ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf && !reduce) raf = requestAnimationFrame(tick); };
    const move = (e) => { const r = el.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; over = true; kick(); };
    const leave = () => { over = false; kick(); };
    const focus = () => { px = w * 0.3; py = h / 2; over = true; kick(); };
    size();
    const ro = new ResizeObserver(size); ro.observe(el);
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    el.addEventListener('focus', focus); el.addEventListener('blur', leave);
    return () => { ro.disconnect(); cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave);
      el.removeEventListener('focus', focus); el.removeEventListener('blur', leave); };
  }, [variant]);
  return (
    <a ref={btn} href={href} className={`y-btn px-btn ${variant}${size ? ` ${size}` : ''} ${className}`} {...rest}>
      <canvas ref={cvs} className="px-c" aria-hidden="true" />
      <span className="px-t">{children}</span>
    </a>
  );
}
