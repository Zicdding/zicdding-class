'use client';

import React, { useCallback } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import ky from '@toss/ky';
import { useRouter } from 'next/navigation';

const signUpWithEmail = async (data: FormValues) => {
  if (data.password !== data.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  const response = await ky.post('api/v1/users/signUp', {
    json: {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      phoneNum: data.phoneNumber,
    },
  });

  return await response.json();
};

const checkEmail = async (email: string) => {
  const response = await ky.get(`api/v1/users/check-email?email=${email}`, { email });

  return await response.json();
};

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
};

const labelStyle = "font-['Roboto'] font-normal block text-[14px] text-[#777777] leading-[22px]";

const inputStyle =
  'w-full box-border flex-row align-center p-[13px] gap-[10px] bg-[#FFFFFF] border-[1px] border-[#C6C6C6] rounded-[20px] placeholder-gray-300';

export function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const email = watch('email');

  const handleCheckEmailDuplicated = useCallback(async () => {
    const result = await checkEmail(email);
    if (result) {
      alert('사용 가능한 이메일입니다.');
    } else {
      alert('이미 사용중인 이메일입니다.');
    }
  }, [email]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const { code, message, data } = await signUpWithEmail(values);
      localStorage.setItem('accessToken', data.accessToken);

      if (code === 200) {
        alert(message);
        router.push('/');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg max-w-md w-full">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Logo" className="mx-auto h-16" />
        </div>

        <div className="border-[#F2F2F2] border-[1px] px-[36px] rounded-[8px]">
          <div className="mt-[39px] mb-[24px]">
            <label htmlFor="email" className={labelStyle}>
              Email <span className="text-red-500">**</span>
            </label>
            <div className="flex">
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                {...register('email', { required: '이메일을 입력해주세요.' })}
                className={`form-input flex-grow ${errors.email ? 'border-red-500' : 'border-gray-300'} ${inputStyle}`}
              />
              <button
                type="button"
                className="ml-2 bg-black text-white px-4 py-2 rounded text-nowrap"
                onClick={handleCheckEmailDuplicated}
              >
                중복확인
              </button>
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-[24px]">
            <label htmlFor="password" className={labelStyle}>
              비밀번호 <span className="text-red-500">**</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register('password', { required: '비밀번호를 입력해주세요.' })}
              className={`form-input w-full ${errors.password ? 'border-red-500' : 'border-gray-300'} ${inputStyle}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-[24px]">
            <label htmlFor="confirmPassword" className={labelStyle}>
              비밀번호 확인 <span className="text-red-500">**</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register('confirmPassword', { required: '비밀번호 확인을 입력해주세요.' })}
              className={`form-input w-full ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} ${inputStyle}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="mb-[24px]">
            <label htmlFor="nickname" className={labelStyle}>
              닉네임 <span className="text-red-500">**</span>
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              {...register('nickname', { required: '닉네임을 입력해주세요.' })}
              className={`form-input w-full ${errors.nickname ? 'border-red-500' : 'border-gray-300'} ${inputStyle}`}
            />
            {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname.message}</p>}
          </div>

          <div className="mb-[57px]">
            <label htmlFor="phoneNumber" className={labelStyle}>
              전화번호
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="전화번호를 입력해주세요"
              {...register('phoneNumber')}
              className={`form-input w-full border-gray-300 ${inputStyle}`}
            />
          </div>

          <button type="submit" className="mb-[100px] w-full bg-black text-white py-2 rounded text-lg h-[52px]">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
