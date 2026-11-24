'use client';
import { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../lib/content';

const DURATION = 6000; // ms per service

// Numbered list on the left, one service open at a time; image panel on the right.
// Auto-advances every 6s; pauses on hover/focus, when off-screen, and for reduced motion.
export default function ServiceList() {
  const [on, setOn] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(true);
  const [stopped, setStopped] = useState(false);
  const root = useRef(null);
  const visible = useRef(false);
  const bar = useRef(null);
  const vids = useRef([]);
  const still = useRef(false);

  // play only the active service's animation; rest on the formed icon
  useEffect(() => {
    still.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === on && !still.current) { v.currentTime = 0; v.play().catch(() => {}); }
      else { v.pause(); v.currentTime = 0; }
    });
  }, [on]);

  useEffect(() => {
    // no auto-rotation for reduced motion or touch screens (no hover to pause it)
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(hover: none)').matches) { setAuto(false); return; }
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.35 });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // progress loop — drives the bar and advances when full
  useEffect(() => {
    if (!auto || stopped) return;
    let raf, last = performance.now(), elapsed = 0;
    const tick = (now) => {
      const dt = now - last; last = now;
      if (!paused && visible.current && !document.hidden) elapsed += dt;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, elapsed / DURATION)})`;
      if (elapsed >= DURATION) { setOn((i) => (i + 1) % SERVICES.length); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, paused, auto, stopped]);

  const pick = (i) => setOn(i);
  const running = auto && !stopped;

  return (
    <div className={`sl${auto ? ' is-auto' : ''}${paused ? ' is-paused' : ''}`} ref={root}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div className="sl-list">
        {SERVICES.map((s, i) => (
          <div key={s.t} className={`sl-item${i === on ? ' on' : ''}`}>
            <button className="sl-head" onClick={() => pick(i)} onMouseEnter={() => pick(i)} aria-expanded={i === on}>
              <span className="sl-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="sl-t">{s.h}</span>
              <span className="sl-plus" aria-hidden="true" />
            </button>
            {i === on && running && <span className="sl-prog" aria-hidden="true"><i ref={bar} /></span>}
            <div className="sl-body">
              <div>
                <p>{s.d}</p>
                <ul>{s.checks.map((c) => <li key={c}>{c}</li>)}</ul>
                <a href="#" className="y-btn dark sm">Explore {s.t.toLowerCase()} <span>→</span></a>
                <div className="sl-mimg"><video src={`${s.anim}.mp4`} poster={`${s.anim}-still.webp`} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="sl-media">
        {SERVICES.map((s, i) => (
          <video key={s.anim} ref={(el) => { vids.current[i] = el; }} className={`sl-v${i === on ? ' on' : ''}`}
            muted loop playsInline preload="metadata" poster={`${s.anim}-still.webp`} aria-hidden="true" tabIndex={-1}>
            <source src={`${s.anim}.webm`} type="video/webm" />
            <source src={`${s.anim}.mp4`} type="video/mp4" />
          </video>
        ))}
        {auto && (
          <button className="sl-pause" onClick={() => setStopped(!stopped)} aria-pressed={stopped}
            aria-label={stopped ? 'Resume automatic rotation' : 'Pause automatic rotation'}>
            {stopped ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg> : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>}
          </button>
        )}
        <span className="sl-cap"><b>{String(on + 1).padStart(2, '0')}</b> / {String(SERVICES.length).padStart(2, '0')} · {SERVICES[on].t}</span>
      </div>
    </div>
  );
}
