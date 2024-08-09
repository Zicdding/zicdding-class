'use client';

import { useEffect, useState } from 'react';
import ky from '@toss/ky';
import { usePathname, useRouter } from 'next/navigation';

async function getMe() {
  const response = await ky.get('api/v1/users/me', {
    headers: {
      Cookie: `accessToken=${localStorage.getItem('accessToken')}`,
    },
  });

  return await response.json();
}

async function logOut() {
  const response = await ky.get('api/v1/users/logout');

  localStorage.removeItem('accessToken');

  return await response.json();
}

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ email: string; nickname: string } | null>();

  useEffect(() => {
    console.log({ pathname });
    const accessToken = localStorage.getItem('accessToken');

    console.log({ accessToken });

    if (accessToken) {
      getMe()
        .then(({ data }) => {
          console.log({ data });
          setUser(data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setUser(null);
    }
  }, [pathname]);

  const handleLogOut = async () => {
    await logOut();

    setUser(null);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <header className="w-full bg-white fixed top-0 left-0">
      <div className="mw-[1280px] flex justify-between items-center h-20 px-6 m-auto">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
          <span className="text-xl font-bold">ZicDding-IT</span>
        </div>
        <div>
          {user === undefined ? (
            <div>{''}</div>
          ) : user != null ? (
            <div className="flex items-center gap-4">
              <span className="text-base font-medium">{user.nickname}님 환영합니다.</span>

              <button className="text-base font-medium" type="button" onClick={handleLogOut}>
                로그아웃
              </button>
            </div>
          ) : (
            <button className="text-base font-medium" type="button" onClick={handleLogin}>
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
