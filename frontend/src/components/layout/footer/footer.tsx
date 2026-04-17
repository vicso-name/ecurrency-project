import Link from 'next/link';
import type { GlobalData } from '@/types/strapi/global';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/utils/get-strapi-media-url';

type FooterProps = {
  globalData: GlobalData | null;
};

function FooterContactIcon({ iconType }: { iconType: 'email' | 'location' | 'officeTime' }) {
  if (iconType === 'email') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 7.50586L12.8072 12.0875C12.5631 12.2292 12.2859 12.3039 12.0036 12.3039C11.7213 12.3039 11.4441 12.2292 11.2 12.0875L4 7.50586"
          stroke="#BABABA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.4 5.10547H5.6C4.71634 5.10547 4 5.82181 4 6.70547V16.3055C4 17.1891 4.71634 17.9055 5.6 17.9055H18.4C19.2837 17.9055 20 17.1891 20 16.3055V6.70547C20 5.82181 19.2837 5.10547 18.4 5.10547Z"
          stroke="#BABABA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (iconType === 'location') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18.8002 10.5055C18.8002 14.5 14.3689 18.66 12.8809 19.9449C12.7423 20.0491 12.5735 20.1055 12.4001 20.1055C12.2266 20.1055 12.0579 20.0491 11.9193 19.9449C10.4313 18.66 6 14.5 6 10.5055C6 8.80814 6.67429 7.18026 7.87454 5.98001C9.07479 4.77976 10.7027 4.10547 12.4001 4.10547C14.0975 4.10547 15.7254 4.77976 16.9256 5.98001C18.1259 7.18026 18.8002 8.80814 18.8002 10.5055Z"
          stroke="#BABABA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.4 12.9055C13.7255 12.9055 14.8001 11.831 14.8001 10.5055C14.8001 9.18 13.7255 8.10547 12.4 8.10547C11.0745 8.10547 10 9.18 10 10.5055C10 11.831 11.0745 12.9055 12.4 12.9055Z"
          stroke="#BABABA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M14.4004 13.7051V15.4651L15.6804 16.2651"
        stroke="#BABABA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4004 4.10547V7.30547"
        stroke="#BABABA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4 8.50508V7.30508C18.4 6.88073 18.2314 6.47377 17.9314 6.17371C17.6313 5.87365 17.2243 5.70508 16.8 5.70508H5.6C5.17565 5.70508 4.76869 5.87365 4.46863 6.17371C4.16857 6.47377 4 6.88073 4 7.30508V18.5051C4 18.9294 4.16857 19.3364 4.46863 19.6364C4.76869 19.9365 5.17565 20.1051 5.6 20.1051H8.4"
        stroke="#BABABA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 10.5059H8"
        stroke="#BABABA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 4.10547V7.30547"
        stroke="#BABABA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3996 20.1059C17.0506 20.1059 19.1996 17.9568 19.1996 15.3059C19.1996 12.6549 17.0506 10.5059 14.3996 10.5059C11.7486 10.5059 9.59961 12.6549 9.59961 15.3059C9.59961 17.9568 11.7486 20.1059 14.3996 20.1059Z"
        stroke="#BABABA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer({ globalData }: FooterProps) {
  const contacts = globalData?.footerContacts ?? [];
  const columns = globalData?.footerColumns ?? [];
  const bottomLinks = globalData?.footerBottomLinks ?? [];
  const copyright = globalData?.footerCopyright ?? '';
  const footerLogo = globalData?.footerLogo;
  const footerLogoUrl = getStrapiMediaUrl(footerLogo?.url);
  const siteName = globalData?.siteName || 'eCurrency';
  const disclaimer = globalData?.footerDisclaimer ?? '';

  return (
    <footer className="px-4 pb-4">
      <div className="mx-auto max-w-[1422px] rounded-[20px] bg-white px-[30px] pt-[40px] pr-8 pb-4">
        <div className="mx-auto flex max-w-[1360px] flex-col">
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-16">
            <div className="w-full sm:max-w-[290px]">
              <Link href="/" className="flex items-center">
                {footerLogoUrl ? (
                  <Image
                    src={footerLogoUrl}
                    alt={footerLogo?.alternativeText || siteName}
                    width={133}
                    height={26}
                    className="h-auto w-auto max-w-[133px]"
                  />
                ) : (
                  <>
                    <span className="text-[36px] leading-none text-[#E34039]">●</span>
                    <span className="ml-3 text-[26px] leading-none font-semibold text-black">
                      {siteName}
                    </span>
                  </>
                )}
              </Link>

              <div className="mt-10 flex flex-col gap-5">
                {contacts.map((item) => {
                  const content = (
                    <div className="flex items-start gap-3">
                      <div className="mt-[-2px] flex h-6 w-6 shrink-0 items-center justify-center">
                        <FooterContactIcon iconType={item.iconType} />
                      </div>
                      <span className="text-[16px] font-medium leading-5 tracking-[-0.16px] text-black">
                        {item.label}
                      </span>
                    </div>
                  );

                  return item.href ? (
                    <Link key={item.id} href={item.href} className="block">
                      {content}
                    </Link>
                  ) : (
                    <div key={item.id}>{content}</div>
                  );
                })}
              </div>
            </div>

            <div className="w-full lg:ml-auto lg:max-w-fit lg:pt-[66px]">
              <div className="grid grid-cols-2 gap-x-10 gap-y-10 md:gap-x-16 lg:flex lg:flex-wrap lg:justify-end lg:gap-x-5 lg:gap-y-0">
                {columns.map((column) => (
                  <div key={column.id} className="min-w-0 lg:w-[160px]">
                    <h3 className="mb-6 [font-family:var(--font-roboto-mono)] text-[16px] leading-6 font-normal uppercase text-[rgba(0,0,0,0.16)]">
                      {column.title}
                    </h3>

                    <div className="flex flex-col gap-4">
                      {column.links?.map((link) => (
                        <Link
                          key={link.id}
                          href={link.href || '#'}
                          target={link.targetBlank ? '_blank' : undefined}
                          rel={link.targetBlank ? 'noopener noreferrer' : undefined}
                          className="[font-family:var(--font-roboto)] text-[16px] font-normal leading-5 tracking-[-0.16px] text-black transition-colors duration-200 hover:text-[#E34039]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-[50px] border-t border-b border-[rgba(0,0,0,0.08)] pt-[30px] pb-[30px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-[14px] font-normal leading-5 tracking-[-0.14px] text-[rgba(0,0,0,0.40)]">
                {copyright}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                {bottomLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href || '#'}
                    target={link.targetBlank ? '_blank' : undefined}
                    rel={link.targetBlank ? 'noopener noreferrer' : undefined}
                    className="text-[14px] font-normal leading-5 tracking-[-0.14px] text-[rgba(0,0,0,0.40)] transition-colors duration-200 hover:text-[#E34039]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {disclaimer ? (
            <div className="mt-5 pb-[12px]">
              <p className="whitespace-pre-line text-[12px] font-normal leading-4 tracking-[-0.4px] text-[rgba(0,0,0,0.40)]">
                {disclaimer}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}