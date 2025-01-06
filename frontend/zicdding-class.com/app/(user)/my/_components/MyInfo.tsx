'use client';

import { useUser } from '@/app/_hooks';
import { Button } from '@zicdding-web/ui';
import { Input } from '@zicdding-web/ui/Input';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function MyInfo({ mode }: { mode: 'view' | 'modify' }) {
  const router = useRouter();
  const { user } = useUser();
  const { register, setValue } = useForm<{
    nickname: string;
    email: string;
    password: string;
    phoneNumber: string;
  }>();

  useEffect(() => {
    if (user == null) {
      return;
    }

    setValue('nickname', user.nickname);
    setValue('email', user.email);
    setValue('phoneNumber', user.phone_num);
  }, [user, setValue]);

  return (
    <div className="space-y-4 w-[420px] mx-auto my-0">
      <div className="w-[200px] flex justify-center ml-auto mr-auto mb-8 flex-col">
        <img src="/my/default-profile.png" alt="Profile" width="205" className="bg-gray-200 mb-10" />

        <Button className="w-full rounded-[20px]" onClick={() => alert('업로드 버튼이 눌렸습니다.')}>
          업로드
        </Button>
      </div>

      <Input
        id="nickname"
        label="닉네임"
        disabled={mode === 'view'}
        required={true}
        inputClassName={mode === 'view' ? 'text-[#959595] bg-[#F4F4F4]' : 'bg-[#F4F4F4] text-[#959595]'}
        {...register('nickname')}
      />

      <Input
        label="Email"
        id="email"
        type="email"
        disabled={true}
        inputClassName={mode === 'view' ? 'text-[#959595] bg-[#F4F4F4]' : ''}
        {...register('email')}
      />

      <Input
        defaultValue="**********"
        label="비밀번호"
        id="password"
        type="password"
        disabled={true}
        inputClassName={mode === 'view' ? 'text-[#959595] bg-[#F4F4F4]' : ''}
        {...register('password')}
      />

      <Input
        label="전화번호"
        id="phoneNumber"
        type="tel"
        disabled={mode === 'view'}
        {...register('phoneNumber')}
        inputClassName={mode === 'view' ? 'text-[#959595] bg-[#F4F4F4]' : 'bg-[#F4F4F4]'}
        placeholder="010-0000-0000"
      />

      <div className="mb-20 w-full h-1" />

      {mode === 'modify' ? (
        <div className="flex justify-evenly">
          <Button className="w-full mr-8 rounded-[20px]" onClick={() => alert('수정 버튼이 눌려졌습니다.')}>
            수정하기
          </Button>
          <Button className="w-full rounded-[20px]" onClick={() => router.back()}>
            취소
          </Button>
        </div>
      ) : (
        <Button
          className="w-full rounded-[20px]"
          onClick={() => {
            router.push('/my/modify');
          }}
        >
          개인정보 수정
        </Button>
      )}
    </div>
  );
}
