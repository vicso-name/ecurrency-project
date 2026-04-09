import type { HomePageBlockQuote } from '@/types/strapi/home-page';
import { FadeUp } from '@/components/ui/fade-up';

type BlockQuoteSectionProps = {
  blockQuote: HomePageBlockQuote | null | undefined;
};

export function BlockQuoteSection({ blockQuote }: BlockQuoteSectionProps) {
  if (!blockQuote?.text) {
    return null;
  }

  return (
    <section className="px-4 pt-10 pb-10 md:pt-20 md:pb-20">
      <FadeUp delay={0} duration={1200} y={32}>
        <div className="mx-auto flex max-w-[1011px] justify-center">
          <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border-2 border-white bg-[rgba(255,255,255,0.64)] px-8 py-12 backdrop-blur-[2px] md:px-[100px] md:py-[64px]">
            <p className="bg-[linear-gradient(95deg,#0D0000_0.71%,#8B8B8B_100.05%)] bg-clip-text text-center text-[24px] leading-[126%] font-medium tracking-[-0.6px] text-transparent md:text-[28px] md:tracking-[-0.8px] xl:text-[32px] xl:tracking-[-1px]">
              {blockQuote.text}
            </p>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}