// Site map, navigation and page content for the wireframe templates W02–W07.
// Copy follows the wireframe slots. Quotes and metrics marked SAMPLE are placeholders
// until clients approve them (wireframe: C23 needs client-approved quotes and metrics).

export const LIVE = 'https://www.techdemocracy.com';

/* ------------------------------------------------------------------ */
/* Solutions — W02                                                     */
/* ------------------------------------------------------------------ */
const sol = (o) => ({ template: 'solution', ...o });
export const SOLUTIONS_PAGES = {
  'identity-governance': sol({
    name: 'Identity governance', short: 'IGA', group: 'Identity security', anim: '/img/sol-iga',
    blurb: 'Certifications, roles and lifecycle, ranked by risk',
    h1: 'Every access decision, governed.',
    lead: 'We design and run identity governance on SailPoint, Saviynt and Microsoft Entra — so joiners, movers and leavers are automatic and every review means something.',
    reality: ['Risk now hides in access nobody designed.', 'Not in the access you approved.'],
    problems: [['Toxic combination', 'Finance approver who is also a vendor admin'], ['SaaS app · no connector', 'Accounts created by hand, never reviewed'], ['Service account · domain admin', 'Created for a project that ended in 2021']],
    ledger: { h: 'What changes in the first 90 days', rows: [['Certifications done in spreadsheets', 'Campaigns run in the platform'], ['Roles nobody can explain', 'Roles mined, documented and owned'], ['Audit evidence assembled by hand', 'Evidence exported in one click']] },
    capsH: 'Governance that ranks risk, not just records it.',
    caps: [['Role mining and modelling', 'We mine the access you already have into a small set of business roles with named owners, then keep them current as the organisation changes.'], ['Risk-ranked certifications', 'Reviewers see the risky access first, with context, so campaigns close in days and rubber-stamping stops.'], ['SoD and toxic-combination policy', 'Separation-of-duties rules written with your auditors and enforced at request time, not found a quarter later.'], ['Non-human identity ownership', 'Service accounts, bots and keys are inventoried, given an owner and pulled into the same reviews as people.']],
    proof: { q: 'Auditors signed off with no access exceptions.', who: 'Head of IAM · Financial services', m: '−40%', ml: 'roles after mining, same coverage' },
    fig: { h: 'Implemented on the platform you already own.', rows: [['Platform', ['SailPoint ISC', 'IdentityIQ', 'Saviynt', 'Entra ID Governance']], ['Connect', ['HR systems', 'AD / Entra', 'SaaS apps', 'Mainframe']], ['Run', ['Operations', 'Reporting', 'Audit packs']]] },
    faq: [['How long does an IGA rollout take?', 'A first wave — HR-driven lifecycle and a certification campaign on the riskiest applications — usually runs 12 to 16 weeks. We then onboard applications in planned waves.'], ['Which IGA platforms do you implement?', 'SailPoint Identity Security Cloud and IdentityIQ, Saviynt Enterprise Identity Cloud and Microsoft Entra ID Governance. We recommend the one that fits your estate; we do not resell licences to push one.'], ['Can you take over an IGA program that stalled?', 'Yes. We start with a two-week health check, fix what blocks the next audit, then agree a recovery plan.'], ['Do you run the platform after go-live?', 'If you want us to. Our managed IGA service covers operations, upgrades, certifications and monthly reporting.']],
    cta: 'Plan your IGA program with an expert.',
  }),
  'privileged-access': sol({
    name: 'Privileged access', short: 'PAM', group: 'Identity security', anim: '/img/sol-pam',
    blurb: 'Vaulted credentials and brokered, recorded sessions',
    h1: 'Admin access, only when it is needed.',
    lead: 'We implement and run privileged access management on CyberArk, BeyondTrust and Delinea — vaulting the keys to your estate and removing standing admin rights.',
    reality: ['Attackers do not break in.', 'They log in with admin rights you forgot about.'],
    problems: [['Shared admin password', 'Known by eleven people, unchanged for two years'], ['Standing domain admin', 'Twenty-three accounts, four used this year'], ['Secret in a script', 'Database password in a deployment pipeline']],
    ledger: { h: 'What changes in the first 90 days', rows: [['Admin passwords shared in spreadsheets', 'Credentials vaulted and rotated'], ['Standing admin rights everywhere', 'Just-in-time elevation, approved'], ['No record of what admins did', 'Every privileged session recorded']] },
    capsH: 'Fewer admins, shorter access, a full record.',
    caps: [['Discovery and vaulting', 'We find privileged accounts across servers, cloud and applications, then vault and rotate them on a schedule.'], ['Just-in-time elevation', 'Standing admin rights are replaced with time-bound elevation that is requested, approved and logged.'], ['Session brokering and recording', 'Admins connect through a broker; sessions are recorded and searchable for investigations and audits.'], ['Secrets for machines', 'Keys and passwords in pipelines and scripts move into a secrets manager with short-lived credentials.']],
    proof: { q: 'We removed standing admin rights in one quarter.', who: 'CISO · Manufacturing', m: '−90%', ml: 'standing privileged accounts' },
    fig: { h: 'Privileged access on the vault you choose.', rows: [['Platform', ['CyberArk', 'BeyondTrust', 'Delinea']], ['Cover', ['Windows / Unix', 'Cloud consoles', 'Databases', 'Pipelines']], ['Run', ['Rotation', 'Session review', 'Reporting']]] },
    faq: [['Where should a PAM program start?', 'With discovery. We find every privileged account first, then vault the riskiest — domain admins and cloud root accounts — in the first weeks.'], ['Will admins lose productivity?', 'No. Elevation takes seconds through the broker, and we tune approval flows with your teams before enforcing them.'], ['Do you cover cloud and DevOps secrets?', 'Yes. We bring cloud consoles, CI/CD pipelines and application secrets under the same policies.'], ['Can you run PAM for us?', 'Yes. Managed PAM covers platform health, onboarding, rotation failures and monthly reporting.']],
    cta: 'Plan your PAM program with an expert.',
  }),
  'access-management': sol({
    name: 'Access management', short: 'AM', group: 'Identity security', anim: '/img/sol-am',
    blurb: 'Single sign-on, MFA and conditional access',
    h1: 'One sign-in. The right checks.',
    lead: 'We roll out single sign-on, phishing-resistant MFA and conditional access on Okta, Microsoft Entra and Ping — fewer passwords for people, fewer doors for attackers.',
    reality: ['Every extra password is a door.', 'Most organisations still have hundreds.'],
    problems: [['App outside SSO', 'Separate password, no MFA, still in use'], ['SMS one-time codes', 'Phishable, and still the default'], ['Contractor accounts', 'Never disabled after the contract ended']],
    ledger: { h: 'What changes in the first 90 days', rows: [['A password per application', 'One sign-in for every app'], ['MFA by text message', 'Phishing-resistant passkeys'], ['Same rules for every login', 'Conditional access by risk']] },
    capsH: 'Strong sign-in that people do not fight.',
    caps: [['Single sign-on at scale', 'We onboard applications to SSO in waves, starting with the ones that hold the most sensitive data.'], ['Phishing-resistant MFA', 'Passkeys and FIDO2 replace codes, rolled out with communications and help-desk scripts.'], ['Conditional access', 'Policies that check device, location and risk before granting access — tested in report-only mode first.'], ['Passwordless journeys', 'We remove passwords where the platform allows it, starting with the workforce.']],
    proof: { q: 'Help-desk password resets dropped by half.', who: 'IT director · Healthcare', m: '−52%', ml: 'password-reset tickets' },
    fig: { h: 'Access management on your identity provider.', rows: [['Platform', ['Okta', 'Microsoft Entra ID', 'Ping Identity']], ['Connect', ['SaaS apps', 'Legacy apps', 'VPN / ZTNA']], ['Run', ['Policy tuning', 'App onboarding', 'Reporting']]] },
    faq: [['How many applications can you onboard to SSO?', 'As many as you have. We plan waves of 20–50 applications and use templates for common SaaS apps.'], ['Will passkeys work for all our users?', 'For most. We plan fallbacks for shared devices, frontline workers and legacy applications.'], ['Which platforms do you support?', 'Okta Workforce Identity, Microsoft Entra ID and Ping Identity.'], ['Can you migrate us between identity providers?', 'Yes. We run migrations application by application, with no big-bang cutover.']],
    cta: 'Plan your access management rollout.',
  }),
  'customer-identity': sol({
    name: 'Customer identity', short: 'CIAM', group: 'Identity security', anim: '/img/sol-ciam',
    blurb: 'Sign-up, sign-in and consent at customer scale',
    h1: 'Sign-in your customers will not notice.',
    lead: 'We build customer identity on Okta Customer Identity, Ping and ForgeRock — fast registration, passwordless sign-in and consent you can prove.',
    reality: ['Customers leave at the login screen.', 'And fraudsters walk straight through it.'],
    problems: [['Abandoned sign-up', 'Seven fields before the first screen'], ['Account takeover', 'Credential stuffing on the login page'], ['Consent in five systems', 'No single record of what customers agreed to']],
    ledger: { h: 'What changes after launch', rows: [['Long registration forms', 'Progressive profiling'], ['Passwords and resets', 'Passwordless and social sign-in'], ['Consent scattered across apps', 'One consent record per customer']] },
    capsH: 'Customer identity built for growth and trust.',
    caps: [['Registration and profiling', 'Short sign-up, more data later — collected when customers see the value of giving it.'], ['Passwordless sign-in', 'Passkeys, magic links and social sign-in with step-up checks for risky actions.'], ['Bot and fraud defence', 'Credential-stuffing protection, bot detection and risk-based step-up at the edge.'], ['Consent and privacy', 'A single record of consent and preferences, ready for GDPR and CCPA requests.']],
    proof: { q: 'Registrations went up the week we launched.', who: 'Digital director · Healthcare', m: '12 mo', ml: 'from design to full CIAM rollout' },
    fig: { h: 'Customer identity on the platform that fits.', rows: [['Platform', ['Okta CIAM', 'Ping Identity', 'ForgeRock']], ['Connect', ['Web', 'Mobile apps', 'CRM', 'APIs']], ['Run', ['Fraud tuning', 'Scaling', 'Reporting']]] },
    faq: [['How is CIAM different from workforce IAM?', 'Scale, experience and privacy. Customer identity serves millions of users, competes on conversion and carries consent obligations workforce identity does not.'], ['Can you migrate existing customer accounts?', 'Yes, including password hashes where the platform supports it, so customers are not forced to reset.'], ['Do you design the user experience?', 'Yes. We design journeys with your product team and test them before launch.'], ['How do you handle peak traffic?', 'We load-test to your expected peaks and design for regional failover.']],
    cta: 'Plan your customer identity program.',
  }),
  'non-human-identity': sol({
    name: 'Non-human identity', short: 'NHI', group: 'Emerging IAM', anim: '/img/sol-ciam',
    blurb: 'Service accounts, keys and workloads with owners',
    h1: 'Every machine identity has an owner.',
    lead: 'Service accounts, API keys, certificates and workloads now outnumber people. We find them, give each one an owner and bring them into governance.',
    reality: ['Machine identities outnumber people.', 'Most of them have no owner.'],
    problems: [['Service account · no owner', 'Created by a contractor who left'], ['API key · never expires', 'Committed to a repository in 2022'], ['Workload identity', 'Admin scope in every cloud account']],
    ledger: { h: 'What changes in the first 90 days', rows: [['No inventory of machine identities', 'One inventory across cloud and on-prem'], ['Keys that never expire', 'Short-lived, rotated credentials'], ['Nobody reviews machine access', 'Machine access in every certification']] },
    capsH: 'Governance for identities that never log in.',
    caps: [['Discovery and inventory', 'We scan directories, clouds and code for service accounts, keys and workloads.'], ['Ownership', 'Every non-human identity gets an accountable human owner, recorded in the IGA platform.'], ['Rotation and least privilege', 'Static secrets are rotated or replaced; scopes are cut to what is used.'], ['Lifecycle', 'Machine identities are created, reviewed and retired like any other identity.']],
    proof: { q: 'We found four times more service accounts than we expected.', who: 'Head of security · Technology', m: '4×', ml: 'service accounts vs. known inventory' },
    fig: { h: 'Machine identities, governed in your stack.', rows: [['Find', ['Directories', 'Cloud IAM', 'Code repos']], ['Govern', ['IGA', 'PAM / secrets', 'Owners']], ['Run', ['Rotation', 'Reviews', 'Retirement']]] },
    faq: [['What counts as a non-human identity?', 'Service accounts, API keys, certificates, bots, workload identities and AI agents — anything that authenticates without a person typing a password.'], ['Do we need a new tool?', 'Usually not. Most IGA and PAM platforms can govern non-human identities once they are discovered and owned.'], ['How do you find them?', 'We scan directories, cloud accounts, secrets stores and code repositories, then reconcile the results.'], ['Where should we start?', 'With privileged service accounts and keys that never expire — they carry the most risk.']],
    cta: 'Find every machine identity you run.',
  }),
  'identity-threat-detection': sol({
    name: 'Identity threat detection', short: 'ITDR', group: 'Emerging IAM', anim: '/img/sol-ai',
    blurb: 'Detect and respond to identity-based attacks',
    h1: 'See identity attacks while they happen.',
    lead: 'We connect your identity platforms to detection and response, so suspicious sign-ins, privilege changes and token theft are caught and contained.',
    reality: ['Most breaches use a valid identity.', 'Few security teams watch identity signals.'],
    problems: [['Impossible travel', 'Two sign-ins, two continents, ten minutes'], ['MFA fatigue', 'Thirty push requests at 2 a.m.'], ['Privilege change', 'New global admin, no ticket']],
    ledger: { h: 'What changes after rollout', rows: [['Identity logs nobody reads', 'Identity signals in your SOC'], ['Response by email thread', 'Playbooks that act in minutes'], ['Admin changes found at audit', 'Admin changes alerted in real time']] },
    capsH: 'Detection built on identity signals.',
    caps: [['Identity signal pipeline', 'Sign-in, MFA and directory events flow into your SIEM with the context analysts need.'], ['Detection rules', 'Rules for token theft, MFA fatigue, privilege escalation and dormant account use.'], ['Automated response', 'Playbooks that revoke sessions, reset credentials and open tickets.'], ['Posture hardening', 'Misconfigurations in AD and Entra found and fixed before attackers use them.']],
    proof: { q: 'We now see identity attacks before the help desk does.', who: 'SOC manager · Financial services', m: '15 min', ml: 'median time to contain', },
    fig: { h: 'Identity detection connected to your SOC.', rows: [['Signals', ['Entra / AD', 'Okta', 'PAM']], ['Detect', ['SIEM', 'ITDR rules', 'UEBA']], ['Respond', ['Playbooks', 'Revoke sessions', 'Tickets']]] },
    faq: [['Do we need a separate ITDR product?', 'Not always. Many detections can run in the SIEM and identity platforms you already own.'], ['Does this work with our SOC?', 'Yes. We integrate with your SIEM and SOAR, or run it through our managed SOC.'], ['Which attacks do you cover first?', 'Token theft, MFA fatigue, privilege escalation and use of dormant accounts.'], ['How long does it take?', 'A first set of detections and playbooks typically goes live in six to eight weeks.']],
    cta: 'Watch your identity layer like an attacker does.',
  }),
  'zero-trust': sol({
    name: 'Zero Trust', short: 'ZT', group: 'Emerging IAM', anim: '/img/sol-am',
    blurb: 'Identity-first architecture, delivered in stages',
    h1: 'Zero Trust, starting with identity.',
    lead: 'We turn Zero Trust from a slide into a staged plan — strong identity, device checks and least privilege — delivered on the platforms you already run.',
    reality: ['Zero Trust is a direction, not a product.', 'Most programs stall at the strategy deck.'],
    problems: [['Flat network', 'VPN access to everything'], ['Unknown devices', 'Personal laptops on production apps'], ['Broad roles', 'Everyone in IT is an admin']],
    ledger: { h: 'What changes in the first year', rows: [['Trust by network location', 'Trust by identity and device'], ['VPN to everything', 'Per-application access'], ['Broad standing access', 'Least privilege by default']] },
    capsH: 'A staged path to Zero Trust.',
    caps: [['Maturity assessment', 'We score your current state against CISA and NIST models and agree the target.'], ['Identity foundations', 'Strong MFA, single sign-on and governance first — the base every other pillar depends on.'], ['Device and network', 'Device posture in access decisions and per-application access in place of VPN.'], ['Least privilege', 'Roles cut to what people use, with just-in-time access for the rest.']],
    proof: { q: 'We retired the VPN for most of our staff.', who: 'CIO · Public sector', m: '18 mo', ml: 'staged Zero Trust roadmap' },
    fig: { h: 'Zero Trust pillars, in delivery order.', rows: [['Identity', ['MFA', 'SSO', 'Governance']], ['Device', ['Posture', 'Management']], ['Access', ['Per-app access', 'Least privilege', 'Monitoring']]] },
    faq: [['Which framework do you follow?', 'We map to the CISA Zero Trust Maturity Model and NIST SP 800-207, and translate both into a plan your teams can deliver.'], ['Do we need new products?', 'Often not. Most organisations own much of what they need; the work is configuring and connecting it.'], ['Where do you start?', 'With identity — strong authentication and governance — because every other pillar depends on it.'], ['How long does it take?', 'A useful first stage takes three to six months. Full maturity is a multi-year program.']],
    cta: 'Turn Zero Trust into a plan.',
  }),
  'managed-soc': sol({
    name: 'Managed SOC', short: 'SOC', group: 'Security operations', anim: '/img/sol-iga',
    blurb: '24/7 monitoring, detection and response',
    h1: 'Threats watched around the clock.',
    lead: 'Our security operations centre monitors your estate 24/7, investigates what matters and responds with playbooks agreed with your team.',
    reality: ['Alerts arrive at 3 a.m.', 'Most teams are not there to see them.'],
    problems: [['Alert fatigue', 'Thousands of alerts, a handful investigated'], ['Night and weekend gaps', 'Nobody on shift when it matters'], ['Slow response', 'Containment waits for the morning stand-up']],
    ledger: { h: 'What changes after onboarding', rows: [['Alerts nobody triages', 'Every alert triaged within SLA'], ['Office-hours coverage', '24/7 analysts on shift'], ['Manual response', 'Playbooks that contain in minutes']] },
    capsH: 'A SOC that knows identity.',
    caps: [['24/7 monitoring', 'Analysts watch your SIEM and EDR around the clock from our delivery centres.'], ['Investigation and triage', 'Every alert investigated with identity context, so false positives are closed fast.'], ['Incident response', 'Agreed playbooks to contain threats, with your team informed at every step.'], ['Compliance reporting', 'Monthly reports mapped to the frameworks your auditors use.']],
    proof: { q: 'We finally have someone watching at night.', who: 'IT director · Education', m: '24/7', ml: 'monitoring and response' },
    fig: { h: 'SOC services on your security stack.', rows: [['Collect', ['SIEM', 'EDR', 'Identity logs']], ['Detect', ['Use cases', 'Threat intel', 'UEBA']], ['Respond', ['Playbooks', 'Reporting', 'Reviews']]] },
    faq: [['Which SIEM platforms do you support?', 'Microsoft Sentinel, Splunk and other major SIEMs. We can also host the platform for you.'], ['What are your response times?', 'Agreed in the contract by severity; critical alerts are escalated within minutes.'], ['Do you replace our security team?', 'No. We extend it, covering nights, weekends and the first line of triage.'], ['How long is onboarding?', 'Typically four to eight weeks, depending on log sources.']],
    cta: 'Put analysts on your estate tonight.',
  }),
};

