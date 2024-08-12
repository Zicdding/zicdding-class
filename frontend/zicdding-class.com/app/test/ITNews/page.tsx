'use client';
import ITNews from '@/app/components/ITNews';

export default function TestPage() {
  return (
    <ITNews
      id={1}
      title="샘플 IT 뉴스 제목"
      imgUrl="https://via.placeholder.com/300x200"
      type="공모전"
      date={{
        start: '2024-01-01',
        end: '2024-12-31',
      }}
      likeCnt={15}
      viewCnt={99}
      commentCnt={13}
      myLike={false}
    />
  );
}
