'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { TechnologyFeaturesSection } from '@/types/strapi/technology-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type TechnologyFeaturesSectionProps = {
  data: TechnologyFeaturesSection | null | undefined;
};

function CtaButton({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex h-[53px] w-[230px] items-center justify-center rounded-[100px] text-center [font-family:var(--font-manrope)] text-[15px] font-normal capitalize leading-[36px] text-white transition-all duration-200"
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

export function TechnologyFeaturesSectionBlock({ data }: TechnologyFeaturesSectionProps) {
  if (!data) return null;

  const cards = data.cards ?? [];

  return (
    <section className="px-4 py-[40px] md:py-[70px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Title */}
        <FadeUp delay={0} duration={1200} y={20}>
          <h2 className="mx-auto mb-[50px] max-w-[746px] text-center [font-family:var(--font-manrope)] text-[36px] font-semibold leading-[116%] tracking-[-1px] text-black md:text-[48px]">
            {data.title}
          </h2>
        </FadeUp>

        {/* Cards */}
        {cards.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  <div className="flex h-full flex-col items-center gap-[54px] rounded-[24px] border border-[rgba(160,160,160,0.54)] bg-white px-[45px] pt-[54px] pb-[48px]">
                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt={card.icon?.alternativeText || card.title}
                        width={140}
                        height={140}
                        unoptimized
                        className="h-[140px] w-[140px]"
                      />
                    )}
                    <p className="max-w-[185px] text-center text-[20px] font-semibold leading-normal text-[#333]">
                      {card.title}
                    </p>
                  </div>
                </RevealCard>
              );
            })}
          </div>
        )}

        {/* Description */}
        {data.description && (
          <FadeUp delay={500} duration={1200} y={14}>
            <p className="mx-auto mt-[50px] mb-[25px] max-w-[609px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[rgba(32,32,32,0.56)]">
              {data.description}
            </p>
          </FadeUp>
        )}

        {/* CTA */}
        {data.ctaLabel && (
          <FadeUp delay={600} duration={1200} y={14}>
            <div className="flex justify-center">
              <CtaButton href={data.ctaHref || '#'} label={data.ctaLabel} />
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}