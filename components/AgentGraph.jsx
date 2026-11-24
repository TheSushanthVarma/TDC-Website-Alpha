// C28 — agent graph: agents, owners, apps, data and keys, with live-looking edges (CSS only).
const N = [
  ['agent1', 'Agent', 'support-copilot', 18, 34],
  ['owner', 'Owner', 'unknown', 40, 14],
  ['app', 'App', 'CRM', 64, 30],
  ['data', 'Data', 'customer records', 58, 74],
  ['key', 'Key', 'never expires', 26, 80],
  ['agent2', 'Agent', 'deploy-agent', 86, 62],
  ['mcp', 'MCP', 'github server', 84, 16],
];
const E = [['agent1', 'owner', 'warn'], ['agent1', 'app'], ['app', 'data'], ['agent1', 'key', 'warn'], ['key', 'data'], ['agent2', 'data', 'warn'], ['agent2', 'mcp'], ['mcp', 'app']];
const pos = Object.fromEntries(N.map(([id, , , x, y]) => [id, [x, y]]));
export default function AgentGraph() {
  return (
    <div className="pg-graph" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {E.map(([a, b, w]) => {
          const [x1, y1] = pos[a]; const [x2, y2] = pos[b];
          return <line key={a + b} x1={x1} y1={y1} x2={x2} y2={y2} className={w ? 'warn' : ''} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      {N.map(([id, kind, label, x, y]) => (
        <span key={id} className={`pg-node ${kind.toLowerCase()}`} style={{ left: `${x}%`, top: `${y}%` }}>
          <b>{kind}</b><small>{label}</small>
        </span>
      ))}
    </div>
  );
}
