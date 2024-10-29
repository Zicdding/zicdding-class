'use client';

import { Typography } from '@zicdding-web/ui/Typography';
import { Tabs } from '@zicdding-web/ui/Tabs';
import { Input } from '@zicdding-web/ui/Input';
import { Button } from '@zicdding-web/ui';
import ClassCard from '../_components/ClassCard';
import { useRouter } from 'next/navigation';

export default function ClassPage() {
  const router = useRouter();

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
        {Array.from({ length: 10 }).map((_, index) => (
          <ClassCard
            key={`class-${index}`}
            className="w-[405px]"
            title="Example Class Title"
            endDate="2024-07-01"
            positions={['프론트엔드', '백엔드']}
            nickname="직띵"
            likeCnt={10}
            viewCnt={20}
            commentCnt={5}
            technology={[
              { name: 'react', imgUrl: '/next.svg' },
              { name: 'js', imgUrl: '/vercel.svg' },
            ]}
            myLike={index % 2 === 0}
            onClick={() => {
              // 임시 테스트 기능 (클릭시 상세 페이지로 이동)
              router.push(`/class/${index}`);
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
