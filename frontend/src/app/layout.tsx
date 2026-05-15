import type { Metadata } from 'next';
import Script from 'next/script';
import { Manrope, Roboto, Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'eCurrency Project',
  description: 'eCurrency website',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${roboto.variable} ${robotoMono.variable} font-sans`}
      >
        {/* Runs synchronously before paint to apply the stored theme class,
            preventing a flash of the wrong theme on first load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <ThemeProvider>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-1PZTFJRNGL"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1PZTFJRNGL');
            `}
          </Script>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
