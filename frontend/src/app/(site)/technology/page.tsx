import { getTechnologyPage } from '@/lib/api/queries/technology-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';
import { TechnologyFeaturesSectionBlock } from '@/components/sections/technology/technology-features-section/technology-features-section';
import { SmartContractsSectionBlock } from '@/components/sections/technology/smart-contracts-section/smart-contracts-section';
import { ConsensusSectionBlock } from '@/components/sections/technology/consensus-section/consensus-section';
import { InfrastructureSectionBlock } from '@/components/sections/technology/infrastructure-section/infrastructure-section';
import { StartExploringSection } from '@/components/sections/home/start-exploring-section/start-exploring-section';
import { UsedForSection } from '@/components/sections/home/used-for-section/used-for-section';
import { ToolsSectionBlock } from '@/components/sections/developers/tools-section/tools-section';


export default async function TechnologyPage() {
  const page = await getTechnologyPage();

  return (
    <main>
      <PageHeroSection hero={page?.hero} />
      <TechnologyFeaturesSectionBlock data={page?.features} />
      <SmartContractsSectionBlock data={page?.TransactionModel} />
      <ConsensusSectionBlock data={page?.consensus} />
      <SmartContractsSectionBlock data={page?.clientSideSmartContracts} />
      <SmartContractsSectionBlock data={page?.postQuantumCryptography} />
      <InfrastructureSectionBlock data={page?.infrastructure} />
      <StartExploringSection data={page?.architectureMatters} />
      <UsedForSection data={page?.useCases} />
      <ToolsSectionBlock data={page?.nextSteps} />
    </main>
  );
}