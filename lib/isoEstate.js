/*
  Isometric identity estate — canvas renderer for "The identity problem".
  mountIso(canvas, getProgress, { still }) → cleanup()
  getProgress() returns 0..1 through the three chapters (Sprawl, Drift, Agents).
  All names and figures are illustrative.
*/
const N = 10;               // grid is N × N tiles
const CH = 3;
const COL = {
  human:   ['#FFFFFF', '#C9CDDC', '#9AA0B5'],
  machine: ['#4589FF', '#0F62FE', '#0043CE'],
  stale:   ['#F1C21B', '#D2A106', '#A07800'],
  agent:   ['#D0E2FF', '#78A9FF', '#4589FF'],
};
const HUMANS = ['j.morgan', 'a.rao', 's.chen', 'm.okafor', 'l.santos', 'k.iyer', 'p.nair'];
const MACH = ['svc-backup', 'ci-deploy-key', 'svc-etl', 'api-token', 'bot-hr-sync', 'svc-report', 'k8s-sa', 'db-reader', 'svc-payroll', 'gh-action'];
const AGENTS = ['invoice-agent', 'copilot-sales', 'support-bot', 'code-assist', 'hr-agent', 'ops-agent', 'finance-copilot'];
const STORES = [['PROD · CRM', 9, 1], ['PROD · FINANCE', 9, 5], ['PROD · HR DATA', 9, 8]];

