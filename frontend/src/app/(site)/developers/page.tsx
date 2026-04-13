import { getDevelopersPage } from '@/lib/api/queries/developers-page';
import { PageHeroSection } from '@/components/sections/shared/page-hero-section/page-hero-section';

export default async function DevelopersPage() {
  const page = await getDevelopersPage();

  return (
    <main>
      <PageHeroSection hero={page?.hero} />
    </main>
  );
}