import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiV1 } from './app/_remotes';

async function isAuth() {
  try {
    await apiV1.users.getMe();
    return true;
  } catch {
    return false;
  }
}
export async function middleware(request: NextRequest) {
  if (!(await isAuth())) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로를 지정
export const config = {
  matcher: ['/my/:path*'],
};
