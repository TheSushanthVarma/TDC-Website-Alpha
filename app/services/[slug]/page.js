import { notFound } from 'next/navigation';
import { ServicePage } from '../../../components/templates';
import { SERVICE_PAGES } from '../../../lib/site';

const METRICS = [['24+ yrs', 'in identity security'], ['1,600+', 'implementations'], ['200+', 'engagements'], ['ISO 27001', 'certified']];
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(SERVICE_PAGES).map((slug) => ({ slug })); }
export async function generateMetadata({ params }) {
  const p = SERVICE_PAGES[(await params).slug];
  return p ? { title: `${p.name} — TechDemocracy`, description: p.lead } : {};
}
export default async function Page({ params }) {
  const p = SERVICE_PAGES[(await params).slug];
  if (!p) notFound();
  return <ServicePage p={p} metrics={METRICS} />;
}
