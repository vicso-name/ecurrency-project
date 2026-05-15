'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function CtaButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex w-[222px] items-center justify-center gap-1 rounded-[100px] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal leading-[36px] text-white capitalize shadow-[0_2px_2px_0_rgba(214,214,214,0.74)] transition-all duration-200 dark:shadow-none"
      style={{
        background: hovered
          ? 'linear-gradient(0deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.10) 100%), linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)'
          : 'linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)',
      }}
    >
      Back To Main Page
    </Link>
  );
}

export function NotFoundSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFD8D8] dark:bg-[#0d0d0d]">
      {/* Background image */}
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

      {/* Top gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-35 bg-gradient-to-b from-[#FAFAFA] to-transparent dark:from-[#0d0d0d]"
      />

      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-50 bg-gradient-to-b from-transparent to-[#f7f5f4] dark:to-[#0d0d0d]"
      />

      {/* 404 background text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
      >
        <span
          className="select-none [font-family:var(--font-manrope)] text-[300px] leading-[104%] font-semibold tracking-[-15px] md:text-[500px] md:tracking-[-25px] lg:text-[691px] lg:tracking-[-34.571px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.00) 86.79%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-20 flex min-h-[600px] flex-col items-center justify-center px-4 py-[120px] md:min-h-[700px] md:py-[160px]">
        <h1 className="mb-8 text-center [font-family:var(--font-manrope)] text-[48px] leading-[104%] font-semibold tracking-[-2px] text-[#202020] md:text-[64px] md:tracking-[-3px] dark:text-[#f0f0f0]">
          Page not Found
        </h1>
        <CtaButton />
      </div>
    </section>
  );
}
