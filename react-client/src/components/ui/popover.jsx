import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils.js"

function Popover({ ...props }) {
  return <PopoverPrimitive.Root {...props} />
}

function PopoverTrigger({ ...props }) {
  return <PopoverPrimitive.Trigger {...props} />
}

function PopoverPortal({ ...props }) {
  return <PopoverPrimitive.Portal {...props} />
}

function PopoverContent({
  className,
  align = "start",
  sideOffset = 8,
  children,
  ...props
}) {
  return (
    <PopoverPortal>
      <PopoverPrimitive.Positioner
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <PopoverPrimitive.Popup
          className={cn(
            "w-auto rounded-xl border border-border/80 bg-popover p-0 text-popover-foreground shadow-[0_18px_60px_rgba(15,23,42,0.16)] outline-none transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPortal>
  )
}

export { Popover, PopoverContent, PopoverTrigger }
