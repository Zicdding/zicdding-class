'use client';

import { ClassListPage } from '@/src/views/class-list';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClassListPage />
    </Suspense>
  );
}
