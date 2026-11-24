// Page templates W02–W07 from the wireframe document. Each section names its component code.
import SiteShell from './SiteShell';
import AnchorNav from './AnchorNav';
import Tabs from './Tabs';
import AgentGraph from './AgentGraph';
import AgentInventory from './AgentInventory';
import PixelButton from './PixelButton';
import {
  Sec, Head, HeroSplit, HeroLight, Reality, Ledger, StackCards, Proof, Figure, Steps, Stories, Routes,
  FaqBlock, NextSteps, OfferBand, Metrics, Columns, Coverage, Credentials, FieldNotes, Resources, Matrix, ControlMap,
} from './blocks';
import {
  SOLUTIONS_PAGES, MANAGED_PAGES, MANAGED_SHARED, PARTNER_SHARED, COMPARE_PAGES, PARTNER_PAGES, INDUSTRY_SHARED, AI_PAGE,
} from '../lib/site';

const route = (base, pages, keys) => keys.map((k) => ({ href: `${base}/${k}`, ...pages[k] }));
const relatedSolutions = (slug) => {
  const core = ['identity-governance', 'privileged-access', 'access-management', 'customer-identity', 'non-human-identity', 'identity-threat-detection'];
  return route('/solutions', SOLUTIONS_PAGES, core.filter((k) => k !== slug).slice(0, 4));
};
const SOLUTION_STEPS = [['Discover', 'Weeks 1–2', 'Current state, risks and quick wins agreed.'], ['Design', 'Weeks 3–5', 'Architecture and processes signed off.'], ['Deliver', 'Weeks 6–14', 'Built and onboarded in waves, riskiest first.'], ['Run', 'Ongoing', 'Operated by your team, ours, or both.']];
const AI_PLATFORMS = ['Microsoft Copilot', 'Microsoft Entra ID', 'SailPoint', 'Saviynt', 'Okta', 'CyberArk', 'AWS Bedrock', 'Azure AI Foundry', 'Google Vertex AI', 'ServiceNow'];

/* ---------------- W02 · Solution page (12 sections) ---------------- */
export function SolutionPage({ slug, p }) {
  return (
    <SiteShell>
      <HeroLight crumbs={[['Home', '/'], ['Solutions', '/#solutions'], [p.name]]} eyebrow={p.short ? `${p.name} (${p.short})` : p.name}
        h1={p.h1} lead={p.lead} anim={p.anim} />
      <AnchorNav items={[['The problem', 'problem'], ['What changes', 'changes'], ['Capabilities', 'capabilities'], ['Platforms', 'platforms'], ['Stories', 'stories'], ['FAQ', 'faq']]} />
      <Reality id="problem" lines={p.reality} items={p.problems} />
      <Ledger id="changes" h={p.ledger.h} rows={p.ledger.rows} />
      <StackCards id="capabilities" h={p.capsH} items={p.caps} />
      <Proof {...p.proof} />
      <Figure id="platforms" n="02" h={p.fig.h} rows={p.fig.rows} />
      <Steps id="how" h="From kickoff to steady state." items={SOLUTION_STEPS} />
      <Stories id="stories" tags={[p.short?.toLowerCase()]} />
      <Routes h="Related identity security." items={relatedSolutions(slug)} tone="gray" />
      <FaqBlock id="faq" items={p.faq} tone="light" />
      <NextSteps h={p.cta} b={['Book an assessment', '/services/advisory-consulting']} />
    </SiteShell>
  );
}

/* ---------------- W03 · Service page (11 sections; named experts held until photos are approved) ---------------- */
export function ServicePage({ p, metrics }) {
  const tag = p.name.split(' ')[0].toLowerCase();
  return (
    <SiteShell cta="Book a free consultation">
      <HeroSplit crumbs={[['Home', '/'], ['Services', '/#how'], [p.name]]} eyebrow={p.eyebrow} h1={p.h1} lead={p.lead} img={p.img} anim={p.anim} chips={p.chips} />
      <Metrics items={metrics} />
      <Columns id="deliverables" h={p.getH} items={p.gets} />
      <Steps id="how" h="How the engagement runs." items={p.steps} />
      <OfferBand />
      <Proof {...p.proof} />
      <Stories h="Engagements like yours." tags={[tag]} />
      <Resources h={`Go deeper on ${p.name.toLowerCase()}.`} tone="gray" />
      <FaqBlock id="faq" items={p.faq} tone="light" />
      <NextSteps h={p.cta} a={['Book a free consultation', '/#contact']} b={['Talk to an expert', '/#contact']} />
    </SiteShell>
  );
}

