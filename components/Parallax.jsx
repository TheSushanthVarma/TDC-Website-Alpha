'use client';
import { useEffect } from 'react';

/*
  Space-drift parallax: images move slower than the page and ease toward their
  target, so they feel suspended. Each image is slightly over-scaled inside its
  frame (overflow hidden) so the drift never reveals an edge.
  Uses the independent `translate`/`scale` properties so hover `transform` zooms still work.
*/
const TARGETS = [
  // [selector, strength in % of the image height]
  // kept to the large, full-bleed images only — small cards stay still
  ['.y-hero-img', 6],
  ['.z-acc-p > img', 5],
  ['.y-cta-img', 6],
];

export default function Parallax() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mobile = matchMedia('(max-width: 671px)').matches;
    let items = [];
    const collect = () => {
      items = [];
      for (const [sel, str] of TARGETS) {
        document.querySelectorAll(sel).forEach((img) => {
          const s = mobile ? str * 0.6 : str;
          img.style.scale = String(1 + (s * 2.2) / 100);
          img.style.willChange = 'translate';
          items.push({ img, frame: img.parentElement, s, cur: 0 });
        });
      }
    };
    collect();
    let raf;
    const loop = () => {
      const vh = innerHeight;
      for (const it of items) {
        const r = it.frame.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        // -1 when the frame's centre is at the bottom of the screen, +1 at the top
        const d = Math.max(-1.4, Math.min(1.4, (vh / 2 - (r.top + r.height / 2)) / vh));
        const target = d * it.s;
        it.cur += (target - it.cur) * 0.085;            // eased lag = "floating" feel
        if (Math.abs(target - it.cur) > 0.005) it.img.style.translate = `0 ${it.cur.toFixed(3)}%`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const mo = new MutationObserver(() => collect());     // images added by tabs / lazy content
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { cancelAnimationFrame(raf); mo.disconnect(); items.forEach(({ img }) => { img.style.translate = ''; img.style.scale = ''; }); };
  }, []);
  return null;
}
