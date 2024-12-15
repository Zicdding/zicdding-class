'use client';

import { Typography } from '@zicdding-web/ui/Typography';
import { SearchInput } from '@zicdding-web/ui/Input';
import { TypeButton } from './_components/TypeButton';
import { ItTabs } from './_components/ItTabs';
import ITNewsCard from '../_components/ITNewsCard';
import { useRouter } from 'next/navigation';

const dummyData = [
  {
    id: '7b205a4d-f17f-4b65-a463-38a270d1ab39',
    title: '2023년 인공지능 발전 동향',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '공모전',
    startedDate: '2023-04-01',
    endDate: '2023-04-30',
    likeCnt: 23,
    viewCnt: 452,
    commentCnt: 17,
    myLike: false,
  },
  {
    id: '2a8b5f9c-d4e0-4f1f-b9ab-c7a0d9d38e2c',
    title: '신규 IoT 기기 출시 소식',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '이벤트',
    startedDate: '2023-05-15',
    endDate: '2023-06-15',
    likeCnt: 41,
    viewCnt: 718,
    commentCnt: 28,
    myLike: true,
  },
  {
    id: '5d1c3b9e-8a2f-4c8a-b3d5-e14e9afa0c88',
    title: '클라우드 컴퓨팅 기술 현황 분석',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '해커톤',
    startedDate: '2023-06-01',
    endDate: '2023-07-31',
    likeCnt: 62,
    viewCnt: 1023,
    commentCnt: 41,
    myLike: false,
  },
  {
    id: '1f9d2b7c-e5a1-4b7f-96b5-f3d2a8a1c5d9',
    title: '5G 네트워크 구축 현황',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '이벤트',
    startedDate: '2023-07-01',
    endDate: '2023-08-31',
    likeCnt: 19,
    viewCnt: 298,
    commentCnt: 8,
    myLike: true,
  },
  {
    id: '3c8d4f6e-b2a9-4e7f-b4b8-d1c7a21a6a2c',
    title: '블록체인 기술 발전과 활용 사례',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '공모전',
    startedDate: '2023-08-01',
    endDate: '2023-09-30',
    likeCnt: 47,
    viewCnt: 651,
    commentCnt: 22,
    myLike: false,
  },
  {
    id: '9d2a5f8b-c3d4-4e9f-a8b6-f7e0d1c2a3b4',
    title: '최신 AR/VR 기술 동향',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '이벤트',
    startedDate: '2023-09-01',
    endDate: '2023-10-31',
    likeCnt: 31,
    viewCnt: 487,
    commentCnt: 15,
    myLike: true,
  },
  {
    id: '4e6b7c9a-d8f1-4a2b-b5c3-e2d1a3b4c5d6',
    title: '퀀텀 컴퓨팅 기술 발전 현황',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '해커톤',
    startedDate: '2023-10-01',
    endDate: '2023-11-30',
    likeCnt: 54,
    viewCnt: 792,
    commentCnt: 29,
    myLike: false,
  },
  {
    id: '7f1e2d3c-4b5a-4c6d-e7f8-a1b2c3d4e5f6',
    title: '스마트시티 구축 사례 분석',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '공모전',
    startedDate: '2023-11-01',
    endDate: '2023-12-31',
    likeCnt: 21,
    viewCnt: 356,
    commentCnt: 11,
    myLike: true,
  },
  {
    id: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    title: '차세대 모빌리티 기술 혁신',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '해커톤',
    startedDate: '2024-01-01',
    endDate: '2024-02-28',
    likeCnt: 38,
    viewCnt: 584,
    commentCnt: 17,
    myLike: false,
  },
  {
    id: 'q1r2s3t4-u5v6-w7x8-y9z0-a1b2c3d4e5f6g7',
    title: '메타버스 시장 동향과 전망',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '이벤트',
    startedDate: '2024-02-01',
    endDate: '2024-03-31',
    likeCnt: 27,
    viewCnt: 402,
    commentCnt: 13,
    myLike: true,
  },
];

export default function ITNewsPage() {
  const router = useRouter();

  return (
    <main className="py-[100px]">
      <Typography variant="h1" className="mb-12">
        IT News
      </Typography>
      <TypeButton />
      <article className="flex justify-between mt-12">
        <SearchInput width={400} />
        <ItTabs
          item={[
            { title: '최신순', value: 'recent' },
            { title: '조회순', value: 'view' },
            { title: '인기순', value: 'popular' },
          ]}
        />
      </article>
      <ul className="flex flex-wrap gap-x-10 gap-y-[50px] mt-16">
        {dummyData.map((item) => (
          <ITNewsCard
            key={item.id}
            className="w-[calc(33.33%-26.667px)]"
            {...item}
            onClick={() => {
              router.push(`/itnews/${item.id}`);
            }}
            onClickLike={() => {
              console.log('click like');
            }}
          />
        ))}
      </ul>
    </main>
  );
}
