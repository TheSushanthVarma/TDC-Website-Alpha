export default function Console({ file, rows }) {
  return (
    <div className="console">
      <div className="console-bar"><i /><i /><i /><b>{file}</b><span className="live"><em />Live</span></div>
      {rows.map(([a, b, c, tone]) => (
        <div className="c-row" key={a}>
          <span className={`c-ico ${tone}`} />
          <div><b>{a}</b><small>{b}</small></div>
          <span className={`pill ${tone}`}>{c}</span>
        </div>
      ))}
    </div>
  );
}
