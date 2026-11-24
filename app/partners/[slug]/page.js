import { notFound } from 'next/navigation';
import { PartnerPage } from '../../../components/templates';
import { PARTNER_PAGES } from '../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(PARTNER_PAGES).map((slug) => ({ slug })); }
export async function generateMetadata({ params }) {
  const p = PARTNER_PAGES[(await params).slug];
  return p ? { title: `${p.name} partner — TechDemocracy`, description: p.lead } : {};
}
export default async function Page({ params }) {
  const p = PARTNER_PAGES[(await params).slug];
  if (!p) notFound();
  return <PartnerPage p={p} />;
}
