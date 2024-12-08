'use client';

import { usePathname } from 'next/navigation';
import { UserInfo } from './UserInfo';
import Link from 'next/link';

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white fixed top-0 left-0">
      <div className="max-w-[1280px] flex justify-between items-center h-20 px-6 m-auto">
        <div className="flex items-center">
          <Link href={'/'}>
            <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
          </Link>
        </div>

        <UserInfo key={pathname} />
      </div>
    </header>
  );
}
