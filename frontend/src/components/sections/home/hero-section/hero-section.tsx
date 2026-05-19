import Image from 'next/image';
import Link from 'next/link';
import type { HomePageHero } from '@/types/strapi/home-page';
import { FadeUp } from '@/components/ui/fade-up';
import { ParticleLogo } from './ParticleLogo';

type HeroWithButtonTargets = HomePageHero & {
  primaryButtonOpenInNewTab?: boolean | null;
  secondaryButtonOpenInNewTab?: boolean | null;
};

type HeroSectionProps = {
  hero: HeroWithButtonTargets | null | undefined;
};

function externalLinkProps(openInNewTab?: boolean | null) {
  return openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}

export function HeroSection({ hero }: HeroSectionProps) {
  if (!hero) return null;

  return (
    <section className="relative overflow-hidden bg-[#FFD8D8] dark:bg-[#0d0d0d]">
      <Image
        src="/images/hero-bg.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="object-cover object-center dark:hidden"
      />

      <Image
        src="/images/hero-dark-bg.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="hidden object-cover object-center dark:block"
      />

      <div className="pointer-events-none absolute inset-0 z-0 -translate-y-48 md:translate-y-0">
        <ParticleLogo className="h-full w-full" />
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0 z-[1]
          h-[480px]
          bg-gradient-to-t
          from-[#f7f5f4]
          via-[#f7f5f4]/90
          to-transparent
          dark:from-[#0d0d0d]
          dark:via-[#0d0d0d]/90
        "
      />

      <div className="relative z-10 mx-auto flex min-h-[840px] max-w-[1360px] flex-col px-6 pt-24 pb-6 text-center md:min-h-[880px] md:px-10 md:pt-28 md:pb-8">
        <div className="relative z-10 mt-auto mx-auto w-full max-w-[917px] lg:mt-[150px] xl:mt-auto">
          
          <FadeUp delay={120} duration={1400} y={20}>
            <h1 className="text-[#202020] text-center text-[48px] leading-[1.04] font-semibold tracking-[-2px] md:text-[64px] md:tracking-[-3px] xl:text-[80px] xl:tracking-[-4px] dark:text-[#f0f0f0]">
              {hero.title}
            </h1>
          </FadeUp>

          {hero.subtitle ? (
            <FadeUp delay={360} duration={1500} y={14}>
              <p className="mx-auto mt-8 mb-[80px] max-w-[560px] text-center text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(32,32,32,0.56)] md:mb-0 dark:text-[rgba(240,240,240,0.56)]">
                {hero.subtitle}
              </p>
            </FadeUp>
          ) : null}

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            {hero.primaryButtonLabel ? (
              <Link
                href={hero.primaryButtonHref || '#'}
                {...externalLinkProps(hero.primaryButtonOpenInNewTab)}
                className="flex h-[53px] w-full items-center justify-center rounded-[100px] bg-[linear-gradient(268deg,#E00808_6.31%,#E34039_91.78%)] px-6 text-center text-[15px] font-normal text-white capitalize transition-transform duration-200 hover:-translate-y-[1px] sm:max-w-[230px]"
              >
                {hero.primaryButtonLabel}
              </Link>
            ) : null}

            {hero.secondaryButtonLabel ? (
              <Link
                href={hero.secondaryButtonHref || '#'}
                {...externalLinkProps(hero.secondaryButtonOpenInNewTab)}
                className="flex h-[53px] w-full items-center justify-center rounded-[60px] border border-[rgba(32,32,32,0.07)] bg-[rgba(32,32,32,0.02)] px-6 text-center text-[15px] font-normal text-[#202020] whitespace-nowrap backdrop-blur-[12px] transition-all duration-200 hover:-translate-y-[1px] hover:border-[rgba(32,32,32,0.14)] hover:bg-[rgba(32,32,32,0.04)] sm:max-w-[230px] dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(255,255,255,0.06)] dark:text-white dark:hover:border-[rgba(255,255,255,0.22)] dark:hover:bg-[rgba(255,255,255,0.10)]"
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
