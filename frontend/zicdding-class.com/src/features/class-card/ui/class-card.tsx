'use client';

import Image from 'next/image';
import { Icon } from '@ui/components/Icon';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@zicdding-web/ui/Card';
import { cn } from '@ui/lib/utils';
import type { MouseEvent } from 'react';
import { useClassCard } from './use-class-card';

interface ClassCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  myLike: boolean;
  title: string;
  endDate: string;
  positions: string[];
  nickname: string;
  likeCnt: number;
  viewCnt: number;
  commentCnt: number;
  technology: {
    name: string;
    imgUrl: string;
  }[];

  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export function ClassCard({
  title,
  endDate,
  positions,
  nickname,
  likeCnt,
  viewCnt,
  commentCnt,
  technology,
  myLike,
  className,
  onClick,
  ...rest
}: ClassCardProps) {
  const { onClickLike } = useClassCard();

  return (
    <Card
      className={cn('relative w-[300px] aspect-[400/240] bg-white border-[1px] border-black cursor-pointer', className)}
      onClick={onClick}
      {...rest}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="text-sm text-gray-500">마감일 | {endDate}</div>
        <div className="text-sm">
          {positions?.map((position) => (
            <span key={position} className="mr-2">
              #{position}
            </span>
          ))}
        </div>
        <div className="flex">
          {technology?.map(({ name, imgUrl }) => (
            <div key={name} className="relative w-8 h-8 mr-2 last:mr-0">
              <Image src={imgUrl} alt={name} layout="fill" />
            </div>
          ))}
        </div>
      </CardContent>
      <hr className="mx-6" />
      <CardFooter>
        <div className="flex-1 text-sm text-gray-500">{nickname}</div>
        <div className="flex items-center gap-2 text-sm">
          <div>⭐️ {likeCnt}</div>
          <div>👁️ {viewCnt}</div>
          <div>💬 {commentCnt}</div>
        </div>
      </CardFooter>

      <div className="absolute top-4 right-6">
        <Icon
          name="star"
          className={myLike ? 'text-yellow-400' : 'text-gray-300'}
          onClick={(e) => {
            e.stopPropagation();
            onClickLike(myLike);
          }}
        />
      </div>
    </Card>
  );
}
