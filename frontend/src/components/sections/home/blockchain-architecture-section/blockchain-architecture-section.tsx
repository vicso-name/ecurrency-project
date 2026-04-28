'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HomePageBlockchainArchitecture } from '@/types/strapi/home-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

const BUTTON_GRADIENT =
  'radial-gradient(60.21% 66.41% at 47.91% -7.5%, rgba(240, 88, 88, 0.40) 0%, rgba(255, 255, 255, 0.05) 79.27%, rgba(255, 255, 255, 0) 100%)';
const BUTTON_GRADIENT_HOVER = `${BUTTON_GRADIENT}, rgba(236, 0, 0, 0.04)`;

type BlockchainArchitectureSectionProps = {
  data: HomePageBlockchainArchitecture | null | undefined;
};

const GRID_ROWS = [
  { cols: 'lg:grid-cols-[569px_395px]', indices: [0, 1] },
  { cols: 'lg:grid-cols-[395px_569px]', indices: [2, 3] },
];

export function BlockchainArchitectureSection({
  data,
}: BlockchainArchitectureSectionProps) {
  if (!data) {
    return null;
  }

  return (
    <section className="px-4 py-[80px] md:py-20">
      <div className="mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-[540px] text-center">
          {data.preTitle ? (
            <FadeUp delay={0} duration={1100} y={18}>
              <p className="mb-[30px] text-[16px] leading-5 font-normal uppercase text-[rgba(13,0,0,0.48)] [font-family:var(--font-roboto-mono)]">
                {data.preTitle}
              </p>
            </FadeUp>
          ) : null}

          {data.title ? (
            <FadeUp delay={120} duration={1200} y={22}>
              <h2 className="mx-auto text-center text-[36px] leading-[40px] font-semibold tracking-[-1.5px] text-[#0D0000] md:text-[48px] md:leading-[116%] md:tracking-[-1px]">
                {data.title}
              </h2>
            </FadeUp>
          ) : null}

          {data.subTitle ? (
            <FadeUp delay={260} duration={1250} y={16}>
              <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(79,79,79,0.64)]">
                {data.subTitle}
              </p>
            </FadeUp>
          ) : null}
        </div>

        {data.cards?.length ? (
          <div className="mt-[30px] grid gap-6 md:mt-[60px]">
            {GRID_ROWS.map((row, rowIndex) => (
              <div
                key={row.indices.join('-')}
                className={`grid gap-6 ${row.cols} lg:justify-center`}
              >
                {row.indices.map((index, colIndex) => {
                  const card = data.cards?.[index];

                  if (!card) {
                    return null;
                  }

                  const delay = 120 + rowIndex * 180 + colIndex * 120;

                  return (
                    <RevealCard
                      key={card.id ?? index}
                      delay={delay}
                      duration={1000}
                      y={30}
                      scale={0.985}
                    >
                      <ArchitectureCard card={card} />
                    </RevealCard>
                  );
                })}
              </div>
            ))}
          </div>
        ) : null}

        {data.bottomCtaLabel ? (
          <FadeUp delay={220} duration={1200} y={20}>
            <div className="mt-[60px] flex justify-center">
              <CtaButton
                href={data.bottomCtaHref || '#'}
                label={data.bottomCtaLabel}
                openInNewTab={data.bottomCtaOpenInNewTab}
              />
            </div>
          </FadeUp>
        ) : null}
      </div>
    </section>
  );
}

type ArchitectureCardProps = {
  card: NonNullable<HomePageBlockchainArchitecture['cards']>[number];
};

function ArchitectureCard({ card }: ArchitectureCardProps) {
  const isLarge = card.sizeVariant === 'large';
  const iconUrl = getStrapiMediaUrl(card.icon?.url);

  return (
    <div
      className={`relative flex h-[354px] w-full justify-center rounded-[17.473px] border border-[#ECECEC] p-[11px] transition-transform duration-300 hover:-translate-y-[2px] ${
        isLarge ? 'lg:max-w-[569px]' : 'lg:max-w-[395px]'
      }`}
    >
      <div
        className="relative flex w-full flex-col items-center justify-start rounded-[14px] px-6 pt-6 text-center"
        style={{
          backgroundImage: 'url(/images/home/block_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <IconBlock
          iconUrl={iconUrl}
          alt={card.icon?.alternativeText || card.title || ''}
        />

        <div
          className={`flex flex-col items-center ${
            isLarge ? 'max-w-[338px]' : 'max-w-[320px]'
          }`}
        >
          <h3 className="text-center text-[18px] leading-[150%] font-semibold tracking-[-0.4px] text-black">
            {card.title}
          </h3>

          <p className="mt-2 text-center text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(0,0,0,0.56)]">
            {card.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function IconBlock({
  iconUrl,
  alt,
}: {
  iconUrl: string | undefined;
  alt: string;
}) {
  return (
    <div className="relative mb-10 flex h-[153px] w-full max-w-[290px] items-center justify-center overflow-hidden rounded-[8.737px] border border-[rgba(236,236,236,0.37)] bg-[linear-gradient(273deg,#FFF_6.73%,#FAFAFA_88.91%)] shadow-[0_13.105px_17.91px_0_rgba(255,255,255,0.12)]">
      <Image
        src="/images/home/top_comb.svg"
        alt=""
        aria-hidden="true"
        width={102}
        height={12}
        className="pointer-events-none absolute top-0 left-1/2 h-auto w-[102px] -translate-x-1/2"
      />

      <Image
        src="/images/home/bottom_comb.svg"
        alt=""
        aria-hidden="true"
        width={126}
        height={13}
        className="pointer-events-none absolute bottom-0 left-1/2 h-auto w-[126px] -translate-x-1/2"
      />

      <span
        className="absolute top-1/2 left-1/2 z-0 h-[36px] w-[27px] -translate-x-1/2 -translate-y-1/2"
        style={{
          aspectRatio: '3/4',
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: '0 0 27.302px #E34039, 0 0 273.019px #E34039',
        }}
      />

      {iconUrl ? (
        <Image
          src={iconUrl}
          alt={alt}
          width={127}
          height={127}
          unoptimized
          className="relative z-10 h-[126px] w-[126px]"
        />
      ) : null}
    </div>
  );
}

function CtaButton({
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
      className="inline-flex min-h-[53px] items-center justify-center rounded-[100px] border border-[#DE3737] px-8 text-center text-[16px] leading-9 font-normal capitalize text-[#EC0000] shadow-[0_0_7px_rgba(227,64,57,0.20)] transition-colors duration-200"
      style={{ background: hovered ? BUTTON_GRADIENT_HOVER : BUTTON_GRADIENT }}
    >
      {label}
    </Link>
  );
}