'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/app/_hooks';
import Link from 'next/link';

export function UserInfo() {
  const router = useRouter();
  const { isFetching, isLogged, user, logout } = useUser();

  return (
    <div>
      {isFetching ? null : isLogged ? (
        <div className="flex items-center gap-4">
          <Link href="/my">
            <span className="text-base font-medium">{user?.nickname}님 환영합니다.</span>
          </Link>

          <button className="text-base font-medium" type="button" onClick={logout}>
            로그아웃
          </button>
        </div>
      ) : (
        <button className="text-base font-medium" type="button" onClick={() => router.push('/login')}>
          로그인
        </button>
      )}
    </div>
  );
}
