import { useRouter, useSearchParams } from 'next/navigation';
import type { SortType } from '../model/type';
import { useEffect, useState } from 'react';

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [localSearchValue, setLocalSearchValue] = useState('');

  const sortType = (searchParams.get('sortType') as SortType) ?? 'popular';
  const searchValue = searchParams.get('search') ?? '';

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const _searchValue = formData.get('search') as string;
    onSearch(_searchValue);
  };

  const onSearch = (searchValue: string) => {
    router.replace(`/class?sortType=${sortType}&search=${searchValue}`);
  };

  const onSortTypeChange = (sortTypeValue: SortType) => {
    router.replace(`/class?sortType=${sortTypeValue}&search=${searchValue}`);
  };

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);
  };

  useEffect(
    function mountedSyncQueryValueToLocalValue() {
      setLocalSearchValue(searchValue);
    },
    [searchValue],
  );

  return {
    localSearchValue,
    searchValue,
    sortType,
    onSearchSubmit,
    onSearch,
    onSortTypeChange,
    onChangeSearchValue,
  };
}