/* ---------------- W04 · Managed service page (9 sections) ---------------- */
export function ManagedPage({ p, overview }) {
  const S = MANAGED_SHARED;
  const runs = p.runs.map(([t, c]) => [t, `${c} · handled by your named team inside agreed service levels, and covered in the monthly service review.`]);
  return (
    <SiteShell>
      <HeroSplit crumbs={[['Home', '/'], ['Services', '/#how'], ...(overview ? [[p.name]] : [['Managed services', '/services/managed-services'], [p.name]])]}
        eyebrow={p.eyebrow} h1={p.h1} lead={p.lead} img={p.img} anim={p.anim} chips={S.chips} b={['See coverage options', '#coverage']} />
      <Metrics items={S.metrics} />
      <StackCards id="runs" h="We run it. You govern it." items={runs} />
      <Coverage id="coverage" levels={S.levels} />
      {overview && <Routes label="Managed services" h="Pick the platform we run for you." link="Talk to an expert" href="/#contact" tone="gray"
        items={Object.entries(MANAGED_PAGES).map(([k, v]) => ({ href: `/services/managed-services/${k}`, ...v }))} />}
      <Ledger h={S.ledger.h} rows={S.ledger.rows} tone={overview ? 'light' : 'gray'} />
      <Steps id="how" h="From handover to steady state." items={S.steps} tone={overview ? 'gray' : 'light'} />
      <Proof {...S.proof} />
      <FaqBlock id="faq" items={S.faq} tone="light" />
      <NextSteps h="Run. Monitor. Improve." b={['See coverage options', '#coverage']} />
    </SiteShell>
  );
}

/* ---------------- W05 · Partner page (10 sections) ---------------- */
export function PartnerPage({ p }) {
  const cmpKey = p.compare; const c = COMPARE_PAGES[cmpKey];
  const notes = [['12 Nov', 'Release', `What the latest ${p.name} release means for you`], ['30 Oct', 'Guide', `Planning your next ${p.name} upgrade`], ['18 Oct', 'News', `New ${p.name} certifications for our team`]];
  return (
    <SiteShell>
      <HeroSplit crumbs={[['Home', '/'], ['Partners', '/partners/sailpoint'], [p.name]]} eyebrow={`Partners · ${p.name}`} h1={p.h1} lead={p.lead} img={p.img} chips={p.chips} lockup={p.name} />
      <Credentials h={`Credentials on ${p.name}.`} items={p.creds} />
      <AnchorNav items={[['What we deliver', 'offers'], ['Compare', 'compare'], ['Field notes', 'notes'], ['FAQ', 'faq']]} />
      <Sec id="offers" tone="gray">
        <Head label="What we do" h={`What we deliver on ${p.name}.`} />
        <Tabs idBase={`offers-${p.name.toLowerCase().replace(/\W+/g, '')}`} anim={['/img/sol-iga', '/img/sol-pam', '/img/sol-am', '/img/sol-ciam']}
          items={p.offers.map(([t, d, list]) => [t, t, d, list, ['Talk to an expert', '/#contact']])} />
      </Sec>
      <Matrix id="compare" a={c.a} b={c.b} rows={c.rows} />
      <OfferBand eyebrow="Platform selection" h="Not sure which platform fits?" p="A selection workshop compares the platforms that fit your estate — neutrally, with your requirements as the scorecard."
        a={['Book a selection workshop', '/#contact']} b={['Read the comparison', `/compare/${cmpKey}`]} />
      <Proof {...p.proof} />
      <FieldNotes id="notes" h={`What’s new on ${p.name}.`} items={notes} />
      <FaqBlock id="faq" items={PARTNER_SHARED.faq} />
      <NextSteps h="Get the most from your platform." />
    </SiteShell>
  );
}

/* ---------------- W05 · Compare page ---------------- */
export function ComparePage({ p }) {
  const partners = Object.entries(PARTNER_PAGES).filter(([, v]) => [p.a, p.b].some((n) => v.name.startsWith(n.split(' ')[0])));
  return (
    <SiteShell>
      <HeroSplit crumbs={[['Home', '/'], ['Compare', '/compare/sailpoint-vs-saviynt'], [p.name]]} eyebrow="Compare" h1={p.h1} lead={p.lead} img={p.img}
        chips={['Neutral criteria', 'We implement both', 'Reviewed before publishing']} lockup={`${p.a} vs ${p.b}`} a={['Book a selection workshop', '/#contact']} b={['See the matrix', '#compare']} />
      <AnchorNav items={[['Side by side', 'compare'], ['How we help', 'help'], ['FAQ', 'faq']]} cta={['Book a selection workshop', '/#contact']} />
      <Matrix id="compare" a={p.a} b={p.b} rows={p.rows} />
      <OfferBand eyebrow="Platform selection" h="Not sure which platform fits?" p="Two hours with our architects: your requirements, both platforms, and a recommendation you can defend."
        a={['Book a selection workshop', '/#contact']} b={['Talk to an expert', '/#contact']} />
      <Steps id="help" label="How we help" h="From shortlist to decision." items={[['Requirements', 'Week 1', 'Use cases, scale and constraints captured.'], ['Fit check', 'Week 2', 'Each platform tested against your use cases.'], ['Costs', 'Week 2', 'Licence and delivery effort compared.'], ['Decision', 'Week 3', 'A recommendation with the reasons written down.']]} />
      {partners.length > 0 && <Routes label="Partners" h="Our work on each platform." link="All partners" href="/partners/sailpoint"
        items={partners.map(([k, v], i) => ({ href: `/partners/${k}`, name: v.name, blurb: v.blurb, anim: ['/img/sol-iga', '/img/sol-pam'][i % 2] }))} />}
      <FaqBlock id="faq" items={PARTNER_SHARED.faq} />
      <NextSteps h="Choose with confidence." a={['Book a selection workshop', '/#contact']} b={['Talk to an expert', '/#contact']} />
    </SiteShell>
  );
}

