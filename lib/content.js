// Home page copy — placeholder until the approved Word document arrives.

export const NAV = ['Solutions', 'Services', 'Partners', 'Industries', 'Company'];

export const HERO = {
  eyebrow: 'Identity · Access · Governance',
  h: 'Every identity, governed.',
  lead: 'We advise on your identity program, implement the platforms and run them around the clock — for people, machines and AI agents.',
  a: 'Talk to an expert',
  b: 'See how we work',
  chips: [['15M+', 'identities under management'], ['24/7', 'operations'], ['ISO/IEC 27001', 'certified']],
  console: {
    file: 'identity.estate',
    rows: [['j.morgan', 'Person', 'Governed', 'ok'], ['svc-backup-02', 'Service account', 'No owner', 'warn'], ['invoice-agent', 'AI agent', 'Owned', 'ok'], ['ci-deploy-key', 'Secret', 'Rotated', 'ok']],
  },
};

export const PROBLEMS = [
  { h: 'Identities outnumber people now.', s: 'There are more service accounts, bots and keys than employees — and most were never given an owner.', tags: ['Service account · no owner', 'AI agent · 14 permissions'] },
  { h: 'Access changes faster than reviews.', s: 'Roles grow with every request. Reviews arrive months later, when nobody remembers why access was granted.', tags: ['Role · 4,000 entitlements', 'Review · 11 weeks late'] },
  { h: 'AI agents act with real permissions.', s: 'Copilots and agents read and write real data with real credentials. Few of them appear in any review.', tags: ['Agent · prod database', 'Owner · unknown'] },
];

export const SERVICES = [
  { t: 'Advisory', h: 'Identity security advisory', d: 'An independent view of where your identity program stands, where it needs to be and the order to get there in.', checks: ['Current-state assessment', 'Target operating model', 'Prioritised roadmap'], piece: 'cadence', img: '/img/svc-advisory.webp', anim: '/img/sol-ai' },
  { t: 'Implementation', h: 'Platform implementation', d: 'Certified engineers deploy IGA, PAM, CIAM and access management — designed around your processes, not vendor defaults.', checks: ['IGA, PAM, CIAM and AM rollouts', 'Connector and role design', 'Cutover without downtime'], piece: 'hybrid', img: '/img/svc-implementation.webp', anim: '/img/sol-pam' },
  { t: 'Operations', h: 'Operations and support', d: 'We keep identity platforms healthy, current and inside SLA, with upgrades planned months ahead.', checks: ['Upgrades on a calendar', 'Access changes inside SLAs', 'Monthly health reports'], piece: 'heartbeat', img: '/img/svc-operations.webp', anim: '/img/sol-iga' },
  { t: 'Managed services', h: 'Managed identity services', d: 'A dedicated team runs your identity platforms 24/7, with a named service delivery manager and a monthly report.', checks: ['24/7 monitoring', 'Named service delivery manager', 'Audit pack every month'], piece: 'vault', img: '/img/svc-managed.webp', anim: '/img/sol-am' },
  { t: 'AI agent governance', h: 'AI agent governance', d: 'Find every AI agent in your estate, give it an accountable owner and govern its access like any other identity.', checks: ['Discover every agent', 'Assign an owner', 'Govern from discovery to retirement'], piece: 'agents', img: '/img/svc-ai-agents.webp', anim: '/img/sol-ciam' },
];

export const CHANGE = {
  h: 'What changes when we run your identity program.',
  rows: [
    ['Access reviews take a quarter', 'Reviews close in days, ranked by risk'],
    ['Privileged accounts shared across teams', 'Every privileged session brokered and recorded'],
    ['Nobody owns service accounts', 'Every machine identity has an owner'],
  ],
};

export const MODEL = {
  h: 'One team from roadmap to 24/7 run.',
  layers: [
    ['Advise', ['Assessment', 'Roadmap'], 'Weeks 1–6'],
    ['Implement', ['IGA', 'PAM', 'CIAM', 'AM'], 'Months 2–6'],
    ['Run', ['24/7 ops', 'Reviews', 'Reporting'], 'Ongoing'],
  ],
};

export const PROOF = { q: 'We passed the audit with no identity findings.', who: 'CISO · Healthcare provider', m: '12', unit: 'wks', ml: 'From kickoff to first certification' };

export const SOLUTIONS = [
  ['Identity governance (IGA)', 'Every access decision, governed', 'graph', 'navy', '/img/sol-iga'],
  ['Privileged access', 'No standing admin rights anywhere', 'vault', 'dark', '/img/sol-pam'],
  ['Customer identity', 'Secure sign-in customers finish', 'flow', 'light', '/img/sol-ciam'],
  ['Access management', 'One sign-in, every app', 'sso', 'navy', '/img/sol-am'],
  ['AI identity security', 'Every agent found, owned and governed', 'agent', 'light', '/img/sol-ai'],
];

export const PEOPLE = [
  ['IGA practice lead', 'Leads governance programs on SailPoint and Saviynt.'],
  ['PAM architect', 'Designs privileged access for Tier-0 environments.'],
  ['CIAM lead', 'Builds customer sign-in at consumer scale.'],
  ['Managed services lead', 'Runs 24/7 operations for identity platforms.'],
];

export const CREDS = [
  ['ISO/IEC 27001', 'Certified information security', 'Certification'],
  ['SailPoint', 'Delivery partner — IdentityIQ and Identity Security Cloud', 'Partner'],
  ['Saviynt · Okta', 'Implementation partner', 'Partner'],
];

export const NOTES = [
  ['12 Nov', 'Guide', 'AI agent governance in five steps', '/img/note-guide.webp'],
  ['04 Nov', 'Case study', 'Legacy IGA to ISC in 16 weeks', '/img/note-case.webp'],
  ['22 Oct', 'News', 'New SailPoint certification for the team', '/img/note-news.webp'],
];

export const FAQ = [
  ['What does an assessment include?', 'Stakeholder interviews, a review of your identity platforms and an analysis of access data. You receive a current-state report, a target model and a prioritised roadmap.'],
  ['Which platforms do you implement?', 'SailPoint, Saviynt, Okta, Microsoft Entra ID and CyberArk, among others. We recommend the platform that fits your estate, not the one we prefer.'],
  ['How long does a rollout take?', 'A first phase usually goes live in 12–16 weeks. Larger programs are delivered in waves, each with its own go-live.'],
  ['Do you run it after go-live?', 'Yes. We can run the platform for you, support your team, or hand over completely with runbooks and training.'],
];
