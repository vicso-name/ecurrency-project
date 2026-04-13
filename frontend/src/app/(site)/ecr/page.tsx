import { getEcrPage } from '@/lib/api/queries/ecr-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';
import { UsedForSection } from '@/components/sections/home/used-for-section/used-for-section';

export default async function EcrPage() {
  const page = await getEcrPage();

  return (
    <main>
      <PageHeroSection hero={page?.hero} />
      <UsedForSection data={page?.usedFor} />
    </main>
  );
}