import { cn } from "@/lib/utils.js"

function Switch({
  className,
  checked = false,
  onCheckedChange,
  disabled = false,
  ...props
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onCheckedChange?.(!checked)
        }
      }}
      className={cn(
        "peer inline-flex h-6 w-11 items-center rounded-full border border-transparent bg-input/90 p-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <span
        data-slot="switch-thumb"
        className={cn(
          "block size-5 rounded-full bg-background shadow-sm ring-0 transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  )
}

export { Switch }