/* ---------------- W06 · Industry & compliance page (10 sections) ---------------- */
export function IndustryPage({ p }) {
  const S = INDUSTRY_SHARED;
  const base = p.kind === 'compliance' ? ['Compliance', '/compliance/sox'] : ['Industries', '/industries/financial-services'];
  return (
    <SiteShell>
      <HeroLight crumbs={[['Home', '/'], base, [p.name]]} chip={p.chip} h1={p.h1} lead={p.lead} img={p.img} b={['Get the checklist', '#resources']} />
      <Reality lines={p.reality} items={p.areas.map((a) => [a, ''])} />
      <ControlMap id="controls" rows={p.map} />
      <Columns label="What we see" h={p.kind === 'compliance' ? 'Three risks auditors find first.' : 'Three risks we see in this sector.'} items={p.risks} tag={(i) => `Risk 0${i + 1}`} tone="gray" />
      <Steps id="how" h="Getting audit-ready." items={S.steps} tone="light" />
      <Proof {...p.proof} />
      <Credentials h="Standards we work to." items={S.creds} link="Our credentials" href="/#credentials" />
      <Resources id="resources" h="Sector guides and checklists." tone="gray" />
      <FaqBlock id="faq" items={S.faq} tone="light" />
      <NextSteps h={p.cta} b={['Get the checklist', '#resources']} />
    </SiteShell>
  );
}

/* ---------------- W07 · AI identity security (13 sections, fully dark) ---------------- */
export function AiPage() {
  const P = AI_PAGE;
  return (
    <SiteShell tone="ai">
      {/* 01 — C28 centred hero + agent graph */}
      <section className="pg-hero pg-hero-ai">
        <div className="pg-hero-ai-in">
          <span className="eyebrow light" data-hero-in>AI identity security</span>
          <h1 className="pg-h1" data-hero-in>{P.h1}</h1>
          <p className="pg-lead" data-hero-in>{P.lead}</p>
          <div className="y-btns" data-hero-in>
            <PixelButton href="/#contact" variant="blue">Start an AI agent assessment <span className="px-ic">→</span></PixelButton>
            <PixelButton href="#lifecycle" variant="glass">See the lifecycle <span className="px-ic">→</span></PixelButton>
          </div>
          <AgentGraph />
          <div className="pg-chips">{P.chips.map((c) => <span key={c}><i />{c}</span>)}</div>
        </div>
      </section>
      {/* 02 — marquee (platforms, until client permission for logos) */}
      <section className="z-marquee" aria-label="Platforms where we govern AI agents">
        <div className="z-mq">{[...AI_PLATFORMS, ...AI_PLATFORMS].map((x, i) => <span key={i}>{x}<i>×</i></span>)}</div>
      </section>
      <Reality lines={P.reality} items={P.risks} />
      {/* 04 — C29 agent inventory */}
      <Sec id="inventory">
        <Head label="Agent inventory" h="See every agent, its owner and its access." aside="What an assessment hands you on day ten. Sample agents, invented names." />
        <AgentInventory rows={P.inventory} />
      </Sec>
      {/* 05 — C03 lifecycle tabs */}
      <Sec id="lifecycle" tone="gray">
        <Head label="What we do" h="Discover. Own. Govern. Retire." />
        <Tabs idBase="lifecycle" anim={['/img/sol-ai', '/img/sol-ciam', '/img/sol-am', '/img/sol-iga', '/img/sol-pam']}
          items={P.lifecycle.map(([t, h, p, list]) => [t, h, p, list, [`How ${t.toLowerCase()} works`, '/#contact']])} />
      </Sec>
      <Figure n="03" h={P.fig.h} rows={P.fig.rows} />
      <StackCards h="Built for agents, not just people." items={P.caps} />
      <Ledger h={P.ledger.h} rows={P.ledger.rows} />
      <Steps h="From first call to governed agents." items={P.steps} tone="gray" />
      <Proof {...P.proof} tone="light" />
      <FieldNotes h="Research on AI agent identity." items={P.notes} />
      <FaqBlock id="faq" items={P.faq} />
      <NextSteps h="Govern AI agents like every other identity." a={['Start an AI agent assessment', '/#contact']} b={['Talk to an expert', '/#contact']} />
    </SiteShell>
  );
}
