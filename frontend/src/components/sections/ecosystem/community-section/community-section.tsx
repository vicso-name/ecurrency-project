'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CommunitySection } from '@/types/strapi/ecosystem-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type CommunitySectionProps = {
  data: CommunitySection | null | undefined;
};

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

export function CommunitySectionBlock({ data }: CommunitySectionProps) {
  if (!data) return null;

  const cards = data.cards ?? [];

  return (
    <section className="px-4 py-[80px] md:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Title */}
        <FadeUp delay={0} duration={1200} y={20}>
          <h2 className="mb-[50px] text-center [font-family:var(--font-manrope)] text-[36px] font-semibold leading-[116%] tracking-[-1px] text-black md:text-[48px]">
            {data.title}
          </h2>
        </FadeUp>

        {/* Cards */}
        {cards.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => {
              const iconUrl = getStrapiMediaUrl(card.icon?.url);

              return (
                <RevealCard
                  key={card.id}
                  delay={100 + index * 120}
                  duration={1000}
                  y={28}
                  scale={0.985}
                >
                  <div className="flex h-[144px] items-center justify-between rounded-[24px] border border-[rgba(160,160,160,0.54)] bg-white px-6 py-5">
                    <p className="max-w-[226px] text-[20px] font-medium leading-normal text-[#333]">
                      {card.text}
                    </p>
                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt={card.icon?.alternativeText || card.text}
                        width={48}
                        height={48}
                        unoptimized
                        className="h-[48px] w-[48px] shrink-0"
                      />
                    )}
                  </div>
                </RevealCard>
              );
            })}
          </div>
        )}

        {/* Buttons */}
        {(data.primaryButtonLabel || data.secondaryButtonLabel) && (
          <FadeUp delay={400} duration={1200} y={14}>
            <div className="mt-[50px] flex flex-col items-center justify-center gap-4 md:flex-row">
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