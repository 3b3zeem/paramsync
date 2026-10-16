import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/providers/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://paramsync.vercel.app'),
  title: {
    default: 'paramsync | Type-Safe URL Query State Manager for Next.js',
    template: '%s | paramsync',
  },
  description:
    'Zero-overhead, type-safe URL Search Parameters state manager for React 18+ and Next.js App Router applications.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://paramsync.vercel.app',
    siteName: 'paramsync',
    title: 'paramsync | Type-Safe URL Query State Manager for Next.js',
    description:
      'Zero-overhead, type-safe URL Search Parameters state manager with 0ms typing latency, Clean URL policy, and atomic batch transitions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'paramsync | Type-Safe URL Query State Manager for Next.js',
    description:
      'Zero-overhead, type-safe URL Search Parameters state manager with 0ms typing latency, Clean URL policy, and atomic batch transitions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('paramsync-theme');
                  var isDark = saved ? saved === 'dark' : true;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white dark:bg-[#191b21] text-zinc-900 dark:text-zinc-100"
      >
        <ThemeProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
