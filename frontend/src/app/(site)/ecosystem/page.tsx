import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/utils/generate-metadata';
import { getEcosystemPage } from '@/lib/api/queries/ecosystem-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';
import { UsedForSection } from '@/components/sections/home/used-for-section/used-for-section';
import { CommunitySectionBlock } from '@/components/sections/ecosystem/community-section/community-section';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEcosystemPage();
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: 'Ecosystem — eCurrency',
    path: '/ecosystem',
  });
}

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