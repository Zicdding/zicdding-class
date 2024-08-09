'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { apiV1 } from '../remotes';

function useUser() {
  const [user, setUser] = useState<{ email: string; nickname: string } | null>();

  useEffect(() => {
    (async () => {
      try {
        await apiV1.users.getMe().then(setUser);
      } catch (error: any) {
        if (error.name === 'HTTPError') {
          console.error(await error.response.json());
        } else {
          console.error(error.message);
        }

        setUser(null);
      }
    })();
  }, []);

  const logout = useCallback(async () => {
    await apiV1.users.logout();

    setUser(null);
  }, []);

  return [user, logout] as const;
}

export function UserInfo() {
  const router = useRouter();
  const [user, logout] = useUser();

  return (
    <div>
      {user === undefined ? null : user != null ? (
        <div className="flex items-center gap-4">
          <span className="text-base font-medium">{user.nickname}님 환영합니다.</span>

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
