import { BlockchainDesignedSection } from '@/components/sections/home/blockchain-designed-section/blockchain-designed-section';
import { BlockchainArchitectureSection } from '@/components/sections/home/blockchain-architecture-section/blockchain-architecture-section';
import { UsedForSection } from '@/components/sections/home/used-for-section/used-for-section';
import { BlockQuoteSection } from '@/components/sections/home/block-quote-section/block-quote-section';
import { HeroSection } from '@/components/sections/home/hero-section/hero-section';
import { getHomePage } from '@/lib/api/queries/home-page';

export default async function HomePage() {
  const homePage = await getHomePage();

  return (
    <main>
      <HeroSection hero={homePage?.hero} />
      <BlockQuoteSection blockQuote={homePage?.blockQuote} />
      <BlockchainDesignedSection data={homePage?.blockchainDesigned} />
      <BlockchainArchitectureSection data={homePage?.blockchainArchitecture} />
      <UsedForSection data={homePage?.usedFor} />
    </main>
  );
}