// Home v2 — dark immersive glyph direction (Nov 24). Previous version lives at /v1.
import '../x.css';
import Motion from '../../components/Motion';
import Glow from '../../components/Glow';
import GlyphField from '../../components/GlyphField';
import Story from '../../components/Story';
import Shift from '../../components/Shift';
import Timeline from '../../components/Timeline';
import Faq from '../../components/Faq';
import Footer from '../../components/Footer';
import Ribbon from '../../components/Ribbon';
import { NAV, HERO, SERVICES, PROOF, SOLUTIONS, NOTES } from '../../lib/content';

const n = (i) => String(i).padStart(2, '0');
const PARTNER_TILES = [
  ['SailPoint', 'Delivery partner', ['IdentityIQ', 'Identity Security Cloud'], '/img/cr-rings.webp'],
  ['Microsoft Entra ID', 'Services', ['ID Governance', 'Conditional Access'], '/img/cr-tunnel.webp'],
  ['Saviynt', 'Implementation partner', ['Enterprise Identity Cloud'], '/img/cr-tdc2.webp'],
  ['Okta', 'Implementation partner', ['Workforce Identity', 'Customer Identity'], '/img/cr-wrenches.webp'],
];
const PARTNERS = ['SailPoint', 'Microsoft Entra ID', 'Saviynt', 'Okta', 'CyberArk', 'ServiceNow', 'ISO/IEC 27001'];

function Head({ no, label, h, sub, link }) {
  return (
    <div className="x-head">
      <div className="x-eyebrow"><span className="mono c-blue">{no}</span><span className="mono">{label}</span></div>
      <h2 className="x-h2" data-split>{h}</h2>
      {(sub || link) && (
        <div className="x-head-r">
          {sub && <p className="x-sub">{sub}</p>}
          {link && <a href="#" className="x-link">{link} <span>→</span></a>}
        </div>
      )}
    </div>
  );
}

// bento placement for the five services (+ one stat tile)
const SVC_AREA = ['a', 'b', 'd', 'e', 'f'];

