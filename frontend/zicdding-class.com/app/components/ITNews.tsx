import { Icon } from '@ui/components/Icon';
import { ITCard, ITCardContent, ITCardDescription, ITCardFooter, ITCardHeader, ITCardTitle } from '@zicdding-web/ui';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  id: number;
  title: string;
  imgUrl: string;
  type: string;
  date: {
    start: string;
    end: string;
  };
  likeCnt: number;
  viewCnt: number;
  commentCnt: number;
  myLike: boolean;
}

export default function ITNews({ id, title, imgUrl, type, date, likeCnt, viewCnt, commentCnt, myLike }: Props) {
  return (
    <ITCard className="relative w-[400px]">
      <ITCardHeader className="relative w-full">
        <Image src={imgUrl} alt={title} layout="fill" />
      </ITCardHeader>
      <Link href={`/news/${id}`}>
        <ITCardContent>
          <ITCardDescription className="mt-[10px] leading-4 px-2 py-1 inline-block">{type}</ITCardDescription>
          <ITCardTitle className="mt-[10px]">{title}</ITCardTitle>
          <div className="flex gap-1 mt-[10px]">
            <span>기간 :</span>
            <span className="font-semibold">
              {date.start} ~ {date.end}
            </span>
          </div>
        </ITCardContent>
        <ITCardFooter className="mt-5">
          <ul className="flex items-center justify-end gap-4">
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
        </ITCardFooter>
      </Link>
      <div className="absolute cursor-pointer top-1 right-1">
        <Icon name="star" className={`${myLike ? 'text-yellow-400' : 'text-gray-400'} w-10 h-10`} />
      </div>
    </ITCard>
  );
}
