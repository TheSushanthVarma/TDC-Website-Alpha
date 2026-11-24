'use client';
import { useEffect, useRef, useState } from 'react';
import GlyphField from './GlyphField';

const L = 'https://www.techdemocracy.com';
const COLS = [
  ['Solutions', [['Identity governance', '/solutions/identity-governance'], ['Privileged access', '/solutions/privileged-access'], ['Access management', '/solutions/access-management'], ['Customer identity', '/solutions/customer-identity'], ['AI identity security', '/ai-identity-security']]],
  ['Services', [['Advisory', '/services/advisory-consulting'], ['Implementation', '/services/implementation'], ['Operations & support', '/services/operations-and-support'], ['Managed services', '/services/managed-services']]],
  ['Partners', [['SailPoint', '/partners/sailpoint'], ['Microsoft Entra ID', '/partners/microsoft-entra'], ['Saviynt', '/partners/saviynt'], ['Okta', '/partners/okta']]],
  ['Company', [['About', `${L}/company/about-us`], ['Leadership', `${L}/company/leadership`], ['Careers', `${L}/company/careers`], ['Contact', `${L}/company/contact-us`]]],
];
const TILES = [
  ['Field notes', 'Guides and case studies from live programs', '#'],
  ['Join the team', 'We are hiring identity engineers', '#'],
  ['Client support', 'Raise a request with your delivery team', '#'],
];
const SOCIAL = [
  ['LinkedIn', 'M4.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h3v12H3V9Zm6 0h2.9v1.7h.04c.4-.76 1.4-1.9 3.06-1.9 3.3 0 3.9 2.15 3.9 4.95V21h-3v-6.3c0-1.5-.03-3.45-2.1-3.45-2.1 0-2.4 1.65-2.4 3.35V21H9V9Z'],
  ['X', 'M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.8 3h6.4l4.4 5.9L17.7 3Zm-1.1 16.2h1.7L7.5 4.7H5.7l10.9 14.5Z'],
  ['YouTube', 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z'],
];

export default function Footer() {
  const word = useRef(null);
  const [time, setTime] = useState('');
  const [mail, setMail] = useState('');
  const [sent, setSent] = useState(false);

  // live UTC clock for the 24/7 operations strip
  useEffect(() => {
    const tick = () => setTime(new Date().toISOString().slice(11, 19));
    tick(); const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // cursor spotlight lights the glyph wordmark in IBM blue
  useEffect(() => {
    const el = word.current; if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--wx', `${e.clientX - r.left}px`);
      el.style.setProperty('--wy', `${e.clientY - r.top}px`);
    };
    el.addEventListener('pointermove', move);
    return () => el.removeEventListener('pointermove', move);
  }, []);

  const submit = (e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(mail)) setSent(true); };

  return (
    <footer className="x-ftr">
      <div className="x-wrap">
        {/* row 1 — newsletter + quick routes */}
        <div className="ftr-hero">
          <div className="ftr-news">
            <span className="mono c-blue">Field notes · monthly</span>
            <h2 className="ftr-news-h">Identity security, from live programs — once a month.</h2>
            {sent ? (
              <p className="ftr-ok"><em />You are on the list. First issue lands next month.</p>
            ) : (
              <form className="ftr-form" onSubmit={submit}>
                <input type="email" required placeholder="Work email" value={mail} onChange={(e) => setMail(e.target.value)} aria-label="Work email" />
                <button type="submit">Subscribe <span>→</span></button>
              </form>
            )}
            <small>No spam. Unsubscribe in one click.</small>
          </div>
          <div className="ftr-tiles">
            {TILES.map(([t, s, h], i) => (
              <a key={t} href={h} className="ftr-tile" data-glow>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                <b>{t}</b>
                <span className="ftr-tile-s">{s}</span>
                <i>↗</i>
              </a>
            ))}
          </div>
        </div>

        {/* row 2 — brand + link columns */}
        <div className="ftr-top">
          <div className="ftr-brand">
            <img src="/logo-white.svg" alt="TechDemocracy" />
            <p>Identity security, advised, implemented and run — for people, machines and AI agents.</p>
            <div className="ftr-social">
              {SOCIAL.map(([n, d]) => (
                <a key={n} href="#" aria-label={n}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg></a>
              ))}
            </div>
          </div>
          {COLS.map(([t, xs]) => (
            <div key={t} className="ftr-col">
              <span className="mono">{t}</span>
              {xs.map(([x, h]) => <a key={x} href={h}><span>{x}</span></a>)}
            </div>
          ))}
        </div>

        {/* row 3 — live status strip */}
        <div className="ftr-bot">
          <span className="ftr-live"><em />Identity operations online · 24/7</span>
          <span className="mono ftr-clock">UTC {time || '--:--:--'}</span>
          <span className="ftr-legal">© 2026 TechDemocracy · ISO/IEC 27001 certified · <a href="#">Privacy</a> · <a href="#">Cookies</a> · <a href="#">Terms</a></span>
          <button className="ftr-up" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
        </div>
        {/* row 4 — glyph wordmark, full width, running off the bottom edge */}
        <div className="ftr-word" ref={word}>
          <GlyphField density={0.3} cell={18} className="ftr-glyph" />
          <img className="w-base" src="/img/footer-wordmark.svg" alt="TechDemocracy" loading="lazy" />
          <img className="w-lit" src="/img/footer-wordmark-lit.svg" alt="" aria-hidden="true" loading="lazy" />
        </div>

      </div>
    </footer>
  );
}
