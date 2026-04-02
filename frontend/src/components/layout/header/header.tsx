import { HeaderClient } from '@/components/layout/header/header-client';
import type { GlobalData } from '@/types/strapi/global';

type HeaderProps = {
  globalData: GlobalData | null;
};

export function Header({ globalData }: HeaderProps) {
  return <HeaderClient globalData={globalData} />;
}