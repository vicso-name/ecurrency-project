import { BlockchainDesignedSection } from '@/components/sections/home/blockchain-designed-section/blockchain-designed-section';
import { BlockchainArchitectureSection } from '@/components/sections/home/blockchain-architecture-section/blockchain-architecture-section';
import { ProjectOverviewSection } from '@/components/sections/home/project-overview-section/project-overview-section';
import { StartExploringSection } from '@/components/sections/home/start-exploring-section/start-exploring-section';
import { EconomicLayerSection } from '@/components/sections/home/economic-layer-section/economic-layer-section';
import { PaymentSystemsSection } from '@/components/sections/home/payment-systems-section/payment-systems-section';
import { UsedForSection } from '@/components/sections/home/used-for-section/used-for-section';
import { BlockQuoteSection } from '@/components/sections/home/block-quote-section/block-quote-section';
import { HeroSection } from '@/components/sections/home/hero-section/hero-section';
import { getHomePage } from '@/lib/api/queries/home-page';
import { ToolsInfrastructureSection } from '@/components/sections/home/tools-and-infrastructure-section/tools-infrastructure-section';

export default async function HomePage() {
  const homePage = await getHomePage();

  return (
    <main>
      <HeroSection hero={homePage?.hero} />
      <BlockQuoteSection blockQuote={homePage?.blockQuote} />
      <BlockchainDesignedSection data={homePage?.blockchainDesigned} />
      <BlockchainArchitectureSection data={homePage?.blockchainArchitecture} />
      <UsedForSection data={homePage?.usedFor} />
      <EconomicLayerSection data={homePage?.economicLayer} />
      <ToolsInfrastructureSection data={homePage?.toolsInfrastructure} />
      <div className="pointer-events-none relative mt-0 md:px-4 md:-mt-[130px]">
        <div className="mx-auto max-w-[1422px]">
          <div className="relative z-10 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1422 158"
              fill="none"
              className="block h-auto w-full -mb-px"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0H355.5L441.5 124.558L711 128.97H980.5L1066.5 0H1422V158H0L0 0Z"
                fill="white"
              />
              <path
                d="M0 0H355.5L441.5 124.558L711 128.97H980.5L1066.5 0H1422V158H0L0 0Z"
                fill="url(#paint0_radial)"
                fillOpacity="0.24"
              />
              <defs>
                <radialGradient
                  id="paint0_radial"
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
            className="overflow-hidden rounded-bl-[20px] rounded-br-[20px] bg-white"
            style={{
              background:
                'radial-gradient(80.05% 137.14% at 50% -10.33%, rgba(0, 0, 0, 0) 60%, rgba(255, 80, 80, 0.05) 89.8%), #FFF',
            }}
          >
            <PaymentSystemsSection data={homePage?.paymentSystems} />
            <StartExploringSection data={homePage?.startExploring} />
            <ProjectOverviewSection data={homePage?.projectOverview} />
          </div>
        </div>
      </div>
    </main>
  );
}