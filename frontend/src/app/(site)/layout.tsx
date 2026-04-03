import { Footer } from '@/components/layout/footer/footer';
import { Header } from '@/components/layout/header/header';
import { getGlobalData } from '@/lib/api/queries/global';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const globalData = await getGlobalData();

  return (
    <>
      <Header globalData={globalData} />
      <div className="pt-[110px]">{children}</div>
      <Footer globalData={globalData} />
    </>
  );
}