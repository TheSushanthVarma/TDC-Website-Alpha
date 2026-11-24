'use client';
import { useEffect, useState } from 'react';

// Announcement ribbon above the header. Dismissal is remembered per browser.
const KEY = 'td-ribbon-ai-agents';

export default function Ribbon() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    let hidden = false;
    try { hidden = localStorage.getItem(KEY) === '1'; } catch {}
    if (hidden) setShow(false);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('has-ribbon', show);
    return () => document.documentElement.classList.remove('has-ribbon');
  }, [show]);
  if (!show) return null;
  const close = () => { setShow(false); try { localStorage.setItem(KEY, '1'); } catch {} };
  return (
    <div className="x-ribbon" role="region" aria-label="Announcement">
      <a href="#" className="x-ribbon-in">
        <span className="x-ribbon-tag">New</span>
        <span className="x-ribbon-txt">
          <b>AI agent governance</b>
          <span className="x-ribbon-long"> — find every AI agent in your estate, give it an owner and govern its access.</span>
        </span>
        <span className="x-ribbon-cta">Learn more <i>→</i></span>
      </a>
      <button className="x-ribbon-x" onClick={close} aria-label="Dismiss announcement">×</button>
    </div>
  );
}
