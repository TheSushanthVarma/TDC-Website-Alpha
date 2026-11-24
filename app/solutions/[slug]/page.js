import { notFound } from 'next/navigation';
import { SolutionPage } from '../../../components/templates';
import { SOLUTIONS_PAGES } from '../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(SOLUTIONS_PAGES).map((slug) => ({ slug })); }
export async function generateMetadata({ params }) {
  const p = SOLUTIONS_PAGES[(await params).slug];
  return p ? { title: `${p.name} — TechDemocracy`, description: p.lead } : {};
}
export default async function Page({ params }) {
  const { slug } = await params;
  const p = SOLUTIONS_PAGES[slug];
  if (!p) notFound();
  return <SolutionPage slug={slug} p={p} />;
}
