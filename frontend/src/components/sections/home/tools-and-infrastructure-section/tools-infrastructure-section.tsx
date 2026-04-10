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
  const activeImageUrl = getStrapiMediaUrl(activeTab.previewImage?.url);

  return (
    <section className="px-4 pb-0">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[612px] text-center">
          <h2 className="mx-auto max-w-[612px] text-[36px] leading-[40px] font-semibold tracking-[-1.5px] text-[#1E0000] md:text-[48px] md:leading-[116%] md:tracking-[-1px]">
            {data.title}
          </h2>

          {data.subtitle ? (
            <p className="mx-auto mt-4 max-w-[439px] text-[16px] leading-[22px] font-normal tracking-[-0.4px] text-[rgba(13,0,0,0.60)]">
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
                  className={`flex h-[48px] min-w-[140px] items-center justify-center rounded-[100px] px-6 text-center text-[16px] leading-5 font-medium tracking-[-0.5px] capitalize transition-all duration-300 md:w-[154px] ${
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

          {data.socialLinks?.length ? (
            <div className="mt-6 flex items-center gap-3">
              {data.socialLinks.map((item) => {
                const iconUrl = getStrapiMediaUrl(item.icon?.url);

                if (!iconUrl) {
                  return null;
                }

                const content = (
                  <span className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-white">
                    <Image
                      src={iconUrl}
                      alt={item.icon?.alternativeText || ''}
                      width={24}
                      height={24}
                      unoptimized
                      className="h-6 w-6"
                    />
                  </span>
                );

                return item.href ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="inline-flex"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={item.id} className="inline-flex">
                    {content}
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="mt-8 w-full md:mt-10">
            <div className="relative mx-auto h-[220px] w-full max-w-[1162px] overflow-visible md:h-[530px]">
              {tabs.map((tab, index) => {
                const imageUrl = getStrapiMediaUrl(tab.previewImage?.url);
                const isActive = index === safeIndex;

                if (!imageUrl) {
                  return null;
                }

                return (
                  <div
                    key={tab.id}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
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
                      className="object-contain object-center"
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
        </div>
      </div>
    </section>
  );
}