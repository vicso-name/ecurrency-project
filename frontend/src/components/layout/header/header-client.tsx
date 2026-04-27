'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import type { GlobalData, HeaderSocialLink, NavLink } from '@/types/strapi/global';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';

type HeaderClientProps = {
  globalData: GlobalData | null;
};

function normalizePath(path?: string) {
  if (!path) return '/';

  // если вдруг придёт полный URL, пытаемся взять только pathname
  try {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const url = new URL(path);
      path = url.pathname;
    }
  } catch {
    // ignore
  }

  const cleanPath = path.split('?')[0].split('#')[0];

  if (cleanPath === '/') return '/';

  return cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
}

function isPathActive(pathname: string, href?: string) {
  if (!href) return false;

  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === '/') {
    return current === '/';
  }

  return current === target || current.startsWith(`${target}/`);
}

function isNavItemActive(pathname: string, item: NavLink) {
  if (isPathActive(pathname, item.href)) {
    return true;
  }

  const children = item.children ?? [];
  return children.some((child) => isPathActive(pathname, child.href));
}

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
    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[rgba(227,64,57,0.14)]">
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

function Logo({ globalData }: { globalData: GlobalData | null }) {
  const logo = globalData?.headerLogo;
  const logoUrl = getStrapiMediaUrl(logo?.url);
  const siteName = globalData?.siteName || 'eCurrency';

  return (
    <Link href="/" className="flex shrink-0 items-center">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={logo?.alternativeText || siteName}
          width={133}
          height={26}
          className="h-auto w-auto max-w-[133px]"
        />
      ) : (
        <>
          <span className="text-[36px] leading-none text-[#E34039]">●</span>
          <span className="ml-3 text-[26px] leading-none font-semibold text-black">{siteName}</span>
        </>
      )}
    </Link>
  );
}

function SocialLinks({
  links,
  className = '',
}: {
  links: HeaderSocialLink[];
  className?: string;
}) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-[19px] ${className}`.trim()}>
      {links.map((item) => {
        const iconUrl = getStrapiMediaUrl(item.icon?.url);
        const label = item.label || 'Social link';

        if (!iconUrl) {
          return null;
        }

        return (
          <Link
            key={item.id}
            href={item.href || '#'}
            target={item.targetBlank ? '_blank' : undefined}
            rel={item.targetBlank ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className="flex h-[18px] w-[18px] items-center justify-center transition-opacity duration-200 hover:opacity-70"
          >
            <Image
              src={iconUrl}
              alt={item.icon?.alternativeText || label}
              width={18}
              height={18}
              className="h-[18px] w-[18px] object-contain"
            />
          </Link>
        );
      })}
    </div>
  );
}

function HeaderCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
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
  pathname,
}: {
  item: NavLink;
  isOpen: boolean;
  pathname: string;
}) {
  const children = item.children ?? [];

  if (!isOpen || children.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-1/2 z-50 w-[220px] -translate-x-1/2 pt-4">
      <div className="rounded-[20px] border border-[rgba(227,64,57,0.08)] bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col">
          {children.map((child, index) => {
            const isChildActive = isPathActive(pathname, child.href);

            return (
              <div key={child.id}>
                <Link
                  href={child.href || '#'}
                  className={`block px-3 py-3 text-[16px] font-medium leading-5 transition-colors duration-200 hover:bg-[rgba(227,64,57,0.04)] ${
                    isChildActive ? 'text-[#E34039] bg-[rgba(227,64,57,0.04)]' : 'text-black'
                  }`}
                >
                  {child.label}
                </Link>

                {index !== children.length - 1 ? (
                  <div className="h-px bg-[rgba(0,0,0,0.08)]" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DesktopNavigation({
  navigation,
  pathname,
}: {
  navigation: NavLink[];
  pathname: string;
}) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  return (
    <nav className="hidden items-center gap-[54px] lg:flex">
      {navigation.map((item) => {
        const hasChildren = item.hasChildren && item.children && item.children.length > 0;
        const isOpen = openDropdownId === item.id;
        const isActive = hasChildren ? isPathActive(pathname, item.href) : isNavItemActive(pathname, item);

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => {
              if (hasChildren) setOpenDropdownId(item.id);
            }}
            onMouseLeave={() => {
              if (hasChildren) setOpenDropdownId(null);
            }}
          >
            {hasChildren ? (
              <button
                type="button"
                className={`flex items-center gap-2 text-[15px] font-normal leading-[56px] transition-colors duration-200 ${
                  isActive ? 'text-[#E34039]' : 'text-black hover:text-[#E34039]'
                }`}
                aria-expanded={isOpen}
              >
                <span>{item.label}</span>
                <ChevronDownIcon isOpen={isOpen} />
              </button>
            ) : (
              <Link
                href={item.href || '#'}
                className={`flex items-center gap-2 text-[15px] font-normal leading-[56px] transition-colors duration-200 ${
                  isActive ? 'text-[#E34039]' : 'text-black hover:text-[#E34039]'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            )}

            {hasChildren ? <DesktopDropdown item={item} isOpen={isOpen} pathname={pathname} /> : null}
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
  socialLinks,
  pathname,
}: {
  navigation: NavLink[];
  isOpen: boolean;
  onClose: () => void;
  socialLinks: HeaderSocialLink[];
  pathname: string;
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
          const isActive = hasChildren ? isPathActive(pathname, item.href) : isNavItemActive(pathname, item);

          return (
            <div key={item.id}>
              <div className="flex items-center justify-between gap-4">
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    className={`flex items-center gap-4 text-[20px] font-medium leading-6 tracking-[-1px] ${
                      isActive ? 'text-[#E34039]' : 'text-black'
                    }`}
                    aria-expanded={isExpanded}
                  >
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={`text-[20px] font-medium leading-6 tracking-[-1px] ${
                      isActive ? 'text-[#E34039]' : 'text-black'
                    }`}
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
                  {item.children?.map((child) => {
                    const isChildActive = isPathActive(pathname, child.href);

                    return (
                      <Link
                        key={child.id}
                        href={child.href || '#'}
                        className={`text-[16px] font-medium leading-5 ${
                          isChildActive ? 'text-[#E34039]' : 'text-black/70'
                        }`}
                        onClick={onClose}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}

              {index !== navigation.length - 1 ? (
                <div className="mt-4 h-px bg-[rgba(0,0,0,0.08)]" />
              ) : null}
            </div>
          );
        })}
      </nav>

      {socialLinks.length > 0 ? (
        <div className="mt-8 border-t border-[rgba(0,0,0,0.08)] pt-6">
          <SocialLinks links={socialLinks} />
        </div>
      ) : null}
    </div>
  );
}

export function HeaderClient({ globalData }: HeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = globalData?.headerNavigation ?? [];
  const cta = globalData?.headerCta;
  const socialLinks = globalData?.socialLinks ?? [];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 backdrop-blur-md">
      <div className="mx-auto max-w-[1360px] px-4 pt-[10px]">
        <div className="flex items-center justify-between gap-4">
          <Logo globalData={globalData} />

          <DesktopNavigation navigation={navigation} pathname={pathname} />

          <div className="flex items-center gap-5">
            <SocialLinks links={socialLinks} className="hidden lg:flex" />
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

        <div className="mt-[8px] h-px w-full bg-[rgba(227,64,57,0.14)]" />

        <MobileMenu
          navigation={navigation}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          socialLinks={socialLinks}
          pathname={pathname}
        />
      </div>
    </header>
  );
}