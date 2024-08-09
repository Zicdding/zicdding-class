'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const labelStyle = "font-['Roboto'] font-normal block text-[14px] text-[#777777] leading-[22px]";

const inputStyle =
  'w-full box-border flex-row align-center p-[13px] gap-[10px] bg-[#FFFFFF] border-[1px] border-[#C6C6C6] rounded-[20px]';

const buttonStyle = 'h-[40px] bg-[#000000] rounded-[8px] text-[#FFFFFF] w-full';

async function login(data: { email: string; password: string }) {
  const response = await fetch('api/v1/users/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export function LoginForm({ className = '' }: { className?: string }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();

  const onSubmit = async (formData: { email: string; password: string }) => {
    await login(formData);

    router.push('/');
  };

  return (
    <form className={`w-[467px] px-[70px] ${className}`} onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full mb-[9px]">
        <img className="my-0 mx-auto" width="191" src="/login/zicdding-login-logo.png" alt="직띵 로고" />
      </div>

      <p className="w-full text-center mb-[20px]">
        <span>Login</span>
      </p>

      <p className="mb-[10px]">
        <label className={labelStyle}>Email</label>
        <input className={inputStyle} placeholder="이메일을 입력해주세요" {...register('email')} />
      </p>

      <p className="mb-[31px]">
        <label className={labelStyle}>Password</label>
        <input className={inputStyle} type="password" placeholder="비밀번호를 입력해주세요" {...register('password')} />
      </p>

      <button className={`${buttonStyle} mb-[20px]`} type="submit">
        로그인하기
      </button>

      <p className="px-[47px] flex justify-around mb-[20px]">
        <Link href="/find-email" className="text-[14px] text-[#7B6B6B]">
          이메일 찾기
        </Link>
        <Link href="/find-password" className="text-[14px] text-[#7B6B6B]">
          비밀번호 찾기
        </Link>
        <Link href="/sign-up" className="text-[14px] text-[#7B6B6B]">
          회원가입
        </Link>
      </p>

      <div className="relative text-center text-sm mb-[20px]">
        <span className="text-[#7B6B6B] before:block before:absolute before:left-0 before:top-1/2 before:h-px before:w-1/3 before:bg-[#E6E6E6] after:block after:absolute after:right-0 after:top-1/2 after:h-px after:w-1/3 after:bg-[#E6E6E6]">
          간편로그인
        </span>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <button type="button">
          <img src="/login/naver-icon.png" alt="Naver Login" className="h-8" />
        </button>
        <button type="button">
          <img src="/login/kakao-icon.png" alt="Kakao Login" className="h-8" />
        </button>
        <button type="button">
          <img src="/login/google-icon.png" alt="Google Login" className="h-8" />
        </button>
        <button type="button">
          <img src="/login/github-icon.png" alt="GitHub Login" className="h-8" />
        </button>
      </div>
    </form>
  );
}
