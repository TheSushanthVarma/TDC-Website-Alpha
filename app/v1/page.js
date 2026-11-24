// Home — follows wireframe W01 (13 sections) from the Competitor Study & Wireframes, Draft 01.
import Pattern from '../../components/Pattern';
import Services from '../../components/Services';
import Chapters from '../../components/Chapters';
import Faq from '../../components/Faq';
import GridOverlay from '../../components/GridOverlay';
import Motion from '../../components/Motion';
import { NAV, HERO, CHANGE, MODEL, PROOF, SOLUTIONS, PEOPLE, CREDS, NOTES } from '../../lib/content';

const n = (i) => String(i).padStart(2, '0');

// Section head: number + eyebrow on a rule, heading, optional right-hand link.
function Head({ no, label, h, link }) {
  return (
    <div className="grid s-head">
      <div className="rule l-1-17" data-rule />
      <div className="l-1-17 s-meta"><span className="idx">{no}</span><span className="t-cap">{label}</span></div>
      <h2 className="t-h2 l-1-13" data-split>{h}</h2>
      {link && <div className="l-13-17 s-aside"><a href="#" className="link">{link} <span>→</span></a></div>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Motion />
      <GridOverlay />

      <header className="hdr">
        <div className="wrap grid hdr-in">
          <a href="/" className="l-1-4 brand"><img src="/logo.svg" alt="TechDemocracy" /></a>
          <nav className="l-5-13 nav">
            {NAV.map((x) => <a key={x} href="#">{x}</a>)}
            <a href="#" className="nav-ai"><em />AI identity security</a>
          </nav>
          <div className="l-13-17 hdr-r"><a href="#contact">Contact</a><a href="#contact" className="btn sm">Talk to an expert</a></div>
        </div>
      </header>

      <main>
        {/* 01 · Hero (C01) + 02 · logo row — full-bleed media frame, layout after orivex */}
        <section className="ohero">
          <div className="ohero-frame">
            <img className="hero-video hero-glyph" src="/img/hero-glyph.webp" alt="" aria-hidden="true" fetchPriority="high" />
            <div className="ohero-shade" />
            <div className="wrap grid ohero-top">
              <div className="l-1-10">
                <div className="s-meta" data-hero-in><span className="idx">01</span><span className="t-cap">{HERO.eyebrow}</span></div>
                <h1 className="ohero-h"><span className="line" data-hero-line>{HERO.h}</span></h1>
                <div className="btns" data-hero-in>
                  <a href="#contact" className="pill-btn light">{HERO.a} <span>→</span></a>
                  <a href="#how" className="pill-btn glass">{HERO.b} <span>→</span></a>
                </div>
              </div>
              <p className="l-12-17 ohero-lead" data-hero-in>{HERO.lead}</p>
            </div>
            <div className="wrap grid ohero-foot">
              <div className="l-1-4 ohero-lbl" data-hero-in>Trusted by identity teams at</div>
              <div className="l-5-17 ohero-logos" data-hero-in>{Array.from({ length: 6 }, (_, i) => <span key={i} className="lg"><i />Client logo</span>)}</div>
            </div>
          </div>
        </section>

        {/* 03 · The identity problem — chapters (C02) — light */}
        <Chapters />

        {/* 04 · Services tab bar (C03) — gray */}
        <section className="sec tint" id="how">
          <div className="wrap">
            <Head no="04" label="What we do" h="Advise. Implement. Run." />
            <Services />
          </div>
        </section>

        {/* 05 · Before / after ledger (C21) — light */}
        <section className="sec">
          <div className="wrap">
            <Head no="05" label="What changes" h={CHANGE.h} />
            <div className="grid ledger" data-group>
              <div className="l-1-8 led before" data-it>
                <div className="t-cap muted">Before</div>
                <ul>{CHANGE.rows.map(([a]) => <li key={a}>{a}</li>)}</ul>
              </div>
              <div className="l-8-10 led-arrow" data-it>→</div>
              <div className="l-10-17 led after" data-it>
                <div className="t-cap">With TechDemocracy</div>
                <ul>{CHANGE.rows.map(([, b]) => <li key={b}>{b}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* 06 · Operating model — figure (C27) — dark */}
        <section className="sec dark has-bg">
          <img className="sec-bg bg-model" src="/img/bg-model.webp" alt="" aria-hidden="true" loading="lazy" />
          <div className="wrap">
            <div className="grid s-head">
              <div className="rule l-1-17" data-rule />
              <div className="l-1-13 s-meta"><span className="idx">06</span><span className="t-cap">The TechDemocracy operating model</span></div>
              <div className="l-13-17 s-aside"><span className="fig">Fig. 01</span></div>
              <h2 className="t-h2 l-1-13" data-split>{MODEL.h}</h2>
            </div>
            <div className="fig-rows" data-group>
              {MODEL.layers.map(([t, nodes, time]) => (
                <div className="grid fig-row" key={t} data-it>
                  <div className="l-1-4 fig-l"><span className="t-cap">{t}</span><small>{time}</small></div>
                  <div className="l-4-17 fig-nodes" style={{ gridTemplateColumns: `repeat(${nodes.length}, 1fr)` }}>
                    {nodes.map((x) => <span key={x} className="node">{x}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 · Proof inline (C23) — dark */}
        <section className="sec dark proof has-bg">
          <img className="sec-bg bg-proof" src="/img/bg-proof.webp" alt="" aria-hidden="true" loading="lazy" />
          <div className="wrap grid">
            <div className="rule l-1-17" data-rule />
            <div className="l-1-17 s-meta"><span className="idx">07</span><span className="t-cap">Proof</span></div>
            <div className="l-1-10 pq">
              <span className="lg dim"><i />Client logo</span>
              <blockquote className="t-h2" data-split>“{PROOF.q}”</blockquote>
              <div className="t-cap muted">{PROOF.who}</div>
            </div>
            <div className="l-11-17 pm">
              <div className="pm-n"><span data-count={PROOF.m}>{PROOF.m}</span><small>{PROOF.unit}</small></div>
              <div className="t-small muted">{PROOF.ml}</div>
              <a href="#" className="btn light">Read the story <span>→</span></a>
            </div>
          </div>
        </section>

        {/* 08 · Solution routes (C08) — light, 2:1 then 1:2 */}
        <section className="sec">
          <div className="wrap">
            <Head no="08" label="Solutions" h="Built around your identity estate." link="All solutions" />
            <div className="grid routes" data-group>
              {SOLUTIONS.map(([t, s, pc, th, img], i) => (
                <a href="#" key={t} className={`route ${['l-1-11', 'l-11-17', 'l-1-7', 'l-7-17'][i]}`} data-it>
                  {img ? <img className="route-img" src={img} alt="" loading="lazy" /> : <Pattern piece={pc} theme={th} />}
                  <div className="route-cap"><span className="idx">{n(i + 1)}</span><b className="t-h4">{t}</b><span className="t-small muted">{s}</span><span className="r-ar">→</span></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 09 · Named experts (C22) — gray */}
        <section className="sec tint">
          <div className="wrap">
            <Head no="09" label="Who you work with" h="The people behind the program." />
            <div className="grid" data-group>
              {PEOPLE.map(([r, d], i) => (
                <div key={r} className={`person l-${i * 4 + 1}-${i * 4 + 5} m-${(i % 2) * 4 + 1}-${(i % 2) * 4 + 5}`} data-it>
                  <div className={`ph ph${i}`}><img src="/mark-white.svg" alt="" /><span className="t-cap">Photo</span></div>
                  <h3 className="t-h4">Name Surname</h3>
                  <div className="t-cap c-blue">{r}</div>
                  <p className="t-small muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10 · Credentials (C04) — light */}
        <section className="sec">
          <div className="wrap">
            <Head no="10" label="Credentials" h="Certified on the platforms you run." link="All partners" />
            <div className="grid" data-group>
              {CREDS.map(([a, b], i) => (
                <div key={a} className={`cred ${['l-1-6', 'l-6-12', 'l-12-17'][i]}`} data-it>
                  <div className="cred-b"><img src="/mark-white.svg" alt="" /><b>{a}</b></div>
                  <div className="cred-c">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11 · Field notes (C24) — light */}
        <section className="sec pt0">
          <div className="wrap">
            <Head no="11" label="Field notes" h="Field notes from live programs." link="View all" />
            <div data-group>
              {NOTES.map(([d, t, h, img]) => (
                <a href="#" className="grid row-l note" key={h} data-it>
                  <div className="rule l-1-17" />
                  <div className="l-1-3 t-cap muted">{d}</div>
                  <div className="l-3-5"><span className="tag">{t}</span></div>
                  <div className="l-5-7 note-th">{img && <img src={img} alt="" loading="lazy" />}</div>
                  <div className="l-7-16 t-h4">{h}</div>
                  <div className="l-16-17 note-ar">›</div>
                </a>
              ))}
              <div className="grid"><div className="rule l-1-17" /></div>
            </div>
          </div>
        </section>

        {/* 12 · FAQ (C15) — gray */}
        <section className="sec tint">
          <div className="wrap grid">
            <div className="rule l-1-17" data-rule />
            <div className="l-1-6 faq-h">
              <div className="s-meta"><span className="idx">12</span><span className="t-cap">Quick answers</span></div>
              <h2 className="t-h2" data-split>Frequently asked questions</h2>
            </div>
            <div className="l-7-17"><Faq /></div>
          </div>
        </section>

        {/* 13 · Next steps (C07) — dark, the only CTA band besides the hero */}
        <section className="sec dark next" id="contact">
          <img className="next-bg next-img" src="/img/bg-next.webp" alt="" aria-hidden="true" loading="lazy" />
          <div className="wrap next-in">
            <div className="s-meta c"><span className="idx">13</span><span className="t-cap">Next steps</span></div>
            <h2 className="t-display next-h" data-split>Your identity program starts here.</h2>
            <div className="btns c">
              <a href="#" className="btn light">Talk to an expert <span>→</span></a>
              <a href="#" className="btn ghost-l">Book a workshop</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="ftr">
        <div className="wrap grid">
          <div className="l-1-6 f-brand">
            <img src="/logo-white.svg" alt="TechDemocracy" />
            <p className="muted t-small">Identity security, advised, implemented and run.</p>
          </div>
          {[['Solutions', ['Identity governance', 'Privileged access', 'Access management', 'Customer identity', 'AI identity security']],
            ['Services', ['Advisory', 'Implementation', 'Operations', 'Managed services']],
            ['Partners', ['SailPoint', 'Microsoft Entra ID', 'Saviynt', 'Okta']],
            ['Company', ['About', 'Leadership', 'Careers', 'Contact']]].map(([t, xs], i) => (
            <div key={t} className={`f-col ${['l-7-10', 'l-10-13', 'l-13-15', 'l-15-17'][i]} m-${(i % 2) * 4 + 1}-${(i % 2) * 4 + 5}`}>
              <div className="t-cap">{t}</div>{xs.map((x) => <a key={x} href="#">{x}</a>)}
            </div>
          ))}
          <div className="rule l-1-17" />
          <div className="l-1-9 t-small muted">© 2026 TechDemocracy · ISO/IEC 27001 certified</div>
          <div className="l-9-17 t-small muted f-legal">Privacy · Cookies · Terms</div>
        </div>
      </footer>
    </>
  );
}
