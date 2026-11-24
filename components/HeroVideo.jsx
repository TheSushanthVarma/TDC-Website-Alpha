'use client';
import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const v = useRef(null);
  useEffect(() => {
    const el = v.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.pause(); return; }
    el.play().catch(() => {});
  }, []);
  return (
    <video ref={v} className="hero-video" autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg" aria-hidden="true">
      <source src="/hero.webm" type="video/webm" />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
