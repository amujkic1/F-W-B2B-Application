import * as React from "react"

import { cn } from "@/lib/utils.js"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-slot="avatar"
    className={cn(
      "relative inline-flex size-12 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted",
      className
    )}
    {...props}
  />
))

Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef(
  ({ className, src, alt = "Avatar image", ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false)

    React.useEffect(() => {
      setHasError(false)
    }, [src])

    if (!src || hasError) {
      return null
    }

    return (
      <img
        ref={ref}
        data-slot="avatar-image"
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        onError={() => setHasError(true)}
        {...props}
      />
    )
  }
)

AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(
      "absolute inset-0 flex items-center justify-center bg-muted text-sm font-semibold text-muted-foreground",
      className
    )}
    {...props}
  />
))

AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }