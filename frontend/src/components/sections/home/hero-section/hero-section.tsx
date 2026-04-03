import Link from 'next/link';
import type { HomePageHero } from '@/types/strapi/home-page';

type HeroSectionProps = {
  hero: HomePageHero | null | undefined;
};

export function HeroSection({ hero }: HeroSectionProps) {
  if (!hero) {
    return null;
  }

  return (
    <section className="relative overflow-hidden px-4 pt-10 pb-20 md:pt-16 md:pb-24">
      <div className="mx-auto flex min-h-[760px] max-w-[1360px] flex-col items-center rounded-[20px] bg-[linear-gradient(180deg,#FFF6F5_0%,#FFFFFF_100%)] px-6 pt-24 text-center md:px-10 md:pt-28">
        <div className="w-full max-w-[917px]">
          <h1 className="text-[#202020] text-center text-[48px] leading-[1.04] font-semibold tracking-[-2px] md:text-[64px] md:tracking-[-3px] xl:text-[80px] xl:tracking-[-4px]">
            {hero.title}
          </h1>

          {hero.subtitle ? (
            <p className="mx-auto mt-8 max-w-[560px] text-center text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(32,32,32,0.56)]">
              {hero.subtitle}
            </p>
          ) : null}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {hero.primaryButtonLabel ? (
              <Link
                href={hero.primaryButtonHref || '#'}
                className="flex h-[53px] w-full max-w-[230px] items-center justify-center rounded-[100px] bg-[linear-gradient(268deg,#E00808_6.31%,#E34039_91.78%)] px-6 text-center text-[15px] leading-9 font-normal text-white capitalize shadow-[0_2px_2px_0_rgba(214,214,214,0.74)] transition-transform duration-200 hover:-translate-y-[1px]"
              >
                {hero.primaryButtonLabel}
              </Link>
            ) : null}

            {hero.secondaryButtonLabel ? (
              <Link
                href={hero.secondaryButtonHref || '#'}
                className="flex h-[53px] w-full max-w-[213px] items-center justify-center gap-[10px] rounded-[60px] border border-[rgba(32,32,32,0.07)] bg-[rgba(32,32,32,0.02)] px-6 text-center text-[15px] leading-9 font-normal text-[#202020] capitalize backdrop-blur-[12px] transition-all duration-200 hover:-translate-y-[1px] hover:border-[rgba(32,32,32,0.14)] hover:bg-[rgba(32,32,32,0.04)]"
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