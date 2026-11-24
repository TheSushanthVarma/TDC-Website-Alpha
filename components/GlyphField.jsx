'use client';
import { useEffect, useRef } from 'react';

/*
  GlyphField — the hero's ASCII/glyph language, live.
  Each cell draws one glyph by intensity:  –  ·  ::  ×  ■
  Intensity = drifting value-noise field (+ optional cursor lens).

  props
    density  0..1   overall fill (default .5)
    speed           drift speed (default 1)
    cell            px per cell (default 22)
    lens            cursor raises glyphs near the pointer (default true)
    lensOnly        draw only inside the cursor lens (for overlays on images)
    shape           'field' | 'ring' | 'diag' | 'wave' | 'core'  — composition mask
    color           glyph colour (default #0F62FE)
*/

const hash = (x, y) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const smooth = (t) => t * t * (3 - 2 * t);
function noise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  const u = smooth(xf), v = smooth(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const fbm = (x, y) => noise(x, y) * 0.6 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.1;

function maskFor(shape, u, v, t) {
  switch (shape) {
    case 'ring': {
      const d = Math.hypot(u - 0.5, (v - 0.5) * 0.8);
      return Math.max(0, 1 - Math.abs(d - 0.32 - Math.sin(t * 0.6) * 0.02) * 7);
    }
    case 'diag': return Math.max(0, 1 - Math.abs(u - v * 0.9 - 0.05) * 2.4);
    case 'wave': return Math.max(0, 1 - Math.abs(v - 0.5 - Math.sin(u * 6 + t) * 0.18) * 4);
    case 'core': return Math.max(0, 1 - Math.hypot(u - 0.5, v - 0.5) * 2.1);
    default: return 1;
  }
}

export default function GlyphField({
  density = 0.5, speed = 1, cell = 22, lens = true, lensOnly = false,
  shape = 'field', color = '#0F62FE', className = '',
}) {
  const ref = useRef(null);
  const cfg = useRef({ density, shape });
  cfg.current = { density, shape };

  useEffect(() => {
    const cvs = ref.current;
    const ctx = cvs.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, last = 0;
    let t = Math.random() * 100;
    const mouse = { x: -9999, y: -9999, k: 0 };
    // eased per-cell shape blend so mode changes morph instead of snapping
    let blend = null, cols = 0, rows = 0;

    const size = () => {
      const r = cvs.getBoundingClientRect();
      dpr = Math.min(2, devicePixelRatio || 1);
      w = r.width; h = r.height;
      cvs.width = Math.round(w * dpr); cvs.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell) + 1; rows = Math.ceil(h / cell) + 1;
      blend = new Float32Array(cols * rows).fill(1);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color; ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1.4, cell * 0.075); ctx.lineCap = 'square';
      const { density: dn, shape: sh } = cfg.current;
      const lr = Math.max(140, Math.min(w, h) * 0.28);
      const g = cell * 0.5;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * cell, y = j * cell, u = x / w, v = y / h;
          const idx = j * cols + i;
          const target = maskFor(sh, u, v, t);
          blend[idx] += (target - blend[idx]) * 0.06;
          let val = fbm(i * 0.09 + t * 0.12, j * 0.09 - t * 0.07);
          val = (val - (1 - dn) * 0.55) * 1.6 * (0.25 + blend[idx] * 0.95);
          let L = 0;
          if (lens && mouse.k > 0.01) {
            const d = Math.hypot(x - mouse.x, y - mouse.y);
            L = Math.max(0, 1 - d / lr) * mouse.k;
            val += L * L * 1.1;
          }
          if (lensOnly && L <= 0.02) continue;
          const lvl = Math.min(4, Math.floor(val * 5));
          if (lvl < 0) continue;
          ctx.globalAlpha = lensOnly ? Math.min(1, L * 1.6) : (0.35 + lvl * 0.16);
          const cx = x + g, cy = y + g, s = cell * 0.22;
          if (lvl === 0) { ctx.globalAlpha *= 0.55; ctx.fillRect(cx - s, cy - 0.8, s * 2, 1.6); }
          else if (lvl === 1) { const d = cell * 0.09; ctx.fillRect(cx - d / 2, cy - d / 2, d, d); }
          else if (lvl === 2) {
            const d = cell * 0.1, o = cell * 0.13;
            ctx.fillRect(cx - o - d / 2, cy - o - d / 2, d, d); ctx.fillRect(cx + o - d / 2, cy - o - d / 2, d, d);
            ctx.fillRect(cx - o - d / 2, cy + o - d / 2, d, d); ctx.fillRect(cx + o - d / 2, cy + o - d / 2, d, d);
          } else if (lvl === 3) {
            ctx.beginPath(); ctx.moveTo(cx - s, cy - s); ctx.lineTo(cx + s, cy + s); ctx.moveTo(cx + s, cy - s); ctx.lineTo(cx - s, cy + s); ctx.stroke();
          } else { ctx.globalAlpha = 1; const q = cell * 0.36; ctx.fillRect(cx - q / 2, cy - q / 2, q, q); }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 40) return; // ~25fps is plenty for this look
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      t += dt * speed;
      mouse.k += ((mouse.in ? 1 : 0) - mouse.k) * 0.12;
      draw();
    };

    const onMove = (e) => {
      const r = cvs.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      mouse.in = mouse.x > -40 && mouse.y > -40 && mouse.x < r.width + 40 && mouse.y < r.height + 40;
    };
    const onLeave = () => { mouse.in = false; };

    size();
    const ro = new ResizeObserver(() => { size(); if (reduce) draw(); });
    ro.observe(cvs);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { rootMargin: '100px' });
    io.observe(cvs);
    if (reduce) draw();
    else { raf = requestAnimationFrame(loop); window.addEventListener('pointermove', onMove, { passive: true }); document.addEventListener('pointerleave', onLeave); }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave); };
  }, [cell, color, lens, lensOnly, speed]);

  return <canvas ref={ref} className={`glyph ${className}`} aria-hidden="true" />;
}
