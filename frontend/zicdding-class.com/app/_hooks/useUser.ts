"use client";

import { useState, useEffect, useCallback } from "react";
import { apiV1 } from "../_remotes";

export function useUser() {
  const [user, setUser] = useState<{
    email: string;
    nickname: string;
    // FIXME: phone_num -> phoneNum
    phone_num: string | null;
  } | null>();

  useEffect(() => {
    (async () => {
      try {
        await apiV1.users.getMe().then(setUser);
      } catch (error: any) {
        setUser(null);

        if (error.name === "HTTPError") {
          console.error(await error.response.text());
          // console.error(await error.response.json());
        } else {
          console.error(error.message);
        }
      }
    })();
  }, []);

  const logout = useCallback(async () => {
    await apiV1.users.logout();

    setUser(null);

    window.location.reload();
  }, []);

  return [
    user
      ? {
          email: user.email,
          nickname: user.nickname,
          phoneNumber: user.phone_num,
        }
      : user,
    logout,
  ] as const;
}
