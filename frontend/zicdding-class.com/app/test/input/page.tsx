'use client';

import { Input } from '@zicdding-web/ui/Input';
import { useState } from 'react';

export default function TestPage() {
  const [value, setValue] = useState('');
  return (
    <>
      <h1>테스트 페이지</h1>
      <div>
        입력된 값: {value}
        <Input width="200" type="search" value={value} onChange={e => setValue(e.target.value)} />
      </div>
    </>
  );
}
