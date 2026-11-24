// Home v3 — layout informed by SentinelOne's information design (Nov 24): product proof up front,
// one repeated section-head pattern, inset-caption image cards, tabbed services, a dark architecture band.
// v3.1: full-bleed, varied section patterns, no product UI mockups. Previous: /v2, /v1.
import './x.css';
import './y.css';
import './z.css';
import './pages.css';
import Motion from '../components/Motion';
import Glow from '../components/Glow';
import GlyphField from '../components/GlyphField';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import Ribbon from '../components/Ribbon';
import ScrollState from '../components/ScrollState';
import Parallax from '../components/Parallax';
import SmoothScroll from '../components/SmoothScroll';
import SiteHeader from '../components/SiteHeader';
import ServiceList from '../components/ServiceList';
import PixelButton from '../components/PixelButton';
import LoopVideo from '../components/LoopVideo';
import SolMedia from '../components/SolMedia';
import ProblemStage from '../components/ProblemStage';
import { NAV, HERO, PROOF, SOLUTIONS, NOTES } from '../lib/content';

const PLATFORMS = ['SailPoint', 'Microsoft Entra ID', 'Saviynt', 'Okta', 'CyberArk', 'ServiceNow', 'Ping Identity', 'ForgeRock'];
const PARTNER_ROWS = [
  ['SailPoint', 'Delivery partner', 'IdentityIQ · Identity Security Cloud', '/img/cr-rings.webp'],
  ['Microsoft Entra ID', 'Identity services', 'ID Governance · Conditional Access', '/img/cr-tunnel.webp'],
  ['Saviynt', 'Implementation partner', 'Enterprise Identity Cloud', '/img/cr-tdc2.webp'],
  ['Okta', 'Implementation partner', 'Workforce · Customer Identity', '/img/cr-wrenches.webp'],
];
// PLACEHOLDER figures — replace with approved, sourced numbers before launch.
const HERO_STATS = [['24/7', 'identity operations'], ['ISO/IEC 27001', 'certified'], ['SailPoint', 'delivery partner'], ['4', 'identity platforms certified']];
const OUTCOMES = [['12', 'wks', 'From kickoff to first access certification'], ['15M', '+', 'Identities governed across client estates'], ['16', 'wks', 'Legacy IGA to Identity Security Cloud']];
const LAYERS = [
  ['Advise', 'Weeks 1–6', ['Current-state assessment', 'Target operating model', 'Prioritised roadmap']],
  ['Implement', 'Months 2–6', ['IGA', 'PAM', 'CIAM', 'Access management', 'AI agent governance']],
  ['Run', 'Ongoing', ['Access reviews', 'Joiner · mover · leaver', 'Upgrades', 'Reporting']],
];
const DIFF = [
  ['Independent advice', 'We recommend the platform that fits your estate — not the one we resell. Every engagement starts from your risk, not a product.'],
  ['Certified engineers', 'SailPoint, Saviynt, Okta and Microsoft certified teams who have delivered the same rollout dozens of times.'],
  ['One accountable team', 'The people who design your program also build and run it, so nothing is lost between handovers.'],
];
const n2 = (i) => String(i).padStart(2, '0');

function Head({ label, h, aside, link, center, dark }) {
  return (
    <div className={`y-head${center ? ' center' : ''}${dark ? ' dark' : ''}`}>
      <div className="y-head-l">
        <span className="eyebrow">{label}</span>
        <h2 className="y-h2" data-split>{h}</h2>
      </div>
      {(aside || link) && (
        <div className="y-head-r">
          {aside && <p>{aside}</p>}
          {link && <a href="#" className={`y-btn ${dark ? 'light' : 'dark'} sm`}>{link} <span>→</span></a>}
        </div>
      )}
    </div>
  );
}

const Arrow = () => <span className="y-arr" aria-hidden="true">→</span>;

