'use client';
import { useEffect, useRef, useState } from 'react';
import GlyphField from './GlyphField';
import { PROBLEMS } from '../lib/content';

const SHAPES = ['field', 'ring', 'core'];
const n = (i) => String(i).padStart(2, '0');

// Sticky glyph panel on the left morphs as each statement scrolls past on the right.
export default function Story() {
  const items = useRef([]);
  const [on, setOn] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setOn(+e.target.dataset.i); }), { rootMargin: '-45% 0px -45% 0px' });
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="story">
      <div className="story-stick">
        <div className="story-panel" data-glow>
          <GlyphField shape={SHAPES[on]} density={0.62} cell={20} />
          <div className="story-hud">
            <span className="mono">identity.estate / scan</span>
            <span className="mono">{n(on + 1)} / {n(PROBLEMS.length)}</span>
          </div>
          <div className="story-big"><span key={on}>{n(on + 1)}</span></div>
          <div className="story-tags">{PROBLEMS[on].tags.map((t) => <span key={t} className="tg warn"><em />{t}</span>)}</div>
        </div>
      </div>
      <div className="story-list">
        {PROBLEMS.map((p, i) => (
          <article key={p.h} ref={(el) => (items.current[i] = el)} data-i={i} className={`story-i${i === on ? ' on' : ''}`}>
            <span className="mono c-blue">{n(i + 1)} — the problem</span>
            <h3>{p.h}</h3>
            <p>{p.s}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