/* ------------------------------------------------------------------ */
/* Services — W03                                                       */
/* ------------------------------------------------------------------ */
const svc = (o) => ({ template: 'service', ...o });
const METRICS = [['24+ yrs', 'in identity security'], ['1,600+', 'implementations'], ['200+', 'engagements'], ['ISO 27001', 'certified']];
export const SERVICE_PAGES = {
  'advisory-consulting': svc({
    name: 'Advisory & consulting', eyebrow: 'Advisory & consulting', img: '/img/svc-advisory.webp', anim: '/img/sol-ai',
    blurb: 'Assessment, operating model and roadmap',
    h1: 'A roadmap you can act on.',
    lead: 'An independent view of where your identity program stands, where it needs to be and the order to get there in — in four to six weeks.',
    chips: ['Fixed scope', '4–6 weeks', 'Board-ready output'],
    getH: 'Four deliverables, one roadmap.',
    gets: [['Current-state assessment', 'Interviews, platform reviews and data sampling show where your program really stands — not where the documentation says it is.'], ['Target operating model', 'Who owns what, which processes run where and how identity decisions get made.'], ['Prioritised roadmap', 'Initiatives ranked by risk reduced and effort, with costs and dependencies your board can approve.'], ['Platform recommendation', 'If you need a new platform, a neutral comparison of the ones that fit — we do not resell licences.']],
    steps: [['Discover', 'Week 1', 'Stakeholder interviews and document review.'], ['Assess', 'Weeks 2–3', 'Platform reviews, data sampling and maturity scoring.'], ['Design', 'Weeks 4–5', 'Target model and prioritised roadmap drafted with you.'], ['Hand over', 'Week 6', 'Board-ready readout and next-step plan.']],
    proof: { q: 'The roadmap became our budget case.', who: 'CIO · Public sector', m: '6 wks', ml: 'assessment to approved roadmap' },
    faq: [['What does an assessment include?', 'Interviews with IT, security, HR and audit; a review of your identity platforms and processes; data sampling; and a maturity score against an industry model.'], ['How is it priced?', 'As a fixed-scope, fixed-fee engagement agreed before we start.'], ['What do you need from us?', 'Around ten hours from key stakeholders, read access to platform configuration and a sponsor who can unblock decisions.'], ['Do we have to use you to implement?', 'No. The roadmap is yours. Many clients do ask us to deliver it.']],
    cta: 'Start with a conversation.',
  }),
  'implementation': svc({
    name: 'Implementation', eyebrow: 'Implementation services', img: '/img/svc-implementation.webp', anim: '/img/sol-pam',
    blurb: 'IGA, PAM, CIAM and AM rollouts',
    h1: 'Platforms live, on the date we agreed.',
    lead: 'Certified engineers deploy IGA, PAM, CIAM and access management — designed around your processes, delivered in waves, with no downtime at cutover.',
    chips: ['Certified engineers', 'Delivered in waves', 'Zero-downtime cutover'],
    getH: 'What every implementation delivers.',
    gets: [['Solution design', 'Architecture, integrations and processes documented before build, signed off by your team.'], ['Configured platform', 'Connectors, roles, policies and workflows built and tested in your environments.'], ['Application onboarding', 'Applications brought in by wave, highest risk first, with owners trained.'], ['Handover pack', 'Runbooks, training and support plan so your team — or ours — can run it.']],
    steps: [['Design', 'Weeks 1–3', 'Architecture and processes agreed and signed off.'], ['Build', 'Weeks 4–10', 'Platform configured and integrated in non-production.'], ['Test', 'Weeks 9–12', 'Functional, performance and user acceptance testing.'], ['Go live', 'Week 12+', 'Cutover, hypercare and application waves.']],
    proof: { q: 'Go-live happened on the date in the plan.', who: 'Head of IAM · Retail', m: '1,600+', ml: 'implementations delivered' },
    faq: [['Which platforms do you implement?', 'SailPoint, Saviynt, Microsoft Entra, Okta, CyberArk, BeyondTrust, Ping and ForgeRock, among others.'], ['How long does a rollout take?', 'A first wave typically takes 12–16 weeks; further application waves follow every few weeks.'], ['Do you work with our internal team?', 'Yes. We pair with your engineers so knowledge stays in-house.'], ['Do you run it after go-live?', 'If you want us to — through operations & support or a fully managed service.']],
    cta: 'Plan your implementation with an expert.',
  }),
  'operations-and-support': svc({
    name: 'Operations & support', eyebrow: 'Operations & support', img: '/img/svc-operations.webp', anim: '/img/sol-iga',
    blurb: 'Keep platforms healthy, current and inside SLA',
    h1: 'Identity platforms that stay healthy.',
    lead: 'We keep your identity platforms patched, upgraded and inside SLA — with access changes handled fast and upgrades planned months ahead.',
    chips: ['SLA-backed', 'Upgrades on a calendar', 'Monthly health report'],
    getH: 'What we look after.',
    gets: [['Platform health', 'Monitoring, patching and performance tuning across environments.'], ['Access changes', 'Requests, onboarding and fixes handled inside agreed SLAs.'], ['Upgrades', 'Version upgrades planned on a calendar, tested before they reach production.'], ['Reporting', 'A monthly health report with incidents, trends and recommendations.']],
    steps: [['Transition', 'Weeks 1–4', 'Knowledge transfer and runbooks.'], ['Stabilise', 'Weeks 5–8', 'Backlog cleared and monitoring in place.'], ['Optimise', 'Month 3+', 'Automation and tuning.'], ['Report', 'Monthly', 'Health report and service review.']],
    proof: { q: 'Upgrades stopped being a fire drill.', who: 'IT manager · Insurance', m: '99.9%', ml: 'platform availability' },
    faq: [['Which platforms do you support?', 'The same platforms we implement, including SailPoint, Saviynt, Entra, Okta and CyberArk.'], ['Can you support a platform you did not build?', 'Yes. Transition starts with a health check of what is there.'], ['What hours do you cover?', 'Business hours or 24/7, depending on the coverage level you choose.'], ['How is it priced?', 'A monthly fee based on platform scope and coverage level.']],
    cta: 'Hand us the day-to-day.',
  }),
  'wfaas': svc({
    name: 'Workforce as a service', eyebrow: 'WfaaS', img: '/img/svc-implementation-alt.webp', anim: '/img/sol-ciam',
    blurb: 'Certified identity engineers, on demand',
    h1: 'Identity engineers, when you need them.',
    lead: 'Certified identity specialists who join your team for a project, a backlog or a peak — without the hiring cycle.',
    chips: ['Certified specialists', 'Flexible terms', 'Start in weeks'],
    getH: 'How WfaaS works.',
    gets: [['Matched specialists', 'Engineers matched to your platform and seniority needs.'], ['Flexible capacity', 'Scale up or down by month as the work changes.'], ['Delivery oversight', 'A delivery manager checks quality and continuity.'], ['Knowledge kept', 'Documentation and handover built into every assignment.']],
    steps: [['Scope', 'Week 1', 'Roles, skills and duration agreed.'], ['Match', 'Weeks 1–2', 'Profiles shared and interviewed.'], ['Onboard', 'Weeks 2–3', 'Access, tools and induction.'], ['Deliver', 'Ongoing', 'Monthly check-ins and reporting.']],
    proof: { q: 'Two engineers started within three weeks.', who: 'IAM lead · Financial services', m: '3 wks', ml: 'request to first day' },
    faq: [['Which skills can you provide?', 'Engineers and architects for IGA, PAM, access management and CIAM platforms.'], ['How fast can someone start?', 'Usually within two to three weeks.'], ['What are the contract terms?', 'Monthly terms with a short notice period.'], ['Are they employees of TechDemocracy?', 'Yes. They are our certified staff, backed by our delivery team.']],
    cta: 'Add identity engineers to your team.',
  }),
};

