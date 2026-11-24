'use client';
import { useState } from 'react';
import { FAQ } from '../lib/content';

export default function Faq({ items = FAQ }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <div className={`q${open === i ? ' open' : ''}`} key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span className="idx">{String(i + 1).padStart(2, '0')}</span><span className="q-t">{q}</span><i />
          </button>
          <div className="a"><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}
