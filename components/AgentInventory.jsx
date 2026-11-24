'use client';
import { useMemo, useState } from 'react';

// C29 — product-style agent inventory (invented agent names, no client data).
const RISK = { high: 'High', medium: 'Medium', low: 'Low' };
export default function AgentInventory({ rows }) {
  const [q, setQ] = useState('');
  const [risk, setRisk] = useState('all');
  const list = useMemo(() => rows.filter(([a, o, acc, r]) =>
    (risk === 'all' || r === risk) && `${a} ${o} ${acc}`.toLowerCase().includes(q.trim().toLowerCase())), [rows, q, risk]);
  return (
    <div className="pg-inv">
      <div className="pg-inv-bar">
        <span className="pg-inv-file">agents.inventory <i>· sample data</i></span>
        <div className="pg-inv-tools">
          <label className="pg-inv-search"><span className="sr">Search agents</span>
            <input type="search" placeholder="Search agents" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <div className="pg-inv-seg" role="group" aria-label="Filter by risk">
            {['all', 'high', 'medium', 'low'].map((r) => (
              <button key={r} type="button" aria-pressed={risk === r} className={risk === r ? 'on' : ''} onClick={() => setRisk(r)}>{r === 'all' ? 'All' : RISK[r]}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="pg-table-wrap">
        <table className="pg-table inv">
          <thead><tr><th scope="col">Agent</th><th scope="col">Owner</th><th scope="col">Access</th><th scope="col">Risk</th></tr></thead>
          <tbody>
            {list.map(([a, o, acc, r]) => (
              <tr key={a}>
                <th scope="row"><code>{a}</code></th>
                <td className={o === 'Unassigned' ? 'warn' : ''}>{o}</td>
                <td>{acc}</td>
                <td><span className={`pg-risk ${r}`}>{RISK[r]}</span></td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={4} className="pg-inv-empty">No agents match.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="pg-inv-foot" aria-live="polite">{list.length} of {rows.length} agents · {rows.filter((x) => x[1] === 'Unassigned').length} without an owner</p>
    </div>
  );
}
