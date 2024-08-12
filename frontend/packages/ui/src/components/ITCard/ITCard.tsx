import * as React from 'react';

import { cn } from '@ui/lib/utils';

export const ITCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-2xl border border-black py-2.5 px-[15px]', className)} {...props} />
  ),
);
ITCard.displayName = 'ITCard';

export const ITCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('pb-56', className)} {...props} />,
);
ITCardHeader.displayName = 'ITCardHeader';

export const ITCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-base font-semibold leading-none tracking-tight', className)} {...props} />
  ),
);
ITCardTitle.displayName = 'ITCardTitle';

export const ITCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-[14px] text-muted-foreground border bg-gray-300 rounded', className)} {...props} />
  ),
);
ITCardDescription.displayName = 'ITCardDescription';

export const ITCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />,
);
ITCardContent.displayName = 'ITCardContent';

export const ITCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />,
);
ITCardFooter.displayName = 'ITCardFooter';
