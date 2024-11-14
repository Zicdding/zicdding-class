'use client';

import { Dialog } from '@zicdding-web/ui/Dialog';

export function InnerPatternDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </Dialog.Description>
        </Dialog.Header>

        <Dialog>
          <Dialog.Trigger>Open</Dialog.Trigger>
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
      </Dialog.Content>
    </Dialog>
  );
}
