import { getTechnologyPage } from '@/lib/api/queries/technology-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';
import { TechnologyFeaturesSectionBlock } from '@/components/sections/technology/technology-features-section/technology-features-section';
import { SmartContractsSectionBlock } from '@/components/sections/technology/smart-contracts-section/smart-contracts-section';

export default async function TechnologyPage() {
  const page = await getTechnologyPage();

  return (
    <main>
      <PageHeroSection hero={page?.hero} />
      <TechnologyFeaturesSectionBlock data={page?.features} />
      <SmartContractsSectionBlock data={page?.TransactionModel} />
    </main>
  );
}