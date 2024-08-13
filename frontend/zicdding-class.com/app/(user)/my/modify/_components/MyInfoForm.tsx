'use client';

import { useUser } from '@/app/_hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function MyInfoForm() {
  const { user, isLogged } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push('/login');
    }
  }, [isLogged, router]);

  return (
    <div className="space-y-4 w-[420px] mx-auto my-0">
      <div className="grid grid-cols-2 gap-4 items-center">
        <label htmlFor="nickname" className="text-gray-700 font-bold">
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={user?.nickname || ''}
          readOnly
          className="form-input w-full border-gray-300"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        <label htmlFor="email" className="text-gray-700 font-bold">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user?.email || ''}
          readOnly
          className="form-input w-full border-gray-300"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        <label htmlFor="password" className="text-gray-700 font-bold">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={isLogged ? '********' : ''}
          readOnly
          className="form-input w-full border-gray-300"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        <label htmlFor="phoneNumber" className="text-gray-700 font-bold">
          전화번호
        </label>
        <input
          id="phoneNumber"
          type="tel"
          value={user?.phone_num || ''}
          readOnly
          className="form-input w-full border-gray-300"
        />
      </div>

      <div className="h-[80px]">{}</div>

      <div className="flex justify-center ">
        <button
          type="button"
          className="bg-black text-white py-2 px-4 rounded font-bold text-lg w-[200px]"
          onClick={() => router.push('/login')}
        >
          개인정보 수정
        </button>
      </div>
    </div>
  );
}
