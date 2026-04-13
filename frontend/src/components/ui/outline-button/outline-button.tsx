'use client';

import { useState } from 'react';
import Link from 'next/link';

const BUTTON_GRADIENT =
  'radial-gradient(60.21% 66.41% at 47.91% -7.5%, rgba(240, 88, 88, 0.40) 0%, rgba(255, 255, 255, 0.05) 79.27%, rgba(255, 255, 255, 0) 100%)';
const BUTTON_GRADIENT_HOVER = `${BUTTON_GRADIENT}, rgba(236, 0, 0, 0.04)`;

type OutlineButtonProps = {
  href: string;
  label: string;
  width?: string;
  fullWidth?: boolean;
};

export function OutlineButton({
  href,
  label,
  width = '222px',
  fullWidth = false,
}: OutlineButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`inline-flex min-h-[50px] items-center justify-center gap-1 rounded-[100px] border border-[#DE3737] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal capitalize leading-[36px] text-[#EC0000] shadow-[0_0_7px_rgba(227,64,57,0.20)] transition-all duration-200 ${fullWidth ? 'w-full' : ''}`}
      style={{
        background: hovered ? BUTTON_GRADIENT_HOVER : BUTTON_GRADIENT,
        width: fullWidth ? undefined : width,
      }}
    >
      {label}
    </Link>
  );
}