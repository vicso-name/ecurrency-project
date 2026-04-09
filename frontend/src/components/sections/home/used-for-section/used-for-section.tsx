import Image from 'next/image';
import type { HomePageUsedFor } from '@/types/strapi/home-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type UsedForSectionProps = {
  data: HomePageUsedFor | null | undefined;
};

export function UsedForSection({ data }: UsedForSectionProps) {
  if (!data) {
    return null;
  }

  return (
    <section className="px-4 pt-[80px] pb-[5px]">
      <div className="mx-auto max-w-[1200px]">
        {data.preTitle ? (
          <FadeUp delay={0} duration={1100} y={18}>
            <p className="mb-[40px] text-center [font-family:var(--font-roboto-mono)] text-[16px] leading-5 font-normal uppercase text-[rgba(13,0,0,0.48)] md:mb-[70px]">
              {data.preTitle}
            </p>
          </FadeUp>
        ) : null}

        {data.cards?.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.cards.map((card, index) => (
              <RevealCard
                key={card.id}
                delay={100 + index * 120}
                duration={1000}
                y={28}
                scale={0.985}
              >
                <UsedForCard card={card} />
              </RevealCard>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

type UsedForCardProps = {
  card: NonNullable<HomePageUsedFor['cards']>[number];
};

function UsedForCard({ card }: UsedForCardProps) {
  const iconUrl = getStrapiMediaUrl(card.icon?.url);

  return (
    <div className="rounded-[17.473px] border border-[#DEDEDE] p-[10px] transition-transform duration-300 hover:-translate-y-[2px]">
      <div
        className="relative flex min-h-[292px] flex-col items-center rounded-[9px] border border-[rgba(122,122,122,0.10)] bg-white px-6 py-8 text-center"
        style={{
          backgroundImage: 'url(/images/home/use_for_block_bg.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: '100% auto',
        }}
      >
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt={card.icon?.alternativeText || card.title}
            width={110}
            height={110}
            unoptimized
            className="mb-6 h-[110px] w-[110px]"
          />
        ) : null}

        <p className="text-center text-[16px] leading-6 font-normal tracking-[-0.4px] text-[rgba(0,0,0,0.18)]">
          {card.orderNumber}
        </p>

        <h3 className="mt-2 max-w-[204px] text-center text-[20px] leading-[116%] font-semibold tracking-[-1.5px] text-black">
          {card.title}
        </h3>
      </div>
    </div>
  );
}