import { notFound } from 'next/navigation';
import { ManagedPage } from '../../../../components/templates';
import { MANAGED_PAGES } from '../../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(MANAGED_PAGES).map((slug) => ({ slug })); }
export async function generateMetadata({ params }) {
  const p = MANAGED_PAGES[(await params).slug];
  return p ? { title: `${p.name} — TechDemocracy`, description: p.lead } : {};
}
export default async function Page({ params }) {
  const p = MANAGED_PAGES[(await params).slug];
  if (!p) notFound();
  return <ManagedPage p={p} />;
}
