import { Typography } from '@zicdding-web/ui/Typography';
import { Input } from '@zicdding-web/ui';
import { TypeButton } from './_components/TypeButton';
import { ItTabs } from './_components/ItTabs';
import ITNewsCard from '../_components/ITNewsCard';

const dummyData = [
  {
    id: '7b205a4d-f17f-4b65-a463-38a270d1ab39',
    title: '2023년 인공지능 발전 동향',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '공모전',
    date: {
      start: '2023-04-01',
      end: '2023-04-30',
    },
    likeCount: 23,
    viewCount: 452,
    commentCount: 17,
    myLike: false,
  },
  {
    id: '2a8b5f9c-d4e0-4f1f-b9ab-c7a0d9d38e2c',
    title: '신규 IoT 기기 출시 소식',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '이벤트',
    date: {
      start: '2023-05-15',
      end: '2023-06-15',
    },
    likeCount: 41,
    viewCount: 718,
    commentCount: 28,
    myLike: true,
  },
  {
    id: '5d1c3b9e-8a2f-4c8a-b3d5-e14e9afa0c88',
    title: '클라우드 컴퓨팅 기술 현황 분석',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '해커톤',
    date: {
      start: '2023-06-01',
      end: '2023-07-31',
    },
    likeCount: 62,
    viewCount: 1023,
    commentCount: 41,
    myLike: false,
  },
  {
    id: '1f9d2b7c-e5a1-4b7f-96b5-f3d2a8a1c5d9',
    title: '5G 네트워크 구축 현황',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '이벤트',
    date: {
      start: '2023-07-01',
      end: '2023-08-31',
    },
    likeCount: 19,
    viewCount: 298,
    commentCount: 8,
    myLike: true,
  },
  {
    id: '3c8d4f6e-b2a9-4e7f-b4b8-d1c7a21a6a2c',
    title: '블록체인 기술 발전과 활용 사례',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '공모전',
    date: {
      start: '2023-08-01',
      end: '2023-09-30',
    },
    likeCount: 47,
    viewCount: 651,
    commentCount: 22,
    myLike: false,
  },
  {
    id: '9d2a5f8b-c3d4-4e9f-a8b6-f7e0d1c2a3b4',
    title: '최신 AR/VR 기술 동향',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '이벤트',
    date: {
      start: '2023-09-01',
      end: '2023-10-31',
    },
    likeCount: 31,
    viewCount: 487,
    commentCount: 15,
    myLike: true,
  },
  {
    id: '4e6b7c9a-d8f1-4a2b-b5c3-e2d1a3b4c5d6',
    title: '퀀텀 컴퓨팅 기술 발전 현황',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '해커톤',
    date: {
      start: '2023-10-01',
      end: '2023-11-30',
    },
    likeCount: 54,
    viewCount: 792,
    commentCount: 29,
    myLike: false,
  },
  {
    id: '7f1e2d3c-4b5a-4c6d-e7f8-a1b2c3d4e5f6',
    title: '스마트시티 구축 사례 분석',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '공모전',
    date: {
      start: '2023-11-01',
      end: '2023-12-31',
    },
    likeCount: 21,
    viewCount: 356,
    commentCount: 11,
    myLike: true,
  },
  {
    id: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    title: '차세대 모빌리티 기술 혁신',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '해커톤',
    date: {
      start: '2024-01-01',
      end: '2024-02-28',
    },
    likeCount: 38,
    viewCount: 584,
    commentCount: 17,
    myLike: false,
  },
  {
    id: 'q1r2s3t4-u5v6-w7x8-y9z0-a1b2c3d4e5f6g7',
    title: '메타버스 시장 동향과 전망',
    thumbnailSrc: 'https://via.placeholder.com/300x200',
    type: '이벤트',
    date: {
      start: '2024-02-01',
      end: '2024-03-31',
    },
    likeCount: 27,
    viewCount: 402,
    commentCount: 13,
    myLike: true,
  },
];

export default function ITNewsPage() {
  return (
    <main className="py-[100px]">
      <Typography variant="h1" className="mb-12">
        IT News
      </Typography>
      <TypeButton />
      <article className="flex justify-between mt-12">
        <Input type="search" width={400} />
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
          <ITNewsCard key={item.id} {...item} />
        ))}
      </ul>
    </main>
  );
}
