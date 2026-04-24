import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils.js"

function Select({
  value,
  defaultValue = "",
  onValueChange,
  disabled = false,
  className,
  children,
}) {
  const parsed = React.useMemo(() => {
    const result = {
      placeholder: "Select",
      items: [],
    }

    function walk(node) {
      if (!React.isValidElement(node)) {
        return
      }

      if (node.type === SelectValue && node.props?.placeholder) {
        result.placeholder = node.props.placeholder
      }

      if (node.type === SelectItem && node.props?.value) {
        result.items.push({
          value: node.props.value,
          label: node.props.children,
        })
      }

      React.Children.forEach(node.props?.children, walk)
    }

    React.Children.forEach(children, walk)

    return result
  }, [children])

  const resolvedValue = value ?? defaultValue

  return (
    <div className={cn("relative", className)}>
      <select
        data-slot="select"
        value={resolvedValue}
        disabled={disabled}
        onChange={(event) => onValueChange?.(event.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-input/80 bg-background/90 px-3 pr-9 text-sm text-foreground shadow-sm outline-none transition-all duration-200 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="" disabled>
          {parsed.placeholder}
        </option>
        {parsed.items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

function SelectTrigger({ children }) {
  return <>{children}</>
}

function SelectValue() {
  return null
}

function SelectContent({ children }) {
  return <>{children}</>
}

function SelectItem() {
  return null
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }