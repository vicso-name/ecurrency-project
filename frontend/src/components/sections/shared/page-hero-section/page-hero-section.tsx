'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import type { PageHero } from '@/types/strapi/page-hero';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';
import { ParticleLogo } from '@/components/sections/home/hero-section/ParticleLogo';
import Image from 'next/image';

type PageHeroSectionProps = {
  hero: PageHero | null | undefined;
};

function WalletIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
      <path d="M17.3284 15.2579L17.3373 15.2588" stroke="#6E6E6E" strokeOpacity="0.78" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.06192 8.23078L19.6818 9.22916C20.1512 9.2733 20.5839 9.5021 20.8846 9.86524C21.1853 10.2284 21.3295 10.6961 21.2853 11.1655L20.4533 20.0154C20.4092 20.4848 20.1804 20.9175 19.8173 21.2182C19.4541 21.519 18.9864 21.6631 18.517 21.619L6.12716 20.4542C5.65774 20.4101 5.22507 20.1813 4.92434 19.8181C4.62361 19.455 4.47946 18.9872 4.52359 18.5178L5.68838 6.12801C5.73251 5.65858 5.96131 5.22591 6.32445 4.92518C6.68759 4.62445 7.15532 4.4803 7.62475 4.52443L20.0146 5.68922" stroke="#6E6E6E" strokeOpacity="0.78" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExtensionIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
      <path d="M21.2409 14.8262L17.6359 15.2688C17.2147 15.3205 16.8314 15.5374 16.5701 15.8718C16.3088 16.2062 16.1911 16.6307 16.2428 17.0519L16.6855 20.6568" stroke="#6E6E6E" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.55859 6.98358L8.72044 8.30168C8.79801 8.93346 9.12338 9.50854 9.62496 9.90042C10.1265 10.2923 10.7633 10.4689 11.395 10.3913C11.8162 10.3396 12.2407 10.4573 12.5751 10.7186C12.9095 10.9798 13.1264 11.3632 13.1781 11.7844C13.2853 12.6578 14.0877 13.2847 14.9612 13.1775C15.3823 13.1258 15.7657 12.9088 16.027 12.5745C16.2882 12.2401 16.406 11.8156 16.3542 11.3944C16.247 10.521 16.8739 9.71859 17.7473 9.61134L20.2644 9.30228" stroke="#6E6E6E" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5482 21.3709L13.1631 18.2344C13.1114 17.8133 12.8945 17.4299 12.5601 17.1686C12.2257 16.9074 11.8012 16.7896 11.3801 16.8414C10.9589 16.8931 10.5344 16.7754 10.2 16.5141C9.86562 16.2528 9.64871 15.8695 9.59699 15.4483L9.4995 14.6542C9.44778 14.2331 9.23087 13.8497 8.89648 13.5884C8.56209 13.3272 8.13762 13.2094 7.71643 13.2612L5.37402 13.5488" stroke="#6E6E6E" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.3483 21.3137C18.7336 20.7752 21.8522 16.7837 21.3137 12.3984C20.7752 8.01301 16.7837 4.89449 12.3984 5.43294C8.01303 5.97139 4.89451 9.96292 5.43296 14.3483C5.97142 18.7336 9.96294 21.8521 14.3483 21.3137Z" stroke="#6E6E6E" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SoonBadge() {
  return (
    <span className="rounded-[50px] bg-[rgba(255,255,255,0.40)] px-2 pt-[2px] pb-[4px] text-center [font-family:var(--font-manrope)] text-[15px] font-normal capitalize text-[#C6C6C6]">
      Soon
    </span>
  );
}

