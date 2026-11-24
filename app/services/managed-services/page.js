import { ManagedPage } from '../../../components/templates';
import { MANAGED_OVERVIEW } from '../../../lib/site';

export const metadata = { title: 'Managed services — TechDemocracy', description: MANAGED_OVERVIEW.lead };
export default function Page() { return <ManagedPage p={MANAGED_OVERVIEW} overview />; }
