export const meetingRequestStatusStyles = {
  pending: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  accepted: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  rejected: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
  cancelled: "border-muted-foreground/20 bg-muted text-muted-foreground",
  completed: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
}

export function formatMeetingRequestStatus(status) {
  if (status === "rejected") return "Declined"
  return status
}

export function formatMeetingRequestDateTime(value) {
  if (!value) return "Time not set"

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}

export function formatMeetingRequestDuration(startAt, endAt) {
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

export function formatMeetingRequester(id) {
  if (!id) return "Unknown requester"
  return `Requester ${String(id).slice(0, 8)}`
}

export function getMeetingRequestLocation(request) {
  if (request.meeting_type === "online") {
    return request.meeting_link || "Online meeting"
  }

  return request.location_text || "Location to be confirmed"
}
