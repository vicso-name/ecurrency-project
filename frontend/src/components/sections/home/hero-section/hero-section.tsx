import Link from 'next/link';
import type { HomePageHero } from '@/types/strapi/home-page';
import { ParticleLogo } from './ParticleLogo';
import Image from 'next/image';
import { FadeUp } from '@/components/ui/fade-up';

type HeroSectionProps = {
  hero: HomePageHero | null | undefined;
};

export function HeroSection({ hero }: HeroSectionProps) {
  if (!hero) return null;

  return (
    <section className="relative  overflow-hidden bg-[#FFD8D8]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.svg"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-35 bg-gradient-to-b from-[#FAFAFA] to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-50 bg-gradient-to-b from-transparent to-[#f7f5f4]"
      />

      <div className="pointer-events-none absolute inset-0 z-0 -translate-y-48 md:translate-y-0">
        <ParticleLogo className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[840px] max-w-[1360px] flex-col px-6 pt-24 pb-6 text-center md:min-h-[880px] md:px-10 md:pt-28 md:pb-8">
        <div className="relative z-10 mt-auto mx-auto w-full max-w-[917px]">
          <FadeUp delay={120} duration={1400} y={20}>
            <h1 className="text-[#202020] text-center text-[48px] leading-[1.04] font-semibold tracking-[-2px] md:text-[64px] md:tracking-[-3px] xl:text-[80px] xl:tracking-[-4px]">
              {hero.title}
            </h1>
          </FadeUp>

          {hero.subtitle ? (
            <FadeUp delay={360} duration={1500} y={14}>
              <p className="mx-auto mt-8 mb-[80px] max-w-[560px] text-center text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(32,32,32,0.56)] md:mb-0">
                {hero.subtitle}
              </p>
            </FadeUp>
          ) : null}

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            {hero.primaryButtonLabel ? (
              <Link
                href={hero.primaryButtonHref || '#'}
                className="flex h-[53px] w-full items-center justify-center rounded-[100px] bg-[linear-gradient(268deg,#E00808_6.31%,#E34039_91.78%)] px-6 text-center text-[15px] font-normal text-white capitalize shadow-[0_2px_2px_0_rgba(214,214,214,0.74)] transition-transform duration-200 hover:-translate-y-[1px] sm:max-w-[230px]"
              >
                {hero.primaryButtonLabel}
              </Link>
            ) : null}

            {hero.secondaryButtonLabel ? (
              <Link
                href={hero.secondaryButtonHref || '#'}
                className="flex h-[53px] w-full items-center justify-center rounded-[60px] border border-[rgba(32,32,32,0.07)] bg-[rgba(32,32,32,0.02)] px-6 text-center text-[15px] font-normal text-[#202020] whitespace-nowrap backdrop-blur-[12px] transition-all duration-200 hover:-translate-y-[1px] hover:border-[rgba(32,32,32,0.14)] hover:bg-[rgba(32,32,32,0.04)] sm:max-w-[230px]"
              >
                {hero.secondaryButtonLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}