export default function Home() {
  return (
    <div className="x">
      <Motion />
      <Glow />
      <Ribbon />

      <header className="x-hdr">
        <div className="x-wrap x-hdr-in">
          <a href="/" className="x-brand"><img src="/logo-white.svg" alt="TechDemocracy" /></a>
          <nav className="x-nav">
            {NAV.map((x) => <a key={x} href="#">{x}</a>)}
          </nav>
          <div className="x-hdr-r">
            <a href="#" className="x-ai">AI identity security</a>
            <a href="#contact" className="x-btn sm">Talk to an expert <span>→</span></a>
          </div>
        </div>
      </header>

      <main>
        {/* ───────── HERO ───────── */}
        <section className="x-hero">
          <img className="x-hero-img" src="/img/hero-glyph.webp" alt="" aria-hidden="true" fetchPriority="high" />
          <GlyphField lensOnly cell={22} color="#4589FF" className="x-hero-lens" />
          <div className="x-hero-shade" />
          <div className="x-wrap x-hero-in">
            <h1 className="x-display">
              <span className="line" data-hero-line>Every identity,</span>
              <span className="line accent" data-hero-in>governed.</span>
            </h1>
            <div className="x-hero-row">
              <p className="x-lead" data-hero-in>{HERO.lead}</p>
              <div className="x-btns" data-hero-in>
                <a href="#contact" className="x-btn">{HERO.a} <span>→</span></a>
                <a href="#how" className="x-btn ghost">{HERO.b}</a>
              </div>
            </div>
          </div>
          <div className="x-wrap x-hero-foot" data-hero-in>
            {HERO.chips.map(([v, l]) => (
              <div key={l} className="x-hstat"><b>{v}</b><span>{l}</span></div>
            ))}
            <div className="x-scroll"><i /> Scroll</div>
          </div>
        </section>

        {/* partner marquee */}
        <div className="x-marquee" aria-label="Platforms we deliver">
          <div className="x-mq-track">
            {[...PARTNERS, ...PARTNERS].map((p, i) => <span key={i}>{p}<i>×</i></span>)}
          </div>
        </div>

        {/* ───────── WHAT WE DO — bento ───────── */}
        <section className="x-sec x-gray" id="how">
          <div className="x-wrap">
            <Head no="01" label="What we do" h={<>Advise. Implement. <span className="accent">Run.</span></>}
              sub="One team across the whole identity lifecycle — from the first assessment to 24/7 operations." />
            <div className="bento svc" data-group>
              {SERVICES.map((s, i) => (
                <a href="#" key={s.t} className={`card svc-card g-${SVC_AREA[i]}`} data-glow data-it>
                  <div className="svc-img"><img src={s.img} alt="" loading="lazy" /></div>
                  <div className="svc-body">
                    <span className="mono">{n(i + 1)} · {s.t}</span>
                    <h3>{s.h}</h3>
                    <p>{s.d}</p>
                    <div className="tgs">{s.checks.map((c) => <span key={c} className="tg">{c}</span>)}</div>
                  </div>
                  <span className="card-ar">↗</span>
                </a>
              ))}
              <div className="card stat-card g-c" data-glow data-it>
                <GlyphField shape="core" density={0.55} cell={16} />
                <div className="stat-in">
                  <span className="mono">Identities under management</span>
                  <b><span data-count="15">15</span>M+</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── THE PROBLEM — sticky story ───────── */}
        <section className="x-sec x-light">
          <div className="x-wrap">
            <Head no="02" label="The identity problem" h="Your estate grew faster than your controls." />
            <Story />
          </div>
        </section>

        {/* ───────── WHAT CHANGES ───────── */}
        <section className="x-sec x-light x-tight">
          <div className="x-wrap x-split">
            <Head no="03" label="What changes" h="Flip the switch on how identity runs." />
            <Shift />
          </div>
        </section>

        {/* ───────── OPERATING MODEL ───────── */}
        <section className="x-sec x-model">
          <GlyphField shape="wave" density={0.42} cell={24} className="x-sec-glyph" />
          <div className="x-wrap">
            <Head no="04" label="Operating model" h="One team from roadmap to 24/7 run." />
            <Timeline />
          </div>
        </section>

        {/* ───────── PROOF ───────── */}
        <section className="x-sec">
          <div className="x-wrap">
            <div className="proof-card" data-glow data-rv>
              <img className="proof-bg" src="/img/bg-proof.webp" alt="" aria-hidden="true" loading="lazy" />
              <div className="proof-q">
                <span className="mono c-blue">05 · Proof</span>
                <blockquote data-split>“{PROOF.q}”</blockquote>
                <span className="mono">{PROOF.who}</span>
              </div>
              <div className="proof-m">
                <div className="proof-n"><span data-count={PROOF.m}>{PROOF.m}</span><small>{PROOF.unit}</small></div>
                <p>{PROOF.ml}</p>
                <a href="#" className="x-btn ghost sm">Read the story <span>→</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── SOLUTIONS ───────── */}
        <section className="x-sec x-light">
          <div className="x-wrap">
            <Head no="06" label="Solutions" h="Built around your identity estate." link="All solutions" />
            <div className="bento sols" data-group>
              {SOLUTIONS.map(([t, s, , , img], i) => (
                <a href="#" key={t} className={`card sol-card s-${i}`} data-glow data-it>
                  <img src={img} alt="" loading="lazy" />
                  <div className="sol-cap">
                    <span className="mono">{n(i + 1)}</span>
                    <h3>{t}</h3>
                    <p>{s}</p>
                  </div>
                  <span className="card-ar">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── PEOPLE + CREDENTIALS ───────── */}
        <section className="x-sec x-gray">
          <div className="x-wrap">
            <Head no="07" label="Credentials" h="Certified on the platforms you run." link="All partners" />
            <div className="cr" data-group>
              <div className="card cr-iso" data-glow data-it>
                <GlyphField shape="ring" density={0.5} cell={14} speed={0.5} />
                <div className="cr-iso-top">
                  <span className="mono">Certification</span>
                  <span className="cr-iso-std">ISO/IEC<br />27001</span>
                </div>
                <div className="cr-iso-body">
                  <h3>Certified information security</h3>
                  <p>Our own security management system is certified and independently audited — the same discipline we bring to your identity estate.</p>
                  <ul className="cr-iso-list">
                    <li>Certified ISMS</li><li>Annual surveillance audits</li><li>Covers all delivery teams</li>
                  </ul>
                </div>
              </div>
              {PARTNER_TILES.map(([name, tier, prods, img], i) => (
                <a href="#" key={name} className={`card cr-p p${i}`} data-glow data-it>
                  <div className="cr-img"><img src={img} alt="" loading="lazy" /></div>
                  <div className="cr-body">
                    <span className="mono c-blue">{tier}</span>
                    <b>{name}</b>
                    <span className="cr-prods">{prods.join(' · ')}</span>
                  </div>
                  <span className="card-ar">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FIELD NOTES ───────── */}
        <section className="x-sec x-light">
          <div className="x-wrap">
            <Head no="08" label="Field notes" h="From live programs." link="View all" />
            <div className="notes" data-group>
              {NOTES.map(([d, t, h, img]) => (
                <a href="#" key={h} className="card xnote" data-glow data-it>
                  <div className="note-img"><img src={img} alt="" loading="lazy" /></div>
                  <div className="note-meta"><span className="tg">{t}</span><span className="mono">{d}</span></div>
                  <h3>{h}</h3>
                  <span className="card-ar">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section className="x-sec x-gray">
          <div className="x-wrap x-split">
            <Head no="09" label="Quick answers" h="Frequently asked questions" />
            <div className="x-faq"><Faq /></div>
          </div>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="x-cta" id="contact">
          <img className="x-cta-img" src="/img/bg-next.webp" alt="" aria-hidden="true" loading="lazy" />
          <GlyphField density={0.35} cell={22} className="x-cta-glyph" />
          <div className="x-wrap x-cta-in">
            <span className="mono">10 · Next steps</span>
            <h2 className="x-display sm" data-split>Your identity program starts here.</h2>
            <div className="x-btns">
              <a href="#" className="x-btn light">Talk to an expert <span>→</span></a>
              <a href="#" className="x-btn ghost">Book a workshop</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
