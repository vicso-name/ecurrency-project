'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { EcrUseCasesSection } from '@/types/strapi/ecr-page';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type EcrUseCasesSectionProps = {
  data: EcrUseCasesSection | null | undefined;
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

function UseCaseCard({ text }: { text: string }) {
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

export function EcrUseCasesSection({ data }: EcrUseCasesSectionProps) {
  if (!data) return null;

  const cards = data.cards ?? [];
  const hasPrimary = data.primaryButtonLabel;
  const hasSecondary = data.secondaryButtonLabel;
  const hasButtons = hasPrimary || hasSecondary;

  return (
    <section className="px-4 py-[80px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mx-auto mb-[60px] max-w-[523px] text-center">
          {data.title && (
            <FadeUp delay={0} duration={1200} y={20}>
              <h2 className="[font-family:var(--font-manrope)] text-[48px] font-semibold leading-[116%] tracking-[-1px] text-black">
                {data.title}
              </h2>
            </FadeUp>
          )}

          {data.subtitle && (
            <FadeUp delay={120} duration={1200} y={14}>
              <p className="mt-6 [font-family:var(--font-manrope)] text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[rgba(32,32,32,0.56)]">
                {data.subtitle}
              </p>
            </FadeUp>
          )}
        </div>

        {/* Desktop */}
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
                    <UseCaseCard text={card.text} />
                  </div>
                </RevealCard>

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

        {/* Mobile */}
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
                  <UseCaseCard text={card.text} />
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

        {/* Buttons */}
        {hasButtons && (
          <FadeUp delay={400} duration={1200} y={14}>
            <div className="mt-[60px] flex flex-col items-center justify-center gap-4 md:flex-row">
              {hasPrimary && (
                <PrimaryButton
                  href={data.primaryButtonHref || '#'}
                  label={data.primaryButtonLabel!}
                />
              )}
              {hasSecondary && (
                <SecondaryButton
                  href={data.secondaryButtonHref || '#'}
                  label={data.secondaryButtonLabel!}
                />
              )}
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}