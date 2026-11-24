// Section components for the inner-page templates (wireframe component codes in comments).
import Link from 'next/link';
import Faq from './Faq';
import PixelButton from './PixelButton';
import LoopVideo from './LoopVideo';
import SolMedia from './SolMedia';
import { STORIES, RESOURCES } from '../lib/site';

const n2 = (i) => String(i).padStart(2, '0');
const Arr = () => <span aria-hidden="true">→</span>;

export function Sec({ tone = 'light', id, className = '', children, label }) {
  const t = tone === 'gray' ? ' y-tint' : tone === 'dark' ? ' y-dark pg-dark' : '';
  return <section id={id} aria-label={label} className={`y-sec pg-sec${t} ${className}`}><div className="y-wrap">{children}</div></section>;
}

export function Head({ label, h, aside, link, href = '#', center, dark }) {
  return (
    <div className={`y-head${center ? ' center' : ''}${dark ? ' dark' : ''}`}>
      <div className="y-head-l">
        {label && <span className={`eyebrow${dark ? ' light' : ''}`}>{label}</span>}
        <h2 className="y-h2" data-split>{h}</h2>
      </div>
      {(aside || link) && (
        <div className="y-head-r">
          {aside && <p>{aside}</p>}
          {link && <Link href={href} className={`y-btn ${dark ? 'light' : 'dark'} sm`}>{link} <Arr /></Link>}
        </div>
      )}
    </div>
  );
}

export function Crumbs({ items }) {
  return (
    <nav className="pg-crumbs" aria-label="Breadcrumb">
      <ol>{items.map(([t, h], i) => <li key={t}>{h && i < items.length - 1 ? <Link href={h}>{t}</Link> : <span aria-current={i === items.length - 1 ? 'page' : undefined}>{t}</span>}</li>)}</ol>
    </nav>
  );
}

/* C01 — split hero, dark, with a stage (image + chips or a glyph loop) */
export function HeroSplit({ crumbs, eyebrow, h1, lead, a = ['Talk to an expert', '/#contact'], b = ['See how we work', '#how'], img, anim, chips = [], lockup }) {
  return (
    <section className="pg-hero pg-hero-split">
      <div className="pg-hero-in">
        <div className="pg-hero-copy">
          {crumbs && <Crumbs items={crumbs} />}
          <span className="eyebrow light" data-hero-in>{eyebrow}</span>
          <h1 className="pg-h1" data-hero-in>{h1}</h1>
          <p className="pg-lead" data-hero-in>{lead}</p>
          <div className="y-btns" data-hero-in>
            <PixelButton href={a[1]} variant="blue">{a[0]} <span className="px-ic">→</span></PixelButton>
            <PixelButton href={b[1]} variant="glass">{b[0]} <span className="px-ic">→</span></PixelButton>
          </div>
        </div>
        <div className="pg-stage" data-hero-in>
          {img && <img src={img} alt="" aria-hidden="true" fetchPriority="high" />}
          {lockup && <span className="pg-lockup"><b>{lockup}</b><small>× TechDemocracy</small></span>}
          {chips.length > 0 && <div className="pg-chips">{chips.map((c) => <span key={c}><i />{c}</span>)}</div>}
        </div>
      </div>
    </section>
  );
}

/* C01b — secondary hero, light, with a glyph-loop visual */
export function HeroLight({ crumbs, eyebrow, chip, h1, lead, a = ['Talk to an expert', '/#contact'], b = ['Download the brief', '#'], anim, img }) {
  return (
    <section className="pg-hero pg-hero-light hero-light">
      <div className="pg-hero-in">
        <div className="pg-hero-copy">
          {crumbs && <Crumbs items={crumbs} />}
          {chip ? <span className="pg-chip" data-hero-in>{chip}</span> : <span className="eyebrow" data-hero-in>{eyebrow}</span>}
          <h1 className="pg-h1" data-hero-in>{h1}</h1>
          <p className="pg-lead" data-hero-in>{lead}</p>
          <div className="y-btns" data-hero-in>
            <PixelButton href={a[1]} variant="blue">{a[0]} <span className="px-ic">→</span></PixelButton>
            <PixelButton href={b[1]} variant="light">{b[0]}</PixelButton>
          </div>
        </div>
        <div className={`pg-visual${img ? ' photo' : ''}`} data-hero-in>
          {anim && <LoopVideo src={anim} className="pg-visual-v" />}
          {img && <img src={img} alt="" aria-hidden="true" />}
        </div>
      </div>
    </section>
  );
}

