import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        purple:
          "bg-castleton bg-opacity-20 text-castleton border-castleton border-opacity-30 dark:bg-castleton dark:bg-opacity-30 dark:text-castleton dark:text-opacity-90 dark:border-castleton dark:border-opacity-40",
        red: "bg-red-100 text-red-800 border-red-200 dark:bg-red-700 dark:text-red-100 dark:border-red-600",
        blue: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:border-blue-600",
        green:
          "bg-green-100 text-green-800 border-green-200 dark:bg-green-700 dark:text-green-100 dark:border-green-600",
        slateGrey:
          "bg-slate-700 text-slate-100 border-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700",
        burntOrange:
          "bg-amber-800 text-amber-100 border-amber-900 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
