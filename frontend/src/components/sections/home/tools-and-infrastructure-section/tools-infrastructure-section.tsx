'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HomePageToolsInfrastructure } from '@/types/strapi/home-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';

type ToolsInfrastructureSectionProps = {
  data: HomePageToolsInfrastructure | null | undefined;
};

export function ToolsInfrastructureSection({
  data,
}: ToolsInfrastructureSectionProps) {
  const tabs = useMemo(() => data?.tabs ?? [], [data?.tabs]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  if (!data || !tabs.length) {
    return null;
  }

  const safeIndex = Math.min(activeTabIndex, tabs.length - 1);
  const activeTab = tabs[safeIndex];
  const activeButtons = activeTab.buttons ?? [];
  const activeImageUrl = getStrapiMediaUrl(activeTab.previewImage?.url);

  return (
    <section className="px-4 pb-0">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[612px] text-center">
          <h2 className="mx-auto max-w-[612px] text-[36px] font-semibold leading-[40px] tracking-[-1.5px] text-[#1E0000] md:text-[48px] md:leading-[116%] md:tracking-[-1px]">
            {data.title}
          </h2>

          {data.subtitle ? (
            <p className="mx-auto mt-4 max-w-[439px] text-[16px] font-normal leading-[22px] tracking-[-0.4px] text-[rgba(13,0,0,0.60)]">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-[32px] flex flex-col items-center md:mt-[40px]">
          <div className="inline-flex items-start rounded-[100px] border border-[#DE3737] bg-[#FBFBFB] p-1 shadow-[0_2px_2px_rgba(222,222,222,0.74)]">
            {tabs.map((tab, index) => {
              const isActive = index === safeIndex;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabIndex(index)}
                  className={`flex h-[48px] min-w-[140px] items-center justify-center rounded-[100px] px-6 text-center text-[16px] font-medium leading-5 tracking-[-0.5px] capitalize transition-all duration-300 md:w-[154px] ${
                    isActive
                      ? 'bg-[#EC0000] text-white shadow-[inset_0_4px_10.7px_rgba(255,255,255,0.40)]'
                      : 'text-[rgba(30,0,0,0.32)] hover:text-[rgba(30,0,0,0.56)]'
                  }`}
                  aria-pressed={isActive}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 w-full md:mt-10">
            <div className="relative z-0 mx-auto h-[220px] w-full max-w-[1162px] overflow-visible md:h-[530px]">
              {tabs.map((tab, index) => {
                const imageUrl = getStrapiMediaUrl(tab.previewImage?.url);
                const isActive = index === safeIndex;

                if (!imageUrl) {
                  return null;
                }

                return (
                  <div
                    key={tab.id}
                    className={`absolute inset-0 min-h-[160px] overflow-hidden transition-all duration-500 ease-out md:overflow-visible ${
                      isActive
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-2 opacity-0'
                    }`}
                  >
                    <Image
                      src={imageUrl}
                      alt={tab.previewImage?.alternativeText || tab.label}
                      fill
                      unoptimized
                      className="object-cover object-center md:object-contain"
                      sizes="(max-width: 768px) 100vw, 1162px"
                      priority={isActive}
                    />
                  </div>
                );
              })}

              {!activeImageUrl ? (
                <div className="flex h-full items-center justify-center rounded-[20px] border border-dashed border-[rgba(30,0,0,0.12)] text-[rgba(30,0,0,0.32)]">
                  No image
                </div>
              ) : null}
            </div>
          </div>

          {activeButtons.length > 0 ? (
            <div className="relative z-10 mt-10 mb-8 flex w-full max-w-[500px] flex-wrap justify-center gap-3 md:mt-0 md:mb-10">
              {activeButtons.map((button) => {
                const iconUrl = getStrapiMediaUrl(button.icon?.url);
                const isPrimary = button.variant === 'primary';

                const content = isPrimary ? (
                  <>
                    {iconUrl ? (
                      <Image
                        src={iconUrl}
                        alt={button.icon?.alternativeText || button.label}
                        width={24}
                        height={24}
                        unoptimized
                        className="h-6 w-6 shrink-0"
                      />
                    ) : null}

                    <span className="min-w-0 truncate text-center text-[16px] font-normal leading-9 capitalize text-[#EC0000]">
                      {button.label}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex min-w-0 flex-1 items-center gap-[12px] overflow-hidden">
                      {iconUrl ? (
                        <Image
                          src={iconUrl}
                          alt={button.icon?.alternativeText || button.label}
                          width={24}
                          height={24}
                          unoptimized
                          className="h-6 w-6 shrink-0 opacity-65"
                        />
                      ) : null}

                      <span className="block min-w-0 truncate text-left text-[16px] font-medium leading-5 tracking-[-0.5px] capitalize text-[rgba(0,0,0,0.42)] md:text-center">
                        {button.label}
                      </span>
                    </div>

                    {button.subLabel ? (
                      <span className="ml-3 inline-flex h-[38px] shrink-0 items-center justify-center rounded-[999px] bg-[rgba(255,255,255,0.55)] px-[18px] text-[15px] font-normal leading-none capitalize text-[rgba(0,0,0,0.22)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        {button.subLabel}
                      </span>
                    ) : null}
                  </>
                );

                const primaryClassName =
                  'inline-flex min-h-[50px] w-full max-w-[300px] min-w-[170px] items-center justify-center gap-[10px] overflow-hidden rounded-[999px] border border-[#DE3737] bg-[radial-gradient(60.21%_66.41%_at_47.91%_-7.5%,rgba(240,88,88,0.40)_0%,rgba(255,255,255,0.05)_79.27%,rgba(255,255,255,0)_100%)] px-[15px] py-[10px] shadow-[0_0_7px_rgba(227,64,57,0.20)] transition-all duration-200 hover:bg-[rgba(236,0,0,0.04)] md:min-h-[56px] md:w-auto md:max-w-none';

                const secondaryClassName =
                  'inline-flex min-h-[50px] w-full max-w-[300px] cursor-default items-center justify-between overflow-hidden rounded-[999px] border border-[rgba(255,255,255,0.55)] bg-[linear-gradient(180deg,rgba(245,245,245,0.95)_0%,rgba(236,236,236,0.95)_100%)] pl-[15px] pr-[10px] py-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-[10px] md:w-auto md:max-w-none';

                if (isPrimary && button.href) {
                  return (
                    <Link
                      key={button.id}
                      href={button.href}
                      className={primaryClassName}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <div
                    key={button.id}
                    className={isPrimary ? primaryClassName : secondaryClassName}
                    aria-disabled={!isPrimary}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}