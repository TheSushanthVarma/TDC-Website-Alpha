const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const TAU = Math.PI * 2;
function rng(s) { return () => (s = (s * 16807) % 2147483647) / 2147483647; }
const THEMES = {
  dark:  { bg: '#060B1F', line: '157,182,255', dot: '255,255,255', glow: '59,107,255' },
  navy:  { bg: '#0E1B3D', line: '157,182,255', dot: '255,255,255', glow: '59,107,255' },
  light: { bg: '#F4F7FE', line: '47,102,232',  dot: '14,27,61',    glow: '47,102,232' },
};
const CY = '56,211,242', AM = '232,147,12';
const rgba = (c, a) => `rgba(${c},${a})`;
function glow(ctx, x, y, r, c, a) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(c, a)); g.addColorStop(1, rgba(c, 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }

const PIECES = {
  // 01 least privilege: radial lines that stop at rings; only a few reach the core
  least(ctx, w, h, t, T) {
    const R = rng(3), cx = w / 2, cy = h / 2, m = Math.min(w, h), rings = 6, rot = t * .03;
    glow(ctx, cx, cy, m * .25, T.glow, .35);
    for (let i = 1; i <= rings; i++) { ctx.strokeStyle = rgba(T.line, .12); ctx.beginPath(); ctx.arc(cx, cy, m * .075 * i, 0, TAU); ctx.stroke(); }
    for (let i = 0; i < 120; i++) {
      const a = R() * TAU + rot, k = Math.floor(Math.pow(R(), .7) * rings), deep = k === 0;
      const r0 = deep ? m * .03 : m * .075 * k, r1 = m * .48;
      ctx.strokeStyle = deep ? rgba(CY, .9) : rgba(T.line, .35); ctx.lineWidth = deep ? 1.6 : 1;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.lineTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); ctx.stroke();
      ctx.fillStyle = deep ? rgba(CY, 1) : rgba(T.dot, .7); ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, deep ? 2.4 : 1.4, 0, TAU); ctx.fill();
    }
  },
  // 02 zero trust: every cell has its own perimeter; verification walks the grid
  zero(ctx, w, h, t, T) {
    const cols = 12, rows = Math.round(cols * h / w), s = w / cols, R = rng(9);
    const path = []; let c = 3, r = 2; for (let i = 0; i < 60; i++) { path.push([c, r]); const d = Math.floor(R() * 4); c = Math.max(0, Math.min(cols - 1, c + [1, -1, 0, 0][d])); r = Math.max(0, Math.min(rows - 1, r + [0, 0, 1, -1][d])); }
    const step = t * 2.2;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const x = i * s + s * .18, y = j * s + s * .18, q = s * .64;
      ctx.strokeStyle = rgba(T.line, .22); ctx.lineWidth = 1; ctx.strokeRect(x, y, q, q);
      ctx.fillStyle = rgba(T.dot, .35); ctx.beginPath(); ctx.arc(x + q / 2, y + q / 2, 1.4, 0, TAU); ctx.fill();
    }
    for (let k = 0; k < 8; k++) {
      const idx = Math.floor(step) - k; if (idx < 0) continue; const [i, j] = path[idx % path.length]; const a = (1 - k / 8) * (k ? 1 : (step % 1));
      const x = i * s + s * .12, y = j * s + s * .12, q = s * .76, L = q * .28;
      ctx.strokeStyle = rgba(CY, a); ctx.lineWidth = 1.8; ctx.beginPath();
      [[x, y, 1, 1], [x + q, y, -1, 1], [x, y + q, 1, -1], [x + q, y + q, -1, -1]].forEach(([px, py, sx, sy]) => { ctx.moveTo(px + sx * L, py); ctx.lineTo(px, py); ctx.lineTo(px, py + sy * L); });
      ctx.stroke(); ctx.fillStyle = rgba(CY, a); ctx.beginPath(); ctx.arc(x + q / 2, y + q / 2, 2.6, 0, TAU); ctx.fill();
    }
  },
  // 03 identity fabric: woven sine threads
  fabric(ctx, w, h, t, T) {
    for (let i = 0; i < 46; i++) {
      const y0 = (i / 45) * h; ctx.strokeStyle = rgba(T.line, .1 + .25 * Math.abs(Math.sin(i * .37))); ctx.lineWidth = 1; ctx.beginPath();
      for (let x = 0; x <= w; x += 6) { const y = y0 + 16 * Math.sin(x * .012 + t * .4 + i * .22) + 9 * Math.sin(x * .031 - t * .25 + i * .5); x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
    }
    for (let i = 0; i < 30; i++) {
      const x0 = (i / 29) * w; ctx.strokeStyle = rgba(i % 7 === 3 ? CY : T.line, i % 7 === 3 ? .55 : .1); ctx.beginPath();
      for (let y = 0; y <= h; y += 6) { const x = x0 + 14 * Math.sin(y * .015 + t * .3 + i * .4); y ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
    }
  },
  // 04 defence in depth: nested glass layers
  depth(ctx, w, h, t, T) {
    const cx = w / 2, cy = h / 2, m = Math.min(w, h);
    glow(ctx, cx, cy, m * .45, T.glow, .3);
    for (let i = 6; i >= 0; i--) {
      const s = m * (.16 + i * .1), off = Math.sin(t * .5 + i * .6) * 6 * i, x = cx - s / 2 + off * .6 - i * 8, y = cy - s / 2 - off * .3 + i * 6;
      ctx.beginPath(); ctx.roundRect(x, y, s, s * .78, 14);
      const g = ctx.createLinearGradient(x, y, x + s, y + s); g.addColorStop(0, rgba(T.glow, .14 - i * .012)); g.addColorStop(1, rgba(T.glow, .02));
      ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = rgba(i ? T.line : CY, i ? .45 - i * .04 : .95); ctx.lineWidth = i ? 1 : 1.6; ctx.stroke();
    }
    ctx.fillStyle = rgba(T.dot, 1); ctx.beginPath(); ctx.arc(cx - 8 + Math.sin(t * .5) * 3.6, cy + 2, 4, 0, TAU); ctx.fill();
  },
  // 05 access graph: chord diagram of entitlements
  graph(ctx, w, h, t, T) {
    const R = rng(21), n = 64, cx = w / 2, cy = h / 2, r = Math.min(w, h) * .42, rot = t * .02;
    const P = i => { const a = i / n * TAU + rot; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
    for (let k = 0; k < 110; k++) {
      const a = Math.floor(R() * n), b = (a + 8 + Math.floor(R() * (n - 16))) % n, [x1, y1] = P(a), [x2, y2] = P(b);
      const hot = k === 7, pulse = .5 + .5 * Math.sin(t * 1.4 + k);
      ctx.strokeStyle = hot ? rgba(AM, .5 + .5 * pulse) : rgba(k % 13 === 0 ? CY : T.line, k % 13 === 0 ? .5 : .13); ctx.lineWidth = hot ? 1.6 : 1;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(cx + (x1 + x2 - 2 * cx) * .12, cy + (y1 + y2 - 2 * cy) * .12, x2, y2); ctx.stroke();
    }
    for (let i = 0; i < n; i++) { const [x, y] = P(i); ctx.fillStyle = rgba(T.dot, .8); ctx.beginPath(); ctx.arc(x, y, 1.8, 0, TAU); ctx.fill(); }
  },
  // 06 encryption: noise resolves to order inside the key
  cipher(ctx, w, h, t, T) {
    const s = 9, kx = w * (.5 + .3 * Math.sin(t * .35)), ky = h * (.5 + .25 * Math.cos(t * .27)), kr = Math.min(w, h) * .22;
    for (let x = 0; x < w; x += s) for (let y = 0; y < h; y += s) {
      const inside = Math.hypot(x - kx, y - ky) < kr;
      const v = inside ? ((x / s + y / s) % 2 === 0) : (Math.sin(x * 12.9898 + y * 78.233 + Math.floor(t * 4) * 3.7) * 43758.5453 % 1 + 1) % 1 > .62;
      if (!v) continue;
      ctx.fillStyle = inside ? rgba(CY, .85) : rgba(T.line, .28); ctx.fillRect(x + 1.5, y + 1.5, s - 3, s - 3);
    }
    ctx.strokeStyle = rgba(CY, .6); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(kx, ky, kr, 0, TAU); ctx.stroke();
  },
  // 07 signal and noise: detection on a quiet field
  signal(ctx, w, h, t, T) {
    const lines = 16, sx = ((t * .07) % 1) * w * 1.2 - w * .1, si = 9;
    for (let i = 0; i < lines; i++) {
      const y0 = h * (.1 + .8 * i / (lines - 1)); ctx.strokeStyle = rgba(T.line, .3); ctx.lineWidth = 1; ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        let y = y0 + 3 * Math.sin(x * .05 + t * 2 + i) + 2 * Math.sin(x * .13 - t * 1.3 + i * 2);
        if (i === si) y -= 34 * Math.exp(-Math.pow((x - sx) / 14, 2));
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
    const y = h * (.1 + .8 * si / (lines - 1)) - 34;
    ctx.strokeStyle = rgba(AM, .95); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(sx, y, 10, 0, TAU); ctx.stroke();
    ctx.strokeStyle = rgba(CY, .5); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, h); ctx.stroke(); ctx.setLineDash([]);
  },
  // 08 orbits of trust: tilted orbits around one core
  orbits(ctx, w, h, t, T) {
    const cx = w / 2, cy = h / 2, m = Math.min(w, h);
    glow(ctx, cx, cy, m * .3, T.glow, .5);
    for (let i = 0; i < 6; i++) {
      const rot = i * Math.PI / 6 + t * .02, rx = m * .44, ry = m * (.1 + i * .02);
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
      ctx.strokeStyle = rgba(i === 2 ? CY : T.line, i === 2 ? .6 : .28); ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, TAU); ctx.stroke();
      const a = t * (.3 + i * .07) + i; ctx.fillStyle = rgba(T.dot, 1); ctx.beginPath(); ctx.arc(Math.cos(a) * rx, Math.sin(a) * ry, 2.6, 0, TAU); ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = rgba(T.dot, 1); ctx.beginPath(); ctx.arc(cx, cy, 6, 0, TAU); ctx.fill();
  },
  // 09 identity contour: a fingerprint as topography
  contour(ctx, w, h, t, T) {
    const cx = w * .52, cy = h * .55, m = Math.min(w, h);
    for (let i = 1; i < 34; i++) {
      const r = i * m * .018; ctx.strokeStyle = rgba(i === 14 ? CY : T.line, i === 14 ? .9 : .14 + .3 * (1 - i / 34)); ctx.lineWidth = i === 14 ? 1.6 : 1; ctx.beginPath();
      for (let a = 0; a <= TAU + .01; a += .04) {
        const d = r * (1 + .09 * Math.sin(3 * a + i * .28 + t * .25) + .05 * Math.sin(7 * a - i * .19) + .03 * Math.sin(11 * a + t * .15));
        const x = cx + Math.cos(a) * d * 1.25, y = cy + Math.sin(a) * d; a ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
  },
  // 10 the aperture: access granted narrowly
  aperture(ctx, w, h, t, T) {
    const ax = w * .5, ay = h / 2, gap = h * .07;
    const g = ctx.createLinearGradient(ax, 0, w, 0); g.addColorStop(0, rgba(T.glow, .55)); g.addColorStop(1, rgba(T.glow, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(ax, ay - gap / 2); ctx.lineTo(w, ay - h * .42); ctx.lineTo(w, ay + h * .42); ctx.lineTo(ax, ay + gap / 2); ctx.fill();
    for (let i = 0; i < 26; i++) { const y = ay - h * .42 + i * h * .84 / 25; ctx.strokeStyle = rgba(T.line, .1); ctx.beginPath(); ctx.moveTo(ax, ay + (y - ay) * .05); ctx.lineTo(w, y); ctx.stroke(); }
    ctx.fillStyle = rgba(T.dot, 1); ctx.fillRect(ax - 3, 0, 6, ay - gap / 2); ctx.fillRect(ax - 3, ay + gap / 2, 6, h);
    for (let i = 0; i < 18; i++) { const y = (i + .5) * h / 18; if (Math.abs(y - ay) < gap) continue; ctx.fillStyle = rgba(T.line, .45); ctx.beginPath(); ctx.arc(ax - 30 - ((t * 20 + i * 37) % (ax - 40)), y, 1.8, 0, TAU); ctx.fill(); }
    const p = (t * .25) % 1, x = p * w, y = ay + (x > ax ? (x - ax) * .0 : 0);
    ctx.fillStyle = rgba(CY, 1); ctx.beginPath(); ctx.arc(x, y, 4, 0, TAU); ctx.fill(); glow(ctx, x, y, 22, CY, .4);
  },
  // 11 federation: two trust domains overlap
  federation(ctx, w, h, t, T) {
    const r = Math.min(w, h) * .36, b = Math.sin(t * .5) * r * .08, A = [w / 2 - r * .55 - b, h / 2], B = [w / 2 + r * .55 + b, h / 2];
    [A, B].forEach(([x, y]) => { ctx.strokeStyle = rgba(T.line, .5); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); });
    for (let x = 0; x < w; x += 11) for (let y = 0; y < h; y += 11) {
      const inA = Math.hypot(x - A[0], y - A[1]) < r, inB = Math.hypot(x - B[0], y - B[1]) < r;
      if (!inA && !inB) continue;
      ctx.fillStyle = inA && inB ? rgba(CY, .95) : rgba(T.line, .4); ctx.beginPath(); ctx.arc(x, y, inA && inB ? 1.9 : 1.2, 0, TAU); ctx.fill();
    }
  },
  // 12 audit trail: an endless, verifiable record
  audit(ctx, w, h, t, T) {
    const bw = 6, off = (t * 40) % bw, R = rng(77), n = Math.ceil(w / bw) + 2, shift = Math.floor(t * 40 / bw);
    const vals = Array.from({ length: n + 400 }, () => R());
    for (let i = 0; i < n; i++) {
      const v = vals[(i + shift) % vals.length], x = i * bw - off, bh = h * (.12 + .55 * v);
      const k = (i + shift) % 37 === 0 ? 'cy' : (i + shift) % 211 === 0 ? 'am' : '';
      ctx.fillStyle = k === 'cy' ? rgba(CY, .95) : k === 'am' ? rgba(AM, .95) : rgba(T.line, .3 + .25 * v);
      ctx.fillRect(x, h * .82 - bh, bw - 2.5, bh);
    }
    ctx.strokeStyle = rgba(T.line, .4); ctx.beginPath(); ctx.moveTo(0, h * .86); ctx.lineTo(w, h * .86); ctx.stroke();
  },
};


// 50 more pieces — same palette, same rules
(() => {
const st = (ctx, c, a, w = 1) => { ctx.strokeStyle = rgba(c, a); ctx.lineWidth = w; };
const dt = (ctx, x, y, r, c, a = 1) => { ctx.fillStyle = rgba(c, a); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); };
const sg = (ctx, x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
const qp = (a, b, c, s) => [(1 - s) ** 2 * a[0] + 2 * (1 - s) * s * b[0] + s * s * c[0], (1 - s) ** 2 * a[1] + 2 * (1 - s) * s * b[1] + s * s * c[1]];
const qd = (ctx, a, b, c) => { ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(...b, ...c); ctx.stroke(); };
const gauss = R => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(TAU * R());
const tri = p => 1 - Math.abs(2 * p - 1);
const cell = (w, h, n) => { const s = Math.min(w, h) / n; return s; };

Object.assign(PIECES, {
  mfa(ctx, w, h, t, T) { const cx = w / 2, cy = h / 2, m = Math.min(w, h), ph = (t * .45) % 4;
    for (let i = 0; i < 3; i++) { const r = m * (.16 + i * .11), a0 = t * (.2 + i * .1) * (i % 2 ? -1 : 1);
      st(ctx, T.line, .22, 6); ctx.beginPath(); ctx.arc(cx, cy, r, a0, a0 + TAU * .8); ctx.stroke();
      if (ph > i) { st(ctx, CY, .9, 6); ctx.beginPath(); ctx.arc(cx, cy, r, a0, a0 + TAU * .8 * Math.min(1, ph - i)); ctx.stroke(); } }
    dt(ctx, cx, cy, 6, ph > 3 ? CY : T.dot); },

  sso(ctx, w, h, t, T) { const n = 16, c = [w / 2, h / 2];
    for (let i = 0; i < n; i++) { const y = h * (.08 + .84 * i / (n - 1)), A = [w * .05, y], B = [w * .32, y], D = [w * .95, h * (.08 + .84 * ((i * 7) % n) / (n - 1))], E = [w * .68, D[1]];
      st(ctx, T.line, .25); qd(ctx, A, B, c); qd(ctx, c, E, D); dt(ctx, ...A, 2, T.dot, .7); dt(ctx, ...D, 2, T.dot, .7);
      const p = (t * .25 + i * .137) % 1, P = p < .5 ? qp(A, B, c, p * 2) : qp(c, E, D, p * 2 - 1); dt(ctx, ...P, 2.4, CY); }
    st(ctx, CY, .9, 1.6); ctx.beginPath(); ctx.arc(...c, 10, 0, TAU); ctx.stroke(); },

  rbac(ctx, w, h, t, T) { const R = rng(41), cols = 18, rows = 9, sx = w / (cols + 1), sy = h / (rows + 1), act = Math.floor(t * .5) % 5;
    const roles = Array.from({ length: 5 }, () => { const c0 = Math.floor(R() * 12), r0 = Math.floor(R() * 6); return [c0, r0, 3 + Math.floor(R() * 4), 2 + Math.floor(R() * 3)]; });
    for (let i = 1; i <= cols; i++) for (let j = 1; j <= rows; j++) { const [c0, r0, cw, rh] = roles[act], on = i - 1 >= c0 && i - 1 < c0 + cw && j - 1 >= r0 && j - 1 < r0 + rh; dt(ctx, i * sx, j * sy, on ? 2.6 : 1.6, on ? CY : T.dot, on ? 1 : .35); }
    roles.forEach(([c0, r0, cw, rh], k) => { st(ctx, k === act ? CY : T.line, k === act ? .9 : .25, k === act ? 1.4 : 1); ctx.beginPath(); ctx.roundRect((c0 + .5) * sx, (r0 + .5) * sy, cw * sx, rh * sy, 6); ctx.stroke(); }); },

  abac(ctx, w, h, t, T) { const R = rng(13), bx = w * (.35 + .2 * Math.sin(t * .3)), cx = w * (.5 + .15 * Math.cos(t * .25)), cy = h / 2, r = Math.min(w, h) * .3;
    ctx.fillStyle = rgba(T.glow, .07); ctx.fillRect(bx, 0, w * .3, h); st(ctx, T.line, .35); ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
    for (let i = 0; i < 260; i++) { const x = R() * w, y = R() * h, ok = x > bx && x < bx + w * .3 && Math.hypot(x - cx, y - cy) < r && i % 2 === 0; dt(ctx, x, y, ok ? 2.6 : 1.4, ok ? CY : T.dot, ok ? 1 : .35); } },

  sod(ctx, w, h, t, T) { const R = rng(5), bx = w / 2; st(ctx, T.line, .7, 1.4); sg(ctx, bx - 4, h * .1, bx - 4, h * .9); sg(ctx, bx + 4, h * .1, bx + 4, h * .9);
    for (let i = 0; i < 70; i++) dt(ctx, R() < .5 ? R() * (bx - 30) + 10 : bx + 30 + R() * (bx - 40), R() * h, 1.5, T.dot, .35);
    for (let i = 0; i < 6; i++) { const y = h * (.18 + i * .13), p = tri((t * .25 + i * .17) % 1), x = w * .1 + (bx - 12 - w * .1) * p, hit = p > .96; dt(ctx, x, y, 3.2, hit ? AM : T.dot, 1); if (hit) { st(ctx, AM, .8); ctx.beginPath(); ctx.arc(x, y, 10, 0, TAU); ctx.stroke(); } } },

  jml(ctx, w, h, t, T) { const lanes = [.3, .5, .7].map(f => f * h); lanes.forEach(y => { st(ctx, T.line, .25); sg(ctx, 0, y, w, y); });
    for (let i = 0; i < 14; i++) { const p = (t * .07 + i / 14) % 1, a = lanes[i % 3], b = lanes[(i + 1 + (i % 2)) % 3], k = Math.min(1, Math.max(0, (p - .4) / .15)), y = a + (b - a) * (k * k * (3 - 2 * k)), x = p * w;
      dt(ctx, x, y, 3, p > .8 ? T.dot : CY, p > .8 ? (1 - p) * 4 : 1); } },

  certify(ctx, w, h, t, T) { const cols = 20, rows = 7, s = Math.min(w / (cols + 2), h / (rows + 2)), ox = (w - cols * s) / 2, oy = (h - rows * s) / 2, k = Math.floor(t * 8) % (cols * rows), R = rng(8);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const n = j * cols + i, x = ox + i * s, y = oy + j * s, rev = R() < .07, done = n < k;
      st(ctx, T.line, .3); ctx.strokeRect(x + 3, y + 3, s - 6, s - 6);
      if (done) { if (rev) { st(ctx, AM, .9, 1.6); sg(ctx, x + 6, y + 6, x + s - 6, y + s - 6); sg(ctx, x + s - 6, y + 6, x + 6, y + s - 6); } else { st(ctx, CY, .9, 1.6); ctx.beginPath(); ctx.moveTo(x + 6, y + s / 2); ctx.lineTo(x + s * .42, y + s - 7); ctx.lineTo(x + s - 6, y + 6); ctx.stroke(); } } } },

  orphan(ctx, w, h, t, T) { const cols = 11, rows = 5, R = rng(3), by = h * .9; st(ctx, T.line, .5, 1.4); sg(ctx, w * .05, by, w * .95, by);
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const x = w * (.08 + .84 * i / (cols - 1)), y = h * (.12 + .55 * j / (rows - 1)), orph = R() < .07;
      if (orph) { const dx = 10 * Math.sin(t * .7 + i), dy = 8 * Math.cos(t * .5 + j); dt(ctx, x + dx, y + dy, 3, AM); st(ctx, AM, .4); ctx.beginPath(); ctx.arc(x + dx, y + dy, 9, 0, TAU); ctx.stroke(); }
      else { st(ctx, T.line, .12); sg(ctx, x, y, x, by); dt(ctx, x, y, 2.4, T.dot, .8); } } },

  creep(ctx, w, h, t, T) { const cx = w / 2, cy = h / 2, m = Math.min(w, h), n = Math.floor((t * .9) % 11) + 1;
    for (let i = 1; i <= n; i++) { st(ctx, i > 8 ? AM : T.line, i > 8 ? .8 : .2 + i * .04, 1.2); ctx.beginPath(); ctx.arc(cx, cy, m * .035 * i, 0, TAU); ctx.stroke(); }
    dt(ctx, cx, cy, 4, n === 1 ? CY : T.dot); },

  jit(ctx, w, h, t, T) { const rows = 11; for (let i = 0; i < rows; i++) { const y = h * (.1 + .8 * i / (rows - 1)), P = 3 + (i % 4), p = ((t + i * .9) % P) / P, x0 = w * (.1 + .5 * ((i * 37) % 10) / 10);
    st(ctx, T.line, .15); sg(ctx, w * .05, y, w * .95, y);
    if (p < .5) { const k = p / .5, len = w * .3 * Math.min(1, k * 2), g = ctx.createLinearGradient(x0, 0, x0 + len, 0); g.addColorStop(0, rgba(CY, .9 * (1 - k))); g.addColorStop(1, rgba(CY, .9)); ctx.fillStyle = g; ctx.fillRect(x0, y - 3, len, 6); } } },

  vault(ctx, w, h, t, T) { const cx = w / 2, cy = h / 2, m = Math.min(w, h); glow(ctx, cx, cy, m * .35, T.glow, .35);
    for (let i = 6; i >= 1; i--) { const s = m * .11 * i; ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * .08 * i * (i % 2 ? 1 : -1)); st(ctx, T.line, .55 - i * .06, 1.2); ctx.strokeRect(-s / 2, -s / 2, s, s); ctx.restore(); }
    ctx.fillStyle = rgba(CY, .9); ctx.fillRect(cx - 5, cy - 5, 10, 10); },

  session(ctx, w, h, t, T) { const rows = 3, fw = w / 9, fh = h * .2, ph = ((t * .08) % 1) * w;
    for (let r = 0; r < rows; r++) { const y = h * (.18 + r * .26); for (let i = 0; i < 10; i++) { const x = i * fw - ((t * 12 * (r % 2 ? 1 : -1)) % fw + fw) % fw, past = x < ph;
      st(ctx, T.line, past ? .55 : .2); ctx.strokeRect(x + 4, y, fw - 8, fh); for (let s = 0; s < 4; s++) { dt(ctx, x + 10 + s * (fw - 20) / 3, y - 6, 1.4, T.dot, .3); dt(ctx, x + 10 + s * (fw - 20) / 3, y + fh + 6, 1.4, T.dot, .3); } } }
    st(ctx, CY, .9, 1.6); sg(ctx, ph, h * .08, ph, h * .92); dt(ctx, ph, h * .08, 4, CY); },

  rotate(ctx, w, h, t, T) { const cx = w / 2, cy = h / 2, r = Math.min(w, h) * .36, n = 72, head = (t * .6) % TAU;
    for (let i = 0; i < n; i++) { const a = i / n * TAU, d = ((head - a) % TAU + TAU) % TAU, fresh = d < 1.2, l = 8 + 10 * Math.sin(i * .7);
      st(ctx, fresh ? CY : T.line, fresh ? 1 - d / 1.2 * .7 : .3, 2); sg(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r, cx + Math.cos(a) * (r - l), cy + Math.sin(a) * (r - l)); }
    dt(ctx, cx + Math.cos(head) * (r + 10), cy + Math.sin(head) * (r + 10), 3.5, CY); },

  sprawl(ctx, w, h, t, T) { const R = rng(17), p = Math.min(1, ((t * .12) % 1.3)), k = p * p * (3 - 2 * p), bx = w / 2 - 50, by = h / 2 - 35;
    st(ctx, CY, .5 * k); ctx.strokeRect(bx - 10, by - 10, 120, 90);
    for (let i = 0; i < 60; i++) { const x0 = R() * w, y0 = R() * h, a0 = R() * TAU, x1 = bx + (i % 10) * 10 + 5, y1 = by + Math.floor(i / 10) * 12 + 5, x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k, a = a0 * (1 - k);
      st(ctx, k > .95 ? CY : T.line, .7, 1.6); sg(ctx, x - 4 * Math.cos(a), y - 4 * Math.sin(a), x + 4 * Math.cos(a), y + 4 * Math.sin(a)); } },

  tokens(ctx, w, h, t, T) { const R = rng(23), ex = w * .12, ey = h / 2; dt(ctx, ex, ey, 6, CY); glow(ctx, ex, ey, 40, CY, .3);
    for (let i = 0; i < 46; i++) { const a = (R() - .5) * 1.6, sp = .5 + R() * .5, L = 3, age = (t + i * .29) % L, d = age / L * w * .9 * sp, x = ex + Math.cos(a) * d, y = ey + Math.sin(a) * d, al = 1 - age / L;
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.fillStyle = rgba(T.dot, al); ctx.fillRect(-2.5, -2.5, 5, 5); ctx.restore(); } },

  nhi(ctx, w, h, t, T) { const s = 14, cols = Math.floor(w / s), rows = Math.floor(h / s);
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const n = i * 7 + j * 13, x = i * s + s / 2, y = j * s + s / 2;
      if (n % 45 === 0) { dt(ctx, x, y, 3, T.dot); st(ctx, CY, .8); ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.stroke(); }
      else { const blink = Math.sin(t * 1.5 + n) > .985; ctx.fillStyle = blink ? rgba(CY, .9) : rgba(T.line, .3); ctx.fillRect(x - 2.5, y - 2.5, 5, 5); } } },

  agents(ctx, w, h, t, T) { const cols = 9, rows = 4;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const x = w * (.08 + .84 * i / (cols - 1)) + 4 * Math.sin(t * .6 + i + j), y = h * (.16 + .5 * j / (rows - 1)) + 4 * Math.cos(t * .5 + i * 2), rogue = (i * 3 + j * 5) % 17 === 0, s = 7;
      if (!rogue) { st(ctx, CY, .45); sg(ctx, x, y + s, x, y + s + 16); dt(ctx, x, y + s + 18, 2, CY, .8); }
      st(ctx, rogue ? AM : T.dot, rogue ? 1 : .85, 1.4); ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x + s, y); ctx.lineTo(x, y + s); ctx.lineTo(x - s, y); ctx.closePath(); ctx.stroke(); } },

  guardrail(ctx, w, h, t, T) { const bx = w * .6, cy = h / 2, gate = h * .07;
    st(ctx, T.line, .6, 1.4); ctx.beginPath(); ctx.moveTo(bx + 30, 0); ctx.quadraticCurveTo(bx - 30, cy, bx + 30, h); ctx.stroke();
    for (let i = 0; i < 22; i++) { const y0 = h * (.05 + .9 * i / 21), pass = Math.abs(y0 - cy) < gate, edge = bx + 30 - 60 * (1 - Math.pow((y0 - cy) / cy, 2)) * .5 - 15;
      st(ctx, pass ? CY : T.line, pass ? .9 : .3, pass ? 1.6 : 1); ctx.beginPath(); ctx.moveTo(0, y0);
      if (pass) ctx.lineTo(w, y0); else { const sgn = y0 < cy ? -1 : 1; ctx.lineTo(edge, y0); ctx.quadraticCurveTo(edge + 20, y0, edge + 10, y0 + sgn * 40); }
      ctx.stroke(); const p = (t * .3 + i * .11) % 1; if (pass || p * w < edge) dt(ctx, p * (pass ? w : edge), y0, 2, pass ? CY : T.dot, .9); } },

  anomaly(ctx, w, h, t, T) { const R = rng(31), cx = w * .42, cy = h / 2; st(ctx, T.line, .35); ctx.beginPath(); ctx.ellipse(cx, cy, w * .22, h * .22, -.3, 0, TAU); ctx.stroke();
    for (let i = 0; i < 260; i++) { const x = cx + gauss(R) * w * .08, y = cy + gauss(R) * h * .08 + 3 * Math.sin(t + i); dt(ctx, x, y, 1.6, T.dot, .55); }
    const ox = w * .82 + 6 * Math.sin(t * .8), oy = h * .25; dt(ctx, ox, oy, 4, AM); st(ctx, AM, .6 + .4 * Math.sin(t * 3)); ctx.beginPath(); ctx.arc(ox, oy, 14, 0, TAU); ctx.stroke();
    ctx.setLineDash([3, 4]); st(ctx, CY, .6); sg(ctx, cx, cy, ox, oy); ctx.setLineDash([]); },

  lateral(ctx, w, h, t, T) { const cols = 9, rows = 5, P = (i, j) => [w * (.08 + .84 * i / (cols - 1)), h * (.14 + .72 * j / (rows - 1))];
    st(ctx, T.line, .15); for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { if (i < cols - 1) sg(ctx, ...P(i, j), ...P(i + 1, j)); if (j < rows - 1) sg(ctx, ...P(i, j), ...P(i, j + 1)); dt(ctx, ...P(i, j), 2.2, T.dot, .6); }
    const path = [[0, 2], [1, 2], [1, 1], [2, 1], [3, 1], [3, 2], [4, 2]], k = Math.min(path.length - 1, Math.floor((t * 1.2) % (path.length + 2)));
    st(ctx, AM, .8, 1.6); for (let s = 0; s < k; s++) sg(ctx, ...P(...path[s]), ...P(...path[s + 1]));
    dt(ctx, ...P(...path[k]), 4, AM); const [wx, wy] = P(4.5, 2); st(ctx, CY, 1, 3); sg(ctx, wx, wy - 22, wx, wy + 22); },

  blast(ctx, w, h, t, T) { const bx = w * .25, by = h * .22, bw = w * .5, bh = h * .56, cx = w * .45, cy = h * .55, R = rng(4);
    for (let i = 0; i < 160; i++) dt(ctx, R() * w, R() * h, 1.3, T.dot, .3);
    ctx.save(); ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 12); ctx.clip();
    for (let k = 0; k < 5; k++) { const r = ((t * 30 + k * 40) % 200); st(ctx, AM, .7 * (1 - r / 200), 1.4); ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke(); } ctx.restore();
    st(ctx, CY, .9, 1.6); ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 12); ctx.stroke(); dt(ctx, cx, cy, 4, AM); },

  microseg(ctx, w, h, t, T) { const r = 18, dx = r * 1.732, act = Math.floor(t * 1.2);
    let n = 0; for (let y = 0, row = 0; y < h + r; y += r * 1.5, row++) for (let x = (row % 2) * dx / 2; x < w + dx; x += dx, n++) {
      const on = (n * 7) % 53 === act % 53; st(ctx, on ? CY : T.line, on ? 1 : .25, on ? 1.6 : 1); ctx.beginPath();
      for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3, px = x + (r - 3) * Math.cos(a), py = y + (r - 3) * Math.sin(a); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.stroke(); dt(ctx, x, y, on ? 3 : 1.5, on ? CY : T.dot, on ? 1 : .5); } },

  perimeter(ctx, w, h, t, T) { const p = (Math.sin(t * .4) + 1) / 2, R = rng(66); ctx.setLineDash([8, 6]); st(ctx, T.line, .8 * (1 - p), 1.6); ctx.strokeRect(w * .1, h * .12, w * .8, h * .76); ctx.setLineDash([]);
    for (let i = 0; i < 26; i++) { const x = w * (.15 + .7 * R()), y = h * (.18 + .64 * R()); dt(ctx, x, y, 2.6, T.dot); st(ctx, CY, .9 * p); ctx.beginPath(); ctx.arc(x, y, 4 + 8 * p, 0, TAU); ctx.stroke(); } },

  heartbeat(ctx, w, h, t, T) { const cy = h * .55, off = (t * 80) % (w / 4); st(ctx, T.line, .2); sg(ctx, 0, cy, w, cy); st(ctx, CY, .9, 1.6); ctx.beginPath();
    for (let x = 0; x <= w; x += 2) { const u = ((x + off) % (w / 4)) / (w / 4), y = cy - (u > .45 && u < .5 ? 50 * Math.sin((u - .45) / .05 * Math.PI) : u > .5 && u < .54 ? -18 * Math.sin((u - .5) / .04 * Math.PI) : 0); x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    for (let k = 0; k < 5; k++) { const x = k * w / 4 + w / 4 * .475 - off; if (x < 0 || x > w) continue; st(ctx, T.dot, .7, 1.4); ctx.beginPath(); ctx.moveTo(x - 5, cy - 72); ctx.lineTo(x - 1, cy - 68); ctx.lineTo(x + 6, cy - 77); ctx.stroke(); } },

  gauge(ctx, w, h, t, T) { const cx = w / 2, cy = h * .78, r = Math.min(w / 2, h) * .7, v = .5 + .35 * Math.sin(t * .5) + .05 * Math.sin(t * 2.3);
    for (let i = 0; i <= 40; i++) { const a = Math.PI + i / 40 * Math.PI, hot = i > 32; st(ctx, hot ? AM : T.line, hot ? .9 : .45, i % 5 ? 1 : 2); sg(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r, cx + Math.cos(a) * (r - (i % 5 ? 8 : 16)), cy + Math.sin(a) * (r - (i % 5 ? 8 : 16))); }
    const a = Math.PI + v * Math.PI; st(ctx, CY, 1, 2); sg(ctx, cx, cy, cx + Math.cos(a) * (r - 24), cy + Math.sin(a) * (r - 24)); dt(ctx, cx, cy, 5, CY); },

  posture(ctx, w, h, t, T) { const n = 44, bw = w / n, p = ((t * .15) % 1.4), k = Math.min(1, p), tgt = h * .45, R = rng(12);
    st(ctx, CY, .8); ctx.setLineDash([4, 4]); sg(ctx, 0, h - tgt, w, h - tgt); ctx.setLineDash([]);
    for (let i = 0; i < n; i++) { const noisy = h * (.15 + .7 * R()) * (.8 + .2 * Math.sin(t * 3 + i)), bh = noisy + (tgt - noisy) * k * k * (3 - 2 * k); ctx.fillStyle = rgba(T.line, .35 + .3 * k); ctx.fillRect(i * bw + 1.5, h - bh, bw - 3, bh); } },

  terrain(ctx, w, h, t, T) { const rows = 26; let peak = [0, h];
    for (let j = 0; j < rows; j++) { const y0 = h * .25 + j * h * .7 / rows; ctx.beginPath(); ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 5) { const e = Math.exp(-((x - w * .62) ** 2) / 900 - ((j - 14) ** 2) / 12), y = y0 - 10 * Math.sin(x * .02 + j * .5 + t * .3) - 6 * Math.sin(x * .05 - j) - 70 * e; ctx.lineTo(x, y); if (y < peak[1]) peak = [x, y]; }
      ctx.lineTo(w, h); ctx.fillStyle = T.bg; ctx.fill(); st(ctx, T.line, .15 + .35 * j / rows); ctx.stroke(); }
    dt(ctx, peak[0], peak[1] - 6, 4, AM); },

  honeypot(ctx, w, h, t, T) { const cols = 12, rows = 6, s = Math.min(w / (cols + 1), h / (rows + 1)), ox = (w - cols * s) / 2, oy = (h - rows * s) / 2, ti = 8, tj = 2;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const trap = i === ti && j === tj; st(ctx, trap ? CY : T.line, trap ? 1 : .25, trap ? 1.6 : 1); ctx.strokeRect(ox + i * s + 4, oy + j * s + 4, s - 8, s - 8); }
    const tx = ox + ti * s + s / 2, ty = oy + tj * s + s / 2; glow(ctx, tx, ty, s * 1.2, CY, .35);
    const p = (t * .15) % 1, x = ox + s / 2 + (tx - ox - s / 2) * Math.min(1, p * 1.4), y = oy + (rows - 1) * s + s / 2 + (ty - oy - (rows - 1) * s - s / 2) * Math.min(1, p * 1.4); dt(ctx, x, y, 4, AM);
    if (p > .72) { st(ctx, CY, 1 - (p - .72) / .28); ctx.beginPath(); ctx.arc(tx, ty, (p - .72) * 200, 0, TAU); ctx.stroke(); } },

  contain(ctx, w, h, t, T) { const R = rng(50), cx = w * .55, cy = h / 2, p = (t * .18) % 1, r = Math.min(w, h) * .38 * Math.sin(p * Math.PI);
    for (let i = 0; i < 200; i++) { const x = R() * w, y = R() * h, inside = Math.hypot(x - cx, y - cy) < r; dt(ctx, x, y, 1.5, inside ? AM : T.dot, inside ? .8 : .35); }
    st(ctx, CY, .9, 1.6); ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke(); dt(ctx, cx, cy, 4, AM); },

  forensic(ctx, w, h, t, T) { const cx = w / 2, gap = 34, off = (t * 18) % gap; st(ctx, T.line, .5, 1.4); sg(ctx, cx, 0, cx, h);
    for (let k = -1; k < h / gap + 1; k++) { const y = k * gap - off + gap, n = Math.floor(k + t * 18 / gap), side = n % 2 ? 1 : -1, len = 30 + (n * 37 % 60), hot = n % 9 === 0;
      st(ctx, hot ? AM : T.line, hot ? .9 : .4); sg(ctx, cx, y, cx + side * len, y); dt(ctx, cx + side * len, y, 3, hot ? AM : T.dot, .9); dt(ctx, cx, y, 2.4, CY); } },

  classify(ctx, w, h, t, T) { const R = rng(9), bands = [[.06, .32, 50, T.line, .45], [.36, .62, 140, T.line, .6], [.66, .94, 300, CY, .9]];
    bands.forEach(([a, b, n, c, al]) => { st(ctx, T.line, .2); ctx.strokeRect(w * .04, h * a, w * .92, h * (b - a)); for (let i = 0; i < n; i++) { const x = w * .05 + R() * w * .9 + 3 * Math.sin(t + i), y = h * a + 4 + R() * (h * (b - a) - 8); dt(ctx, x, y, 1.4, c, al); } }); },

  consent(ctx, w, h, t, T) { const cols = 6, rows = 5, pw = 46, ph = 22, sx = w / cols, sy = h / rows;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const x = sx * i + (sx - pw) / 2, y = sy * j + (sy - ph) / 2, on = Math.sin(t * .6 + i * 1.7 + j * 2.3) > 0;
      ctx.beginPath(); ctx.roundRect(x, y, pw, ph, ph / 2); ctx.fillStyle = on ? rgba(CY, .25) : 'transparent'; ctx.fill(); st(ctx, on ? CY : T.line, on ? .9 : .4); ctx.stroke(); dt(ctx, on ? x + pw - ph / 2 : x + ph / 2, y + ph / 2, ph / 2 - 4, on ? CY : T.dot, on ? 1 : .6); } },

  flow(ctx, w, h, t, T) { const s = 16; for (let x = s / 2; x < w; x += s) for (let y = s / 2; y < h; y += s) { const a = Math.sin(x * .012 + t * .25) + Math.cos(y * .015 - t * .2), l = 6, hot = Math.abs(a) < .06;
    st(ctx, hot ? CY : T.line, hot ? .9 : .35, hot ? 1.6 : 1); sg(ctx, x - Math.cos(a) * l, y - Math.sin(a) * l, x + Math.cos(a) * l, y + Math.sin(a) * l); } },

  funnel(ctx, w, h, t, T) { const nx = w * .55, cy = h / 2; for (let i = 0; i < 24; i++) { const y0 = h * (.05 + .9 * i / 23), yo = cy + (y0 - cy) * .08, pass = i % 4 === 1;
    st(ctx, T.line, .3); ctx.beginPath(); ctx.moveTo(0, y0); ctx.bezierCurveTo(w * .35, y0, w * .4, yo, nx, yo); if (pass) ctx.lineTo(w, yo + (yo - cy) * 3); ctx.stroke();
    const p = (t * .2 + i * .09) % 1; if (pass || p < .55) { const x = p * w, y = x < nx ? y0 + (yo - y0) * Math.min(1, Math.max(0, (x - w * .3) / (nx - w * .3))) : yo + (yo - cy) * 3 * (x - nx) / (w - nx); dt(ctx, x, y, 2.2, x > nx ? CY : T.dot, .9); } } },

  passkey(ctx, w, h, t, T) { const cx = w / 2, cy = h / 2, r = Math.min(w, h) * .2, a = t * .5, p1 = [cx + Math.cos(a) * r, cy + Math.sin(a) * r * .6], p2 = [cx - Math.cos(a) * r, cy - Math.sin(a) * r * .6];
    st(ctx, T.line, .25); ctx.beginPath(); ctx.ellipse(cx, cy, r, r * .6, 0, 0, TAU); ctx.stroke(); st(ctx, CY, .7, 1.4); sg(ctx, ...p1, ...p2);
    glow(ctx, ...p1, 50, CY, .35); dt(ctx, ...p1, 12, CY); st(ctx, T.dot, 1, 2); ctx.beginPath(); ctx.arc(...p2, 12, 0, TAU); ctx.stroke(); },

  chain(ctx, w, h, t, T) { const n = 5, p = (t * .5) % (n + 1); for (let i = 0; i < n; i++) { const x = w * (.1 + .17 * i), y = h * (.25 + .12 * i), on = p > i;
    if (i) { st(ctx, on ? CY : T.line, on ? .9 : .3, 1.4); sg(ctx, x - w * .17 + 50, y - h * .12 + 16, x, y + 16); }
    ctx.beginPath(); ctx.roundRect(x, y, 50, 32, 6); st(ctx, on ? CY : T.line, on ? .95 : .4, 1.4); ctx.stroke(); dt(ctx, x + 12, y + 16, 3, on ? CY : T.dot, on ? 1 : .5);
    st(ctx, T.line, .4); sg(ctx, x + 22, y + 12, x + 40, y + 12); sg(ctx, x + 22, y + 20, x + 34, y + 20); } },

  hash(ctx, w, h, t, T) { const R = rng(19), n = 15, bx = w * .42, bw = w * .16;
    for (let i = 0; i < n; i++) { const y = h * (.1 + .8 * i / (n - 1)), l = w * (.08 + .3 * R()); st(ctx, T.line, .5, 1.6); sg(ctx, bx - l, y, bx, y); st(ctx, CY, .85, 1.6); sg(ctx, bx + bw, y, bx + bw + w * .26, y); }
    ctx.fillStyle = rgba(T.glow, .12); ctx.fillRect(bx, h * .06, bw, h * .88);
    for (let x = 0; x < bw; x += 4) { st(ctx, T.line, .15 + .25 * Math.abs(Math.sin(x * .3 + t * 4))); sg(ctx, bx + x, h * .06, bx + x, h * .94); } },

  exchange(ctx, w, h, t, T) { const A = [w * .18, h / 2], B = [w * .82, h / 2], M = [w / 2, h / 2]; glow(ctx, ...M, 70, CY, .25 + .15 * Math.sin(t));
    for (let k = 0; k < 4; k++) { const c1 = [w / 2, h * (.1 + k * .08)], c2 = [w / 2, h * (.9 - k * .08)]; st(ctx, T.line, .25); qd(ctx, A, c1, B); qd(ctx, B, c2, A);
      const p = (t * .25 + k * .25) % 1; dt(ctx, ...qp(A, c1, B, p), 2.6, T.dot); dt(ctx, ...qp(B, c2, A, p), 2.6, CY); }
    dt(ctx, ...A, 7, T.dot); dt(ctx, ...B, 7, CY); dt(ctx, ...M, 3, CY, .9); },

  ciem(ctx, w, h, t, T) { const R = rng(29), blobs = [[.42, .55, .16], [.56, .45, .2], [.7, .57, .14]], inC = (x, y) => blobs.some(([a, b, r]) => Math.hypot(x - w * a, y - h * b) < Math.min(w, h) * r * 1.5);
    for (let x = 6; x < w; x += 9) for (let y = 6; y < h; y += 9) if (inC(x, y)) dt(ctx, x, y, 1.3, T.line, .55);
    for (let i = 0; i < 24; i++) { const sx = R() < .5 ? R() * w * .15 : w - R() * w * .1, sy = R() * h, tx = w * (.45 + R() * .2), ty = h * (.45 + R() * .1), live = Math.sin(t * .5 + i * 1.3) > -.3;
      ctx.setLineDash(live ? [] : [3, 4]); st(ctx, live ? T.line : AM, live ? .3 : .6); sg(ctx, sx, sy, tx, ty); ctx.setLineDash([]); dt(ctx, sx, sy, 2.4, T.dot, .8); } },

  hybrid(ctx, w, h, t, T) { const R = rng(35), n = 10, by = h * .82; for (let i = 0; i < n; i++) { const x = w * (.08 + .84 * i / (n - 1)), tx = w * (.15 + .7 * R()), ty = h * (.12 + .3 * R());
    st(ctx, T.line, .55); ctx.strokeRect(x - 9, by - 9, 18, 18); st(ctx, T.line, .2); qd(ctx, [x, by - 10], [x, ty + 40], [tx, ty]); dt(ctx, tx, ty, 2.6, T.dot, .9);
    const p = (t * .3 + i * .1) % 1; dt(ctx, ...qp([x, by - 10], [x, ty + 40], [tx, ty], p), 2.4, CY); } },

  cadence(ctx, w, h, t, T) { const cx = w / 2, cy = h / 2, r = Math.min(w, h) * .38, act = Math.floor(t * .8) % 12;
    for (let i = 0; i < 12; i++) { const a0 = i / 12 * TAU - Math.PI / 2 + .04, a1 = (i + 1) / 12 * TAU - Math.PI / 2 - .04, on = i === act; st(ctx, on ? CY : T.line, on ? 1 : .3, on ? 10 : 6); ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1); ctx.stroke(); }
    for (let i = 0; i < 52; i++) { const a = i / 52 * TAU; st(ctx, T.line, .3); sg(ctx, cx + Math.cos(a) * r * .78, cy + Math.sin(a) * r * .78, cx + Math.cos(a) * r * .72, cy + Math.sin(a) * r * .72); } dt(ctx, cx, cy, 4, CY); },

  mapping(ctx, w, h, t, T) { const R = rng(43), L = 9, Rn = 13, act = Math.floor(t * .6) % L, links = Array.from({ length: L }, () => [Math.floor(R() * Rn), Math.floor(R() * Rn), Math.floor(R() * Rn)]);
    const lp = i => [w * .18, h * (.1 + .8 * i / (L - 1))], rp = j => [w * .82, h * (.07 + .86 * j / (Rn - 1))];
    links.forEach((ls, i) => ls.forEach(j => { const on = i === act; st(ctx, on ? CY : T.line, on ? .9 : .15, on ? 1.6 : 1); const a = lp(i), b = rp(j); ctx.beginPath(); ctx.moveTo(...a); ctx.bezierCurveTo(w * .5, a[1], w * .5, b[1], ...b); ctx.stroke(); }));
    for (let i = 0; i < L; i++) dt(ctx, ...lp(i), i === act ? 5 : 3, i === act ? CY : T.dot); for (let j = 0; j < Rn; j++) { st(ctx, T.dot, .8); const [x, y] = rp(j); ctx.strokeRect(x - 4, y - 4, 8, 8); } },

  code(ctx, w, h, t, T) { const R = rng(27), rows = 16, act = Math.floor(t * 2) % rows; for (let j = 0; j < rows; j++) { const y = h * (.08 + .84 * j / (rows - 1)), ind = [0, 1, 2, 2, 1, 2, 3, 3, 2, 1, 0, 1, 2, 1, 0, 0][j], on = j === act, match = j % 5 === 2;
    if (on) { ctx.fillStyle = rgba(T.glow, .15); ctx.fillRect(0, y - 8, w, 16); } let x = w * .08 + ind * 22; const parts = 1 + Math.floor(R() * 3);
    for (let p = 0; p < parts; p++) { const l = 20 + R() * 70; ctx.fillStyle = rgba(match && p === 0 ? CY : T.line, on ? .95 : .4); ctx.fillRect(x, y - 3, l, 6); x += l + 10; } } },

  standing(ctx, w, h, t, T) { const cy = h * .7; st(ctx, T.line, .5, 1.4); sg(ctx, 0, cy, w, cy);
    for (let i = 0; i < 30; i++) { const x = w * (i + .5) / 30, P = 3 + i % 5, p = ((t + i * .7) % P) / P; if (p > .25) continue; const k = Math.sin(p / .25 * Math.PI), hh = h * .5 * k; st(ctx, CY, .9 * k, 3); sg(ctx, x, cy, x, cy - hh); dt(ctx, x, cy - hh, 3, CY, k); } },

  resolve(ctx, w, h, t, T) { const R = rng(53), p = (Math.sin(t * .5) + 1) / 2, k = p * p * (3 - 2 * p);
    for (let c = 0; c < 9; c++) { const cx = w * (.12 + .76 * (c % 3) / 2), cy = h * (.2 + .6 * Math.floor(c / 3) / 2); dt(ctx, cx, cy, 3 + 4 * k, k > .9 ? CY : T.dot, .3 + .7 * k);
      for (let i = 0; i < 5; i++) { const x0 = cx + (R() - .5) * w * .22, y0 = cy + (R() - .5) * h * .22, x = x0 + (cx - x0) * k, y = y0 + (cy - y0) * k; st(ctx, T.line, .25 * (1 - k)); sg(ctx, x, y, cx, cy); dt(ctx, x, y, 2, T.dot, 1 - k); } } },

  tree(ctx, w, h, t, T) { const lv = 4, act = Math.floor(t * .7) % 27; const node = (x, y, d, idx, span) => { dt(ctx, x, y, 3, T.dot, .9); if (d === lv - 1) return;
    for (let k = 0; k < 3; k++) { const nx = x + (k - 1) * span, ny = y + h * .26, child = idx * 3 + k, onPath = Math.floor(act / Math.pow(3, lv - 2 - d)) === child;
      st(ctx, onPath ? CY : T.line, onPath ? .95 : .3, onPath ? 1.8 : 1); sg(ctx, x, y, nx, ny); node(nx, ny, d + 1, child, span / 3); } };
    node(w / 2, h * .1, 0, 0, w * .3); },

  trinity(ctx, w, h, t, T) { const r = Math.min(w, h) * .27, b = 3 * Math.sin(t * .6), C = [[w / 2, h * .38 - b], [w / 2 - r * .6 - b, h * .64], [w / 2 + r * .6 + b, h * .64]];
    C.forEach(c => { st(ctx, T.line, .5); ctx.beginPath(); ctx.arc(...c, r, 0, TAU); ctx.stroke(); });
    for (let x = 0; x < w; x += 10) for (let y = 0; y < h; y += 10) { const n = C.filter(c => Math.hypot(x - c[0], y - c[1]) < r).length; if (n) dt(ctx, x, y, n === 3 ? 2.2 : 1.1, n === 3 ? CY : T.line, n === 3 ? 1 : .2 + n * .15); } },

  recover(ctx, w, h, t, T) { const cy = h * .5, dx = ((t * .12) % 1.3) * w - w * .15; st(ctx, T.line, .2); sg(ctx, 0, cy, w, cy); ctx.beginPath();
    for (let x = 0; x <= w; x += 3) { const u = x - dx, y = cy + (u > 0 && u < 160 ? 60 * Math.sin(u / 160 * Math.PI) * Math.exp(-u / 120) : 0) + 2 * Math.sin(x * .1 + t * 3); x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    st(ctx, CY, .9, 1.6); ctx.stroke(); if (dx > 0 && dx < w) dt(ctx, dx + 30, cy + 40, 3.5, AM); },

  telemetry(ctx, w, h, t, T) { const R = rng(14), cols = 40, bw = w / cols, fill = (t * .08) % 1; for (let i = 0; i < cols; i++) { const sp = 40 + R() * 80, ph = R() * h;
    for (let k = 0; k < 4; k++) { const y = ((t * sp + ph + k * h / 4) % (h * .8)); st(ctx, T.line, .4 * (1 - y / (h * .8))); sg(ctx, i * bw + bw / 2, y, i * bw + bw / 2, y + 6); }
    const bh = h * .15 * (fill + .3 * R()) ; ctx.fillStyle = rgba(i % 9 === 4 ? CY : T.line, .5); ctx.fillRect(i * bw + 1.5, h - bh, bw - 3, bh); } },

  residency(ctx, w, h, t, T) { const R = rng(71), regions = [[0, w * .38], [w * .38, w * .7], [w * .7, w]]; regions.forEach(([a, b], i) => { if (i) { st(ctx, T.line, .8, 2); sg(ctx, a, h * .05, a, h * .95); } ctx.fillStyle = rgba(T.glow, .04 + i * .03); ctx.fillRect(a, 0, b - a, h);
    for (let k = 0; k < 26; k++) { const bx = a + 12 + R() * (b - a - 24), by = 12 + R() * (h - 24), x = a + 12 + Math.abs(((bx - a - 12 + t * 20 * (R() + .3)) % (2 * (b - a - 24))) - (b - a - 24)) , y = by + 6 * Math.sin(t + k); dt(ctx, Math.min(b - 12, x), y, 2, i === 1 ? CY : T.dot, .85); } }); },
});

PIECES.layered = PIECES.depth; // alias guard
})();

export { PIECES, THEMES };
export function mountPattern(cv, piece, theme) {
  const ctx = cv.getContext('2d'), T = THEMES[theme] || THEMES.dark, fn = PIECES[piece] || PIECES.orbits;
  let w = 0, h = 0, vis = false, raf = 0, dead = false; const t0 = performance.now();
  const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); w = r.width; h = r.height; cv.width = Math.max(1, w * d); cv.height = Math.max(1, h * d); ctx.setTransform(d, 0, 0, d, 0, 0); draw(6); };
  const draw = (t) => { if (!w) return; ctx.fillStyle = T.bg; ctx.fillRect(0, 0, w, h); ctx.lineCap = 'round'; fn(ctx, w, h, t, T); };
  const ro = new ResizeObserver(size); ro.observe(cv);
  const io = new IntersectionObserver((es) => { vis = es[0].isIntersecting; }); io.observe(cv);
  const frame = (now) => { if (dead) return; if (vis) draw(REDUCED ? 6 : (now - t0) / 1000); if (!REDUCED) raf = requestAnimationFrame(frame); };
  size(); raf = requestAnimationFrame(frame);
  return () => { dead = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
}
