import * as React from "react";
import * as RadixTabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@ui/lib/utils";

const RadixTabs = RadixTabsPrimitive.Root;

const RadixTabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <RadixTabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));


const RadixTabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
));

const RadixTabsContent = React.forwardRef<
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


export { RadixTabs, RadixTabsList, RadixTabsTrigger, RadixTabsContent };
