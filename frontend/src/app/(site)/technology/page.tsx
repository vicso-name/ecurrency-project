import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/utils/generate-metadata';
import { getTechnologyPage } from '@/lib/api/queries/technology-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';
import { TechnologyFeaturesSectionBlock } from '@/components/sections/technology/technology-features-section/technology-features-section';
import { SmartContractsSectionBlock } from '@/components/sections/technology/smart-contracts-section/smart-contracts-section';
import { ConsensusSectionBlock } from '@/components/sections/technology/consensus-section/consensus-section';
import { InfrastructureSectionBlock } from '@/components/sections/technology/infrastructure-section/infrastructure-section';
import { StartExploringSection } from '@/components/sections/home/start-exploring-section/start-exploring-section';
import { UsedForSection } from '@/components/sections/home/used-for-section/used-for-section';
import { ToolsSectionBlock } from '@/components/sections/developers/tools-section/tools-section';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTechnologyPage();
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: 'Technology — eCurrency',
    path: '/technology',
  });
}

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

      <div className="relative mt-0 md:mt-[130px] md:px-4">
        <div className="mx-auto max-w-[1422px]">
          <div className="pointer-events-none rrelative z-10 w-full overflow-hidden rounded-tl-[20px] rounded-tr-[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1422 158"
              fill="none"
              className="block h-auto w-full -mb-px"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0H355.5L441.5 124.558L711 128.97H980.5L1066.5 0H1422V158H0L0 0Z"
                className="fill-white dark:fill-[#1a1a1a]"
              />
              <path
                d="M0 0H355.5L441.5 124.558L711 128.97H980.5L1066.5 0H1422V158H0L0 0Z"
                fill="url(#paint0_radial_tech)"
                fillOpacity="0.24"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_tech"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(711 -277.549) rotate(90) scale(3686.2 1138.27)"
                >
                  <stop offset="0.6" stopOpacity="0" />
                  <stop offset="0.897964" stopColor="#FF5050" stopOpacity="0.22" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div
            className="overflow-hidden rounded-bl-[20px] rounded-br-[20px] dark:bg-[#1a1a1a]"
            style={{
              background: 'var(--payment-container-bg)',
            }}
          >
            <InfrastructureSectionBlock data={page?.infrastructure} />
            <StartExploringSection data={page?.architectureMatters} />
          </div>
        </div>
      </div>

     <div className="relative overflow-hidden">
        <div
          className="mx-auto max-w-[1440px] absolute inset-0 -z-20 hidden bg-no-repeat md:block"
          style={{
            backgroundImage: 'var(--tech-bottom-bg-image)',
            backgroundSize: '103% auto',
            backgroundPosition: 'center bottom',
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-[380px] bg-gradient-to-b from-[#f7f5f4] via-[#f7f5f4] via-45% to-transparent md:block dark:from-[#0d0d0d] dark:via-[#0d0d0d]" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-[140px] bg-gradient-to-t from-[#f7f5f4]/80 via-[#f7f5f4]/40 to-transparent md:block dark:from-[#0d0d0d]/80 dark:via-[#0d0d0d]/40" />

        <div className="relative z-20">
          <UsedForSection data={page?.useCases} />
          <ToolsSectionBlock data={page?.nextSteps} />
        </div>
      </div>
      
    </main>
  );
}