/* ------------------------------------------------------------------ */
/* Managed services — W04                                               */
/* ------------------------------------------------------------------ */
const mgd = (o) => ({ template: 'managed', ...o });
export const MANAGED_PAGES = {
  'managed-iga': mgd({
    name: 'Managed IGA', eyebrow: 'Managed services · IGA', img: '/img/svc-managed.webp', anim: '/img/sol-iga', blurb: 'Your governance platform, run for you',
    h1: 'Your IGA platform, run 24/7.',
    lead: 'We operate your identity governance platform — certifications, lifecycle, onboarding and upgrades — so your team can focus on decisions, not tickets.',
    runs: [['Platform health & upgrades', 'Daily'], ['Joiner, mover, leaver', 'Continuous'], ['Certification campaigns', 'Quarterly'], ['Reporting & audits', 'Monthly']],
  }),
  'managed-pam': mgd({
    name: 'Managed PAM', eyebrow: 'Managed services · PAM', img: '/img/svc-operations.webp', anim: '/img/sol-pam', blurb: 'Vaults, rotation and sessions, run for you',
    h1: 'Your PAM platform, run 24/7.',
    lead: 'We operate your privileged access platform — onboarding accounts, fixing rotation failures and reviewing sessions — around the clock.',
    runs: [['Platform health & upgrades', 'Daily'], ['Account onboarding', 'Continuous'], ['Rotation failures', 'Within SLA'], ['Reporting & audits', 'Monthly']],
  }),
  'managed-access-management': mgd({
    name: 'Managed access management', eyebrow: 'Managed services · AM', img: '/img/svc-advisory.webp', anim: '/img/sol-am', blurb: 'SSO, MFA and policies, run for you',
    h1: 'Sign-in that keeps working.',
    lead: 'We run your access management platform — onboarding applications, tuning policies and handling incidents — inside agreed SLAs.',
    runs: [['Platform health & upgrades', 'Daily'], ['Application onboarding', 'Continuous'], ['Policy tuning', 'Monthly'], ['Reporting', 'Monthly']],
  }),
  'managed-ciam': mgd({
    name: 'Managed CIAM', eyebrow: 'Managed services · CIAM', img: '/img/svc-ai-agents.webp', anim: '/img/sol-ciam', blurb: 'Customer identity at scale, run for you',
    h1: 'Customer sign-in, always on.',
    lead: 'We operate your customer identity platform — scaling for peaks, tuning fraud controls and shipping journey changes — 24/7.',
    runs: [['Availability & scaling', 'Continuous'], ['Fraud and bot tuning', 'Weekly'], ['Journey changes', 'Per release'], ['Reporting', 'Monthly']],
  }),
  'managed-soc': mgd({
    name: 'Managed SOC', eyebrow: 'Managed services · SOC', img: '/img/svc-implementation.webp', anim: '/img/sol-ai', blurb: '24/7 detection and response',
    h1: 'Security operations, around the clock.',
    lead: 'Analysts in our delivery centres monitor, investigate and respond to threats across your estate — day and night.',
    runs: [['24/7 monitoring', 'Continuous'], ['Investigation & triage', 'Within SLA'], ['Incident response', 'Within SLA'], ['Reporting', 'Monthly']],
  }),
};
export const MANAGED_OVERVIEW = mgd({
  name: 'Managed services', eyebrow: 'Managed services', img: '/img/svc-managed.webp', anim: '/img/sol-am', blurb: 'A dedicated team runs your identity platforms',
  h1: 'We run it. You govern it.',
  lead: 'A dedicated team runs your identity platforms 24/7, with a named service delivery manager and a monthly report — across IGA, PAM, access management and CIAM.',
  runs: [['Platform health & upgrades', 'Daily'], ['Onboarding & access changes', 'Continuous'], ['Incident response', '24/7'], ['Reporting & audits', 'Monthly']],
});
export const MANAGED_SHARED = {
  metrics: [['24/7', 'monitoring'], ['15M+', 'identities managed'], ['4', 'delivery centres'], ['ISO 27001', 'certified']],
  chips: ['24/7 coverage', 'Named SDM', 'Monthly reporting'],
  levels: [
    ['Essential', 'Business hours', ['Platform monitoring', 'Business-hours support', 'Quarterly review']],
    ['Advanced', '24/7', ['Everything in Essential', '24/7 incident response', 'Upgrades on a calendar', 'Monthly review']],
    ['Complete', '24/7 + architect', ['Everything in Advanced', 'Named architect', 'Roadmap planning', 'Audit pack every month']],
  ],
  ledger: { h: 'What the handover changes', rows: [['Tickets queue for days', 'Changes inside agreed SLAs'], ['Upgrades slip a year', 'Upgrades on a calendar'], ['Audit prep is a fire drill', 'Audit pack every month']] },
  steps: [['Transition', 'Weeks 1–4', 'Knowledge transfer, access and runbooks.'], ['Stabilise', 'Weeks 5–8', 'Backlog cleared, monitoring live.'], ['Optimise', 'Month 3+', 'Automation and service improvements.'], ['Report', 'Monthly', 'Service review with your team.']],
  proof: { q: 'Hand us the run. Keep the control.', who: 'Director IT · Manufacturing', m: '99.9%', ml: 'platform availability, 12 months' },
  faq: [['What does the contract cover?', 'Platform operations, agreed service levels, a named service delivery manager and monthly reporting. Scope is listed per platform.'], ['What are your SLAs?', 'Response and resolution times by priority, written into the contract and reported every month.'], ['How does the transition work?', 'Four weeks of knowledge transfer and parallel running before we take over, with no gap in service.'], ['What if we want to leave?', 'Exit terms are agreed up front, including a handover plan and documentation.']],
};

