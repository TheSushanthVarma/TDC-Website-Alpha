'use client';
import { useEffect, useState } from 'react';

export default function GridOverlay() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const k = (e) => { if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey && !/input|textarea/i.test(e.target.tagName)) setOn((v) => !v); };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);
  return (
    <>
      {on && (
        <div className="overlay" aria-hidden="true">
          <div className="wrap grid">{Array.from({ length: 16 }, (_, i) => <i key={i}><span>{i + 1}</span></i>)}</div>
        </div>
      )}
      <button className="grid-btn" onClick={() => setOn(!on)} aria-pressed={on}>Grid <kbd>G</kbd></button>
    </>
  );
}
