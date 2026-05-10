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
import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge.jsx"
import { Button } from "@/components/ui/button.jsx"
import {
  useMeetingRequests,
  useUpdateMeetingRequestMutation,
} from "@/queries/useMeetingRequests.js"
import { useAppStore } from "@/store/useAppStore.js"

const STATUS_FILTERS = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Declined" },
  { value: "all", label: "All" },
]

const statusStyles = {
  pending: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  accepted: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  rejected: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
  cancelled: "border-muted-foreground/20 bg-muted text-muted-foreground",
  completed: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
}

function formatDateTime(value) {
  if (!value) return "Time not set"

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}

function formatDuration(startAt, endAt) {
  const start = new Date(startAt)
  const end = new Date(endAt)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Duration unavailable"
  }

  const minutes = Math.max(0, Math.round((end - start) / 60000))
  if (minutes < 60) return `${minutes} min`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

function formatRequester(id) {
  if (!id) return "Unknown requester"
  return `Requester ${String(id).slice(0, 8)}`
}

function MeetingRequestCard({ request, onStatusChange, isUpdating }) {
  const isPending = request.status === "pending"
  const meetingLocation =
    request.meeting_type === "online"
      ? request.meeting_link || "Online meeting"
      : request.location_text || "Location to be confirmed"

  return (
    <article className="shell-panel shell-panel-hover p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={statusStyles[request.status] ?? statusStyles.pending}>
              {request.status === "rejected" ? "Declined" : request.status}
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
              {formatRequester(request.requester_user_id)}
            </span>
            <span className="flex items-center gap-2">
              <CalendarClock className="size-4 text-accent" />
              {formatDateTime(request.requested_start_at)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-accent" />
              {formatDuration(request.requested_start_at, request.requested_end_at)}
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

export function MeetingRequestsPage() {
  const user = useAppStore((state) => state.user)
  const [statusFilter, setStatusFilter] = useState("pending")
  const updateMeetingRequestMutation = useUpdateMeetingRequestMutation()
  const { data, isLoading, isError, error } = useMeetingRequests({
    recipient_user_id: user?.id,
    status: statusFilter === "all" ? undefined : statusFilter,
  })

  const meetingRequests = useMemo(() => data?.items ?? [], [data?.items])
  const pendingCount = useMemo(() => {
    return meetingRequests.filter((request) => request.status === "pending").length
  }, [meetingRequests])

  function handleStatusChange(id, status) {
    updateMeetingRequestMutation.mutate({
      id,
      meetingRequest: { status },
    })
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-2">
          <p className="section-label text-muted-foreground">Meeting Requests</p>
          <h1 className="text-3xl tracking-[-0.03em] text-foreground md:text-4xl">
            Review Incoming Requests
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            Keep your meeting pipeline tidy by accepting the right conversations
            and declining requests that are not a fit.
          </p>
        </div>

        <div className="shell-panel px-5 py-4">
          <p className="section-label text-muted-foreground">Pending now</p>
          <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
            {pendingCount}
          </p>
        </div>
      </section>

      <section className="sticky top-24 z-20 rounded-[1.25rem] border border-input/80 bg-card p-3 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => {
            const isActive = statusFilter === filter.value

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatusFilter(filter.value)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-accent"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      </section>

      {!user?.id ? (
        <div className="shell-panel px-5 py-10 text-center">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
            User context is missing
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in again so incoming meeting requests can be matched to your account.
          </p>
        </div>
      ) : isLoading ? (
        <div className="shell-panel px-5 py-10 text-center">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
            Loading requests
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Pulling in your latest meeting requests.
          </p>
        </div>
      ) : isError ? (
        <div className="rounded-[1.25rem] border border-destructive/30 bg-card/95 px-5 py-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
            Requests could not be loaded
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {error?.message ?? "Please try again in a moment."}
          </p>
        </div>
      ) : meetingRequests.length ? (
        <div className="space-y-4">
          {updateMeetingRequestMutation.isError && (
            <div className="rounded-[1.25rem] border border-destructive/30 bg-card/95 px-4 py-3 text-sm text-destructive">
              {updateMeetingRequestMutation.error?.message ??
                "Meeting request could not be updated."}
            </div>
          )}

          {meetingRequests.map((request) => (
            <MeetingRequestCard
              key={request.id}
              request={request}
              onStatusChange={handleStatusChange}
              isUpdating={updateMeetingRequestMutation.isPending}
            />
          ))}
        </div>
      ) : (
        <div className="shell-panel px-5 py-10 text-center">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
            No requests here
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            There are no {statusFilter === "all" ? "" : statusFilter} meeting requests
            to review right now.
          </p>
        </div>
      )}
    </div>
  )
}
