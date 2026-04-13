'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HomePageUsedFor } from '@/types/strapi/home-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type UsedForSectionProps = {
  data: HomePageUsedFor | null | undefined;
};

function EcrIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.0881 13.3208C20.7678 13.648 20.4368 13.7459 19.2861 13.7459C17.932 13.7459 17.8763 13.7373 17.8763 13.7373H14.1655C13.6337 14.501 12.7618 14.9996 11.7754 14.9996C10.1559 14.9996 8.84306 13.6569 8.84306 12C8.84306 10.3429 10.156 8.99978 11.7754 8.99978C12.7396 8.99978 13.5949 9.47593 14.1294 10.2107H17.8469C17.0785 7.53715 14.6588 5.57961 11.8002 5.57961C8.32552 5.57961 5.49887 8.47167 5.49887 12.0264C5.49887 15.5814 8.32552 18.4732 11.8002 18.4732C13.5652 18.4732 15.163 17.7269 16.3078 16.5265C16.3078 16.5265 17.6066 16.5171 18.8303 16.5171C18.8819 16.5171 19.2788 16.5171 19.3253 16.5171C20.0685 16.5171 20.1863 17.1271 19.9196 17.5087C19.89 17.5507 19.794 17.7034 19.7612 17.7513C19.2138 18.5542 18.9672 18.8292 18.2791 19.4586C16.5499 21.0387 14.27 22 11.7745 22C6.38461 22.0001 2 17.5143 2 12.0004C2 6.48633 6.38461 2 11.7745 2C17.1639 2 21.5489 6.48633 21.5489 12.0004C21.5489 12.4409 21.452 12.9493 21.0881 13.3208Z"
        fill="white"
      />
    </svg>
  );
}

function PrimaryButton({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex w-full items-center justify-center gap-1 rounded-[100px] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal capitalize leading-[36px] text-white transition-all duration-200 md:w-auto"
      style={{
        background: hovered
          ? 'linear-gradient(0deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.10) 100%), linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)'
          : 'linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)',
        boxShadow: '0 2px 2px 0 rgba(214, 214, 214, 0.74)',
      }}
    >
      {label}
      <EcrIcon />
    </Link>
  );
}

function SecondaryButton({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex w-full items-center justify-center gap-1 rounded-[100px] border border-[rgba(32,32,32,0.06)] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal capitalize leading-[36px] text-[#202020] transition-all duration-200 md:w-auto"
      style={{
        background: hovered ? 'rgba(32, 32, 32, 0.05)' : 'rgba(32, 32, 32, 0.02)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {label}
    </Link>
  );
}

export function UsedForSection({ data }: UsedForSectionProps) {
  if (!data) {
    return null;
  }

  const cards = data.cards ?? [];
  const hasButtons = data.showButtons && (data.primaryButtonLabel || data.secondaryButtonLabel);
  const isFourCards = cards.length === 4;

  return (
    <section className="px-4 pt-[80px] pb-[5px]">
      <div className="mx-auto max-w-[1200px]">
        {data.preTitle ? (
          <FadeUp delay={0} duration={1100} y={18}>
            <p className="mb-[40px] text-center [font-family:var(--font-roboto-mono)] text-[16px] leading-5 font-normal uppercase text-[rgba(13,0,0,0.48)] md:mb-[70px]">
              {data.preTitle}
            </p>
          </FadeUp>
        ) : null}

        {cards.length ? (
          <div className={`grid gap-6 md:grid-cols-2 ${isFourCards ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {cards.map((card, index) => (
              <RevealCard
                key={card.id}
                delay={100 + index * 120}
                duration={1000}
                y={28}
                scale={0.985}
              >
                <UsedForCard card={card} />
              </RevealCard>
            ))}
          </div>
        ) : null}

        {hasButtons && (
          <FadeUp delay={400} duration={1200} y={14}>
            <div className="mt-[50px] flex flex-col items-center justify-center gap-4 md:flex-row mb-[80px]">
              {data.primaryButtonLabel && (
                <PrimaryButton
                  href={data.primaryButtonHref || '#'}
                  label={data.primaryButtonLabel}
                />
              )}
              {data.secondaryButtonLabel && (
                <SecondaryButton
                  href={data.secondaryButtonHref || '#'}
                  label={data.secondaryButtonLabel}
                />
              )}
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

type UsedForCardProps = {
  card: NonNullable<HomePageUsedFor['cards']>[number];
};

function UsedForCard({ card }: UsedForCardProps) {
  const iconUrl = getStrapiMediaUrl(card.icon?.url);

  return (
    <div className="rounded-[17.473px] border border-[#DEDEDE] p-[10px] transition-transform duration-300 hover:-translate-y-[2px]">
      <div
        className="relative flex min-h-[292px] flex-col items-center rounded-[9px] border border-[rgba(122,122,122,0.10)] bg-white px-6 py-8 text-center"
        style={{
          backgroundImage: 'url(/images/home/use_for_block_bg.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: '100% auto',
        }}
      >
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt={card.icon?.alternativeText || card.title}
            width={110}
            height={110}
            unoptimized
            className="mb-6 h-[110px] w-[110px]"
          />
        ) : null}

        <p className="text-center text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(0,0,0,0.18)]">
          {card.orderNumber}
        </p>

        <h3 className="mt-2 max-w-[204px] text-center text-[20px] leading-[116%] font-semibold tracking-[-1.5px] text-black">
          {card.title}
        </h3>
      </div>
    </div>
  );
}