function rnd(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (v) => 1 - Math.pow(1 - clamp(v), 3);

function buildCells() {
  const R = rnd(11);
  const cells = [];
  const storeAt = new Set(STORES.map(([, x, y]) => `${x},${y}`));
  let hi = 0, mi = 0, ai = 0;
  for (let gy = 0; gy < N; gy++) for (let gx = 0; gx < N; gx++) {
    if (storeAt.has(`${gx},${gy}`) || (gx === 9)) continue;       // back row reserved for data stores
    const q = R();
    let type = null;
    if (q < 0.07) type = 'human';
    else if (q < 0.74) type = 'machine';
    if (!type) continue;
    const c = { gx, gy, type, born: type === 'human' ? R() * 0.3 : 0.25 + R() * 0.7,
      grow: 1 + Math.floor(R() * 4), stale: R() < 0.5, staleAt: R(), agent: false, lift: 0 };
    c.name = type === 'human' ? HUMANS[hi++ % HUMANS.length] : `${MACH[mi++ % MACH.length]}-${String(2 + Math.floor(R() * 40)).padStart(2, '0')}`;
    cells.push(c);
  }
  // promote a handful of machine cells to AI agents (chapter 3)
  const ms = cells.filter((c) => c.type === 'machine');
  for (let i = 0; i < 7; i++) { const c = ms[Math.floor(R() * ms.length)]; if (!c.agent) { c.agent = true; c.aname = AGENTS[ai++ % AGENTS.length]; c.store = i % 3; } }
  return cells;
}

export function mountIso(canvas, getProgress, { still = false } = {}) {
  const ctx = canvas.getContext('2d');
  const cells = buildCells();
  let w, h, dpr, tw, th, U, ox, oy, raf, visible = true, t = 0, Ps = still ? CH : 0;
  const mouse = { x: -1e4, y: -1e4 };

  const layout = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(2, devicePixelRatio || 1); w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // illustration area: right of the copy on desktop, lower half on tablet, whole canvas when still
    let ax, ay, aw, ah;
    if (still) { ax = 0; ay = 10; aw = w; ah = h - 20; }
    else if (w > 1055) { ax = w * 0.4; aw = w * 0.58; ay = 110; ah = h - 110 - 190; }
    else { ax = 0; aw = w; ay = h * 0.5; ah = h * 0.5 - 230; }
    tw = Math.min(aw / (2 * N), ah / (N + 4.6));
    th = tw / 2; U = tw * 0.62;
    ox = ax + aw / 2; oy = ay + 4.6 * U;
  };
  const P = (x, y, z) => [ox + (x - y) * tw, oy + (x + y) * th - z * U];

  const poly = (pts, fill, stroke) => {
    ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
  };
  // axis-aligned box centred in tile (gx,gy), from z0 to z0+hz, footprint s (0..1)
  const box = (gx, gy, z0, hz, s, [top, left, right], alpha = 1) => {
    const cx = gx + 0.5, cy = gy + 0.5, k = s / 2, z1 = z0 + hz;
    ctx.globalAlpha = alpha;
    poly([P(cx - k, cy + k, z1), P(cx + k, cy + k, z1), P(cx + k, cy + k, z0), P(cx - k, cy + k, z0)], left);
    poly([P(cx + k, cy - k, z1), P(cx + k, cy + k, z1), P(cx + k, cy + k, z0), P(cx + k, cy - k, z0)], right);
    poly([P(cx - k, cy - k, z1), P(cx + k, cy - k, z1), P(cx + k, cy + k, z1), P(cx - k, cy + k, z1)], top);
    ctx.globalAlpha = 1;
  };
  const cylinder = (gx, gy, label) => {
    const [cx, cy] = P(gx + 0.5, gy + 0.5, 0);
    const rx = tw * 0.62, ry = rx / 2, hh = U * 2.2;
    for (let i = 2; i >= 0; i--) {
      const y0 = cy - i * (hh / 3);
      ctx.fillStyle = '#0B1224';
      ctx.beginPath(); ctx.ellipse(cx, y0, rx, ry, 0, 0, Math.PI); ctx.lineTo(cx - rx, y0 - hh / 3 + 3); ctx.ellipse(cx, y0 - hh / 3 + 3, rx, ry, 0, Math.PI, 0, true); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(120,169,255,.55)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, y0, rx, ry, 0, 0, Math.PI); ctx.stroke();
    }
    const topY = cy - hh + 3;
    ctx.fillStyle = '#13213F'; ctx.strokeStyle = '#78A9FF'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.ellipse(cx, topY, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.font = "600 10.5px 'Manrope Variable', Manrope, system-ui, sans-serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const tw2 = ctx.measureText(label).width + 16;
    ctx.fillStyle = 'rgba(4,5,11,.85)'; ctx.fillRect(cx - tw2 / 2, topY - ry - 26, tw2, 18);
    ctx.strokeStyle = 'rgba(120,169,255,.5)'; ctx.strokeRect(cx - tw2 / 2 + .5, topY - ry - 25.5, tw2 - 1, 17);
    ctx.fillStyle = '#D0E2FF'; ctx.fillText(label, cx, topY - ry - 16.5);
    return [cx, topY];
  };
  const diamond = (x, y, r, glow) => {
    ctx.save(); ctx.shadowColor = 'rgba(120,169,255,.9)'; ctx.shadowBlur = glow;
    poly([[x, y - r * 1.3], [x + r, y], [x, y + r * 1.3], [x - r, y]], '#A6C8FF');
    ctx.restore();
    poly([[x, y - r * 1.3], [x + r, y], [x, y]], '#E5EEFF');
    poly([[x, y + r * 1.3], [x - r, y], [x, y]], '#4589FF');
  };

  const draw = () => {
    const target = still ? CH : clamp(getProgress()) * CH;
    Ps += (target - Ps) * (still ? 1 : 0.1);
    const ch = Math.min(CH - 1, Math.floor(Ps)), local = Ps - ch;
    ctx.clearRect(0, 0, w, h);

    // floor
    ctx.lineWidth = 1;
    for (let gy = 0; gy < N; gy++) for (let gx = 0; gx < N; gx++) {
      poly([P(gx, gy, 0), P(gx + 1, gy, 0), P(gx + 1, gy + 1, 0), P(gx, gy + 1, 0)], (gx + gy) % 2 ? 'rgba(15,98,254,.035)' : 'rgba(15,98,254,.06)', 'rgba(120,169,255,.10)');
    }
    // floor edge glow
    ctx.strokeStyle = 'rgba(120,169,255,.35)'; ctx.lineWidth = 1.2;
    poly([P(0, 0, 0), P(N, 0, 0), P(N, N, 0), P(0, N, 0)], null, 'rgba(120,169,255,.28)');

    // hovered tile (inverse projection at z=0)
    const a = (mouse.x - ox) / tw, b = (mouse.y - oy) / th;
    const hx = Math.floor((a + b) / 2), hy = Math.floor((b - a) / 2);

    // review sweep (chapter 2): plane moving along x, slow
    const sweepX = ch >= 1 ? ((t * 0.06) % 1.3) * N - 1 : -99;

    // data stores (chapter 3) — positions needed for beams
    const storeTops = [];
    const showStores = clamp((Ps - 2) * 2.5);

    // painter's order: back (small gx+gy) to front
    const order = [...cells].sort((p, q) => (p.gx + p.gy) - (q.gx + q.gy));
    const agentsDrawn = [];
    let tip = null;

    // draw stores first among back row (they sit at gx=9 — the right edge, drawn in order with cells)
    const items = [...order.map((c) => ({ k: c.gx + c.gy, c })), ...STORES.map((s, i) => ({ k: s[1] + s[2], s, i }))].sort((p, q) => p.k - q.k);

    for (const it of items) {
      if (it.s) {
        if (showStores <= 0) continue;
        ctx.globalAlpha = showStores;
        storeTops[it.i] = cylinder(it.s[1], it.s[2], it.s[0]);
        ctx.globalAlpha = 1;
        continue;
      }
      const c = it.c;
      // chapter 1: rise in
      const rise = ch > 0 ? 1 : ease((local * 1.3 - c.born) * 3.5);
      if (rise <= 0.01) continue;
      const hovered = c.gx === hx && c.gy === hy;
      c.lift += ((hovered ? 0.6 : 0) - c.lift) * 0.2;
      const s = c.type === 'human' ? 0.5 : 0.62;
      const colors = c.type === 'human' ? COL.human : COL.machine;
      // chapter 2: towers grow in stacked layers; the newest layers go amber (unreviewed)
      const growK = ch >= 1 ? (ch > 1 ? 1 : ease(local * 1.4 - c.staleAt * 0.4)) : 0;
      const layers = 1 + Math.round((c.grow - 1) * growK);
      const lh = 0.7, gap = 0.12;
      let z = c.lift;
      for (let L = 0; L < layers; L++) {
        let col = colors;
        if (c.type !== 'human' && c.stale && L > 0 && growK > 0.3) {
          const nearSweep = Math.abs(c.gx + 0.5 - sweepX) < 0.6;
          col = nearSweep ? COL.machine : COL.stale;
        }
        box(c.gx, c.gy, z, lh * (L === 0 ? rise : 1), s, col, L === 0 ? Math.min(1, rise * 1.4) : 1);
        z += lh + gap;
      }
      // chapter 3: agent hovering above its block
      if (c.agent && ch >= 2) {
        const k = ease(local * 2 - 0.1);
        const [x, y] = P(c.gx + 0.5, c.gy + 0.5, z + 1.8 + Math.sin(t * 2 + c.gx) * 0.25);
        const [bx, by] = P(c.gx + 0.5, c.gy + 0.5, z);
        agentsDrawn.push({ c, x, y, bx, by, k });
      }
      if (hovered && rise > 0.5) {
        const [x, y] = P(c.gx + 0.5, c.gy + 0.5, z + 0.4);
        const kind = c.agent && ch >= 2 ? `${c.aname} · AI agent · Prod access, never reviewed`
          : c.type === 'human' ? `${c.name} · Employee · Governed`
          : ch >= 1 && c.stale ? `${c.name} · Service account · ${c.grow * 4} unreviewed grants`
          : `${c.name} · Service account · No owner`;
        tip = { x, y, kind };
      }
    }

    // agents + beams
    for (const { c, x, y, bx, by, k } of agentsDrawn) {
      // tether from the agent down to the identity it runs as
      ctx.globalAlpha = k * 0.7; ctx.strokeStyle = '#A6C8FF'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(bx, by); ctx.stroke(); ctx.globalAlpha = 1;
      const st = storeTops[c.store];
      if (st && k > 0) {
        ctx.globalAlpha = k;
        ctx.strokeStyle = 'rgba(166,200,255,.55)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 4]); ctx.lineDashOffset = -t * 20;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(st[0], st[1]); ctx.stroke(); ctx.setLineDash([]);
        const f = (t * 0.5 + c.gx * 0.13) % 1;
        ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(x + (st[0] - x) * f, y + (st[1] - y) * f, 2, 0, 7); ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.globalAlpha = k; diamond(x, y, tw * 0.36, 26); ctx.globalAlpha = 1;
    }

    // tooltip
    if (tip) {
      ctx.font = "600 12px 'Manrope Variable', Manrope, system-ui, sans-serif";
      const tw3 = ctx.measureText(tip.kind).width + 20, bx = Math.min(w - tw3 - 8, Math.max(8, tip.x - tw3 / 2)), by = tip.y - 40;
      ctx.fillStyle = 'rgba(4,5,11,.92)'; ctx.fillRect(bx, by, tw3, 26);
      ctx.strokeStyle = 'rgba(120,169,255,.6)'; ctx.lineWidth = 1; ctx.strokeRect(bx + .5, by + .5, tw3 - 1, 25);
      ctx.fillStyle = '#EEF0F7'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(tip.kind, bx + 10, by + 13.5);
    }

    // review plane (chapter 2 only, fades out in 3)
    const planeA = ch === 1 ? 1 : ch === 2 ? clamp(1 - local * 3) : 0;
    if (planeA > 0 && sweepX > -1 && sweepX < N) {
      ctx.globalAlpha = planeA;
      poly([P(sweepX, 0, 0), P(sweepX, N, 0), P(sweepX, N, 4.5), P(sweepX, 0, 4.5)], 'rgba(15,98,254,.12)', 'rgba(120,169,255,.7)');
      const [lx, ly] = P(sweepX, 0, 4.9);
      ctx.font = "600 10.5px 'Manrope Variable', Manrope, system-ui, sans-serif"; ctx.textAlign = 'center'; ctx.fillStyle = '#A6C8FF';
      ctx.fillText('ACCESS REVIEW', lx, ly);
      ctx.globalAlpha = 1;
    }
  };

  const loop = () => { raf = requestAnimationFrame(loop); if (!visible) return; t += 1 / 60; draw(); };
  layout();
  const ro = new ResizeObserver(() => { layout(); draw(); }); ro.observe(canvas);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(canvas);
  const mm = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
  addEventListener('pointermove', mm, { passive: true });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { t = 3; draw(); } else raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); removeEventListener('pointermove', mm); };
}
