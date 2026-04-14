import Image from 'next/image';
import type { OpportunitiesSection, OpportunityCard } from '@/types/strapi/developers-page';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type OpportunitiesSectionProps = {
  data: OpportunitiesSection | null | undefined;
};

function OpportunityCardBlock({ card }: { card: OpportunityCard }) {
  const iconUrl = getStrapiMediaUrl(card.icon?.url);

  const heightClass =
    card.sizeVariant === 'tall' ? 'h-[312px]' : 'h-[144px]';

  return (
    <div
      className={`relative flex flex-col justify-end rounded-[24px] border border-[rgba(160,160,160,0.54)] bg-white p-6 ${heightClass}`}
      style={{
        backgroundImage: 'url(/images/home/use_for_block_bg.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundSize: '100% auto',
      }}
    >
      {iconUrl && (
        <div className="absolute top-5 right-5">
          <Image
            src={iconUrl}
            alt={card.icon?.alternativeText || card.title}
            width={36}
            height={36}
            unoptimized
            className="h-[36px] w-[36px]"
          />
        </div>
      )}

      <p className="max-w-[226px] text-[20px] font-medium leading-normal text-[#333]">
        {card.title}
      </p>
    </div>
  );
}

export function OpportunitiesSectionBlock({ data }: OpportunitiesSectionProps) {
  if (!data) return null;

  const cards = data.cards ?? [];
  const tallCard = cards.find((c) => c.sizeVariant === 'tall');
  const smallCards = cards.filter((c) => c.sizeVariant === 'small');
  const wideCard = cards.find((c) => c.sizeVariant === 'wide');

  return (
    <section className="px-4 py-[40px] md:py-[70px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Title */}
        <FadeUp delay={0} duration={1200} y={20}>
          <h2 className="mx-auto mb-[65px] max-w-[462px] text-center [font-family:var(--font-manrope)] text-[36px] font-semibold leading-[116%] tracking-[-1px] text-black md:text-[48px]">
            {data.title}
          </h2>
        </FadeUp>

        {/* Bento grid - Desktop */}
        <div className="hidden gap-6 lg:flex">
          {/* Left: tall card */}
          {tallCard && (
            <div className="w-[371px] shrink-0">
              <RevealCard delay={100} duration={1000} y={28} scale={0.985}>
                <OpportunityCardBlock card={tallCard} />
              </RevealCard>
            </div>
          )}

          {/* Right: 2 small on top + 1 wide below */}
          <div className="flex flex-1 flex-col gap-6">
            {smallCards.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {smallCards.map((card, index) => (
                  <RevealCard
                    key={card.id}
                    delay={220 + index * 120}
                    duration={1000}
                    y={28}
                    scale={0.985}
                  >
                    <OpportunityCardBlock card={card} />
                  </RevealCard>
                ))}
              </div>
            )}

            {wideCard && (
              <RevealCard delay={460} duration={1000} y={28} scale={0.985}>
                <OpportunityCardBlock card={wideCard} />
              </RevealCard>
            )}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="flex flex-col gap-6 lg:hidden">
          {cards.map((card, index) => (
            <RevealCard
              key={card.id}
              delay={100 + index * 120}
              duration={1000}
              y={28}
              scale={0.985}
            >
              <OpportunityCardBlock card={card} />
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}