'use client';

import { Typography } from '@zicdding-web/ui/Typography';
import { Tabs } from '@zicdding-web/ui/Tabs';
import { Input } from '@zicdding-web/ui/Input';
import { Button } from '@zicdding-web/ui';
import { useRouter } from 'next/navigation';
import { getClasses } from '@/src/entities/class';
import { useQuery } from '@tanstack/react-query';
import { ClassCard } from './ClassCard';
import { adapterClassList } from '../model/adapter-class-list';

export function ClassListPage() {
  const router = useRouter();

  const { data: classList } = useQuery({
    queryKey: ['classes'],
    queryFn: getClasses,
    select: adapterClassList,
  });

  return (
    <div>
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
        {classList?.map((classItem) => (
          <ClassCard
            key={classItem.classId}
            className="w-[405px]"
            title={classItem.classTitle}
            endDate={classItem.endDate}
            positions={classItem.positions}
            nickname={classItem.nickname}
            likeCnt={classItem.likeCnt}
            viewCnt={classItem.viewCnt}
            commentCnt={classItem.commentCnt}
            technology={classItem.technology}
            myLike={classItem.myLike}
            onClick={() => {
              // 임시 테스트 기능 (클릭시 상세 페이지로 이동)
              router.push(`/class/${classItem.classId}`);
            }}
            onClickLike={() => {
              // 임시 테스트 기능 (클릭시 좋아요 기능)
              console.log('click like');
            }}
          />
        ))}
      </ul>
    </div>
  );
}
