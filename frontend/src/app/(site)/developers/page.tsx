import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/utils/generate-metadata';
import { getDevelopersPage } from '@/lib/api/queries/developers-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';
import { OpportunitiesSectionBlock } from '@/components/sections/developers/opportunities-section/opportunities-section';
import { ToolsSectionBlock } from '@/components/sections/developers/tools-section/tools-section';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDevelopersPage();
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: 'Developers — eCurrency',
    path: '/developers',
  });
}

export default async function DevelopersPage() {
  const page = await getDevelopersPage();

  return (
    <main>
      <PageHeroSection hero={page?.hero} />
      <OpportunitiesSectionBlock data={page?.opportunities} />
      <ToolsSectionBlock data={page?.tools} />
    </main>
  );
}