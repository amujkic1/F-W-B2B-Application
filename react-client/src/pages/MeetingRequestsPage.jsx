import { useMemo, useState } from "react"

import { MeetingRequestCard } from "@/components/meeting-requests/MeetingRequestCard.jsx"
import { EmptyState } from "@/components/ui/empty-state.jsx"
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
        <EmptyState
          title="User context is missing"
          description="Log in again so incoming meeting requests can be matched to your account."
          className="shell-panel"
        />
      ) : isLoading ? (
        <EmptyState
          title="Loading requests"
          description="Pulling in your latest meeting requests."
          className="shell-panel"
        />
      ) : isError ? (
        <EmptyState
          title="Requests could not be loaded"
          description={error?.message ?? "Please try again in a moment."}
          variant="error"
        />
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
        <EmptyState
          title="No requests here"
          description={`There are no ${
            statusFilter === "all" ? "" : statusFilter
          } meeting requests to review right now.`}
          className="shell-panel"
        />
      )}
    </div>
  )
}
