import { Footer } from '@/components/layout/footer/footer';
import { Header } from '@/components/layout/header/header';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}