/* ------------------------------------------------------------------ */
/* Partners & compare — W05                                             */
/* ------------------------------------------------------------------ */
const ptn = (o) => ({ template: 'partner', ...o });
export const PARTNER_PAGES = {
  sailpoint: ptn({
    name: 'SailPoint', img: '/img/cr-rings.webp', tier: 'Delivery partner', blurb: 'IdentityIQ and Identity Security Cloud',
    h1: 'SailPoint, delivered by specialists.',
    lead: 'Delivery partner for IdentityIQ and Identity Security Cloud — from first rollout to IIQ-to-ISC migration and managed operations.',
    chips: ['Delivery partner', 'IIQ + ISC', 'Migration'],
    creds: [['Delivery partner', 'Partner tier'], ['Certified', 'Engineers on IIQ and ISC'], ['Both platforms', 'IdentityIQ · ISC']],
    offers: [['IdentityIQ', 'Design, build and upgrades for on-premises IdentityIQ.', ['Rollouts and upgrades', 'Custom connectors', 'Role models']], ['Identity Security Cloud', 'SaaS governance rolled out in waves, with AI-driven recommendations tuned.', ['Tenant design', 'Source onboarding', 'Access profiles']], ['IIQ to ISC migration', 'Move from IdentityIQ to the cloud without losing your governance history.', ['Readiness assessment', 'Connector mapping', 'Cutover plan']], ['Managed SailPoint', 'We run the platform day to day as your SailPoint MSP.', ['24/7 operations', 'Certifications', 'Monthly reporting']]],
    proof: { q: 'Migration finished a quarter early.', who: 'IAM lead · Retail', m: '16 wks', ml: 'IIQ to ISC migration' },
    compare: 'sailpoint-vs-saviynt',
  }),
  saviynt: ptn({
    name: 'Saviynt', img: '/img/cr-tdc2.webp', tier: 'Implementation partner', blurb: 'Enterprise Identity Cloud',
    h1: 'Saviynt, rolled out right.',
    lead: 'Implementation partner for Saviynt Enterprise Identity Cloud — governance, application access and privileged access in one platform.',
    chips: ['Implementation partner', 'EIC', 'Converged identity'],
    creds: [['Implementation partner', 'Partner tier'], ['Certified', 'Engineers on EIC'], ['Converged', 'IGA · PAM · app access']],
    offers: [['Identity governance', 'Lifecycle, certifications and roles on EIC.', ['Lifecycle', 'Certifications', 'Role design']], ['Application access', 'Fine-grained access governance for ERP and SaaS.', ['SAP and Oracle', 'SoD rules', 'Emergency access']], ['Cloud PAM', 'Privileged access from the same platform.', ['Just-in-time access', 'Session control', 'Cloud entitlements']], ['Managed Saviynt', 'Day-to-day operations by our team.', ['Operations', 'Upgrades', 'Reporting']]],
    proof: { q: 'SoD conflicts were cut before the first audit.', who: 'Controller · Manufacturing', m: '−60%', ml: 'SoD conflicts in ERP' },
    compare: 'sailpoint-vs-saviynt',
  }),
  okta: ptn({
    name: 'Okta', img: '/img/cr-wrenches.webp', tier: 'Implementation partner', blurb: 'Workforce and Customer Identity',
    h1: 'Okta for your workforce and customers.',
    lead: 'Implementation partner for Okta Workforce Identity and Customer Identity — single sign-on, MFA, lifecycle and customer journeys.',
    chips: ['Implementation partner', 'Workforce + CIAM', 'Passwordless'],
    creds: [['Implementation partner', 'Partner tier'], ['Certified', 'Okta engineers'], ['Both clouds', 'Workforce · Customer']],
    offers: [['Workforce Identity', 'SSO, adaptive MFA and lifecycle automation.', ['SSO waves', 'Adaptive MFA', 'Lifecycle']], ['Customer Identity', 'Registration, sign-in and consent for customers.', ['Journeys', 'Passwordless', 'Consent']], ['Okta migrations', 'Move from legacy identity providers to Okta.', ['App-by-app cutover', 'Password migration', 'No big bang']], ['Managed Okta', 'Policy tuning and onboarding as a service.', ['Onboarding', 'Policy tuning', 'Reporting']]],
    proof: { q: 'Every app moved to SSO without a single outage.', who: 'IT director · Healthcare', m: '300+', ml: 'applications on SSO' },
    compare: 'okta-vs-entra-id',
  }),
  'microsoft-entra': ptn({
    name: 'Microsoft Entra ID', img: '/img/cr-tunnel.webp', tier: 'Identity services', blurb: 'ID Governance and Conditional Access',
    h1: 'Get more from the Entra you own.',
    lead: 'We configure Microsoft Entra ID, ID Governance and Conditional Access so the licences you already pay for do the work.',
    chips: ['Identity services', 'ID Governance', 'Conditional Access'],
    creds: [['Identity services', 'Microsoft focus'], ['Certified', 'Entra engineers'], ['Full suite', 'ID · Governance · PIM']],
    offers: [['Conditional Access', 'Risk-based policies, tested in report-only first.', ['Policy design', 'Report-only testing', 'Rollout']], ['ID Governance', 'Access reviews, entitlement management and lifecycle workflows.', ['Access reviews', 'Access packages', 'Lifecycle']], ['Privileged Identity Management', 'Just-in-time admin roles in Entra and Azure.', ['Role discovery', 'JIT activation', 'Alerts']], ['Managed Entra', 'Ongoing tuning and operations.', ['Tuning', 'Incidents', 'Reporting']]],
    proof: { q: 'We stopped paying for a second governance tool.', who: 'CIO · Professional services', m: '100%', ml: 'reviews moved into Entra' },
    compare: 'okta-vs-entra-id',
  }),
  cyberark: ptn({
    name: 'CyberArk', img: '/img/extra-rings.webp', tier: 'Implementation partner', blurb: 'Privileged access and secrets',
    h1: 'CyberArk, implemented and run.',
    lead: 'We deploy and operate CyberArk privileged access and secrets management — vaulting, rotation, session control and endpoint privilege.',
    chips: ['Implementation partner', 'PAM + secrets', 'Managed PAM'],
    creds: [['Implementation partner', 'Partner tier'], ['Certified', 'CyberArk engineers'], ['End to end', 'Vault to endpoint']],
    offers: [['Privilege Cloud', 'SaaS PAM rolled out in waves.', ['Discovery', 'Vaulting', 'Rotation']], ['Self-hosted PAM', 'Upgrades and expansion of on-premises CyberArk.', ['Upgrades', 'High availability', 'Hardening']], ['Secrets management', 'Secrets out of code and into Conjur.', ['Pipelines', 'Kubernetes', 'Applications']], ['Managed CyberArk', 'We run the platform for you.', ['Rotation failures', 'Onboarding', 'Reporting']]],
    proof: { q: 'Every domain admin is now vaulted.', who: 'CISO · Energy', m: '100%', ml: 'domain admin accounts vaulted' },
    compare: 'cyberark-vs-beyondtrust',
  }),
};

