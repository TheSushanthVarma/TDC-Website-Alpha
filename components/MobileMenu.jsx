'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { MENU } from '../lib/site';

// Full-screen menu for tablet and phone (the inline nav is hidden below 1056px). Same links as the mega menu.
const GROUPS = MENU.map((m) => [m.label, m.cols.flatMap((c) => c.items)]);

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(-1);
  const btn = useRef(null);
  const panel = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const first = panel.current?.querySelector('a,button');
    first?.focus();
    const key = (e) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); }
      if (e.key === 'Tab' && panel.current) {           // keep focus inside the menu
        const f = [...panel.current.querySelectorAll('a,button')];
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, [open]);

  const close = () => setOpen(false);
  return (
    <>
      <button ref={btn} className="mm-btn" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
        <span aria-hidden="true" /><span aria-hidden="true" />
      </button>
      {mounted && createPortal(<div id="mobile-menu" ref={panel} className={`mm${open ? ' on' : ''}`} role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open}>
        <nav className="mm-nav">
          {GROUPS.map(([g, items], i) => (
            <div key={g} className={`mm-g${sub === i ? ' on' : ''}`}>
              <button className="mm-gh" aria-expanded={sub === i} onClick={() => setSub(sub === i ? -1 : i)}>{g}<i aria-hidden="true" /></button>
              <div className="mm-sub"><div>{items.map((x) => <a key={x.href} href={x.href} onClick={close} {...(x.ext ? { target: '_blank', rel: 'noopener' } : {})}>{x.label}</a>)}</div></div>
            </div>
          ))}
          <a href="/ai-identity-security" className="mm-ai" onClick={close}>AI identity security</a>
        </nav>
        <div className="mm-cta">
          <a href="/#contact" className="y-btn blue" onClick={close}>Talk to an expert <span>→</span></a>
          <a href="/#contact" className="y-btn soft" onClick={close}>Contact</a>
        </div>
      </div>, document.querySelector('.x') || document.body)}
    </>
  );
}
