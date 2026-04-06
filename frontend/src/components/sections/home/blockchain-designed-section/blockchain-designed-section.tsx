'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HomePageBlockchainDesigned } from '@/types/strapi/home-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';

type Props = {
  data: HomePageBlockchainDesigned | null | undefined;
};

function ArrowIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(227,64,57,0.14)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
        <path
          d="M0.5625 7.0625L3.8125 3.8125L0.5625 0.5625"
          stroke="#E34039"
          strokeWidth="1.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function BlockchainDesignedSection({ data }: Props) {
  const tabs = useMemo(() => {
    return [...(data?.tabs ?? [])].sort((a, b) => a.tabNumber - b.tabNumber);
  }, [data?.tabs]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  if (!tabs.length) {
    return null;
  }

  const currentTab = tabs[activeTabIndex];
  const isFirstTabActive = activeTabIndex === 0;

  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-start gap-y-14 gap-x-16 lg:grid-cols-[1fr_492px]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-center text-center">
            {/* TABS */}
            <div className="mb-14 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setActiveTabIndex(0)}
                className={`relative z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full border text-[15px] font-semibold transition-all duration-200 ${
                  isFirstTabActive
                    ? 'border-[rgba(227,64,57,0.12)] bg-white text-[#EC0000] shadow-[0_4px_18px_rgba(227,64,57,0.18)]'
                    : 'border-[rgba(227,64,57,0.08)] bg-white text-[#F6AFAF]'
                }`}
              >
                1
              </button>

              <div className="relative mx-9 h-[1px] w-[215px] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#EC0000_0%,#F6AFAF_100%)]" />
                <div
                  className={`absolute top-0 bottom-0 w-1/2 bg-[#EC0000] transition-all duration-300 ${
                    isFirstTabActive ? 'left-0' : 'left-1/2'
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={() => setActiveTabIndex(1)}
                className={`relative z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full border text-[15px] font-semibold transition-all duration-200 ${
                  !isFirstTabActive
                    ? 'border-[rgba(227,64,57,0.12)] bg-white text-[#EC0000] shadow-[0_4px_18px_rgba(227,64,57,0.18)]'
                    : 'border-[rgba(227,64,57,0.08)] bg-white text-[#F6AFAF]'
                }`}
              >
                2
              </button>
            </div>

            <div className="mx-auto max-w-[500px]">
              <h3 className="text-[32px] leading-[36px] font-medium tracking-[-1.5px] text-black">
                {currentTab.title}
              </h3>

              <p className="mt-10 whitespace-pre-line text-[16px] leading-[22px] font-normal tracking-[-0.4px] text-[rgba(0,0,0,0.36)]">
                {currentTab.description}
              </p>

              {currentTab.learnMoreLabel ? (
                <div className="mt-10 flex justify-center">
                  <Link
                    href={currentTab.learnMoreHref || '#'}
                    className="group inline-flex items-center gap-[10px] text-[16px] leading-5 font-normal text-[#E34039] transition-opacity duration-200 hover:opacity-80"
                  >
                    <span>{currentTab.learnMoreLabel}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-[2px]">
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex justify-center lg:justify-end">
            {currentTab.previewImage ? (
              <div className="relative flex h-[562px] w-full max-w-[492px] items-center justify-center rounded-[16px] border border-[rgba(227,64,57,0.30)] bg-[radial-gradient(80.05%_147.57%_at_50%_-11.11%,rgba(0,0,0,0)_60%,rgba(255,80,80,0.05)_89.8%)] px-6">
                <Image
                  src={getStrapiMediaUrl(currentTab.previewImage.url)}
                  alt={currentTab.previewImage.alternativeText || ''}
                  width={353}
                  height={397}
                  unoptimized
                  className="h-auto w-auto max-w-full"
                />
              </div>
            ) : null}

            {currentTab.featureCards && currentTab.featureCards.length > 0 ? (
              <div className="relative h-[562px] w-full max-w-[492px] rounded-[16px] border border-[rgba(227,64,57,0.30)] bg-[radial-gradient(80.05%_147.57%_at_50%_-11.11%,rgba(0,0,0,0)_60%,rgba(255,80,80,0.05)_89.8%)]">
                {currentTab.featureCards.map((card, index) => {
                  const positions = [
                    'top-[18px] left-[22px]',
                    'top-[86px] right-[18px]',
                    'top-[224px] left-[44px]',
                    'bottom-[20px] right-[0px]',
                  ];

                  return (
                    <div
                      key={card.id}
                      className={`absolute flex w-[283px] flex-col items-start rounded-[8px] bg-[#FAFAFA] px-[24px] py-[18px] shadow-[0_3px_16.4px_rgba(227,64,57,0.20)] ${positions[index] ?? ''}`}
                    >
                      {card.icon ? (
                        <Image
                          src={getStrapiMediaUrl(card.icon.url)}
                          alt={card.icon.alternativeText || ''}
                          width={40}
                          height={40}
                          unoptimized
                          className="mb-3 h-10 w-10"
                        />
                      ) : null}

                      <p className="text-[18px] leading-[150%] font-semibold tracking-[-0.4px] text-black">
                        {card.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        {/* BOTTOM CTA */}
        {data?.bottomCtaLabel ? (
          <div className="mt-16 flex justify-center">
            <Link
              href={data.bottomCtaHref || '#'}
              className="inline-flex min-h-[53px] items-center justify-center rounded-[100px] border border-[#DE3737] bg-[radial-gradient(60.21%_66.41%_at_47.91%_-7.5%,rgba(240,88,88,0.40)_0%,rgba(255,255,255,0.05)_79.27%,rgba(255,255,255,0)_100%)] px-8 text-center text-[16px] leading-9 font-normal text-[#EC0000] capitalize shadow-[0_0_7px_rgba(227,64,57,0.20)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[rgba(236,0,0,0.04)]"
            >
              {data.bottomCtaLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}