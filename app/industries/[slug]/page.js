import { notFound } from 'next/navigation';
import { IndustryPage } from '../../../components/templates';
import { INDUSTRY_PAGES } from '../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(INDUSTRY_PAGES).map((slug) => ({ slug })); }
export async function generateMetadata({ params }) {
  const p = INDUSTRY_PAGES[(await params).slug];
  return p ? { title: `${p.name} — TechDemocracy`, description: p.lead } : {};
}
export default async function Page({ params }) {
  const p = INDUSTRY_PAGES[(await params).slug];
  if (!p) notFound();
  return <IndustryPage p={p} />;
}
