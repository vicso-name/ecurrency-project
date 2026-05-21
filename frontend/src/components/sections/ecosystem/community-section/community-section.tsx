'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CommunitySection } from '@/types/strapi/ecosystem-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type CommunitySectionProps = {
  data: CommunitySection | null | undefined;
};

function PrimaryButton({ href, label, openInNewTab }: { href: string; label: string; openInNewTab?: boolean | null }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className="inline-flex w-full items-center justify-center gap-1 rounded-[100px] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal capitalize leading-[36px] text-white transition-all duration-200 md:w-auto"
      style={{
        background: hovered
          ? 'linear-gradient(0deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.10) 100%), linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)'
          : 'linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)',
      }}
    >
      {label}
    </Link>
  );
}

function SecondaryButton({ href, label, openInNewTab }: { href: string; label: string; openInNewTab?: boolean | null }) {
  return (
    <Link
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className="inline-flex w-full items-center justify-center gap-1 rounded-[100px] border border-[rgba(32,32,32,0.06)] bg-[rgba(32,32,32,0.02)] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal capitalize leading-[36px] text-[#202020] backdrop-blur-[12px] transition-all duration-200 hover:bg-[rgba(32,32,32,0.05)] md:w-auto dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(255,255,255,0.04)] dark:text-[rgba(255,255,255,0.75)] dark:hover:bg-[rgba(255,255,255,0.08)]"
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
          <h2 className="mb-[50px] text-center [font-family:var(--font-manrope)] text-[36px] font-semibold leading-[116%] tracking-[-1px] text-black md:text-[48px] dark:text-white">
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
                  <div className="flex h-full min-h-[260px] flex-col items-center rounded-[24px] border border-[rgba(160,160,160,0.54)] bg-white px-6 py-8 text-center dark:border-[rgba(255,255,255,0.10)] dark:bg-[#191919]">
                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt={card.icon?.alternativeText || card.title || card.text}
                        width={48}
                        height={48}
                        unoptimized
                        className="mb-6 h-[48px] w-[48px] shrink-0"
                      />
                    )}

                    {card.title ? (
                      <h3 className="text-center [font-family:var(--font-manrope)] text-[18px] font-semibold leading-[150%] tracking-[-0.4px] text-black dark:text-[rgba(255,255,255,0.85)]">
                        {card.title}
                      </h3>
                    ) : null}

                    <div className="mt-3 text-center text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(0,0,0,0.56)] [&_p]:m-0 [&_strong]:font-semibold [&_b]:font-semibold dark:text-[rgba(255,255,255,0.50)]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {card.text}
                      </ReactMarkdown>
                    </div>
                    
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
                  openInNewTab={data.primaryButtonOpenInNewTab}
                />
              )}
              {data.secondaryButtonLabel && (
                <SecondaryButton
                  href={data.secondaryButtonHref || '#'}
                  label={data.secondaryButtonLabel}
                  openInNewTab={data.secondaryButtonOpenInNewTab}
                />
              )}
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}