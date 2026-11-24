'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import Pattern from './Pattern';
import { SERVICES } from '../lib/content';

// C03 — one tab per service, panel = visual + outcome list + link.
export default function Services() {
  const [on, setOn] = useState(0);
  const panel = useRef(null);
  const pick = (i) => {
    if (i === on) return;
    gsap.fromTo(panel.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    setOn(i);
  };
  const s = SERVICES[on];
  return (
    <>
      <div className="tabbar" role="tablist">
        {SERVICES.map((x, i) => (
          <button key={x.t} role="tab" aria-selected={i === on} className={i === on ? 'on' : ''} onClick={() => pick(i)}>
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>{x.t}
          </button>
        ))}
      </div>
      <div className="grid tab-panel" ref={panel} role="tabpanel">
        <div className="l-1-9 tab-vis">{s.img
          ? <div className="vis-img" key={s.img}><img src={s.img} alt="" /></div>
          : <Pattern key={s.piece} piece={s.piece} theme="navy" />}</div>
        <div className="l-10-17 tab-body">
          <h3 className="t-h3">{s.h}</h3>
          <p className="t-body-l muted">{s.d}</p>
          <ul className="checks">{s.checks.map((c) => <li key={c}>{c}</li>)}</ul>
          <a href="#" className="btn">Explore {s.t.toLowerCase()} <span>→</span></a>
        </div>
      </div>
    </>
  );
}
