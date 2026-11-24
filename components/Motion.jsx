'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
const once = (trigger, start = 'top 86%') => ({ trigger, start, once: true });

export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const $ = (s) => gsap.utils.toArray(s);
      // hero
      $('[data-hero-line]').forEach((el, i) => SplitText.create(el, { type: 'words,chars', mask: 'chars', autoSplit: true,
        onSplit: (s) => gsap.from(s.chars, { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.025, delay: 0.15 + i * 0.12 }) }));
      gsap.from('[data-hero-in]', { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.6 });
      gsap.from('.hero-band', { clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'expo.inOut', delay: 0.4 });
      gsap.from('.console', { y: 40, autoAlpha: 0, duration: 1, ease: 'power3.out', delay: 1.2 });
      gsap.from('.console .c-row', { x: 16, autoAlpha: 0, duration: 0.5, stagger: 0.08, delay: 1.5 });
      // rules draw
      $('[data-rule]').forEach((el) => gsap.from(el, { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'expo.out', scrollTrigger: once(el, 'top 92%') }));
      // headings
      $('[data-split]').forEach((el) => SplitText.create(el, { type: 'lines,words', mask: 'lines', autoSplit: true,
        onSplit: (s) => gsap.from(s.words, { yPercent: 110, duration: 1, ease: 'power4.out', stagger: 0.03, scrollTrigger: once(el) }) }));
      // groups
      $('[data-group]').forEach((g) => gsap.from(g.querySelectorAll('[data-it]'), { y: 32, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, clearProps: 'transform,opacity,visibility', scrollTrigger: once(g, 'top 84%') }));
      $('[data-rv]').forEach((el) => gsap.from(el, { y: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity,visibility', scrollTrigger: once(el, 'top 90%') }));
      // counter
      $('[data-count]').forEach((el) => { const n = +el.dataset.count, o = { v: 0 };
        gsap.to(o, { v: n, duration: 1.8, ease: 'power2.out', scrollTrigger: once(el), onUpdate: () => { el.textContent = Math.round(o.v); } }); });
    });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  });
  return null;
}
