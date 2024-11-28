import { Icon } from '@ui/components/Icon';
import { Card, CardHeader, CardFooter, CardTitle, CardContent, CardDescription } from '@zicdding-web/ui';
import { cn } from '@ui/lib/utils';
import Image from 'next/image';
import type { MouseEvent } from 'react';

interface Props extends React.ComponentPropsWithRef<typeof Card> {
  id: string;
  title: string;
  thumbnailSrc: string;
  type: string;
  startedDate: string;
  endDate: string;
  likeCnt: number;
  viewCnt: number;
  commentCnt: number;
  myLike: boolean;

  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onClickLike?: (e: MouseEvent<SVGAElement>) => void;
}

export default function ITNews({
  id,
  title,
  thumbnailSrc,
  type,
  startedDate,
  endDate,
  likeCnt,
  viewCnt,
  commentCnt,
  myLike,
  className,
  onClick,
  onClickLike,
  ...rest
}: Props) {
  return (
    <Card className={cn('relative  rounded-[20px] border border-black', className)} onClick={onClick} {...rest}>
      <CardHeader className="relative w-full pb-56 pt-0 rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
        <Image src={thumbnailSrc} alt={title} layout="fill" />
      </CardHeader>
      <CardContent className="px-[15px]">
        <CardDescription className="mt-[10px] px-5 py-1 inline-block text-[14px] text-muted-foreground border bg-gray-300 rounded">
          {type}
        </CardDescription>
        <CardTitle className="mt-[15px] font-semibold text-xl leading-none tracking-tight">{title}</CardTitle>
        <div className="flex gap-1 mt-[10px] text-sm">
          <span>기간 :</span>
          <span className="font-semibold">
            {startedDate} ~ {endDate}
          </span>
        </div>
      </CardContent>
      <CardFooter className="mt-[20px] justify-end px-[15px] pb-[15px] pt-0">
        <ul className="flex items-center justify-end gap-4 text-sm">
          <li className="flex gap-1">
            <span>⭐️</span>
            <span>{likeCnt}</span>
          </li>
          <li className="flex gap-1">
            <span>👁️</span>
            <span>{viewCnt}</span>
          </li>
          <li className="flex gap-1">
            <span>💬</span>
            <span>{commentCnt}</span>
          </li>
        </ul>
      </CardFooter>
      <div className="absolute cursor-pointer top-2 right-2">
        <Icon
          name="star"
          className={myLike ? 'text-yellow-400' : 'text-gray-400'}
          onClick={(e) => {
            e.stopPropagation();
            onClickLike?.(e);
          }}
        />
      </div>
    </Card>
  );
}