function FloatingBadge({
  icon,
  label,
  position,
}: {
  icon: React.ReactNode;
  label: string;
  position: 'left' | 'right';
}) {
 const positionClasses =
  position === 'left'
    ? 'left-[20px] top-[-35px] bottom-auto rotate-[5deg] md:left-[130px] md:top-auto md:bottom-[41px]'
    : 'right-[20px] bottom-[-26px] rotate-[-7deg] md:right-[163px]';

  return (
    <div
      className={`absolute z-10 flex items-center gap-[6px] rounded-[100px] border border-[#F9F9F9] px-[24px] py-[14px] ${positionClasses}`}
      style={{
        background:
          'radial-gradient(30% 53.62% at 48.95% -4950%, #F17474 0%, rgba(213, 110, 108, 0.30) 37.7%, rgba(38, 21, 21, 0.00) 89.47%), linear-gradient(0deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.04) 100%), #FFF',
        boxShadow: '0 4px 8px 0 rgba(255, 255, 255, 0.48) inset',
      }}
    >
      {icon}
      <span className="[font-family:var(--font-manrope)] text-[16px] font-medium capitalize leading-[20px] tracking-[-0.5px] text-[rgba(0,0,0,0.40)]">
        {label}
      </span>
      <SoonBadge />
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
      className="mt-[45px] inline-flex items-center justify-center gap-1 rounded-[100px] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal capitalize leading-[36px] text-white transition-all duration-200"
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

const DASHES = [
  // Left side
  { top: '52%', left: '3%',  w: 40, opacity: 0.30, depth: 0.8 },
  { top: '60%', left: '7%',  w: 28, opacity: 0.20, depth: 0.5 },
  { top: '72%', left: '2%',  w: 35, opacity: 0.25, depth: 1.0 },
  { top: '80%', left: '9%',  w: 24, opacity: 0.20, depth: 0.6 },
  { top: '88%', left: '5%',  w: 30, opacity: 0.22, depth: 0.7 },
  // Center-left
  { top: '48%', left: '22%', w: 30, opacity: 0.22, depth: 0.4 },
  { top: '56%', left: '18%', w: 22, opacity: 0.18, depth: 0.9 },
  // Center-right
  { top: '50%', right: '20%', w: 26, opacity: 0.20, depth: 0.5 },
  { top: '58%', right: '24%', w: 22, opacity: 0.18, depth: 0.8 },
  // Right side
  { top: '54%', right: '5%',  w: 40, opacity: 0.30, depth: 0.9 },
  { top: '64%', right: '2%',  w: 32, opacity: 0.25, depth: 0.6 },
  { top: '74%', right: '8%',  w: 28, opacity: 0.20, depth: 1.0 },
  { top: '82%', right: '4%',  w: 24, opacity: 0.22, depth: 0.4 },
  { top: '90%', right: '10%', w: 30, opacity: 0.20, depth: 0.7 },
];

function ParallaxDashes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setOffset({
      x: (e.clientX - cx) / cx,
      y: (e.clientY - cy) / cy,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[6] hidden md:block"
    >
      {DASHES.map((dash, i) => {
        const moveX = offset.x * dash.depth * 18;
        const moveY = offset.y * dash.depth * 12;

        return (
          <span
            key={i}
            className="absolute h-[3px] rounded-full bg-[#EC0000] transition-transform duration-[600ms] ease-out"
            style={{
              top: dash.top,
              left: dash.left,
              right: dash.right,
              width: dash.w,
              opacity: dash.opacity,
              transform: `translate(${moveX}px, ${moveY}px)`,
            }}
          />
        );
      })}
    </div>
  );
}

export function PageHeroSection({ hero }: PageHeroSectionProps) {
  if (!hero) return null;

  return (
    <section className="relative overflow-hidden bg-[#FFD8D8]">
      {/* Background image */}
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

      {/* Top gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-35 bg-gradient-to-b from-[#FAFAFA] to-transparent"
      />

      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-50 bg-gradient-to-b from-transparent to-[#f7f5f4]"
      />

      {/* Bottom blur shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-200px] left-1/2 z-[5] hidden h-[713px] w-[2302px] -translate-x-1/2 rounded-full bg-[#FAFAFA] md:block"
        style={{ filter: 'blur(100px)' }}
      />

      {/* Decorative dashes with parallax - rendered by client component */}
      <ParallaxDashes />

      {/* Particle animation */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ParticleLogo className="h-full w-full" />
      </div>

      <div className="relative z-20 px-4 pt-[270px] pb-[80px] md:pt-[250px] md:pb-[80px]">
        <div className="mx-auto max-w-[1200px]">
        {/* Title */}
        <div className="text-center mx-auto max-w-[770px]">
          <FadeUp delay={0} duration={1200} y={20}>
            <h1 className="[font-family:var(--font-manrope)] text-[48px] font-semibold leading-[104%] tracking-[-2px] text-[#202020] md:text-[64px] md:tracking-[-3px] xl:text-[80px] xl:tracking-[-4px]">
              {hero.title}
            </h1>
          </FadeUp>

          {hero.subtitle && (
            <FadeUp delay={120} duration={1200} y={14}>
              <p className="mx-auto mt-4 max-w-[400px] [font-family:var(--font-manrope)] text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[rgba(32,32,32,0.56)]">
                {hero.subtitle}
              </p>
            </FadeUp>
          )}
        </div>

        {/* Card */}
        {hero.card && (
          <div className="mt-[50px]">
            <RevealCard duration={1200} y={36} scale={0.985}>
              <div
                className="relative mx-auto flex w-full max-w-[1011px] flex-col items-center rounded-[20px] border-2 border-white px-6 py-[64px] md:px-[133px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.64)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                {/* Description */}
                <FadeUp delay={180} duration={1200} y={20}>
                  <p
                    className="text-center [font-family:var(--font-manrope)] text-[24px] font-medium leading-[126%] tracking-[-1px] md:text-[32px]"
                    style={{
                      background: 'linear-gradient(95deg, #0D0000 0.71%, #8B8B8B 100.05%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {hero.card.description}
                  </p>
                </FadeUp>

                {/* CTA Button */}
                {hero.card.buttonLabel && (
                  <FadeUp delay={320} duration={1200} y={14}>
                    <CtaButton
                      href={hero.card.buttonHref || '#'}
                      label={hero.card.buttonLabel}
                    />
                  </FadeUp>
                )}

                {/* Floating badges */}
                {hero.showWalletBadge && (
                  <FloatingBadge
                    icon={<WalletIcon />}
                    label="Mobile Wallet"
                    position="left"
                  />
                )}
                {hero.showExtensionBadge && (
                  <FloatingBadge
                    icon={<ExtensionIcon />}
                    label="Browser Extension"
                    position="right"
                  />
                )}
              </div>
            </RevealCard>
          </div>
        )}
      </div>
      </div>
    </section>
  );
}