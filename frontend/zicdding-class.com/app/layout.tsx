import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from './components/NavBar';
import { TanstackProviders } from './providers/tanstack';

export const metadata: Metadata = {
  title: '직띵 클래스',
  description: '@zicdding-class',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <TanstackProviders>
          <div className="max-w-[1280px] m-auto">
            <NavBar />
            <div className="mt-20">{children}</div>
          </div>
        </TanstackProviders>
      </body>
    </html>
  );
}
