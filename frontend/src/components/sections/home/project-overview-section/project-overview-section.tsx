import Image from 'next/image';
import type { HomePageProjectOverview } from '@/types/strapi/home-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';

type ProjectOverviewSectionProps = {
  data: HomePageProjectOverview | null | undefined;
};

export function ProjectOverviewSection({
  data,
}: ProjectOverviewSectionProps) {
  if (!data) {
    return null;
  }

  const iconUrl = getStrapiMediaUrl(data.icon?.url);

  return (
    <section>
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/home/project_overview_bg.svg)',
              backgroundPosition: 'top center',
              backgroundSize: 'cover',
            }}
          />

          <Image
            src="/images/home/overview_left_decor.svg"
            alt=""
            aria-hidden="true"
            width={201}
            height={409}
            className="pointer-events-none absolute left-0 top-1/2 z-0 hidden h-auto w-[201px] -translate-y-[25%] md:block"
          />

          <Image
            src="/images/home/overview_right_decor.svg"
            alt=""
            aria-hidden="true"
            width={201}
            height={409}
            className="pointer-events-none absolute right-0 top-1/2 z-0 hidden h-auto w-[201px] -translate-y-[25%] md:block"
          />

          <div className="relative z-10 mx-auto max-w-[1360px] px-6 py-[80px] md:px-[30px] md:py-[120px]">
            <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
              {iconUrl ? (
                <FadeUp delay={60} duration={1200} y={18}>
                  <Image
                    src={iconUrl}
                    alt={data.icon?.alternativeText || data.title}
                    width={213}
                    height={213}
                    unoptimized
                    className="mb-8 h-[160px] w-[160px] md:h-[213px] md:w-[213px]"
                  />
                </FadeUp>
              ) : null}

              <FadeUp delay={180} duration={1250} y={20}>
                <h2 className="max-w-[890px] text-[36px] leading-[40px] font-semibold tracking-[-1.5px] text-black md:text-[48px] md:leading-[54px] md:tracking-[-1px]">
                  {data.title}
                </h2>
              </FadeUp>

              {data.subtitle ? (
                <FadeUp delay={320} duration={1250} y={14}>
                  <p className="mt-[28px] max-w-[678px] text-[16px] leading-[22px] font-normal tracking-[-0.4px] text-[rgba(0,0,0,0.64)]">
                    {data.subtitle}
                  </p>
                </FadeUp>
              ) : null}
            </div>
          </div>
      </div>
    </section>
  );
}