import { getDevelopersPage } from '@/lib/api/queries/developers-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';
import { OpportunitiesSectionBlock } from '@/components/sections/developers/opportunities-section/opportunities-section';
import { ToolsSectionBlock } from '@/components/sections/developers/tools-section/tools-section';

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