const cmp = (o) => ({ template: 'compare', ...o });
export const COMPARE_PAGES = {
  'sailpoint-vs-saviynt': cmp({ name: 'SailPoint vs Saviynt', a: 'SailPoint', b: 'Saviynt', img: '/img/cr-rings.webp', blurb: 'Two leading IGA platforms',
    h1: 'SailPoint vs Saviynt — where each fits.', lead: 'A neutral comparison from a team that implements both. No scores — just the questions that decide the fit for your estate.',
    rows: [['Deployment model', 'SaaS (ISC) or self-hosted (IdentityIQ)', 'SaaS (Enterprise Identity Cloud)'], ['Governance depth', 'Deep certification and role tooling', 'Strong governance with built-in app access controls'], ['Application access', 'Via add-ons and partners', 'Native fine-grained ERP access'], ['Privileged access', 'Integrates with PAM vendors', 'Includes cloud PAM capabilities'], ['Best fit for', 'Large, complex governance programs', 'Converged IGA and app-access needs']] }),
  'okta-vs-entra-id': cmp({ name: 'Okta vs Microsoft Entra ID', a: 'Okta', b: 'Microsoft Entra ID', img: '/img/cr-wrenches.webp', blurb: 'Workforce identity providers',
    h1: 'Okta vs Entra ID — where each fits.', lead: 'Both are strong identity providers. The right one depends on your estate, your licences and your mix of applications.',
    rows: [['Deployment model', 'Independent SaaS', 'Part of Microsoft cloud'], ['Application catalogue', 'Very broad, vendor-neutral', 'Broad, strongest with Microsoft apps'], ['Governance', 'Okta Identity Governance', 'Entra ID Governance'], ['Licensing', 'Separate subscription', 'Often bundled in Microsoft 365'], ['Best fit for', 'Mixed, multi-cloud estates', 'Microsoft-centred estates']] }),
  'identityiq-vs-identity-security-cloud': cmp({ name: 'IdentityIQ vs Identity Security Cloud', a: 'IdentityIQ', b: 'Identity Security Cloud', img: '/img/cr-tunnel.webp', blurb: 'Choosing between SailPoint platforms',
    h1: 'IdentityIQ vs ISC — where each fits.', lead: 'Staying on IdentityIQ or moving to Identity Security Cloud? The questions we work through with SailPoint clients.',
    rows: [['Deployment model', 'Self-hosted', 'SaaS'], ['Customisation', 'Extensive, code-level', 'Configuration-led, extensible'], ['Upgrades', 'Planned by you', 'Delivered by SailPoint'], ['AI features', 'Limited', 'Recommendations and outlier detection'], ['Best fit for', 'Heavy customisation, strict hosting rules', 'Teams moving to SaaS operations']] }),
  'cyberark-vs-beyondtrust': cmp({ name: 'CyberArk vs BeyondTrust', a: 'CyberArk', b: 'BeyondTrust', img: '/img/extra-rings.webp', blurb: 'Privileged access platforms',
    h1: 'CyberArk vs BeyondTrust — where each fits.', lead: 'Two mature PAM platforms with different strengths. A neutral view from a team that deploys both.',
    rows: [['Deployment model', 'SaaS or self-hosted', 'SaaS or self-hosted'], ['Core strength', 'Vaulting and session security', 'Endpoint privilege and remote access'], ['Secrets management', 'Conjur', 'Password Safe / Secrets Safe'], ['Ease of rollout', 'Thorough, more planning', 'Faster for endpoint use cases'], ['Best fit for', 'Large regulated estates', 'Endpoint-heavy and remote-access needs']] }),
};
export const PARTNER_SHARED = {
  faq: [['Do you resell licences?', 'Where a client asks us to, but our recommendations do not depend on it. We implement several platforms and recommend the one that fits.'], ['Can you migrate us between platforms?', 'Yes. We plan migrations application by application, with parallel running before cutover.'], ['Do you support the platform after go-live?', 'Yes, through operations & support or a fully managed service.'], ['How are your engineers certified?', 'Our engineers hold vendor certifications for the platforms they deliver, renewed as vendors release new versions.']],
};

