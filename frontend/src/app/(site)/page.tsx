import { BlockchainDesignedSection } from '@/components/sections/home/blockchain-designed-section/blockchain-designed-section';
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
    </main>
  );
}