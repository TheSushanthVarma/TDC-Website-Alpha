'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MODEL } from '../lib/content';
gsap.registerPlugin(ScrollTrigger);

// Advise → Implement → Run; the beam fills as you scroll and lights each stage.
export default function Timeline() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--p', 1); el.querySelectorAll('.tl-stage').forEach((s) => s.classList.add('lit')); return; }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 75%', end: 'bottom 55%', scrub: 0.6,
      onUpdate: (s) => {
        el.style.setProperty('--p', s.progress);
        el.querySelectorAll('.tl-stage').forEach((x, i, a) => x.classList.toggle('lit', s.progress >= i / a.length + 0.02));
      } });
    return () => st.kill();
  }, []);
  return (
    <div className="tl" ref={ref}>
      <div className="tl-beam"><i /></div>
      {MODEL.layers.map(([t, nodes, time], i) => (
        <div className="tl-stage" key={t}>
          <span className="tl-dot" />
          <span className="mono">{String(i + 1).padStart(2, '0')} · {time}</span>
          <h3>{t}</h3>
          <div className="tl-nodes">{nodes.map((x) => <span key={x} className="tg">{x}</span>)}</div>
        </div>
      ))}
    </div>
  );
}