/* ------------------------------------------------------------------ */
/* Industries & compliance — W06                                        */
/* ------------------------------------------------------------------ */
const ind = (o) => ({ template: 'industry', ...o });
export const INDUSTRY_PAGES = {
  'financial-services': ind({ kind: 'industry', name: 'Financial services', chip: 'Banking · Insurance · Capital markets', img: '/img/extra-tunnel.webp', blurb: 'Access controls regulators trust',
    h1: 'Identity controls your regulators trust.', lead: 'Banks, insurers and investment firms rely on us to keep access reviewed, privileged accounts locked down and audit evidence ready.',
    reality: ['Regulators now ask about identity first.', 'Spreadsheets do not satisfy them.'], areas: ['Quarterly reviews', 'Privileged access', 'Third-party access'],
    map: [['Access reviews', 'Quarterly user access certification', 'Campaigns in your IGA platform'], ['Segregation of duties', 'SoD rules for trading and payments', 'Policy rules + mitigating controls'], ['Privileged access', 'Vaulted, recorded admin access', 'PAM with session recording'], ['Third parties', 'Time-bound vendor access', 'Sponsored identities with expiry']],
    risks: [['Orphaned accounts', 'Leavers who still have access to trading and payment systems.'], ['Toxic combinations', 'Users who can both create and approve the same transaction.'], ['Manual evidence', 'Audit packs assembled by hand, late and incomplete.']],
    proof: { q: 'We closed our access findings in one cycle.', who: 'Controller · Financial services', m: '0', ml: 'repeat access findings next audit' }, cta: 'Prepare for your next audit with an expert.' }),
  healthcare: ind({ kind: 'industry', name: 'Healthcare', chip: 'Providers · Payers · Life sciences', img: '/img/extra-rings.webp', blurb: 'Fast clinical access, protected records',
    h1: 'Fast access for clinicians. Locked doors for everyone else.', lead: 'Hospitals, payers and life-sciences firms use us to give clinicians quick access while keeping patient data protected and auditable.',
    reality: ['Clinicians share logins to save time.', 'Patient data pays the price.'], areas: ['Shared workstations', 'Clinical apps', 'Patient portals'],
    map: [['Access to PHI', 'Role-based access to patient records', 'Roles mapped to clinical jobs'], ['Shared workstations', 'Fast user switching with MFA', 'Badge-tap and passwordless sign-in'], ['Audit', 'Who accessed which record', 'Access logs reviewed and reported'], ['Patients', 'Secure portal sign-in', 'CIAM with consent records']],
    risks: [['Shared credentials', 'Clinicians sharing logins on busy wards.'], ['Over-broad access', 'Staff who can open every patient record.'], ['Leaver access', 'Agency staff who keep access after shifts end.']],
    proof: { q: 'Clinicians sign in faster and we pass our audits.', who: 'CIO · Healthcare provider', m: '12 wks', ml: 'from kickoff to first certification' }, cta: 'Protect patient data without slowing care.' }),
  manufacturing: ind({ kind: 'industry', name: 'Manufacturing', chip: 'Discrete · Process · Supply chain', img: '/img/cr-tdc2.webp', blurb: 'Identity across plants, partners and OT',
    h1: 'Identity across every plant and partner.', lead: 'Manufacturers use us to govern access across plants, suppliers and operational technology — without stopping the line.',
    reality: ['Plants run on shared accounts.', 'Suppliers keep access long after the contract.'], areas: ['Shared plant accounts', 'Supplier access', 'OT systems'],
    map: [['Supplier access', 'Time-bound partner accounts', 'Sponsored identities with expiry'], ['Shared accounts', 'Named access on the floor', 'Badge sign-in and PAM for shared logins'], ['OT systems', 'Brokered remote access', 'PAM sessions for OT vendors'], ['ERP', 'SoD in procurement', 'Application access controls']],
    risks: [['Supplier sprawl', 'Hundreds of partner accounts with no owner.'], ['Shared logins', 'One account used by a whole shift.'], ['Remote OT access', 'Vendors connecting straight to plant systems.']],
    proof: { q: 'Supplier access is now reviewed every quarter.', who: 'Director IT · Manufacturing', m: '−70%', ml: 'inactive supplier accounts' }, cta: 'Govern access across your plants.' }),
};
export const COMPLIANCE_PAGES = {
  sox: ind({ kind: 'compliance', name: 'SOX access controls', chip: 'SOX · Access controls', img: '/img/extra-tunnel.webp', blurb: 'Audit-ready access every quarter',
    h1: 'Audit-ready access, every quarter.', lead: 'We help finance and IT teams meet SOX IT general controls for access — reviews, segregation of duties and evidence — without the quarterly scramble.',
    reality: ['Access reviews still run on spreadsheets.', 'Auditors see it first.'], areas: ['Quarterly reviews', 'SoD conflicts', 'Evidence trails'],
    map: [['Access', 'Quarterly user access reviews', 'Certification campaigns in your IGA platform'], ['SoD', 'Separation of duties', 'Policy rules + mitigating controls'], ['Provisioning', 'Approved access only', 'Request and approval workflows'], ['Evidence', 'Audit trail of approvals', 'Exportable evidence packs']],
    risks: [['Orphaned accounts', 'Leavers still active in financial systems.'], ['Toxic combinations', 'Users who can create and approve journal entries.'], ['Manual evidence', 'Screenshots and spreadsheets as proof.']],
    proof: { q: 'We closed our access findings in one cycle.', who: 'Controller · Financial services', m: '0', ml: 'repeat access findings next audit' }, cta: 'Prepare for your next audit with an expert.' }),
  hipaa: ind({ kind: 'compliance', name: 'HIPAA', chip: 'HIPAA · Security Rule', img: '/img/extra-rings.webp', blurb: 'Access safeguards for patient data',
    h1: 'Access safeguards for patient data.', lead: 'We map the HIPAA Security Rule access requirements to identity controls you can run and evidence.',
    reality: ['Most PHI exposure starts with access.', 'Not with a hacker.'], areas: ['Unique user IDs', 'Access reviews', 'Audit controls'],
    map: [['Unique user identification', 'Named accounts for every user', 'Lifecycle from HR, no shared logins'], ['Access control', 'Minimum necessary access', 'Role-based access by clinical role'], ['Audit controls', 'Record of access to ePHI', 'Logging and periodic review'], ['Authentication', 'Verify user identity', 'MFA and passwordless sign-in']],
    risks: [['Shared logins', 'Generic accounts on clinical systems.'], ['Excess access', 'Staff able to view any record.'], ['No review', 'Access never re-checked after role changes.']],
    proof: { q: 'Our access audit came back clean.', who: 'Privacy officer · Healthcare', m: '12 wks', ml: 'to first access certification' }, cta: 'Map HIPAA to controls that work.' }),
  gdpr: ind({ kind: 'compliance', name: 'GDPR', chip: 'GDPR · Data protection', img: '/img/cr-tunnel.webp', blurb: 'Consent and access you can prove',
    h1: 'Personal data, accessed on purpose.', lead: 'We help you show who can access personal data, why, and what customers consented to — for staff and for customers.',
    reality: ['Personal data lives in hundreds of apps.', 'Few teams know who can reach it.'], areas: ['Access to personal data', 'Consent records', 'Subject requests'],
    map: [['Data minimisation', 'Access only where needed', 'Roles and reviews on systems with personal data'], ['Consent', 'Record of what customers agreed to', 'CIAM consent and preference store'], ['Subject requests', 'Find and export a person’s data', 'Identity-linked request workflows'], ['Security of processing', 'Strong authentication', 'MFA and conditional access']],
    risks: [['Unknown access', 'No list of who can read customer data.'], ['Scattered consent', 'Consent stored in many systems.'], ['Slow requests', 'Subject requests answered by hand.']],
    proof: { q: 'Subject requests now take hours, not weeks.', who: 'DPO · Retail', m: '−80%', ml: 'time to answer subject requests' }, cta: 'Show regulators who can reach personal data.' }),
  'nist-csf': ind({ kind: 'compliance', name: 'NIST CSF', chip: 'NIST CSF 2.0 · Protect', img: '/img/cr-rings.webp', blurb: 'Identity controls mapped to CSF 2.0',
    h1: 'NIST CSF, mapped to identity.', lead: 'We map the identity and access categories of NIST CSF 2.0 to controls on your platforms, then help you raise your tier.',
    reality: ['The framework says what to achieve.', 'Teams still need to know how.'], areas: ['Identity management', 'Access control', 'Monitoring'],
    map: [['PR.AA — identity management', 'Identities and credentials managed', 'IGA lifecycle from authoritative sources'], ['PR.AA — authentication', 'Users and devices authenticated', 'MFA, SSO and conditional access'], ['PR.AA — access', 'Least privilege enforced', 'Roles, reviews and just-in-time access'], ['DE.CM — monitoring', 'Identity events monitored', 'Identity signals in your SOC']],
    risks: [['Paper maturity', 'Policies that are written but not enforced.'], ['Gaps between teams', 'Identity, security and IT measuring different things.'], ['No baseline', 'Tiers claimed without evidence.']],
    proof: { q: 'We moved up a tier in a year.', who: 'CISO · Public sector', m: '+1', ml: 'CSF tier in 12 months' }, cta: 'Turn the framework into controls.' }),
  'pci-dss': ind({ kind: 'compliance', name: 'PCI DSS', chip: 'PCI DSS 4.0 · Requirements 7 & 8', img: '/img/cr-wrenches.webp', blurb: 'Access to cardholder data, controlled',
    h1: 'Cardholder data, behind the right doors.', lead: 'We implement the access and authentication controls in PCI DSS 4.0 requirements 7 and 8 — and keep the evidence ready for your QSA.',
    reality: ['PCI DSS 4.0 raised the bar on MFA.', 'Many environments have not caught up.'], areas: ['MFA everywhere', 'Least privilege', 'Account reviews'],
    map: [['Req. 7 — restrict access', 'Need-to-know access to cardholder data', 'Roles and reviews on the CDE'], ['Req. 8 — identify users', 'Unique IDs for every user', 'No shared or generic accounts'], ['Req. 8 — MFA', 'MFA for all CDE access', 'Phishing-resistant MFA'], ['Req. 8 — accounts', 'Inactive accounts removed', 'Automated leaver and dormancy rules']],
    risks: [['MFA gaps', 'Admins reaching the CDE without MFA.'], ['Generic accounts', 'Shared logins on payment systems.'], ['Dormant users', 'Accounts unused for months but still active.']],
    proof: { q: 'Our QSA found nothing to fix on access.', who: 'Head of payments · Retail', m: '100%', ml: 'CDE access behind MFA' }, cta: 'Get ready for your next PCI assessment.' }),
};
export const INDUSTRY_SHARED = {
  steps: [['Baseline', 'Weeks 1–2', 'Current controls and evidence reviewed.'], ['Control design', 'Weeks 3–5', 'Requirements mapped to identity controls.'], ['Automate', 'Weeks 6–12', 'Controls built into your platforms.'], ['Evidence', 'Ongoing', 'Evidence packs ready for every audit.']],
  creds: [['ISO/IEC 27001', 'Certified'], ['SOC 2 Type 2', 'Certified'], ['NIST', 'Aligned delivery']],
  faq: [['Can you make us compliant?', 'No one can promise compliance — only your auditor decides. We design and run the identity controls auditors look for, and keep the evidence ready.'], ['Do you work with our auditors?', 'Yes. We often join walkthroughs to explain how controls work.'], ['How long until we are audit-ready?', 'Most clients have controls and evidence in place within one audit cycle.'], ['Which platforms do you use?', 'The ones you already own where possible — SailPoint, Saviynt, Entra, Okta, CyberArk and others.']],
};

