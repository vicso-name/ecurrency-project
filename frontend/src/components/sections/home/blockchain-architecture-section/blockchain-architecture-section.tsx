import Image from 'next/image';
import Link from 'next/link';
import type { HomePageBlockchainArchitecture } from '@/types/strapi/home-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';

type BlockchainArchitectureSectionProps = {
  data: HomePageBlockchainArchitecture | null | undefined;
};

export function BlockchainArchitectureSection({
  data,
}: BlockchainArchitectureSectionProps) {
  if (!data) {
    return null;
  }

  return (
    <section className="px-4 py-[80px] md:py-20">
      <div className="mx-auto max-w-[1360px]">
        <div className="text-center mx-auto max-w-[540px]">
          {data.preTitle ? (
            <p className="mb-[30px] [font-family:var(--font-roboto-mono)] text-[16px] leading-5 font-normal uppercase text-[rgba(13,0,0,0.48)]">
              {data.preTitle}
            </p>
          ) : null}

            <h2 className="mx-auto text-center text-[36px] leading-[40px] font-semibold tracking-[-1.5px] text-[#0D0000] md:text-[48px] md:leading-[116%] md:tracking-[-1px]">
                {data.title}
            </h2>

          {data.subTitle ? (
            <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(79,79,79,0.64)]">
                {data.subTitle}
            </p>
            ) : null}
        </div>

        <div className="mt-[30px] grid gap-6 md:mt-[60px]">
          {data.cards?.length ? (
            <>
              <div className="grid gap-6 lg:grid-cols-[569px_395px] lg:justify-center">
                {data.cards[0] ? <ArchitectureCard card={data.cards[0]} /> : null}
                {data.cards[1] ? <ArchitectureCard card={data.cards[1]} /> : null}
              </div>

              <div className="grid gap-6 lg:grid-cols-[395px_569px] lg:justify-center">
                {data.cards[2] ? <ArchitectureCard card={data.cards[2]} /> : null}
                {data.cards[3] ? <ArchitectureCard card={data.cards[3]} /> : null}
              </div>
            </>
          ) : null}
        </div>

        {data.bottomCtaLabel ? (
          <div className="mt-[60px] flex justify-center">
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

type ArchitectureCardProps = {
  card: NonNullable<HomePageBlockchainArchitecture['cards']>[number];
};

function ArchitectureCard({ card }: ArchitectureCardProps) {
  const isLarge = card.sizeVariant === 'large';
  const iconUrl = getStrapiMediaUrl(card.icon?.url);

  return (
    <div
        className={`relative flex h-[354px] w-full justify-center rounded-[17.473px] border border-[#ECECEC] p-[11px] ${
        isLarge ? 'lg:max-w-[569px]' : 'lg:max-w-[395px]'
        }`}
    >
      <div
        className="relative flex w-full flex-col items-center justify-start rounded-[14px] px-6 pt-6 text-center"
        style={{
          backgroundImage: 'url(/images/home/block_bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* ICON BLOCK */}
        <div className="relative mb-10 flex h-[153px] w-full max-w-[290px] items-center justify-center overflow-hidden rounded-[8.737px] border border-[rgba(236,236,236,0.37)] bg-[linear-gradient(273deg,#FFF_6.73%,#FAFAFA_88.91%)] shadow-[0_13.105px_17.91px_0_rgba(255,255,255,0.12)]">
          
          {/* TOP DECOR */}
          <Image
            src="/images/home/top_comb.svg"
            alt=""
            aria-hidden="true"
            width={102}
            height={12}
            className="pointer-events-none absolute top-0 left-1/2 h-auto w-[102px] -translate-x-1/2"
          />

          {/* BOTTOM DECOR */}
          <Image
            src="/images/home/bottom_comb.svg"
            alt=""
            aria-hidden="true"
            width={126}
            height={13}
            className="pointer-events-none absolute bottom-0 left-1/2 h-auto w-[126px] -translate-x-1/2"
          />

          {/* ICON */}
          {iconUrl ? (
            <Image
              src={iconUrl}
              alt={card.icon?.alternativeText || card.title}
              width={127}
              height={127}
              unoptimized
              className="relative z-10 h-[126px] w-[126px]"
            />
          ) : null}
        </div>

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