"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HomePageBlockchainDesigned } from "@/types/strapi/home-page";
import { getStrapiMediaUrl } from "@/lib/utils/get-strapi-media-url";

type Props = {
  data: HomePageBlockchainDesigned | null | undefined;
};

function ArrowIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(227,64,57,0.14)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="8"
        viewBox="0 0 5 8"
        fill="none"
      >
        <path
          d="M0.5625 7.0625L3.8125 3.8125L0.5625 0.5625"
          stroke="#E34039"
          strokeWidth="1.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function LockIcon() {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.66667 13.3333C7.10869 13.3333 7.53262 13.1577 7.84518 12.8452C8.15774 12.5326 8.33333 12.1087 8.33333 11.6667C8.33333 11.2246 8.15774 10.8007 7.84518 10.4882C7.53262 10.1756 7.10869 10 6.66667 10C6.22464 10 5.80072 10.1756 5.48816 10.4882C5.17559 10.8007 5 11.2246 5 11.6667C5 12.1087 5.17559 12.5326 5.48816 12.8452C5.80072 13.1577 6.22464 13.3333 6.66667 13.3333ZM11.6667 5.83333C12.1087 5.83333 12.5326 6.00893 12.8452 6.32149C13.1577 6.63405 13.3333 7.05797 13.3333 7.5V15.8333C13.3333 16.2754 13.1577 16.6993 12.8452 17.0118C12.5326 17.3244 12.1087 17.5 11.6667 17.5H1.66667C1.22464 17.5 0.800716 17.3244 0.488155 17.0118C0.175595 16.6993 0 16.2754 0 15.8333V7.5C0 7.05797 0.175595 6.63405 0.488155 6.32149C0.800716 6.00893 1.22464 5.83333 1.66667 5.83333H2.5V4.16667C2.5 3.0616 2.93899 2.00179 3.72039 1.22039C4.50179 0.438987 5.5616 0 6.66667 0C7.21384 0 7.75566 0.107774 8.26118 0.317169C8.7667 0.526563 9.22603 0.833478 9.61294 1.22039C9.99985 1.6073 10.3068 2.06663 10.5162 2.57215C10.7256 3.07768 10.8333 3.61949 10.8333 4.16667V5.83333H11.6667ZM6.66667 1.66667C6.00362 1.66667 5.36774 1.93006 4.8989 2.3989C4.43006 2.86774 4.16667 3.50363 4.16667 4.16667V5.83333H9.16667V4.16667C9.16667 3.50363 8.90327 2.86774 8.43443 2.3989C7.96559 1.93006 7.32971 1.66667 6.66667 1.66667Z"
        fill="#F3A5A2"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.99908 16.2003L5.49908 12.7003C5.40756 12.6076 5.29856 12.5341 5.1784 12.4839C5.05824 12.4337 4.92931 12.4078 4.79908 12.4078C4.66886 12.4078 4.53993 12.4337 4.41976 12.4839C4.2996 12.5341 4.1906 12.6076 4.09908 12.7003C4.00644 12.7918 3.93289 12.9008 3.88269 13.0209C3.83249 13.1411 3.80664 13.27 3.80664 13.4003C3.80664 13.5305 3.83249 13.6594 3.88269 13.7796C3.93289 13.8997 4.00644 14.0087 4.09908 14.1003L8.28908 18.2903C8.67908 18.6803 9.30908 18.6803 9.69908 18.2903L20.2991 7.70025C20.3917 7.60873 20.4653 7.49973 20.5155 7.37957C20.5657 7.25941 20.5915 7.13048 20.5915 7.00025C20.5915 6.87003 20.5657 6.7411 20.5155 6.62094C20.4653 6.50078 20.3917 6.39177 20.2991 6.30025C20.2076 6.20761 20.0986 6.13406 19.9784 6.08386C19.8582 6.03366 19.7293 6.00781 19.5991 6.00781C19.4689 6.00781 19.3399 6.03366 19.2198 6.08386C19.0996 6.13406 18.9906 6.20761 18.8991 6.30025L8.99908 16.2003Z"
        fill="#EC0000"
      />
    </svg>
  );
}

function ECurrencyLogo() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M24.8192 14.7198C24.4027 15.1452 23.9724 15.2725 22.4761 15.2725C20.7154 15.2725 20.6431 15.2614 20.6431 15.2614H15.8181C15.1266 16.2543 13.993 16.9027 12.7105 16.9027C10.6047 16.9027 8.89766 15.1568 8.89766 13.0025C8.89766 10.8478 10.6048 9.10143 12.7105 9.10143C13.964 9.10143 15.0762 9.72054 15.7712 10.6759H20.6049C19.6057 7.19966 16.4596 4.65436 12.7427 4.65436C8.22472 4.65436 4.54938 8.41475 4.54938 13.0367C4.54938 17.6591 8.22472 21.4192 12.7427 21.4192C15.0376 21.4192 17.1151 20.4488 18.6037 18.8879C18.6037 18.8879 20.2924 18.8758 21.8835 18.8758C21.9506 18.8758 22.4666 18.8758 22.5272 18.8758C23.4935 18.8758 23.6467 19.6689 23.2998 20.1651C23.2614 20.2197 23.1366 20.4183 23.0939 20.4805C22.3822 21.5246 22.0615 21.882 21.1668 22.7004C18.9184 24.755 15.954 26.0049 12.7093 26.0049C5.70106 26.005 0 20.1724 0 13.0029C0 5.83333 5.70106 0 12.7092 0C19.7168 0 25.4184 5.83333 25.4184 13.0029C25.4184 13.5757 25.2924 14.2368 24.8192 14.7198Z"
        fill="#EC0000"
      />
    </svg>
  );
}

