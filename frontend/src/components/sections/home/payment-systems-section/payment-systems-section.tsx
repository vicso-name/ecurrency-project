'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FadeUp } from '@/components/ui/fade-up';
import type { HomePagePaymentSystems } from '@/types/strapi/home-page';

type PaymentSystemsSectionProps = {
  data: HomePagePaymentSystems | null | undefined;
};

const BUTTON_GRADIENT =
  'radial-gradient(60.21% 66.41% at 47.91% -7.5%, rgba(240, 88, 88, 0.40) 0%, rgba(255, 255, 255, 0.05) 79.27%, rgba(255, 255, 255, 0) 100%)';
const BUTTON_GRADIENT_HOVER = `${BUTTON_GRADIENT}, rgba(236, 0, 0, 0.04)`;

function CtaButton({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex min-h-[50px] items-center justify-center gap-1 rounded-[100px] border border-[#DE3737] px-[30px] pt-[6px] pb-[8px] text-center text-[16px] leading-9 font-normal capitalize text-[#EC0000] shadow-[0_0_7px_rgba(227,64,57,0.20)] transition-all duration-200"
      style={{ background: hovered ? BUTTON_GRADIENT_HOVER : BUTTON_GRADIENT }}
    >
      {label}
    </Link>
  );
}

function VerticalDashedLine() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1"
      height="38"
      viewBox="0 0 1 38"
      fill="none"
    >
      <path d="M0.5 0L0.500002 38" stroke="#EC0000" strokeOpacity="0.2" strokeDasharray="2 2" />
    </svg>
  );
}

function HorizontalDashedLine() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="1" viewBox="0 0 30 1" fill="none">
      <path d="M0 0.5L30 0.500003" stroke="#EC0000" strokeOpacity="0.2" strokeDasharray="2 2" />
    </svg>
  );
}

function VerticalConnectorMobile() {
  return (
    <Image
      src="/images/home/payment-systems/connector-vertical.png"
      alt=""
      aria-hidden="true"
      width={21}
      height={32}
      unoptimized
    />
  );
}

function NumberBadge({ number }: { number: string }) {
  return (
    <div
      className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white text-center [font-family:var(--font-inter)] text-[16px] font-semibold leading-[20.25px] text-[#EC0000]"
      style={{
        boxShadow:
          '0 0 0 0.884px rgba(194, 0, 0, 0.06), 0 0.884px 0.884px -0.442px rgba(202, 0, 0, 0.03), 0 2.653px 2.653px -1.326px rgba(227, 64, 57, 0.12), 0 4.421px 4.421px -2.211px rgba(227, 64, 57, 0.12), 0 14.149px 14.149px -7.074px rgba(227, 64, 57, 0.16), 0 21.223px 21.223px -7.074px rgba(227, 64, 57, 0.12)',
      }}
    >
      {number}
    </div>
  );
}

function CardBox({ title, wide = false }: { title: string; wide?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[16px] border border-[#E34039] px-[14px] py-[20px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal leading-[20px] tracking-[-0.5px] text-[#EC0000] md:text-[20px] md:leading-[24px] md:tracking-[-1px] ${wide ? 'w-[263px]' : 'w-[213px]'}`}
      style={{
        background: 'linear-gradient(273deg, #FFF 6.73%, #FFF 88.91%)',
        boxShadow: '0 7px 16.4px 0 rgba(238, 238, 238, 0.48)',
      }}
    >
      {title}
    </div>
  );
}

/* ── Desktop: card column with optional connector ── */
function DesktopCardColumn({
  card,
  showConnector,
}: {
  card: NonNullable<HomePagePaymentSystems['cards']>[number];
  showConnector: boolean;
}) {
  return (
    <div className="relative flex flex-1 flex-col items-center">
      <NumberBadge number={card.orderNumber} />
      <div className="my-[2px]">
        <VerticalDashedLine />
      </div>
      <CardBox title={card.title} />

      {/* Connector: 208px, starts from badge right edge, positioned absolutely */}
      {showConnector && (
        <div
          className="absolute top-[12px] left-[calc(50%+38px)] h-[21px] w-[208px]"
        >
          <Image
            src="/images/home/payment-systems/connector-horizontal.png"
            alt=""
            aria-hidden="true"
            width={208}
            height={21}
            className="h-full w-full"
            style={{ objectFit: 'fill' }}
            unoptimized
          />
        </div>
      )}
    </div>
  );
}

/* ── Mobile card: badge left, dashed line to card right, vertical connector between cards ── */
function MobileCard({
  card,
  isLast,
}: {
  card: NonNullable<HomePagePaymentSystems['cards']>[number];
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col items-start">
      {/* Row: badge — horizontal dashed line — card box */}
      <div className="flex w-full items-center justify-space-between">
        <NumberBadge number={card.orderNumber} />
        <div className="mx-[8px] flex items-center">
          <HorizontalDashedLine />
        </div>
        <CardBox title={card.title} wide />
      </div>

      {/* Vertical connector to next card */}
      {!isLast && (
        <div className='ml-[12px] mt-[5px]'>
          <VerticalConnectorMobile />
        </div>
      )}
    </div>
  );
}

export function PaymentSystemsSection({ data }: PaymentSystemsSectionProps) {
  if (!data) return null;

  const cards = data.cards ?? [];

  return (
    <section className="px-4 py-[80px] md:py-[80px]">
      <div className="mx-auto max-w-[1130px]">
        {/* Header */}
        <div className="mx-auto mb-[40px] flex max-w-[590px] flex-col items-center justify-center text-center md:mb-[60px]">
          <FadeUp delay={80} duration={1200} y={20}>
            <h2 className="[font-family:var(--font-manrope)] text-[36px] leading-[116%] font-semibold tracking-[-1px] text-black md:text-[48px]">
              {data.title}
            </h2>
          </FadeUp>

          {data.subtitle && (
            <FadeUp delay={220} duration={1250} y={14}>
              <p className="mt-4 max-w-[440px] [font-family:var(--font-manrope)] text-[16px] font-normal leading-[22px] tracking-[-0.5px] text-[rgba(0,0,0,0.60)]">
                {data.subtitle}
              </p>
            </FadeUp>
          )}
        </div>

        {/* Desktop layout */}
        {cards.length > 0 && (
          <div className="hidden items-start lg:flex">
            {cards.map((card, index) => (
              <DesktopCardColumn
                key={card.id}
                card={card}
                showConnector={index < cards.length - 1}
              />
            ))}
          </div>
        )}

        {/* Mobile layout */}
        {cards.length > 0 && (
          <div className="flex flex-col items-center lg:hidden">
            {cards.map((card, index) => (
              <MobileCard key={card.id} card={card} isLast={index === cards.length - 1} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {data.bottomCtaLabel && (
          <div className="mt-[60px] flex justify-center">
            <CtaButton href={data.bottomCtaHref || '#'} label={data.bottomCtaLabel} />
          </div>
        )}
      </div>
    </section>
  );
}