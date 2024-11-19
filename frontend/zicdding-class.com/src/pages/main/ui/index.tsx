'use client';

import { Typography } from '@zicdding-web/ui/Typography';

import Link from 'next/link';
import { ClassCard, useGetClasses } from '@/src/features/class-card';

export function MainPage() {
  const { data: classList, isLoading } = useGetClasses();

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
        {/* 추출해야하나?? */}
        <ul className="flex flex-wrap gap-8 w-full mt-7">
          {isLoading ? (
            <div>loading...</div>
          ) : (
            classList?.slice(0, 3).map((classItem) => (
              <Link href={`/class/${classItem.classId}`} key={`${classItem.classId}`} className="w-[calc(34%-32px)]">
                {/* <ClassCard {...item} className="w-full" /> */}
                <ClassCard
                  // key={classItem.classId}
                  // className="w-[405px]"
                  title={classItem.classTitle}
                  {...classItem}
                />
              </Link>
            ))
          )}
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
