'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ConsensusSection } from '@/types/strapi/technology-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type ConsensusSectionProps = {
  data: ConsensusSection | null | undefined;
};

function CtaButton({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center justify-center gap-2 rounded-[100px] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[15px] font-normal capitalize leading-[36px] text-white transition-all duration-200"
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

export function ConsensusSectionBlock({ data }: ConsensusSectionProps) {
  if (!data) return null;

  const cards = data.cards ?? [];

  return (
    <section className="px-4 py-[80px] md:py-[120px]">
      <div className="mx-auto max-w-[1012px]">
        <RevealCard duration={1200} y={36} scale={0.985}>
          <div className="flex flex-col items-center rounded-[16px] border border-white bg-white px-6 py-[64px] md:px-10">
            {/* Title */}
            <FadeUp delay={0} duration={1200} y={20}>
              <h2 className="mx-auto max-w-[541px] text-center [font-family:var(--font-manrope)] text-[36px] font-semibold leading-[116%] tracking-[-1px] text-[#0D0000] md:text-[48px]">
                {data.title}
              </h2>
            </FadeUp>

            {/* Subtitle */}
            {data.subtitle && (
              <FadeUp delay={120} duration={1200} y={14}>
                <p className="mx-auto mt-6 max-w-[541px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal leading-[24px] text-[rgba(13,0,0,0.60)]">
                  {data.subtitle}
                </p>
              </FadeUp>
            )}

            {/* Row Title */}
            {data.rowTitle && (
              <FadeUp delay={220} duration={1100} y={14}>
                <p className="mt-[90px] mb-9 text-center [font-family:var(--font-geist-mono)] text-[16px] font-normal uppercase leading-[20px] text-[rgba(13,0,0,0.48)]">
                  {data.rowTitle}
                </p>
              </FadeUp>
            )}

            {/* Cards */}
            {cards.length > 0 && (
              <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, index) => {
                  const iconUrl = getStrapiMediaUrl(card.icon?.url);

                  return (
                    <RevealCard
                      key={card.id}
                      delay={300 + index * 120}
                      duration={1000}
                      y={28}
                      scale={0.985}
                    >
                      <div className="flex h-[192px] flex-col items-center justify-center rounded-[24px] border border-[rgba(160,160,160,0.54)] bg-white px-6 text-center">
                        {iconUrl && (
                          <Image
                            src={iconUrl}
                            alt={card.icon?.alternativeText || card.text}
                            width={36}
                            height={36}
                            unoptimized
                            className="mb-5 h-[36px] w-[36px]"
                          />
                        )}
                        <p className="max-w-[226px] text-[20px] font-medium leading-normal text-[#333]">
                          {card.text}
                        </p>
                      </div>
                    </RevealCard>
                  );
                })}
              </div>
            )}

            {/* CTA */}
            {data.ctaLabel && (
              <FadeUp delay={640} duration={1200} y={14}>
                <div className="mt-[50px]">
                  <CtaButton href={data.ctaHref || '#'} label={data.ctaLabel} />
                </div>
              </FadeUp>
            )}
          </div>
        </RevealCard>
      </div>
    </section>
  );
}