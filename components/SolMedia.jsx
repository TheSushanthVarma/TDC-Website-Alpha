'use client';
import { useEffect, useRef } from 'react';

/*
  Solution card animation. Rests on a still frame (the fully formed icon) and
  plays only while its card is hovered or keyboard-focused. On touch screens it
  plays while the card is in the middle of the screen. Never plays with reduced motion.
*/
export default function SolMedia({ src, className = "z-acc-v" }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    const card = v?.closest('.z-acc-p, [data-play]');
    if (!v || !card) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const play = () => { v.play().catch(() => {}); };
    const stop = () => { v.pause(); v.currentTime = 0; };
    if (matchMedia('(hover: hover)').matches) {
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focusin', play);
      card.addEventListener('focusout', stop);
      return () => {
        card.removeEventListener('mouseenter', play);
        card.removeEventListener('mouseleave', stop);
        card.removeEventListener('focusin', play);
        card.removeEventListener('focusout', stop);
      };
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : stop()), { rootMargin: '-30% 0px -30% 0px' });
    io.observe(card);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} className={className} muted loop playsInline preload="metadata" poster={`${src}-still.webp`} aria-hidden="true" tabIndex={-1}>
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
