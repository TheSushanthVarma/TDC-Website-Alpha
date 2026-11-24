'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MENU } from '../lib/site';
import PixelButton from './PixelButton';
import MobileMenu from './MobileMenu';

/*
  Site header with mega-menu dropdowns.
  - Hover opens after a short intent delay; leaving the header closes it.
  - Click / Enter / Space toggles; ArrowDown opens and moves into the panel.
  - Escape closes and returns focus to the trigger; tabbing out closes.
  Motion: fade + 6px rise, 180ms ease-out.
*/
export default function SiteHeader({ cta = 'Talk to an expert', ctaHref = '/#contact' }) {
  const [open, setOpen] = useState(-1);
  const root = useRef(null);
  const timer = useRef(0);
  const btns = useRef([]);

  useEffect(() => {
    document.documentElement.classList.toggle('mega-open', open > -1);
    if (open < 0) return;
    const key = (e) => {
      if (e.key === 'Escape') { const i = open; setOpen(-1); btns.current[i]?.focus(); }
    };
    const out = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(-1); };
    addEventListener('keydown', key);
    addEventListener('pointerdown', out);
    return () => { removeEventListener('keydown', key); removeEventListener('pointerdown', out); };
  }, [open]);
  useEffect(() => () => document.documentElement.classList.remove('mega-open'), []);

  const hoverable = () => typeof matchMedia !== 'undefined' && matchMedia('(hover: hover)').matches;
  const enter = (i) => { if (!hoverable()) return; clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(i), open > -1 ? 0 : 90); };
  const leave = () => { if (!hoverable()) return; clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(-1), 160); };
  const stay = () => clearTimeout(timer.current);

  const onTriggerKey = (e, i) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); setOpen(i);
      requestAnimationFrame(() => root.current?.querySelector(`#mega-${i} a`)?.focus());
    }
  };
  const onPanelBlur = (e) => { if (!root.current?.contains(e.relatedTarget)) setOpen(-1); };

  return (
    <header className="y-hdr" ref={root} onMouseLeave={leave} onMouseEnter={stay}>
      <div className="y-hdr-in">
        <Link href="/" className="y-brand"><img className="lb" src="/logo.svg" alt="TechDemocracy" /><img className="lw" src="/logo-white.svg" alt="" aria-hidden="true" /></Link>
        <nav className="y-nav" aria-label="Main">
          {MENU.map((m, i) => (
            <button key={m.label} ref={(el) => { btns.current[i] = el; }} type="button" className={`y-nav-b${open === i ? ' on' : ''}`}
              aria-expanded={open === i} aria-controls={`mega-${i}`}
              onClick={() => setOpen(open === i ? -1 : i)} onMouseEnter={() => enter(i)} onKeyDown={(e) => onTriggerKey(e, i)}>
              {m.label}<i aria-hidden="true">▾</i>
            </button>
          ))}
          <Link href="/ai-identity-security" className="y-nav-ai" onMouseEnter={() => enter(-1)}>AI identity security</Link>
        </nav>
        <div className="y-hdr-r">
          <PixelButton href={ctaHref} variant="blue" size="sm">{cta}</PixelButton>
          <a href={ctaHref} className="y-btn dark sm">Contact</a>
          <MobileMenu />
        </div>
      </div>

      {MENU.map((m, i) => (
        <div key={m.label} id={`mega-${i}`} className={`mega${open === i ? ' on' : ''}`} hidden={open !== i} onBlur={onPanelBlur}>
          <div className="mega-in">
            <div className="mega-cols" style={{ '--n': m.cols.length }}>
              {m.cols.map((c) => (
                <div key={c.h} className="mega-col">
                  <span className="mega-h">{c.h}</span>
                  <ul>
                    {c.items.map((it) => (
                      <li key={it.href}>
                        <Link href={it.href} onClick={() => setOpen(-1)} {...(it.ext ? { target: '_blank', rel: 'noopener' } : {})}>
                          <b>{it.label}{it.ext && <span className="mega-ext" aria-label="(opens the current site)"> ↗</span>}</b>
                          <span>{it.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link href={m.feature.href} className="mega-feat" onClick={() => setOpen(-1)}>
              <img src={m.feature.img} alt="" loading="lazy" />
              <span className="mega-feat-e">{m.feature.eyebrow}</span>
              <b>{m.feature.h}</b>
              <p>{m.feature.p}</p>
              <span className="mega-feat-a">{m.feature.cta} <i aria-hidden="true">→</i></span>
            </Link>
          </div>
        </div>
      ))}
    </header>
  );
}