export default function Home() {
  return (
    <div className="x y z">
      <Motion />
      <Glow />
      <a href="#main" className="skip">Skip to content</a>
      <Ribbon />
      <ScrollState />
      <Parallax />
      <SmoothScroll />

      <SiteHeader />

      <main id="main" tabIndex={-1}>
        {/* 1 — full-screen hero: headline bottom-left, lead + actions right, stat bar on the bottom edge */}
        <section className="z-hero">
          <img className="y-hero-img" src="/img/hero-glyph.webp" alt="" aria-hidden="true" fetchPriority="high" />
          <GlyphField lensOnly cell={22} color="#4589FF" className="y-hero-lens" />
          <div className="z-hero-shade" />
          <div className="z-hero-in">
            <span className="eyebrow light" data-hero-in>{HERO.eyebrow}</span>
            <div className="z-hero-row">
              <h1 className="z-h1" aria-label="Every identity, governed."><span className="line" data-hero-line aria-hidden="true">Every identity,</span>{' '}<span className="line accent" data-hero-in aria-hidden="true">governed.</span></h1>
              <div className="z-hero-side" data-hero-in>
                <p className="y-lead">{HERO.lead}</p>
                <div className="y-btns">
                  <PixelButton href="#contact" variant="blue">Talk to an expert <span className="px-ic">→</span></PixelButton>
                  <PixelButton href="#how" variant="glass">See how we work <span className="px-ic">→</span></PixelButton>
                </div>
              </div>
            </div>
          </div>
          <div className="z-hero-stats" data-hero-in>
            {HERO_STATS.map(([v, l]) => (
              <div key={l} className="z-hstat"><b>{v}</b><span>{l}</span></div>
            ))}
          </div>
        </section>

        {/* 2 — platforms marquee, edge to edge */}
        <section className="z-marquee" aria-label="Platforms we deliver">
          <div className="z-mq">{[...PLATFORMS, ...PLATFORMS].map((p, i) => <span key={i}>{p}<i>×</i></span>)}</div>
        </section>

        {/* 3 — the identity problem: pinned scroll story drawn in glyphs */}
        <ProblemStage />

        {/* 4 — what we do: expanding numbered list + edge-bleeding image */}
        <section className="z-services" id="how">
          <div className="z-services-head">
            <span className="eyebrow">What we do</span>
            <h2 className="y-h2 xl" data-split>Advise. Implement. Run.</h2>
            <p className="z-sub">One team across the whole identity lifecycle — from the first assessment to 24/7 operations.</p>
          </div>
          <ServiceList />
        </section>

        {/* 5 — credentials: light, open — partner cards + slim certification strip */}
        <section className="z-cred2">
          <div className="z-cred2-in">
            <div className="z-cred2-head">
              <div>
                <span className="eyebrow">Partners &amp; certification</span>
                <h2 className="y-h2" data-split>Certified on the platforms you run.</h2>
              </div>
              <p>Certified engineers on the leading identity platforms — so we recommend what fits your estate, then deliver and run it.</p>
            </div>
            <div className="z-pcards" data-group>
              {PARTNER_ROWS.map(([name, tier, prods, img]) => (
                <a href="#" key={name} className="z-pcard" data-it>
                  <span className="z-pcard-img"><img src={img} alt="" loading="lazy" /></span>
                  <span className="z-pcard-tier">{tier}</span>
                  <b>{name}</b>
                  <span className="z-pcard-prods">{prods}</span>
                  <span className="z-pcard-more">View partnership <i>→</i></span>
                </a>
              ))}
            </div>
            <div className="z-iso3" data-rv>
              <GlyphField shape="ring" density={0.5} cell={14} speed={0.4} color="#4589FF" className="z-iso3-glyph" />
              <div className="z-iso3-num" aria-hidden="true"><span>ISO/IEC</span><b>27001</b></div>
              <div className="z-iso3-body">
                <span className="eyebrow light">Certification</span>
                <h3>Our own house is in order.</h3>
                <p>TechDemocracy&rsquo;s information-security management system is ISO/IEC 27001 certified and independently audited every year — the same discipline we bring to your identity estate.</p>
              </div>
              <ul className="z-iso3-list">
                <li><i aria-hidden="true">✓</i><span><b>Certified ISMS</b>Information-security management system</span></li>
                <li><i aria-hidden="true">✓</i><span><b>Audited every year</b>Independent surveillance audits</span></li>
                <li><i aria-hidden="true">✓</i><span><b>Whole delivery team</b>Every engagement in scope</span></li>
              </ul>
              <a href="#" className="y-btn white sm z-iso3-cta">View certificate <span>→</span></a>
            </div>
          </div>
        </section>

        {/* 6 — the TechDemocracy difference: architecture figure + 3 columns */}
        <section className="y-sec y-dark">
          <div className="y-wrap">
            <Head label="The TechDemocracy difference" h="One team from roadmap to 24/7 run." dark link="How we deliver" />
            <div className="y-fig" data-rv>
              <span className="y-fig-title">Identity operating model</span>
              <div className="y-fig-layers">
                {LAYERS.map(([t, time, nodes], i) => (
                  <div key={t} className={`y-layer l${i}`}>
                    <div className="y-layer-l"><span className="y-layer-pill">{t}</span><small>{time}</small></div>
                    <div className="y-layer-box">
                      <span className="y-layer-h">{['Strategy', 'Platforms', 'Operations'][i]}</span>
                      <div className="y-nodes">{nodes.map((x) => <span key={x}>{x}</span>)}</div>
                    </div>
                    {i < 2 && <span className="y-flow" aria-hidden="true">▼</span>}
                  </div>
                ))}
              </div>
              <div className="y-fig-side">
                <span className="y-layer-h">Managed services</span>
                <b>24/7 Identity Operations</b>
                <ul><li>Named service delivery manager</li><li>Monitoring &amp; incident response</li><li>Monthly audit pack</li><li>SLA-backed access changes</li></ul>
                <span className="y-fig-foot">Human experts</span>
              </div>
            </div>
            <div className="y-cols3 rules" data-group>
              {DIFF.map(([h, d], i) => (
                <div key={h} className="y-col" data-it>
                  <span className="y-tag">{['Advise', 'Implement', 'Run'][i]}</span>
                  <h3>{h}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7 — full-bleed workshop band */}
        <section className="z-band">
          <div className="z-band-in">
            <span className="eyebrow light">Identity workshop</span>
            <h2 className="y-h2 xl light">Two hours. One clear plan.</h2>
            <p>Bring your identity estate. Leave with a prioritised roadmap, the quick wins and the risks to fix first.</p>
            <div className="y-btns">
              <a href="#" className="y-btn white">Book a workshop <span>→</span></a>
              <a href="#contact" className="y-btn navy">Talk to an expert <span>→</span></a>
            </div>
          </div>
          <LoopVideo src="/img/band-glyph" className="z-band-v" />
        </section>

        {/* 8 — solutions: full-width hover accordion */}
        <section className="z-sols">
          <div className="z-sols-head">
            <div><span className="eyebrow">Solutions</span><h2 className="y-h2" data-split>Built around your identity estate.</h2></div>
            <a href="#" className="y-btn dark sm">All solutions <span>→</span></a>
          </div>
          <div className="z-acc">
            {SOLUTIONS.map(([t, s, , , img], i) => (
              <a href="#" key={t} className="z-acc-p">
                <SolMedia src={img} />
                <span className="z-acc-n">{n2(i + 1)}</span>
                <div className="z-acc-cap"><b>{t}</b><p>{s}.</p><span className="z-acc-more">Explore <i>→</i></span></div>
              </a>
            ))}
          </div>
        </section>

        {/* 9 — outcomes: typographic band, no cards */}
        <section className="z-proof">
          <div className="z-proof-q">
            <span className="eyebrow">Client outcomes</span>
            <blockquote data-split>“{PROOF.q}”</blockquote>
            <span className="z-proof-who">{PROOF.who}</span>
            <a href="#" className="y-btn dark sm">Read case studies <span>→</span></a>
          </div>
          <div className="z-proof-stats">
            {OUTCOMES.map(([v, u, l]) => (
              <div key={l} className="z-pstat"><b>{v}<small>{u}</small></b><span>{l}</span></div>
            ))}
          </div>
        </section>

        {/* 10 — latest: hairline-bordered list grid */}
        <section className="y-sec">
          <div className="y-wrap">
            <Head label="Field notes" h="The latest from live programs." link="View all" />
          </div>
          <div className="y-grid-rule">
            <div className="y-wrap">
              <div className="y-list" data-group>
                {NOTES.map(([d, t, h, img], i) => (
                  <a href="#" key={h} className={`y-li${i === 0 ? ' feat' : ''}`} data-it>
                    <div className="y-li-img"><img src={img} alt="" loading="lazy" /></div>
                    <div className="y-li-body">
                      <span className="y-pill">{t}</span>
                      <b>{h}</b>
                      <span className="y-li-date">{d} 2026</span>
                    </div>
                    <Arrow />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11 — FAQ */}
        <section className="y-sec y-tint">
          <div className="y-wrap y-faq">
            <Head label="Quick answers" h="Frequently asked questions" />
            <Faq />
          </div>
        </section>

        {/* 12 — closing CTA, full screen */}
        <section className="z-cta" id="contact">
          <img className="y-cta-img" src="/img/bg-next.webp" alt="" aria-hidden="true" loading="lazy" />
          <div className="z-cta-in">
            <span className="eyebrow light">Next steps</span>
            <h2 className="z-h1 sm" data-split>Your identity program starts here.</h2>
            <div className="y-btns center">
              <a href="#" className="y-btn blue">Talk to an expert <span>→</span></a>
              <a href="#" className="y-btn glass">Book a workshop <span>→</span></a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
