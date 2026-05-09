import {
  CalendarIcon,
  Clock,
  Link,
  MapPin,
  Monitor,
  UserRound,
} from "lucide-react"
import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Calendar } from "@/components/ui/calendar.jsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.jsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx"
import { Separator } from "@/components/ui/separator.jsx"
import { Textarea } from "@/components/ui/textarea.jsx"
import { useCreateMeetingRequestMutation } from "@/queries/useMeetingRequests.js"
import { useAppStore } from "@/store/useAppStore.js"

const initialFormState = {
  title: "",
  description: "",
  meeting_type: "online",
  requested_start_at: "",
  requested_end_at: "",
  meeting_link: "",
  location_text: "",
  note_from_requester: "",
}

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function Field({ id, label, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

function optionalValue(value) {
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function toIsoDateTime(value) {
  return new Date(value).toISOString()
}

function parseLocalDateTime(value) {
  if (!value) return null

  const [datePart, timePart = "00:00"] = value.split("T")
  const [year, month, day] = datePart.split("-").map(Number)
  const [hours, minutes] = timePart.split(":").map(Number)

  if ([year, month, day, hours, minutes].some(Number.isNaN)) {
    return null
  }

  return new Date(year, month - 1, day, hours, minutes)
}

function formatDateTimeDisplay(value) {
  const date = parseLocalDateTime(value)

  if (!date) return "Pick a date and time"

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

function getDatePart(value) {
  return value ? value.split("T")[0] : ""
}

function getTimePart(value, fallbackTime) {
  return value?.split("T")[1]?.slice(0, 5) ?? fallbackTime
}

function formatDatePart(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function composeDateTime(datePart, timePart) {
  if (!datePart) return ""
  return `${datePart}T${timePart || "00:00"}`
}

function getRecipientUserId(match) {
  return match?.recipient_user_id ?? match?.recipientUserId ?? match?.user_id ?? match?.userId ?? match?.id
}

function DateTimePicker({
  id,
  value,
  onChange,
  disabled,
  defaultTime = "09:00",
}) {
  const selectedDate = parseLocalDateTime(value)
  const timeValue = getTimePart(value, defaultTime)

  function handleDateSelect(date) {
    onChange(composeDateTime(formatDatePart(date), timeValue))
  }

  function handleTimeChange(nextTime) {
    const datePart = getDatePart(value) || formatDatePart(new Date())
    onChange(composeDateTime(datePart, nextTime))
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger
          id={id}
          type="button"
          disabled={disabled}
          className="inline-flex h-12 w-full items-center justify-start gap-3 rounded-xl border border-input/80 bg-background/90 px-4 py-2 text-left text-sm font-medium text-foreground shadow-sm transition-all duration-200 outline-none hover:bg-muted/60 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CalendarIcon className="size-4 text-muted-foreground" />
          <span className={value ? "" : "text-muted-foreground/70"}>
            {formatDateTimeDisplay(value)}
          </span>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Calendar
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={disabled}
            initialFocus
          />
          <div className="border-t border-border/80 p-3">
            <Label
              htmlFor={`${id}-time`}
              className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground"
            >
              <Clock className="size-3.5" />
              Time
            </Label>
            <Input
              id={`${id}-time`}
              type="time"
              value={timeValue}
              onChange={(event) => handleTimeChange(event.target.value)}
              disabled={disabled}
              className="h-10"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function RequestMeetingModal({ match, open, onOpenChange }) {
  const user = useAppStore((state) => state.user)
  const [formState, setFormState] = useState(initialFormState)
  const [formError, setFormError] = useState("")
  const createMeetingRequestMutation = useCreateMeetingRequestMutation()

  const recipientName = match?.name ?? "Selected match"
  const recipientCompany = match?.company ?? "Recipient company"
  const recipientUserId = useMemo(() => getRecipientUserId(match), [match])

  function resetForm() {
    setFormState(initialFormState)
    setFormError("")
    createMeetingRequestMutation.reset()
  }

  function handleOpenChange(nextOpen) {
    if (!nextOpen) resetForm()
    onOpenChange(nextOpen)
  }

  function updateField(field, value) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }))

    if (formError) setFormError("")
    if (createMeetingRequestMutation.error) createMeetingRequestMutation.reset()
  }

  function validateForm() {
    if (!user?.id || !uuidPattern.test(user.id)) {
      return "You need to be logged in with a valid backend user before creating a meeting request."
    }

    if (!recipientUserId || !uuidPattern.test(String(recipientUserId))) {
      return "This match is missing a backend recipient user ID. Use a match record with recipient_user_id before creating a request."
    }

    if (!formState.title.trim()) {
      return "Title is required."
    }

    if (!formState.requested_start_at || !formState.requested_end_at) {
      return "Requested start and end times are required."
    }

    const startAt = new Date(formState.requested_start_at)
    const endAt = new Date(formState.requested_end_at)

    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
      return "Requested meeting times are not valid."
    }

    if (startAt >= endAt) {
      return "Requested start must be before requested end."
    }

    return ""
  }

  function handleSubmit(event) {
    event.preventDefault()
    setFormError("")

    const validationMessage = validateForm()

    if (validationMessage) {
      setFormError(validationMessage)
      return
    }

    createMeetingRequestMutation.mutate(
      {
        requester_user_id: user.id,
        recipient_user_id: String(recipientUserId),
        title: formState.title.trim(),
        description: optionalValue(formState.description),
        meeting_type: formState.meeting_type,
        location_text: optionalValue(formState.location_text),
        meeting_link: optionalValue(formState.meeting_link),
        requested_start_at: toIsoDateTime(formState.requested_start_at),
        requested_end_at: toIsoDateTime(formState.requested_end_at),
        status: "pending",
        note_from_requester: optionalValue(formState.note_from_requester),
        note_from_recipient: null,
      },
      {
        onSuccess: () => {
          resetForm()
          onOpenChange(false)
        },
        onError: (error) => {
          setFormError(error.message)
        },
      },
    )
  }

  const isPending = createMeetingRequestMutation.isPending

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <div className="max-h-[min(760px,calc(100dvh-3rem))] overflow-y-auto px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
          <DialogHeader className="pr-10">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Pending request</Badge>
            </div>
            <DialogTitle>Request Meeting</DialogTitle>
            <DialogDescription>
              Prepare a meeting request for {recipientName} from{" "}
              {recipientCompany}.
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-5" />

          <div className="mb-5 grid gap-3 rounded-[1.25rem] border border-input/80 bg-muted/40 p-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <UserRound className="size-3.5" />
                Recipient
              </p>
              <p className="text-sm font-semibold text-foreground">
                {recipientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {recipientCompany}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Requester
              </p>
              <p className="text-sm font-semibold text-foreground">
                You
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="meeting-title" label="Title">
                <Input
                  id="meeting-title"
                  name="title"
                  placeholder="Partnership intro call"
                  value={formState.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  disabled={isPending}
                  required
                />
              </Field>

              <Field id="meeting-type" label="Meeting type">
                <Select
                  value={formState.meeting_type}
                  onValueChange={(value) => updateField("meeting_type", value)}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field id="meeting-description" label="Description">
              <Textarea
                id="meeting-description"
                name="description"
                placeholder="Add a short context for the conversation."
                value={formState.description}
                onChange={(event) => updateField("description", event.target.value)}
                disabled={isPending}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field id="requested-start-at" label="Requested start">
                <DateTimePicker
                  id="requested-start-at"
                  value={formState.requested_start_at}
                  onChange={(value) => updateField("requested_start_at", value)}
                  disabled={isPending}
                  defaultTime="09:00"
                />
              </Field>

              <Field id="requested-end-at" label="Requested end">
                <DateTimePicker
                  id="requested-end-at"
                  value={formState.requested_end_at}
                  onChange={(value) => updateField("requested_end_at", value)}
                  disabled={isPending}
                  defaultTime="10:00"
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field id="meeting-link" label="Meeting link">
                <div className="relative">
                  <Monitor className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="meeting-link"
                    name="meeting_link"
                    placeholder="https://meet.example.com/..."
                    className="pl-10"
                    value={formState.meeting_link}
                    onChange={(event) => updateField("meeting_link", event.target.value)}
                    disabled={isPending}
                  />
                  <Link className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </Field>

              <Field id="location-text" label="Location">
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location-text"
                    name="location_text"
                    placeholder="Conference room, booth, or address"
                    className="pl-10"
                    value={formState.location_text}
                    onChange={(event) => updateField("location_text", event.target.value)}
                    disabled={isPending}
                  />
                </div>
              </Field>
            </div>

            <Field id="note-from-requester" label="Requester note">
              <Textarea
                id="note-from-requester"
                name="note_from_requester"
                placeholder="Add any details the recipient should know before accepting."
                value={formState.note_from_requester}
                onChange={(event) => updateField("note_from_requester", event.target.value)}
                disabled={isPending}
              />
            </Field>

            <Separator />

            {formError && (
              <p className="text-sm font-medium text-destructive">
                {formError}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Request"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
