'use client';

import { SearchInput } from '@zicdding-web/ui/Input';
import { useState } from 'react';

export default function TestPage() {
  const [value, setValue] = useState('');
  return (
    <>
      <h1>테스트 페이지</h1>
      <div>
        입력된 값: {value}
        <SearchInput width="200" type="search" value={value} onChange={(e: any) => setValue(e.target.value)} />
      </div>
    </>
  );
}
