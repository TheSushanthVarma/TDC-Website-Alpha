'use client';
import { useEffect } from 'react';

/*
  Eased wheel scrolling on top of native scroll. The page still scrolls natively
  (position: sticky, ScrollTrigger and the parallax keep working); we only
  interpolate the wheel/trackpad input. Touch devices and reduced motion keep native scrolling.
*/
export default function SmoothScroll({ ease = 0.16 }) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (matchMedia('(hover: none), (pointer: coarse)').matches) return;

    let target = scrollY, cur = scrollY, raf = 0, ours = false;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const clamp = (v) => Math.max(0, Math.min(max(), v));

    const loop = () => {
      cur += (target - cur) * ease;
      if (Math.abs(target - cur) < 0.4) cur = target;
      ours = true; scrollTo(0, cur); ours = false;
      raf = cur === target ? 0 : requestAnimationFrame(loop);
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const scrollable = (el) => {
      for (; el && el !== document.body; el = el.parentElement) {
        const s = getComputedStyle(el);
        if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight) return true;
      }
      return false;
    };

    const onWheel = (e) => {
      if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY) || scrollable(e.target)) return;
      e.preventDefault();
      const d = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
      if (!raf) cur = scrollY;
      target = clamp(target + d);
      go();
    };
    // keyboard, scrollbar drag, find-in-page, programmatic scroll: resync
    const onScroll = () => { if (!ours && !raf) { target = cur = scrollY; } };
    // in-page anchors glide too
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      cur = scrollY; target = clamp(el.getBoundingClientRect().top + scrollY - 72); go();
      el.focus({ preventScroll: true }); // keep keyboard/screen-reader position in sync (skip link, #contact)
    };
    // any other code asking for a smooth scrollTo (chapter tabs, back-to-top) uses the same easing
    const native = window.scrollTo.bind(window);
    window.scrollTo = (a, b) => {
      if (a && typeof a === 'object' && a.behavior === 'smooth') { cur = scrollY; target = clamp(a.top ?? scrollY); go(); return; }
      native(a, b);
    };

    addEventListener('wheel', onWheel, { passive: false });
    addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf); window.scrollTo = native;
      removeEventListener('wheel', onWheel); removeEventListener('scroll', onScroll); document.removeEventListener('click', onClick);
    };
  }, [ease]);
  return null;
}
