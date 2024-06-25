import React, { Fragment } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@ui/lib/utils"

const typographyVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      body: "text-base",
      caption1: "text-sm",
      caption2: "text-xs",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

export interface TypographyProps extends React.BaseHTMLAttributes<HTMLHeadingElement>, VariantProps<typeof typographyVariants> {}

function Typography({ className, variant, ...props }: TypographyProps) {
  if (variant === "h1" || variant === "h2" || variant === "h3" || variant === "h4") {
    const Comp = variant
    return (
      <Comp
        className={cn(typographyVariants({ className, variant }))}
        {...props}
      />
    )
  }

  return (
    <span
      className={cn(typographyVariants({ className, variant }))}
      {...props}
    />
  )
}

function H1() {}

export { Typography }
