'use client';
import { useState } from 'react';
import { CHANGE } from '../lib/content';

// Before / after switch — flip the whole ledger with one control.
export default function Shift() {
  const [after, setAfter] = useState(true);
  return (
    <div className={`shift${after ? ' is-after' : ''}`}>
      <div className="shift-sw" role="tablist" aria-label="Compare">
        <button role="tab" aria-selected={!after} onClick={() => setAfter(false)}>Before</button>
        <button role="tab" aria-selected={after} onClick={() => setAfter(true)}>With TechDemocracy</button>
        <i />
      </div>
      <div className="shift-rows">
        {CHANGE.rows.map(([a, b], i) => (
          <div className="card shift-row" key={a} data-glow>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <div className="shift-txt">
              <span className="s-b">{a}</span>
              <span className="s-a">{b}</span>
            </div>
            <span className={`dot ${after ? 'ok' : 'bad'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
