'use client';
import { useEffect, useRef, useState } from 'react';

// C20 — sticky in-page links that match the H2s below; highlights the section in view.
export default function AnchorNav({ items, cta = ['Talk to an expert', '/#contact'] }) {
  const [on, setOn] = useState(items[0]?.[1]);
  const bar = useRef(null);
  useEffect(() => {
    const secs = items.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setOn(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);
  useEffect(() => {   // keep the active link visible on narrow screens
    const a = bar.current?.querySelector('a.on');
    a?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [on]);
  return (
    <nav className="pg-anchor" aria-label="On this page">
      <div className="pg-anchor-in" ref={bar}>
        <ul>{items.map(([t, id]) => <li key={id}><a href={`#${id}`} className={on === id ? 'on' : ''} aria-current={on === id ? 'location' : undefined}>{t}</a></li>)}</ul>
        <a href={cta[1]} className="y-btn blue sm pg-anchor-cta">{cta[0]}</a>
      </div>
    </nav>
  );
}
