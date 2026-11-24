'use client';
import { useEffect, useRef, useState } from 'react';
import { PROBLEMS } from '../lib/content';
import { mountIso } from '../lib/isoEstate';

/*
  The identity problem — a pinned, scroll-driven story drawn in the site's glyph language.
  Chapter 1: people, then machine identities flood the estate.
  Chapter 2: unreviewed grants turn amber faster than the review sweep can clear them.
  Chapter 3: AI agents light up and draw live access lines into production data.
  All figures are illustrative.
*/
const N = PROBLEMS.length;
const COLORS = { human: '#FFFFFF', machine: '#0F62FE', machine2: '#4589FF', stale: '#F1C21B', agent: '#78A9FF', dim: 'rgba(255,255,255,.07)' };
const COUNTS = [
  // [label, start, end per chapter]
  ['People', [1200, 1200, 1200]],
  ['Machine identities', [54000, 54000, 54000]],
  ['Unreviewed grants', [0, 18400, 18400]],
  ['AI agents with prod access', [0, 0, 86]],
];

function rnd(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }

export default function ProblemStage() {
  const wrap = useRef(null);
  const cvs = useRef(null);
  const prog = useRef(0);
  const [p, setP] = useState(0);
  const [reduce, setReduce] = useState(false);

  // scroll progress through the pinned section
  useEffect(() => {
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(max-width: 671px)').matches; // phones: stacked chapters, no pin
    setReduce(rm);
    if (rm) { prog.current = 1; setP(1); return; }
    const onScroll = () => {
      const r = wrap.current.getBoundingClientRect();
      const total = r.height - innerHeight;
      const v = Math.min(1, Math.max(0, -r.top / total));
      prog.current = v; setP(v);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); };
  }, []);

  // isometric estate canvas
  useEffect(() => mountIso(cvs.current, () => prog.current, { still: reduce }), [reduce]);

  const P = p * N, ch = Math.min(N - 1, Math.floor(P)), local = P - ch;
  const fmt = (v) => v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : `${Math.round(v)}`;
  const value = (arr) => {
    const from = ch === 0 ? 0 : arr[ch - 1] ?? arr[arr.length - 1];
    const to = arr[ch] ?? arr[arr.length - 1];
    const e = Math.min(1, local * 1.3);
    return from + (to - from) * e;
  };
  const jump = (i) => {
    const r = wrap.current.getBoundingClientRect(), top = scrollY + r.top, total = r.height - innerHeight;
    scrollTo({ top: top + total * ((i + 0.55) / N), behavior: 'smooth' });
  };

  return (
    <section className={`ps${reduce ? ' static' : ''}`} ref={wrap} style={{ height: reduce ? 'auto' : `${N * 60 + 40}vh` }} aria-label="The identity problem">
      <div className="ps-pin">
        <canvas ref={cvs} className="ps-canvas" aria-hidden="true" />
        <div className="ps-shade" />
        <div className="ps-ui">
          <div className="ps-copy">
            <span className="eyebrow light">The identity problem</span>
            <div className="ps-stage">
              {PROBLEMS.map((q, i) => (
                <div key={q.h} className={`ps-ch${i === ch ? ' on' : ''}${i < ch ? ' past' : ''}`} aria-hidden={i !== ch}>
                  <span className="ps-num">{String(i + 1).padStart(2, '0')}<i>/ {String(N).padStart(2, '0')}</i></span>
                  <h2>{q.h}</h2>
                  <p>{q.s}</p>
                </div>
              ))}
            </div>
            <div className="ps-nav">
              {PROBLEMS.map((q, i) => (
                <button key={q.h} onClick={() => jump(i)} className={i === ch ? 'on' : ''} aria-label={`Chapter ${i + 1}`}>
                  <span className="ps-nav-bar"><i style={{ transform: `scaleX(${Math.max(0, Math.min(1, P - i))})` }} /></span>
                  <span className="ps-nav-t">{['Sprawl', 'Drift', 'Agents'][i]}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="ps-counters" aria-label="Illustrative estate">
            <span className="ps-cap">Illustrative estate · live</span>
            {COUNTS.map(([l, arr], i) => {
              const v = value(arr);
              const lit = i === 0 || (i === 1 && P > 0.15) || (i === 2 && ch >= 1) || (i === 3 && ch >= 2);
              return (
                <div key={l} className={`ps-c c${i}${lit ? ' lit' : ''}`}>
                  <b>{fmt(v)}</b><span>{l}</span>
                </div>
              );
            })}
            <div className="ps-legend">
              <span><i className="lg-h" />Person</span><span><i className="lg-m" />Machine identity</span>
              <span><i className="lg-s" />Unreviewed access</span><span><i className="lg-a" />AI agent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
