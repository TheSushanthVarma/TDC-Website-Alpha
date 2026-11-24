'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROBLEMS } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

// C02 — three statements, one at a time, pinned while you scroll.
// Interactive: dots jump to a chapter, tags float with the pointer, progress fills as you scroll.
export default function Chapters() {
  const ref = useRef(null);
  const box = useRef(null);
  const st = useRef(null);
  const [on, setOn] = useState(0);
  const [prog, setProg] = useState(0);
  const N = PROBLEMS.length;

  useEffect(() => {
    st.current = ScrollTrigger.create({
      trigger: ref.current, start: 'top top', end: 'bottom bottom',
      onUpdate: (s) => { setProg(s.progress); setOn(Math.min(N - 1, Math.floor(s.progress * N))); },
    });
    return () => st.current?.kill();
  }, [N]);

  // pointer parallax on the tags
  useEffect(() => {
    const el = box.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tags = el.querySelectorAll('.chap-tag');
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      tags.forEach((t, i) => gsap.to(t, { x: x * (i % 2 ? -36 : 36), y: y * 28, duration: 0.8, ease: 'power3.out' }));
    };
    const leave = () => gsap.to(tags, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, []);

  const jump = (i) => {
    const s = st.current; if (!s) return;
    scrollTo({ top: s.start + (s.end - s.start) * ((i + 0.5) / N), behavior: 'smooth' });
  };
  const n = (i) => String(i).padStart(2, '0');

  return (
    <section className="chap" ref={ref} style={{ height: `${N * 100}vh` }} aria-label="The identity problem">
      <div className="chap-pin">
        <div className="wrap chap-wrap">
          <div className="chap-box" ref={box}>
            <div className="chap-top">
              <div className="s-meta"><span className="idx">03</span><span className="t-cap">The identity problem</span></div>
              <div className="chap-count"><b>{n(on + 1)}</b> / {n(N)}</div>
            </div>
            <div className="chap-stage">
              {PROBLEMS.map((p, i) => (
                <div key={p.h} className={`chap-i${i === on ? ' on' : ''}${i < on ? ' past' : ''}`} aria-hidden={i !== on}>
                  <span className="chap-tag l"><em />{p.tags[0]}</span>
                  <div className="chap-m">
                    <h2 className="t-h2">{p.h}</h2>
                    <p className="t-body-l muted">{p.s}</p>
                  </div>
                  <span className="chap-tag r"><em />{p.tags[1]}</span>
                </div>
              ))}
            </div>
            <div className="chap-nav">
              {PROBLEMS.map((p, i) => (
                <button key={p.h} className={i === on ? 'on' : ''} onClick={() => jump(i)} aria-label={`Show statement ${i + 1}`}>
                  <span className="cn-n">{n(i + 1)}</span>
                  <span className="cn-bar"><i style={{ transform: `scaleX(${Math.max(0, Math.min(1, prog * N - i))})` }} /></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
