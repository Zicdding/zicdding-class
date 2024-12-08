'use client';

import { useCallback } from 'react';
import { apiV1 } from '@/app/_remotes';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data, refetch, isError, isFetching } = useQuery({
    initialData: undefined,
    queryKey: ['useUser'],
    queryFn: () => apiV1.users.getMe(),
    retry: false,
  });

  const logout = useCallback(async () => {
    await apiV1.users.logout();

    refetch();
  }, [refetch]);

  const isLogged = isError === false;
  const user = data;

  return { isFetching, isLogged, user, logout } as const;
}
