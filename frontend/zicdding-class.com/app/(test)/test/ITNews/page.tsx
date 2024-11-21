'use client';
import ITNews from '@/app/_components/ITNewsCard';

export default function TestPage() {
  return (
    <ITNews
      id="7b205a4d-f17f-4b65-a463-38a270d1ab39"
      title="샘플 IT 뉴스 제목"
      thumbnailSrc="https://via.placeholder.com/300x200"
      type="공모전"
      startedDate="2023-04-01"
      endDate="2023-04-30"
      likeCnt={15}
      viewCnt={99}
      commentCnt={13}
      myLike={false}
    />
  );
}