function ConnectorDot() {
  return (
    <span className="z-10 h-[14px] w-[14px] rounded-full border border-[rgba(227,64,57,0.34)] bg-white shadow-[0_4px_16px_rgba(255,157,157,0.26)] dark:bg-[#171717]" />
  );
}

function BlockchainDesignedFirstTabPreview() {
  return (
    <div className="relative flex h-[562px] w-full max-w-[492px] items-center justify-center overflow-hidden rounded-[16px] border border-[rgba(227,64,57,0.30)] bg-[radial-gradient(80.05%_147.57%_at_50%_-11.11%,rgba(0,0,0,0)_60%,rgba(255,80,80,0.05)_89.8%)] px-4 dark:bg-[#070707] dark:bg-[radial-gradient(80.05%_147.57%_at_50%_-11.11%,rgba(227,64,57,0.12)_0%,rgba(7,7,7,0.96)_62%,rgba(227,64,57,0.10)_100%)]">
      <div className="pointer-events-none absolute right-[-60px] bottom-[-40px] h-[360px] w-[360px] opacity-60 [background-image:radial-gradient(rgba(236,0,0,0.22)_1px,transparent_1px)] [background-size:10px_10px] dark:opacity-30" />

      <div className="relative flex w-full max-w-[354px] flex-col items-center">
        <div className="z-10 h-[103px] w-full rounded-[8px] bg-[linear-gradient(325deg,#fafafa_0%,#fff_100%)] p-3 shadow-[0_12px_16px_rgba(227,64,57,0)] dark:bg-[linear-gradient(325deg,#111_0%,#1b1b1b_100%)]">
          <div className="mb-[15px] flex gap-[6px]">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-[10px] w-[10px] rounded-full bg-[#f2f2f2] dark:bg-[rgba(255,255,255,0.14)]"
              />
            ))}
          </div>

          <div className="flex h-[45px] w-full items-center gap-4 rounded-[10px] bg-[rgba(252,98,98,0.10)] px-3 dark:bg-[rgba(236,0,0,0.14)]">
            <LockIcon />
            <span className="truncate text-[15px] leading-[135%] font-normal tracking-[-0.02em] text-[#F3A5A2]">
              https://e-currency.neywork/docs
            </span>
          </div>
        </div>

        <ConnectorDot />
        <div className="h-[53px] w-px bg-[linear-gradient(180deg,rgba(227,64,57,0.18),rgba(236,0,0,0.42))]" />

        <div className="z-20 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#EC0000] bg-white shadow-[0_0_10px_rgba(227,64,57,0.40),0_0_110px_rgba(243,165,162,0.80)] dark:bg-[#101010] dark:shadow-[0_0_12px_rgba(236,0,0,0.45),0_0_90px_rgba(236,0,0,0.22)]">
          <CheckIcon />
        </div>

        <div className="h-[53px] w-px bg-[linear-gradient(180deg,rgba(236,0,0,0.42),rgba(227,64,57,0.18))]" />
        <ConnectorDot />

        <div className="relative z-10 h-[194px] w-full rounded-[8px] bg-[linear-gradient(180deg,rgba(255,234,234,0.24)_0%,rgba(255,199,199,0.14)_50%,#fff_100%)] p-px dark:bg-[linear-gradient(180deg,rgba(236,0,0,0.18)_0%,rgba(236,0,0,0.08)_50%,rgba(255,255,255,0.04)_100%)]">
          <div className="pointer-events-none absolute top-0 left-1/2 h-[27px] w-[207px] -translate-x-1/2 bg-[radial-gradient(68.35%_48.05%_at_50%_50%,#fff_40.73%,#fdbdbd_59.8%,rgba(244,93,93,0.7)_66.86%,rgba(255,237,236,0.5)_80.35%,rgba(255,255,255,0)_95.77%)] blur-[1px] dark:opacity-50" />
          <div className="relative h-[189px] w-full rounded-[8px] bg-[#fafafa] p-[15px] shadow-[0_3px_16px_rgba(227,64,57,0.20)] dark:bg-[#111111] dark:shadow-[0_3px_16px_rgba(236,0,0,0.16)]">
            <div className="mb-[17px] flex items-center gap-[15px]">
              <ECurrencyLogo />
              <p className="max-w-[222px] text-[15px] leading-[135%] font-normal tracking-[-0.02em] text-black [font-family:var(--third-family)] dark:text-white">
                eCurrency: The Programmable Payment Blockchain
              </p>
            </div>

            <div className="rounded-[8px] bg-[rgba(245,245,245,0.54)] px-[15px] py-[12px] dark:bg-[rgba(255,255,255,0.06)]">
              <div className="mb-[9px] flex items-center justify-between gap-3">
                <div className="flex items-center gap-[6px] text-[13px] leading-none font-normal text-black dark:text-white">
                  <span className="h-[10px] w-[10px] rounded-tl-[8px] bg-[#EC0000] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
                  <span>USD</span>
                </div>
                <div className="flex items-center gap-[5px] text-[11px] leading-none text-[rgba(0,0,0,0.72)] dark:text-[rgba(255,255,255,0.70)]">
                  <span>2021-06-09 23:34:42</span>
                  <span className="text-[16px] leading-none">›</span>
                </div>
              </div>

              <div className="mb-[9px] flex items-center justify-between gap-3">
                <span className="text-[11px] leading-none font-semibold text-[rgba(0,0,0,0.72)] dark:text-[rgba(255,255,255,0.78)]">
                  Limit order
                </span>
                <span className="flex h-[13px] w-[39px] items-center justify-center rounded-[2px] bg-[rgba(236,0,0,0.20)] px-[3px] py-[6px] text-[6px] leading-[127%] font-semibold text-[#EC0000] [font-family:var(--third-family)] dark:bg-[rgba(236,0,0,0.24)]">
                  Executed
                </span>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-[7px] text-[11px] leading-none text-[rgba(0,0,0,0.70)] dark:text-[rgba(255,255,255,0.64)]">
                <span>Total</span>
                <span className="text-right text-[rgba(0,0,0,0.78)] dark:text-[rgba(255,255,255,0.78)]">
                  2,662.00329402
                </span>
                <span>Amount</span>
                <span className="text-right text-[rgba(0,0,0,0.78)] dark:text-[rgba(255,255,255,0.78)]">
                  492
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const secondTabCards = [
  {
    text: "Micropayments for digital content and APIs",
    className: "top-[22px] left-[14px] w-[283px] h-[130px]",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M34.0038 17.1523H27.9264V27.3524H26.6889V22.3977H20.6187V27.3524H19.3812V19.7395H13.311V27.3524H12.0735V23.1641H5.99611V27.3524H2V28.1094H37.9999V27.3524H34.0038L34.0038 17.1523Z"
          fill="#EC0000"
        />
        <path
          d="M30.9688 14.1638C31.5406 14.1638 32.0563 13.8193 32.2766 13.2896C32.4946 12.7623 32.375 12.1529 31.9696 11.7474C31.5641 11.342 30.9547 11.2224 30.425 11.4404C29.8977 11.6607 29.5532 12.1764 29.5532 12.7482C29.5508 12.9451 29.593 13.1396 29.6727 13.3177L24.4532 17.5787C23.8368 17.1592 23.0001 17.2904 22.543 17.8787L17.7431 16.0131C17.7477 15.9638 17.7477 15.917 17.7431 15.8678C17.7501 15.4576 17.5767 15.0639 17.2696 14.7896C16.9626 14.5177 16.5501 14.3912 16.1423 14.4451C15.7345 14.499 15.3712 14.7263 15.1462 15.0709C14.9188 15.4131 14.8532 15.8396 14.9657 16.2357L10.0274 19.1514C9.53756 18.699 8.79458 18.6545 8.25321 19.0436C7.70946 19.4326 7.51491 20.1474 7.78446 20.7592C8.05401 21.371 8.71493 21.7084 9.36881 21.5678C10.0204 21.4295 10.4868 20.8506 10.4845 20.1827C10.4821 20.0514 10.4634 19.9202 10.4235 19.7936L15.343 16.8897C15.6079 17.1428 15.9617 17.2858 16.3274 17.2858C16.7797 17.2928 17.2063 17.0819 17.4735 16.721L22.2735 18.5819C22.2712 18.6382 22.2712 18.6968 22.2735 18.7554C22.2735 19.5382 22.9087 20.171 23.6891 20.171C24.472 20.171 25.1071 19.5382 25.1071 18.7554C25.1071 18.5468 25.0626 18.3429 24.9735 18.1554L30.1813 13.9015C30.411 14.0655 30.6852 14.1591 30.9688 14.1638Z"
          fill="#EC0000"
        />
      </svg>
    ),
  },
  {
    text: "Usage-based digital services",
    className: "top-[136px] right-[66px] w-[283px] h-[130px]",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.3812 32.9602C20.5734 32.7855 21.8335 31.9803 22.1704 30.7278L24.8749 20.6618C25.1231 19.735 23.8463 19.0011 23.1823 19.6735L15.8892 27.0696C14.5126 28.4689 14.9451 31.3177 16.9538 32.4947C17.683 32.9196 18.5341 33.0831 19.3673 32.9602L19.3812 32.9602ZM19.0055 29.85C18.8447 29.9003 18.6701 29.8835 18.5217 29.8038C18.2181 29.6249 18.1142 29.2321 18.2888 28.9232C18.3942 28.7359 18.5869 28.6143 18.8017 28.6003C19.0152 28.5863 19.2218 28.6828 19.3521 28.8547C19.481 29.0266 19.5157 29.2531 19.445 29.4572C19.3743 29.6613 19.2065 29.815 18.9986 29.8681L19.0055 29.85ZM20.2296 30.0359C19.786 30.8089 18.8059 31.0731 18.0393 30.6272C17.6719 30.4133 17.403 30.0596 17.2921 29.6459C17.1826 29.2307 17.2408 28.7904 17.4543 28.4185C17.78 27.8538 18.4108 27.5407 19.054 27.626C19.6972 27.7112 20.2268 28.1781 20.3959 28.8086C20.5068 29.2237 20.4486 29.6654 20.2323 30.0359H20.2296ZM24.4633 14.7419L28.5196 10.6588C26.1546 9.01072 23.3667 8.08674 20.4918 8.00007V13.6223C21.8836 13.6936 23.2435 14.0766 24.4704 14.742L24.4633 14.7419ZM10.9778 20.4171H5.23871C4.73272 23.2464 5.03493 26.1639 6.10926 28.8267L6.2867 28.8798L10.9569 25.8674C10.4607 24.0823 10.4607 22.1951 10.9569 20.4101L10.9778 20.4171ZM28.7219 19.4442C28.0149 17.7486 26.8352 16.2962 25.3256 15.2645L29.2999 11.2458C31.9019 13.3174 33.7497 16.2013 34.5525 19.4442H28.7219ZM34.791 20.4171H29.0452C29.5401 22.2022 29.5401 24.0894 29.0452 25.8744L33.7654 28.9022L33.868 28.87C33.8791 28.8574 33.8874 28.8435 33.893 28.8267C34.9645 26.1624 35.2668 23.2463 34.7621 20.4171L34.791 20.4171ZM14.6792 15.2648C13.1752 16.2992 11.9982 17.7502 11.294 19.4445H5.45231C6.25494 16.2014 8.10284 13.3177 10.7049 11.2461L14.6792 15.2648ZM11.4853 10.6588L15.5416 14.7419C16.7698 14.0765 18.1284 13.6935 19.5202 13.6222V8C16.6437 8.08527 13.8531 9.00933 11.4853 10.6588Z"
          fill="#EC0000"
        />
      </svg>
    ),
  },
  {
    text: "Automated revenue sharing between multiple participants",
    className: "top-[260px] left-[60px] w-[283px] h-[157px]",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M19.5924 23.8142V22.9625H18.8448C18.6186 22.9625 18.436 22.7799 18.436 22.5537C18.436 22.3275 18.6186 22.1448 18.8448 22.1448H20.0001C20.4634 22.1436 20.8384 21.7686 20.8384 21.3041V21.24C20.8384 20.7767 20.4634 20.4005 20.0001 20.3993C19.0856 20.3993 18.344 19.6577 18.3428 18.7432V18.6791C18.344 17.9218 18.8569 17.2613 19.5912 17.0738V16.1702C19.5972 15.95 19.7787 15.7734 20.0001 15.7734C20.2214 15.7734 20.4017 15.95 20.4089 16.1702V17.023H21.1553H21.1541C21.2654 17.0194 21.3718 17.0617 21.4505 17.1379C21.5303 17.2153 21.5751 17.3206 21.5751 17.4319C21.5751 17.542 21.5303 17.6472 21.4505 17.7246C21.3718 17.802 21.2654 17.8432 21.1541 17.8395H20.0001C19.5379 17.8408 19.163 18.2157 19.1618 18.6778V18.742C19.1618 19.2053 19.5367 19.5815 20.0001 19.5827C20.9146 19.5839 21.6549 20.3254 21.6561 21.2399V21.3041C21.6549 22.0613 21.142 22.723 20.409 22.9105V23.8142C20.4114 23.9242 20.3702 24.0319 20.2928 24.1105C20.2154 24.1904 20.1102 24.2339 20.0001 24.2339C19.89 24.2339 19.7835 24.1904 19.7073 24.1105C19.6299 24.0319 19.5888 23.9242 19.5912 23.8142L19.5924 23.8142ZM18.3985 29.8346C18.1735 29.8346 17.9896 30.0173 17.9896 30.2435V31.3503C15.4275 30.8955 13.0951 29.5866 11.3702 27.6379C9.64642 25.6891 8.63148 23.2142 8.48996 20.6156C8.47907 20.3991 8.30004 20.2285 8.0823 20.2285H6.58107L7.08671 19.8269L7.0855 19.8281C7.1726 19.7604 7.22825 19.6624 7.24155 19.5535C7.25486 19.4447 7.22341 19.3358 7.15567 19.2499C7.08793 19.164 6.98873 19.1096 6.87986 19.0975C6.77099 19.0866 6.66212 19.118 6.57744 19.1882L5.15484 20.3168C5.05685 20.3942 5 20.5116 5 20.6362C5 20.7608 5.05685 20.8793 5.15484 20.9567L6.57744 22.0854C6.66212 22.1567 6.77099 22.1906 6.88107 22.1785C6.99115 22.1676 7.09156 22.1132 7.1593 22.0261C7.22825 21.9402 7.2597 21.8301 7.24518 21.72C7.23067 21.6112 7.17381 21.512 7.08551 21.4454L6.58107 21.0462H7.70124C7.94076 23.843 9.12505 26.474 11.0594 28.5064C12.9937 30.5399 15.5618 31.8546 18.343 32.2334C18.3612 32.2358 18.3793 32.237 18.3975 32.237C18.6237 32.237 18.8063 32.0543 18.8063 31.8281V30.2434C18.8063 30.0172 18.6237 29.8346 18.3975 29.8346L18.3985 29.8346ZM8.167 18.806H9.75651C9.98272 18.806 10.1654 18.6234 10.1654 18.3972C10.1654 18.1722 9.98272 17.9895 9.75651 17.9895H8.64359C9.096 15.4238 10.4037 13.0867 12.3548 11.3605C14.306 9.63311 16.7835 8.61817 19.3854 8.48027C19.6019 8.46938 19.7725 8.28914 19.7725 8.07261V6.58107L20.1741 7.08672L20.1729 7.08551C20.2382 7.17745 20.3386 7.23793 20.4499 7.25244C20.56 7.26817 20.6725 7.23793 20.7608 7.16776C20.8479 7.0976 20.9036 6.99478 20.9132 6.88349C20.9229 6.7722 20.8866 6.66091 20.8116 6.57744L19.683 5.15484C19.6056 5.05685 19.4882 5 19.3637 5C19.2391 5 19.1205 5.05685 19.0431 5.15484L17.9145 6.57744C17.7814 6.75405 17.8128 7.00566 17.987 7.14356C18.16 7.28147 18.4116 7.25486 18.5544 7.0855L18.9536 6.58106V7.69033C16.1544 7.92743 13.5197 9.11293 11.4851 11.0497C9.45039 12.9864 8.13683 15.5593 7.7618 18.3442C7.74608 18.4603 7.78116 18.5789 7.85858 18.6672C7.93721 18.7555 8.04845 18.806 8.167 18.806ZM31.832 21.1927L30.2437 21.1939C30.0175 21.1939 29.8348 21.3766 29.8348 21.6028C29.8348 21.8278 30.0175 22.0105 30.2437 22.0105H31.3554C30.8981 24.5726 29.5892 26.9049 27.6392 28.6274C25.6892 30.3512 23.2142 31.3637 20.6157 31.5028C20.3992 31.5149 20.2286 31.6939 20.2286 31.9117V33.4189L19.827 32.9133L19.8282 32.9145C19.7617 32.8262 19.6625 32.7681 19.5536 32.7548C19.4435 32.7403 19.3335 32.7718 19.2476 32.8395C19.1605 32.9084 19.106 33.0088 19.0951 33.1189C19.083 33.2278 19.1169 33.3379 19.1883 33.4226L20.3169 34.8452C20.3943 34.9431 20.5117 35 20.6363 35C20.7609 35 20.8794 34.9431 20.9568 34.8452L22.0855 33.4226C22.1568 33.3379 22.1907 33.2278 22.1786 33.1189C22.1677 33.0088 22.1133 32.9084 22.0262 32.8395C21.9403 32.7718 21.8302 32.7403 21.7201 32.7548C21.6113 32.7681 21.5121 32.8262 21.4455 32.9145L21.0463 33.4189V32.2927C23.8419 32.0544 26.4741 30.8714 28.5077 28.9383C30.5424 27.0052 31.8572 24.4371 32.2372 21.6571C32.2529 21.5398 32.2166 21.4224 32.1392 21.3329C32.0618 21.2446 31.9493 21.1938 31.8319 21.1938L31.832 21.1927ZM34.8453 19.0419L33.4227 17.9133C33.338 17.8419 33.2292 17.8093 33.1191 17.8201C33.009 17.831 32.9086 17.8867 32.8409 17.9726C32.7719 18.0585 32.7405 18.1697 32.755 18.2786C32.7695 18.3875 32.8263 18.4867 32.9147 18.5532L33.4191 18.9536H32.3013C32.0667 16.1544 30.8836 13.5197 28.9481 11.4839C27.0126 9.4492 24.4395 8.13563 21.6561 7.76061C21.54 7.74489 21.4227 7.77997 21.3344 7.85739C21.2448 7.93481 21.194 8.0461 21.194 8.16343V9.75658C21.194 9.98279 21.3767 10.1654 21.6029 10.1654C21.8279 10.1654 22.0106 9.98278 22.0106 9.75658V8.64003C24.5763 9.09244 26.9122 10.4013 28.6371 12.3525C30.3633 14.3037 31.3758 16.7824 31.5112 19.3831C31.5221 19.6008 31.7024 19.7702 31.9189 19.7702H33.4189L32.9133 20.1718H32.9145C32.8262 20.2383 32.7681 20.3375 32.7548 20.4464C32.7403 20.5565 32.7718 20.6666 32.8395 20.7525C32.9084 20.8395 33.0088 20.894 33.1189 20.9049C33.2278 20.9158 33.3379 20.8831 33.4226 20.8117L34.8452 19.6831C34.9431 19.6057 35 19.4871 35 19.3625C35 19.2379 34.9431 19.1206 34.8452 19.0432L34.8453 19.0419ZM25.0579 18.2218L26.0922 17.9447L26.3075 17.1706C26.3462 17.0302 26.4563 16.9226 26.5966 16.8851L27.9164 16.5318C26.7406 13.8331 24.2705 11.9204 21.3648 11.4571C18.458 10.9926 15.5147 12.0426 13.5588 14.2418L14.4176 15.1019L15.1942 14.9035C15.3346 14.8672 15.4834 14.9071 15.585 15.01L16.5055 15.9306C17.8495 14.7753 19.676 14.358 21.3879 14.8164C23.0984 15.2749 24.4726 16.5487 25.0582 18.2216L25.0579 18.2218ZM15.1736 15.7516L14.3958 15.9524C14.2555 15.9887 14.1067 15.9488 14.0039 15.8459L13.0398 14.8806C11.2966 17.2479 10.878 20.3412 11.9293 23.0871C12.9817 25.8331 15.3587 27.8546 18.2377 28.452L18.5498 27.2834L17.9873 26.71C17.8857 26.606 17.847 26.4572 17.8845 26.3181L18.2256 25.0467C16.5575 24.4612 15.2861 23.0894 14.8275 21.3826C14.3679 19.6745 14.7816 17.8504 15.9308 16.5076L15.1736 15.7516ZM19.0496 28.5803C21.9709 28.9057 24.8573 27.7215 26.7091 25.4399C28.5624 23.1584 29.1285 20.0908 28.2104 17.2987L27.0321 17.6132L26.8168 18.3874C26.7781 18.5266 26.6692 18.6342 26.5289 18.6717L25.2684 19.0092V19.0104C25.5914 20.7475 25.0362 22.5318 23.7866 23.7813C22.5369 25.0297 20.7515 25.5825 19.0144 25.2583L18.7338 26.3047L19.2975 26.8793C19.3979 26.9821 19.4378 27.1309 19.4003 27.2712L19.0496 28.5803Z"
          fill="#EC0000"
        />
      </svg>
    ),
  },
  {
    text: "Machine-to-machine economic interactions",
    className: "right-[28px] bottom-[22px] w-[283px] h-[130px]",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M17.2497 6.3875C17.5012 7.17186 18.2372 7.75159 19.0934 7.75159C20.1294 7.75159 20.9419 6.91094 20.9059 5.87501C20.87 4.84377 19.9981 4 18.9622 4C18.0215 4 17.2699 4.7 17.1699 5.60781C9.9619 6.52814 4.75266 12.6515 5.00907 19.9999C5.01688 20.2155 5.19657 20.3921 5.41375 20.3921C5.62937 20.3921 5.79813 20.2155 5.79032 19.9999C5.545 13.0639 10.4496 7.2763 17.2497 6.3875Z"
          fill="#EC0000"
        />
        <path
          d="M34.0347 19.9996C34.0268 19.784 33.8472 19.6074 33.63 19.6074C33.4144 19.6074 33.2456 19.784 33.2534 19.9996C33.4972 26.9357 28.5942 32.7233 21.7941 33.6121C21.5426 32.8277 20.8066 32.248 19.9504 32.248C18.9144 32.248 18.1019 33.0887 18.1379 34.1246C18.1738 35.1558 19.0457 35.9996 20.0816 35.9996C21.0223 35.9996 21.7739 35.2996 21.8739 34.3918C29.0819 33.4715 34.2911 27.3481 34.0347 19.9996Z"
          fill="#EC0000"
        />
        <path
          d="M20.8657 29.1999C21.2016 29.1999 21.4813 28.9592 21.5344 28.6311L21.9829 25.8717C22.4876 25.667 22.9672 25.3998 23.4063 25.0764L25.9939 26.0608C26.3017 26.1764 26.6501 26.053 26.8142 25.7655L28.1626 23.4373C28.3314 23.1498 28.2626 22.7858 28.0033 22.578L25.9986 20.942C26.0704 20.5576 26.1064 20.1623 26.1064 19.7655C26.1064 19.5139 26.0908 19.2608 26.0626 19.0092L28.0033 17.4248C28.2627 17.217 28.3314 16.853 28.1627 16.5655L26.8142 14.2373C26.6501 13.9498 26.3017 13.8249 25.9939 13.942L23.8142 14.7733C23.2423 14.2779 22.5985 13.8936 21.8985 13.6248L21.5345 11.3686C21.4813 11.0404 21.2017 10.7998 20.8657 10.7998H18.1782C17.8422 10.7998 17.5625 11.0404 17.5094 11.3686L17.1453 13.6248C16.4453 13.8936 15.8016 14.2764 15.2297 14.7733L13.05 13.942C12.7422 13.8264 12.3937 13.9498 12.2297 14.2373L10.8812 16.5655C10.7125 16.853 10.7812 17.217 11.0406 17.4248L12.9812 19.0092C12.9531 19.2608 12.9375 19.5139 12.9375 19.7655C12.9375 20.1608 12.9734 20.5577 13.0453 20.942L11.0406 22.578C10.7812 22.7858 10.7125 23.1498 10.8812 23.4373L12.2297 25.7655C12.3937 26.053 12.7422 26.1779 13.05 26.0608L15.6375 25.0764C16.0782 25.3998 16.5579 25.6686 17.061 25.8717L17.5094 28.6311C17.5626 28.9592 17.8423 29.1999 18.1782 29.1999H20.8657ZM19.5219 16.2718C21.5782 16.2718 23.25 17.9437 23.25 19.9999C23.25 22.0562 21.5782 23.7281 19.5219 23.7281C17.4656 23.7281 15.7938 22.0562 15.7938 19.9999C15.7938 17.9437 17.4656 16.2718 19.5219 16.2718Z"
          fill="#EC0000"
        />
      </svg>
    ),
  },
];

