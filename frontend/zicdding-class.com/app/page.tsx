import { Typography } from '@zicdding-web/ui/Typography';
import Link from 'next/link';
import ClassCard from './_components/ClassCard';

const dummy = [
  {
    id: '1',
    title: 'Example Class Title',
    endDate: '2024-07-01',
    positions: ['프론트엔드', '백엔드'],
    nickname: '직띵',
    likeCnt: 10,
    viewCnt: 20,
    commentCnt: 5,
    technology: [
      { name: 'react', imgUrl: '/next.svg' },
      { name: 'js', imgUrl: '/vercel.svg' },
    ],
    myLike: false,
  },
  {
    id: '2',
    title: 'Example Class Title',
    endDate: '2024-07-01',
    positions: ['프론트엔드', '백엔드'],
    nickname: '직띵',
    likeCnt: 10,
    viewCnt: 20,
    commentCnt: 5,
    technology: [
      { name: 'react', imgUrl: '/next.svg' },
      { name: 'js', imgUrl: '/vercel.svg' },
    ],
    myLike: false,
  },
  {
    id: '3',
    title: 'Example Class Title',
    endDate: '2024-07-01',
    positions: ['프론트엔드', '백엔드'],
    nickname: '직띵',
    likeCnt: 10,
    viewCnt: 20,
    commentCnt: 5,
    technology: [
      { name: 'react', imgUrl: '/next.svg' },
      { name: 'js', imgUrl: '/vercel.svg' },
    ],
    myLike: false,
  },
  {
    id: '4',
    title: 'Example Class Title',
    endDate: '2024-07-01',
    positions: ['프론트엔드', '백엔드'],
    nickname: '직띵',
    likeCnt: 10,
    viewCnt: 20,
    commentCnt: 5,
    technology: [
      { name: 'react', imgUrl: '/next.svg' },
      { name: 'js', imgUrl: '/vercel.svg' },
    ],
    myLike: false,
  },
  {
    id: '5',
    title: 'Example Class Title',
    endDate: '2024-07-01',
    positions: ['프론트엔드', '백엔드'],
    nickname: '직띵',
    likeCnt: 10,
    viewCnt: 20,
    commentCnt: 5,
    technology: [
      { name: 'react', imgUrl: '/next.svg' },
      { name: 'js', imgUrl: '/vercel.svg' },
    ],
    myLike: false,
  },
  {
    id: '6',
    title: 'Example Class Title',
    endDate: '2024-07-01',
    positions: ['프론트엔드', '백엔드'],
    nickname: '직띵',
    likeCnt: 10,
    viewCnt: 20,
    commentCnt: 5,
    technology: [
      { name: 'react', imgUrl: '/next.svg' },
      { name: 'js', imgUrl: '/vercel.svg' },
    ],
    myLike: false,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col px-6 gap-[52px] mb-28">
      <section className="">
        <div className="flex justify-between items-center border-b-[1px] border-[#C6C6C6] py-4">
          <Typography variant="h2" className="text-[#0F172A]">
            클래스
          </Typography>
          <Link href="/class">더보기</Link>
        </div>

        {/* GYU-TODO: ClassList 로 추출해도 될듯 */}
        <ul className="flex flex-wrap gap-8 w-full mt-7">
          {dummy.slice(0, 6).map((item) => (
            <Link href={`/class/${item.id}`} key={`${item.id}`} className="w-[calc(34%-32px)]">
              <ClassCard {...item} className="w-full" />
            </Link>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex justify-between items-center border-b-[1px] border-[#C6C6C6] py-4">
          <Typography variant="h2" className="text-[#0F172A]">
            IT News
          </Typography>
          <Link href="#">더보기</Link>
        </div>

        <ul className="flex flex-wrap gap-8 w-full mt-7">
          {/* TODO: IT news 카드 컴포넌트 재사용 */}
          <Typography variant="body">데이터가 존재하지 않습니다.</Typography>
        </ul>
      </section>
    </div>
  );
}
