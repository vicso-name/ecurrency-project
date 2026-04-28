'use client';

import { useMemo, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HomePageStartExploring } from '@/types/strapi/home-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type StartExploringSectionProps = {
  data: HomePageStartExploring | null | undefined;
};

const CARD_ICON_CONFIG = [
  {
    src: '/images/home/start-exploring/icon-1.svg',
    width: 140,
    height: 140,
    className: 'h-[140px] w-[140px]',
  },
  {
    src: '/images/home/start-exploring/icon-2.svg',
    width: 140,
    height: 140,
    className: 'h-[140px] w-[140px]',
  },
  {
    src: '/images/home/start-exploring/icon-3.svg',
    width: 208,
    height: 145,
    className: 'h-[145px] w-[208px]',
  },
  {
    src: '/images/home/start-exploring/icon-4.svg',
    width: 140,
    height: 140,
    className: 'h-[140px] w-[140px]',
  },
];

const SWIPE_THRESHOLD = 50;

const BUTTON_GRADIENT =
  'radial-gradient(60.21% 66.41% at 47.91% -7.5%, rgba(240, 88, 88, 0.40) 0%, rgba(255, 255, 255, 0.05) 79.27%, rgba(255, 255, 255, 0) 100%)';
const BUTTON_GRADIENT_HOVER = `${BUTTON_GRADIENT}, rgba(236, 0, 0, 0.04)`;

