'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@zicdding-web/ui/Dialog';
import type { ComponentProps } from 'react';

type DialogProps = ComponentProps<typeof Dialog>;

export function CallPatternDialog({ ...rest }: DialogProps) {
  return (
    <Dialog {...rest}>
      {/* remove - 필요 없음 */}
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
