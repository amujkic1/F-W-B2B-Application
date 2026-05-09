import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils.js"

function Dialog({ ...props }) {
  return <DialogPrimitive.Root {...props} />
}

function DialogPortal({ ...props }) {
  return <DialogPrimitive.Portal {...props} />
}

function DialogBackdrop({ className, ...props }) {
  return (
    <DialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function DialogViewport({ className, ...props }) {
  return (
    <DialogPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 flex min-h-dvh items-center justify-center overflow-y-auto px-4 py-6",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({ className, children, ...props }) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPrimitive.Popup
          className={cn(
            "relative w-full max-w-3xl rounded-[1.5rem] border border-border/80 bg-card text-card-foreground shadow-[0_28px_90px_rgba(15,23,42,0.18)] outline-none transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Popup>
      </DialogViewport>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }) {
  return <div className={cn("space-y-2", className)} {...props} />
}

function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "text-2xl font-semibold tracking-[-0.03em] text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
}
