import { Icon } from '@ui/components/Icon';
import { Card, CardHeader, CardFooter, CardTitle, CardContent, CardDescription } from '@zicdding-web/ui';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  id: number;
  title: string;
  thumbnailSrc: string;
  type: string;
  date: {
    start: string;
    end: string;
  };
  likeCount: number;
  viewCount: number;
  commentCount: number;
  myLike: boolean;
}

export default function ITNews({
  id,
  title,
  thumbnailSrc,
  type,
  date,
  likeCount,
  viewCount,
  commentCount,
  myLike,
}: Props) {
  return (
    <Card className="relative w-[400px] rounded-[20px] border border-black">
      <CardHeader className="relative w-full pb-56  rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
        <Image src={thumbnailSrc} alt={title} layout="fill" />
      </CardHeader>
      <Link href={`/news/${id}`}>
        <CardContent className="px-[15px] pb-0 pt-[10px]">
          <CardDescription className="mt-[10px] leading-4 px-2 py-1 inline-block text-[14px] text-muted-foreground border bg-gray-300 rounded">
            {type}
          </CardDescription>
          <CardTitle className="mt-[10px] text-base font-semibold leading-none tracking-tight">{title}</CardTitle>
          <div className="flex gap-1 mt-[10px]">
            <span>기간 :</span>
            <span className="font-semibold">
              {date.start} ~ {date.end}
            </span>
          </div>
        </CardContent>
        <CardFooter className="mt-[20px] justify-end px-[15px] pb-[15px] pt-0">
          <ul className="flex items-center justify-end gap-4">
            <li className="flex gap-1">
              <span>⭐️</span>
              <span>{likeCount}</span>
            </li>
            <li className="flex gap-1">
              <span>👁️</span>
              <span>{viewCount}</span>
            </li>
            <li className="flex gap-1">
              <span>💬</span>
              <span>{commentCount}</span>
            </li>
          </ul>
        </CardFooter>
      </Link>
      <div className="absolute cursor-pointer top-1 right-1">
        <Icon name="star" className={`${myLike ? 'text-yellow-400' : 'text-gray-400'} w-10 h-10`} />
      </div>
    </Card>
  );
}
