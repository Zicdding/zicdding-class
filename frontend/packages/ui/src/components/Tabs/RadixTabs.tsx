"use client";

import * as React from "react";
import * as RadixTabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@ui/lib/utils";

export const RadixTabs = RadixTabsPrimitive.Root;

export const RadixTabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <RadixTabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
RadixTabsList.displayName = RadixTabsPrimitive.List.displayName;

export const RadixTabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
RadixTabsTrigger.displayName = RadixTabsPrimitive.Trigger.displayName;

export const RadixTabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <RadixTabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
RadixTabsContent.displayName = RadixTabsPrimitive.Content.displayName;