/* ------------------------------------------------------------------ */
/* AI identity security — W07                                           */
/* ------------------------------------------------------------------ */
export const AI_PAGE = {
  h1: 'Every AI agent is an identity.',
  lead: 'Copilots, custom agents and MCP servers act with real permissions. We find them, give each one an owner and govern their access like any other identity.',
  chips: ['Agent · 14 permissions', 'Owner · unknown', 'Token · never expires'],
  reality: ['AI agents already act inside your systems.', 'Most have no owner.'],
  risks: [['Agent · production database', 'Read and write access to customer records'], ['MCP server · admin scope', 'Tool access wider than any user'], ['API key · shared in code', 'Long-lived and copied across agents']],
  inventory: [
    ['invoice-reader-bot', 'Finance ops', 'ERP · read', 'low'],
    ['support-copilot', 'Unassigned', 'CRM · write', 'high'],
    ['deploy-agent', 'Platform team', 'Prod · admin', 'high'],
    ['research-assistant', 'R&D', 'SharePoint · read', 'medium'],
    ['hr-onboarding-agent', 'People team', 'HRIS · write', 'medium'],
    ['mcp-github-server', 'Unassigned', 'Repos · admin', 'high'],
    ['sales-email-drafter', 'Sales ops', 'Mail · send', 'medium'],
    ['report-summariser', 'Finance ops', 'BI · read', 'low'],
  ],
  lifecycle: [
    ['Discover', 'Find every agent', 'We scan identity providers, cloud platforms, SaaS admin consoles and code for agents and the credentials they use.', ['Copilots, custom agents, MCP servers', 'Service accounts they run as', 'Keys and tokens they hold']],
    ['Own', 'Give each agent an owner', 'Every agent is registered with an accountable human owner and a business purpose, recorded in your IGA platform.', ['Owner and purpose recorded', 'Orphaned agents flagged', 'Owner changes on leavers']],
    ['Govern', 'Scope what agents can do', 'Access is cut to the task: short-lived, scoped credentials replace standing keys and admin scopes.', ['Task-scoped access', 'Short-lived credentials', 'Privileged actions brokered']],
    ['Review', 'Put agents in every review', 'Agent access appears in certification campaigns next to people, ranked by risk.', ['Agents in certifications', 'Risk-ranked review items', 'Usage-based clean-up']],
    ['Retire', 'Retire agents cleanly', 'When the purpose ends, credentials are revoked and the agent is removed everywhere it ran.', ['Credentials revoked', 'Access removed everywhere', 'Audit trail kept']],
  ],
  fig: { h: 'Agents governed by the identity stack you already run.', rows: [['Agents', ['Copilots', 'Custom agents', 'MCP servers']], ['Identity', ['IGA', 'PAM', 'Access management']], ['Controls', ['Least privilege', 'Sessions', 'Audit']]] },
  caps: [['Discover every agent', 'Agents, MCP servers and their credentials found across clouds, SaaS and code — reconciled into one inventory.'], ['Assign accountable owners', 'An owner and a purpose for every agent, kept current when people move or leave.'], ['Just-in-time, task-scoped access', 'Credentials issued for the task and expired after it, with privileged actions brokered and recorded.'], ['Continuous review and retirement', 'Agent access reviewed with everyone else’s, and agents retired when the work is done.']],
  ledger: { h: 'What changes when agents are governed', rows: [['Agents created with no record', 'Every agent registered with an owner'], ['Static keys with admin scope', 'Short-lived credentials scoped to the task'], ['Nobody reviews agent access', 'Agent access in every certification']] },
  steps: [['Discover', 'Weeks 1–2', 'Agents and credentials found across your estate.'], ['Assess', 'Weeks 2–3', 'Risk ranked and owners proposed.'], ['Govern', 'Weeks 4–8', 'Ownership, scoping and reviews in your platforms.'], ['Run', 'Ongoing', 'New agents governed from day one.']],
  proof: { q: 'We found three times more agents than we thought we had.', who: 'CISO · Technology company', m: '3×', ml: 'agents found vs. the known inventory' },
  notes: [['12 Nov', 'Guide', 'AI agent governance in five steps'], ['30 Oct', 'Research', 'Where MCP servers hide privileged access'], ['14 Oct', 'Webinar', 'Owning the agents your teams already built']],
  faq: [['What counts as an AI agent identity?', 'Any AI system that authenticates to your applications or data: copilots with delegated access, custom agents, MCP servers and the service accounts and keys they run as.'], ['Can you find agents we do not know about?', 'Yes. We scan identity providers, cloud accounts, SaaS admin consoles and code repositories for agents and their credentials.'], ['Does this work with SailPoint or Saviynt?', 'Yes. We register agents and owners in the IGA platform you already run, so they join existing certifications.'], ['How long does an AI agent assessment take?', 'Two to three weeks for discovery and a risk-ranked inventory, with a plan for ownership and scoping.']],
};

