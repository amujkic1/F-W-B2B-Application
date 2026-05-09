import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button.jsx"
import { cn } from "@/lib/utils.js"

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const monthFormatter = new Intl.DateTimeFormat(undefined, {
  month: "long",
  year: "numeric",
})

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function isSameDay(first, second) {
  return (
    first?.getFullYear() === second?.getFullYear() &&
    first?.getMonth() === second?.getMonth() &&
    first?.getDate() === second?.getDate()
  )
}

function buildMonthDays(month) {
  const start = startOfMonth(month)
  const firstGridDate = new Date(start)
  firstGridDate.setDate(start.getDate() - start.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstGridDate)
    date.setDate(firstGridDate.getDate() + index)
    return date
  })
}

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  initialFocus,
  ...props
}) {
  const [visibleMonth, setVisibleMonth] = React.useState(() =>
    startOfMonth(selected ?? new Date())
  )

  const today = React.useMemo(() => new Date(), [])
  const days = React.useMemo(() => buildMonthDays(visibleMonth), [visibleMonth])

  function moveMonth(offset) {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + offset, 1)
    )
  }

  function handleSelect(date) {
    setVisibleMonth(startOfMonth(date))
    onSelect?.(date)
  }

  return (
    <div
      className={cn("w-[18rem] rounded-xl bg-popover p-3", className)}
      {...props}
    >
      <div className="mb-3 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => moveMonth(-1)}
          disabled={disabled}
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <div className="text-sm font-semibold text-foreground">
          {monthFormatter.format(visibleMonth)}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => moveMonth(1)}
          disabled={disabled}
          aria-label="Next month"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map((weekday) => (
          <div
            key={weekday}
            className="flex h-8 items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {weekday}
          </div>
        ))}
        {days.map((date, index) => {
          const outsideMonth = date.getMonth() !== visibleMonth.getMonth()
          const selectedDay = isSameDay(date, selected)
          const todayDate = isSameDay(date, today)

          return (
            <button
              key={`${date.toISOString()}-${index}`}
              type="button"
              disabled={disabled}
              onClick={() => handleSelect(date)}
              autoFocus={Boolean(initialFocus && selectedDay)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover disabled:pointer-events-none disabled:opacity-50",
                outsideMonth && "text-muted-foreground/45",
                todayDate && !selectedDay && "bg-muted text-foreground",
                selectedDay &&
                  "bg-primary text-primary-foreground hover:bg-primary"
              )}
              aria-pressed={selectedDay}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }
