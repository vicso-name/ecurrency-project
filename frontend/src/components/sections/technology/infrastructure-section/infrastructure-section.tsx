'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { InfrastructureSection } from '@/types/strapi/technology-page';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type InfrastructureSectionProps = {
  data: InfrastructureSection | null | undefined;
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

function InfrastructureCardBlock({ text }: { text: string }) {
  return (
    <div
      className="flex h-full min-h-[164px] items-center justify-center rounded-[16px] border border-[#E34039] px-[26px] py-5 text-center"
      style={{
        background: 'linear-gradient(273deg, #FFF 6.73%, #FFF 88.91%)',
        boxShadow: '0 7px 16.4px 0 rgba(238, 238, 238, 0.48)',
      }}
    >
      <p className="[font-family:var(--font-manrope)] text-[20px] font-normal leading-[24px] tracking-[-1px] text-[#EC0000]">
        {text}
      </p>
    </div>
  );
}

export function InfrastructureSectionBlock({ data }: InfrastructureSectionProps) {
  if (!data) return null;

  const cards = data.cards ?? [];

  return (
    <section className="px-4 py-[40px] md:py-[80px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mx-auto mb-[60px] max-w-[523px] text-center">
          <FadeUp delay={0} duration={1200} y={20}>
            <h2 className="[font-family:var(--font-manrope)] text-[36px] font-semibold leading-[116%] tracking-[-1px] text-black md:text-[48px]">
              {data.title}
            </h2>
          </FadeUp>

          {data.subtitle && (
            <FadeUp delay={120} duration={1200} y={14}>
              <p className="mt-6 [font-family:var(--font-manrope)] text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[rgba(32,32,32,0.56)]">
                {data.subtitle}
              </p>
            </FadeUp>
          )}
        </div>

        {/* Desktop: equal-width cards with absolute connectors */}
        {cards.length > 0 && (
          <div className="hidden items-stretch gap-9 lg:flex">
            {cards.map((card, index) => (
              <div key={card.id} className="relative flex flex-1 items-stretch">
                <RevealCard
                  delay={100 + index * 120}
                  duration={1000}
                  y={28}
                  scale={0.985}
                  className="flex w-full"
                >
                  <div className="w-full">
                    <InfrastructureCardBlock text={card.text} />
                  </div>
                </RevealCard>

                {/* Absolute connector - between this card and the next */}
                {index < cards.length - 1 && (
                  <div className="pointer-events-none absolute top-1/2 -right-[18px] z-10 h-[21px] w-[40px] -translate-y-1/2 translate-x-1/2">
                    <Image
                      src="/images/technology/infrastructure-connector-h.png"
                      alt=""
                      aria-hidden="true"
                      width={40}
                      height={21}
                      unoptimized
                      className="h-full w-full"
                      style={{ objectFit: 'fill' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mobile: vertical stack */}
        {cards.length > 0 && (
          <div className="flex flex-col items-center lg:hidden">
            {cards.map((card, index) => (
              <div key={card.id} className="flex w-full flex-col items-center">
                <RevealCard
                  delay={100 + index * 120}
                  duration={1000}
                  y={28}
                  scale={0.985}
                  className="w-full"
                >
                  <InfrastructureCardBlock text={card.text} />
                </RevealCard>
                {index < cards.length - 1 && (
                  <Image
                    src="/images/technology/infrastructure-connector-v.png"
                    alt=""
                    aria-hidden="true"
                    width={21}
                    height={32}
                    unoptimized
                    className="my-2 h-[32px] w-[21px]"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom text */}
        {data.bottomText && (
          <FadeUp delay={500} duration={1200} y={14}>
            <p className="mx-auto mt-[60px] mb-6 max-w-[609px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[rgba(32,32,32,0.56)]">
              {data.bottomText}
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