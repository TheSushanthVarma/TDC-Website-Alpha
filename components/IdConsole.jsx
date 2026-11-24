// Identity operations console — an illustrative product surface for the hero and closing CTA.
// Static markup + CSS motion only; all figures are sample data.

const METRICS = [
  ['Identities governed', '15.2M', '+2.1%', 'up', [4, 6, 5, 7, 6, 8, 9, 8, 10, 11]],
  ['Orphan accounts', '1,284', '−38%', 'down', [11, 10, 10, 9, 8, 8, 6, 5, 5, 4]],
  ['Reviews pending', '312', '−54%', 'down', [9, 10, 8, 8, 7, 6, 5, 5, 4, 3]],
  ['AI agents discovered', '86', '+12', 'up', [2, 3, 3, 4, 5, 5, 6, 7, 8, 9]],
  ['Mean time to revoke', '1.2h', '−71%', 'down', [10, 9, 9, 7, 6, 5, 4, 4, 3, 3]],
];
const ROWS = [
  ['svc-backup-02', 'Service account', 'High', 'Unassigned', 'Owner needed', 'warn'],
  ['invoice-agent', 'AI agent', 'Medium', 'Finance Ops', 'In review', 'info'],
  ['j.morgan', 'Employee', 'Low', 'HR · Workday', 'Governed', 'ok'],
  ['ci-deploy-key', 'Secret', 'Medium', 'Platform Eng', 'Rotated', 'ok'],
  ['admin-tier0-04', 'Privileged', 'Critical', 'IAM Team', 'Session brokered', 'ok'],
];
const NAVI = ['Overview', 'Identities', 'Access reviews', 'Privileged', 'AI agents', 'Connectors', 'Reports'];

function Spark({ d, dir }) {
  const max = Math.max(...d), w = 100, h = 28;
  const pts = d.map((v, i) => `${(i / (d.length - 1)) * w},${h - (v / max) * (h - 4) - 2}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={`spark ${dir}`} aria-hidden="true">
      <polyline points={pts} fill="none" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function IdConsole({ compact = false }) {
  return (
    <div className={`con${compact ? ' compact' : ''}`} aria-label="Illustrative identity operations console" role="img">
      <div className="con-bar">
        <span className="con-dots"><i /><i /><i /></span>
        <span className="con-crumb"><b>Identity Operations</b> / Global / Overview</span>
        <span className="con-tabs">{['Overview', 'Identities', 'Reviews', 'AI agents', 'Reports'].map((t, i) => <span key={t} className={i === 0 ? 'on' : ''}>{t}</span>)}</span>
        <span className="con-live"><em />Live</span>
      </div>
      <div className="con-body">
        <aside className="con-side">
          {NAVI.map((t, i) => <span key={t} className={i === 0 ? 'on' : ''}><i />{t}</span>)}
        </aside>
        <div className="con-main">
          <div className="con-metrics">
            {METRICS.map(([l, v, ch, dir, d]) => (
              <div key={l} className="con-m">
                <span className="con-ml">{l}</span>
                <span className="con-mv">{v}<small className={dir}>{ch}</small></span>
                <Spark d={d} dir={dir} />
              </div>
            ))}
          </div>
          <div className="con-table">
            <div className="con-th"><span>Identities needing attention</span><span className="con-filter">Risk ▾</span></div>
            <div className="con-row head"><span>Identity</span><span>Type</span><span>Risk</span><span>Owner</span><span>Status</span></div>
            {ROWS.map(([n, t, r, o, s, k]) => (
              <div key={n} className="con-row">
                <span className="con-id"><i className={k} />{n}</span><span>{t}</span>
                <span className={`con-risk r-${r.toLowerCase()}`}>{r}</span><span>{o}</span>
                <span className={`con-st ${k}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