/* C20 — sticky in-page anchor nav */
export { default as AnchorNav } from './AnchorNav';

/* C12 — reality statement + three problem columns (dark) */
export function Reality({ id, label = 'The reality today', lines, items }) {
  return (
    <Sec tone="dark" id={id} className="pg-reality">
      <span className="eyebrow light">{label}</span>
      <p className="pg-statement" data-split><span>{lines[0]}</span> <span className="mut">{lines[1]}</span></p>
      <div className="pg-probs" data-group>
        {items.map(([t, d], i) => (
          <div key={t} className="pg-prob" data-it>
            <span className="pg-prob-tag"><i className={i === 0 ? 'w' : ''} />{t}</span>
            {d && <p>{d}</p>}
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* C21 — before / after ledger */
export function Ledger({ id, h, rows, tone = 'light' }) {
  return (
    <Sec tone={tone} id={id} className="pg-ledger-sec">
      <Head label="What changes" h={h} />
      <div className="pg-ledger" data-rv>
        <div className="pg-led before">
          <span className="pg-led-h">Before</span>
          <ul>{rows.map(([b]) => <li key={b}><i aria-hidden="true">×</i>{b}</li>)}</ul>
        </div>
        <span className="pg-led-arr" aria-hidden="true">→</span>
        <div className="pg-led after">
          <span className="pg-led-h">With TechDemocracy</span>
          <ul>{rows.map(([, a]) => <li key={a}><i aria-hidden="true" />{a}</li>)}</ul>
        </div>
      </div>
    </Sec>
  );
}

/* C11 — stacked capability cards (stick and stack on scroll) */
export function StackCards({ id, label = 'Capabilities', h, items, tone = 'dark' }) {
  return (
    <Sec tone={tone} id={id} className="pg-stack-sec">
      <Head label={label} h={h} dark={tone === 'dark'} center />
      <ol className="pg-stack">
        {items.map(([t, d], i) => (
          <li key={t} className="pg-card" style={{ '--i': i }}>
            <span className="pg-card-n">{n2(i + 1)}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </Sec>
  );
}

/* C23 — proof inline: one quote + one metric, right after the claim */
export function Proof({ q, who, m, ml, href = 'https://www.techdemocracy.com/resources', tone = 'gray' }) {
  return (
    <Sec tone={tone} className="pg-proof-sec" label="Client proof">
      <figure className="pg-proof" data-rv>
        <blockquote>
          <span className="pg-proof-mark" aria-hidden="true">“</span>
          <p>{q}</p>
          <figcaption>{who}</figcaption>
          <a href={href} className="pg-link">Read the story <Arr /></a>
        </blockquote>
        <div className="pg-proof-m"><b>{m}</b><span>{ml}</span></div>
      </figure>
    </Sec>
  );
}

/* C27 — numbered figure */
export function Figure({ id, n = '01', h, rows, tone = 'light', label = 'The TechDemocracy operating model' }) {
  return (
    <Sec tone={tone} id={id} className="pg-fig-sec">
      <div className="pg-fig" data-rv>
        <div className="pg-fig-top"><span className="eyebrow">{label}</span><span className="pg-fig-n">Fig. {n}</span></div>
        <h2 className="y-h2">{h}</h2>
        <div className="pg-fig-rows">
          {rows.map(([l, nodes], i) => (
            <div key={l} className="pg-fig-row">
              <span className="pg-fig-l">{l}</span>
              <div className="pg-fig-nodes" style={{ '--c': nodes.length }}>{nodes.map((x) => <span key={x}>{x}</span>)}</div>
              {i < rows.length - 1 && <span className="pg-fig-flow" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </Sec>
  );
}

/* C14 — steps */
export function Steps({ id, label = 'How it runs', h, items, tone = 'gray' }) {
  return (
    <Sec tone={tone} id={id} className="pg-steps-sec">
      <Head label={label} h={h} />
      <ol className="pg-steps" data-group>
        {items.map(([t, time, d], i) => (
          <li key={t} data-it>
            <span className="pg-step-n">{n2(i + 1)}</span>
            <b>{t}</b>
            {time && <span className="pg-step-t">{time}</span>}
            {d && <p>{d}</p>}
          </li>
        ))}
      </ol>
    </Sec>
  );
}

/* C10 — client stories */
export function Stories({ id, h = 'What clients say.', tags, tone = 'light' }) {
  const list = (tags ? STORIES.filter((s) => s[4].some((t) => tags.includes(t))) : STORIES).concat(STORIES).slice(0, 3);
  const uniq = [...new Map(list.map((s) => [s[1], s])).values()];
  const items = uniq.length >= 3 ? uniq : STORIES.slice(0, 3);
  return (
    <Sec tone={tone} id={id} className="pg-stories-sec">
      <Head label="Client stories" h={h} link="All stories" href="https://www.techdemocracy.com/resources" />
      <div className="pg-stories" data-group>
        {items.map(([who, t, img, href]) => (
          <a key={t} href={href} className="pg-story" data-it target="_blank" rel="noopener">
            <div className="pg-story-img"><img src={img} alt="" loading="lazy" /></div>
            <div className="pg-story-p"><span className="pg-story-who">{who}</span><b>{t}</b><span className="pg-link">Read the story <Arr /></span></div>
          </a>
        ))}
      </div>
    </Sec>
  );
}

/* C08 — related routes (solution cards with glyph loops) */
export function Routes({ id, label = 'Solutions', h, items, tone = 'light', link = 'All solutions', href = '/#solutions' }) {
  return (
    <Sec tone={tone} id={id} className="pg-routes-sec">
      <Head label={label} h={h} link={link} href={href} />
      <div className="pg-routes" style={{ '--n': Math.max(4, items.length) }} data-group>
        {items.map(({ href: to, name, blurb, anim }, i) => (
          <Link key={to} href={to} className="pg-route" data-play data-it>
            <span className="pg-route-n">{n2(i + 1)}</span>
            {anim && <SolMedia src={anim} className="pg-route-v" />}
            <b>{name}</b>
            <span>{blurb}</span>
            <span className="pg-route-a" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </Sec>
  );
}

/* C15 — split FAQ */
export function FaqBlock({ id, items, tone = 'gray' }) {
  return (
    <Sec tone={tone} id={id} className="pg-faq-sec">
      <div className="y-faq">
        <Head label="Quick answers" h="Frequently asked questions" />
        <Faq items={items} />
      </div>
    </Sec>
  );
}

/* C07 — closing statement banner (the one closing CTA) */
export function NextSteps({ h, a = ['Talk to an expert', '/#contact'], b = ['Book a workshop', '/services/advisory-consulting'] }) {
  return (
    <section className="z-cta pg-next" id="contact">
      <img className="y-cta-img" src="/img/bg-next.webp" alt="" aria-hidden="true" loading="lazy" />
      <div className="z-cta-in">
        <span className="eyebrow light">Next steps</span>
        <h2 className="z-h1 sm" data-split>{h}</h2>
        <div className="y-btns center">
          <PixelButton href={a[1]} variant="blue">{a[0]} <span className="px-ic">→</span></PixelButton>
          <PixelButton href={b[1]} variant="glass">{b[0]} <span className="px-ic">→</span></PixelButton>
        </div>
      </div>
    </section>
  );
}

/* C07 — mid-page offer banner (workshop / selection) */
export function OfferBand({ eyebrow = 'Identity workshop', h = 'Two hours. One clear plan.', p = 'Bring your identity estate. Leave with a prioritised roadmap, the quick wins and the risks to fix first.', a = ['Book the workshop', '/#contact'], b = ['See the agenda', '/services/advisory-consulting'] }) {
  return (
    <section className="z-band pg-band">
      <div className="z-band-in">
        <span className="eyebrow light">{eyebrow}</span>
        <h2 className="y-h2 xl light">{h}</h2>
        <p>{p}</p>
        <div className="y-btns">
          <a href={a[1]} className="y-btn white">{a[0]} <span>→</span></a>
          <a href={b[1]} className="y-btn navy">{b[0]} <span>→</span></a>
        </div>
      </div>
      <LoopVideo src="/img/band-glyph" className="z-band-v" />
    </section>
  );
}

/* C13 — metric tiles */
export function Metrics({ items }) {
  return (
    <section className="pg-metrics" aria-label="Key figures">
      <div className="y-wrap"><div className="pg-metrics-in" data-group>
        {items.map(([v, l]) => <div key={l} className="pg-metric" data-it><b>{v}</b><span>{l}</span></div>)}
      </div></div>
    </section>
  );
}

/* C06 — numbered deliverables / editorial columns */
export function Columns({ id, label = 'What you get', h, items, tag = (i) => n2(i + 1), tone = 'light' }) {
  return (
    <Sec tone={tone} id={id} className="pg-cols-sec">
      <Head label={label} h={h} />
      <div className="pg-cols" style={{ '--n': items.length }} data-group>
        {items.map(([t, d], i) => (
          <div key={t} className="pg-col" data-it>
            <span className="pg-col-tag">{tag(i)}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* C14b — coverage levels */
export function Coverage({ id, levels }) {
  return (
    <Sec tone="light" id={id} className="pg-cov-sec">
      <Head label="Coverage" h="Choose your level of support." aside="Names, not prices — we scope every service to your platforms." />
      <div className="pg-cov" data-group>
        {levels.map(([t, hrs, items], i) => (
          <div key={t} className={`pg-cov-c${i === 1 ? ' hi' : ''}`} data-it>
            {i === 1 && <span className="pg-cov-badge">Most chosen</span>}
            <b>{t}</b>
            <span className="pg-cov-h">{hrs}</span>
            <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
            <a href="/#contact" className={`y-btn ${i === 1 ? 'blue' : 'soft'} sm`}>Talk to us <span>→</span></a>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* C04 — credential cards */
export function Credentials({ id, h, items, tone = 'light', link = 'All partners', href = '/partners/sailpoint' }) {
  return (
    <Sec tone={tone} id={id} className="pg-creds-sec">
      <Head label="Credentials" h={h} link={link} href={href} />
      <div className="pg-creds" data-group>
        {items.map(([v, l]) => <div key={v + l} className="pg-cred" data-it><b>{v}</b><span>{l}</span></div>)}
      </div>
    </Sec>
  );
}

/* C24 — dated field notes */
export function FieldNotes({ id, h, items, tone = 'light' }) {
  return (
    <Sec tone={tone} id={id} className="pg-notes-sec">
      <Head label="Field notes" h={h} link="View all" href="https://www.techdemocracy.com/resources" />
      <ul className="pg-notes">
        {items.map(([d, t, title]) => (
          <li key={title}><a href="https://www.techdemocracy.com/resources" target="_blank" rel="noopener">
            <span className="pg-note-d">{d}</span><span className="pg-note-t">{t}</span><b>{title}</b><span className="pg-note-a" aria-hidden="true">→</span>
          </a></li>
        ))}
      </ul>
    </Sec>
  );
}

/* C09 — resources: one feature + two compact */
export function Resources({ id, h = 'Go deeper.', tone = 'light' }) {
  const [f, ...rest] = RESOURCES;
  return (
    <Sec tone={tone} id={id} className="pg-res-sec">
      <Head label="Go deeper" h={h} link="All resources" href="https://www.techdemocracy.com/resources" />
      <div className="pg-res" data-group>
        <a href={f[3]} className="pg-res-f" data-it target="_blank" rel="noopener"><img src={f[2]} alt="" loading="lazy" /><span className="y-pill">{f[0]}</span><b>{f[1]}</b></a>
        <div className="pg-res-l">
          {rest.map(([t, title, img, href]) => (
            <a key={title} href={href} className="pg-res-c" data-it target="_blank" rel="noopener"><img src={img} alt="" loading="lazy" /><div><span className="y-pill">{t}</span><b>{title}</b></div></a>
          ))}
        </div>
      </div>
    </Sec>
  );
}

/* C25 — comparison matrix */
export function Matrix({ id, a, b, rows }) {
  return (
    <Sec tone="light" id={id} className="pg-matrix-sec">
      <Head label="Side by side" h={`${a} vs ${b} — where each fits.`} aside="Neutral criteria from a team that implements both. No scores without a source." />
      <div className="pg-table-wrap" data-rv>
        <table className="pg-table">
          <thead><tr><th scope="col">Criteria</th><th scope="col">{a}</th><th scope="col">{b}</th></tr></thead>
          <tbody>{rows.map(([c, x, y], i) => <tr key={c} className={i === rows.length - 1 ? 'fit' : ''}><th scope="row">{c}</th><td>{x}</td><td>{y}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="pg-note">Comparison reflects our delivery experience and vendor documentation; it will be reviewed before publication.</p>
    </Sec>
  );
}

/* C26 — control map */
export function ControlMap({ id, rows }) {
  return (
    <Sec tone="light" id={id} className="pg-map-sec">
      <Head label="Control map" h="From requirement to control." aside="Each row reviewed with a compliance specialist. We map controls — your auditor decides compliance." />
      <div className="pg-table-wrap" data-rv>
        <table className="pg-table map">
          <thead><tr><th scope="col">Requirement</th><th scope="col">Identity control</th><th scope="col">How we deliver it</th></tr></thead>
          <tbody>{rows.map(([r, c, d]) => <tr key={r}><th scope="row"><span className="pg-req">{r}</span></th><td>{c}</td><td>{d}</td></tr>)}</tbody>
        </table>
      </div>
    </Sec>
  );
}
