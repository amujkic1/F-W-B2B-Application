import {
  CalendarClock,
  Link,
  MapPin,
  Monitor,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge.jsx"
import { Button } from "@/components/ui/button.jsx"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx"
import { Separator } from "@/components/ui/separator.jsx"
import { Textarea } from "@/components/ui/textarea.jsx"

function Field({ id, label, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

export function RequestMeetingModal({ match, open, onOpenChange }) {
  const recipientName = match?.name ?? "Selected match"
  const recipientCompany = match?.company ?? "Recipient company"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

          <form className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="meeting-title" label="Title">
                <Input
                  id="meeting-title"
                  name="title"
                  placeholder="Partnership intro call"
                />
              </Field>

              <Field id="meeting-type" label="Meeting type">
                <Select defaultValue="online">
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
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field id="requested-start-at" label="Requested start">
                <div className="relative">
                  <CalendarClock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="requested-start-at"
                    name="requested_start_at"
                    type="datetime-local"
                    className="pl-10"
                  />
                </div>
              </Field>

              <Field id="requested-end-at" label="Requested end">
                <div className="relative">
                  <CalendarClock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="requested-end-at"
                    name="requested_end_at"
                    type="datetime-local"
                    className="pl-10"
                  />
                </div>
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
                  />
                </div>
              </Field>
            </div>

            <Field id="note-from-requester" label="Requester note">
              <Textarea
                id="note-from-requester"
                name="note_from_requester"
                placeholder="Add any details the recipient should know before accepting."
              />
            </Field>

            <Separator />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="button">Create Request</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
