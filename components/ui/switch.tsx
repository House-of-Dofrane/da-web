"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Base UI switch, styled to the base-nova tokens the rest of /components/ui uses (see button.tsx).
// A `size` variant is added because the cookie-consent block renders it at size="sm".
const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-clip-padding shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary data-[unchecked]:bg-input",
  {
    variants: {
      size: {
        default: "h-5 w-9 p-0.5",
        sm: "h-4 w-7 p-0.5",
      },
    },
    defaultVariants: { size: "default" },
  }
)

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-sm ring-0 transition-transform data-[unchecked]:translate-x-0",
  {
    variants: {
      size: {
        default: "size-4 data-[checked]:translate-x-4",
        sm: "size-3 data-[checked]:translate-x-3",
      },
    },
    defaultVariants: { size: "default" },
  }
)

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>

function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(thumbVariants({ size }))}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
