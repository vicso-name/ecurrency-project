'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { SmartContractsSection } from '@/types/strapi/technology-page';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type SmartContractsSectionProps = {
  data: SmartContractsSection | null | undefined;
};

function NumberBadge({ number }: { number: number }) {
  return (
    <div
      className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-white text-center [font-family:var(--font-inter)] text-[16px] font-semibold leading-[20.25px] text-[#EC0000]"
      style={{
        boxShadow:
          '0 0 0 0.884px rgba(194, 0, 0, 0.06), 0 14.149px 14.149px -7.074px rgba(227, 64, 57, 0.16)',
      }}
    >
      {number}
    </div>
  );
}

function StepCard({ text, index }: { text: string; index: number }) {
  return (
    <div
      className="flex items-center justify-between gap-[10px] rounded-[16px] border border-[#E34039] px-5 py-[18px]"
      style={{
        background: 'linear-gradient(273deg, #FFF 6.73%, #FFF 88.91%)',
        boxShadow: '0 7px 16.4px 0 rgba(238, 238, 238, 0.48)',
      }}
    >
      <p className="max-w-[267px] [font-family:var(--font-manrope)] text-[18px] font-normal leading-[22px] tracking-[-1px] text-black">
        {text}
      </p>
      <NumberBadge number={index + 1} />
    </div>
  );
}

function BenefitCard({
  text,
  index,
  tags,
}: {
  text: string;
  index: number;
  tags?: { id: number; label: string }[];
}) {
  return (
    <div
      className="flex flex-col gap-3 rounded-[16px] border border-[#E34039] px-5 py-[18px]"
      style={{
        background: 'linear-gradient(273deg, #FFF 6.73%, #FFF 88.91%)',
        boxShadow: '0 7px 16.4px 0 rgba(238, 238, 238, 0.48)',
      }}
    >
      <div className="flex items-center justify-between gap-[10px]">
        <p className="max-w-[267px] [font-family:var(--font-manrope)] text-[18px] font-normal leading-[22px] tracking-[-1px] text-black">
          {text}
        </p>
        <NumberBadge number={index + 1} />
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex h-[30px] items-center justify-center rounded-[100px] border border-[#F9F9F9] px-[10px] text-center [font-family:var(--font-manrope)] text-[14px] font-medium capitalize leading-[16px] tracking-[-0.5px] text-[rgba(0,0,0,0.69)]"
              style={{
                background:
                  'radial-gradient(30% 53.62% at 48.95% -4950%, #F17474 0%, rgba(213, 110, 108, 0.30) 37.7%, rgba(38, 21, 21, 0.00) 89.47%), linear-gradient(0deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.04) 100%), #FFF',
                boxShadow: '0 4px 8px 0 rgba(255, 255, 255, 0.48) inset',
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function CtaButton({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center justify-center gap-2 rounded-[100px] px-8 py-2 text-center [font-family:var(--font-manrope)] text-[15px] font-normal capitalize leading-[36px] text-white transition-all duration-200"
      style={{
        background: hovered
          ? 'linear-gradient(0deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.10) 100%), linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)'
          : 'linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)',
        boxShadow: '0 2px 2px 0 rgba(214, 214, 214, 0.74)',
      }}
    >
      {label}
    </Link>
  );
}

export function SmartContractsSectionBlock({ data }: SmartContractsSectionProps) {
  if (!data) return null;

  const steps = data.steps ?? [];
  const benefits = data.benefits ?? [];

  return (
    <section className="px-4 py-[80px] md:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mx-auto mb-[60px] max-w-[456px] text-center">
          <FadeUp delay={0} duration={1200} y={20}>
            <h2 className="mb-6 [font-family:var(--font-manrope)] text-[36px] font-semibold leading-[116%] tracking-[-1px] text-black md:text-[48px]">
              {data.title}
            </h2>
          </FadeUp>

          {data.subtitle && (
            <FadeUp delay={120} duration={1200} y={14}>
              <p className="[font-family:var(--font-manrope)] text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[rgba(32,32,32,0.56)]">
                {data.subtitle}
              </p>
            </FadeUp>
          )}
        </div>

        {/* Two panels */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* How It Works - left */}
          <RevealCard delay={100} duration={1200} y={36} scale={0.985}>
            <div
              className="flex h-full flex-col rounded-[16px] border border-[rgba(227,64,57,0.30)] bg-white p-8"
              style={{
                backgroundImage: 'url(/images/technology/smart-contracts-bg-left.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                backgroundSize: '100% auto',
              }}
            >
              <h3 className="mb-[40px] text-center [font-family:var(--font-manrope)] text-[32px] font-medium leading-[36px] tracking-[-1.5px] text-black">
                {data.howItWorksTitle}
              </h3>

              <div className="flex flex-col gap-4">
                {steps.map((step, index) => (
                  <StepCard key={step.id} text={step.text} index={index} />
                ))}
              </div>
            </div>
          </RevealCard>

          {/* Benefits - right */}
          <RevealCard delay={240} duration={1200} y={36} scale={0.985}>
            <div className="flex h-full flex-col rounded-[16px] border border-[#EC0000] bg-[#E00D0C] p-8">
              <h3 className="mb-[40px] text-center [font-family:var(--font-manrope)] text-[32px] font-medium leading-[36px] tracking-[-1.5px] text-white">
                {data.benefitsTitle}
              </h3>

              <div className="flex flex-col gap-4">
                {benefits.map((benefit, index) => (
                  <BenefitCard
                    key={benefit.id}
                    text={benefit.text}
                    index={index}
                    tags={benefit.tags}
                  />
                ))}
              </div>
            </div>
          </RevealCard>
        </div>

        {/* CTA */}
        {data.ctaLabel && (
          <FadeUp delay={460} duration={1200} y={14}>
            <div className="mt-[50px] flex justify-center">
              <CtaButton href={data.ctaHref || '#'} label={data.ctaLabel} />
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}