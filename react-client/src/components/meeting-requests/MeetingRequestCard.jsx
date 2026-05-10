import {
  CalendarClock,
  Check,
  Clock,
  Link as LinkIcon,
  MapPin,
  Monitor,
  UserRound,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge.jsx"
import { Button } from "@/components/ui/button.jsx"
import {
  formatMeetingRequestDateTime,
  formatMeetingRequestDuration,
  formatMeetingRequester,
  formatMeetingRequestStatus,
  getMeetingRequestLocation,
  meetingRequestStatusStyles,
} from "@/utils/meetingRequests.js"

export function MeetingRequestCard({ request, onStatusChange, isUpdating }) {
  const isPending = request.status === "pending"
  const meetingLocation = getMeetingRequestLocation(request)

  return (
    <article className="shell-panel shell-panel-hover p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={
                meetingRequestStatusStyles[request.status] ??
                meetingRequestStatusStyles.pending
              }
            >
              {formatMeetingRequestStatus(request.status)}
            </Badge>
            <span className="section-label text-muted-foreground">
              {request.meeting_type}
            </span>
          </div>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-foreground">
            {request.title}
          </h2>
          {request.description && (
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              {request.description}
            </p>
          )}

          <div className="mt-5 grid gap-3 text-sm text-muted-foreground md:grid-cols-2 xl:grid-cols-4">
            <span className="flex items-center gap-2">
              <UserRound className="size-4 text-accent" />
              {formatMeetingRequester(request.requester_user_id)}
            </span>
            <span className="flex items-center gap-2">
              <CalendarClock className="size-4 text-accent" />
              {formatMeetingRequestDateTime(request.requested_start_at)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-accent" />
              {formatMeetingRequestDuration(
                request.requested_start_at,
                request.requested_end_at
              )}
            </span>
            <span className="flex items-center gap-2">
              {request.meeting_type === "online" ? (
                <Monitor className="size-4 text-accent" />
              ) : (
                <MapPin className="size-4 text-accent" />
              )}
              <span className="truncate">{meetingLocation}</span>
            </span>
          </div>

          {request.note_from_requester && (
            <div className="mt-5 rounded-2xl border border-border/70 bg-muted/35 px-4 py-3 text-sm leading-6 text-foreground">
              {request.note_from_requester}
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end">
          {request.meeting_link && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => window.open(request.meeting_link, "_blank", "noreferrer")}
            >
              <LinkIcon className="size-4" />
              Open
            </Button>
          )}

          {isPending && (
            <>
              <Button
                size="sm"
                onClick={() => onStatusChange(request.id, "accepted")}
                disabled={isUpdating}
              >
                <Check className="size-4" />
                Accept
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(request.id, "rejected")}
                disabled={isUpdating}
              >
                <X className="size-4" />
                Decline
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
