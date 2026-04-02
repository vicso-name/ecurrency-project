import Link from 'next/link';
import type { GlobalData } from '@/types/strapi/global';

type HeaderProps = {
  globalData: GlobalData | null;
};

function ChevronDownIcon() {
  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[rgba(227,64,57,0.14)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M3.25 4.875L6.5 8.125L9.75 4.875"
          stroke="#E34039"
          strokeWidth="1.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function HeaderArrowIcon() {
  return (
    <span className="flex h-4 w-4 rotate-[-90deg] items-center justify-center rounded-full border border-[rgba(227,64,57,0.14)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
        <path
          d="M0.5625 7.0625L3.8125 3.8125L0.5625 0.5625"
          stroke="#E34039"
          strokeWidth="1.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Header({ globalData }: HeaderProps) {
  const navigation = globalData?.headerNavigation ?? [];
  const cta = globalData?.headerCta;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-[#F7F5F4]/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1360px] px-4 pt-[23px] pb-[23px]">
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="flex shrink-0 items-center">
            <span className="text-[36px] leading-none text-[#E34039]">●</span>
            <span className="ml-3 text-[26px] leading-none font-semibold text-black">
              eCurrency
            </span>
          </Link>

          <nav className="flex items-center gap-[54px]">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href || '#'}
                className="flex items-center gap-2 text-[15px] font-normal leading-[56px] text-black"
              >
                <span>{item.label}</span>
                {item.hasChildren ? <ChevronDownIcon /> : null}
              </Link>
            ))}
          </nav>

          {cta ? (
            <Link
              href={cta.href || '#'}
              className="flex h-[34px] w-[148px] shrink-0 items-center justify-center gap-[10px] rounded-[60px] border border-[rgba(227,64,57,0.07)] bg-[rgba(227,64,57,0.02)] text-[14px] font-normal leading-6 text-black backdrop-blur-[12px]"
            >
              <span>{cta.label}</span>
              <HeaderArrowIcon />
            </Link>
          ) : null}
        </div>

        <div className="mt-[23px] h-px w-full bg-[rgba(227,64,57,0.14)]" />
      </div>
    </header>
  );
}