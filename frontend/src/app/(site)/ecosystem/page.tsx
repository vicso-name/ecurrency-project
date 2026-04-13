import { getEcosystemPage } from '@/lib/api/queries/ecosystem-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';
import { UsedForSection } from '@/components/sections/home/used-for-section/used-for-section';
import { CommunitySectionBlock } from '@/components/sections/ecosystem/community-section/community-section';

export default async function EcosystemPage() {
  const page = await getEcosystemPage();

  return (
    <main>
      <PageHeroSection hero={page?.hero} />
      <UsedForSection data={page?.usedFor} />
      <CommunitySectionBlock data={page?.community} />
    </main>
  );
}