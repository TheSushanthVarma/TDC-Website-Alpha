'use client';
import { useRef, useState } from 'react';
import SolMedia from './SolMedia';

// C03 — full-width tab bar. Panel: H3, short copy, three outcomes, one button, a visual.
// Arrow keys move between tabs (WAI-ARIA tabs pattern).
export default function Tabs({ items, anim, idBase = 'tab' }) {
  const [on, setOn] = useState(0);
  const refs = useRef([]);
  const key = (e, i) => {
    const n = items.length;
    const to = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault(); setOn(to); refs.current[to]?.focus();
  };
  const [t, h, p, list, btn] = items[on];
  return (
    <div className="pg-tabs">
      <div className="pg-tablist" role="tablist">
        {items.map(([label], i) => (
          <button key={label} ref={(el) => { refs.current[i] = el; }} role="tab" id={`${idBase}-t${i}`} aria-controls={`${idBase}-p`} aria-selected={on === i} tabIndex={on === i ? 0 : -1}
            className={on === i ? 'on' : ''} onClick={() => setOn(i)} onKeyDown={(e) => key(e, i)}>{label}</button>
        ))}
      </div>
      <div className="pg-tabpanel" role="tabpanel" id={`${idBase}-p`} aria-labelledby={`${idBase}-t${on}`} key={on}>
        <div className="pg-tab-copy">
          <h3>{h}</h3>
          <p>{p}</p>
          <ul>{list.map((x) => <li key={x}>{x}</li>)}</ul>
          <a href={btn?.[1] || '/#contact'} className="y-btn dark sm">{btn?.[0] || `Explore ${t.toLowerCase()}`} <span>→</span></a>
        </div>
        <div className="pg-tab-vis" data-play>
          <SolMedia src={anim[on % anim.length]} className="pg-tab-v" />
        </div>
      </div>
    </div>
  );
}
