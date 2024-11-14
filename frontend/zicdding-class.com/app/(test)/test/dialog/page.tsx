'use client';

import {} from '@zicdding-web/ui/Dialog';
import { useState } from 'react';
import { Typography } from '@zicdding-web/ui';
import { CallPatternDialog } from './ui/CallPatternDialog';
import { InnerPatternDialog } from './ui/InnerPatternDialog';

export default function DialogTestPage() {
  const [트리거형, set트리거형] = useState(false);
  const [호출형_오픈, set호출형_오픈] = useState(false);

  return (
    <>
      <Typography variant="h1">테스트 페이지</Typography>

      <div className="flex gap-2 my-10 ">
        <button type="button" className="p-2 border rounded" onClick={() => set트리거형(true)}>
          트리거형
        </button>
        <button
          type="button"
          className="p-2 border rounded"
          onClick={() => {
            set호출형_오픈(true);
          }}
        >
          호출형
        </button>
      </div>

      {트리거형 && <InnerPatternDialog />}

      <CallPatternDialog open={호출형_오픈} onOpenChange={set호출형_오픈} />
    </>
  );
}
