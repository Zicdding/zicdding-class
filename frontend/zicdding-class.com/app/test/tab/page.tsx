'use client';

import { Tabs } from '@zicdding-web/ui/Tabs';

const ITEMS = [
  {
    title: '조회순',
    value: '조회순',
  },
  {
    title: '최신순',
    value: '최신순',
  },
  {
    title: '추천순',
    value: '추천순',
  },
];

export default function TestPage() {
  return (
    <>
      <h1>테스트 페이지</h1>
      <div>
        <Tabs items={ITEMS} onChange={(v) => alert(`${v}: 값으로 변경되었습니다`)} />
      </div>
    </>
  );
}
