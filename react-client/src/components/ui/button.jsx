import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils.js"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent text-sm font-medium transition-all duration-200 ease-out outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-0 bg-gradient-to-r from-primary to-accent-secondary text-primary-foreground shadow-accent hover:-translate-y-0.5 hover:brightness-105 hover:shadow-accent",
        outline:
          "border-border/80 bg-background text-foreground shadow-sm hover:border-accent/30 hover:bg-muted/60 hover:text-foreground",
        secondary:
          "border-border/60 bg-muted/70 text-foreground shadow-sm hover:bg-muted",
        ghost:
          "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
        destructive:
          "border-0 bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20",
        link:
          "h-auto border-0 bg-transparent px-0 font-medium text-primary shadow-none hover:text-accent-secondary hover:underline",
      },
      size: {
        default:
          "h-11 px-4",
        xs: "h-8 rounded-lg px-2.5 text-xs",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-12 rounded-xl px-5 text-base",
        icon: "size-11 rounded-xl",
        "icon-xs": "size-8 rounded-lg",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
