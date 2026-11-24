'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { SERVICES } from '../lib/content';

// Floating data card per service — small proof that sits on the image panel (sample figures).
const CARD = [
  ['Roadmap', [['Phase 1 · Foundations', 'Wk 1–6'], ['Phase 2 · Governance', 'Q2'], ['Phase 3 · Automation', 'Q3']]],
  ['Rollout', [['Connectors live', '42'], ['Roles modelled', '318'], ['Go-live', 'Wk 12']]],
  ['Platform health', [['Uptime', '99.98%'], ['Upgrades', 'On calendar'], ['SLA met', '100%']]],
  ['This month', [['Tickets resolved', '1,240'], ['Avg. response', '14 min'], ['Audit pack', 'Delivered']]],
  ['Agents found', [['Copilots', '31'], ['Custom agents', '44'], ['Without owner', '11']]],
];

export default function ServiceTabs() {
  const [on, setOn] = useState(0);
  const panel = useRef(null);
  const pick = (i) => {
    if (i === on) return;
    setOn(i);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      gsap.fromTo(panel.current.children, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
  };
  const s = SERVICES[on];
  const [ct, rows] = CARD[on];
  return (
    <div className="st">
      <div className="st-bar" role="tablist" aria-label="Services">
        {SERVICES.map((x, i) => (
          <button key={x.t} role="tab" aria-selected={i === on} className={i === on ? 'on' : ''} onClick={() => pick(i)}>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>{x.t}
          </button>
        ))}
      </div>
      <div className="st-panel" ref={panel} role="tabpanel">
        <div className="st-media">
          <img key={s.img} src={s.img} alt="" />
          <div className="st-card">
            <span className="st-card-h">{ct}</span>
            {rows.map(([a, b]) => <div key={a} className="st-card-r"><span>{a}</span><b>{b}</b></div>)}
          </div>
        </div>
        <div className="st-body">
          <span className="eyebrow">{s.t}</span>
          <h3>{s.h}</h3>
          <p>{s.d}</p>
          <ul className="st-checks">{s.checks.map((c) => <li key={c}><i aria-hidden="true">✓</i>{c}</li>)}</ul>
          <div className="y-btns">
            <a href="#" className="y-btn dark">Explore {s.t.toLowerCase()} <span>→</span></a>
            <a href="#contact" className="y-btn soft">Talk to an expert <span>→</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}
