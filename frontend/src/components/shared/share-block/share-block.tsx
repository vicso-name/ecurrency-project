'use client';

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M19.25 10.9999L12.8333 4.58325V8.24992C6.41667 9.16659 3.66667 13.7499 2.75 18.3333C5.04167 15.1249 8.25 13.6583 12.8333 13.6583V17.4166L19.25 10.9999Z"
        fill="#0F1324"
        fillOpacity="0.6"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M13.7447 1.42798H16.2748L10.7473 7.7456L17.25 16.3425H12.1584L8.17053 11.1285L3.60746 16.3425H1.07582L6.98808 9.58505L0.75 1.42798H5.97083L9.57555 6.19373L13.7447 1.42798ZM12.8567 14.8281H14.2587L5.20905 2.86283H3.7046L12.8567 14.8281Z"
        fill="#EC0000"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <g clipPath="url(#clip0_share)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.23741 8.05825C6.06923 5.95308 9.29121 4.56523 10.9033 3.89468C15.5063 1.98015 16.4627 1.64757 17.0861 1.63659C17.2232 1.63418 17.5298 1.66816 17.7284 1.82929C17.8961 1.96536 17.9422 2.14916 17.9643 2.27816C17.9864 2.40716 18.0139 2.70103 17.992 2.93065C17.7426 5.5515 16.6633 11.9116 16.1142 14.847C15.8818 16.0891 15.4244 16.5056 14.9815 16.5463C14.0189 16.6349 13.288 15.9102 12.3558 15.2991C10.897 14.3429 10.0729 13.7476 8.65691 12.8145C7.02048 11.7361 8.08131 11.1434 9.0139 10.1747C9.25797 9.92122 13.4988 6.06379 13.5809 5.71386C13.5912 5.6701 13.6007 5.50697 13.5038 5.42083C13.4069 5.33469 13.2639 5.36414 13.1606 5.38757C13.0143 5.42078 10.6839 6.96111 6.16938 10.0086C5.5079 10.4628 4.90875 10.6841 4.37193 10.6725C3.78013 10.6597 2.64175 10.3379 1.79548 10.0628C0.757494 9.72539 -0.0674757 9.547 0.00436067 8.97398C0.0417775 8.67551 0.452793 8.37027 1.23741 8.05825Z"
          fill="#EC0000"
        />
      </g>
      <defs>
        <clipPath id="clip0_share">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

type ShareBlockProps = {
  title: string;
};

export function ShareBlock({ title }: ShareBlockProps) {
  const handleShareX = () => {
    const url = window.location.href;
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleShareTelegram = () => {
    const url = window.location.href;
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="flex h-[53px] w-full max-w-[618px] items-center justify-between rounded-[94px] bg-white px-6">
      <div className="flex items-center gap-2">
        <span className="[font-family:var(--font-manrope)] text-[16px] font-normal leading-[20px] text-[rgba(15,19,36,0.60)]">
          Share
        </span>
        <ShareIcon />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleShareX}
          aria-label="Share on X"
          className="cursor-pointer transition-opacity hover:opacity-70"
        >
          <XIcon />
        </button>
        <button
          type="button"
          onClick={handleShareTelegram}
          aria-label="Share on Telegram"
          className="cursor-pointer transition-opacity hover:opacity-70"
        >
          <TelegramIcon />
        </button>
      </div>
    </div>
  );
}