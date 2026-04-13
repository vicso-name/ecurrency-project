'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { BlogPageSubscribe } from '@/types/strapi/blog-page';
import { FadeUp } from '@/components/ui/fade-up';
import { RevealCard } from '@/components/ui/reveal-card';

type SubscribeSectionProps = {
  data: BlogPageSubscribe | null | undefined;
};

export function SubscribeSection({ data }: SubscribeSectionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hovered, setHovered] = useState(false);

  const showOverlay = status === 'success';

  useEffect(() => {
    if (status !== 'success') return;

    const timer = setTimeout(() => {
      setStatus('idle');
    }, 3000);

    return () => clearTimeout(timer);
  }, [status]);

  if (!data) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || status === 'loading') {
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="mt-12 flex justify-center px-4 md:mt-16">
      <div className="relative w-full max-w-[1011px] pt-[90px] md:pt-[100px]">
        <RevealCard duration={1200} y={36} scale={0.985}>
          <div
            className="relative flex w-full flex-col items-center rounded-[20px] border-2 border-white px-6 pt-[160px] pb-[50px] md:px-[80px]"
            style={{
              background: 'rgba(255, 255, 255, 0.64)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <FadeUp
              delay={80}
              duration={1200}
              y={16}
              className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[42%] md:-translate-y-[46%]"
            >
              <Image
                src="/images/blog/subscribe-coin.png"
                alt=""
                aria-hidden="true"
                width={200}
                height={200}
                unoptimized
                className="h-[140px] w-[140px] md:h-[200px] md:w-[200px]"
              />
            </FadeUp>

            <FadeUp delay={180} duration={1200} y={20}>
              <h2 className="mb-[40px] text-center [font-family:var(--font-manrope)] text-[32px] font-semibold leading-[40px] tracking-[-1px] text-black md:text-[48px] md:leading-[54px]">
                {data.title}
              </h2>
            </FadeUp>

            <div className="relative w-full max-w-[540px]">
              <form
                onSubmit={handleSubmit}
                className={`flex w-full flex-col gap-3 transition-all duration-500 md:flex-row md:items-center ${showOverlay ? 'blur-[3px] opacity-40' : ''}`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') {
                      setStatus('idle');
                    }
                  }}
                  placeholder={data.placeholder || 'Your Email'}
                  required
                  disabled={showOverlay}
                  className="h-[50px] w-full min-w-0 flex-1 rounded-[240px] bg-[#F2F2F2] px-5 py-3 [font-family:var(--font-manrope)] text-[16px] font-semibold leading-[30px] text-black outline-none placeholder:text-[rgba(0,0,0,0.40)]"
                />

                <button
                  type="submit"
                  disabled={status === 'loading' || showOverlay}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className="h-[50px] w-full shrink-0 cursor-pointer rounded-[100px] px-[30px] pt-[6px] pb-[8px] text-center [font-family:var(--font-manrope)] text-[16px] font-normal capitalize leading-[36px] text-white transition-all duration-200 disabled:opacity-70 md:w-auto"
                  style={{
                    background: hovered
                      ? 'linear-gradient(0deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.10) 100%), linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)'
                      : 'linear-gradient(268deg, #E00808 6.31%, #E34039 91.78%)',
                    boxShadow: '0 2px 2px 0 rgba(214, 214, 214, 0.74)',
                  }}
                >
                  {status === 'loading' ? 'Sending...' : data.buttonLabel}
                </button>
              </form>

              {/* Success overlay */}
              <div
                className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-500 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}
              >
                <p className="rounded-[100px] bg-white px-6 py-2 text-center [font-family:var(--font-manrope)] text-[16px] font-semibold text-green-600 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                  ✓ Successfully subscribed!
                </p>
              </div>
            </div>

            {status === 'error' && (
              <p className="mt-4 text-center text-[14px] text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </RevealCard>
      </div>
    </section>
  );
}