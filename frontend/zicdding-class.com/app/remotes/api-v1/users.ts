import ky from "@toss/ky";

/**
 * @name POST /api/v1/users/signUp (일반 회원가입)
 * @see https://documenter.getpostman.com/view/35361347/2sA3kUJ38T#799cff35-b970-428c-b448-4c9bf31f4ac0
 */
export async function signUpWithEmail(params: {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
}) {
  return await ky.post("api/v1/users/signUp", { json: params }).json();
}

/**
 * @name GET /api/v1/users/check-email (이메일 중복 체크)
 * @see https://documenter.getpostman.com/view/35361347/2sA3kUJ38T#a362acab-68a9-433a-b31c-b80ddb96fb79
 */
export async function checkEmail({ email }: { email: string }) {
  try {
    const res = await ky.get(`api/v1/users/check-email?email=${email}`).json();

    return { result: true, message: res.message };
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const { code, message } = await error.response.json();
      if (code === 409) {
        return { result: false, message };
      }

      throw error;
    }
    throw error;
  }
}

/**
 * @name GET /api/v1/users/me (마이페이지 조회)
 * @see https://documenter.getpostman.com/view/35361347/2sA3kUJ38T#256d8b62-7b9b-49b1-8228-e188e9de2cf6
 */
export async function getMe() {
  const { data } = await ky.get("api/v1/users/me").json();

  return data;
}

/**
 * @name GET /api/v1/users/logout (마이페이지 조회)
 * @see https://documenter.getpostman.com/view/35361347/2sA3kUJ38T#0a1062ad-0143-4a93-ab94-a18f74433ec4
 */
export async function logout() {
  return await ky.get("api/v1/users/logout").json();
}

/**
 * @name POST /api/v1/users/login (일반 로그인)
 * @see https://documenter.getpostman.com/view/35361347/2sA3kUJ38T#d0a5eb2a-735d-43f6-81a8-e13c10f0cab5
 */
export async function login(data: { email: string; password: string }) {
  return await ky
    .post("api/v1/users/signIn", {
      json: data,
    })
    .json();
}