function ExploreButton({
  href,
  label,
  openInNewTab,
}: {
  href: string;
  label: string;
  openInNewTab?: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex min-h-[50px] w-full items-center justify-center gap-1 rounded-[100px] border border-[#DE3737] px-[30px] pt-[6px] pb-[8px] text-center text-[16px] leading-9 font-normal capitalize text-[#EC0000] shadow-[0_0_7px_rgba(227,64,57,0.20)] transition-all duration-200 md:w-[236px]"
      style={{ background: hovered ? BUTTON_GRADIENT_HOVER : BUTTON_GRADIENT }}
    >
      {label}
    </Link>
  );
}

function PrevArrowIcon({ disabled }: { disabled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <g opacity={disabled ? 0.3 : 1}>
        <circle cx="9" cy="9" r="8.5" transform="rotate(-180 9 9)" stroke="#EC0000" />
        <path
          d="M6.30589 9.2766C7.53153 8.02725 8.77384 6.76124 10.0495 5.46192C10.283 5.70346 10.4997 5.92834 10.7082 6.14489C10.7582 6.19487 10.8082 6.25317 10.8749 6.28649C11.0167 6.36978 10.9833 6.45307 10.8833 6.54468C10.5414 6.87784 10.2079 7.21933 9.86608 7.55249C9.80771 7.6108 9.73267 7.66077 9.67431 7.71907C9.19072 8.20215 8.70714 8.68524 8.21522 9.16832C8.1902 9.19331 8.16519 9.22662 8.10683 9.28492C9.074 10.2261 10.0412 11.1589 11 12.0835C10.6498 12.4166 10.333 12.7165 10.0412 12.9997C8.81553 11.7836 7.55654 10.5176 6.30589 9.2766Z"
          fill="#EC0000"
        />
      </g>
    </svg>
  );
}

function NextArrowIcon({ disabled }: { disabled: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <g opacity={disabled ? 0.3 : 1}>
        <circle cx="9" cy="9" r="8.5" stroke="#EC0000" />
        <path
          d="M11.6941 8.72341C10.4685 9.97276 9.22616 11.2388 7.9505 12.5381C7.71704 12.2965 7.50026 12.0717 7.29182 11.8551C7.24179 11.8051 7.19177 11.7468 7.12507 11.7135C6.98332 11.6302 7.01668 11.5469 7.11673 11.4553C7.45857 11.1222 7.79208 10.7807 8.13392 10.4475C8.19229 10.3892 8.26733 10.3392 8.32569 10.2809C8.80928 9.79785 9.29286 9.31477 9.78478 8.83168C9.8098 8.8067 9.83481 8.77338 9.89317 8.71508C8.926 7.7739 7.95883 6.84105 7 5.91653C7.35018 5.58337 7.66701 5.28353 7.95883 5.00035C9.18447 6.21638 10.4435 7.48239 11.6941 8.72341Z"
          fill="#EC0000"
        />
      </g>
    </svg>
  );
}

function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      if (diff > 0) onSwipeLeft();
      else onSwipeRight();
    }
  }, [onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

function BottomContent({
  data,
  links,
  className = '',
}: {
  data: HomePageStartExploring;
  links: NonNullable<HomePageStartExploring['links']>;
  className?: string;
}) {
  const content = data.description || data.bottomText || '';

  if (!data.linksTitle && !content && links.length === 0) {
    return null;
  }

  return (
    <div className={className}>
     {data.linksTitle ? (
        <h3 className="mb-[24px] text-center [font-family:var(--font-manrope)] text-[22px] font-medium leading-[26px] tracking-[-0.6px] text-black md:text-[32px] md:leading-[36px] md:tracking-[-1.5px]">
          {data.linksTitle}
        </h3>
      ) : null}

      {content ? (
        <div className="flex items-center justify-center rounded-[24px] border border-[rgba(160,160,160,0.54)] bg-white px-6 py-8 text-center">
          <div className="max-w-[1024px] [font-family:var(--font-manrope)] text-[16px] font-normal leading-normal text-[rgba(51,51,51,0.72)] [&_p]:m-0 [&_strong]:font-semibold [&_b]:font-semibold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      ) : null}

      {links.length > 0 ? (
        <div className="mt-[40px] flex flex-col items-center gap-[18px] md:flex-row md:flex-wrap md:justify-center">
          {links.map((link) => (
            <ExploreButton
              key={link.id}
              href={link.href || '#'}
              label={link.label}
              openInNewTab={link.openInNewTab}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function StartExploringSection({ data }: StartExploringSectionProps) {
  const cards = useMemo(() => data?.cards ?? [], [data?.cards]);
  const links = data?.links ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  const lastIndex = cards.length - 1;
  const isPrevDisabled = activeIndex === 0;
  const isNextDisabled = activeIndex === lastIndex;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, lastIndex));
  }, [lastIndex]);

  const swipeHandlers = useSwipe(handleNext, handlePrev);

  if (!data || !cards.length) return null;

  return (
    <section className="px-4 py-[80px] md:py-[80px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-[40px] max-w-[462px] text-center md:mb-[60px]">
          <FadeUp delay={80} duration={1200} y={20}>
            <h2 className="text-[36px] leading-[40px] font-semibold tracking-[-1.5px] text-black md:text-[48px] md:leading-[116%] md:tracking-[-1px]">
              {data.title}
            </h2>
          </FadeUp>

          {data.subtitle && (
            <FadeUp delay={220} duration={1250} y={14}>
              <p className="mx-auto mt-4 max-w-[438px] text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(0,0,0,0.64)]">
                {data.subtitle}
              </p>
            </FadeUp>
          )}
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-4">
          {cards.map((card, index) => (
            <RevealCard
              key={card.id}
              delay={120 + index * 120}
              duration={1000}
              y={28}
              scale={0.985}
            >
              <DesktopCard card={card} index={index} />
            </RevealCard>
          ))}
        </div>

        {/* Desktop content under cards */}
        <div className="hidden lg:block">
          <FadeUp delay={600} duration={1200} y={14}>
            <BottomContent data={data} links={links} className="mt-10" />
          </FadeUp>
        </div>

        {/* Mobile slider */}
        <div className="lg:hidden">
          <div className="overflow-hidden" {...swipeHandlers}>
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div key={card.id} className="w-full shrink-0 px-[16px]">
                  <MobileCard card={card} index={index} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[26px] flex items-center justify-center gap-[30px]">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isPrevDisabled}
              aria-label="Previous slide"
              className="inline-flex h-[18px] w-[18px] items-center justify-center disabled:cursor-default"
            >
              <PrevArrowIcon disabled={isPrevDisabled} />
            </button>

            <div className="flex items-center gap-[11px]">
              {cards.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex}
                  className={`h-[6px] w-[6px] rounded-[20px] bg-[#A39D9D] transition-opacity duration-200 ${
                    index === activeIndex ? 'opacity-70' : 'opacity-[0.16]'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
              aria-label="Next slide"
              className="inline-flex h-[18px] w-[18px] items-center justify-center disabled:cursor-default"
            >
              <NextArrowIcon disabled={isNextDisabled} />
            </button>
          </div>

          {/* Mobile content under slider */}
          <FadeUp delay={300} duration={1000} y={14}>
            <BottomContent data={data} links={links} className="mt-[32px]" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  card: NonNullable<HomePageStartExploring['cards']>[number];
  index: number;
};

function CardBackground({
  backgroundUrl,
}: {
  backgroundUrl: string | undefined;
}) {
  return backgroundUrl
    ? {
        backgroundImage: `url(${backgroundUrl})`,
        backgroundRepeat: 'no-repeat' as const,
        backgroundPosition: 'center',
        backgroundSize: 'cover' as const,
      }
    : undefined;
}

function CardContent({ card, index }: CardProps) {
  const icon = CARD_ICON_CONFIG[index];

  return (
    <>
      <div>
        <h3 className="text-left text-[20px] font-medium text-[#333]">
          {card.title}
        </h3>
        {card.subtitle && (
          <p className="mt-1 text-left text-[16px] font-normal text-[rgba(51,51,51,0.40)]">
            {card.subtitle}
          </p>
        )}
      </div>

      <div className="mt-auto flex justify-center pb-15">
        {icon && (
          <Image
            src={icon.src}
            alt=""
            aria-hidden="true"
            width={icon.width}
            height={icon.height}
            className={icon.className}
          />
        )}
      </div>
    </>
  );
}

function DesktopCard({ card, index }: CardProps) {
  const backgroundUrl = getStrapiMediaUrl(card.backgroundImage?.url);

  return (
    <div
      className="flex h-[400px] flex-col rounded-[24px] border border-[rgba(160,160,160,0.54)] bg-white px-5 pt-6 transition-transform duration-300 hover:-translate-y-[2px]"
      style={CardBackground({ backgroundUrl })}
    >
      <CardContent card={card} index={index} />
    </div>
  );
}

function MobileCard({ card, index }: CardProps) {
  const backgroundUrl = getStrapiMediaUrl(card.backgroundImage?.url);

  return (
    <div
      className="mx-auto flex h-[400px] w-full max-w-[272px] flex-col rounded-[24px] border border-[rgba(160,160,160,0.54)] bg-white px-5 pt-6"
      style={CardBackground({ backgroundUrl })}
    >
      <CardContent card={card} index={index} />
    </div>
  );
}