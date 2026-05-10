import { cn } from "@/lib/utils.js"

const variantClasses = {
  default: "border-input/80 bg-card/95",
  error: "border-destructive/30 bg-card/95",
}

export function EmptyState({
  title,
  description,
  variant = "default",
  className,
  children,
}) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border px-5 py-10 text-center shadow-sm",
        variantClasses[variant] ?? variantClasses.default,
        className
      )}
    >
      <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
      {children && <div className="mt-5">{children}</div>}
    </div>
  )
}
