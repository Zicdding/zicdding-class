"use client";

import { useCallback } from "react";
import { apiV1 } from "@/app/_remotes";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { data, refetch, isError } = useQuery({
    initialData: undefined,
    queryKey: ["useUser"],
    queryFn: () => apiV1.users.getMe(),
    retry: false,
  });

  const logout = useCallback(async () => {
    await apiV1.users.logout();

    refetch();
  }, [refetch]);

  return [isError ? null : data, logout] as const;
}
