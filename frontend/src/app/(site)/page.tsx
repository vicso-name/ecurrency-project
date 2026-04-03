import { HeroSection } from '@/components/sections/home/hero-section/hero-section';
import { getHomePage } from '@/lib/api/queries/home-page';

export default async function HomePage() {
  const homePage = await getHomePage();

  return (
    <main>
      <HeroSection hero={homePage?.hero} />
    </main>
  );
}