function BlockchainDesignedSecondTabPreview() {
  return (
    <div className="relative h-[562px] w-full max-w-[492px] overflow-hidden rounded-[16px] border border-[rgba(227,64,57,0.30)] bg-[radial-gradient(80.05%_147.57%_at_50%_-11.11%,rgba(0,0,0,0)_60%,rgba(255,80,80,0.05)_89.8%)] dark:bg-[#070707] dark:bg-[radial-gradient(80.05%_147.57%_at_50%_-11.11%,rgba(227,64,57,0.12)_0%,rgba(7,7,7,0.96)_62%,rgba(227,64,57,0.10)_100%)]">
      <div className="pointer-events-none absolute right-[-70px] bottom-[-38px] h-[430px] w-[430px] opacity-60 [background-image:radial-gradient(rgba(236,0,0,0.22)_1px,transparent_1px)] [background-size:10px_10px] dark:opacity-30" />

      <div className="relative hidden h-full w-full lg:block">
        {secondTabCards.map((card) => (
          <div
            key={card.text}
            className={`absolute rounded-[8px] bg-[#fafafa] px-6 py-[18px] shadow-[0_3px_16px_rgba(227,64,57,0.20)] dark:bg-[#111111] dark:shadow-[0_3px_16px_rgba(236,0,0,0.16)] ${card.className}`}
          >
            <div className="h-10 w-10">{card.icon}</div>
            <p className="text-[18px] leading-[150%] font-semibold tracking-[-0.02em] text-black [font-family:var(--font-family)] dark:text-white">
              {card.text}
            </p>
          </div>
        ))}
      </div>

      <div className="relative flex h-full flex-col justify-center p-4 lg:hidden">
        {secondTabCards.map((card, index) => (
          <div
            key={card.text}
            className={`rounded-[8px] bg-[#fafafa] px-6 py-[18px] shadow-[0_3px_16px_rgba(227,64,57,0.20)] dark:bg-[#111111] dark:shadow-[0_3px_16px_rgba(236,0,0,0.16)] ${
              index % 2 === 0 ? "mr-auto w-[88%]" : "ml-auto w-[88%]"
            }`}
          >
            <div className="mb-1 h-10 w-10">{card.icon}</div>
            <p className="text-[17px] leading-[145%] font-semibold tracking-[-0.02em] text-black [font-family:var(--font-family)] dark:text-white">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlockchainDesignedSection({ data }: Props) {
  const tabs = useMemo(() => {
    return [...(data?.tabs ?? [])].sort((a, b) => a.tabNumber - b.tabNumber);
  }, [data?.tabs]);

  const links = data?.links ?? [];
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  if (!tabs.length) {
    return null;
  }

  const currentTab = tabs[activeTabIndex];
  const isFirstTabActive = activeTabIndex === 0;
  const isSecondTabActive = activeTabIndex === 1;

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-start gap-y-14 gap-x-16 lg:grid-cols-[1fr_492px]">
          <div className="flex flex-col items-center text-center">
            <div className="mb-14 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setActiveTabIndex(0)}
                className="relative z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full"
                aria-label="Show first tab"
                aria-pressed={isFirstTabActive}
              >
                <span
                  className={`flex h-[45px] w-[45px] items-center justify-center rounded-full border text-[15px] font-semibold transition-all duration-200 ${
                    isFirstTabActive
                      ? "border-[rgba(227,64,57,0.12)] bg-white text-[#EC0000] shadow-[0_4px_18px_rgba(227,64,57,0.18)] dark:bg-[#1e1e1e]"
                      : "border-[rgba(227,64,57,0.08)] bg-white text-[#F6AFAF] dark:bg-[#1e1e1e]"
                  }`}
                >
                  1
                </span>
              </button>

              <div className="mx-[-6px] flex w-[215px] shrink-0 justify-center">
                <Image
                  src={
                    isFirstTabActive
                      ? "/images/home/1_active.svg"
                      : "/images/home/2_active.svg"
                  }
                  alt=""
                  aria-hidden="true"
                  width={185}
                  height={21}
                  className="block h-[21px] w-[185px]"
                />
              </div>

              <button
                type="button"
                onClick={() => setActiveTabIndex(1)}
                className="relative z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full"
                aria-label="Show second tab"
                aria-pressed={!isFirstTabActive}
              >
                <span
                  className={`flex h-[45px] w-[45px] items-center justify-center rounded-full border text-[15px] font-semibold transition-all duration-200 ${
                    !isFirstTabActive
                      ? "border-[rgba(227,64,57,0.12)] bg-white text-[#EC0000] shadow-[0_4px_18px_rgba(227,64,57,0.18)] dark:bg-[#1e1e1e]"
                      : "border-[rgba(227,64,57,0.08)] bg-white text-[#F6AFAF] dark:bg-[#1e1e1e]"
                  }`}
                >
                  2
                </span>
              </button>
            </div>

            <div className="mx-auto max-w-[400px]">
              <h3 className="text-center text-[28px] leading-[32px] font-medium tracking-[-1.5px] text-black md:text-[32px] md:leading-[36px] dark:text-white">
                {currentTab.title}
              </h3>

              <p className="mt-10 whitespace-pre-line text-[16px] leading-[22px] font-normal tracking-[-0.4px] text-[rgba(0,0,0,0.36)] dark:text-[rgba(255,255,255,0.50)]">
                {currentTab.description}
              </p>

              {currentTab.learnMoreLabel ? (
                <div className="mt-10 flex justify-center">
                  <Link
                    href={currentTab.learnMoreHref || "#"}
                    className="group inline-flex items-center gap-[10px] text-[16px] leading-5 font-normal text-[#E34039] transition-opacity duration-200 hover:opacity-80"
                  >
                    <span>{currentTab.learnMoreLabel}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-[2px]">
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            {isFirstTabActive ? <BlockchainDesignedFirstTabPreview /> : null}
            {isSecondTabActive ? <BlockchainDesignedSecondTabPreview /> : null}

            {!isFirstTabActive &&
            !isSecondTabActive &&
            currentTab.previewImage ? (
              <div className="relative flex h-[562px] w-full max-w-[492px] items-center justify-center rounded-[16px] border border-[rgba(227,64,57,0.30)] bg-[radial-gradient(80.05%_147.57%_at_50%_-11.11%,rgba(0,0,0,0)_60%,rgba(255,80,80,0.05)_89.8%)] px-6 dark:bg-[#070707] dark:bg-[radial-gradient(80.05%_147.57%_at_50%_-11.11%,rgba(227,64,57,0.12)_0%,rgba(7,7,7,0.96)_62%,rgba(227,64,57,0.10)_100%)]">
                <Image
                  src={getStrapiMediaUrl(currentTab.previewImage.url)}
                  alt={currentTab.previewImage.alternativeText || ""}
                  width={353}
                  height={397}
                  unoptimized
                  className="h-auto w-auto max-w-full"
                />
              </div>
            ) : null}

            {!isFirstTabActive &&
            !isSecondTabActive &&
            currentTab.featureCards &&
            currentTab.featureCards.length > 0 ? (
              <div className="flex w-full max-w-[492px] flex-col gap-4 rounded-[16px] border border-[rgba(227,64,57,0.30)] bg-[radial-gradient(80.05%_147.57%_at_50%_-11.11%,rgba(0,0,0,0)_60%,rgba(255,80,80,0.05)_89.8%)] p-5 lg:relative lg:h-[620px] lg:max-w-[520px] lg:block lg:p-0">
                {currentTab.featureCards.map((card, index) => {
                  const mobileOffset =
                    index % 2 === 0 ? "mr-auto w-[92%]" : "ml-auto w-[92%]";

                  const desktopCardClasses = [
                    "lg:top-[30px] lg:left-[30px] lg:w-[285px]",
                    "lg:top-[160px] lg:right-[60px] lg:w-[280px]",
                    "lg:top-[288px] lg:left-[58px] lg:w-[283px]",
                    "lg:bottom-[55px] lg:right-[37px] lg:w-[260px]",
                  ];

                  return (
                    <div
                      key={card.id}
                      className={`relative flex flex-col items-start rounded-[8px] bg-[#FAFAFA] px-6 py-[18px] shadow-[0_3px_16.4px_rgba(227,64,57,0.20)] dark:bg-[#1e1e1e] ${mobileOffset} lg:absolute ${desktopCardClasses[index] ?? "lg:w-[283px]"}`}
                    >
                      {card.icon ? (
                        <Image
                          src={getStrapiMediaUrl(card.icon.url)}
                          alt={card.icon.alternativeText || ""}
                          width={40}
                          height={40}
                          unoptimized
                          className="mb-1 h-10 w-10"
                        />
                      ) : null}

                      <p className="text-[17px] leading-[145%] font-semibold tracking-[-0.3px] text-black lg:text-[18px] lg:leading-[150%] lg:tracking-[-0.4px] dark:text-white">
                        {card.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        {links.length > 0 ? (
          <div className="mt-16 flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href || "#"}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-[53px] w-full items-center justify-center rounded-[100px] border border-[#DE3737] bg-[radial-gradient(60.21%_66.41%_at_47.91%_-7.5%,rgba(240,88,88,0.40)_0%,rgba(255,255,255,0.05)_79.27%,rgba(255,255,255,0)_100%)] px-8 text-center text-[16px] leading-9 font-normal text-[#EC0000] capitalize shadow-[0_0_7px_rgba(227,64,57,0.20)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[rgba(236,0,0,0.04)] md:w-auto"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
