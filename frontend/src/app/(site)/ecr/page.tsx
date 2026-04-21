import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/utils/generate-metadata';
import { getEcrPage } from '@/lib/api/queries/ecr-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';
import { BlockchainArchitectureSection } from '@/components/sections/home/blockchain-architecture-section/blockchain-architecture-section';
import { UsedForSection } from '@/components/sections/home/used-for-section/used-for-section';
import { EcrUseCasesSection } from '@/components/sections/ecr/ecr-use-cases-section/ecr-use-cases-section';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEcrPage();
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: 'ECR — eCurrency',
    path: '/ecr',
  });
}

export default async function EcrPage() {
  const page = await getEcrPage();

  return (
    <main>
      <PageHeroSection hero={page?.hero} />
      <BlockchainArchitectureSection data={page?.blockchainArchitecture} />
      <UsedForSection data={page?.usedFor} />
      <EcrUseCasesSection data={page?.useCases} />
    </main>
  );
}