import Image from 'next/image';
import Link from 'next/link';
import type { HomePageEconomicLayer } from '@/types/strapi/home-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type EconomicLayerSectionProps = {
  data: HomePageEconomicLayer | null | undefined;
};

function ButtonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.0881 13.3208C20.7678 13.648 20.4368 13.7459 19.2861 13.7459C17.932 13.7459 17.8763 13.7373 17.8763 13.7373H14.1655C13.6337 14.501 12.7618 14.9996 11.7754 14.9996C10.1559 14.9996 8.84306 13.6569 8.84306 12C8.84306 10.3429 10.156 8.99978 11.7754 8.99978C12.7396 8.99978 13.5949 9.47593 14.1294 10.2107H17.8469C17.0785 7.53715 14.6588 5.57961 11.8002 5.57961C8.32552 5.57961 5.49887 8.47167 5.49887 12.0264C5.49887 15.5814 8.32552 18.4732 11.8002 18.4732C13.5652 18.4732 15.163 17.7269 16.3078 16.5265C16.3078 16.5265 17.6066 16.5171 18.8303 16.5171C18.8819 16.5171 19.2788 16.5171 19.3253 16.5171C20.0685 16.5171 20.1863 17.1271 19.9196 17.5087C19.89 17.5507 19.794 17.7034 19.7612 17.7513C19.2138 18.5542 18.9672 18.8292 18.2791 19.4586C16.5499 21.0387 14.27 22 11.7745 22C6.38461 22.0001 2 17.5143 2 12.0004C2 6.48633 6.38461 2 11.7745 2C17.1639 2 21.5489 6.48633 21.5489 12.0004C21.5489 12.4409 21.452 12.9493 21.0881 13.3208Z"
        fill="white"
      />
    </svg>
  );
}

export function EconomicLayerSection({ data }: EconomicLayerSectionProps) {
  if (!data) {
    return null;
  }

  const coinImageUrl = getStrapiMediaUrl(data.coinImage?.url);

  return (
    <section className="relative overflow-hidden pt-[50px] pb-[300px] md:pt-[190px]">

      <div
        className="pointer-events-none absolute inset-0 z-0 bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/home/BG.png)',
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-b from-transparent to-[#f7f5f4]"
      />

      <div className="relative z-20 mx-auto max-w-[1200px] px-4">
        <div className="relative mx-auto w-full max-w-[1012px] pt-[90px] md:pt-[100px]">
          <RevealCard duration={1200} y={36} scale={0.985}>
            <div className="relative mx-auto flex min-h-[500px] w-full flex-col items-center rounded-[16px] border border-white bg-white px-6 pt-[120px] pb-12 text-center md:min-h-[562px] md:px-10 md:pt-[150px]">
              {coinImageUrl ? (
                  <FadeUp
                    delay={80}
                    duration={1200}
                    y={16}
                    className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[42%] md:-translate-y-[46%]"
                  >
                    <Image
                      src={coinImageUrl}
                      alt={data.coinImage?.alternativeText || data.title}
                      width={200}
                      height={200}
                      unoptimized
                      className="h-[140px] w-[140px] md:h-[200px] md:w-[200px]"
                    />
                  </FadeUp>
                ) : null}

              <FadeUp delay={180} duration={1200} y={20}>
                <h2 className="max-w-[480px] text-center text-[36px] leading-[40px] font-semibold tracking-[-1.5px] text-[#0D0000] md:text-[48px] md:leading-[116%] md:tracking-[-1px]">
                  {data.title}
                </h2>
              </FadeUp>

              {data.subtitle ? (
                <FadeUp delay={320} duration={1250} y={16}>
                  <p className="mt-4 max-w-[439px] text-center text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(13,0,0,0.60)]">
                    {data.subtitle}
                  </p>
                </FadeUp>
              ) : null}

              {data.buttonLabel ? (
                <FadeUp delay={460} duration={1200} y={14}>
                  <div className="mt-[40px] md:mt-[50px]">
                    <Link
                      href={data.buttonHref || '#'}
                      className="inline-flex items-center justify-center gap-1 rounded-[100px] bg-[linear-gradient(268deg,#E00808_6.31%,#E34039_91.78%)] px-[30px] pt-[6px] pb-[8px] text-center text-[16px] leading-9 font-normal capitalize text-white shadow-[0_2px_2px_rgba(214,214,214,0.74)] transition duration-200 hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%),linear-gradient(268deg,#E00808_6.31%,#E34039_91.78%)]"
                    >
                      <span>{data.buttonLabel}</span>
                      <ButtonIcon />
                    </Link>
                  </div>
                </FadeUp>
              ) : null}
            </div>
          </RevealCard>
        </div>
      </div>
    </section>
  );
}