/* ------------------------------------------------------------------ */
/* Stories & notes (real TechDemocracy case studies on the live site)   */
/* ------------------------------------------------------------------ */
export const STORIES = [
  ['Head of IAM · Trading company', 'Identity governance implementation for a trading company', '/img/cr-rings.webp', `${LIVE}/resources/identity-governance-implementation-for-trading-company-11`, ['iga', 'implementation']],
  ['Digital director · Healthcare', 'CIAM implementation for a healthcare organisation', '/img/cr-wrenches.webp', `${LIVE}/resources/ciam-implementation-for-healthcare-organization-10`, ['ciam', 'implementation']],
  ['IT director · Enterprise', 'From legacy identity technology to modern governance', '/img/cr-tunnel.webp', `${LIVE}/resources/legacy-identity-technology-to-modern-identity-governance-9`, ['iga', 'advisory']],
  ['CISO · Healthcare', 'Identity solution transformation of a healthcare firm', '/img/extra-rings.webp', `${LIVE}/resources/identity-solution-transformation-of-a-healthcare-firm-8`, ['am', 'advisory']],
  ['CIO · Financial services', 'Identity enhancement for a leading financial services firm', '/img/cr-tdc2.webp', `${LIVE}/resources/identity-solution-enhancement-for-leading-financial-service-firm-7`, ['pam', 'operations']],
];
export const RESOURCES = [
  ['Report', 'What IGA is — and why it matters now', '/img/note-guide.webp', `${LIVE}/resources/what-is-iga-and-why-is-it-important-162`],
  ['Guide', 'Managing machine and service accounts with PAM', '/img/note-case.webp', `${LIVE}/resources/Managing-Machine-and-service-accounts-with-PAM-175`],
  ['Guide', 'Automated access reviews for business security', '/img/note-news.webp', `${LIVE}/resources/automated-access-reviews-for-business-security-169`],
];

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */
const links = (base, pages, keys) => (keys || Object.keys(pages)).map((k) => ({ href: `${base}/${k}`, label: pages[k].name, desc: pages[k].blurb }));
export const MENU = [
  { label: 'Solutions', cols: [
    { h: 'Identity security', items: links('/solutions', SOLUTIONS_PAGES, ['identity-governance', 'privileged-access', 'access-management', 'customer-identity']) },
    { h: 'Emerging IAM', items: links('/solutions', SOLUTIONS_PAGES, ['non-human-identity', 'identity-threat-detection', 'zero-trust']) },
    { h: 'Security operations', items: links('/solutions', SOLUTIONS_PAGES, ['managed-soc']) },
  ], feature: { eyebrow: 'New', h: 'AI identity security', p: 'Find every AI agent, give it an owner, govern its access.', href: '/ai-identity-security', cta: 'Start an assessment', img: '/img/svc-ai-agents.webp' } },
  { label: 'Services', cols: [
    { h: 'Our services', items: links('/services', SERVICE_PAGES) },
    { h: 'Managed services', items: [{ href: '/services/managed-services', label: 'All managed services', desc: MANAGED_OVERVIEW.blurb }, ...links('/services/managed-services', MANAGED_PAGES)] },
  ], feature: { eyebrow: 'Workshop', h: 'Two hours. One clear plan.', p: 'Bring your identity estate. Leave with a prioritised roadmap.', href: '/services/advisory-consulting', cta: 'Book a workshop', img: '/img/svc-advisory.webp' } },
  { label: 'Partners', cols: [
    { h: 'Platforms', items: links('/partners', PARTNER_PAGES) },
    { h: 'Compare', items: links('/compare', COMPARE_PAGES) },
  ], feature: { eyebrow: 'SailPoint', h: 'IIQ to ISC migration', p: 'Move to Identity Security Cloud without losing governance history.', href: '/partners/sailpoint', cta: 'See the approach', img: '/img/cr-rings.webp' } },
  { label: 'Industries', cols: [
    { h: 'Industries', items: links('/industries', INDUSTRY_PAGES) },
    { h: 'Compliance', items: links('/compliance', COMPLIANCE_PAGES) },
  ], feature: { eyebrow: 'Compliance', h: 'From requirement to control', p: 'Regulation mapped to identity controls you can evidence.', href: '/compliance/sox', cta: 'See a control map', img: '/img/extra-tunnel.webp' } },
  { label: 'Company', cols: [
    { h: 'Company', items: [
      { href: `${LIVE}/company/about-us`, label: 'About us', desc: 'Who we are and how we work', ext: true },
      { href: `${LIVE}/company/leadership`, label: 'Leadership', desc: 'The team behind TechDemocracy', ext: true },
      { href: `${LIVE}/company/careers`, label: 'Careers', desc: 'Join our identity engineers', ext: true },
      { href: `${LIVE}/company/events`, label: 'Events', desc: 'Where to meet us next', ext: true },
    ] },
    { h: 'Resources', items: [
      { href: `${LIVE}/resources`, label: 'Field notes', desc: 'Guides, research and case studies', ext: true },
      { href: `${LIVE}/company/contact-us`, label: 'Contact', desc: 'Talk to the team', ext: true },
    ] },
  ], feature: { eyebrow: 'Certified', h: 'ISO/IEC 27001', p: 'Our own information-security management system is certified and audited every year.', href: '/#credentials', cta: 'View certificate', img: '/img/cr-tdc2.webp' } },
];
export const ALL_ROUTES = {
  solutions: SOLUTIONS_PAGES, services: SERVICE_PAGES, managed: MANAGED_PAGES, partners: PARTNER_PAGES,
  compare: COMPARE_PAGES, industries: INDUSTRY_PAGES, compliance: COMPLIANCE_PAGES,
};
