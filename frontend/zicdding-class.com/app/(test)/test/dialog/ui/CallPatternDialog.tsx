'use client';

import { Dialog } from '@zicdding-web/ui/Dialog';
import type { ComponentProps } from 'react';

type DialogProps = ComponentProps<typeof Dialog>;

export function CallPatternDialog({ ...rest }: DialogProps) {
  return (
    <Dialog {...rest}>
      {/* remove - 필요 없음 */}
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </Dialog.Description>
        </Dialog.Header>
      </Dialog.Content>
    </Dialog>
  );
}
