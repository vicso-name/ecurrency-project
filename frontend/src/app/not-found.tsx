import { Header } from '@/components/layout/header/header';
import { Footer } from '@/components/layout/footer/footer';
import { NotFoundSection } from '@/components/sections/error/not-found-section/not-found-section';
import { getGlobalData } from '@/lib/api/queries/global';

export default async function NotFound() {
  const globalData = await getGlobalData();

  return (
    <>
      <Header globalData={globalData} />
      <main>
        <NotFoundSection />
      </main>
      <Footer globalData={globalData} />
    </>
  );
}