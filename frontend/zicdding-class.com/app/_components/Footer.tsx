'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-[30px]">
      <div className="max-w-[1280px] m-auto flex justify-between items-end">
        <article className="flex flex-col gap-[50px]">
          <figure className="w-[200px]">
            <img src="/logo.png" alt="Logo" />
          </figure>
          <div>
            <p className="font-semibold text-[18px]">Contact Us : zicDding@zicdding.io</p>
            <span>&#169; 2024 ZicDding All rights reserved</span>
          </div>
        </article>
        <article>
          <ul className="flex gap-[30px]">
            <li>
              <Link href="/policy/service">이용약관</Link>
            </li>
            <li>
              <Link href="/policy/privacy">개인정보처리방침</Link>
            </li>
          </ul>
        </article>
      </div>
    </footer>
  );
}
