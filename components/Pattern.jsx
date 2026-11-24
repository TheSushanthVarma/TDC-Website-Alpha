'use client';
import { useEffect, useRef } from 'react';

export default function Pattern({ piece, theme = 'light', className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    let off = () => {};
    let alive = true;
    import('../lib/patterns.js').then(({ mountPattern }) => { if (alive) off = mountPattern(ref.current, piece, theme); });
    return () => { alive = false; off(); };
  }, [piece, theme]);
  return <div className={`pat ${className}`} aria-hidden="true"><canvas ref={ref} /></div>;
}
