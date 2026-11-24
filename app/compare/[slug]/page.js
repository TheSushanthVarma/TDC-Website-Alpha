import { notFound } from 'next/navigation';
import { ComparePage } from '../../../components/templates';
import { COMPARE_PAGES } from '../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(COMPARE_PAGES).map((slug) => ({ slug })); }
export async function generateMetadata({ params }) {
  const p = COMPARE_PAGES[(await params).slug];
  return p ? { title: `${p.name} — TechDemocracy`, description: p.lead } : {};
}
export default async function Page({ params }) {
  const p = COMPARE_PAGES[(await params).slug];
  if (!p) notFound();
  return <ComparePage p={p} />;
}
