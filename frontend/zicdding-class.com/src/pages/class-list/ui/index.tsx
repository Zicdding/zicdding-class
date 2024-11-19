'use client';

import { Typography } from '@zicdding-web/ui/Typography';
import { Tabs } from '@zicdding-web/ui/Tabs';
import { Input } from '@zicdding-web/ui/Input';
import { Button } from '@zicdding-web/ui';
import { ClassCard, useGetClasses } from '@/src/features/class-card';

export function ClassListPage() {
  const { data: classList, isLoading } = useGetClasses();

  // GYU-TODO: 인기순/최신순 query 로 관리하고 데이터가 없으면 기본값 설정해서 tabs 와 데이터 일치하게 하기!
  // tabs 도 상태로 해야하나? 아니면 onChange 가 발생할때 url 로 제어해서 따로 client-component 로 추출하지 않게 해야하나?

  return (
    <div className="px-6">
      <div className="flex justify-between items-center">
        <Typography variant="h2">클래스</Typography>
        <Tabs
          items={[
            { title: '인기순', value: 'popular' },
            { title: '최신순', value: 'recent' },
          ]}
          onChange={() => {}}
          defaultValue="popular"
        />
      </div>

      <hr className="my-8" />

      <div className="flex justify-between items-center">
        <Button>클래스 만들기</Button>
        <Input type="search" width={366} onClickSearch={() => {}} />
      </div>

      <ul className="flex flex-wrap items-start gap-8 mx-auto mt-8">
        {isLoading ? (
          <div>loading...</div>
        ) : (
          classList?.map((classItem) => (
            <ClassCard
              key={classItem.classId}
              title={classItem.classTitle}
              className="w-[calc(34%-32px)]"
              {...classItem}
            />
          ))
        )}
      </ul>
    </div>
  );
}
