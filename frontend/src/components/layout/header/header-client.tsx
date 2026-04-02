'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { GlobalData, NavLink } from '@/types/strapi/global';

type HeaderClientProps = {
  globalData: GlobalData | null;
};

function ChevronDownIcon({ isOpen = false }: { isOpen?: boolean }) {
  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded-full border border-[rgba(227,64,57,0.14)] transition-transform duration-200 ${
        isOpen ? 'rotate-180' : ''
      }`}
    >
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

function BurgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M6 11H30" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 18H30" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 25H30" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M9 9L27 27" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 9L9 27" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <span className="text-[36px] leading-none text-[#E34039]">●</span>
      <span className="ml-3 text-[26px] leading-none font-semibold text-black">eCurrency</span>
    </Link>
  );
}

function HeaderCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href || '#'}
      className="flex min-h-[34px] shrink-0 items-center justify-center gap-[10px] rounded-[60px] border border-[rgba(227,64,57,0.07)] bg-[rgba(227,64,57,0.02)] px-[8px] py-[5px] text-[14px] font-normal leading-6 text-black backdrop-blur-[12px] transition-all duration-200 hover:-translate-y-[1px] hover:border-[rgba(227,64,57,0.18)] hover:bg-[rgba(227,64,57,0.06)] hover:text-[#E34039]"
    >
      <span>{label}</span>
      <HeaderArrowIcon />
    </Link>
  );
}

function DesktopDropdown({
  item,
  isOpen,
}: {
  item: NavLink;
  isOpen: boolean;
}) {
  const children = item.children ?? [];

    if (!isOpen || children.length === 0) {
        return null;
    }

    return (
        <div className="absolute top-full left-1/2 z-50 w-[220px] -translate-x-1/2 pt-4">
            <div className="rounded-[20px] border border-[rgba(227,64,57,0.08)] bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col">
                {children.map((child, index) => (
                <div key={child.id}>
                    <Link
                    href={child.href || '#'}
                    className="block px-3 py-3 text-[16px] font-medium leading-5 text-black transition-colors duration-200 hover:bg-[rgba(227,64,57,0.04)]"
                    >
                    {child.label}
                    </Link>

                    {index !== children.length - 1 ? (
                    <div className="h-px bg-[rgba(0,0,0,0.08)]" />
                    ) : null}
                </div>
                ))}
            </div>
            </div>
        </div>
    );
}

function DesktopNavigation({ navigation }: { navigation: NavLink[] }) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  return (
    <nav className="hidden items-center gap-[54px] lg:flex">
      {navigation.map((item) => {
        const hasChildren = item.hasChildren && item.children && item.children.length > 0;
        const isOpen = openDropdownId === item.id;

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => {
              if (hasChildren) {
                setOpenDropdownId(item.id);
              }
            }}
            onMouseLeave={() => {
              if (hasChildren) {
                setOpenDropdownId(null);
              }
            }}
          >
            {hasChildren ? (
              <button
                type="button"
                className="flex items-center gap-2 text-[15px] font-normal leading-[56px] text-black"
                aria-expanded={isOpen}
              >
                <span>{item.label}</span>
                <ChevronDownIcon isOpen={isOpen} />
              </button>
            ) : (
              <Link
                href={item.href || '#'}
                className="flex items-center gap-2 text-[15px] font-normal leading-[56px] text-black transition-colors duration-200 hover:text-[#E34039]"
              >
                <span>{item.label}</span>
              </Link>
            )}

            {hasChildren ? <DesktopDropdown item={item} isOpen={isOpen} /> : null}
          </div>
        );
      })}
    </nav>
  );
}

function MobileMenu({
  navigation,
  isOpen,
  onClose,
}: {
  navigation: NavLink[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleToggle = (itemId: number) => {
    setExpandedItemId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <div className="absolute top-[68px] left-4 right-4 z-50 rounded-[20px] bg-white px-6 pt-8 pb-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)] lg:hidden">
      <nav className="flex flex-col gap-5">
        {navigation.map((item, index) => {
          const isExpanded = expandedItemId === item.id;
          const hasChildren = item.hasChildren && item.children && item.children.length > 0;

          return (
            <div key={item.id}>
              <div className="flex items-center justify-between gap-4">
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    className="flex items-center gap-4 text-[20px] font-medium leading-6 tracking-[-1px] text-black"
                    aria-expanded={isExpanded}
                  >
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="text-[20px] font-medium leading-6 tracking-[-1px] text-black"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}

                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    className="flex items-center justify-center"
                    aria-expanded={isExpanded}
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <ChevronDownIcon isOpen={isExpanded} />
                  </button>
                ) : null}
              </div>

              {hasChildren && isExpanded ? (
                <div className="mt-6 flex flex-col gap-3">
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href || '#'}
                      className="text-[16px] font-medium leading-5 text-black/70"
                      onClick={onClose}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              {index !== navigation.length - 1 ? (
                <div className="mt-4 h-px bg-[rgba(0,0,0,0.08)]" />
              ) : null}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export function HeaderClient({ globalData }: HeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = globalData?.headerNavigation ?? [];
  const cta = globalData?.headerCta;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-[#F7F5F4]/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1360px] px-4 pt-[23px] pb-[23px]">
        <div className="flex items-center justify-between gap-4">
          <Logo />

          <DesktopNavigation navigation={navigation} />

          <div className="flex items-center gap-3">
            {cta ? <HeaderCta href={cta.href || '#'} label={cta.label} /> : null}

            <button
              type="button"
              className="flex items-center justify-center lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>
          </div>
        </div>

        <div className="mt-[23px] h-px w-full bg-[rgba(227,64,57,0.14)]" />

        <MobileMenu
          navigation={navigation}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}