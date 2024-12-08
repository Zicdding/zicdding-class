'use client';

import { Typography } from '@zicdding-web/ui/Typography';
import { Tabs } from '@zicdding-web/ui/Tabs';
import { SearchInput } from '@zicdding-web/ui';
import { Button } from '@zicdding-web/ui';
import { ClassCard, useGetClasses } from '@/src/features/class-card';
import type { SortType } from '../model/type';
import { useSearchClass } from './use-search-class';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export function ClassListPage() {
  const router = useRouter();

  const { data: classList, isLoading } = useGetClasses();

  const { localSearchValue, searchValue, sortType, onSearchSubmit, onChangeSearchValue, onSearch, onSortTypeChange } =
    useSearchClass();

  const _classList = useMemo(() => {
    return classList?.filter((classItem) => classItem.classTitle.includes(searchValue));
  }, [classList, searchValue]);

  return (
    <div className="px-6">
      <div className="flex justify-between items-center">
        <Typography variant="h2">클래스</Typography>
        <Tabs
          items={[
            { title: '인기순', value: 'popular' },
            { title: '최신순', value: 'recent' },
          ]}
          value={sortType}
          onChange={(value) => onSortTypeChange(value as SortType)}
          defaultValue="popular"
        />
      </div>

      <hr className="my-8" />

      <div className="flex justify-between items-center">
        <Button>클래스 만들기</Button>
        <form onSubmit={onSearchSubmit}>
          <SearchInput
            name="search"
            width={366}
            value={localSearchValue}
            onChange={onChangeSearchValue}
            onClickSearch={onSearch}
          />
        </form>
      </div>

      <ul className="flex flex-wrap items-start gap-8 mx-auto mt-8">
        {isLoading ? (
          <div>loading...</div>
        ) : (
          _classList?.map((classItem) => (
            <ClassCard
              key={classItem.classId}
              title={classItem.classTitle}
              className="w-[calc(34%-32px)]"
              onClick={() => {
                router.push(`/class/${classItem.classId}`);
              }}
              {...classItem}
            />
          ))
        )}
      </ul>
    </div>
  );
}
