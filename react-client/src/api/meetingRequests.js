import { authClient } from "@/api/authClient.js"
import { normalizeApiError } from "@/utils/apiError.js"

export async function getMeetingRequests({
  page = 1,
  limit = 100,
  requester_user_id,
  recipient_user_id,
  status,
} = {}) {
  try {
    const skip = (page - 1) * limit
    const response = await authClient.get("/api/meeting-requests/", {
      params: {
        skip,
        limit,
        requester_user_id,
        recipient_user_id,
        status,
      },
    })
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Meeting requests could not be loaded")
  }
}

export async function createMeetingRequest(meetingRequest) {
  try {
    const response = await authClient.post("/api/meeting-requests/", meetingRequest)
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Meeting request could not be created")
  }
}

export async function updateMeetingRequest(id, meetingRequest) {
  try {
    const response = await authClient.patch(`/api/meeting-requests/${id}`, meetingRequest)
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Meeting request could not be updated")
  }
}
