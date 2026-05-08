import * as React from "react"

import { cn } from "@/lib/utils.js"

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full resize-none rounded-xl border border-input/80 bg-background/90 px-4 py-3 text-sm leading-6 shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
