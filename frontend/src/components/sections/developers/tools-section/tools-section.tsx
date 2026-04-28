'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ToolsSection, ToolCard } from '@/types/strapi/developers-page';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type ToolsSectionProps = {
  data: ToolsSection | null | undefined;
};

function CardButton({
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
      className="flex h-[53px] w-full items-center justify-center rounded-[60px] border border-[rgba(32,32,32,0.07)] text-center [font-family:var(--font-manrope)] text-[15px] font-normal capitalize leading-[36px] text-[#202020] transition-all duration-200"
      style={{
        background: hovered ? 'rgba(32, 32, 32, 0.05)' : 'rgba(32, 32, 32, 0.02)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {label}
    </Link>
  );
}

function CtaButton({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center justify-center gap-1 rounded-[100px] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal capitalize leading-[36px] text-white transition-all duration-200"
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

function ToolCardBlock({ card }: { card: ToolCard }) {
  return (
    <div className="relative flex h-full flex-col items-center gap-6 rounded-[24px] border border-[rgba(160,160,160,0.54)] bg-white px-6 py-8">
      {/* Top dash */}
      {card.showTopDash && (
        <span
          aria-hidden="true"
          className="absolute top-[-1px] left-[110px] h-[2px] w-[50px] bg-[#EC0000]"
        />
      )}

      {/* Bottom dash */}
      {card.showBottomDash && (
        <span
          aria-hidden="true"
          className="absolute bottom-[-1px] left-[110px] h-[2px] w-[50px] bg-[#EC0000]"
        />
      )}

      {/* Title */}
      <p className="text-center text-[20px] font-medium leading-normal text-[#333]">
        {card.title}
      </p>

      {/* Button - pinned to bottom */}
      <div className="mt-auto w-full">
        <CardButton
          href={card.buttonHref || '#'}
          label={card.buttonLabel}
          openInNewTab={card.buttonOpenInNewTab}
        />
      </div>
    </div>
  );
}

export function ToolsSectionBlock({ data }: ToolsSectionProps) {
  if (!data) return null;

  const cards = data.cards ?? [];

  return (
    <section className="px-4 py-[40px] md:py-[80px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Title */}
        <FadeUp delay={0} duration={1200} y={20}>
          <h2 className="mx-auto mb-[40px] max-w-[488px] text-center [font-family:var(--font-manrope)] text-[36px] font-semibold leading-[116%] tracking-[-1px] text-black md:text-[48px]">
            {data.title}
          </h2>
        </FadeUp>

        {/* Cards */}
        {cards.length > 0 && (
          <div className={`grid gap-6 md:grid-cols-2 ${cards.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>

            {cards.map((card, index) => (
              <RevealCard
                key={card.id}
                delay={100 + index * 120}
                duration={1000}
                y={28}
                scale={0.985}
              >
                <ToolCardBlock card={card} />
              </RevealCard>
            ))}
          </div>
        )}

        {/* CTA */}
        {data.ctaLabel && (
          <FadeUp delay={460} duration={1200} y={14}>
            <div className="mt-[50px] flex justify-center">
              <CtaButton href={data.ctaHref || '#'} label={data.ctaLabel} />
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}